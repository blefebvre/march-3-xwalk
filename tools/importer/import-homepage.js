/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroVideoParser from './parsers/hero-video.js';
import carouselPressParser from './parsers/carousel-press.js';
import cardsFeaturedParser from './parsers/cards-featured.js';
import heroSpotlightParser from './parsers/hero-spotlight.js';
import columnsMixedParser from './parsers/columns-mixed.js';
import columnsPromoParser from './parsers/columns-promo.js';
import columnsFeatureParser from './parsers/columns-feature.js';
import columnsInfoParser from './parsers/columns-info.js';

// TRANSFORMER IMPORTS
import abbvieCleanupTransformer from './transformers/abbvie-cleanup.js';
import abbvieSectionsTransformer from './transformers/abbvie-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-video': heroVideoParser,
  'carousel-press': carouselPressParser,
  'cards-featured': cardsFeaturedParser,
  'hero-spotlight': heroSpotlightParser,
  'columns-mixed': columnsMixedParser,
  'columns-promo': columnsPromoParser,
  'columns-feature': columnsFeatureParser,
  'columns-info': columnsInfoParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  abbvieCleanupTransformer,
  abbvieSectionsTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'AbbVie corporate homepage with hero, featured content, and promotional sections',
  urls: [
    'https://www.abbvie.com/'
  ],
  blocks: [
    {
      name: 'hero-video',
      instances: ['.homepage-hero-controller']
    },
    {
      name: 'carousel-press',
      instances: ['.carousel.cmp-carousel--rss']
    },
    {
      name: 'cards-featured',
      instances: ['.homepage-overlap .cardpagestory.card-standard']
    },
    {
      name: 'hero-spotlight',
      instances: ['.video.cmp-video-xx-large']
    },
    {
      name: 'columns-mixed',
      instances: [
        '.cardpagestory.card-dashboard.show-image-hide-desc',
        '#container-3a42f76c63 .grid.cmp-grid-custom'
      ]
    },
    {
      name: 'columns-promo',
      instances: ['#container-c63c87a46c .grid']
    },
    {
      name: 'columns-feature',
      instances: ['#section02 ~ .grid.cmp-grid-custom.no-bottom-margin']
    },
    {
      name: 'columns-info',
      instances: ['#section03 ~ .grid']
    }
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero',
      selector: '.homepage-hero-controller',
      style: null,
      blocks: ['hero-video'],
      defaultContent: []
    },
    {
      id: 'section-2',
      name: 'Press Releases and Featured',
      selector: '.container.abbvie-container.homepage-overlap',
      style: null,
      blocks: ['carousel-press', 'cards-featured'],
      defaultContent: []
    },
    {
      id: 'section-3',
      name: 'Patients',
      selector: '#section01',
      style: null,
      blocks: [],
      defaultContent: ['#section01 .cmp-teaser__title', '#section01 .cmp-teaser__description', '#section01 .cmp-teaser__action-link']
    },
    {
      id: 'section-4',
      name: 'Video Highlight',
      selector: '.video.cmp-video-xx-large',
      style: null,
      blocks: ['hero-spotlight'],
      defaultContent: []
    },
    {
      id: 'section-5',
      name: 'Science and Innovation',
      selector: ['#teaser-a2987e48b8', '.cardpagestory.card-dashboard.show-image-hide-desc'],
      style: null,
      blocks: ['columns-mixed'],
      defaultContent: ['#teaser-a2987e48b8 .cmp-teaser__pretitle', '#teaser-a2987e48b8 .cmp-teaser__title', '#teaser-a2987e48b8 .cmp-teaser__description']
    },
    {
      id: 'section-6',
      name: 'Persistence Lab Podcast',
      selector: '.container.abbvie-container.default-radius.cmp-container-xxx-large',
      style: 'dark',
      blocks: ['columns-promo'],
      defaultContent: []
    },
    {
      id: 'section-7',
      name: 'Culture of Curiosity',
      selector: ['#section02', '#section02 ~ .grid.cmp-grid-custom.no-bottom-margin'],
      style: null,
      blocks: ['columns-feature'],
      defaultContent: ['#section02 .cmp-teaser__pretitle', '#section02 .cmp-teaser__title', '#section02 .cmp-teaser__description']
    },
    {
      id: 'section-8',
      name: 'Explore Opportunities CTA',
      selector: '.container.abbvie-container.medium-radius.cmp-container-xxx-large.height-short',
      style: 'accent',
      blocks: [],
      defaultContent: [
        '.container.abbvie-container.medium-radius.cmp-container-xxx-large.height-short .cmp-title__text',
        '.container.abbvie-container.medium-radius.cmp-container-xxx-large.height-short .cmp-text',
        '.container.abbvie-container.medium-radius.cmp-container-xxx-large.height-short .cmp-button'
      ]
    },
    {
      id: 'section-9',
      name: 'Investor Resources',
      selector: ['#section03', '#section03 ~ .grid'],
      style: null,
      blocks: ['columns-info'],
      defaultContent: ['#section03 .cmp-teaser__pretitle', '#section03 .cmp-teaser__title', '#section03 .cmp-teaser__description']
    },
    {
      id: 'section-10',
      name: 'ESG',
      selector: ['#section04', '.container.abbvie-container.large-radius.cmp-container-full-width.height-default.no-bottom-margin'],
      style: null,
      blocks: ['columns-mixed'],
      defaultContent: ['#section04 .cmp-teaser__pretitle', '#section04 .cmp-teaser__title', '#section04 .cmp-teaser__description']
    }
  ]
};

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
