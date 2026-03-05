/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-spotlight. Base: hero. Source: https://www.abbvie.com/. Generated: 2026-03-04
 * Model fields: image (reference), imageAlt (collapsed), text (richtext)
 */
export default function parse(element, { document }) {
  // Extract poster/thumbnail image
  const img = element.querySelector('.cmp-image__image')
    || element.querySelector('.cmp-video__image img')
    || element.querySelector('img');

  // Extract heading from the video text overlay
  const headingEl = element.querySelector('.cmp-video__text-content [role="heading"]')
    || element.querySelector('.cmp-video__text-content h2, .cmp-video__text-content h3');

  // Extract description
  const descEl = element.querySelector('.cmp-video__text-content p');

  // Extract CTA button
  const ctaBtn = element.querySelector('.cmp-video__text-content button');

  // Row 1: Image with field hint
  const imageFrag = document.createDocumentFragment();
  imageFrag.appendChild(document.createComment(' field:image '));
  if (img) {
    const imgEl = document.createElement('img');
    imgEl.src = img.src || img.getAttribute('src') || '';
    imgEl.alt = img.alt || img.getAttribute('alt') || '';
    imageFrag.appendChild(imgEl);
  }

  // Row 2: Text content (heading + description + CTA) with field hint
  const textFrag = document.createDocumentFragment();
  textFrag.appendChild(document.createComment(' field:text '));
  if (headingEl) {
    const h2 = document.createElement('h2');
    h2.textContent = headingEl.textContent.trim();
    textFrag.appendChild(h2);
  }
  if (descEl) {
    const p = document.createElement('p');
    p.textContent = descEl.textContent.trim();
    textFrag.appendChild(p);
  }
  if (ctaBtn) {
    const p = document.createElement('p');
    const span = ctaBtn.querySelector('span');
    p.textContent = span ? span.textContent.trim() : ctaBtn.textContent.trim();
    textFrag.appendChild(p);
  }

  const cells = [
    [imageFrag],
    [textFrag],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-spotlight', cells });
  element.replaceWith(block);
}
