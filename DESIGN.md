# Design

<!-- impeccable:design-schema 1 -->

## Visual World

The portfolio follows the supplied charcoal and sand interface: a compact
centered header, a two-column introduction, a broad biography and skill panel,
a filtered square project gallery, and a split contact panel.

## Color and Material

- Dark mode is the primary presentation: charcoal `#1b1c22`, slate panels
  `#252630`, pale text, gold `#b8a16a`, sand `#d7bda0`, and quiet gray borders.
- Light mode remains available as an accessibility and personal-preference
  option, with warm ivory surfaces and dark readable text.
- Signal colors follow each theme while preserving contrast for links, key
  technologies, focus, and interaction states.
- Project images stay photographic or come from the actual project; never use
  generated portraits or invented project artwork as biography.

## Typography

Geist Sans carries the name, headings, and paragraphs to match the supplied
interface. Geist Mono is reserved for technology labels and compact metadata.
Body copy remains comfortably readable.

## Composition

- Centered navigation and a split introduction with an initials portrait mark.
- Biography and skill chips sit in a broad panel, with education details kept
  in the same reading flow.
- Projects use a vertical filter on wide screens and square cards; empty, loading,
  and error states remain honest when the API has no project records.
- Contact details and the mail form sit side by side on wide screens and stack
  on narrow screens.
- Project cards derive their content from the backend. Empty, loading, and error
  states remain designed and honest.

## Components and Interaction

Use restrained rounded panels, tonal borders, and sand and gold accents. Links
underline on hover, buttons expose visible focus, and missing project links
remain disabled. The mobile navigation wraps into a compact grid.

## Motion and Accessibility

Use one entrance in the hero. Avoid repeated scroll-triggered reveals. Honor
reduced-motion preferences, keep semantic headings and form labels, and expose
loading and error changes to assistive technology.

## Responsive Rules

The hero and section headers become two-column editorial compositions on wide
screens. Mobile uses a three-column navigation grid, a stacked hero, and two
columns for compact facts. Avoid horizontal page scrolling at all widths.
