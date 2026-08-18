# Context

Consolidate database access into a single source of truth. Currently Supabase queries are scattered across libs. The goal is to create a `libs/db/` directory with query files per table, each exporting typed functions.

## Brief

Create a centralized database access layer with typed functions for each table, eliminating scattered Supabase queries and providing a consistent interface for all database operations.

## Relevant Files

- `libs/db/index.ts` - Main barrel export (to be created)
- `libs/db/users.ts` - User queries (to be created)
- `libs/db/companies.ts` - Company queries (to be created)
- `libs/db/subscriptions.ts` - Subscription queries (to be created)
- `libs/supabase.js` - Current Supabase client setup
- `types/database.ts` - Database types (to be created or updated)

### Notes

- Use Supabase's generated types if available
- Consider adding query caching where appropriate

## Tasks

- [ ] 1.0 Set up database types
  - [ ] 1.1 **Clarify:** Are Supabase generated types already available or should we create them?
  - [ ] 1.2 Generate or create database types from schema
  - [ ] 1.3 Create `types/database.ts` with all table types
  - [ ] 1.4 Export types for use across the app

- [ ] 2.0 Create database module structure
  - [ ] 2.1 **Clarify:** Should the db layer handle its own error wrapping or pass through Supabase errors?
  - [ ] 2.2 Create `libs/db/` directory
  - [ ] 2.3 Create `libs/db/client.ts` for Supabase client initialization
  - [ ] 2.4 Create `libs/db/index.ts` barrel export

- [ ] 3.0 Implement user queries
  - [ ] 3.1 **Clarify:** What user queries are most commonly used in the app?
  - [ ] 3.2 Create `libs/db/users.ts`
  - [ ] 3.3 Add `getUserById`, `getUserByEmail` functions
  - [ ] 3.4 Add `updateUser`, `createUser` functions
  - [ ] 3.5 Add proper return types to all functions

- [ ] 4.0 Implement company queries
  - [ ] 4.1 **Clarify:** Are there any company queries that join with other tables?
  - [ ] 4.2 Create `libs/db/companies.ts`
  - [ ] 4.3 Add standard CRUD operations
  - [ ] 4.4 Add any company-specific queries

- [ ] 5.0 Implement subscription queries
  - [ ] 5.1 **Clarify:** Should subscription queries include related user/company data?
  - [ ] 5.2 Create `libs/db/subscriptions.ts`
  - [ ] 5.3 Add subscription management functions
  - [ ] 5.4 Add subscription status check helpers

- [ ] 6.0 Migrate existing code
  - [ ] 6.1 **Clarify:** Should we deprecate the old query locations or remove them immediately?
  - [ ] 6.2 Find all direct Supabase queries in the codebase
  - [ ] 6.3 Replace with new db function calls
  - [ ] 6.4 Remove old scattered query code
  - [ ] 6.5 Test all affected features
