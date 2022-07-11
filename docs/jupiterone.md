# Aquasecurity Trivy Integration with JupiterOne

## Aquasecurity Trivy + JupiterOne Integration Benefits

TODO: Iterate the benefits of ingesting data from the provider into JupiterOne.
Consider the following examples:

- Visualize Aquasecurity Trivy account, action, groups, permissions, registries,
  repositories, roles, users, and vulnerabilities in the JupiterOne graph.
- Map Aquasecurity Trivy users to employees in your JupiterOne account.
- Monitor changes to Aquasecurity Trivy users using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches account, action, groups, permissions,
  registries, repositories, roles, users, and vulnerabilities from Aquasecurity
  Trivy to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- Aquasecurity Trivy uses Bearer token authorization. You must have a
  Administrator user account.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Aquasecurity Trivy

1. Click the top-left button
2. Go to Account Management menu
3. Click the Add New dropdown
4. Select User
5. Enter the user email account
6. Make sure that the account is a system admin

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Aquasecurity Trivy** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Aquasecurity
  Trivy account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Aquasecurity Trivy Username** and **Aquasecurity Trivy Password**
  generated for use by JupiterOne.

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Aquasecurity Trivy** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

<!-- {J1_DOCUMENTATION_MARKER_START} -->
<!--
********************************************************************************
NOTE: ALL OF THE FOLLOWING DOCUMENTATION IS GENERATED USING THE
"j1-integration document" COMMAND. DO NOT EDIT BY HAND! PLEASE SEE THE DEVELOPER
DOCUMENTATION FOR USAGE INFORMATION:

https://github.com/JupiterOne/sdk/blob/main/docs/integrations/development.md
********************************************************************************
-->

## Data Model

### Entities

The following entities are created:

| Resources     | Entity `_type`                | Entity `_class` |
| ------------- | ----------------------------- | --------------- |
| Account       | `aquasec_trivy_account`       | `Account`       |
| Action        | `aquasec_trivy_action`        | `Entity`        |
| Permission    | `aquasec_trivy_permission`    | `Entity`        |
| Registry      | `aquasec_trivy_registry`      | `Entity`        |
| Repository    | `aquasec_trivy_repository`    | `Repository`    |
| Role          | `aquasec_trivy_role`          | `AccessRole`    |
| User          | `aquasec_trivy_user`          | `User`          |
| UserGroup     | `aquasec_trivy_group`         | `UserGroup`     |
| Vulnerability | `aquasec_trivy_vulnerability` | `Vulnerability` |

### Relationships

The following relationships are created:

| Source Entity `_type`      | Relationship `_class` | Target Entity `_type`         |
| -------------------------- | --------------------- | ----------------------------- |
| `aquasec_trivy_account`    | **HAS**               | `aquasec_trivy_action`        |
| `aquasec_trivy_account`    | **HAS**               | `aquasec_trivy_group`         |
| `aquasec_trivy_account`    | **HAS**               | `aquasec_trivy_permission`    |
| `aquasec_trivy_account`    | **HAS**               | `aquasec_trivy_registry`      |
| `aquasec_trivy_account`    | **HAS**               | `aquasec_trivy_repository`    |
| `aquasec_trivy_account`    | **HAS**               | `aquasec_trivy_role`          |
| `aquasec_trivy_account`    | **HAS**               | `aquasec_trivy_user`          |
| `aquasec_trivy_account`    | **HAS**               | `aquasec_trivy_vulnerability` |
| `aquasec_trivy_group`      | **HAS**               | `aquasec_trivy_user`          |
| `aquasec_trivy_permission` | **HAS**               | `aquasec_trivy_action`        |
| `aquasec_trivy_registry`   | **HAS**               | `aquasec_trivy_repository`    |
| `aquasec_trivy_repository` | **HAS**               | `aquasec_trivy_vulnerability` |
| `aquasec_trivy_user`       | **CREATED**           | `aquasec_trivy_permission`    |
| `aquasec_trivy_user`       | **CREATED**           | `aquasec_trivy_repository`    |
| `aquasec_trivy_user`       | **CREATED**           | `aquasec_trivy_role`          |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
