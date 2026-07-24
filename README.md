# BLADE: DAYWALKER — Night Hunt

A single-file Three.js (r128) action game. 24 continuous Acts, partner tag-team
combat, a walkable safehouse hub, and a Versus Arena.

## Deploying to GitHub Pages / Cloudflare Pages

Push the contents of this folder to your repo root:

    index.html
    icons/
      icon.svg
      icon-192.png
      icon-512.png
      icon-512-maskable.png   (Android adaptive/masked icons)
      apple-touch-icon.png    (iOS Home Screen)
      favicon-64.png
      manifest.webmanifest

`index.html` is fully self-contained (game code, menu theme and favicon are
embedded). The `icons/` folder is only needed for the Home Screen / PWA icon.

**Add to Home Screen:** open the site in Safari (iOS) or Chrome (Android) and
choose "Add to Home Screen". The app launches fullscreen with the BLADE icon.

Bump your CDN/Pages cache on each deploy or the old build may be served.

## Controls

Keyboard/mouse: WASD move · mouse look (click to lock, or right-drag) ·
SPACE double jump · SHIFT sprint · J / left-click light · K / right-click heavy ·
L or CTRL dodge · G glaive · Q special · F Daywalker · E assist · R tag ·
Z Team-Up · ESC pause · F11 or V fullscreen · J or E to use safehouse terminals.

Gamepad (Spider-Man: Friend or Foe layout): A jump · X light · Y heavy · B dodge ·
LB assist · RB special · LT tag · RT Daywalker · L3 sprint · R3 Team-Up ·
Start pause · D-pad navigates menus.

Touch: left stick moves, drag the right side to look, on-screen buttons for
everything else.

## Iterating

The source is one file with tagged sections — search for `[CORE]`, `[DATA]`,
`[BUILD]`, `[WORLD]`, `[FX]`, `[ENT]`, `[ACT]`, `[HUB]`, `[FLOW]`.

Campaign content lives in the `ACTS` array: each Act is a list of beats built
from `F()` fight, `Gt()` gauntlet, `T()` traverse, `O()` objective, `Hn()` hunt,
`X()` explore, `E()` elite and `B()` boss. Act *length* is scaled separately in
`initActs()` so authored beat lists stay readable.
