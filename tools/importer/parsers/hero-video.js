/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-video. Base: hero. Source: https://www.abbvie.com/. Generated: 2026-03-04
 * Model fields: image (reference), imageAlt (collapsed), text (richtext)
 */
export default function parse(element, { document }) {
  // Extract from the active primary hero
  const primary = element.querySelector('.cmp-home-hero__primary.active') || element.querySelector('.cmp-home-hero__primary') || element;

  // Extract background image
  const bgImage = primary.querySelector('.cmp-container__bg-image');

  // Extract heading
  const heading = primary.querySelector('.cmp-title__text');

  // Extract CTA link
  const ctaLink = primary.querySelector('.cmp-text a');

  // Row 1: Background image with field hint
  const imageFrag = document.createDocumentFragment();
  imageFrag.appendChild(document.createComment(' field:image '));
  if (bgImage) {
    const img = document.createElement('img');
    img.src = bgImage.src || bgImage.getAttribute('src') || '';
    img.alt = bgImage.alt || bgImage.getAttribute('alt') || '';
    imageFrag.appendChild(img);
  }

  // Row 2: Text content (heading + CTA) with field hint
  const textFrag = document.createDocumentFragment();
  textFrag.appendChild(document.createComment(' field:text '));
  if (heading) {
    const h1 = document.createElement('h1');
    h1.textContent = heading.textContent.trim();
    textFrag.appendChild(h1);
  }
  if (ctaLink) {
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.href = ctaLink.href || ctaLink.getAttribute('href') || '';
    a.textContent = ctaLink.textContent.trim();
    p.appendChild(a);
    textFrag.appendChild(p);
  }

  const cells = [
    [imageFrag],
    [textFrag],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-video', cells });
  element.replaceWith(block);
}
