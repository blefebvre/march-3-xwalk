/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-feature. Base: columns. Source: https://www.abbvie.com/. Generated: 2026-03-04
 * Columns block - NO field hints required.
 * Section 7: Culture of Curiosity - 3 equal columns grid
 * Selector: #section02 ~ .grid.cmp-grid-custom.no-bottom-margin
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
      const tag = h.tagName === 'SPAN' ? 'h3' : h.tagName.toLowerCase();
      const heading = document.createElement(tag);
      heading.textContent = h.textContent.trim();
      cellFrag.appendChild(heading);
    });

    // Extract text
    const texts = cell.querySelectorAll('.cmp-text p');
    texts.forEach((t) => {
      if (t.textContent.trim()) {
        const p = document.createElement('p');
        p.textContent = t.textContent.trim();
        cellFrag.appendChild(p);
      }
    });

    // Extract links/CTAs
    const links = cell.querySelectorAll('a');
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

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-feature', cells });
  element.replaceWith(block);
}
