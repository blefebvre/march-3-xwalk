var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-video.js
  function parse(element, { document }) {
    const primary = element.querySelector(".cmp-home-hero__primary.active") || element.querySelector(".cmp-home-hero__primary") || element;
    const bgImage = primary.querySelector(".cmp-container__bg-image");
    const heading = primary.querySelector(".cmp-title__text");
    const ctaLink = primary.querySelector(".cmp-text a");
    const imageFrag = document.createDocumentFragment();
    imageFrag.appendChild(document.createComment(" field:image "));
    if (bgImage) {
      const img = document.createElement("img");
      img.src = bgImage.src || bgImage.getAttribute("src") || "";
      img.alt = bgImage.alt || bgImage.getAttribute("alt") || "";
      imageFrag.appendChild(img);
    }
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(" field:text "));
    if (heading) {
      const h1 = document.createElement("h1");
      h1.textContent = heading.textContent.trim();
      textFrag.appendChild(h1);
    }
    if (ctaLink) {
      const p = document.createElement("p");
      const a = document.createElement("a");
      a.href = ctaLink.href || ctaLink.getAttribute("href") || "";
      a.textContent = ctaLink.textContent.trim();
      p.appendChild(a);
      textFrag.appendChild(p);
    }
    const cells = [
      [imageFrag],
      [textFrag]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-video", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-press.js
  function parse2(element, { document }) {
    const slides = element.querySelectorAll(".splide__slide");
    const cells = [];
    slides.forEach((slide) => {
      const imageFrag = document.createDocumentFragment();
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:content_text "));
      const link = slide.querySelector(".carousel-rss__link, a");
      const eyebrow = slide.querySelector(".carousel-rss__eyebrow");
      const title = slide.querySelector(".carousel-rss__title");
      if (link) {
        const a = document.createElement("a");
        a.href = link.href || link.getAttribute("href") || "";
        a.target = link.target || "_blank";
        const content = document.createDocumentFragment();
        if (eyebrow) {
          const em = document.createElement("em");
          em.textContent = eyebrow.textContent.trim();
          content.appendChild(em);
          content.appendChild(document.createElement("br"));
        }
        if (title) {
          const strong = document.createElement("strong");
          strong.textContent = title.textContent.trim();
          content.appendChild(strong);
        }
        a.appendChild(content);
        textFrag.appendChild(a);
      }
      cells.push([imageFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-press", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-featured.js
  function parse3(element, { document }) {
    const cells = [];
    const cardLink = element.querySelector("a");
    const imageFrag = document.createDocumentFragment();
    imageFrag.appendChild(document.createComment(" field:image "));
    const cardImg = element.querySelector(".card-image-container img, .card-image");
    if (cardImg) {
      const img = document.createElement("img");
      img.src = cardImg.src || cardImg.getAttribute("src") || "";
      img.alt = cardImg.alt || cardImg.getAttribute("alt") || "";
      imageFrag.appendChild(img);
    }
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(" field:text "));
    const dateEl = element.querySelector(".card-metadata-date");
    const tagEl = element.querySelector(".card-metadata-tag");
    const titleEl = element.querySelector(".card-title");
    const descEl = element.querySelector(".card-description");
    const ctaEl = element.querySelector(".card-cta-read-article, .card-cta-standard span");
    if (dateEl) {
      const p = document.createElement("p");
      const em = document.createElement("em");
      em.textContent = dateEl.textContent.trim();
      p.appendChild(em);
      textFrag.appendChild(p);
    }
    if (tagEl) {
      const p = document.createElement("p");
      const strong = document.createElement("strong");
      strong.textContent = tagEl.textContent.trim();
      p.appendChild(strong);
      textFrag.appendChild(p);
    }
    if (titleEl) {
      const h4 = document.createElement("h4");
      h4.textContent = titleEl.textContent.trim();
      textFrag.appendChild(h4);
    }
    if (descEl) {
      const p = document.createElement("p");
      p.textContent = descEl.textContent.trim();
      textFrag.appendChild(p);
    }
    if (cardLink) {
      const p = document.createElement("p");
      const a = document.createElement("a");
      a.href = cardLink.href || cardLink.getAttribute("href") || "";
      a.textContent = ctaEl ? ctaEl.textContent.trim() : "Read more";
      p.appendChild(a);
      textFrag.appendChild(p);
    }
    cells.push([imageFrag, textFrag]);
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-featured", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-spotlight.js
  function parse4(element, { document }) {
    const img = element.querySelector(".cmp-image__image") || element.querySelector(".cmp-video__image img") || element.querySelector("img");
    const headingEl = element.querySelector('.cmp-video__text-content [role="heading"]') || element.querySelector(".cmp-video__text-content h2, .cmp-video__text-content h3");
    const descEl = element.querySelector(".cmp-video__text-content p");
    const ctaBtn = element.querySelector(".cmp-video__text-content button");
    const imageFrag = document.createDocumentFragment();
    imageFrag.appendChild(document.createComment(" field:image "));
    if (img) {
      const imgEl = document.createElement("img");
      imgEl.src = img.src || img.getAttribute("src") || "";
      imgEl.alt = img.alt || img.getAttribute("alt") || "";
      imageFrag.appendChild(imgEl);
    }
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(" field:text "));
    if (headingEl) {
      const h2 = document.createElement("h2");
      h2.textContent = headingEl.textContent.trim();
      textFrag.appendChild(h2);
    }
    if (descEl) {
      const p = document.createElement("p");
      p.textContent = descEl.textContent.trim();
      textFrag.appendChild(p);
    }
    if (ctaBtn) {
      const p = document.createElement("p");
      const span = ctaBtn.querySelector("span");
      p.textContent = span ? span.textContent.trim() : ctaBtn.textContent.trim();
      textFrag.appendChild(p);
    }
    const cells = [
      [imageFrag],
      [textFrag]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-spotlight", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-mixed.js
  function parse5(element, { document }) {
    let gridRow;
    if (element.classList.contains("grid") || element.querySelector(".grid-row")) {
      gridRow = element.querySelector(".grid-row");
    } else {
      gridRow = element.closest(".grid-row");
    }
    const cells = [];
    if (gridRow) {
      const gridCells = gridRow.querySelectorAll(':scope > .grid-cell, :scope > [class*="grid-row__col"]');
      const rowContent = [];
      gridCells.forEach((cell) => {
        const cellFrag = document.createDocumentFragment();
        const card = cell.querySelector(".cardpagestory, .dashboardcards");
        if (card) {
          const img = card.querySelector("img");
          if (img) {
            const imgEl = document.createElement("img");
            imgEl.src = img.src || img.getAttribute("src") || "";
            imgEl.alt = img.alt || img.getAttribute("alt") || "";
            cellFrag.appendChild(imgEl);
          }
          const eyebrow = card.querySelector(".card-eyebrow, .cmp-dashboardcard__eyebrow");
          if (eyebrow) {
            const p = document.createElement("p");
            const em = document.createElement("em");
            em.textContent = eyebrow.textContent.trim();
            p.appendChild(em);
            cellFrag.appendChild(p);
          }
          const title = card.querySelector(".card-title, .cmp-dashboardcard__title, h3, h4");
          if (title) {
            const h = document.createElement("h4");
            h.textContent = title.textContent.trim();
            cellFrag.appendChild(h);
          }
          const desc = card.querySelector(".card-description, .cmp-dashboardcard__description, p:not(.card-title)");
          if (desc && desc !== title) {
            const p = document.createElement("p");
            p.textContent = desc.textContent.trim();
            cellFrag.appendChild(p);
          }
          const cta = card.querySelector("a");
          if (cta) {
            const p = document.createElement("p");
            const a = document.createElement("a");
            a.href = cta.href || cta.getAttribute("href") || "";
            const ctaText = card.querySelector(".card-cta, .cmp-dashboardcard__cta");
            a.textContent = ctaText ? ctaText.textContent.trim() : cta.textContent.trim();
            p.appendChild(a);
            cellFrag.appendChild(p);
          }
        } else {
          const headings = cell.querySelectorAll("h1, h2, h3, h4, h5, h6");
          headings.forEach((h) => {
            const heading = document.createElement(h.tagName.toLowerCase());
            heading.textContent = h.textContent.trim();
            cellFrag.appendChild(heading);
          });
          const paragraphs = cell.querySelectorAll("p");
          paragraphs.forEach((p) => {
            if (p.textContent.trim()) {
              const para = document.createElement("p");
              para.textContent = p.textContent.trim();
              cellFrag.appendChild(para);
            }
          });
          const links = cell.querySelectorAll("a");
          links.forEach((link) => {
            if (!cellFrag.querySelector(`a[href="${link.getAttribute("href")}"]`)) {
              const p = document.createElement("p");
              const a = document.createElement("a");
              a.href = link.href || link.getAttribute("href") || "";
              a.textContent = link.textContent.trim();
              p.appendChild(a);
              cellFrag.appendChild(p);
            }
          });
          const images = cell.querySelectorAll("img");
          images.forEach((img) => {
            const imgEl = document.createElement("img");
            imgEl.src = img.src || img.getAttribute("src") || "";
            imgEl.alt = img.alt || img.getAttribute("alt") || "";
            cellFrag.appendChild(imgEl);
          });
        }
        rowContent.push(cellFrag);
      });
      if (rowContent.length > 0) {
        cells.push(rowContent);
      }
    } else {
      const cellFrag = document.createDocumentFragment();
      const clone = element.cloneNode(true);
      cellFrag.appendChild(clone);
      cells.push([cellFrag]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-mixed", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-promo.js
  function parse6(element, { document }) {
    const gridRow = element.querySelector(".grid-row") || element;
    const gridCells = gridRow.querySelectorAll(':scope > .grid-cell, :scope > [class*="grid-row__col"]');
    const cells = [];
    const rowContent = [];
    gridCells.forEach((cell) => {
      const cellFrag = document.createDocumentFragment();
      const images = cell.querySelectorAll("img");
      images.forEach((img) => {
        const imgEl = document.createElement("img");
        imgEl.src = img.src || img.getAttribute("src") || "";
        imgEl.alt = img.alt || img.getAttribute("alt") || "";
        cellFrag.appendChild(imgEl);
      });
      const headings = cell.querySelectorAll(".cmp-title__text, h1, h2, h3, h4, h5, h6");
      headings.forEach((h) => {
        const heading = document.createElement(h.tagName === "SPAN" ? "h2" : h.tagName.toLowerCase());
        heading.textContent = h.textContent.trim();
        cellFrag.appendChild(heading);
      });
      const texts = cell.querySelectorAll(".cmp-text p, .cmp-text");
      texts.forEach((t) => {
        const textContent = t.textContent.trim();
        if (textContent && t.tagName === "P") {
          const p = document.createElement("p");
          p.textContent = textContent;
          cellFrag.appendChild(p);
        }
      });
      const buttons = cell.querySelectorAll('.cmp-button, a.cmp-button__link, a[class*="button"]');
      buttons.forEach((btn) => {
        const link = btn.closest("a") || btn.querySelector("a") || btn;
        if (link.tagName === "A" || link.href) {
          const p = document.createElement("p");
          const a = document.createElement("a");
          a.href = link.href || link.getAttribute("href") || "";
          const btnText = link.querySelector(".cmp-button__text") || link;
          a.textContent = btnText.textContent.trim();
          p.appendChild(a);
          cellFrag.appendChild(p);
        }
      });
      const links = cell.querySelectorAll('a:not([class*="button"])');
      links.forEach((link) => {
        const href = link.href || link.getAttribute("href") || "";
        if (href && !cellFrag.querySelector(`a[href="${href}"]`)) {
          const p = document.createElement("p");
          const a = document.createElement("a");
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
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-promo", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-feature.js
  function parse7(element, { document }) {
    const gridRow = element.querySelector(".grid-row") || element;
    const gridCells = gridRow.querySelectorAll(':scope > .grid-cell, :scope > [class*="grid-row__col"]');
    const cells = [];
    const rowContent = [];
    gridCells.forEach((cell) => {
      const cellFrag = document.createDocumentFragment();
      const images = cell.querySelectorAll("img");
      images.forEach((img) => {
        const imgEl = document.createElement("img");
        imgEl.src = img.src || img.getAttribute("src") || "";
        imgEl.alt = img.alt || img.getAttribute("alt") || "";
        cellFrag.appendChild(imgEl);
      });
      const headings = cell.querySelectorAll(".cmp-title__text, h1, h2, h3, h4, h5, h6");
      headings.forEach((h) => {
        const tag = h.tagName === "SPAN" ? "h3" : h.tagName.toLowerCase();
        const heading = document.createElement(tag);
        heading.textContent = h.textContent.trim();
        cellFrag.appendChild(heading);
      });
      const texts = cell.querySelectorAll(".cmp-text p");
      texts.forEach((t) => {
        if (t.textContent.trim()) {
          const p = document.createElement("p");
          p.textContent = t.textContent.trim();
          cellFrag.appendChild(p);
        }
      });
      const links = cell.querySelectorAll("a");
      links.forEach((link) => {
        const href = link.href || link.getAttribute("href") || "";
        if (href && !cellFrag.querySelector(`a[href="${href}"]`)) {
          const p = document.createElement("p");
          const a = document.createElement("a");
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
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-info.js
  function parse8(element, { document }) {
    const gridRow = element.querySelector(".grid-row") || element;
    const gridCells = gridRow.querySelectorAll(':scope > .grid-cell, :scope > [class*="grid-row__col"]');
    const cells = [];
    const rowContent = [];
    gridCells.forEach((cell) => {
      const cellFrag = document.createDocumentFragment();
      const images = cell.querySelectorAll("img");
      images.forEach((img) => {
        const imgEl = document.createElement("img");
        imgEl.src = img.src || img.getAttribute("src") || "";
        imgEl.alt = img.alt || img.getAttribute("alt") || "";
        cellFrag.appendChild(imgEl);
      });
      const headings = cell.querySelectorAll(".cmp-title__text, h1, h2, h3, h4, h5, h6");
      headings.forEach((h) => {
        const tag = h.tagName === "SPAN" ? "h3" : h.tagName.toLowerCase();
        const heading = document.createElement(tag);
        heading.textContent = h.textContent.trim();
        cellFrag.appendChild(heading);
      });
      const texts = cell.querySelectorAll(".cmp-text p");
      texts.forEach((t) => {
        if (t.textContent.trim()) {
          const p = document.createElement("p");
          p.textContent = t.textContent.trim();
          cellFrag.appendChild(p);
        }
      });
      const ctaButtons = cell.querySelectorAll('.cmp-button, a[class*="button"]');
      ctaButtons.forEach((btn) => {
        const link = btn.closest("a") || btn.querySelector("a") || btn;
        if (link.tagName === "A" || link.href) {
          const p = document.createElement("p");
          const a = document.createElement("a");
          a.href = link.href || link.getAttribute("href") || "";
          const btnText = link.querySelector(".cmp-button__text") || link;
          a.textContent = btnText.textContent.trim();
          p.appendChild(a);
          cellFrag.appendChild(p);
        }
      });
      const links = cell.querySelectorAll('a:not([class*="button"])');
      links.forEach((link) => {
        const href = link.href || link.getAttribute("href") || "";
        if (href && !cellFrag.querySelector(`a[href="${href}"]`)) {
          const p = document.createElement("p");
          const a = document.createElement("a");
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
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-info", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/abbvie-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      const mainContent = element.querySelector("#maincontent");
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
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        "#onetrust-banner-sdk",
        ".onetrust-pc-dark-filter",
        '[class*="optanon"]',
        '[id*="onetrust"]'
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".cmp-home-hero__alternative.hide",
        ".cmp-video__text-content-outside.hide"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".vjs-control-bar",
        ".vjs-error-display",
        ".vjs-modal-dialog",
        ".vjs-loading-spinner",
        ".vjs-big-play-button",
        ".vjs-text-track-display",
        ".vjs-poster",
        ".vjs-dock-text",
        ".vjs-dock-shelf",
        ".vjs-player-info-modal"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".separator",
        "noscript",
        "link",
        "iframe"
      ]);
      element.querySelectorAll("img").forEach((img) => {
        const src = img.getAttribute("src") || "";
        if (src.includes("t.co/") || src.includes("analytics.twitter.com") || src.includes("cdn.cookielaw.org") || src.includes("demdex.net") || src.includes("facebook.com/tr") || src.includes("doubleclick.net") || src.includes("google-analytics.com") || src.includes("googletagmanager.com")) {
          const parent = img.parentElement;
          img.remove();
          if (parent && parent.tagName === "P" && !parent.textContent.trim() && !parent.querySelector("*")) {
            parent.remove();
          }
        }
      });
      element.querySelectorAll("p").forEach((p) => {
        const text = p.textContent.trim();
        if (text.startsWith("No results found")) {
          p.remove();
        }
      });
      element.querySelectorAll("[data-cmp-data-layer]").forEach((el) => {
        el.removeAttribute("data-cmp-data-layer");
      });
      element.querySelectorAll("[data-cmp-clickable]").forEach((el) => {
        el.removeAttribute("data-cmp-clickable");
      });
      element.querySelectorAll("[data-warn-on-departure]").forEach((el) => {
        el.removeAttribute("data-warn-on-departure");
      });
    }
  }

  // tools/importer/transformers/abbvie-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document: element.getRootNode() };
      const sections = [...template.sections].reverse();
      sections.forEach((section) => {
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) return;
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(metaBlock);
        }
        if (section.id !== template.sections[0].id) {
          const hr = document.createElement("hr");
          if (sectionEl.previousElementSibling) {
            sectionEl.before(hr);
          } else if (sectionEl.parentElement) {
            sectionEl.before(hr);
          }
        }
      });
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-video": parse,
    "carousel-press": parse2,
    "cards-featured": parse3,
    "hero-spotlight": parse4,
    "columns-mixed": parse5,
    "columns-promo": parse6,
    "columns-feature": parse7,
    "columns-info": parse8
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "AbbVie corporate homepage with hero, featured content, and promotional sections",
    urls: [
      "https://www.abbvie.com/"
    ],
    blocks: [
      {
        name: "hero-video",
        instances: [".homepage-hero-controller"]
      },
      {
        name: "carousel-press",
        instances: [".carousel.cmp-carousel--rss"]
      },
      {
        name: "cards-featured",
        instances: [".homepage-overlap .cardpagestory.card-standard"]
      },
      {
        name: "hero-spotlight",
        instances: [".video.cmp-video-xx-large"]
      },
      {
        name: "columns-mixed",
        instances: [
          ".cardpagestory.card-dashboard.show-image-hide-desc",
          "#container-3a42f76c63 .grid.cmp-grid-custom"
        ]
      },
      {
        name: "columns-promo",
        instances: ["#container-c63c87a46c .grid"]
      },
      {
        name: "columns-feature",
        instances: ["#section02 ~ .grid.cmp-grid-custom.no-bottom-margin"]
      },
      {
        name: "columns-info",
        instances: ["#section03 ~ .grid"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: ".homepage-hero-controller",
        style: null,
        blocks: ["hero-video"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Press Releases and Featured",
        selector: ".container.abbvie-container.homepage-overlap",
        style: null,
        blocks: ["carousel-press", "cards-featured"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Patients",
        selector: "#section01",
        style: null,
        blocks: [],
        defaultContent: ["#section01 .cmp-teaser__title", "#section01 .cmp-teaser__description", "#section01 .cmp-teaser__action-link"]
      },
      {
        id: "section-4",
        name: "Video Highlight",
        selector: ".video.cmp-video-xx-large",
        style: null,
        blocks: ["hero-spotlight"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Science and Innovation",
        selector: ["#teaser-a2987e48b8", ".cardpagestory.card-dashboard.show-image-hide-desc"],
        style: null,
        blocks: ["columns-mixed"],
        defaultContent: ["#teaser-a2987e48b8 .cmp-teaser__pretitle", "#teaser-a2987e48b8 .cmp-teaser__title", "#teaser-a2987e48b8 .cmp-teaser__description"]
      },
      {
        id: "section-6",
        name: "Persistence Lab Podcast",
        selector: ".container.abbvie-container.default-radius.cmp-container-xxx-large",
        style: "dark",
        blocks: ["columns-promo"],
        defaultContent: []
      },
      {
        id: "section-7",
        name: "Culture of Curiosity",
        selector: ["#section02", "#section02 ~ .grid.cmp-grid-custom.no-bottom-margin"],
        style: null,
        blocks: ["columns-feature"],
        defaultContent: ["#section02 .cmp-teaser__pretitle", "#section02 .cmp-teaser__title", "#section02 .cmp-teaser__description"]
      },
      {
        id: "section-8",
        name: "Explore Opportunities CTA",
        selector: ".container.abbvie-container.medium-radius.cmp-container-xxx-large.height-short",
        style: "accent",
        blocks: [],
        defaultContent: [
          ".container.abbvie-container.medium-radius.cmp-container-xxx-large.height-short .cmp-title__text",
          ".container.abbvie-container.medium-radius.cmp-container-xxx-large.height-short .cmp-text",
          ".container.abbvie-container.medium-radius.cmp-container-xxx-large.height-short .cmp-button"
        ]
      },
      {
        id: "section-9",
        name: "Investor Resources",
        selector: ["#section03", "#section03 ~ .grid"],
        style: null,
        blocks: ["columns-info"],
        defaultContent: ["#section03 .cmp-teaser__pretitle", "#section03 .cmp-teaser__title", "#section03 .cmp-teaser__description"]
      },
      {
        id: "section-10",
        name: "ESG",
        selector: ["#section04", ".container.abbvie-container.large-radius.cmp-container-full-width.height-default.no-bottom-margin"],
        style: null,
        blocks: ["columns-mixed"],
        defaultContent: ["#section04 .cmp-teaser__pretitle", "#section04 .cmp-teaser__title", "#section04 .cmp-teaser__description"]
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
