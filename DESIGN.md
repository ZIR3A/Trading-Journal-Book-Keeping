# Trading Journal App — Design Specification

## 1. Purpose

This document defines the complete visual and interaction design system for the Trading Journal App.

The application must follow a **Minimalist Monochrome** visual language.

The design should feel:

* Professional
* Calm
* Financial
* Precise
* Minimal
* Data-focused
* Modern
* Serious
* Easy to scan
* Suitable for long-term daily use

The interface must prioritize **clarity over decoration**.

Do not introduce unnecessary gradients, colorful illustrations, excessive shadows, decorative animations, or visually noisy components.

---

# 2. Core Design Principle

The application is a **trading journal and bookkeeping system**, not a social platform or entertainment application.

Every design decision should support one of these goals:

1. Record trades quickly.
2. Understand trading performance.
3. Review trading behavior.
4. Identify mistakes.
5. Track risk.
6. Track profitability.
7. Maintain disciplined trading records.

The UI should make important trading information immediately understandable.

---

# 3. Visual Direction

## Design Style

**Minimalist Monochrome Financial Dashboard**

The visual language should resemble a combination of:

* Professional trading journal
* Financial analytics application
* Modern SaaS dashboard
* Accounting/bookkeeping software
* High-end productivity application

Avoid making the interface look like:

* Gaming software
* Cryptocurrency dashboards
* Neon trading terminals
* Social media
* Marketing landing pages
* Generic admin templates

---

# 4. Color System

The application uses a monochrome color system.

## Primary Colors

```text
Background:
#FFFFFF

Foreground:
#111111

Primary Text:
#111111

Secondary Text:
#666666

Muted Text:
#888888

Border:
#E5E5E5

Subtle Background:
#F7F7F7

Card Background:
#FFFFFF
```

## Dark Mode

Dark mode should remain monochrome.

```text
Background:
#111111

Foreground:
#F5F5F5

Primary Text:
#F5F5F5

Secondary Text:
#A0A0A0

Muted Text:
#777777

Border:
#2A2A2A

Subtle Background:
#181818

Card Background:
#151515
```

Do not introduce bright accent colors simply to differentiate sections.

---

# 5. Trading Status Colors

Although the overall design is monochrome, trading states may use restrained semantic colors.

## Profit

Use a subtle green.

```text
Profit:
#16A34A
```

## Loss

Use a subtle red.

```text
Loss:
#DC2626
```

## Neutral

Use the normal monochrome system.

```text
Neutral:
#666666
```

These colors must be used sparingly.

Do not make entire cards bright green or red.

Prefer:

* Text
* Small indicators
* Badges
* Icons
* Numbers
* Thin chart lines

---

# 6. Typography

Use a clean modern sans-serif font.

Preferred:

```text
Inter
```

Fallback:

```text
system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

## Typography Hierarchy

### Page Title

Large and strong.

```text
font-size: 28px–32px
font-weight: 600
line-height: 1.2
```

### Section Title

```text
font-size: 18px–22px
font-weight: 600
```

### Card Title

```text
font-size: 14px–16px
font-weight: 500–600
```

### Body

```text
font-size: 14px–15px
font-weight: 400
```

### Small Metadata

```text
font-size: 12px–13px
font-weight: 400
```

### Large Financial Numbers

Financial metrics may use:

```text
font-size: 24px–36px
font-weight: 600
letter-spacing: -0.02em
```

Large numbers should remain visually dominant without becoming oversized.

---

# 7. Spacing

Use a consistent spacing scale.

```text
4px
8px
12px
16px
20px
24px
32px
40px
48px
64px
```

Prefer generous whitespace.

Do not compress too many components into a small area.

---

# 8. Layout

The application should use a structured dashboard layout.

## Desktop

```text
┌────────────────────────────────────────────────────────────┐
│ Header                                                     │
├───────────────┬────────────────────────────────────────────┤
│               │                                            │
│ Sidebar       │ Main Content                               │
│               │                                            │
│ Navigation    │                                            │
│               │                                            │
└───────────────┴────────────────────────────────────────────┘
```

## Sidebar

Desktop sidebar should be:

* Minimal
* Fixed
* Clean
* Narrow
* Clearly structured

Navigation should contain:

* Dashboard
* Trade Journal
* Analytics
* Calendar
* Settings

Additional navigation items may be added only when required by the product specification.

---

# 9. Header

The header should remain simple.

Possible elements:

* Page title
* Date/range context
* Search where necessary
* Notifications if implemented
* User profile
* Theme toggle

Avoid placing too many controls inside the header.

The header should not compete with the page content.

---

# 10. Cards

Cards should be minimal.

Use:

```text
background: #FFFFFF
border: 1px solid #E5E5E5
border-radius: 10px–14px
```

Avoid heavy shadows.

Preferred:

```text
box-shadow: none
```

If depth is necessary, use an extremely subtle shadow.

Cards should primarily use borders and whitespace to create hierarchy.

---

# 11. Dashboard

The dashboard is the main overview screen.

It should answer:

* How much have I made?
* How much have I lost?
* How many trades have I taken?
* What is my win rate?
* What is my average risk/reward?
* How consistent am I?
* What has happened recently?

## Dashboard Structure

### Top Section

Page heading:

```text
Dashboard
```

Supporting context:

```text
Your trading performance overview
```

Include a date/range selector.

Example:

```text
Today
7 Days
30 Days
This Month
Custom
```

---

# 12. Performance Summary

Use metric cards.

Example:

```text
Net P&L
+$1,240.00

Win Rate
64.2%

Total Trades
47

Profit Factor
1.82
```

Additional metrics may include:

```text
Average Win
Average Loss
Best Trade
Worst Trade
Average R:R
Total Risk
```

Each metric must have:

* Label
* Value
* Optional supporting comparison
* Optional small trend indicator

Avoid excessive decoration.

---

# 13. P&L Chart

The primary dashboard chart should show cumulative performance.

Possible title:

```text
Equity Curve
```

The chart should be clean and minimal.

Use:

* Thin line
* Minimal grid
* Minimal labels
* Clear tooltip
* No unnecessary gradients
* No excessive axis markings

The chart must communicate the trend immediately.

---

# 14. Recent Trades

Display the latest trades in a clean table.

Columns may include:

```text
Date
Asset
Direction
Entry
Exit
Risk
R:R
P&L
Result
```

Example:

```text
21 Aug 2026
XAUUSD
Long
$3,348
$3,365
1%
1:2.4
+$170
WIN
```

Use compact status badges.

---

# 15. Trade Journal

The Trade Journal is the core bookkeeping area.

It should provide:

* Trade history
* Filtering
* Searching
* Sorting
* Trade creation
* Trade editing
* Trade deletion
* Trade details

---

# 16. New Trade Journal

The new trade form must be designed for fast data entry.

Important:

**Risk percentage must NOT be hardcoded.**

The user must be able to define the risk percentage when opening a new trade.

Example:

```text
Risk %
[ 1.00 ]
```

The user may enter:

```text
0.5%
1%
1.5%
2%
```

or another custom value.

The same applies to the target risk/reward ratio.

The user must be able to select or enter the desired R:R when creating a trade.

Example:

```text
Target R:R
[ 1 : 2 ]
```

Possible selectable values:

```text
1:1
1:1.5
1:2
1:2.5
1:3
Custom
```

The application must not assume a universal risk percentage or universal R:R.

---

# 17. Trade Form Structure

The trade creation form should be divided into logical sections.

## Basic Information

```text
Asset
Market
Date
Time
Direction
```

Direction:

```text
Long
Short
```

## Position Information

```text
Entry Price
Exit Price
Position Size
```

## Risk Management

```text
Risk %
Risk Amount
Stop Loss
Target
Target R:R
```

Risk-related values should be visually grouped.

## Trade Result

```text
P&L
P&L %
R Multiple
Result
```

Result:

```text
Win
Loss
Break Even
```

## Trade Notes

Allow the trader to record:

```text
Setup
Strategy
Entry Reason
Exit Reason
Mistakes
Emotion
Lessons
General Notes
```

The journal should encourage structured reflection.

---

# 18. Dynamic Risk Calculation

The UI should clearly communicate that risk is user-defined.

Example:

```text
Account Balance
$10,000

Risk
1%

Risk Amount
$100
```

If the user changes risk:

```text
Risk
2%

Risk Amount
$200
```

The interface should update dependent calculations dynamically.

Never visually imply that 1% is mandatory.

---

# 19. Dynamic R:R

The user controls the target ratio.

Example:

```text
Risk
$100

Target R:R
1:2

Target Profit
$200
```

Changing to:

```text
1:3
```

should update the target calculation.

The UI should clearly distinguish:

```text
Risk
Potential Reward
Actual Result
```

---

# 20. Trade Details

Clicking a trade should open a detailed view.

Possible structure:

```text
Trade #102

XAUUSD
LONG

Entry
$3,348

Exit
$3,365

Risk
1%

Target R:R
1:2

Actual R
+1.7R

P&L
+$170
```

Then show journal information:

```text
Setup
Entry Reason
Exit Reason
Emotion
Mistakes
Lessons
Notes
```

---

# 21. Analytics

Analytics should help the trader identify patterns.

Possible sections:

### Performance

```text
Net P&L
Win Rate
Profit Factor
Expectancy
Average R
```

### Risk

```text
Average Risk
Maximum Risk
Risk Consistency
```

### Trade Behavior

```text
Wins
Losses
Break Even
Average Win
Average Loss
```

### Time Analysis

```text
Performance by Day
Performance by Week
Performance by Month
```

### Asset Analysis

```text
Performance by Asset
Win Rate by Asset
Average R by Asset
```

Charts should remain minimal and readable.

---

# 22. Calendar

The calendar provides a visual trading history.

Each day can display:

```text
+2R
-1R
+0.5R
```

or the corresponding P&L.

Do not fill calendar cells with heavy colors.

Use subtle indicators and numbers.

---

# 23. Tables

Tables should prioritize readability.

Recommended:

```text
border-collapse: collapse
```

Use horizontal separators rather than boxed cells.

Header:

```text
font-size: 12px
font-weight: 500
color: #666666
```

Rows:

```text
height: 48px–60px
```

Hover:

Use a subtle background change.

Do not use excessive borders.

---

# 24. Buttons

Buttons should be simple.

## Primary Button

Dark background.

```text
background: #111111
color: #FFFFFF
```

Example:

```text
+ New Trade
```

## Secondary Button

White background with border.

```text
background: #FFFFFF
border: 1px solid #E5E5E5
color: #111111
```

## Destructive Button

Use restrained red only when necessary.

Avoid bright, oversized destructive actions.

---

# 25. Inputs

Inputs must feel professional and compact.

```text
height: 40px–44px
border: 1px solid #DCDCDC
border-radius: 8px
background: #FFFFFF
```

Focus:

Use a clear but minimal focus state.

Do not use glowing focus effects.

Labels should always be visible.

Do not rely only on placeholders.

---

# 26. Select / Combobox

For selectable values such as:

```text
Asset
Direction
Risk %
Target R:R
Strategy
Result
```

use clean dropdowns or comboboxes.

Risk and R:R must support custom input where appropriate.

---

# 27. Badges

Badges should be small and restrained.

Examples:

```text
WIN
LOSS
BE
LONG
SHORT
```

Avoid huge pill-shaped UI elements.

Use subtle rounded corners.

---

# 28. Icons

Use a consistent icon library.

Recommended:

```text
Lucide
```

Icons should generally use:

```text
16px–20px
```

Avoid using icons purely for decoration.

Every icon should communicate meaning or improve navigation.

---

# 29. Navigation States

Active navigation should be clearly visible but subtle.

Example:

```text
Dashboard
Trade Journal
Analytics
Calendar
Settings
```

Active state can use:

* Dark text
* Subtle background
* Small indicator

Avoid bright accent colors.

---

# 30. Modals

Modals should be used only when necessary.

Examples:

* Delete trade confirmation
* Important confirmation
* Quick trade entry

Modal design:

```text
white background
border
subtle shadow
10px–14px radius
```

Background overlay should be subtle.

---

# 31. Empty States

Empty states should remain minimal.

Example:

```text
No trades yet

Start your trading journal by recording your first trade.

[ + New Trade ]
```

Do not use large illustrations.

---

# 32. Loading States

Use skeleton loading where possible.

Skeletons should be:

* Simple
* Neutral
* Subtle
* Consistent with the layout

Avoid large loading animations.

---

# 33. Error States

Errors should be clear and actionable.

Example:

```text
Unable to save trade.

Please check the required fields and try again.

[ Try Again ]
```

Avoid technical error messages unless useful to the user.

---

# 34. Notifications

Use lightweight toast notifications.

Examples:

```text
Trade saved successfully.
Trade updated.
Trade deleted.
```

Keep notifications small and unobtrusive.

---

# 35. Responsive Design

The application must be responsive.

## Desktop

Use:

```text
Sidebar + Main Content
```

## Tablet

Sidebar may become collapsible.

## Mobile

Use:

```text
Top Header
Main Content
Bottom Navigation or Drawer
```

Tables should become horizontally scrollable or transform into compact trade cards.

The most important information should remain visible first.

---

# 36. Mobile Trade Entry

Trade creation must remain easy on mobile.

Fields should generally use a single-column layout.

Group related fields.

Example:

```text
Asset
Direction

Entry
Exit

Risk %
Target R:R

Stop Loss
Target

Notes
```

Do not force users to zoom or horizontally scroll through the trade form.

---

# 37. Accessibility

The application must maintain strong accessibility.

Requirements:

* Keyboard navigation
* Visible focus states
* Proper labels
* Sufficient contrast
* Semantic HTML
* Accessible buttons
* Accessible form controls
* Screen-reader-friendly labels
* Do not rely exclusively on color to communicate win/loss

For example:

Instead of only:

```text
green = win
red = loss
```

also display:

```text
WIN
LOSS
```

---

# 38. Animation

Animation must be subtle.

Use animation for:

* Page transitions
* Modal opening
* Dropdown opening
* Hover states
* Loading states
* Chart transitions

Avoid:

* Large entrance animations
* Excessive parallax
* Bouncing elements
* Flashing elements
* Decorative motion

Animation should never interfere with trading data readability.

---

# 39. Micro Interactions

Use subtle feedback.

Examples:

```text
Button hover
Input focus
Table row hover
Card hover
Toast appearance
Dropdown transition
```

Keep durations short.

Preferred:

```text
150ms–250ms
```

---

# 40. Charts

Charts must follow the same minimalist visual language.

Use:

* Thin lines
* Minimal grid
* Simple tooltips
* Clear labels
* Limited data decoration

Avoid:

* 3D charts
* Heavy gradients
* Excessive colors
* Unnecessary legends
* Decorative chart backgrounds

---

# 41. Financial Data Formatting

Financial values should be consistently formatted.

Examples:

```text
+$1,240.00
-$420.00
$10,000.00
```

R multiples:

```text
+2.4R
-1R
+0.5R
```

Percentages:

```text
1.00%
64.20%
```

Use consistent decimal precision throughout the application.

---

# 42. Information Hierarchy

Every page should have a clear hierarchy.

Priority:

```text
1. Page purpose
2. Important financial metrics
3. Primary action
4. Data
5. Secondary information
6. Metadata
```

The user should understand the page within seconds.

---

# 43. Design Density

The application should use **moderate information density**.

Do not make it:

```text
Too empty
```

or:

```text
Too dense
```

The ideal experience is:

```text
Information-rich
but
visually calm
```

---

# 44. Consistency Rules

All screens must share:

* Same spacing scale
* Same typography
* Same button system
* Same input system
* Same card system
* Same border radius
* Same icon sizing
* Same color system
* Same interaction behavior

Do not create one-off UI styles unless absolutely necessary.

---

# 45. Design Tokens

Use centralized design tokens.

Example conceptual structure:

```text
colors
typography
spacing
radius
shadows
transitions
breakpoints
```

Components should consume tokens rather than hardcoded random values.

---

# 46. Border Radius

Preferred system:

```text
Small:
6px

Default:
8px

Cards:
10px–14px

Large containers:
16px
```

Do not make every component excessively rounded.

Avoid the generic "everything is a pill" SaaS design.

---

# 47. Shadows

Default:

```text
No shadow
```

Use shadows only when needed to establish elevation.

Preferred:

```text
Very subtle
```

The visual hierarchy should primarily come from:

* Spacing
* Borders
* Typography
* Contrast

---

# 48. Design Anti-Patterns

Do NOT introduce:

* Neon colors
* Crypto-style UI
* Excessive gradients
* Glassmorphism
* Excessive blur
* Huge rounded cards
* Excessive shadows
* Animated backgrounds
* Stock illustrations
* 3D decorative graphics
* Unnecessary charts
* Excessive icons
* Excessive badges
* Rainbow analytics
* Overly colorful dashboards

---

# 49. Primary User Experience

The application should feel like:

> "A professional trading notebook combined with a clean financial analytics system."

The user should feel:

* Organized
* In control
* Focused
* Informed
* Disciplined

The interface should not create emotional excitement around profits or losses.

It should encourage objective decision-making.

---

# 50. Final Design Rule

When there is a choice between:

```text
More decoration
```

and:

```text
More clarity
```

always choose:

```text
More clarity.
```

When there is a choice between:

```text
More colors
```

and:

```text
Better hierarchy
```

choose:

```text
Better hierarchy.
```

When there is a choice between:

```text
More information
```

and:

```text
Better information architecture
```

choose:

```text
Better information architecture.
```

The Trading Journal App must remain **minimal, monochrome, professional, data-focused, and calm** across every screen and component.

**This design system is authoritative.**

Any future feature, page, component, or redesign must follow this specification unless the design system is explicitly changed and approved by the project owner.
