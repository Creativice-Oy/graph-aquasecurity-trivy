import {
  IntegrationProviderAPIError,
  IntegrationProviderAuthenticationError,
} from '@jupiterone/integration-sdk-core';
import { retry } from '@lifeomic/attempt';
import fetch, { Response } from 'node-fetch';

import { IntegrationConfig } from './config';
import {
  AquasecTrivyAccount,
  AquasecTrivyUserResponse,
  AquasecTrivyUser,
  AquasecTrivyGroup,
  AquasecTrivyGroupResponse,
  AquasecTrivyGroupDetails,
  AquasecTrivyRoleResponse,
  AquasecTrivyRole,
  AquasecTrivyPermission,
  AquasecTrivyPermissionResponse,
} from './types';

export type ResourceIteratee<T> = (each: T) => Promise<void> | void;

/**
 * An APIClient maintains authentication state and provides an interface to
 * third party data APIs.
 *
 * It is recommended that integrations wrap provider data APIs to provide a
 * place to handle error responses and implement common patterns for iterating
 * resources.
 */
export class APIClient {
  constructor(readonly config: IntegrationConfig) {}
  private baseUri = 'https://api.cloudsploit.com/v2/';
  private envUri = 'https://prov.cloud.aquasec.com/v1/';
  private withBaseUri = (path: string, uri: string = this.baseUri) =>
    `${uri}${path}`;
  private sessionId = '';

  private checkStatus = (response: Response) => {
    if (response.ok) {
      return response;
    } else {
      throw new IntegrationProviderAPIError(response);
    }
  };

  private async request(
    uri: string,
    method: 'GET' | 'HEAD' = 'GET',
  ): Promise<Response> {
    const sessionId = await this.getSessionId();
    try {
      const options = {
        method,
        headers: {
          Authorization: `Bearer ${sessionId}`,
        },
      };

      // Handle rate-limiting
      const response = await retry(
        async () => {
          const res: Response = await fetch(uri, options);
          this.checkStatus(res);
          return res;
        },
        {
          delay: 5000,
          maxAttempts: 10,
          handleError: (err, context) => {
            if (
              err.statusCode !== 429 ||
              ([500, 502, 503].includes(err.statusCode) &&
                context.attemptNum > 1)
            )
              context.abort();
          },
        },
      );
      return response.json();
    } catch (err) {
      throw new IntegrationProviderAPIError({
        endpoint: uri,
        status: err.status,
        statusText: err.statusText,
      });
    }
  }

  private async getSessionId(): Promise<string> {
    const uri = this.withBaseUri('signin');
    if (!this.sessionId) {
      try {
        const res: Response = await fetch(uri, {
          method: 'POST',
          body: JSON.stringify({
            email: this.config.username,
            password: this.config.password,
          }),
        });
        this.checkStatus(res);
        const sessionId = await res.json();
        this.sessionId = sessionId.data.token;
      } catch (err) {
        throw new IntegrationProviderAPIError({
          endpoint: uri,
          status: err.status,
          statusText: err.statusText,
        });
      }
    }
    return this.sessionId;
  }

  public async verifyAuthentication(): Promise<void> {
    const uri = this.withBaseUri('users');
    try {
      await this.request(uri);
    } catch (err) {
      throw new IntegrationProviderAuthenticationError({
        cause: err,
        endpoint: uri,
        status: err.status,
        statusText: err.statusText,
      });
    }
  }

  public async getAccount(): Promise<AquasecTrivyAccount> {
    return this.request(this.withBaseUri('envs', this.envUri));
  }

  public async iterateUsers(
    iteratee: ResourceIteratee<AquasecTrivyUser>,
  ): Promise<void> {
    const res: AquasecTrivyUserResponse = await this.request(
      this.withBaseUri('users'),
    );

    for (const user of res.data) {
      await iteratee(user);
    }
  }

  public async iterateGroups(
    iteratee: ResourceIteratee<AquasecTrivyGroup>,
  ): Promise<void> {
    const res: AquasecTrivyGroupResponse = await this.request(
      this.withBaseUri('groups'),
    );

    for (const group of res.data) {
      await iteratee(group);
    }
  }

  public async getGroup(id: string): Promise<AquasecTrivyGroupDetails> {
    return this.request(this.withBaseUri(`groups/${id}`));
  }

  public async iterateRoles(
    uri: string,
    iteratee: ResourceIteratee<AquasecTrivyRole>,
  ): Promise<void> {
    const res: AquasecTrivyRoleResponse = await this.request(
      this.withBaseUri('access_management/roles', `https://${uri}/api/v2/`),
    );

    for (const role of res.result) {
      await iteratee(role);
    }
  }

  public async iteratePermissions(
    uri: string,
    iteratee: ResourceIteratee<AquasecTrivyPermission>,
  ): Promise<void> {
    const res: AquasecTrivyPermissionResponse = await this.request(
      this.withBaseUri(
        'access_management/permissions',
        `https://${uri}/api/v2/`,
      ),
    );

    for (const permission of res.result) {
      await iteratee(permission);
    }
  }
}

export function createAPIClient(config: IntegrationConfig): APIClient {
  return new APIClient(config);
}
