# Context

Add barrel exports to all libs folders. Currently there are deep imports like `import { x } from '@/libs/auth/utils/session'`. The goal is to have clean imports from module roots like `import { x } from '@/libs/auth'`.

## Brief

Create `index.ts` barrel export files for each module in `libs/`, re-exporting public APIs and types to simplify imports and establish clear module boundaries.

## Relevant Files

- `libs/auth/index.ts` - Auth module barrel (to be created)
- `libs/api/index.ts` - API module barrel (to be created)
- `libs/db/index.ts` - Database module barrel (to be created)
- `libs/*/index.ts` - Other module barrels as needed

### Notes

- Only export public APIs, keep internal utilities private
- Types should be exported with `export type` for proper tree-shaking

## Tasks

- [ ] 1.0 Audit libs module structure
  - [ ] 1.1 **Clarify:** Which libs folders should be treated as modules with barrel exports?
  - [ ] 1.2 List all folders in `libs/`
  - [ ] 1.3 Identify public APIs in each module
  - [ ] 1.4 Identify types that should be exported

- [ ] 2.0 Define export conventions
  - [ ] 2.1 **Clarify:** Should we use named exports only or allow default exports?
  - [ ] 2.2 Decide on naming conventions for re-exports
  - [ ] 2.3 Define what stays internal vs public
  - [ ] 2.4 Document the barrel export pattern

- [ ] 3.0 Create barrel exports for auth module
  - [ ] 3.1 **Clarify:** What are the main public APIs for auth (getUser, signIn, etc.)?
  - [ ] 3.2 Create `libs/auth/index.ts`
  - [ ] 3.3 Export functions from session/actions
  - [ ] 3.4 Export types with `export type`

- [ ] 4.0 Create barrel exports for other modules
  - [ ] 4.1 **Clarify:** Are there any circular dependency risks between modules?
  - [ ] 4.2 Create index.ts for each libs subfolder
  - [ ] 4.3 Export only public APIs
  - [ ] 4.4 Keep internal utilities unexported

- [ ] 5.0 Update imports across codebase
  - [ ] 5.1 **Clarify:** Should old deep imports be forbidden via eslint?
  - [ ] 5.2 Find all deep imports into libs
  - [ ] 5.3 Replace with module root imports
  - [ ] 5.4 Verify no broken imports

- [ ] 6.0 Add lint rules (optional)
  - [ ] 6.1 **Clarify:** Should we enforce module boundaries with eslint?
  - [ ] 6.2 Add no-restricted-imports rule for deep paths
  - [ ] 6.3 Test lint rules work correctly
  - [ ] 6.4 Update CI if needed
