# Context

Add integration test helpers for easier API route testing. The goal is to create utilities that make it easy to set up test requests, mock users, and mock external services like Supabase and Stripe.

## Brief

Create a `test/helpers.ts` file with utilities for creating test requests, mocking authenticated users, and mocking external service calls, making integration tests easier to write and maintain.

## Relevant Files

- `test/helpers.ts` - Test utilities (to be created)
- `test/mocks/supabase.ts` - Supabase mocks (to be created)
- `test/mocks/stripe.ts` - Stripe mocks (to be created)
- `jest.config.js` - Jest configuration
- `jest.setup.js` - Jest setup file

### Notes

- Use Jest's mock system for service mocks
- Consider MSW for more realistic API mocking

## Tasks

- [ ] 1.0 Design test helper API
  - [ ] 1.1 **Clarify:** What testing framework is currently in use (Jest, Vitest, etc.)?
  - [ ] 1.2 Define helper function signatures
  - [ ] 1.3 Plan mock data structures
  - [ ] 1.4 Decide on mock strategy (manual vs MSW)

- [ ] 2.0 Create request helpers
  - [ ] 2.1 **Clarify:** Should test requests go through the full Next.js handler or unit test functions?
  - [ ] 2.2 Create `createTestRequest` helper
  - [ ] 2.3 Add support for different HTTP methods
  - [ ] 2.4 Add JSON body helpers
  - [ ] 2.5 Add query parameter helpers

- [ ] 3.0 Create auth mocking helpers
  - [ ] 3.1 **Clarify:** How is the current user determined in API routes?
  - [ ] 3.2 Create `mockSupabaseUser` helper
  - [ ] 3.3 Add helper for different user roles/permissions
  - [ ] 3.4 Add cleanup function for mocks

- [ ] 4.0 Create Supabase mocking utilities
  - [ ] 4.1 **Clarify:** What Supabase operations are most commonly mocked?
  - [ ] 4.2 Create `test/mocks/supabase.ts`
  - [ ] 4.3 Mock database queries
  - [ ] 4.4 Mock auth state
  - [ ] 4.5 Add factory functions for test data

- [ ] 5.0 Create Stripe mocking utilities
  - [ ] 5.1 **Clarify:** What Stripe operations need to be mocked for tests?
  - [ ] 5.2 Create `test/mocks/stripe.ts`
  - [ ] 5.3 Mock checkout session creation
  - [ ] 5.4 Mock subscription retrieval
  - [ ] 5.5 Mock webhook payloads

- [ ] 6.0 Document testing patterns
  - [ ] 6.1 **Clarify:** Should test documentation live in code or a separate file?
  - [ ] 6.2 Add usage examples to helper files
  - [ ] 6.3 Create example test file demonstrating patterns
  - [ ] 6.4 Update any existing tests to use new helpers
