# GroomCheck

Mobile-first school attire and grooming camera prototype.

## V1
- Live phone camera using `getUserMedia()`
- Front/rear camera switching
- Head positioning guide and fringe reference line
- Simulated green PASS / red CHECK assessment
- Teacher override / confirmation
- No images are uploaded or stored

## Important
V1 uses a random simulated result so the complete scanning workflow and UI can be tested before computer vision is added.

## Planned V2
Replace the simulated result with on-device face/head landmark detection and measurable grooming checks. Keep the teacher as the final decision-maker rather than automatically enforcing a grooming decision.

## GitHub Pages
Enable GitHub Pages from the repository's `main` branch/root. Camera access requires HTTPS, which GitHub Pages provides.