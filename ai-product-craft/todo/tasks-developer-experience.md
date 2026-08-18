# Context

Improve developer experience with path aliases, code generation scripts, and documented conventions. These improvements make the codebase more consistent and easier to work with.

## Brief

Ensure all imports use `@/` prefix, create scripts to generate boilerplate for common patterns, and document coding conventions in a CONVENTIONS.md file.

## Relevant Files

- `tsconfig.json` - Path aliases configuration
- `package.json` - Script definitions
- `scripts/generate-api.js` - API generator (to be created)
- `scripts/generate-service.js` - Service generator (to be created)
- `CONVENTIONS.md` - Coding conventions doc (to be created)

### Notes

- Code generators should follow established patterns
- Conventions should reflect actual codebase practices

## Tasks

- [ ] 1.0 Verify and update path aliases
  - [ ] 1.1 **Clarify:** Are there any current relative imports that should remain relative?
  - [ ] 1.2 Check tsconfig.json paths configuration
  - [ ] 1.3 Find all relative imports in the codebase
  - [ ] 1.4 Convert relative imports to `@/` prefix
  - [ ] 1.5 Verify IDE support for aliases

- [ ] 2.0 Create API route generator
  - [ ] 2.1 **Clarify:** What's the standard structure for a new API route?
  - [ ] 2.2 Create `scripts/generate-api.js`
  - [ ] 2.3 Generate route file with standard imports
  - [ ] 2.4 Include validation setup
  - [ ] 2.5 Include auth wrapper if authenticated route
  - [ ] 2.6 Add `npm run generate:api` script

- [ ] 3.0 Create service generator
  - [ ] 3.1 **Clarify:** What's the standard service file structure?
  - [ ] 3.2 Create `scripts/generate-service.js`
  - [ ] 3.3 Generate service file with standard exports
  - [ ] 3.4 Include type definitions
  - [ ] 3.5 Add `npm run generate:service` script

- [ ] 4.0 Create component generator (optional)
  - [ ] 4.1 **Clarify:** Is a component generator valuable or overkill?
  - [ ] 4.2 Create `scripts/generate-component.js` if needed
  - [ ] 4.3 Generate component with props interface
  - [ ] 4.4 Add to package.json scripts

- [ ] 5.0 Document coding conventions
  - [ ] 5.1 **Clarify:** What conventions are most important to document?
  - [ ] 5.2 Create `CONVENTIONS.md`
  - [ ] 5.3 Document file naming conventions
  - [ ] 5.4 Document component structure patterns
  - [ ] 5.5 Document API route patterns
  - [ ] 5.6 Document error handling approach
  - [ ] 5.7 Document testing expectations

- [ ] 6.0 Improve development setup
  - [ ] 6.1 **Clarify:** Are there any pain points in the current dev setup?
  - [ ] 6.2 Update README with setup instructions if needed
  - [ ] 6.3 Add useful npm scripts if missing
  - [ ] 6.4 Verify ESLint/Prettier configuration
