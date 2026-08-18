# Context

Add request validation to all API routes using Zod. The goal is to validate all incoming API request bodies, query parameters, and path parameters before processing them.

## Brief

Create Zod-based validation utilities and add proper validation to all API routes, ensuring type-safe request handling and clear error messages for invalid requests.

## Relevant Files

- `libs/api/validate.ts` - Validation utilities (to be created)
- `libs/api/schemas/` - Shared validation schemas (to be created)
- `app/api/**/*.ts` - All API routes

### Notes

- Zod integrates well with TypeScript for inferred types
- Consider coercion for query parameters (strings to numbers, etc.)

## Tasks

- [ ] 1.0 Set up Zod infrastructure
  - [ ] 1.1 **Clarify:** Is Zod already installed, or should we add it?
  - [ ] 1.2 Install Zod if needed
  - [ ] 1.3 Create `libs/api/validate.ts`
  - [ ] 1.4 Create helper types for validated handlers

- [ ] 2.0 Create validation utilities
  - [ ] 2.1 **Clarify:** What should happen on validation failure - return error or throw?
  - [ ] 2.2 Create `validateBody<T>` helper
  - [ ] 2.3 Create `validateQuery<T>` helper
  - [ ] 2.4 Create `validateParams<T>` helper for path params
  - [ ] 2.5 Add proper error formatting

- [ ] 3.0 Create shared schemas
  - [ ] 3.1 **Clarify:** What entities have shared validation rules across routes?
  - [ ] 3.2 Create `libs/api/schemas/` directory
  - [ ] 3.3 Add common schemas (email, uuid, etc.)
  - [ ] 3.4 Add entity schemas (user, company, etc.)
  - [ ] 3.5 Export schemas for reuse

- [ ] 4.0 Implement validation in existing routes
  - [ ] 4.1 **Clarify:** Should all routes be updated at once or prioritize by importance?
  - [ ] 4.2 Audit all API routes for current validation
  - [ ] 4.3 Add Zod validation to each route
  - [ ] 4.4 Infer request types from schemas
  - [ ] 4.5 Remove manual validation code

- [ ] 5.0 Handle edge cases
  - [ ] 5.1 **Clarify:** How should optional fields and defaults be handled?
  - [ ] 5.2 Handle coercion for query params
  - [ ] 5.3 Handle array parameters
  - [ ] 5.4 Handle nested objects
  - [ ] 5.5 Add custom error messages where helpful

- [ ] 6.0 Test validation behavior
  - [ ] 6.1 **Clarify:** Should validation errors be tested explicitly?
  - [ ] 6.2 Add tests for validation success cases
  - [ ] 6.3 Add tests for validation failure cases
  - [ ] 6.4 Verify error messages are user-friendly
