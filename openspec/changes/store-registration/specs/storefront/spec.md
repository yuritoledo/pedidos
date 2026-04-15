## MODIFIED Requirements

### Requirement: Storefront only visible for active stores
The storefront at `/{slug}/produtos` SHALL only render when the store has `status: active`. Any other status SHALL result in a 404 response.

#### Scenario: Active store renders storefront
- **WHEN** a visitor navigates to `/{slug}/produtos` and the store exists with `status: active`
- **THEN** system renders the full storefront with products

#### Scenario: Pending store returns 404
- **WHEN** a visitor navigates to `/{slug}/produtos` and the store has `status: pending`
- **THEN** system calls `notFound()` and returns a 404 page

#### Scenario: Suspended store returns 404
- **WHEN** a visitor navigates to `/{slug}/produtos` and the store has `status: suspended`
- **THEN** system calls `notFound()` and returns a 404 page

#### Scenario: Unknown slug returns 404
- **WHEN** a visitor navigates to `/{slug}/produtos` and no store exists with that slug
- **THEN** system calls `notFound()` and returns a 404 page (existing behavior, unchanged)
