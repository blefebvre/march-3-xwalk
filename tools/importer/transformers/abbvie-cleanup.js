/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: AbbVie cleanup. Selectors from captured DOM of https://www.abbvie.com/
 * beforeTransform: Isolates #maincontent (removes nav, footer, overlays, cookie banners)
 *                  and strips non-authorable UI elements (hidden heroes, video controls).
 * afterTransform: Removes remaining non-content artifacts (tracking pixels, separators,
 *                 empty search states, data attributes).
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // 1. Isolate #maincontent — remove all page chrome (header/nav, footer, overlays, modals)
    //    #maincontent may be nested (not a direct child of body), so we:
    //    a) save its children, b) clear body entirely, c) re-append the saved children.
    const mainContent = element.querySelector('#maincontent');
    if (mainContent) {
      const saved = [];
      while (mainContent.firstChild) {
        saved.push(mainContent.firstChild);
        mainContent.removeChild(mainContent.firstChild);
      }
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
      saved.forEach((node) => element.appendChild(node));
    }

    // 2. Remove cookie consent / privacy overlays (may be injected inside #maincontent by JS)
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '#onetrust-banner-sdk',
      '.onetrust-pc-dark-filter',
      '[class*="optanon"]',
      '[id*="onetrust"]',
    ]);

    // 3. Remove hidden hero alternatives (not visible, not authorable)
    WebImporter.DOMUtils.remove(element, [
      '.cmp-home-hero__alternative.hide',
      '.cmp-video__text-content-outside.hide',
    ]);

    // 4. Remove Brightcove video player UI controls (not authorable)
    WebImporter.DOMUtils.remove(element, [
      '.vjs-control-bar',
      '.vjs-error-display',
      '.vjs-modal-dialog',
      '.vjs-loading-spinner',
      '.vjs-big-play-button',
      '.vjs-text-track-display',
      '.vjs-poster',
      '.vjs-dock-text',
      '.vjs-dock-shelf',
      '.vjs-player-info-modal',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // 1. Remove structural separators and non-content tags
    WebImporter.DOMUtils.remove(element, [
      '.separator',
      'noscript',
      'link',
      'iframe',
    ]);

    // 2. Remove tracking/analytics pixel images
    element.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute('src') || '';
      if (
        src.includes('t.co/')
        || src.includes('analytics.twitter.com')
        || src.includes('cdn.cookielaw.org')
        || src.includes('demdex.net')
        || src.includes('facebook.com/tr')
        || src.includes('doubleclick.net')
        || src.includes('google-analytics.com')
        || src.includes('googletagmanager.com')
      ) {
        const parent = img.parentElement;
        img.remove();
        if (parent && parent.tagName === 'P' && !parent.textContent.trim() && !parent.querySelector('*')) {
          parent.remove();
        }
      }
    });

    // 3. Remove "No results found" search empty-state messages
    element.querySelectorAll('p').forEach((p) => {
      const text = p.textContent.trim();
      if (text.startsWith('No results found')) {
        p.remove();
      }
    });

    // 4. Remove tracking and data-layer attributes
    element.querySelectorAll('[data-cmp-data-layer]').forEach((el) => {
      el.removeAttribute('data-cmp-data-layer');
    });
    element.querySelectorAll('[data-cmp-clickable]').forEach((el) => {
      el.removeAttribute('data-cmp-clickable');
    });
    element.querySelectorAll('[data-warn-on-departure]').forEach((el) => {
      el.removeAttribute('data-warn-on-departure');
    });
  }
}
