# Context

Move business logic out of API routes into a service layer. Currently API routes contain business logic directly. The goal is to have thin API routes that only handle HTTP concerns and delegate to services.

## Brief

Create a `libs/services/` directory with service files that encapsulate business logic, making API routes thin HTTP handlers and improving testability and reusability of business logic.

## Relevant Files

- `libs/services/user.service.ts` - User business logic (to be created)
- `libs/services/company.service.ts` - Company business logic (to be created)
- `libs/services/subscription.service.ts` - Subscription business logic (to be created)
- `libs/services/index.ts` - Barrel export (to be created)
- `app/api/**/*.ts` - API routes to be refactored

### Notes

- Services should be stateless and dependency-injectable
- Consider using a Result type for operations that can fail

## Tasks

- [ ] 1.0 Design service layer architecture
  - [ ] 1.1 **Clarify:** Should services use dependency injection or import dependencies directly?
  - [ ] 1.2 Define standard service method signatures
  - [ ] 1.3 Decide on error handling pattern (throw vs return Result)
  - [ ] 1.4 Plan how services interact with db layer

- [ ] 2.0 Create service infrastructure
  - [ ] 2.1 **Clarify:** Should services be classes or collections of functions?
  - [ ] 2.2 Create `libs/services/` directory
  - [ ] 2.3 Create shared service types if needed
  - [ ] 2.4 Create `libs/services/index.ts` barrel export

- [ ] 3.0 Implement user service
  - [ ] 3.1 **Clarify:** What user operations have the most complex business logic?
  - [ ] 3.2 Create `libs/services/user.service.ts`
  - [ ] 3.3 Move profile update logic from API routes
  - [ ] 3.4 Move user creation/deletion logic
  - [ ] 3.5 Add proper typing for all methods

- [ ] 4.0 Implement company service
  - [ ] 4.1 **Clarify:** Are there company operations that affect multiple tables?
  - [ ] 4.2 Create `libs/services/company.service.ts`
  - [ ] 4.3 Move company CRUD logic
  - [ ] 4.4 Handle company-user relationships

- [ ] 5.0 Implement subscription service
  - [ ] 5.1 **Clarify:** Should subscription service call payment provider or be separate?
  - [ ] 5.2 Create `libs/services/subscription.service.ts`
  - [ ] 5.3 Move subscription management logic
  - [ ] 5.4 Add subscription validation helpers

- [ ] 6.0 Refactor API routes
  - [ ] 6.1 **Clarify:** What pattern should thin API routes follow?
  - [ ] 6.2 Update user API routes to use user service
  - [ ] 6.3 Update company API routes to use company service
  - [ ] 6.4 Update subscription routes to use subscription service
  - [ ] 6.5 Remove business logic from all API routes
  - [ ] 6.6 Test all refactored endpoints
