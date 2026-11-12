# Air Jordan 4 — Version 4

Open `index.html` in a browser, or run `python3 -m http.server 8000` and visit http://localhost:8000. Deploy the directory as a static site to Vercel.

## Updates
- Career-stat labels are red, with adjusted spacing. The numbers count up sequentially and restart after a 5-second hold.
- The lower-right grey sneaker is a stationary, noninteractive image: no float, hover glow, or enlargement.
- The Nike swoosh is white and static; the header wordmark is also static.
- Other photographs retain floating, hover pause/glow, and click-to-enlarge functionality.
- Social links open Nike's X and Instagram profiles in new tabs.

Images are in `assets/`, and the page uses only HTML, CSS and vanilla JavaScript.

## Version 5 refinements
- Rebalanced statistic row spacing and final sneaker-deals numeral relative to the swoosh.
- Numbers briefly blur (1.65px) while counting and sharpen when complete.
- Hover glow for interactive photos is red.
- Nike swoosh uses a white-on-transparent PNG; it stays static and noninteractive.
- Lower-right grey sneaker remains static, without hover effects.


## Version 6 changes
- Nike swoosh is forced white, without animation or hover interactions.
- Statistic digits are crisp with no blur.
- Statistics begin at randomized, overlapping times each cycle; after all finish, they hold for five seconds before restarting.


## Hover video (V7)
The lower-left Michael Jordan photograph switches to `assets/jordan-leap-hover.mp4` when hovered with a mouse or focused with a keyboard. It plays silently, loops, and is cropped using `object-fit: cover` (never stretched). Moving away restores the original photo. Clicking the image still opens its enlarged still photograph. Reduced-motion settings keep the still photograph. The MP4 is self-hosted and requires no API.

V8: The upper-right black sneaker and center-right Jordan celebration photograph also play their own muted, looping MP4 clips on hover or keyboard focus. Each video is cropped with object-fit:cover, never stretched. Leaving the image stops and resets playback. The existing lower-left video interaction is preserved.


## Version 9 layout updates
The desktop collage follows the newest reference: images and labels have more breathing room, counting numerals use charcoal (#262626), and the Nike swoosh has been removed. All three hover videos, the red glow on interactive images, and the stationary grey shoe are preserved.
