# AVORA V12.5.0 — Board & Visual Representation Engine

This release adds a structured, responsive visual layer to the existing progressive Tutor board.

## What is implemented
- Topic/event-aware visual selection for Mathematics.
- Renderable visual families: aligned equations, coordinate plane, number line, fraction model, decimal/place-value board, binary place-value board, triangle/geometry figure, polygon triangulation, 3D solid, compass construction, bearing/reference diagram, angle diagram, data chart framework, and ratio bar model.
- Visuals are rendered locally with React/SVG/CSS; no image API, external chart service, or new runtime dependency is required.
- Visuals sit inside the existing progressive teaching event so board text, teacher voice and visual representation share the same lesson step.
- Mobile layouts are scroll-safe/responsive.
- A visual coverage audit detects visual-eligible runtime tutor topics and fails if a topic has no visual family mapping.

## Important truthfulness boundary
This is a visual representation engine, not a claim that every curriculum diagram has already been authored with exact per-question coordinates/dimensions. Generic structural diagrams never invent numerical measurements. Exact graph points, construction measurements, labels and transformations should come from structured lesson data as the curriculum is progressively converted from source Markdown into runtime teaching scenes.

Run:
`npm run audit:v12.5-visual-teaching`
