# BLADE: DAYWALKER — Night Hunt

Single-file Three.js (r128) action game. 24 continuous Acts, partner tag-team
combat, a walkable safehouse hub, and a Versus Arena.

## Deploy (GitHub Pages / Cloudflare Pages)

Push this folder's contents to your repo root:

    index.html
    icons/  (icon.svg, icon-192, icon-512, icon-512-maskable, apple-touch-icon, favicon-64, manifest.webmanifest)

`index.html` is self-contained (game, menu theme and favicon embedded). The
`icons/` folder only powers the Home Screen / PWA icon. Bump your cache on deploy.

**Add to Home Screen:** open in Safari (iOS) or Chrome (Android) → Add to Home
Screen. Launches fullscreen with the BLADE icon.

## Controls

Keyboard/mouse — WASD move · mouse look (click to lock, or right-drag) ·
SPACE double jump · SHIFT sprint · J / left-click light · K / right-click heavy ·
L or CTRL dodge · G glaive · Q special · F Daywalker · E assist · R tag ·
Z Team-Up · ESC pause · F11 or V fullscreen · J or E to use safehouse terminals.

Gamepad — three selectable layouts in Options (default "Friend or Foe"):
A jump · X light · Y heavy · B dodge · LB assist · RB special · LT tag ·
RT Daywalker · L3 sprint · R3 Team-Up · Start pause · D-pad navigates menus.
Southpaw stick swap available.

Touch — left stick moves, drag the right side to look, on-screen buttons for the rest.

## Options

Fullscreen, graphics quality, master sound, music volume, effects volume,
brightness, difficulty (Story / Hunter / Daywalker), camera shake, damage
numbers, invert look, camera sensitivity, controller button layout, stick
layout. All settings persist with your save.

## Iterating

Sections are tagged: `[CORE]` `[DATA]` `[BUILD]` `[WORLD]` `[FX]` `[ENT]`
`[ACT]` `[HUB]` `[FLOW]`.

Campaign content is the `ACTS` array — each Act is a beat list built from
`F()` fight, `Gt()` gauntlet, `T()` traverse, `O()` objective, `Hn()` hunt,
`X()` explore, `E()` elite, `B()` boss. Act *length* is scaled separately in
`initActs()` so the authored beat lists stay readable.
