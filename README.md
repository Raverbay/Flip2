# MediaBay Fashion Master Theme V1

A reusable premium master theme for:
- fashion boutiques
- multibrand clothing stores
- footwear
- accessories
- streetwear
- lifestyle retail

## Architecture

The visual system is separated from client data.

- `index.html` — semantic page skeleton
- `style.css` — premium visual system / responsive layout / motion
- `engine.js` — data renderer + interactions + scroll engine
- `content.json` — client-specific content
- `assets/` — client-specific media

## To create a new client

1. Duplicate the theme.
2. Replace `content.json`.
3. Replace files in `assets/`.
4. Keep the HTML/CSS/engine unchanged unless the client's information architecture requires an optional block.

## Content model

`content.json` contains:
- site identity, tagline and theme colors
- hero
- editorial images
- collections
- brands
- story
- store/contact data
- reviews
- social links

The same theme can therefore become a men's store, women's boutique, footwear shop, streetwear store, accessories shop or multibrand concept without redesigning the interface.

## Design principles

This is intentionally not a generic "business website" template.

The system uses:
- editorial art direction
- oversized typography
- full-bleed photography
- asymmetric composition
- strong whitespace
- restrained motion
- progressive image reveals
- subtle parallax
- responsive mobile art direction
- data-driven sections
- reduced-motion accessibility

The goal is for every generated client site to feel like a custom fashion digital flagship while remaining based on one production system.
