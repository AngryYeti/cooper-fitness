# Founding homepage design QA

## Comparison basis

- Existing Cooper Fitness homepage capture: `../../work/cooper-fitness-current-homepage-reference.png`
- Founding offer desktop capture: `../../work/founding-homepage-final-desktop.png`
- Side-by-side comparison: `../../work/homepage-reference-comparison-final.png`
- Verified mobile first screen: `../../work/founding-homepage-final-mobile-verified.png`

The desktop reference and campaign captures were compared at the same 1264-pixel viewport width. The responsive hero was also checked at a 390 × 844 logical mobile viewport.

## Checks

- Brand continuity: black canvas, electric-blue accent, condensed labels, white display type, thin borders, and large rounded editorial panels remain aligned with the current site.
- Photography: only the existing `evanactionweb.png` and `evanselfiegym.jpeg` Cooper Fitness photos are used; no generated photography appears.
- Hierarchy: the offer, 12-week term, one-time USD $399 price, and primary action read clearly before secondary detail.
- Mobile conversion: the primary `GET STARTED TODAY` action is visible within the first 390 × 844 viewport.
- Responsive layout: no horizontal overflow was observed at the mobile viewport.
- Navigation: mobile menu opens and exposes the correct inventory-aware action.
- Inventory states: `OPEN` renders `GET STARTED TODAY`; `FULL` renders `JOIN THE WAITLIST` and disables direct purchase.
- Accessibility: one main landmark is present, headings are ordered, the menu control has a visible focus style, images have descriptive alternate text, and reduced-motion styles remain in place.
- Legal and support: exact terms, privacy, refund/cancellation, and support links remain visible in both purchase forms and the footer.
- Checkout result pages: invalid success verification stays neutral, and cancel messaging states that no payment was taken.
- Rollback: the founding homepage remains controlled by `FOUNDING_HOMEPAGE_ENABLED`; the original homepage implementation and assets are preserved.

## Result

Passed.
