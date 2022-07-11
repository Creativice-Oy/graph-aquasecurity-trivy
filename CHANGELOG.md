# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Ingest new entities
  - `aquasec_trivy_account`
  - `aquasec_trivy_action`
  - `aquasec_trivy_permission`
  - `aquasec_trivy_registry`
  - `aquasec_trivy_repository`
  - `aquasec_trivy_role`
  - `aquasec_trivy_user`
  - `aquasec_trivy_group`
  - `aquasec_trivy_vulnerability`
- Build new relationships
  - `aquasec_trivy_account_has_action`
  - `aquasec_trivy_account_has_group`
  - `aquasec_trivy_account_has_permission`
  - `aquasec_trivy_account_has_registry`
  - `aquasec_trivy_account_has_repository`
  - `aquasec_trivy_account_has_role`
  - `aquasec_trivy_account_has_user`
  - `aquasec_trivy_account_has_vulnerability`
  - `aquasec_trivy_group_has_user`
  - `aquasec_trivy_permission_has_action`
  - `aquasec_trivy_registry_has_repository`
  - `aquasec_trivy_repository_has_vulnerability`
  - `aquasec_trivy_user_created_permission`
  - `aquasec_trivy_user_created_repository`
  - `aquasec_trivy_user_created_role`
