# Context

Standardize error handling across the application. Currently there's a mix of try/catch, error returns, and thrown errors. The goal is to create a consistent error handling pattern with typed error classes.

## Brief

Create a set of standard error classes (`AppError`, `NotFoundError`, `UnauthorizedError`, etc.) and establish a consistent pattern for throwing, catching, and converting errors to HTTP responses.

## Relevant Files

- `libs/errors.ts` - Error class definitions (to be created)
- `libs/api/error-handler.ts` - Error-to-response conversion (to be created)
- `app/api/**/*.ts` - API routes to update

### Notes

- Error classes should include error codes for client-side handling
- Consider adding error logging/monitoring integration points

## Tasks

- [ ] 1.0 Design error class hierarchy
  - [ ] 1.1 **Clarify:** What error categories are needed (validation, auth, not found, etc.)?
  - [ ] 1.2 Define base `AppError` class structure
  - [ ] 1.3 Plan error codes and their meanings
  - [ ] 1.4 Decide on error metadata (stack traces, context, etc.)

- [ ] 2.0 Create base error classes
  - [ ] 2.1 **Clarify:** Should errors include user-facing messages vs developer messages?
  - [ ] 2.2 Create `libs/errors.ts`
  - [ ] 2.3 Implement `AppError` base class with code and statusCode
  - [ ] 2.4 Add `toJSON` method for serialization

- [ ] 3.0 Create specific error classes
  - [ ] 3.1 **Clarify:** What's the expected behavior for each error type?
  - [ ] 3.2 Create `NotFoundError` class
  - [ ] 3.3 Create `UnauthorizedError` class
  - [ ] 3.4 Create `ValidationError` class
  - [ ] 3.5 Create `ForbiddenError` class
  - [ ] 3.6 Create `ConflictError` class (for duplicates)

- [ ] 4.0 Create error handling utilities
  - [ ] 4.1 **Clarify:** Should unknown errors be logged to an external service?
  - [ ] 4.2 Create `errorToResponse` utility function
  - [ ] 4.3 Handle unknown errors gracefully (500 response)
  - [ ] 4.4 Add error logging hook

- [ ] 5.0 Create API error middleware
  - [ ] 5.1 **Clarify:** Should API routes use try/catch or a wrapper function?
  - [ ] 5.2 Create `withErrorHandling` wrapper if using wrapper approach
  - [ ] 5.3 Document recommended error handling pattern
  - [ ] 5.4 Handle async errors properly

- [ ] 6.0 Migrate existing error handling
  - [ ] 6.1 **Clarify:** Should migration be gradual or all at once?
  - [ ] 6.2 Audit current error handling patterns
  - [ ] 6.3 Replace ad-hoc error handling with new pattern
  - [ ] 6.4 Update all API routes to use error classes
  - [ ] 6.5 Test error scenarios
