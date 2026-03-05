/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: AbbVie section breaks and section-metadata.
 * Processes sections from payload.template.sections.
 * Adds <hr> between sections and section-metadata blocks for styled sections.
 * Runs in afterTransform only.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { template } = payload;
    if (!template || !template.sections || template.sections.length < 2) return;

    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document: element.getRootNode() };

    // Process sections in reverse order to avoid position shifts
    const sections = [...template.sections].reverse();

    sections.forEach((section) => {
      // Find the first element matching the section selector
      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
      let sectionEl = null;
      for (const sel of selectors) {
        sectionEl = element.querySelector(sel);
        if (sectionEl) break;
      }

      if (!sectionEl) return;

      // Add section-metadata block if section has a style
      if (section.style) {
        const metaBlock = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        // Insert section-metadata after the last element of this section
        sectionEl.after(metaBlock);
      }

      // Add <hr> before this section (except the first section)
      if (section.id !== template.sections[0].id) {
        const hr = document.createElement('hr');
        // Insert hr before the section element
        if (sectionEl.previousElementSibling) {
          sectionEl.before(hr);
        } else if (sectionEl.parentElement) {
          sectionEl.before(hr);
        }
      }
    });
  }
}
