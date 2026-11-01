# Changes

- 2026-11-01 adopt 0.575.0 (10f6d5f8c) from lucide-icons/lucide
- 2026-11-01 apply (src on 0.575.0): match upstream class merging when className repeats "lucide"
- 2026-11-01 skip 0.575.0..1.66.0 (src stays on 0.575.0): 0.575.0->1.66.0: no OSV advisories. Icon/createLucideIcon/defaultAttributes/types are a refactor onto @lucide/shared build logic plus features (LucideProvider context, nonScalingStroke, icon-data objects, aliases); RSC fixes a6e648a66/1f010a357 only concern the new provider/'use client' context we don't ship. hasA11yProp change is types-only. toCamelCase rewrite and toKebabCase null-guard touch helpers our Icon.tsx never calls (class names are precomputed). LICENSE edit rewords attribution text only, no code. Nothing is a security or correctness fix to code we ship.
