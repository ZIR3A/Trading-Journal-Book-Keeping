# IMPLEMENTATION.md

# Trading Journal App — Implementation Guide

## 1. Purpose

This document defines the engineering implementation approach for the Trading Journal App.

It describes **how the requirements defined in the project documentation are implemented in code**.

This document does not redefine:

* Product requirements
* Visual design
* Overall system architecture
* AI/developer operating instructions

Those responsibilities belong to:

```text
AGENTS.md
PRD.md
DESIGN.md
ARCHITECTURE.md
```

When implementing the application, these documents should be read together.

---

# 2. Documentation Authority

Use the project documentation according to its responsibility:

```text
AGENTS.md
    ↓
Development and AI working rules

PRD.md
    ↓
Product requirements and scope

ARCHITECTURE.md
    ↓
System structure and technical boundaries

DESIGN.md
    ↓
Visual and interaction design

IMPLEMENTATION.md
    ↓
Engineering implementation details
```

Do not duplicate requirements from these documents here.

If an implementation decision is already defined elsewhere, follow the corresponding document.

---

# 3. Initial Implementation Scope

The first release is a **frontend-first static implementation**.

It must provide a realistic, functional trading journal experience without requiring a backend.

The initial implementation uses:

```text
Next.js
React
JavaScript
Tailwind CSS
shadcn/ui
Lucide
Static/mock data
Local application state
```

The initial release does not require:

```text
Backend API
Database
Real authentication
Live market data
Broker integration
External trading APIs
```

The code must nevertheless be structured so these can be introduced later.

---

# 4. Language Requirement

The project uses **JavaScript only**.

Use:

```text
.js
.jsx
```

Do not introduce:

```text
.ts
.tsx
TypeScript interfaces
TypeScript types
TypeScript enums
```

Do not convert the project to TypeScript.

---

# 5. Implementation Strategy

Build the application in this order:

```text
1. Project foundation
2. Application shell
3. Reusable UI primitives
4. Mock data and domain utilities
5. Trade Journal
6. New Trade workflow
7. Trade calculations
8. Dashboard
9. Analytics
10. Calendar
11. Settings
12. Responsive/accessibility polish
13. Backend integration preparation
```

The core trade workflow should be completed before investing significant effort in secondary features.

---

# 6. Project Structure

The implementation should maintain clear separation between routing, UI, domain logic, data, and services.

Recommended structure:

```text
app/
├── layout.js
├── page.js
│
├── dashboard/
│   └── page.js
│
├── trades/
│   ├── page.js
│   ├── new/
│   │   └── page.js
│   └── [id]/
│       └── page.js
│
├── analytics/
│   └── page.js
│
├── calendar/
│   └── page.js
│
└── settings/
    └── page.js

components/
├── layout/
├── dashboard/
├── trades/
├── analytics/
├── calendar/
├── settings/
├── shared/
└── ui/

lib/
├── calculations/
├── formatters/
├── mock-data/
├── constants/
└── utils.js

services/
├── tradeService.js
└── ...

hooks/
├── useTrades.js
├── useTradeFilters.js
└── ...

public/
```

The structure may evolve if implementation requires it, but responsibilities should remain separated.

---

# 7. Routing

Use the Next.js App Router.

Application routes should represent actual product areas.

Initial routes:

```text
/dashboard
/trades
/trades/new
/trades/[id]
/analytics
/calendar
/settings
```

The root route may redirect to the dashboard or serve as the application entry point according to the final navigation structure.

Avoid unnecessary nested routing.

---

# 8. Application Shell

Create a shared application shell for authenticated/product areas.

Conceptually:

```text
AppShell
├── Sidebar
├── Header
└── Main Content
```

The shell should be reused instead of rebuilding navigation and page framing for every route.

The shell is responsible for:

* Global navigation
* Responsive navigation
* Header placement
* Main content layout
* Global application structure

It should not contain page-specific trading logic.

---

# 9. Navigation Configuration

Navigation should have a single source of truth.

Example:

```javascript
const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Trade Journal",
    href: "/trades",
  },
  {
    label: "Analytics",
    href: "/analytics",
  },
  {
    label: "Calendar",
    href: "/calendar",
  },
  {
    label: "Settings",
    href: "/settings",
  },
];
```

Icons can be associated with each navigation item.

Do not duplicate navigation definitions across multiple components.

---

# 10. Server and Client Components

Use Server Components by default.

Use Client Components only where interactivity requires them.

Typical Client Components include:

```text
TradeForm
TradeFilters
Interactive tables
Dialogs
Dropdowns
Theme controls
Charts
Calendar interactions
```

Do not make the entire application client-side unnecessarily.

---

# 11. Component Architecture

Components should be organized by responsibility.

For example:

```text
components/trades/
├── TradeForm.jsx
├── TradeTable.jsx
├── TradeDetails.jsx
├── TradeFilters.jsx
└── TradeStats.jsx
```

A component should have one clear responsibility.

Avoid components that simultaneously handle:

```text
UI
Data fetching
Financial calculations
Routing
Large amounts of state
```

when those concerns can reasonably be separated.

---

# 12. Shared Components

Create shared components only for genuinely reusable patterns.

Examples:

```text
PageHeader
MetricCard
StatusBadge
EmptyState
ErrorState
ConfirmDialog
FilterBar
```

Do not abstract every small JSX fragment.

Abstraction should improve maintainability rather than increase complexity.

---

# 13. UI Components

Use shadcn/ui where appropriate for common primitives.

Examples:

```text
Button
Input
Select
Dialog
DropdownMenu
Popover
Calendar
Tabs
Tooltip
```

Components should be customized to follow `DESIGN.md`.

Do not introduce a second UI system.

---

# 14. Icons

Use Lucide consistently.

Keep icon usage functional.

Icons should communicate:

* Navigation
* Actions
* Status
* Context

Avoid decorative icon overload.

---

# 15. Data Layer

The initial version uses static/mock data.

Mock data must live outside page components.

Recommended:

```text
lib/mock-data/
├── trades.js
├── assets.js
└── strategies.js
```

Pages and components should consume data through the appropriate abstraction rather than embedding large datasets.

---

# 16. Trade Service

Even without a backend, create a service boundary for trade operations.

Example:

```javascript
export async function getTrades() {
  return mockTrades;
}

export async function getTradeById(id) {
  return mockTrades.find((trade) => trade.id === id);
}

export async function createTrade(data) {
  // static implementation
}

export async function updateTrade(id, data) {
  // static implementation
}

export async function deleteTrade(id) {
  // static implementation
}
```

The service implementation may initially use mock data and client state.

The important goal is to keep the UI independent of the eventual persistence mechanism.

---

# 17. Domain Calculations

Financial calculations must be isolated from UI components.

Recommended:

```text
lib/calculations/
├── risk.js
├── reward.js
├── pnl.js
└── statistics.js
```

Components should call calculation functions instead of implementing financial formulas inside JSX.

---

# 18. Source Values and Derived Values

Separate source values from calculated values.

Typical source values:

```text
accountBalance
riskPercent
entryPrice
exitPrice
stopLoss
targetPrice
positionSize
direction
```

Typical derived values:

```text
riskAmount
potentialReward
actualRR
pnl
pnlPercent
rMultiple
result
```

Derived values should be calculated consistently from source values.

Avoid maintaining duplicate state for values that can safely be derived.

---

# 19. Risk Calculation

Risk amount is calculated from account balance and user-selected risk percentage.

Formula:

```text
Risk Amount =
Account Balance × Risk % ÷ 100
```

Implementation:

```javascript
export function calculateRiskAmount(accountBalance, riskPercent) {
  const balance = Number(accountBalance);
  const risk = Number(riskPercent);

  if (!Number.isFinite(balance) || !Number.isFinite(risk)) {
    return 0;
  }

  return (balance * risk) / 100;
}
```

Risk percentage is a user-controlled trade value.

It must not be permanently hardcoded.

---

# 20. Target R:R

Target R:R is a user-controlled trade value.

Internally it may be represented as:

```text
2
```

for:

```text
1:2
```

The implementation should support predefined values and custom input where required by the product.

---

# 21. Potential Reward

Potential reward is calculated using:

```text
Potential Reward =
Risk Amount × Target R:R
```

Implementation:

```javascript
export function calculatePotentialReward(riskAmount, targetRR) {
  const risk = Number(riskAmount);
  const rr = Number(targetRR);

  if (!Number.isFinite(risk) || !Number.isFinite(rr)) {
    return 0;
  }

  return risk * rr;
}
```

---

# 22. Price-Based R:R

When price levels are available, actual price-based R:R can be calculated.

For a Long trade:

```text
Risk Distance =
Entry Price - Stop Loss

Reward Distance =
Target Price - Entry Price
```

For a Short trade:

```text
Risk Distance =
Stop Loss - Entry Price

Reward Distance =
Entry Price - Target Price
```

Then:

```text
R:R =
Reward Distance ÷ Risk Distance
```

Implementation:

```javascript
export function calculateRR({
  direction,
  entryPrice,
  stopLoss,
  targetPrice,
}) {
  const entry = Number(entryPrice);
  const stop = Number(stopLoss);
  const target = Number(targetPrice);

  const riskDistance =
    direction === "long"
      ? entry - stop
      : stop - entry;

  const rewardDistance =
    direction === "long"
      ? target - entry
      : entry - target;

  if (riskDistance <= 0) {
    return 0;
  }

  return rewardDistance / riskDistance;
}
```

---

# 23. P&L Calculation

For Long:

```text
P&L =
(Exit Price - Entry Price) × Position Size
```

For Short:

```text
P&L =
(Entry Price - Exit Price) × Position Size
```

Implementation:

```javascript
export function calculatePnL({
  direction,
  entryPrice,
  exitPrice,
  positionSize,
}) {
  const entry = Number(entryPrice);
  const exit = Number(exitPrice);
  const size = Number(positionSize);

  if (
    !Number.isFinite(entry) ||
    !Number.isFinite(exit) ||
    !Number.isFinite(size)
  ) {
    return 0;
  }

  if (direction === "long") {
    return (exit - entry) * size;
  }

  return (entry - exit) * size;
}
```

---

# 24. R Multiple

Actual R multiple:

```text
R Multiple =
P&L ÷ Risk Amount
```

Implementation:

```javascript
export function calculateRMultiple(pnl, riskAmount) {
  const profitLoss = Number(pnl);
  const risk = Number(riskAmount);

  if (!Number.isFinite(profitLoss) || !Number.isFinite(risk) || risk === 0) {
    return 0;
  }

  return profitLoss / risk;
}
```

---

# 25. Trade Result

Determine result from actual P&L.

```javascript
export function getTradeResult(pnl) {
  const value = Number(pnl);

  if (value > 0) {
    return "win";
  }

  if (value < 0) {
    return "loss";
  }

  return "break-even";
}
```

The result should not be manually set independently when it can be derived from the actual outcome.

---

# 26. Trade Data Structure

The trade model should remain consistent throughout the frontend.

Example:

```javascript
{
  id: "trade-001",

  date: "2026-08-21",
  time: "10:30",

  asset: "XAUUSD",
  market: "Forex",
  direction: "long",

  accountBalance: 10000,
  positionSize: 1,

  entryPrice: 3348,
  exitPrice: 3365,

  riskPercent: 1,
  stopLoss: 3338,

  targetPrice: 3368,
  targetRR: 2,

  strategy: "Breakout",

  setup: "London session breakout",

  entryReason: "Price broke previous resistance.",

  exitReason: "Target reached.",

  emotion: "Confident",

  mistakes: "",
  lessons: "Wait for confirmation before entering.",
  notes: "Clean setup."
}
```

Calculated values may be derived when required rather than permanently stored in mock objects.

---

# 27. Trade Form

Use one reusable trade form for both creation and editing.

Example:

```jsx
<TradeForm
  mode="create"
  initialData={null}
  onSubmit={handleCreate}
/>
```

and:

```jsx
<TradeForm
  mode="edit"
  initialData={trade}
  onSubmit={handleUpdate}
/>
```

Avoid maintaining separate create and edit forms.

---

# 28. Trade Form State

Use structured local state.

Example:

```javascript
const [formData, setFormData] = useState({
  asset: "",
  direction: "long",
  entryPrice: "",
  exitPrice: "",
  positionSize: "",
  accountBalance: "",
  riskPercent: "",
  stopLoss: "",
  targetPrice: "",
  targetRR: "",
  strategy: "",
  setup: "",
  entryReason: "",
  exitReason: "",
  emotion: "",
  mistakes: "",
  lessons: "",
  notes: "",
});
```

Form state should represent user input.

Derived calculations should be computed separately.

---

# 29. Derived Form Calculations

When sufficient values exist, calculate:

```text
Risk Amount
Potential Reward
Actual R:R
P&L
R Multiple
Result
```

Use memoized calculations only when useful.

Avoid duplicating calculated values in state unless persistence specifically requires them.

---

# 30. Trade Form Validation

Validate user input before submission.

Minimum validation should cover:

```text
Required fields
Numeric fields
Positive numeric values
Direction
Risk %
Target R:R
Entry price
Position size
Stop loss
Target
```

Directional price validation:

For Long:

```text
Stop Loss < Entry
Target > Entry
```

For Short:

```text
Stop Loss > Entry
Target < Entry
```

Validation messages should identify what needs to be corrected.

---

# 31. Trade Creation Flow

The creation flow should be:

```text
Open New Trade
      ↓
Enter Trade Data
      ↓
Calculate Derived Values
      ↓
Validate
      ↓
Review
      ↓
Save
      ↓
Update Trade State
      ↓
Show Success Feedback
```

After successful creation, navigate to the appropriate destination according to the UX defined in the product/design documentation.

---

# 32. Trade Editing

Editing should:

1. Load the existing trade.
2. Populate the form.
3. Allow changes.
4. Recalculate derived values.
5. Validate.
6. Save the updated trade.
7. Update visible UI state.

Do not create a separate edit-specific data model.

---

# 33. Trade Deletion

Deletion should require confirmation.

Flow:

```text
Delete
  ↓
Confirmation
  ↓
Delete
  ↓
Update State
  ↓
Success Feedback
```

The UI should not silently delete a trade from a single accidental action.

---

# 34. Trade List

The trade list should use the central trade dataset.

Required functionality:

```text
Display
Search
Filter
Sort
Open details
Edit
Delete
```

Avoid maintaining duplicate trade arrays for individual screens.

---

# 35. Filtering

Filtering should operate on the current trade collection.

Possible filter dimensions:

```text
Asset
Direction
Result
Strategy
Date range
```

Additional filters may be introduced when required by the product specification.

Keep filter state separate from trade data.

---

# 36. Search

Search should be case-insensitive.

It may search meaningful textual fields such as:

```text
Asset
Strategy
Setup
Notes
```

Do not make search unnecessarily complex for the initial implementation.

---

# 37. Sorting

Default trade ordering:

```text
Newest first
```

Allow sorting by meaningful numeric/date fields when required.

Sorting should create a derived view rather than mutate the original trade collection.

---

# 38. Dashboard Data

Dashboard metrics must be derived from the same trade dataset used by the journal.

Do not create independent hardcoded dashboard values.

The dashboard should calculate its data through reusable statistics functions.

---

# 39. Statistics Functions

Create reusable functions such as:

```javascript
calculateWinRate(trades)
calculateTotalPnL(trades)
calculateAverageWin(trades)
calculateAverageLoss(trades)
calculateProfitFactor(trades)
calculateExpectancy(trades)
calculateAverageR(trades)
calculateBestTrade(trades)
calculateWorstTrade(trades)
```

Keep these functions pure whenever possible.

A pure function should:

* Receive data
* Calculate a result
* Return a result
* Avoid changing external state

---

# 40. Win Rate

Calculate from closed trades:

```text
Winning Trades
÷
Closed Trades
× 100
```

Break-even trades are not wins.

If there are no closed trades, return a safe empty/zero state rather than producing `NaN`.

---

# 41. Total P&L

Calculate:

```text
Sum of P&L for applicable trades
```

Do not hardcode the dashboard total.

---

# 42. Average Win

Calculate using winning trades only.

If there are no winning trades, return a safe empty/zero value.

---

# 43. Average Loss

Calculate using losing trades only.

If there are no losing trades, return a safe empty/zero value.

---

# 44. Profit Factor

Calculate:

```text
Gross Profit
÷
Absolute Gross Loss
```

If gross loss is zero, represent the result safely in the UI rather than returning Infinity.

---

# 45. Expectancy

Expectancy should be clearly identified by its unit.

Dollar expectancy and R-based expectancy must not be mixed.

For R-based expectancy:

```text
Expected R per Trade
```

should be explicitly labeled.

---

# 46. Equity Curve

Generate the equity curve from chronological trade results.

Conceptually:

```text
Starting Balance
      ↓
+ Trade P&L
      ↓
New Balance
      ↓
+ Trade P&L
      ↓
New Balance
```

The chart should consume the generated series.

Do not hardcode chart values separately from trade data.

---

# 47. Analytics

Analytics should operate on the same trade dataset.

Analytics calculations may be grouped by:

```text
Asset
Strategy
Day
Month
Direction
Result
```

The implementation should prioritize useful comparisons over the number of charts.

---

# 48. Calendar Data

Calendar data should be derived from trades.

Group trades by date.

Example structure:

```javascript
{
  "2026-08-21": {
    pnl: 170,
    trades: 2,
    rMultiple: 1.7
  }
}
```

The calendar should not maintain an independent trading history.

---

# 49. Formatting Utilities

Centralize common formatting.

Recommended:

```text
lib/formatters/
├── currency.js
├── percentage.js
├── number.js
└── date.js
```

Use these functions consistently throughout the application.

---

# 50. Currency Formatting

Use `Intl.NumberFormat` rather than manually concatenating currency symbols.

Example:

```javascript
export function formatCurrency(value, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(Number(value) || 0);
}
```

Currency should remain configurable for future support.

---

# 51. Percentage Formatting

Example:

```javascript
export function formatPercentage(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "0.00%";
  }

  return `${numericValue.toFixed(2)}%`;
}
```

---

# 52. R Multiple Formatting

Example:

```javascript
export function formatRMultiple(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "0.00R";
  }

  const formatted = numericValue.toFixed(2);

  return numericValue > 0
    ? `+${formatted}R`
    : `${formatted}R`;
}
```

---

# 53. State Management

Use local React state by default.

Suitable tools:

```text
useState
useMemo
useCallback
useContext
```

Do not introduce a global state library unless actual application complexity justifies it.

Global state should not be used simply because it is available.

---

# 54. Trade State

During the static phase, trade state may be managed at an appropriate application level.

Possible structure:

```text
Trade Provider
      ↓
Trade Hooks
      ↓
Pages / Components
```

The exact mechanism can remain lightweight.

The important requirement is that multiple views can access consistent trade data.

---

# 55. Local Persistence

LocalStorage may be introduced as an optional prototype persistence mechanism.

If used:

```text
trading-journal-trades
```

may store serialized trade data.

LocalStorage is temporary prototype persistence only.

It must not be treated as the final persistence architecture.

---

# 56. Mock Data Requirements

Mock data should contain enough variation to exercise the UI.

Include examples of:

```text
Winning trades
Losing trades
Break-even trades
Long trades
Short trades
Different assets
Different strategies
Different risk percentages
Different target R:R values
Different dates
```

This is important for testing analytics and filters.

---

# 57. Mock Data Quality

Mock values should be internally coherent.

For example, if a trade says:

```text
direction: "long"
```

its prices should represent a valid long setup.

If:

```text
pnl > 0
```

the result should not simultaneously be `"loss"`.

Mock data should resemble real trading records rather than arbitrary random numbers.

---

# 58. Loading, Empty, and Error States

Every data-driven screen should have clear handling for:

```text
Loading
Empty
Success
Error
```

Even though the first implementation uses static data, the UI should be designed so that future asynchronous data loading can be integrated cleanly.

---

# 59. Empty State

Empty states should provide a useful next action.

For the trade journal:

```text
No trades yet.

Start your journal by recording your first trade.

[ New Trade ]
```

Do not show fake data merely to avoid an empty state.

---

# 60. Error Handling

Errors should be represented at the appropriate layer.

Business/data errors should not be hidden inside UI components.

User-facing messages should be understandable.

Do not expose raw stack traces or implementation details to normal users.

---

# 61. Delete Confirmation

Use a reusable confirmation dialog for destructive actions.

Do not implement custom delete dialogs repeatedly across the application.

---

# 62. Responsive Implementation

The application must be implemented mobile-first.

Use responsive layouts rather than separate desktop/mobile applications.

Typical responsive behavior:

```text
Desktop
Sidebar + Content

Tablet
Collapsible Sidebar + Content

Mobile
Compact Navigation + Content
```

Trade forms should become single-column on small screens.

Tables should remain usable through responsive adaptation or controlled horizontal scrolling.

---

# 63. Accessibility

Implementation must use semantic HTML and accessible controls.

Required basics:

```text
Labels for inputs
Keyboard navigation
Visible focus states
Accessible buttons
Accessible dialogs
Semantic navigation
Semantic headings
```

Do not rely solely on color for status communication.

---

# 64. Performance

Prefer simple and efficient implementations.

Avoid:

```text
Unnecessary dependencies
Duplicate datasets
Unnecessary global state
Repeated expensive calculations
Large client components
```

Use memoization when there is an actual performance reason.

Do not prematurely optimize every component.

---

# 65. Dependency Policy

Before adding a dependency, determine whether:

1. The functionality is actually required.
2. An existing project dependency already provides it.
3. The feature can reasonably be implemented with native React/browser capabilities.
4. The dependency introduces unnecessary complexity.

Keep the dependency footprint small.

---

# 66. Code Style

Prefer readable JavaScript.

Good:

```javascript
const winningTrades = trades.filter(
  (trade) => trade.pnl > 0
);
```

Avoid unnecessarily compressed or clever code.

Use descriptive names.

Good:

```text
riskAmount
targetRR
winningTrades
averageLoss
```

Avoid vague names such as:

```text
x
data2
tmp
thing
```

---

# 67. Naming

React components:

```text
PascalCase.jsx
```

Examples:

```text
TradeForm.jsx
MetricCard.jsx
TradeTable.jsx
```

Utility modules:

```text
camelCase.js
```

Examples:

```text
calculateRisk.js
formatCurrency.js
statistics.js
```

Next.js route files:

```text
page.js
layout.js
```

---

# 68. Comments

Comments should explain **why**, not obvious syntax.

Avoid:

```javascript
// Add two numbers
const total = a + b;
```

Prefer comments when explaining:

* Non-obvious financial logic
* Temporary implementation decisions
* Future replacement points
* Important edge-case handling

Do not fill the codebase with unnecessary comments.

---

# 69. Testing

The highest-value tests should cover domain calculations first.

Minimum calculation coverage:

```text
Risk amount
Potential reward
Long P&L
Short P&L
R multiple
Trade result
Win rate
Total P&L
Average win
Average loss
Profit factor
Expectancy
```

Test both normal and edge cases.

---

# 70. Critical Edge Cases

The implementation should safely handle:

```text
Zero trades
Zero risk
Missing numeric values
Invalid numeric values
Zero gross loss
Zero position size
Invalid stop loss
Invalid target
Long trade
Short trade
Break-even trade
Negative P&L
Positive P&L
```

Do not allow invalid calculations to produce:

```text
NaN
Infinity
undefined
```

in visible financial metrics.

---

# 71. Implementation Phases

## Phase 1 — Foundation

Implement:

```text
Next.js project
JavaScript configuration
Tailwind
shadcn/ui
Lucide
Global styles
Application shell
Navigation
Responsive structure
```

---

## Phase 2 — Domain Foundation

Implement:

```text
Trade model
Mock data
Calculation utilities
Formatting utilities
Trade service abstraction
```

This creates the foundation for all screens.

---

## Phase 3 — Trade Journal

Implement:

```text
Trade list
Search
Filters
Sorting
Trade details
New trade
Edit trade
Delete trade
```

---

## Phase 4 — Trade Calculations

Implement and verify:

```text
User risk %
Risk amount
User target R:R
Potential reward
Price-based R:R
P&L
R multiple
Result
Long/Short validation
```

This phase should be completed before advanced analytics.

---

## Phase 5 — Dashboard

Implement:

```text
Performance metrics
Equity curve
Recent trades
Dashboard filtering
```

All dashboard values should come from the trade data.

---

## Phase 6 — Analytics

Implement only analytics defined or justified by the product requirements.

Possible groupings:

```text
Asset
Strategy
Day
Month
Direction
```

---

## Phase 7 — Calendar

Implement:

```text
Trade grouping by date
Daily P&L
Daily R
Trade count
Daily trade details
```

---

## Phase 8 — Settings

Implement the settings required by the product specification.

Defaults may be configured here, but individual trade values remain editable.

---

## Phase 9 — Quality Pass

Review:

```text
Responsive behavior
Accessibility
Loading states
Empty states
Error states
Calculation correctness
Visual consistency
Component duplication
Performance
```

---

## Phase 10 — Backend Preparation

Once the static frontend is stable, prepare for:

```text
Authentication
Persistent storage
API
User accounts
Database
```

The frontend should continue using the service boundary rather than coupling directly to the eventual backend implementation.

---

# 72. Definition of Done

The implementation is ready for the next development stage when:

```text
Project runs successfully
Routes work
Application shell works
Trade data is centralized
Trade service boundary exists
Trade calculations are isolated
New Trade works
Edit Trade works
Delete Trade works
Trade details work
Search works
Filtering works
Sorting works
Dashboard derives its metrics from trades
Analytics derives its data from trades
Calendar derives its data from trades
Responsive layouts work
Core accessibility requirements work
Calculation edge cases are handled
No TypeScript exists
No unnecessary backend dependency exists
```

Visual approval is determined against `DESIGN.md`.

Product completeness is determined against `PRD.md`.

Architectural compliance is determined against `ARCHITECTURE.md`.

---

# 73. Final Implementation Principle

Implementation should remain **simple, modular, and replaceable**.

The static prototype is not disposable code.

It should establish the frontend foundation that can later evolve into the production application.

The most important engineering boundary is:

```text
UI
 ↓
Application State / Hooks
 ↓
Services
 ↓
Data Source
```

Financial calculations should remain isolated:

```text
Trade Data
 ↓
Calculation Functions
 ↓
Derived Metrics
 ↓
UI
```

The implementation should make it possible to replace mock data with a real API without rewriting the product UI.

Do not duplicate requirements from `PRD.md`, visual rules from `DESIGN.md`, architecture decisions from `ARCHITECTURE.md`, or agent instructions from `AGENTS.md`.

**Implement the system; do not rewrite its specifications.**
