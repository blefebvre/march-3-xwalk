/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-featured. Base: cards. Source: https://www.abbvie.com/. Generated: 2026-03-04
 * Container block with item type: card
 * Item model fields: image (reference), text (richtext)
 */
export default function parse(element, { document }) {
  // The element is a single .cardpagestory.card-standard
  // Extract card data and produce one row per card
  const cells = [];

  // Get the card link for href
  const cardLink = element.querySelector('a');

  // Image cell
  const imageFrag = document.createDocumentFragment();
  imageFrag.appendChild(document.createComment(' field:image '));
  const cardImg = element.querySelector('.card-image-container img, .card-image');
  if (cardImg) {
    const img = document.createElement('img');
    img.src = cardImg.src || cardImg.getAttribute('src') || '';
    img.alt = cardImg.alt || cardImg.getAttribute('alt') || '';
    imageFrag.appendChild(img);
  }

  // Text cell - combine metadata, title, description, CTA
  const textFrag = document.createDocumentFragment();
  textFrag.appendChild(document.createComment(' field:text '));

  const dateEl = element.querySelector('.card-metadata-date');
  const tagEl = element.querySelector('.card-metadata-tag');
  const titleEl = element.querySelector('.card-title');
  const descEl = element.querySelector('.card-description');
  const ctaEl = element.querySelector('.card-cta-read-article, .card-cta-standard span');

  if (dateEl) {
    const p = document.createElement('p');
    const em = document.createElement('em');
    em.textContent = dateEl.textContent.trim();
    p.appendChild(em);
    textFrag.appendChild(p);
  }
  if (tagEl) {
    const p = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = tagEl.textContent.trim();
    p.appendChild(strong);
    textFrag.appendChild(p);
  }
  if (titleEl) {
    const h4 = document.createElement('h4');
    h4.textContent = titleEl.textContent.trim();
    textFrag.appendChild(h4);
  }
  if (descEl) {
    const p = document.createElement('p');
    p.textContent = descEl.textContent.trim();
    textFrag.appendChild(p);
  }
  if (cardLink) {
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.href = cardLink.href || cardLink.getAttribute('href') || '';
    a.textContent = ctaEl ? ctaEl.textContent.trim() : 'Read more';
    p.appendChild(a);
    textFrag.appendChild(p);
  }

  cells.push([imageFrag, textFrag]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-featured', cells });
  element.replaceWith(block);
}
