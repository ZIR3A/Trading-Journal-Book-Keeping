# Trading Journal

A modern, privacy-focused **Trading Journal & Trading Bookkeeping Web Application** built for traders who want to record, organize, review, and analyze their trading activity over time.

The application is designed to turn individual trades into a structured, long-term trading record — helping traders understand their decisions, manage risk, review performance, and build better trading habits.

> **Trading Journal is a journaling and analysis platform. It is not a brokerage, order-execution platform, or real-time market-data terminal.**

---

## Overview

Trading is not only about entering and exiting positions. Long-term improvement comes from understanding **why a trade was taken, how it was managed, what happened, and what can be learned from it**.

Trading Journal provides a structured environment for maintaining that record.

The application focuses on:

* Fast and structured trade entry
* Accurate trading records
* Risk and reward tracking
* Trade-by-trade analysis
* Performance review
* Trading reflection
* Historical record keeping
* Personal data ownership
* Consistent journaling habits

The product is being developed with a strong emphasis on **clarity, accuracy, simplicity, privacy, and long-term usability**.

---

## Product Philosophy

The application follows a few core principles:

### Accuracy Over Decoration

Trading data should be easy to understand and difficult to misinterpret.

### Fast Manual Entry

Recording a trade should be quick enough that journaling does not become a burden.

### Useful Reflection

The journal should help traders understand their decisions rather than simply store numbers.

### Long-Term Historical Value

Trade history should remain useful months and years after the trade was taken.

### Privacy and Data Ownership

A user's trading records belong to the user and must remain isolated from other users.

### Expandable Architecture

The application should support future growth without introducing unnecessary complexity too early.

---

# Core Features

## Authentication

The application provides secure user authentication and account access.

Supported authentication architecture includes:

* Email/password authentication
* Google authentication
* Session management
* Secure logout
* Protected application areas
* Server-side authorization
* User-specific data ownership

### Google Authentication

Google OAuth is treated as an authentication provider and is separate from the application's profile/KYC information.

Google-controlled identity information is stored separately from editable application profile information.

This allows users to authenticate through Google while still maintaining an independent application profile.

---

# User Profile & Onboarding

New users are required to complete the application's required profile/onboarding information after authentication.

The profile system supports information such as:

* Personal profile information
* Trading background
* Trading experience
* Country
* Locale
* Required KYC/profile information

Users can update their editable profile information after onboarding.

Authentication identity and application profile data remain conceptually separate.

---

# Trading Journal

The primary purpose of the application is maintaining a structured trading journal.

Users can record individual trades and maintain a complete historical record of their activity.

A trade can contain information necessary to understand:

* What was traded
* Trade direction
* Entry information
* Exit information
* Position information
* Risk
* Reward
* Result
* Trading context
* Notes
* Reflection

The system is designed so that trading records remain associated with the authenticated user who created them.

---

# Risk Management

Risk management is a first-class part of the journal.

Each trade can have configurable:

* Risk percentage
* Risk amount
* Reward
* Risk-to-reward ratio
* Result

The application should preserve the relationship between the original trade setup and its eventual result so traders can review whether their execution matched their intended risk plan.

---

# Trade Analysis

The journal is designed to make historical trading data useful for analysis.

Future and existing analytical capabilities can be built around:

* Winning trades
* Losing trades
* Win rate
* Profit/loss
* Risk/reward performance
* Trading frequency
* Historical performance
* Trade patterns
* Decision quality
* Journal consistency

The goal is not to overwhelm traders with unnecessary statistics.

The goal is to provide **actionable information that improves decision-making**.

---

# Trade Reflection

Numbers alone do not explain a trading decision.

The journal therefore supports qualitative information around trades.

Traders can use journal information to record:

* Trade reasoning
* Market context
* Setup explanation
* Execution notes
* Mistakes
* Emotional observations
* Lessons learned
* Post-trade reflection

This makes the application a trading journal rather than simply a transaction database.

---

# Data Ownership & Privacy

Every user's trading information is isolated from other users.

The backend enforces ownership at the server level.

A user must only be able to:

* Create their own trades
* View their own trades
* Update their own trades
* Delete their own trades
* Access their own profile
* Access their own application data

Ownership must never rely solely on frontend restrictions.

Authorization and ownership validation are handled server-side.

---

# Public Website

The application includes a public-facing website separate from the authenticated trading application.

The public experience is designed to explain the product, its purpose, and its core value before users enter the application.

The public website follows the project's established **minimalist monochrome visual direction** and modern interaction principles.

Public pages are designed with:

* Smooth scrolling
* Purposeful animations
* Modern transitions
* Responsive layouts
* Strong typography
* Minimal visual noise
* Clear calls to action
* Consistent monochrome styling

The public website does **not** currently include a pricing section because the product is intended to be free.

---

# Design System

Trading Journal follows a strict minimalist monochrome design language.

The design direction prioritizes:

* Monochrome visual hierarchy
* Strong typography
* Generous whitespace
* Clean surfaces
* Subtle borders
* Controlled contrast
* Minimal decoration
* Functional motion
* Responsive composition

The design system should remain consistent across:

* Public pages
* Authentication
* Onboarding
* Dashboard
* Trading journal
* Trade forms
* Analytics
* Profile
* Settings
* Future modules

The established design system should not be changed or reinterpreted without explicit product/design approval.

---

# Technology Stack

The project is built using a modern JavaScript-based web architecture.

## Frontend

* **Next.js**
* **React**
* **JavaScript**
* **Tailwind CSS**
* **shadcn/ui**

The project intentionally uses **JavaScript rather than TypeScript**.

## Backend

* Next.js server-side application architecture
* Server-side authentication and authorization
* REST-style API architecture where appropriate
* Server-side validation
* User ownership enforcement

## Database

* **MongoDB**
* **Mongoose**

MongoDB is used as the primary application database.

Mongoose provides schema modeling, validation, and database interaction.

## Authentication

* Google OAuth
* Application authentication/session management
* Server-side authorization

---

# High-Level Architecture

The application is structured around clear separation of responsibilities.

```text
┌──────────────────────────────────────────┐
│                Public Web                 │
│                                          │
│  Landing • About • Features • CTA        │
└────────────────────┬─────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────┐
│             Authentication               │
│                                          │
│  Login • Register • Google OAuth         │
│  Sessions • Logout                       │
└────────────────────┬─────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────┐
│             User Onboarding              │
│                                          │
│  Profile • Trading Background • KYC      │
└────────────────────┬─────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────┐
│           Protected Application          │
│                                          │
│  Dashboard                               │
│  Trading Journal                         │
│  Trade Entry / Editing                   │
│  Analysis                                │
│  Profile / Settings                      │
└────────────────────┬─────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────┐
│              Server Layer                │
│                                          │
│  Authentication                          │
│  Authorization                            │
│  Validation                              │
│  Ownership Enforcement                   │
│  Business Logic                          │
└────────────────────┬─────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────┐
│                MongoDB                   │
│                                          │
│  Users                                   │
│  Profiles                                │
│  Trades                                  │
│  Future Domain Data                      │
└──────────────────────────────────────────┘
```

---

# Authentication Architecture

Authentication follows a clear separation between identity and application data.

```text
Google
  │
  ▼
OAuth Authentication
  │
  ▼
Authenticated User
  │
  ├── Provider Identity
  │
  └── Application Profile
          │
          ├── Trading Background
          ├── Experience
          ├── Country / Locale
          └── Required KYC Fields
```

Google authentication establishes the user's identity.

The application's own profile and KYC information remain editable application data.

---

# Data Model

The initial core data model is centered around users and trades.

## User

The user model represents the authenticated application user.

Conceptually it contains:

* Authentication identity
* Google provider information where applicable
* Email
* Profile information
* Trading background
* Experience
* Country
* Locale
* KYC/onboarding information
* Account metadata

Provider-controlled identity information should not be treated as ordinary editable profile data.

---

## Trade

The trade model represents an individual trading record.

Conceptually it contains information such as:

* User ownership
* Symbol/instrument
* Trade direction
* Entry information
* Exit information
* Position information
* Risk
* Reward
* Risk percentage
* Risk/reward ratio
* Result
* Notes
* Reflection
* Timestamps

The exact schema remains governed by the backend specification and implementation.

---

# Security Principles

Security is treated as a backend responsibility rather than a frontend feature.

The application follows these principles:

### Server-Side Authorization

Protected operations must be authorized on the server.

### Ownership Enforcement

Every user-owned resource must be checked against the authenticated user.

### Input Validation

Incoming data must be validated before being persisted.

### Authentication Separation

Authentication provider information and application profile information remain separate.

### Protected Routes

Private application functionality must not be accessible to unauthenticated users.

### No Trust in Client Ownership

The frontend must never be considered authoritative for determining which user's data is being accessed.

---

# Project Structure

The project follows a modular structure designed to keep public, authentication, application, and server responsibilities organized.

A conceptual structure is:

```text
trading-journal/
│
├── app/
│   ├── public/
│   ├── auth/
│   ├── onboarding/
│   ├── dashboard/
│   └── ...
│
├── components/
│   ├── ui/
│   ├── public/
│   ├── auth/
│   ├── journal/
│   └── ...
│
├── lib/
│   ├── auth/
│   ├── db/
│   ├── validation/
│   └── ...
│
├── models/
│   ├── User.js
│   ├── Trade.js
│   └── ...
│
├── api/
│   └── ...
│
├── public/
│   └── ...
│
├── PRD.md
├── ARCHITECTURE.md
├── DESIGN.md
├── IMPLEMENTATION.md
├── BACKEND.md
├── README.md
└── package.json
```

> The actual repository structure is the source of truth for implementation. This conceptual structure is intended to explain the separation of responsibilities.

---

# Development Documentation

The repository maintains dedicated documentation files so product requirements, architecture, design, and implementation decisions remain separate.

## `PRD.md`

Defines the product requirements and functional scope.

It answers:

* What are we building?
* Who is it for?
* What problem does it solve?
* What functionality is required?

---

## `ARCHITECTURE.md`

Defines the technical architecture.

It documents:

* Application structure
* Data flow
* System boundaries
* Backend architecture
* Authentication architecture
* Database architecture
* Scalability considerations

---

## `DESIGN.md`

Defines the application's product/UI design direction.

It covers:

* Visual language
* UX principles
* Layout
* Interaction
* Motion
* Public website
* Application interface

---

## `IMPLEMENTATION.md`

Defines implementation rules and development conventions.

It helps ensure new development remains consistent with the established architecture and product requirements.

---

## `BACKEND.md`

Defines the backend source of truth.

It covers:

* MongoDB
* Mongoose
* User model
* Trade model
* Google authentication
* Onboarding
* Profile/KYC
* APIs
* Validation
* Authorization
* Ownership
* Security
* Backend implementation phases

---

# Development Phases

The application is being developed incrementally rather than attempting to build every feature simultaneously.

The development process is organized into phases covering areas such as:

1. Foundation and repository setup
2. Core application architecture
3. Database and data models
4. Authentication
5. Google OAuth
6. User onboarding
7. Profile and KYC
8. Trading data models
9. Trade APIs
10. Journal functionality
11. Application integration
12. Security and authorization
13. Analytics and review functionality
14. Public website
15. Public page integration
16. UI refinement
17. Testing and hardening
18. Deployment and production readiness

Each phase should build on the established architecture instead of introducing unrelated patterns.

---

# Development Principles

All development should follow the project's established documentation.

### JavaScript Only

The project uses JavaScript.

Do not introduce TypeScript unless the project's technical direction is explicitly changed.

### Avoid Premature Complexity

Do not add infrastructure, dependencies, abstractions, or services without a clear requirement.

### Reuse Existing Components

Existing UI components and design primitives should be reused whenever possible.

### Keep Business Logic Server-Side

Sensitive business rules, authorization, validation, and ownership checks must remain server-side.

### Maintain Data Integrity

Trading records are financial-style personal records. Incorrect calculations or corrupted historical data can make the journal unreliable.

### Preserve the Design System

New pages and components must follow the established minimalist monochrome system.

### Build for Extension

Features should be modular enough to support future development without requiring unnecessary rewrites.

---

# Local Development

## Prerequisites

Before running the project locally, install:

* Node.js
* npm
* MongoDB
* Git

You will also need Google OAuth credentials for Google authentication functionality.

---

## Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

---

## Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a local environment file:

```bash
.env.local
```

Environment variable names must match the application's actual implementation.

Typical configuration categories include:

```env
# Database
MONGODB_URI=

# Authentication
AUTH_SECRET=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Application
NEXT_PUBLIC_APP_URL=
```

> Do not commit `.env.local` or any secret credentials to GitHub.

> The actual environment variables required by the repository are defined by the implementation. This README intentionally avoids inventing additional variables.

---

# Run the Development Server

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:3000
```

---

# Production Build

Create a production build with:

```bash
npm run build
```

Run the production application with:

```bash
npm start
```

---

# Code Quality

Before submitting changes, ensure the project passes the repository's configured:

* Linting
* Build
* Tests
* Validation checks

Use the actual scripts defined in `package.json`.

Example:

```bash
npm run lint
npm run build
```

Additional commands should only be documented here once they exist in the repository.

---

# Environment & Secrets

Never commit sensitive credentials.

Do not commit:

```text
.env
.env.local
.env.production
.env.*.local
```

Do not expose:

* Database credentials
* OAuth client secrets
* Authentication secrets
* Private API keys
* Session secrets
* Production credentials

Use environment variables for all sensitive configuration.

---

# Database

MongoDB is the primary database.

Mongoose is used to provide structured models and database access.

The database stores application-owned information such as:

```text
Users
  │
  ├── Authentication identity
  ├── Profile
  ├── Onboarding / KYC
  └── Account metadata

Trades
  │
  ├── User ownership
  ├── Trade details
  ├── Risk information
  ├── Result
  └── Journal / reflection data
```

Every user-owned record must maintain a reliable relationship with its owner.

---

# Authentication Flow

A simplified authentication flow looks like this:

```text
User
 │
 ▼
Login
 │
 ├───────────────┐
 │               │
 ▼               ▼
Email/Auth      Google OAuth
 │               │
 └───────┬───────┘
         ▼
Authenticated Session
         │
         ▼
Check User Profile
         │
     ┌───┴────┐
     │        │
     ▼        ▼
Complete    Existing
Onboarding  Profile
     │        │
     └───┬────┘
         ▼
Protected Application
```

---

# User Data Flow

A typical trade creation flow is:

```text
User
 │
 ▼
Trade Form
 │
 ▼
Client Validation
 │
 ▼
Server Request
 │
 ▼
Authentication Check
 │
 ▼
Authorization Check
 │
 ▼
Input Validation
 │
 ▼
Trade Creation
 │
 ▼
MongoDB
 │
 ▼
Response
 │
 ▼
Journal UI
```

The server remains authoritative for authentication, authorization, ownership, and data integrity.

---

# What This Project Is Not

Trading Journal intentionally does not attempt to become a brokerage or trading terminal.

It is **not**:

* A brokerage
* An exchange
* An order execution platform
* A trading bot
* A broker account
* A real-time market terminal
* A guaranteed-profit system
* A financial advisory service

The application focuses on **recording, reviewing, and understanding trading activity**.

---

# Future Direction

The architecture is intentionally designed so additional functionality can be introduced later.

Potential areas of expansion include:

* More advanced performance analytics
* Advanced trade statistics
* Strategy tracking
* Trading psychology analysis
* Advanced journal filtering
* Performance reports
* Visual analytics
* Import/export functionality
* Additional trading workflows
* More advanced personal insights

Future functionality should only be introduced when it provides meaningful value and remains consistent with the product philosophy.

---

# Contribution

Contributions should preserve the product's existing architecture and design direction.

Before making significant changes:

1. Understand the relevant product requirements.
2. Review the architecture.
3. Review the design system.
4. Review the implementation rules.
5. Review the backend specification if backend behavior is affected.
6. Avoid introducing duplicate patterns.
7. Keep changes focused.
8. Validate the application before submitting the change.

For major architectural or product changes, update the relevant documentation alongside the implementation.

---

# Documentation Hierarchy

When making development decisions, use the project documentation according to responsibility:

```text
PRD.md
  │
  ├── Product requirements
  │
  ▼
ARCHITECTURE.md
  │
  ├── Technical architecture
  │
  ▼
DESIGN.md
  │
  ├── Product/UI design
  │
  ▼
BACKEND.md
  │
  ├── Backend source of truth
  │
  ▼
IMPLEMENTATION.md
  │
  └── Development implementation rules
```

The README provides an overview.

The dedicated project documentation remains the detailed source of truth.

---

# Project Status

**Status:** Active Development

The application is being developed phase-by-phase toward production readiness.

Current development priorities include:

* Core application foundation
* Authentication
* Google OAuth
* User onboarding
* Profile/KYC architecture
* Trading journal functionality
* Trade data management
* Risk and reward tracking
* Secure ownership
* Public website
* UI refinement
* Production hardening

---

# Philosophy

A trading journal should not become another complicated trading tool.

It should make one thing easier:

> **Understanding your own trading.**

The purpose of Trading Journal is to create a reliable historical record that allows traders to look back at their decisions, identify patterns, understand mistakes, recognize strengths, and continuously improve.

The application is built around the belief that **consistent documentation creates better feedback, and better feedback creates better decision-making.**

---

# License

The project license should be defined according to the repository's actual licensing decision.

If the repository is private or proprietary, do not assume an open-source license.

---

# Disclaimer

Trading Journal is a software tool for recording and analyzing personal trading activity.

Nothing within the application should be interpreted as financial, investment, legal, or professional advice.

Trading involves substantial risk, and users are solely responsible for their own trading decisions.

---

# Built With

* JavaScript
* Next.js
* React
* Tailwind CSS
* shadcn/ui
* MongoDB
* Mongoose
* Google OAuth

---

# Final Note

Trading Journal is being built as a long-term product rather than a short-term dashboard.

The goal is simple:

**Record better. Review better. Understand better. Trade better.**
