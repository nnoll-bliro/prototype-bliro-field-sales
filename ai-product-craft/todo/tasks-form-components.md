# Context

Create shared form components to reduce duplication. Currently form logic is duplicated across pages. The goal is to build reusable form primitives on top of react-hook-form with typed wrappers.

## Brief

Create a library of typed, reusable form components (FormField, FormSelect, FormCheckbox, etc.) that integrate with react-hook-form and reduce code duplication across the application.

## Relevant Files

- `components/forms/FormField.tsx` - Text input component (to be created)
- `components/forms/FormSelect.tsx` - Select component (to be created)
- `components/forms/FormCheckbox.tsx` - Checkbox component (to be created)
- `components/forms/FormTextarea.tsx` - Textarea component (to be created)
- `components/forms/index.ts` - Barrel export (to be created)

### Notes

- Use react-hook-form's `useFormContext` for field registration
- Integrate with existing UI component library styling

## Tasks

- [ ] 1.0 Design form component API
  - [ ] 1.1 **Clarify:** What styling system are forms currently using (Tailwind, CSS modules, etc.)?
  - [ ] 1.2 Define consistent prop interface for all form components
  - [ ] 1.3 Decide on error display pattern (inline, tooltip, etc.)
  - [ ] 1.4 Plan integration with react-hook-form

- [ ] 2.0 Create base form infrastructure
  - [ ] 2.1 **Clarify:** Should form components use the Controller pattern or native register?
  - [ ] 2.2 Create `components/forms/` directory
  - [ ] 2.3 Create shared types for form components
  - [ ] 2.4 Create FormWrapper component if needed

- [ ] 3.0 Build FormField component
  - [ ] 3.1 **Clarify:** What input types need to be supported (text, email, password, number)?
  - [ ] 3.2 Create `FormField.tsx` with label, input, and error display
  - [ ] 3.3 Add support for different input types
  - [ ] 3.4 Add proper TypeScript generics for field values
  - [ ] 3.5 Add accessibility attributes (aria-invalid, etc.)

- [ ] 4.0 Build FormSelect component
  - [ ] 4.1 **Clarify:** Should select support async option loading?
  - [ ] 4.2 Create `FormSelect.tsx` with typed options
  - [ ] 4.3 Support both single and multi-select if needed
  - [ ] 4.4 Add proper error handling

- [ ] 5.0 Build additional form components
  - [ ] 5.1 **Clarify:** What other form controls are commonly used (radio, toggle, date picker)?
  - [ ] 5.2 Create `FormCheckbox.tsx`
  - [ ] 5.3 Create `FormTextarea.tsx`
  - [ ] 5.4 Create any additional needed components

- [ ] 6.0 Migrate existing forms
  - [ ] 6.1 **Clarify:** Which existing forms should be migrated first as proof of concept?
  - [ ] 6.2 Identify all forms in the application
  - [ ] 6.3 Migrate forms to use new components
  - [ ] 6.4 Remove duplicated form code
  - [ ] 6.5 Test all migrated forms
