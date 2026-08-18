# Context

Standardize API route patterns across the application. Currently there is inconsistent error handling and response formats. The goal is to create a single pattern for all API routes that makes the codebase more maintainable and agent-friendly.

## Brief

Create standard API utilities (`apiResponse`, `apiError`, `withAuth`) and refactor all existing API routes to use consistent patterns for responses, error handling, and authentication.

## Relevant Files

- `libs/api/index.ts` - New file for API utilities (to be created)
- `libs/api/validate.ts` - New file for request validation (to be created)
- `app/api/**/*.ts` - All existing API routes
- `libs/errors.ts` - Error classes (to be created)

### Notes

- Run tests after each route migration to ensure functionality
- Consider backwards compatibility during migration

## Tasks

- [ ] 1.0 Create API utility foundation
  - [ ] 1.1 **Clarify:** What standard response shape works best - `{ data, error }` or `{ success, data, error }`?
  - [ ] 1.2 Create `libs/api/index.ts` with `apiResponse` helper
  - [ ] 1.3 Add `apiError` helper function
  - [ ] 1.4 Add TypeScript generics for type-safe responses

- [ ] 2.0 Create authentication wrapper
  - [ ] 2.1 **Clarify:** Should unauthenticated requests return 401 or redirect to login?
  - [ ] 2.2 Create `withAuth` higher-order function
  - [ ] 2.3 Add proper typing for authenticated handlers
  - [ ] 2.4 Include user object injection into handler

- [ ] 3.0 Create request validation utilities
  - [ ] 3.1 **Clarify:** Should validation errors return detailed field-level errors or a single message?
  - [ ] 3.2 Create `libs/api/validate.ts` with Zod integration
  - [ ] 3.3 Add `validateBody` helper function
  - [ ] 3.4 Add `validateQuery` helper for query params
  - [ ] 3.5 Create standard validation error response format

- [ ] 4.0 Create standard error classes
  - [ ] 4.1 **Clarify:** What error codes should be standardized across the app?
  - [ ] 4.2 Create `libs/errors.ts` with base `AppError` class
  - [ ] 4.3 Add `NotFoundError`, `UnauthorizedError`, `ValidationError`
  - [ ] 4.4 Add error-to-response conversion utility

- [ ] 5.0 Migrate existing API routes
  - [ ] 5.1 **Clarify:** Should migration happen all at once or route-by-route?
  - [ ] 5.2 Audit all existing API routes
  - [ ] 5.3 Update each route to use new utilities
  - [ ] 5.4 Add proper request validation to each route
  - [ ] 5.5 Test each migrated route

- [ ] 6.0 Document API patterns
  - [ ] 6.1 **Clarify:** Where should API documentation live - in code comments or a separate doc?
  - [ ] 6.2 Add usage examples to utility files
  - [ ] 6.3 Create a route template for future development
