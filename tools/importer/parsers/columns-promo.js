/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-promo. Base: columns. Source: https://www.abbvie.com/. Generated: 2026-03-04
 * Columns block - NO field hints required.
 * Section 6: Persistence Lab Podcast - 2 column grid with image and text/CTA
 * Selector: #container-c63c87a46c .grid
 */
export default function parse(element, { document }) {
  const gridRow = element.querySelector('.grid-row') || element;
  const gridCells = gridRow.querySelectorAll(':scope > .grid-cell, :scope > [class*="grid-row__col"]');

  const cells = [];
  const rowContent = [];

  gridCells.forEach((cell) => {
    const cellFrag = document.createDocumentFragment();

    // Extract images
    const images = cell.querySelectorAll('img');
    images.forEach((img) => {
      const imgEl = document.createElement('img');
      imgEl.src = img.src || img.getAttribute('src') || '';
      imgEl.alt = img.alt || img.getAttribute('alt') || '';
      cellFrag.appendChild(imgEl);
    });

    // Extract headings
    const headings = cell.querySelectorAll('.cmp-title__text, h1, h2, h3, h4, h5, h6');
    headings.forEach((h) => {
      const heading = document.createElement(h.tagName === 'SPAN' ? 'h2' : h.tagName.toLowerCase());
      heading.textContent = h.textContent.trim();
      cellFrag.appendChild(heading);
    });

    // Extract text content
    const texts = cell.querySelectorAll('.cmp-text p, .cmp-text');
    texts.forEach((t) => {
      const textContent = t.textContent.trim();
      if (textContent && t.tagName === 'P') {
        const p = document.createElement('p');
        p.textContent = textContent;
        cellFrag.appendChild(p);
      }
    });

    // Extract CTAs/buttons
    const buttons = cell.querySelectorAll('.cmp-button, a.cmp-button__link, a[class*="button"]');
    buttons.forEach((btn) => {
      const link = btn.closest('a') || btn.querySelector('a') || btn;
      if (link.tagName === 'A' || link.href) {
        const p = document.createElement('p');
        const a = document.createElement('a');
        a.href = link.href || link.getAttribute('href') || '';
        const btnText = link.querySelector('.cmp-button__text') || link;
        a.textContent = btnText.textContent.trim();
        p.appendChild(a);
        cellFrag.appendChild(p);
      }
    });

    // Extract generic links not already captured
    const links = cell.querySelectorAll('a:not([class*="button"])');
    links.forEach((link) => {
      const href = link.href || link.getAttribute('href') || '';
      if (href && !cellFrag.querySelector(`a[href="${href}"]`)) {
        const p = document.createElement('p');
        const a = document.createElement('a');
        a.href = href;
        a.textContent = link.textContent.trim();
        p.appendChild(a);
        cellFrag.appendChild(p);
      }
    });

    rowContent.push(cellFrag);
  });

  if (rowContent.length > 0) {
    cells.push(rowContent);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-promo', cells });
  element.replaceWith(block);
}
