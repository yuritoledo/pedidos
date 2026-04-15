## ADDED Requirements

### Requirement: Public landing page
The system SHALL serve a marketing landing page at `/` that explains the product value and drives registrations.

#### Scenario: Visitor lands on homepage
- **WHEN** a visitor navigates to `/`
- **THEN** system renders a page with: product headline, brief description of what the platform does, and a CTA button linking to `/register`

#### Scenario: Already-registered owner navigates to homepage
- **WHEN** any user visits `/`
- **THEN** the page renders normally (no auth state needed — landing page is fully public and static)
