/* eslint-disable */
/* global WebImporter */
/**
 * Parser for carousel-press. Base: carousel. Source: https://www.abbvie.com/. Generated: 2026-03-04
 * Container block with item type: carousel-press-item
 * Item model fields: media_image (reference), media_imageAlt (collapsed), content_text (richtext)
 */
export default function parse(element, { document }) {
  // Find all carousel slides
  const slides = element.querySelectorAll('.splide__slide');

  const cells = [];
  slides.forEach((slide) => {
    // media_image cell - carousel-press slides are text-only (RSS feed), no images
    const imageFrag = document.createDocumentFragment();

    // content_text cell - extract date eyebrow, title, and link
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:content_text '));

    const link = slide.querySelector('.carousel-rss__link, a');
    const eyebrow = slide.querySelector('.carousel-rss__eyebrow');
    const title = slide.querySelector('.carousel-rss__title');

    if (link) {
      const a = document.createElement('a');
      a.href = link.href || link.getAttribute('href') || '';
      a.target = link.target || '_blank';

      const content = document.createDocumentFragment();
      if (eyebrow) {
        const em = document.createElement('em');
        em.textContent = eyebrow.textContent.trim();
        content.appendChild(em);
        content.appendChild(document.createElement('br'));
      }
      if (title) {
        const strong = document.createElement('strong');
        strong.textContent = title.textContent.trim();
        content.appendChild(strong);
      }
      a.appendChild(content);
      textFrag.appendChild(a);
    }

    cells.push([imageFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-press', cells });
  element.replaceWith(block);
}
