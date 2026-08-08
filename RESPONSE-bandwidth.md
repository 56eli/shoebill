# Shoebill Bandwidth Analysis for Image Browsing

## Executive Summary
At 90 images × ~255KB average = **~23MB total**, the wall consumes significant bandwidth. GitHub Pages' 100GB/month limit allows ~4,347 full browses or ~20,000-40,000 partial sessions. Current implementation has good lazy loading but suboptimal cache behavior.

---

## Current State
- **Images:** 90 in `docs/funny/` (per manifest.json)
- **Total size:** ~23MB
- **Average per image:** ~255KB
- **Grid cells:** 140px-300px (responsive)
- **Loading strategy:** Lazy load + async decode + CSS grid dense flow

---

## Bandwidth Concerns

### 1. Per-User Consumption
| Scenario | Images Loaded | Data Transfer | Notes |
|----------|--------------|---------------|-------|
| Mobile viewport (2-col) | 2-4 visible | 0.5-1MB initial | Good with lazy load |
| Desktop viewport (1600px) | 4-6 visible | 1-1.5MB initial | Good with lazy load |
| Full scroll through wall | 90 images | ~23MB | Entire session |
| Lightbox click | 1 full-res | ~250KB | Additional per click |

### 2. GitHub Pages Limits
- **Monthly quota:** 100GB (free tier)
- **Full wall browses:** ~4,347/month (23MB × 4,347 ≈ 100GB)
- **Realistic estimate:** 20,000-40,000 sessions/month
  - Assumes users view 10-20 images (2.5-5MB) before leaving
  - Well within limits for typical traffic

### 3. Concurrent User Impact
- 100 concurrent users × 5MB average = 500MB simultaneous
- GitHub Pages handles this well
- **Risk:** Viral traffic spike could exhaust 100GB quickly
- **Mitigation:** Current lazy loading prevents worst-case scenarios

### 4. Mobile Data Impact
- **23MB total** = ~1-2% of typical 2GB mobile plan
- **Per session (10 images):** ~2.5MB = 0.125% of 2GB plan
- **Concern:** Users on limited plans or in regions with expensive data
- **Recommendation:** Consider adding data saver mode

---

## Current Optimizations (Good)
✅ **Lazy loading:** `img.loading = 'lazy'` - images load only when near viewport
✅ **Async decoding:** `img.decoding = 'async'` - doesn't block main thread
✅ **CSS Grid dense:** `grid-auto-flow: dense` - efficient layout, no gaps
✅ **Responsive grid:** Adapts from 2-col mobile to multi-col desktop
✅ **No build step:** Vanilla HTML/CSS/JS - no processing overhead

---

## Issues & Opportunities

### 🔴 Critical Issue
**Manifest cache policy:** `fetch('manifest.json', { cache: 'no-store' })`
- Forces re-fetch on EVERY page load
- Manifest is ~9KB, rarely changes
- **Impact:** 9KB × every visitor = unnecessary bandwidth waste
- **Fix:** Remove `cache: 'no-store'` or use `cache: 'force-cache'`

### 🟡 Optimization Opportunities

1. **Responsive Images (srcset)**
   - Serve smaller images for grid cells (140px-300px)
   - Serve full resolution only for lightbox
   - **Potential savings:** 60-80% for grid images

2. **Image Compression**
   - Current JPGs could be optimized (quality 75-80 instead of 90+)
   - **Potential savings:** 30-50% with negligible quality loss

3. **Thumbnail Strategy**
   - Generate 200px wide thumbnails for grid
   - Keep full size for lightbox
   - **Potential savings:** 70-80% for grid browsing

4. **Cache Headers**
   - Set long cache times for images (1 day to 1 week)
   - Cache-bust with filename changes (already using unique filenames)
   - **Benefit:** Returning visitors load from cache

5. **Data Saver Mode**
   - Detect slow connections (navigator.connection.effectiveType)
   - Load lower quality or fewer images
   - **Benefit:** Better experience on mobile/2G

---

## Recommendations by Priority

### Priority 1: Immediate Fix (5 minutes)
```javascript
// In script.js, line ~10:
// Change from:
const res = await fetch('manifest.json', { cache: 'no-store' });
// To:
const res = await fetch('manifest.json');  // Default cache is fine
// Or for explicit caching:
const res = await fetch('manifest.json', { cache: 'force-cache' });
```
**Impact:** Saves ~9KB per visitor, improves load time

### Priority 2: Quick Wins (30 minutes)
1. **Optimize existing images** - Run through ImageMagick or similar:
   ```bash
   # Reduce quality to 80, strip metadata
   find docs/funny -name "*.jpg" -exec convert {} -quality 80 -strip {} \;
   ```
   **Estimated savings:** 30-40% = ~7-9MB total

2. **Add cache headers** - Create `.nojekyll` is already there, but GitHub Pages needs `_config.yml` for custom headers (not supported on free tier). Alternative: Use service worker for caching.

### Priority 3: Medium Effort (2-4 hours)
1. **Implement responsive images with srcset**
   - Generate 200px and 400px versions of each image
   - Use `<picture>` or `srcset` with `sizes` attribute
   - **Estimated savings:** 60-80% for grid browsing

2. **Thumbnail + Lightbox architecture**
   - Store thumbnails in `docs/funny/thumbs/`
   - Grid loads thumbnails, lightbox loads full size
   - Requires JavaScript changes and image processing

### Priority 4: Advanced (Future)
1. **Service Worker caching** - Cache images locally for offline viewing
2. **Lazy load intersection observer** - More control than native lazy loading
3. **Progressive JPEGs** - Faster perceived load time
4. **WebP conversion** - 25-35% smaller than JPEG at same quality

---

## Traffic Scenarios

### Low Traffic (Current)
- 100 visitors/day × 5MB average = 500MB/day
- Monthly: 15GB (15% of limit)
- **Status:** ✅ Safe

### Medium Traffic
- 500 visitors/day × 5MB average = 2.5GB/day
- Monthly: 75GB (75% of limit)
- **Status:** ✅ Safe with room

### High Traffic (Viral)
- 2,000 visitors/day × 5MB average = 10GB/day
- Monthly: 300GB (300% of limit - EXCEEDS)
- **Status:** ⚠️ Would hit limit in ~10 days
- **Mitigation:** Implement Priority 1-3 optimizations

### Worst Case (All images loaded)
- 10,000 visitors × 23MB = 230GB
- **Status:** ❌ Would exhaust limit immediately
- **Note:** Unlikely due to lazy loading, but possible with aggressive prefetching

---

## Monitoring Recommendations
1. **GitHub Pages traffic analytics** - Not available on free tier
2. **Third-party analytics** - Add lightweight tracking (e.g., Google Analytics, Plausible)
3. **Bandwidth alerts** - Set up notifications when approaching 80% of limit
4. **Image count monitoring** - Track growth: 90 now, but could grow to 1000+

---

## Projection at Scale
| Image Count | Total Size | Full Browses/Month | Partial (10 img) Sessions/Month |
|-------------|------------|-------------------|-------------------------------|
| 90 | 23MB | 4,347 | 40,000 |
| 200 | 52MB | 1,923 | 36,000 |
| 500 | 130MB | 769 | 28,000 |
| 1,000 | 260MB | 384 | 24,000 |

**Conclusion:** At current scale (90 images), bandwidth is not a concern for typical traffic. However, implementing Priority 1 (cache fix) and Priority 2 (image optimization) would provide significant headroom for growth and improve user experience, especially on mobile.
