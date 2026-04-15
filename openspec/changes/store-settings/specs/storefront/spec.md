## MODIFIED Requirements

### Requirement: Storefront respects store open/closed state
The storefront at `/{slug}/produtos` SHALL display a "loja fechada" state when `store.isOpen` is `false`. The closed state SHALL show the store name and a message that the store is temporarily closed.

#### Scenario: Open store renders product grid
- **WHEN** `store.isOpen` is `true` and store has `status: active`
- **THEN** storefront renders the product grid normally

#### Scenario: Closed store shows closed state
- **WHEN** `store.isOpen` is `false`
- **THEN** storefront renders the store header and a "Loja temporariamente fechada" message instead of the product grid. Cart is not accessible.
