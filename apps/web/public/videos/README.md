# Hero background video

Drop a file named `hero.mp4` in this folder and it will automatically play as the
homepage hero background (muted, looping), under a dark readability overlay.

- Recommended: 1920×1080 (or 1280×720), H.264 MP4, short loop (8–20s), < ~5 MB.
- Optional poster (shown before the video loads): `public/images/hero-poster.jpg`.
- Adjust how much video shows through by editing the overlay opacities in
  `components/sections/hero.tsx` (the `from-secondary/92 via-secondary/72 to-secondary/88` line).
