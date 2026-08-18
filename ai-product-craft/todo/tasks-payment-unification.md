# Context

Unify the payment provider interface. Currently Stripe and Paddle logic are separate. The goal is to create a single payment interface that abstracts the provider, making it easy to swap providers or support multiple.

## Brief

Create a `PaymentProvider` interface and implement it for both Stripe and Paddle, allowing the application to use a consistent API regardless of which payment provider is active.

## Relevant Files

- `libs/payments/provider.ts` - Payment interface definition (to be created)
- `libs/payments/stripe.ts` - Stripe implementation (to be created)
- `libs/payments/paddle.ts` - Paddle implementation (to be created)
- `libs/payments/index.ts` - Factory/barrel export (to be created)
- `libs/stripe.js` - Current Stripe code (to be refactored)
- `libs/paddle.js` - Current Paddle code (if exists, to be refactored)

### Notes

- Consider using a factory pattern to instantiate the correct provider
- Environment variables should control which provider is active

## Tasks

- [ ] 1.0 Define payment provider interface
  - [ ] 1.1 **Clarify:** What payment operations are currently used across both providers?
  - [ ] 1.2 Create `libs/payments/provider.ts` with TypeScript interface
  - [ ] 1.3 Define `createCheckoutSession` method signature
  - [ ] 1.4 Define `cancelSubscription` method signature
  - [ ] 1.5 Define `getSubscription` method signature
  - [ ] 1.6 Define webhook handling interface if needed

- [ ] 2.0 Create shared payment types
  - [ ] 2.1 **Clarify:** What subscription statuses need to be normalized across providers?
  - [ ] 2.2 Create `CheckoutParams` type
  - [ ] 2.3 Create `Subscription` type (provider-agnostic)
  - [ ] 2.4 Create `PaymentEvent` type for webhooks

- [ ] 3.0 Implement Stripe provider
  - [ ] 3.1 **Clarify:** Are there any Stripe-specific features that can't be abstracted?
  - [ ] 3.2 Create `libs/payments/stripe.ts` implementing `PaymentProvider`
  - [ ] 3.3 Migrate existing Stripe logic to new structure
  - [ ] 3.4 Add proper error handling
  - [ ] 3.5 Test checkout flow

- [ ] 4.0 Implement Paddle provider
  - [ ] 4.1 **Clarify:** Is Paddle currently in use or planned for future use?
  - [ ] 4.2 Create `libs/payments/paddle.ts` implementing `PaymentProvider`
  - [ ] 4.3 Implement all required methods
  - [ ] 4.4 Handle Paddle-specific quirks internally

- [ ] 5.0 Create provider factory
  - [ ] 5.1 **Clarify:** Should provider be determined at build time or runtime?
  - [ ] 5.2 Create `libs/payments/index.ts` with factory function
  - [ ] 5.3 Read provider config from environment
  - [ ] 5.4 Export singleton or factory pattern

- [ ] 6.0 Migrate application code
  - [ ] 6.1 **Clarify:** Are there any direct Stripe/Paddle SDK calls that should remain?
  - [ ] 6.2 Update all payment-related API routes
  - [ ] 6.3 Update webhook handlers
  - [ ] 6.4 Remove old payment code
  - [ ] 6.5 Test complete payment flows
