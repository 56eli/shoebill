# Answers to Your Questions

## 1. New Pictures for Returning Users
**SOLVED:** Added cache-busting version parameter to manifest.json fetch in `docs/script.js`:
```javascript
const MANIFEST_VERSION = '20260808-2';
const res = await fetch(`manifest.json?v=${MANIFEST_VERSION}`);
```
**How it works:** When you add new images and push, increment the `MANIFEST_VERSION` string (e.g., to `'20260808-3'`). This forces all browsers to fetch the fresh manifest.json instead of using their cached version. Returning users will automatically see new images appear in the mosaic as they scroll.

---

## 2. GitHub Pages Monthly Quota Monitoring
**ANSWER:** GitHub does **NOT** provide a built-in dashboard to check remaining Pages bandwidth quota.

- The 100GB/month is a **soft limit** for free GitHub Pages
- There is **no usage tracking** in GitHub's UI
- GitHub does not expose Pages bandwidth via API

**Workarounds:**
1. **Third-party analytics** - Add Google Analytics, Plausible, or similar to track page views and estimate bandwidth
2. **Cloudflare** - If you use Cloudflare in front of GitHub Pages, you get bandwidth analytics
3. **GitHub Support** - Contact GitHub support to request usage data (not guaranteed)
4. **Estimate manually** - Based on current 99 images at ~23MB total, you have ~4,347 full wall loads per month before hitting 100GB

**Recommendation:** At current scale (99 images, ~23MB), you're safe. Even with 1,000 visitors/day viewing 5MB each, that's only ~15GB/month.

---

## 3. Archery Image Framing
**SOLVED:** Regenerated `shoebill-archery-target-bullseye.jpg` with:
- Shoebill positioned on the **left third** of the frame (rule of thirds)
- More negative space to the right
- Target and bow still clearly visible
- Better composition for the action shot

---

## 4. Pilot Airplane Image
**SOLVED:** Regenerated `shoebill-pilot-airplane-cockpit.jpg` with:
- Shoebill **sitting in the pilot seat** (not behind the controller)
- Both wings visible on the yoke
- Looking out the windshield
- Instrument panel visible below
- Professional pilot uniform
- Clear view of the shoebill as the main subject

---

## 5. Helicopter Image Removed
**SOLVED:** Moved `shoebill-pilot-helicopter-headset.jpg` from:
- `docs/funny/` → `unfunny/` (repo root)
- Also removed from `funny/` root mirror
- **Result:** No longer appears on the live wall
- Manifest updated to 99 images
- Fallback array in script.js updated

---

## Summary of Changes Committed & Pushed
| Action | File | Status |
|--------|------|--------|
| Cache-busting | `docs/script.js` | ✅ Added MANIFEST_VERSION |
| Regenerate | `shoebill-archery-target-bullseye.jpg` | ✅ Better left framing |
| Regenerate | `shoebill-pilot-airplane-cockpit.jpg` | ✅ Shoebill in seat |
| Remove | `shoebill-pilot-helicopter-headset.jpg` | ✅ Moved to unfunny/ |
| Sync | `docs/manifest.json` | ✅ 99 images |
| Sync | `funny/` mirror | ✅ Updated |

**Total images on wall:** 99 (down from 100, after removing helicopter)

---

## Next Steps Suggestion
To ensure returning users see the latest images:
1. After adding new images and pushing, increment `MANIFEST_VERSION` in `docs/script.js`
2. Example: Change from `'20260808-2'` to `'20260808-3'`
3. This forces all browsers to refresh the manifest and discover new images
