# BACKEND.md

# Trading Journal App — Backend Specification

---

## 1. Purpose

This document defines the backend-specific architecture and implementation rules for the Trading Journal App.

It covers:

* Backend architecture
* MongoDB persistence
* Mongoose models
* Google authentication
* User onboarding
* Profile/KYC completion
* User profile management
* Trade persistence
* Authorization
* Resource ownership
* Validation
* Trading data integrity
* API conventions
* Security
* Backend testing
* Production considerations

This document complements:

* `AGENTS.md`
* `PRD.md`
* `ARCHITECTURE.md`
* `DESIGN.md`
* `DESIGN-SYSTEM.md`
* `IMPLEMENTATION.md`

These documents must be read together.

This document does not redefine product requirements, visual design, or the overall system architecture already defined elsewhere.

---

# 2. Backend Technology

## 2.1 Language

Use:

* JavaScript only.

Do not introduce:

* TypeScript
* `.ts`
* `.tsx`
* TypeScript configuration
* TypeScript-specific architecture

The entire backend must remain compatible with the project's JavaScript architecture.

---

## 2.2 Database

Use:

* MongoDB

MongoDB is the primary persistent database.

Do not introduce another primary database.

Do not replace MongoDB with:

* PostgreSQL
* MySQL
* SQLite
* Firebase
* Supabase
* DynamoDB
* Any other database system

---

## 2.3 ODM

Use:

* Mongoose

Mongoose is the MongoDB object-document modeling layer.

Use Mongoose for:

* Schemas
* Models
* Schema validation
* Indexes
* Database interaction
* Model-level behavior where appropriate

---

## 2.4 Authentication

The primary authentication method is:

* Google OAuth

Google authentication must be implemented using a proper OAuth/OIDC-compatible authentication flow.

Do not trust Google identity information supplied directly by the client.

The server must verify the authentication result before creating or authenticating a user.

---

# 3. Backend Principles

The backend must follow these principles:

1. Server-side responsibility must remain separate from client-side responsibility.
2. Database access must remain server-side.
3. Authentication must be verified server-side.
4. Authorization must be enforced server-side.
5. Client-provided data must always be treated as untrusted.
6. Persistent data must be validated before storage.
7. Users must only access resources they are authorized to access.
8. Database credentials must never be exposed to the browser.
9. Google authentication data must be verified before use.
10. User profile data must be separated from authentication identity data.
11. Trading data must belong to an authenticated user.
12. Business calculations must remain consistent.
13. Backend errors must be handled consistently.
14. Avoid unnecessary abstraction.
15. Avoid premature infrastructure.
16. Preserve compatibility with the existing frontend.
17. Do not collect unnecessary personal information.
18. Do not silently change product requirements.

---

# 4. Backend Responsibility Boundary

The backend is responsible for:

* Authentication
* Google identity verification
* User creation
* User lookup
* User profile persistence
* Profile completion status
* Onboarding state
* Authorization
* Trade persistence
* Server-side validation
* Trading data integrity
* Business calculations where required
* Database operations
* Resource ownership
* API/service operations
* Error handling
* Security-sensitive operations

The frontend is responsible for:

* Presentation
* User interaction
* Client-side form feedback
* UI state
* Loading states
* Displaying backend responses
* Client-side validation for UX

Client-side validation is never a security boundary.

---

# 5. Architecture

The backend should follow this general flow:

```text
Client UI
   ↓
Application / API Layer
   ↓
Authentication
   ↓
Authorization
   ↓
Validation
   ↓
Business Logic
   ↓
Data Access
   ↓
Mongoose Models
   ↓
MongoDB
```

For authentication:

```text
User
   ↓
Google OAuth
   ↓
Google Identity Verification
   ↓
Application Authentication
   ↓
User Lookup / Creation
   ↓
Profile Completion Check
   ↓
Application Access
```

For protected resources:

```text
Authenticated User
   ↓
Authorization
   ↓
Ownership Check
   ↓
Business Logic
   ↓
MongoDB
```

Do not allow UI components to directly communicate with Mongoose.

Do not import database modules into client components.

---

# 6. Database Connection

MongoDB connection logic must be centralized.

The database connection utility must:

* Read the MongoDB URI from environment configuration.
* Establish the Mongoose connection.
* Reuse the connection where appropriate.
* Handle connection failures.
* Avoid unnecessary connection creation.
* Support development and production.
* Never expose connection details to clients.

MongoDB credentials must never be hardcoded.

---

# 7. Environment Variables

Sensitive configuration must be stored in environment variables.

The backend will require a MongoDB connection variable such as:

```text
MONGODB_URI
```

Google authentication will require appropriate server-side OAuth configuration, such as:

```text
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
```

The exact environment-variable names must follow the authentication implementation selected by the project architecture.

Additional authentication/session variables may be required.

For example:

```text
AUTH_SECRET
```

or the equivalent required by the chosen authentication implementation.

Do not create duplicate authentication configuration systems.

---

## 7.1 Environment Security

Environment variables containing secrets must:

* Never be committed to Git.
* Never be returned by APIs.
* Never be embedded into client-side JavaScript.
* Never be logged.
* Never appear in error messages.
* Never be exposed in browser network responses.

An `.env.example` file should contain placeholders only.

Example:

```text
MONGODB_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
AUTH_SECRET=
```

Do not put real credentials into `.env.example`.

---

# 8. Authentication Architecture

Google is the primary authentication provider.

The application must not implement Google login as a simple frontend-only action.

The authentication flow must be verified by the backend/authentication layer.

---

# 9. Google Login Flow

The intended authentication flow is:

```text
User
   ↓
Continue with Google
   ↓
Google OAuth
   ↓
Google authenticates user
   ↓
Google returns authorization result
   ↓
Backend/Auth layer verifies result
   ↓
Find user
   ↓
Existing user?
   ├── Yes
   │     ↓
   │  Load application user
   │
   └── No
         ↓
      Create application user
   ↓
Check profile completion
   ↓
Complete profile?
   ├── Yes → Dashboard
   └── No  → Profile/KYC onboarding
```

The backend must not accept arbitrary:

```text
googleId
email
name
avatar
```

from the browser as proof of authentication.

These values must originate from the verified Google authentication result.

---

# 10. Google Identity Data

Google may provide identity information such as:

* Google account identifier
* Email
* Email verification state
* Name
* Profile image

The application may store the information required by the product.

Do not automatically store every field returned by Google.

Only persist information that is useful and justified.

---

# 11. Authentication Identity vs Application Profile

Authentication identity and application profile must be treated as separate concepts.

Authentication identity answers:

> Who authenticated with Google?

Application profile answers:

> What information does this user provide for using the Trading Journal App?

Conceptually:

```text
User
├── Authentication Identity
│   ├── provider
│   ├── providerAccountId
│   ├── email
│   └── emailVerified
│
└── Application Profile
    ├── name
    ├── avatar
    ├── phone
    └── other required profile information
```

The exact structure may differ according to the final schema.

Do not allow ordinary profile editing to modify provider-controlled authentication identity fields.

---

# 12. User Model

The User model represents the application's authenticated user.

The model should support:

```text
Authentication
Profile
Onboarding
Preferences
Timestamps
```

The initial model is expected to contain concepts such as:

```text
provider
providerAccountId
email
emailVerified
profile
profileCompleted
onboardingCompleted
createdAt
updatedAt
```

The exact fields must be finalized during the database-model phase.

Do not add unnecessary personal information.

---

# 13. Google Account Linking

The application must use a stable Google provider identifier where appropriate.

Email may be used as an identity attribute, but the authentication implementation must follow the provider's verified identity rules.

Do not allow a user to arbitrarily change the authentication provider identifier.

If account linking is introduced later, it must require explicit authenticated user intent and secure verification.

Do not automatically merge unrelated accounts based only on an unverified client-provided email.

---

# 14. Existing User Login

When a user authenticates with Google:

```text
Google Authentication
        ↓
Verified Identity
        ↓
Find Application User
        ↓
Existing User
        ↓
Load User
        ↓
Check Profile Completion
```

If the user's profile is complete:

```text
→ Application Dashboard
```

If the profile is incomplete:

```text
→ Profile Completion
```

The user should not be forced through onboarding repeatedly after completing it.

---

# 15. New User Registration

There is no traditional standalone username/password registration requirement unless explicitly added later.

A new application user is created when a user successfully authenticates with Google for the first time.

Flow:

```text
Google Login
   ↓
Verified Google Identity
   ↓
No existing application user
   ↓
Create User
   ↓
Store required Google identity information
   ↓
Mark profile as incomplete
   ↓
Profile/KYC onboarding
```

The application should not create an authenticated user based only on a frontend-submitted email.

---

# 16. Profile Completion / KYC

The application requires an onboarding/profile completion step for new users.

This step may be referred to as:

* Profile Completion
* KYC
* Onboarding

However, the application must only collect information actually required by the product.

Do not collect sensitive financial, government, identity-document, or other regulated information unless explicitly required by the product and separately approved.

Google authentication itself does not constitute application KYC.

---

# 17. KYC / Profile Completion Principle

The onboarding form must collect only required application information.

Potential fields may include:

```text
Name
Phone
Other application-required profile information
```

The exact fields must be determined from the product requirements.

Do not invent mandatory fields merely because they are common in financial applications.

---

# 18. Profile Completion State

The User model must provide a reliable way to determine whether onboarding is complete.

Conceptually:

```text
profileCompleted: false
```

for a new user.

After the required profile information has been saved and validated:

```text
profileCompleted: true
```

The backend must determine this state.

Do not rely solely on a client-side boolean.

If required fields are removed or invalidated later, the backend should be able to recognize that the profile is incomplete when appropriate.

---

# 19. Onboarding Flow

The expected onboarding flow is:

```text
New Google User
      ↓
Application User Created
      ↓
Profile Incomplete
      ↓
Profile/KYC Form
      ↓
Server Validation
      ↓
Save Profile
      ↓
Recalculate Completion State
      ↓
Profile Complete
      ↓
Dashboard
```

The frontend may display the onboarding screen, but the backend remains responsible for determining whether the user is actually complete.

---

# 20. Profile Updates

Users must be able to update their application profile after onboarding.

Expected flow:

```text
Settings
   ↓
Profile
   ↓
Edit
   ↓
Validation
   ↓
Save
   ↓
Updated Profile
```

Profile updates must be authenticated.

Users may only modify their own profile.

---

# 21. Protected Profile Fields

Not every User field should be editable by the user.

Provider-controlled fields such as:

```text
Google provider identifier
Authentication provider
Verified authentication identity
```

must not be freely editable through the profile API.

User-controlled fields may include:

```text
Name
Phone
Avatar
Other permitted profile fields
```

according to the final product requirements.

---

# 22. Profile API Security

A profile update request must:

1. Authenticate the user.
2. Identify the authenticated application user.
3. Validate submitted fields.
4. Restrict updates to allowed profile fields.
5. Save the changes.
6. Return only permitted profile information.

Never allow clients to update:

```text
userId
providerAccountId
role
permissions
authentication status
profileCompleted
```

unless the operation is explicitly controlled by trusted backend logic.

---

# 23. Profile Data Privacy

Only store profile information that the application actually needs.

Avoid unnecessary collection of:

* Government IDs.
* Passport information.
* Bank details.
* Financial account credentials.
* Sensitive personal data.
* Unnecessary location information.

If future requirements introduce regulated KYC information, that should be treated as a separate security and compliance requirement rather than casually added to the User model.

---

# 24. User Preferences

Application preferences may be stored on the User document or an appropriate related model if required.

Preferences must remain separate from authentication identity.

Examples may include:

```text
Display preferences
Trading preferences
Application preferences
```

The exact fields must follow the product requirements.

---

# 25. Trade Model

The Trade model is the central trading-journal entity.

Each trade must belong to exactly one application user.

Conceptually:

```text
User
  ↓
Trade
```

The model should support the fields required by the journal workflow.

Potential categories include:

```text
Ownership
Trade identification
Instrument
Direction
Entry
Stop loss
Target
Risk configuration
Reward configuration
Position information
Strategy/setup
Trade status
Trade result
P&L
R-multiple
Notes
Trade date
Timestamps
```

Only required product fields should be implemented.

---

# 26. Per-Trade Risk Percentage

Risk percentage belongs to an individual trade.

It must never be implemented as a mandatory global hardcoded application value.

Each trade must store its own risk percentage.

Example:

```text
Trade A
riskPercentage = 0.5

Trade B
riskPercentage = 1

Trade C
riskPercentage = 2.5
```

These values must remain independent.

Updating Trade B's risk percentage must not modify Trade A or Trade C.

---

# 27. Per-Trade Risk:Reward Ratio

Risk:Reward ratio belongs to an individual trade.

Each trade must store its own target Risk:Reward ratio.

Example:

```text
Trade A
riskRewardRatio = 2

Trade B
riskRewardRatio = 3

Trade C
riskRewardRatio = 1.5
```

The application must not assume a global:

```text
1:2
1:3
2:1
```

or any other mandatory RR ratio.

User-selected or manually entered values must be preserved per trade.

---

# 28. Trading Calculations

Where required by the product, trading calculations should be implemented consistently across frontend and backend.

Potential calculations include:

* Risk amount.
* Position size.
* Stop distance.
* Target distance.
* Target price.
* Potential reward.
* P&L.
* R-multiple.

The backend must not blindly trust client-provided calculated values when those values can be derived independently.

Where necessary, the backend should calculate or verify them.

The final formulas must follow the product requirements.

---

# 29. Trade Ownership

Every Trade must identify its owning user.

A user must only be able to:

* Create their own trades.
* Read their own trades.
* Update their own trades.
* Delete their own trades.

The backend must enforce ownership.

The frontend must never be treated as the ownership boundary.

---

# 30. Authorization

Authentication:

> Who is the user?

Authorization:

> Is this user allowed to perform this operation?

Every protected operation must perform both checks.

For example:

```text
GET /trades/:id
```

must verify:

```text
Authenticated user
+
Trade belongs to authenticated user
```

The same applies to:

```text
PATCH /trades/:id
DELETE /trades/:id
```

---

# 31. API Architecture

Use consistent resource-oriented APIs.

Typical operations:

```text
GET
POST
PATCH
DELETE
```

Potential resources:

```text
/auth
/profile
/trades
```

The exact routes must follow the architecture defined elsewhere.

Do not create multiple competing API patterns.

---

# 32. Authentication API

Authentication APIs or callbacks must be implemented according to the selected Google authentication architecture.

The backend must ensure that:

* Google identity is verified.
* The application user is created or retrieved.
* Authentication state is established securely.
* User profile completion can be checked.
* Protected resources require authentication.

Do not implement a custom insecure Google token exchange merely to simplify development.

---

# 33. Session / Authentication State

The application must maintain secure authenticated state after Google login.

The selected authentication implementation must determine whether the application uses:

* Secure sessions.
* Signed tokens.
* Another appropriate server-managed authentication mechanism.

Authentication state must:

* Be protected.
* Expire according to the authentication strategy.
* Not expose sensitive credentials to client-side JavaScript unnecessarily.
* Be validated server-side for protected operations.

Do not implement multiple competing session systems.

---

# 34. Logout

Logout must invalidate the application's authenticated state according to the chosen authentication mechanism.

After logout:

* Protected application resources must no longer be accessible.
* Authenticated API requests must fail authentication.
* The frontend should return to an unauthenticated state.

---

# 35. API Request Validation

Every endpoint accepting user input must validate it server-side.

Validate:

* Types.
* Required fields.
* Allowed values.
* Numeric ranges.
* String lengths.
* Dates.
* Relationships.
* Ownership.
* Business rules.

Never trust:

```text
userId
role
permissions
profileCompleted
trade ownership
calculated P&L
calculated R
```

when these values can be determined server-side.

---

# 36. MongoDB Schema Validation

Mongoose schemas should define:

* Types.
* Required fields.
* Defaults.
* Enums.
* Numeric constraints.
* String constraints.
* Indexes.
* Appropriate validation.

Business rules should remain in the business/service layer where appropriate.

Do not place the entire application workflow inside Mongoose models.

---

# 37. User Indexes

The User model should have appropriate indexes based on authentication lookup requirements.

The authentication strategy may require efficient lookup using values such as:

```text
provider
providerAccountId
email
```

The exact unique/index strategy must be determined during schema implementation.

Avoid duplicate or conflicting unique indexes.

---

# 38. Trade Indexes

Trade indexes should be based on actual query patterns.

Likely patterns include:

```text
userId
userId + tradeDate
userId + status
userId + strategy
```

Do not index every field.

Indexes should support actual application queries.

---

# 39. Query Safety

Never directly pass arbitrary client objects into MongoDB queries.

Validate and normalize:

* IDs.
* Filters.
* Sort fields.
* Sort directions.
* Pagination values.
* Search values.

Do not allow clients to inject arbitrary MongoDB operators.

Use allowlists where appropriate.

---

# 40. Pagination

Trade history must support scalable retrieval when required.

Do not return unlimited records unnecessarily.

Pagination may be introduced according to the product requirements and expected dataset size.

The initial implementation should remain simple unless the requirements demand more advanced pagination.

---

# 41. Filtering and Sorting

Trade filtering and sorting should be handled safely.

Potential filters:

* Date range.
* Direction.
* Strategy.
* Status.
* Result.
* Instrument.

Only implement filters required by the product.

Never allow arbitrary MongoDB query objects from request parameters.

---

# 42. Error Handling

Handle:

```text
Authentication errors
Authorization errors
Validation errors
Not-found errors
Database errors
Unexpected server errors
```

Do not expose raw MongoDB/Mongoose errors directly to users.

Production responses must not expose:

* Stack traces.
* Database internals.
* Secrets.
* Authentication internals.

---

# 43. HTTP Status Semantics

Use meaningful HTTP status codes.

Typical examples:

```text
200 — Successful request
201 — Resource created
204 — Successful request with no response body
400 — Invalid request
401 — Not authenticated
403 — Not authorized
404 — Resource not found
409 — Resource conflict
422 — Validation failure where appropriate
500 — Unexpected server error
```

Follow established application conventions where applicable.

---

# 44. Data Serialization

Do not expose raw Mongoose documents unnecessarily.

API responses should contain only fields required by the client.

Never return sensitive authentication information.

For user responses, do not expose:

```text
Google client secret
Authentication secrets
Password hashes
Internal session data
```

---

# 45. Timestamps

Persistent records should support:

```text
createdAt
updatedAt
```

where appropriate.

Trade timestamps and user profile timestamps represent different concepts.

For example:

```text
Trade
├── tradeDate
├── createdAt
└── updatedAt
```

Do not use `createdAt` as the user's actual trade date.

---

# 46. Time Handling

Database timestamps should use a canonical representation.

User-entered trading dates/times must follow the application's defined timezone strategy.

Do not silently modify user-entered trade times.

Presentation formatting belongs to the frontend.

---

# 47. Mock Data Transition

The current static MVP uses local/mock data.

Backend integration must replace the mock data layer incrementally.

Target architecture:

```text
Existing UI
   ↓
Application Data Layer
   ↓
API / Backend
   ↓
Services
   ↓
Mongoose
   ↓
MongoDB
```

Do not connect individual UI components directly to MongoDB.

Do not rebuild the UI merely because the persistence layer changes.

---

# 48. Dashboard Data

The dashboard must eventually consume persisted trading data.

Metrics such as:

```text
Total trades
Win rate
Loss rate
P&L
Average R
Performance
```

must remain consistent with the authoritative Trade records.

Do not create a second independent source of trading statistics unless explicitly required for performance.

---

# 49. Analysis Data

The analysis system must use the same authoritative Trade dataset as:

* Journal.
* Dashboard.

Do not create duplicate analytical trade records.

Analysis calculations should remain derived from persisted trades unless explicit caching is later required.

---

# 50. Financial Data Precision

Trading calculations must use consistent precision and rounding rules.

Avoid:

* Floating-point artifacts.
* Inconsistent rounding.
* Arbitrary conversion between numeric formats.

Do not silently change stored values solely for display purposes.

Display formatting belongs to the presentation layer.

---

# 51. Security Boundary

The following are server-side security responsibilities:

```text
Google identity verification
Authentication
Authorization
Ownership
Validation
Database access
Sensitive calculations
Secrets
```

The following are NOT security boundaries:

```text
Hidden UI elements
Disabled buttons
Client-side validation
Client-side route guards
Client-provided user IDs
Client-provided permissions
```

---

# 52. Secrets

Never expose:

* `MONGODB_URI`
* `GOOGLE_CLIENT_SECRET`
* Authentication secrets
* Session secrets
* API keys
* Private credentials

Do not place secrets in:

* Git.
* Client bundles.
* API responses.
* Logs.
* Error messages.
* Public configuration files.

---

# 53. Google OAuth Security

Google authentication must follow secure OAuth/OIDC practices.

Requirements:

* Use the official Google OAuth flow supported by the selected authentication implementation.
* Validate the returned authentication result.
* Verify identity server-side.
* Use registered redirect/callback URLs.
* Keep the Google client secret server-side.
* Do not trust arbitrary client-submitted Google identity data.
* Do not manually decode an unverified identity token and treat it as trusted.
* Protect callback and session handling according to the authentication library's security model.

Do not implement authentication by simply accepting:

```text
email
name
googleId
```

from the browser.

---

# 54. Google Email Verification

Where the Google provider supplies email verification information, the application should use the verified identity information provided by the authentication flow.

Do not allow a client to mark an email as verified.

Application-specific verification requirements may be added later if required.

---

# 55. Account Uniqueness

The application must avoid accidental duplicate application accounts.

The database/authentication layer should use appropriate identity constraints.

The final implementation must define how the application identifies an existing Google-authenticated user.

Do not rely solely on a mutable client-side profile value.

---

# 56. Profile Completion Enforcement

If the product requires profile completion before full application access, enforcement should exist at the backend/application level.

The frontend may redirect incomplete users to onboarding, but the backend should still be able to determine:

```text
Authenticated
+
Profile complete?
```

Where appropriate, protected operations that require a completed profile may reject incomplete users.

Do not rely only on frontend redirects.

---

# 57. Profile Update Rules

Profile updates must:

* Require authentication.
* Require ownership of the profile.
* Validate all values.
* Allow only approved fields.
* Preserve authentication identity.
* Recalculate completion status when appropriate.

Do not accept arbitrary MongoDB update objects from the client.

---

# 58. User Deletion

User deletion must not be implemented casually.

If account deletion becomes a product requirement, define:

* Authentication requirements.
* Confirmation requirements.
* Trade data handling.
* Profile data handling.
* Session invalidation.
* Database cleanup.
* Retention requirements.

Do not implement destructive account deletion without an explicit product requirement.

---

# 59. Soft Delete

Do not introduce soft deletion automatically.

Use soft deletion only when required by the product or data-retention requirements.

The same rule applies to:

* Users.
* Trades.
* Profiles.

---

# 60. Transactions

MongoDB transactions should only be introduced when multiple related operations must succeed or fail together.

Do not use transactions for every database operation by default.

Keep simple operations simple.

---

# 61. Service Layer

When business logic becomes sufficiently complex, use a service layer.

Conceptually:

```text
API / Route
   ↓
Service
   ↓
Model
   ↓
MongoDB
```

Services may handle:

* User creation.
* Google user lookup.
* Profile completion.
* Profile updates.
* Trade creation.
* Trade updates.
* Trade deletion.
* Trading calculations.
* Business validation.

Do not put complex business workflows directly into route handlers.

---

# 62. Model Layer

Mongoose models should primarily define:

* Persistent structure.
* Schema validation.
* Indexes.
* Appropriate model-level behavior.

Do not put complete application workflows inside models.

---

# 63. API / Route Layer

API handlers should remain focused on:

1. Receiving requests.
2. Authentication.
3. Authorization.
4. Input validation.
5. Calling business logic.
6. Returning safe responses.

Avoid giant route handlers.

---

# 64. Testing Strategy

Critical backend behavior should eventually be tested.

## Authentication

Test:

* New Google user.
* Existing Google user.
* Invalid authentication result.
* Unauthenticated access.
* Logout.
* Profile incomplete.
* Profile complete.

## Profile

Test:

* Profile creation.
* Profile completion.
* Profile update.
* Invalid profile data.
* Unauthorized profile update.
* Protected identity fields.

## Authorization

Test:

* User accesses own trade.
* User cannot access another user's trade.
* User cannot modify another user's trade.
* User cannot delete another user's trade.

## Trading

Test:

* Create trade.
* Read trade.
* Update trade.
* Delete trade.
* Invalid trade.
* Different risk percentages.
* Different RR ratios.
* Long trades.
* Short trades.
* Winning trades.
* Losing trades.

## Database

Test:

* Connection success.
* Connection failure.
* Validation failure.
* Duplicate identity constraints.
* Query behavior.

---

# 65. Logging

Backend logging must remain minimal and useful.

Never log:

* Google client secrets.
* OAuth tokens.
* Session secrets.
* Passwords.
* MongoDB URI.
* Authentication credentials.

Do not log unnecessary personal information.

---

# 66. Development and Production

Development and production configuration must remain separate.

Do not hardcode:

* Localhost URLs.
* Development credentials.
* Development database names.
* Development-only secrets.

Use environment configuration.

Production must not expose development diagnostics.

---

# 67. Performance

Avoid:

* Unbounded database queries.
* Repeated database calls.
* Duplicate queries.
* Unnecessary writes.
* Loading all trades when only a subset is required.
* Recalculating identical data unnecessarily.

Use:

* Appropriate indexes.
* Pagination.
* Efficient queries.

Only introduce caching when a real requirement exists.

---

# 68. Backend Folder Structure

The folder structure must follow `ARCHITECTURE.md`.

Do not create a competing architecture.

Where the architecture permits flexibility, a backend organization may conceptually include:

```text
config/
models/
services/
validation/
utilities/
```

Use the project's actual architecture instead of blindly copying this example.

Do not create empty architectural layers without purpose.

---

# 69. Backend Development Order

Backend implementation should follow this order:

```text
Phase 11
Backend Foundation
        ↓
Phase 12
Database Models
        ↓
Phase 13
Google Authentication
        ↓
Phase 14
Profile / KYC Onboarding
        ↓
Phase 15
Trade API
        ↓
Phase 16
Frontend ↔ Backend Integration
        ↓
Phase 17
Security Hardening
        ↓
Phase 18
Production Database & Deployment
```

Do not skip foundational phases unless explicitly approved.

Do not implement later functionality prematurely when it depends on an unfinished earlier phase.

---

# 70. Backend Phase Completion Standard

A backend phase is complete only when:

* Requirements are implemented.
* Existing functionality still works.
* Validation exists where required.
* Errors are handled.
* Security boundaries are respected.
* No secrets are exposed.
* JavaScript-only requirement remains satisfied.
* MongoDB/Mongoose architecture remains intact.
* Existing documentation remains consistent.
* Build/lint/tests pass where configured.

Starting the application successfully is not sufficient evidence of completion.

---

# 71. Documentation Change Management

Do not rewrite:

* `AGENTS.md`
* `PRD.md`
* `ARCHITECTURE.md`
* `DESIGN.md`
* `DESIGN-SYSTEM.md`
* `IMPLEMENTATION.md`

during normal backend implementation.

If backend implementation reveals a genuine contradiction:

1. Identify the contradiction.
2. Explain the impact.
3. Stop before making a major architectural change.
4. Resolve the requirement before continuing.

Do not silently modify project requirements.

---

# 72. Non-Negotiable Backend Rules

The following rules are mandatory:

1. MongoDB is the database.
2. Mongoose is the ODM.
3. JavaScript only.
4. No TypeScript.
5. Google OAuth is the primary authentication method.
6. Google identity must be verified server-side.
7. Client-submitted Google identity data is never trusted as authentication proof.
8. New Google users are created in MongoDB.
9. Existing Google users are recognized and reused.
10. New users must complete required application profile information.
11. Profile completion is separate from Google authentication.
12. Users can update their permitted profile information later.
13. Provider-controlled authentication identity fields cannot be freely edited.
14. Only necessary profile/KYC information should be collected.
15. Sensitive KYC information must not be added without explicit product requirements.
16. MongoDB credentials remain server-side.
17. Google client secrets remain server-side.
18. Authentication is enforced server-side.
19. Authorization is enforced server-side.
20. User ownership is enforced server-side.
21. Every private trade belongs to an authenticated user.
22. Risk percentage is stored per trade.
23. Risk:Reward ratio is stored per trade.
24. Risk percentage remains user-configurable per trade.
25. RR ratio remains user-configurable per trade.
26. Trading calculations must remain consistent.
27. Dashboard and analysis use the authoritative trade dataset.
28. Client-side validation is not a security boundary.
29. Arbitrary MongoDB queries must never be accepted from clients.
30. Secrets must never be committed.
31. Do not introduce unnecessary dependencies.
32. Do not over-engineer.
33. Preserve the existing frontend experience.
34. Do not silently change product requirements.
35. Follow all higher-level project documentation.

---

# 73. Definition of Backend Completion

The backend is considered complete when the application provides a secure and persistent architecture:

```text
Google
   ↓
Verified Authentication
   ↓
Application User
   ↓
Profile / Onboarding
   ↓
Authenticated Session
   ↓
Authorized API
   ↓
Business Logic
   ↓
Mongoose
   ↓
MongoDB
```

and:

```text
Authenticated User
   ↓
Own Profile
   +
Own Trades
   ↓
Dashboard
   ↓
Analysis
```

all operate consistently from the same authoritative backend data.

The backend must preserve the established product behavior while replacing temporary static persistence with secure MongoDB-backed persistence.

---

# End of BACKEND.md
