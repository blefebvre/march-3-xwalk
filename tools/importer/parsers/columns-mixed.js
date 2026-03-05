/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-mixed. Base: columns. Source: https://www.abbvie.com/. Generated: 2026-03-04
 * Columns block - NO field hints required.
 * Instance 1: .cardpagestory.card-dashboard.show-image-hide-desc (within grid)
 * Instance 2: #container-3a42f76c63 .grid.cmp-grid-custom (grid element)
 */
export default function parse(element, { document }) {
  // Determine if element is a grid or a child within a grid
  let gridRow;

  if (element.classList.contains('grid') || element.querySelector('.grid-row')) {
    // Element is the grid itself
    gridRow = element.querySelector('.grid-row');
  } else {
    // Element is a child (e.g., cardpagestory) - find parent grid row
    gridRow = element.closest('.grid-row');
  }

  const cells = [];

  if (gridRow) {
    // Extract content from each grid cell
    const gridCells = gridRow.querySelectorAll(':scope > .grid-cell, :scope > [class*="grid-row__col"]');
    const rowContent = [];

    gridCells.forEach((cell) => {
      const cellFrag = document.createDocumentFragment();

      // Extract card content if present
      const card = cell.querySelector('.cardpagestory, .dashboardcards');
      if (card) {
        // Extract image
        const img = card.querySelector('img');
        if (img) {
          const imgEl = document.createElement('img');
          imgEl.src = img.src || img.getAttribute('src') || '';
          imgEl.alt = img.alt || img.getAttribute('alt') || '';
          cellFrag.appendChild(imgEl);
        }

        // Extract eyebrow/tag
        const eyebrow = card.querySelector('.card-eyebrow, .cmp-dashboardcard__eyebrow');
        if (eyebrow) {
          const p = document.createElement('p');
          const em = document.createElement('em');
          em.textContent = eyebrow.textContent.trim();
          p.appendChild(em);
          cellFrag.appendChild(p);
        }

        // Extract title
        const title = card.querySelector('.card-title, .cmp-dashboardcard__title, h3, h4');
        if (title) {
          const h = document.createElement('h4');
          h.textContent = title.textContent.trim();
          cellFrag.appendChild(h);
        }

        // Extract description
        const desc = card.querySelector('.card-description, .cmp-dashboardcard__description, p:not(.card-title)');
        if (desc && desc !== title) {
          const p = document.createElement('p');
          p.textContent = desc.textContent.trim();
          cellFrag.appendChild(p);
        }

        // Extract CTA
        const cta = card.querySelector('a');
        if (cta) {
          const p = document.createElement('p');
          const a = document.createElement('a');
          a.href = cta.href || cta.getAttribute('href') || '';
          const ctaText = card.querySelector('.card-cta, .cmp-dashboardcard__cta');
          a.textContent = ctaText ? ctaText.textContent.trim() : cta.textContent.trim();
          p.appendChild(a);
          cellFrag.appendChild(p);
        }
      } else {
        // Generic content extraction for non-card cells
        const headings = cell.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach((h) => {
          const heading = document.createElement(h.tagName.toLowerCase());
          heading.textContent = h.textContent.trim();
          cellFrag.appendChild(heading);
        });

        const paragraphs = cell.querySelectorAll('p');
        paragraphs.forEach((p) => {
          if (p.textContent.trim()) {
            const para = document.createElement('p');
            para.textContent = p.textContent.trim();
            cellFrag.appendChild(para);
          }
        });

        const links = cell.querySelectorAll('a');
        links.forEach((link) => {
          if (!cellFrag.querySelector(`a[href="${link.getAttribute('href')}"]`)) {
            const p = document.createElement('p');
            const a = document.createElement('a');
            a.href = link.href || link.getAttribute('href') || '';
            a.textContent = link.textContent.trim();
            p.appendChild(a);
            cellFrag.appendChild(p);
          }
        });

        const images = cell.querySelectorAll('img');
        images.forEach((img) => {
          const imgEl = document.createElement('img');
          imgEl.src = img.src || img.getAttribute('src') || '';
          imgEl.alt = img.alt || img.getAttribute('alt') || '';
          cellFrag.appendChild(imgEl);
        });
      }

      rowContent.push(cellFrag);
    });

    if (rowContent.length > 0) {
      cells.push(rowContent);
    }
  } else {
    // Fallback: treat element as a single column
    const cellFrag = document.createDocumentFragment();
    const clone = element.cloneNode(true);
    cellFrag.appendChild(clone);
    cells.push([cellFrag]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-mixed', cells });
  element.replaceWith(block);
}
