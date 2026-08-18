# Context

Centralize environment configuration. Currently `process.env` is accessed directly everywhere. The goal is to create a single typed config object that validates and provides all environment variables.

## Brief

Create a centralized `libs/config.ts` that exports a typed configuration object, with validation for required variables and sensible defaults for optional ones.

## Relevant Files

- `libs/config.ts` - Central config module (to be created)
- `config.js` - Current config file (to be migrated/replaced)
- `.env.example` - Environment variable template (to be updated)

### Notes

- Use Zod for runtime validation of environment variables
- Fail fast at startup if required variables are missing

## Tasks

- [ ] 1.0 Audit current environment usage
  - [ ] 1.1 **Clarify:** Are there any environment variables that differ between client and server?
  - [ ] 1.2 Search codebase for all `process.env` usages
  - [ ] 1.3 List all required vs optional variables
  - [ ] 1.4 Identify any current validation logic

- [ ] 2.0 Create config schema
  - [ ] 2.1 **Clarify:** Should config be validated at build time, runtime, or both?
  - [ ] 2.2 Create Zod schema for all environment variables
  - [ ] 2.3 Define required variables with `requireEnv` helper
  - [ ] 2.4 Define optional variables with defaults

- [ ] 3.0 Build config module
  - [ ] 3.1 **Clarify:** Should config be a plain object or a class with methods?
  - [ ] 3.2 Create `libs/config.ts`
  - [ ] 3.3 Group config by service (supabase, stripe, etc.)
  - [ ] 3.4 Export as `const` for type inference
  - [ ] 3.5 Add validation at module load time

- [ ] 4.0 Handle public vs private config
  - [ ] 4.1 **Clarify:** What's the pattern for exposing config to client components?
  - [ ] 4.2 Separate public (`NEXT_PUBLIC_*`) from private config
  - [ ] 4.3 Create client-safe config export if needed
  - [ ] 4.4 Ensure server-only config can't leak to client

- [ ] 5.0 Migrate codebase
  - [ ] 5.1 **Clarify:** Should migration happen all at once or incrementally?
  - [ ] 5.2 Replace all `process.env` accesses with config imports
  - [ ] 5.3 Update any dynamic env access patterns
  - [ ] 5.4 Remove old config.js if fully replaced

- [ ] 6.0 Update documentation
  - [ ] 6.1 **Clarify:** Should .env.example include descriptions for each variable?
  - [ ] 6.2 Update `.env.example` with all variables
  - [ ] 6.3 Add inline comments for complex config
  - [ ] 6.4 Document how to add new config variables
