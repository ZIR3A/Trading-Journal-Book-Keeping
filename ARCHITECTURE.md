# Trading Journal App — Architecture Specification

**File:** `ARCHITECTURE.md`  
**Status:** Approved  
**Version:** 1.0  
**Project:** Trading Journal App  
**Architecture Phase:** Static UI / Mock Data  
**Primary Goal:** Build a scalable frontend architecture that can later support authentication, APIs, database persistence, analytics, and integrations without requiring a complete rewrite.

---

# 1. Purpose

This document defines the technical architecture of the Trading Journal App.

It describes:

- Application structure
- Folder organization
- Routing
- Component architecture
- UI architecture
- State management
- Data flow
- Mock data strategy
- Business logic separation
- Calculation architecture
- Responsive architecture
- Accessibility architecture
- Future API architecture
- Future database architecture
- Error handling
- Performance considerations
- Scalability principles

This document works together with:

- `AGENTS.md` — development rules and AI-agent behavior
- `PRD.md` — product requirements
- `DESIGN-SYSTEM.md` — visual design rules
- `CALCULATIONS.md` — financial calculation rules
- `DATA-MODEL.md` — data structure
- `UI-SPEC.md` — screen and UI requirements
- `ROADMAP.md` — implementation sequence

---

# 2. Architecture Principles

The application must follow these principles:

1. Mobile first
2. JavaScript only
3. Component-driven development
4. Separation of concerns
5. Reusable UI primitives
6. Centralized design tokens
7. Business logic outside presentation components
8. Mock data separated from UI
9. Calculations isolated from UI
10. API-ready architecture
11. Database-ready architecture
12. Accessibility by default
13. Minimal dependencies
14. Avoid premature abstraction
15. Avoid unnecessary global state
16. Preserve the locked design system
17. Prefer composition over duplication
18. Keep features independently maintainable

---

# 3. Technology Stack

The initial application should use:

```text
Next.js
React
JavaScript
Tailwind CSS
shadcn/ui
Lucide Icons
```

The initial implementation is:

Frontend
+
Static UI
+
Mock Data
+
Local Calculations

There should be no requirement for:

Database
API
Authentication backend
Broker integration
External storage
Payment system
AI API

during the initial static phase.

# 4. JavaScript Requirement

The project uses JavaScript.

Do not introduce TypeScript.

Do not create:

.ts
.tsx

files.

Use:

.js
.jsx

where appropriate.

# 5. High-Level Architecture

The application should conceptually follow:

                    ┌──────────────────────┐
                    │      Public UI       │
                    │ Home / About / FAQ   │
                    │      / Contact       │
                    └──────────┬───────────┘
                               │
                               │
                    ┌──────────▼───────────┐
                    │   Application UI     │
                    │ Dashboard / Journal  │
                    │ Trades / Analytics   │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │   Feature Logic      │
                    │ Trade / Risk / R:R   │
                    │ Analytics / Filters  │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │   Domain Utilities   │
                    │ Calculations / Rules │
                    │ Formatting / Helpers │
                    └──────────┬───────────┘
                               │
              ┌────────────────┴────────────────┐
              │                                 │
      ┌───────▼────────┐                ┌───────▼────────┐
      │   Mock Data    │                │ Future API     │
      │ Initial Phase  │                │ Future Phase   │
      └────────────────┘                └───────┬────────┘
                                               │
                                       ┌───────▼────────┐
                                       │ Future Database│
                                       └────────────────┘

The important principle is that UI components should not depend directly on database implementation.

# 6. Architectural Layers

The application should be organized into logical layers.

Presentation
↓
Feature Layer
↓
Domain / Business Logic
↓
Data Access
Presentation Layer

Responsible for:

Rendering UI
Layout
Accessibility
User interaction
Visual states

Examples:

Button
Input
TradeCard
MetricCard
DashboardSection
Feature Layer

Responsible for feature-specific behavior.

Examples:

Journal
Trades
Analytics
Dashboard
Settings

Feature components may combine:

UI
Local interaction state
Feature-specific utilities
Feature-specific data
Domain Layer

Responsible for business rules.

Examples:

Risk calculations
R:R calculations
R multiple
P&L
Win rate
Expectancy
Drawdown

Domain logic should not depend on React components.

Data Layer

Responsible for retrieving and transforming data.

Initial implementation:

Mock Data

Future implementation:

API
↓
Database

The UI should not need to know whether data came from mock data or an API.

# 7. Recommended Project Structure

The exact folder structure may evolve as implementation progresses, but the project should begin approximately as:

/
├── app/
│   ├── (public)/
│   │   ├── page.js
│   │   ├── about/
│   │   │   └── page.js
│   │   ├── faq/
│   │   │   └── page.js
│   │   └── contact/
│   │       └── page.js
│   │
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.js
│   │   ├── register/
│   │   │   └── page.js
│   │   ├── forgot-password/
│   │   │   └── page.js
│   │   └── reset-password/
│   │       └── page.js
│   │
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   └── page.js
│   │   ├── journal/
│   │   │   └── page.js
│   │   ├── trades/
│   │   │   ├── page.js
│   │   │   ├── new/
│   │   │   │   └── page.js
│   │   │   └── [id]/
│   │   │       └── page.js
│   │   ├── analytics/
│   │   │   └── page.js
│   │   └── settings/
│   │       └── page.js
│   │
│   ├── layout.js
│   └── globals.css
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── navigation/
│   ├── marketing/
│   ├── dashboard/
│   ├── journal/
│   ├── trades/
│   ├── analytics/
│   └── settings/
│
├── lib/
│   ├── calculations/
│   ├── data/
│   ├── formatters/
│   ├── validation/
│   └── utils/
│
├── hooks/
│
├── constants/
│
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── docs/
│
├── AGENTS.md
├── PRD.md
├── ARCHITECTURE.md
├── DESIGN-SYSTEM.md
├── CALCULATIONS.md
├── DATA-MODEL.md
├── UI-SPEC.md
├── ROADMAP.md
└── README.md

This structure is a starting architecture, not a reason to create unnecessary files.

# 8. Next.js App Router

The application should use the Next.js App Router.

Route groups should be used to organize application areas without affecting URL structure.

Example:

app/
├── (public)/
├── (auth)/
└── (dashboard)/

This allows different layouts for different areas.

# 9. Public Route Architecture

Public routes may include:

/
 /about
 /faq
 /contact

The exact navigation labels are not permanently locked.

Public pages should use a shared public layout.

Conceptually:

PublicLayout
├── Header
├── Main
└── Footer
# 10. Authentication Route Architecture

Authentication UI may include:

/login
/register
/forgot-password
/reset-password

During the static phase these are UI-only.

No real authentication backend should be assumed.

The architecture should allow a future authentication provider to be introduced without rewriting authentication screens.

# 11. Application Route Architecture

Authenticated application routes may include:

/dashboard
/journal
/trades
/trades/new
/trades/[id]
/analytics
/settings

The final naming may evolve.

The application layout should remain consistent.

# 12. Application Layout

The dashboard area should use a dedicated layout.

Conceptually:

DashboardLayout
│
├── Sidebar / Navigation
│
├── Main Content
│   ├── Page Header
│   └── Page Content
│
└── Mobile Navigation

The layout must be mobile first.

# 13. Mobile Navigation Architecture

Desktop navigation and mobile navigation should not necessarily use the same visual structure.

Desktop may use:

Sidebar

Mobile may use:

Compact Header
+
Menu / Drawer

or another appropriate pattern.

The final interaction must be determined during UI implementation.

The important requirement is:

Easy access
44px minimum touch targets
No unnecessary screen obstruction
Accessible keyboard behavior
# 14. Component Architecture

Components should be organized by responsibility.

A useful hierarchy is:

Primitive
↓
Compound Component
↓
Feature Component
↓
Section
↓
Page

Example:

Button
↓
TradeActionButton
↓
TradeHeader
↓
TradeDetailSection
↓
TradeDetailPage
# 15. UI Primitives

components/ui/ should contain reusable low-level components.

Examples:

Button
Input
Textarea
Select
Checkbox
Dialog
Dropdown
Tabs
Table
Tooltip
Badge
Separator

Use shadcn/ui where it fits the design system.

Do not blindly use default shadcn styles.

The design system is the source of truth.

# 16. Design-System Integration

All UI primitives must follow the locked Minimalist Monochrome design system.

The application must preserve:

Black
White
Controlled gray
Serif typography
Zero radius
No shadows
Sharp borders
Editorial spacing
Minimal motion

If a component from shadcn/ui conflicts with the design system, adapt the component styling rather than changing the design system.

# 17. Feature Components

Feature components should live inside appropriate directories.

Examples:

components/trades/
├── trade-form.js
├── trade-summary.js
├── trade-card.js
├── trade-detail.js
├── trade-risk.js
└── trade-result.js

Names may change according to actual implementation.

# 18. Component Responsibility

Each component should have a clear responsibility.

Avoid:

DashboardPage

containing hundreds of lines of unrelated UI and business logic.

Prefer:

DashboardPage
├── DashboardHeader
├── PerformanceOverview
├── EquityCurve
├── RiskOverview
└── RecentTrades
# 19. Page Components

Page components should primarily compose feature components.

They should not contain large amounts of reusable UI.

A page should communicate:

What is displayed
How sections are arranged
What data is passed

rather than containing every implementation detail.

# 20. Business Logic Separation

Business logic must not be deeply embedded inside JSX.

Avoid:

<div>
  {balance * riskPercentage / 100}
</div>

for complex financial logic.

Prefer:

UI
↓
Domain calculation function
↓
Result

For example:

calculateRiskAmount()

# 21. Calculation Layer

Financial calculations should live under:

lib/calculations/

Potential modules:

risk.js
reward.js
position-size.js
r-multiple.js
performance.js
drawdown.js

The final structure should follow actual complexity.

# 22. Calculation Independence

Calculation utilities must not import React components.

They should operate on plain JavaScript values.

Example conceptual structure:

Input
↓
Calculation Function
↓
Output

This makes calculations:

Testable
Reusable
Predictable
API-independent
# 23. Mock Data Architecture

Initial data should live outside components.

Recommended:

lib/data/
├── trades.js
├── accounts.js
├── setups.js
├── analytics.js
└── users.js

Mock data should represent realistic trading scenarios.

# 24. Mock Data Contract

UI components should consume mock data in the same conceptual shape that future API responses will provide.

Avoid designing mock data around a specific component.

Bad:

dashboardCardData

Better:

trades
accounts
setups

The dashboard derives its display data from domain data.

# 25. Data Access Abstraction

The UI should avoid directly importing mock datasets everywhere.

Instead, where practical, use a data-access layer.

Conceptually:

getTrades()
getTradeById()
getDashboardStats()
getAnalytics()

During the static phase these functions can return mock data.

Future:

getTrades()
↓
API request

The consuming UI does not need to change.

26. Future API Architecture

When APIs are introduced:

UI
↓
Feature Data Hook / Data Function
↓
API Client
↓
Backend API
↓
Database

The UI should not directly communicate with database infrastructure.

# 27. Future Database Architecture

Future production architecture may become:

Frontend
↓
Next.js Server / API
↓
Service Layer
↓
Database

The frontend should never receive unrestricted database access.

# 28. User Data Isolation

When authentication and database functionality are implemented, every user's data must be isolated.

A user must only be able to:

Read their own trades
Create their own trades
Update their own trades
Delete their own trades

unless an explicit shared-data feature exists.

# 29. Trading Account Architecture

The system should eventually support multiple trading accounts.

Conceptually:

User
│
├── Trading Account A
│   ├── Trades
│   └── Settings
│
├── Trading Account B
│   ├── Trades
│   └── Settings
│
└── Trading Account C
    ├── Trades
    └── Settings

The initial static implementation may use one mock account.

# 30. Trade Architecture

A trade should be treated as a domain entity.

Conceptually:

Trade
├── Identity
├── Market
├── Direction
├── Timing
├── Entry
├── Stop Loss
├── Take Profit
├── Risk
├── Target R:R
├── Position Size
├── Plan
├── Execution
├── Result
├── Psychology
├── Notes
└── Media

The final schema is defined in DATA-MODEL.md.

# 31. Dynamic Risk Architecture

Risk percentage must belong to the trade.

Conceptually:

New Trade
↓
User selects risk
↓
Trade stores risk
↓
Calculations use stored risk

Do not use a global risk variable for historical trades.

# 32. Dynamic R:R Architecture

Target R:R must belong to the trade.

Conceptually:

New Trade
↓
User selects target R:R
↓
Trade stores target R:R
↓
Reward calculation uses stored target

Do not apply the current default R:R to historical trades.

# 33. Default Settings Architecture

Future settings may contain:

defaultRiskPercentage
defaultTargetRR
defaultMarket
defaultTimeframe

These values are defaults only.

When creating a trade:

Default
↓
Pre-filled form
↓
User can modify
↓
Trade stores actual selected value

# 34. State Management

The application should avoid introducing a large global state solution unless the project genuinely requires it.

Prefer:

Local component state

for local UI state.

Examples:

Modal open/closed
Filter open/closed
Form field state
Dropdown state

Use shared state only when multiple distant components genuinely need the same state.

# 35. Server vs Client Components

Use server components by default where appropriate.

Use client components only when required for:

Interaction
Local state
Browser APIs
Event handlers
Interactive charts
Form behavior

Do not convert entire pages to client components unnecessarily.

# 36. Forms Architecture

Forms should be broken into logical sections.

For example:

TradeForm
├── BasicInformation
├── MarketInformation
├── RiskSection
├── TargetSection
├── TradePlan
├── Execution
├── Psychology
└── Review

The exact structure may evolve.

# 37. Form State

Form state should remain localized unless it must be shared.

Complex forms may use a dedicated form library if justified.

Do not introduce a form library simply because it is popular.

The dependency must provide clear value.

# 38. Form Validation

Validation should be centralized where practical.

Potential location:

lib/validation/

Validation rules should be reusable by:

UI
API
Server

where practical in future architecture.

# 39. Risk Validation

Risk percentage must be validated.

Invalid examples:

Negative risk
Zero risk
Non-numeric risk
Unreasonably malformed input

The exact allowed business range must be defined in CALCULATIONS.md or domain rules before production.

# 40. R:R Validation

Target R:R must be validated.

Invalid examples:

Negative R:R
Zero R:R
Invalid text
Malformed custom values

The exact accepted format must be defined before production implementation.

# 41. Price Validation

Trade prices must respect the direction of the trade.

For example, long trades generally require:

Stop Loss < Entry

and:

Take Profit > Entry

Short trades generally require:

Stop Loss > Entry

and:

Take Profit < Entry

Exact validation rules must be documented in CALCULATIONS.md.

# 42. Analytics Architecture

Analytics should be calculated from domain data.

Conceptually:

Trades
↓
Normalize
↓
Calculate Metrics
↓
Aggregate
↓
Present

Do not manually hard-code analytics values into UI components.

# 43. Analytics Functions

Potential functions:

calculateWinRate()
calculateAverageR()
calculateProfitFactor()
calculateExpectancy()
calculateMaxDrawdown()
calculateAverageWin()
calculateAverageLoss()
calculateStreaks()

Actual function naming may differ.

# 44. Analytics Filtering

Analytics should eventually respond to filters.

Example:

All Trades
↓
Date Filter
↓
Setup Filter
↓
Session Filter
↓
Symbol Filter
↓
Analytics

Filters should operate on the underlying trade dataset.

# 45. Journal Architecture

The Journal should conceptually be:

Journal Page
├── Journal Header
├── Search
├── Filters
├── Summary
├── Trade List
└── Pagination / Load More

The exact interaction pattern depends on dataset size and future API behavior.

# 46. Responsive Journal Architecture

Desktop may use a table.

Mobile should not simply force a desktop table into a tiny viewport.

Possible mobile representation:

Trade Card
├── Symbol
├── Date
├── Direction
├── Result
├── R
└── P&L

Secondary information may appear inside a detail view.

# 47. Dashboard Architecture

Dashboard should compose independent sections:

Dashboard
├── Header
├── PerformanceMetrics
├── EquityCurve
├── RiskOverview
├── RecentTrades
└── QuickActions

Each section should remain independently maintainable.

# 48. Analytics UI Architecture

Analytics may contain:

AnalyticsHeader
FilterBar
PerformanceOverview
RDistribution
SetupPerformance
SessionPerformance
RiskAnalysis
PsychologyAnalysis

Charts should be selected based on the information being communicated.

# 49. Chart Architecture

Charts should:

Remain monochrome
Use accessible labels
Have meaningful axes
Provide useful tooltips
Avoid unnecessary decoration
Work on mobile
Avoid excessive animation

Charts must not introduce unauthorized colors.

# 50. Responsive Chart Strategy

Charts should adapt to viewport width.

On mobile:

Reduce unnecessary labels
Allow horizontal scrolling only where justified
Maintain readable values
Avoid tiny text
Preserve touch interaction
# 51. Empty State Architecture

Every data-dependent feature should have an empty state.

Example:

No trades yet.


Create your first trade to begin
building your trading history.

Empty states should provide a clear next action.