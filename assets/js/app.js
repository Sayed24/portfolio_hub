/* ==========================================================================
   PORTFOLIO HUB
   Main JavaScript
   File: assets/js/app.js

   IMPORTANT:
   This is the ONLY JavaScript file used by index.html.
   Do not split this file into modules.
   ========================================================================== */

"use strict";


/* ==========================================================================
   CONFIGURATION
   ========================================================================== */

const CONFIG = {
  projectDataPath: "data/projects.json",

  serviceWorkerPath: "service-worker.js",

  githubUsername: "Sayed24",

  contactEmail: "sadatsr52@gmail.com",

  themeStorageKey: "portfolio-theme",

  recruiterStorageKey: "portfolio-recruiter-mode",

  serviceWorkerReloadKey:
    "portfolio-service-worker-reloaded",

  defaultTheme: "light",

  projectRoutePrefix: "#/project/",

  animationThreshold: 0.12,

  searchDebounce: 180,

  loadingMinimumTime: 350
};


/* ==========================================================================
   APPLICATION STATE
   ========================================================================== */

const state = {
  projects: [],

  filteredProjects: [],

  searchQuery: "",

  activeCategory: "all",

  sortBy: "featured",

  theme: CONFIG.defaultTheme,

  recruiterMode: false,

  activeProject: null,

  initialized: false
};


/* ==========================================================================
   DOM HELPERS
   ========================================================================== */

function $(selector, scope = document) {
  if (
    !selector ||
    !scope ||
    typeof scope.querySelector !== "function"
  ) {
    return null;
  }

  return scope.querySelector(selector);
}


function $$(selector, scope = document) {
  if (
    !selector ||
    !scope ||
    typeof scope.querySelectorAll !== "function"
  ) {
    return [];
  }

  return Array.from(
    scope.querySelectorAll(selector)
  );
}


/* ==========================================================================
   SAFE HTML
   ========================================================================== */

function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/* ==========================================================================
   NORMALIZE TEXT
   ========================================================================== */

function normalizeText(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}


/* ==========================================================================
   SLUGIFY
   ========================================================================== */

function slugify(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}


/* ==========================================================================
   ARRAY HELPERS
   ========================================================================== */

function asArray(value) {
  return Array.isArray(value)
    ? value
    : [];
}


function unique(values = []) {
  return [
    ...new Set(values)
  ];
}


/* ==========================================================================
   URL HELPERS
   ========================================================================== */

function isExternalUrl(value = "") {
  return /^https?:\/\//i.test(
    String(value)
  );
}


function isSafeExternalUrl(value = "") {
  if (!value) {
    return false;
  }

  try {
    const url =
      new URL(
        value,
        window.location.href
      );

    return (
      url.protocol === "http:" ||
      url.protocol === "https:"
    );
  } catch {
    return false;
  }
}


/* ==========================================================================
   PROJECT IMAGE PATH
   ========================================================================== */

function getProjectImagePath(image = "") {
  const value =
    String(image || "")
      .trim();

  if (!value) {
    return "";
  }

  if (
    isExternalUrl(value) ||
    value.startsWith("data:") ||
    value.startsWith("blob:")
  ) {
    return value;
  }

  if (
    value.startsWith(
      "assets/images/projects/"
    )
  ) {
    return value;
  }

  if (
    value.startsWith("assets/")
  ) {
    return value;
  }

  return (
    "assets/images/projects/" +
    value.replace(/^\/+/, "")
  );
}


/* ==========================================================================
   STORAGE
   ========================================================================== */

function getStorage(
  key,
  fallback = null
) {
  try {
    const value =
      localStorage.getItem(key);

    return value === null
      ? fallback
      : value;
  } catch {
    return fallback;
  }
}


function setStorage(
  key,
  value
) {
  try {
    localStorage.setItem(
      key,
      String(value)
    );

    return true;
  } catch {
    return false;
  }
}


/* ==========================================================================
   SESSION STORAGE
   ========================================================================== */

function getSessionStorage(
  key,
  fallback = null
) {
  try {
    const value =
      sessionStorage.getItem(key);

    return value === null
      ? fallback
      : value;
  } catch {
    return fallback;
  }
}


function setSessionStorage(
  key,
  value
) {
  try {
    sessionStorage.setItem(
      key,
      String(value)
    );

    return true;
  } catch {
    return false;
  }
}


/* ==========================================================================
   REDUCED MOTION
   ========================================================================== */

function prefersReducedMotion() {
  return (
    window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches === true
  );
}


/* ==========================================================================
   SMOOTH SCROLL
   ========================================================================== */

function smoothScrollTo(target) {
  const element =
    typeof target === "string"
      ? $(target)
      : target;

  if (!element) {
    return false;
  }

  element.scrollIntoView({
    behavior:
      prefersReducedMotion()
        ? "auto"
        : "smooth",

    block: "start"
  });

  return true;
}


/* ==========================================================================
   TOAST
   ========================================================================== */

function showToast(
  title,
  message = "",
  duration = 3500
) {
  const container =
    $("#toastContainer");

  if (!container) {
    return;
  }

  const toast =
    document.createElement("div");

  toast.className =
    "toast";

  toast.innerHTML = `
    <div>
      <div class="toast__title">
        ${escapeHTML(title)}
      </div>

      ${
        message
          ? `
            <p class="toast__message">
              ${escapeHTML(message)}
            </p>
          `
          : ""
      }
    </div>

    <button
      class="toast__close"
      type="button"
      aria-label="Dismiss notification"
    >
      ×
    </button>
  `;

  const removeToast =
    () => {
      if (!toast.isConnected) {
        return;
      }

      toast.remove();
    };

  $(".toast__close", toast)
    ?.addEventListener(
      "click",
      removeToast
    );

  container.appendChild(
    toast
  );

  window.setTimeout(
    removeToast,
    duration
  );
}


/* ==========================================================================
   LOADING SCREEN
   ========================================================================== */

let loadingScreenHidden = false;


function hideLoadingScreen() {
  if (loadingScreenHidden) {
    return;
  }

  loadingScreenHidden = true;

  const loadingScreen =
    $("#loadingScreen");

  if (!loadingScreen) {
    return;
  }

  loadingScreen.classList.add(
    "is-hidden"
  );

  loadingScreen.setAttribute(
    "aria-hidden",
    "true"
  );

  window.setTimeout(
    () => {
      if (
        loadingScreen.isConnected &&
        loadingScreen.classList.contains(
          "is-hidden"
        )
      ) {
        loadingScreen.remove();
      }
    },
    500
  );
}


/* ==========================================================================
   CURRENT YEAR
   ========================================================================== */

function initializeCurrentYear() {
  const year =
    $("#currentYear");

  if (!year) {
    return;
  }

  year.textContent =
    String(
      new Date().getFullYear()
    );
}


/* ==========================================================================
   THEME
   ========================================================================== */

function getPreferredTheme() {
  const storedTheme =
    getStorage(
      CONFIG.themeStorageKey
    );

  if (
    storedTheme === "light" ||
    storedTheme === "dark"
  ) {
    return storedTheme;
  }

  const systemDark =
    window.matchMedia?.(
      "(prefers-color-scheme: dark)"
    ).matches === true;

  return systemDark
    ? "dark"
    : CONFIG.defaultTheme;
}


function applyTheme(theme) {
  const normalizedTheme =
    theme === "dark"
      ? "dark"
      : "light";

  state.theme =
    normalizedTheme;

  document.documentElement
    .setAttribute(
      "data-theme",
      normalizedTheme
    );

  const themeIcon =
    $("#themeIcon");

  const themeToggle =
    $("#themeToggle");

  if (themeIcon) {
    themeIcon.textContent =
      normalizedTheme === "dark"
        ? "☀"
        : "☾";
  }

  if (themeToggle) {
    const nextTheme =
      normalizedTheme === "dark"
        ? "light"
        : "dark";

    themeToggle.setAttribute(
      "aria-label",
      `Switch to ${nextTheme} mode`
    );

    themeToggle.title =
      `Switch to ${nextTheme} mode`;
  }

  const themeColor =
    $('meta[name="theme-color"]');

  if (themeColor) {
    themeColor.setAttribute(
      "content",
      normalizedTheme === "dark"
        ? "#09090b"
        : "#f8fafc"
    );
  }
}


function toggleTheme() {
  const nextTheme =
    state.theme === "dark"
      ? "light"
      : "dark";

  applyTheme(nextTheme);

  setStorage(
    CONFIG.themeStorageKey,
    nextTheme
  );
}


function initializeTheme() {
  applyTheme(
    getPreferredTheme()
  );

  $("#themeToggle")
    ?.addEventListener(
      "click",
      toggleTheme
    );
}


/* ==========================================================================
   HEADER
   ========================================================================== */

function updateHeaderState() {
  const header =
    $("#siteHeader");

  if (!header) {
    return;
  }

  header.classList.toggle(
    "is-scrolled",
    window.scrollY > 12
  );
}


/* ==========================================================================
   MOBILE MENU
   ========================================================================== */

function openMobileMenu() {
  const menu =
    $("#mobileMenu");

  const toggle =
    $("#mobileMenuToggle");

  if (!menu || !toggle) {
    return;
  }

  menu.hidden = false;

  toggle.setAttribute(
    "aria-expanded",
    "true"
  );

  toggle.setAttribute(
    "aria-label",
    "Close navigation menu"
  );

  document.body.classList.add(
    "menu-open"
  );
}


function closeMobileMenu() {
  const menu =
    $("#mobileMenu");

  const toggle =
    $("#mobileMenuToggle");

  if (!menu || !toggle) {
    return;
  }

  menu.hidden = true;

  toggle.setAttribute(
    "aria-expanded",
    "false"
  );

  toggle.setAttribute(
    "aria-label",
    "Open navigation menu"
  );

  document.body.classList.remove(
    "menu-open"
  );
}


function toggleMobileMenu() {
  const menu =
    $("#mobileMenu");

  if (!menu) {
    return;
  }

  if (menu.hidden) {
    openMobileMenu();
  } else {
    closeMobileMenu();
  }
}


/* ==========================================================================
   MAIN NAVIGATION
   ========================================================================== */

function handleNavigationClick(event) {
  const link =
    event.target.closest(
      'a[href^="#"]'
    );

  if (!link) {
    return;
  }

  const href =
    link.getAttribute("href");

  if (
    !href ||
    href === "#" ||
    href.startsWith(
      CONFIG.projectRoutePrefix
    )
  ) {
    return;
  }

  let target = null;

  try {
    target =
      $(href);
  } catch {
    target = null;
  }

  if (!target) {
    return;
  }

  event.preventDefault();

  closeMobileMenu();

  showMainView();

  history.pushState(
    null,
    "",
    href
  );

  smoothScrollTo(target);
}


/* ==========================================================================
   ACTIVE NAVIGATION
   ========================================================================== */

function updateActiveNavigation() {
  if (state.activeProject) {
    return;
  }

  const sections =
    $$("[data-section]");

  const links =
    $$(".desktop-nav a");

  if (!sections.length) {
    return;
  }

  const offset =
    window.innerHeight * 0.3;

  let activeId =
    "home";

  sections.forEach(
    (section) => {
      const rect =
        section.getBoundingClientRect();

      if (
        rect.top <= offset
      ) {
        activeId =
          section.id;
      }
    }
  );

  links.forEach(
    (link) => {
      const href =
        link.getAttribute("href");

      link.classList.toggle(
        "is-active",
        href === `#${activeId}`
      );
    }
  );
}


/* ==========================================================================
   SCROLL TO TOP
   ========================================================================== */

function updateScrollToTop() {
  const button =
    $("#scrollToTop");

  if (!button) {
    return;
  }

  button.hidden =
    window.scrollY < 500;
}


/* ==========================================================================
   PROJECT NORMALIZATION
   ========================================================================== */

function normalizeProject(
  project,
  index
) {
  const title =
    String(
      project?.title ||
      `Project ${index + 1}`
    ).trim();

  const slug =
    String(
      project?.slug ||
      slugify(title)
    ).trim();

  const technologies =
    asArray(
      project?.technologies
    )
      .map(String)
      .map(
        (item) =>
          item.trim()
      )
      .filter(Boolean);

  const tags =
    asArray(
      project?.tags
    )
      .map(String)
      .map(
        (item) =>
          item.trim()
      )
      .filter(Boolean);

  return {
    id:
      project?.id ??
      index + 1,

    slug,

    title,

    description:
      String(
        project?.description ||
        "A modern web project focused on usability and responsive design."
      ).trim(),

    longDescription:
      String(
        project?.longDescription ||
        project?.description ||
        ""
      ).trim(),

    category:
      String(
        project?.category ||
        "Other"
      ).trim(),

    technologies,

    tags,

    image:
      String(
        project?.image || ""
      ).trim(),

    gallery:
      asArray(
        project?.gallery
      ),

    github:
      String(
        project?.github || ""
      ).trim(),

    live:
      String(
        project?.live || ""
      ).trim(),

    featured:
      Boolean(
        project?.featured
      ),

    recruiterRecommended:
      Boolean(
        project?.recruiterRecommended
      ),

    status:
      String(
        project?.status ||
        "Completed"
      ).trim(),

    created:
      String(
        project?.created ||
        project?.date ||
        ""
      ).trim(),

    updated:
      String(
        project?.updated ||
        ""
      ).trim(),

    order:
      Number.isFinite(
        Number(project?.order)
      )
        ? Number(project.order)
        : index + 1,

    features:
      asArray(
        project?.features
      ),

    challenges:
      asArray(
        project?.challenges
      ),

    results:
      asArray(
        project?.results
      )
  };
}


/* ==========================================================================
   LOAD PROJECTS
   ========================================================================== */

async function loadProjects() {
  try {
    const response =
      await fetch(
        CONFIG.projectDataPath,
        {
          cache: "no-store"
        }
      );

    if (!response.ok) {
      throw new Error(
        `projects.json returned HTTP ${response.status}`
      );
    }

    const data =
      await response.json();

    const source =
      Array.isArray(data)
        ? data
        : Array.isArray(
            data?.projects
          )
          ? data.projects
          : [];

    state.projects =
      source.map(
        normalizeProject
      );

    return state.projects;
  } catch (error) {
    console.error(
      "[Portfolio] Unable to load projects:",
      error
    );

    state.projects = [];

    showToast(
      "Projects unavailable",
      "The main portfolio loaded, but projects.json could not be read."
    );

    return [];
  }
}


/* ==========================================================================
   PROJECT IMAGE
   ========================================================================== */

function createProjectImageMarkup(
  project,
  className
) {
  const path =
    getProjectImagePath(
      project.image
    );

  if (!path) {
    return `
      <div class="${className}">
        <div class="project-image-fallback">
          ${escapeHTML(project.title)}
        </div>
      </div>
    `;
  }

  return `
    <div class="${className}">

      <img
        src="${escapeHTML(path)}"
        alt="${escapeHTML(project.title)} preview"
        loading="lazy"
      >

      <div
        class="project-image-fallback"
        hidden
      >
        ${escapeHTML(project.title)}
      </div>

    </div>
  `;
}


/* ==========================================================================
   IMAGE FALLBACK HANDLING
   ========================================================================== */

function initializeImageFallbacks(
  scope = document
) {
  $$(
    ".featured-card__image img, .project-card__image img, .project-detail__cover img",
    scope
  ).forEach(
    (image) => {
      if (
        image.dataset
          .fallbackInitialized ===
        "true"
      ) {
        return;
      }

      image.dataset
        .fallbackInitialized =
        "true";

      image.addEventListener(
        "error",
        () => {
          image.hidden = true;

          const fallback =
            image.nextElementSibling;

          if (
            fallback?.classList
              .contains(
                "project-image-fallback"
              )
          ) {
            fallback.hidden = false;
          }
        },
        {
          once: true
        }
      );
    }
  );
}


/* ==========================================================================
   PROJECT TAGS
   ========================================================================== */

function createTagsMarkup(
  project,
  limit = 4
) {
  const items =
    unique([
      ...project.technologies,
      ...project.tags
    ]).slice(
      0,
      limit
    );

  if (!items.length) {
    return "";
  }

  return `
    <div class="project-tags">

      ${items
        .map(
          (item) => `
            <span class="project-tag">
              ${escapeHTML(item)}
            </span>
          `
        )
        .join("")}

    </div>
  `;
}


/* ==========================================================================
   PROJECT ACTIONS
   ========================================================================== */

function createProjectActions(
  project,
  featured = false
) {
  const liveButton =
    project.live &&
    isSafeExternalUrl(
      project.live
    )
      ? `
          <a
            class="btn btn-secondary"
            href="${escapeHTML(project.live)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Demo
          </a>
        `
      : "";

  return `
    <div class="${
      featured
        ? "featured-card__actions"
        : "project-card__actions"
    }">

      <button
        class="btn btn-primary"
        type="button"
        data-open-project="${escapeHTML(project.slug)}"
      >
        View Case Study

        <span aria-hidden="true">
          →
        </span>
      </button>

      ${liveButton}

    </div>
  `;
}


/* ==========================================================================
   FEATURED CARD
   ========================================================================== */

function createFeaturedProjectCard(
  project
) {
  return `
    <article
      class="featured-card reveal"
      data-recruiter-recommended="${
        project.recruiterRecommended
          ? "true"
          : "false"
      }"
    >

      ${createProjectImageMarkup(
        project,
        "featured-card__image"
      )}

      <div class="featured-card__content">

        <p class="featured-card__eyebrow">
          ${escapeHTML(project.category)}
        </p>

        <h3 class="featured-card__title">
          ${escapeHTML(project.title)}
        </h3>

        <p class="featured-card__description">
          ${escapeHTML(project.description)}
        </p>

        ${createTagsMarkup(
          project,
          5
        )}

        ${createProjectActions(
          project,
          true
        )}

      </div>

    </article>
  `;
}


/* ==========================================================================
   PROJECT CARD
   ========================================================================== */

function createProjectCard(
  project
) {
  return `
    <article
      class="project-card reveal"
      data-project-slug="${escapeHTML(project.slug)}"
      data-recruiter-recommended="${
        project.recruiterRecommended
          ? "true"
          : "false"
      }"
    >

      ${createProjectImageMarkup(
        project,
        "project-card__image"
      )}

      <div class="project-card__content">

        <p class="project-card__eyebrow">
          ${escapeHTML(project.category)}
        </p>

        <h3 class="project-card__title">
          ${escapeHTML(project.title)}
        </h3>

        <p class="project-card__description">
          ${escapeHTML(project.description)}
        </p>

        ${createTagsMarkup(
          project
        )}

        ${createProjectActions(
          project
        )}

      </div>

    </article>
  `;
}


/* ==========================================================================
   FEATURED PROJECTS
   ========================================================================== */

function renderFeaturedProjects() {
  const container =
    $("#featuredProjects");

  if (!container) {
    return;
  }

  let projects =
    state.projects.filter(
      (project) =>
        project.featured
    );

  if (!projects.length) {
    projects =
      state.projects.slice(
        0,
        3
      );
  }

  projects =
    [...projects]
      .sort(
        (a, b) =>
          a.order -
          b.order
      )
      .slice(
        0,
        4
      );

  if (!projects.length) {
    container.innerHTML = `
      <div class="empty-state">

        <div class="empty-state__icon">
          ◇
        </div>

        <h3>
          Projects coming soon
        </h3>

        <p>
          Project data could not be loaded.
        </p>

      </div>
    `;

    return;
  }

  container.innerHTML =
    projects
      .map(
        createFeaturedProjectCard
      )
      .join("");

  initializeImageFallbacks(
    container
  );

  initializeRevealAnimations(
    container
  );
}


/* ==========================================================================
   CATEGORIES
   ========================================================================== */

function getProjectCategories() {
  return unique(
    state.projects
      .map(
        (project) =>
          project.category
      )
      .filter(Boolean)
  ).sort(
    (a, b) =>
      a.localeCompare(b)
  );
}


/* ==========================================================================
   FILTER BUTTONS
   ========================================================================== */

function renderFilterButtons() {
  const container =
    $("#filterButtons");

  if (!container) {
    return;
  }

  const categories =
    getProjectCategories();

  container.innerHTML = `
    <button
      class="filter-button ${
        state.activeCategory === "all"
          ? "is-active"
          : ""
      }"
      type="button"
      data-project-filter="all"
    >
      All
    </button>

    ${categories
      .map(
        (category) => `
          <button
            class="filter-button ${
              state.activeCategory ===
              category
                ? "is-active"
                : ""
            }"
            type="button"
            data-project-filter="${escapeHTML(category)}"
          >
            ${escapeHTML(category)}
          </button>
        `
      )
      .join("")}
  `;
}


/* ==========================================================================
   SEARCH TEXT
   ========================================================================== */

function getProjectSearchText(
  project
) {
  return normalizeText(
    [
      project.title,
      project.description,
      project.longDescription,
      project.category,
      project.status,
      ...project.technologies,
      ...project.tags
    ].join(" ")
  );
}


/* ==========================================================================
   PROJECT DATE
   ========================================================================== */

function getDateValue(project) {
  const value =
    project.updated ||
    project.created;

  if (!value) {
    return 0;
  }

  const date =
    new Date(value);

  return Number.isNaN(
    date.getTime()
  )
    ? 0
    : date.getTime();
}


/* ==========================================================================
   FILTER / SORT
   ========================================================================== */

function getFilteredProjects() {
  let projects =
    [...state.projects];

  const query =
    normalizeText(
      state.searchQuery
    );

  if (query) {
    projects =
      projects.filter(
        (project) =>
          getProjectSearchText(
            project
          ).includes(query)
      );
  }

  if (
    state.activeCategory !==
    "all"
  ) {
    projects =
      projects.filter(
        (project) =>
          project.category ===
          state.activeCategory
      );
  }

  switch (state.sortBy) {
    case "newest":
      projects.sort(
        (a, b) =>
          getDateValue(b) -
          getDateValue(a)
      );
      break;

    case "oldest":
      projects.sort(
        (a, b) =>
          getDateValue(a) -
          getDateValue(b)
      );
      break;

    case "name":
      projects.sort(
        (a, b) =>
          a.title.localeCompare(
            b.title
          )
      );
      break;

    case "featured":
    default:
      projects.sort(
        (a, b) => {
          if (
            a.featured !==
            b.featured
          ) {
            return a.featured
              ? -1
              : 1;
          }

          return (
            a.order -
            b.order
          );
        }
      );
      break;
  }

  return projects;
}


/* ==========================================================================
   PROJECT RESULT COUNT
   ========================================================================== */

function updateProjectResultsText(
  count
) {
  const element =
    $("#projectResultsText");

  if (!element) {
    return;
  }

  if (!state.projects.length) {
    element.textContent =
      "No project data is currently available.";

    return;
  }

  element.textContent =
    `${count} ${
      count === 1
        ? "project"
        : "projects"
    } found`;
}


/* ==========================================================================
   PROJECT GRID
   ========================================================================== */

function renderProjectGrid() {
  const grid =
    $("#projectGrid");

  const emptyState =
    $("#projectsEmptyState");

  if (!grid) {
    return;
  }

  const projects =
    getFilteredProjects();

  state.filteredProjects =
    projects;

  updateProjectResultsText(
    projects.length
  );

  if (!projects.length) {
    grid.innerHTML = "";

    if (emptyState) {
      emptyState.hidden = false;
    }

    return;
  }

  if (emptyState) {
    emptyState.hidden = true;
  }

  grid.innerHTML =
    projects
      .map(
        createProjectCard
      )
      .join("");

  initializeImageFallbacks(
    grid
  );

  initializeRevealAnimations(
    grid
  );
}


/* ==========================================================================
   APPLY FILTERS
   ========================================================================== */

function applyProjectFilters() {
  renderFilterButtons();

  renderProjectGrid();
}


/* ==========================================================================
   DEBOUNCE
   ========================================================================== */

function debounce(
  callback,
  delay = 200
) {
  let timer = null;

  return (...args) => {
    window.clearTimeout(
      timer
    );

    timer =
      window.setTimeout(
        () => {
          callback(
            ...args
          );
        },
        delay
      );
  };
}


/* ==========================================================================
   PROJECT CONTROLS
   ========================================================================== */

function initializeProjectControls() {
  const searchInput =
    $("#projectSearch");

  const clearButton =
    $("#clearProjectSearch");

  const sortSelect =
    $("#projectSort");


  /* ------------------------------------------------------------------------
     SEARCH
     ------------------------------------------------------------------------ */

  const handleSearch =
    debounce(
      () => {
        state.searchQuery =
          searchInput?.value
            ?.trim() || "";

        if (clearButton) {
          clearButton.hidden =
            !state.searchQuery;
        }

        renderProjectGrid();
      },
      CONFIG.searchDebounce
    );

  searchInput?.addEventListener(
    "input",
    handleSearch
  );


  /* ------------------------------------------------------------------------
     CLEAR SEARCH
     ------------------------------------------------------------------------ */

  clearButton?.addEventListener(
    "click",
    () => {
      if (!searchInput) {
        return;
      }

      searchInput.value = "";

      state.searchQuery = "";

      clearButton.hidden = true;

      renderProjectGrid();

      searchInput.focus();
    }
  );


  /* ------------------------------------------------------------------------
     SORT
     ------------------------------------------------------------------------ */

  sortSelect?.addEventListener(
    "change",
    () => {
      state.sortBy =
        sortSelect.value;

      renderProjectGrid();
    }
  );


  /* ------------------------------------------------------------------------
     CATEGORY FILTER
     ------------------------------------------------------------------------ */

  $("#filterButtons")
    ?.addEventListener(
      "click",
      (event) => {
        const button =
          event.target.closest(
            "[data-project-filter]"
          );

        if (!button) {
          return;
        }

        state.activeCategory =
          button.dataset
            .projectFilter ||
          "all";

        applyProjectFilters();
      }
    );


  /* ------------------------------------------------------------------------
     RESET
     ------------------------------------------------------------------------ */

  $("#resetProjectFilters")
    ?.addEventListener(
      "click",
      () => {
        state.searchQuery = "";

        state.activeCategory =
          "all";

        state.sortBy =
          "featured";

        if (searchInput) {
          searchInput.value = "";
        }

        if (clearButton) {
          clearButton.hidden = true;
        }

        if (sortSelect) {
          sortSelect.value =
            "featured";
        }

        applyProjectFilters();
      }
    );
}


/* ==========================================================================
   PROJECT LOOKUP
   ========================================================================== */

function getProjectBySlug(slug) {
  return (
    state.projects.find(
      (project) =>
        project.slug === slug
    ) ||
    null
  );
}


/* ==========================================================================
   PROJECT LIST SECTION
   ========================================================================== */

function createListSection(
  title,
  items
) {
  const values =
    asArray(items)
      .map(
        (item) => {
          if (
            typeof item === "string"
          ) {
            return item;
          }

          if (
            item &&
            typeof item === "object"
          ) {
            return (
              item.description ||
              item.text ||
              item.title ||
              ""
            );
          }

          return "";
        }
      )
      .filter(Boolean);

  if (!values.length) {
    return "";
  }

  return `
    <section class="project-detail__section">

      <h2>
        ${escapeHTML(title)}
      </h2>

      <ul>
        ${values
          .map(
            (item) => `
              <li>
                ${escapeHTML(item)}
              </li>
            `
          )
          .join("")}
      </ul>

    </section>
  `;
}


/* ==========================================================================
   GALLERY IMAGE PATH
   ========================================================================== */

function resolveGalleryImage(
  galleryItem
) {
  let source = "";

  if (
    typeof galleryItem === "string"
  ) {
    source =
      galleryItem;
  } else if (
    galleryItem &&
    typeof galleryItem === "object"
  ) {
    source =
      galleryItem.src ||
      galleryItem.image ||
      "";
  }

  if (!source) {
    return "";
  }

  if (
    isExternalUrl(source) ||
    source.startsWith("assets/")
  ) {
    return source;
  }

  return getProjectImagePath(
    source
  );
}


/* ==========================================================================
   PROJECT GALLERY
   ========================================================================== */

function createGalleryMarkup(
  project
) {
  const gallery =
    project.gallery
      .map(
        (item) => {
          const source =
            resolveGalleryImage(
              item
            );

          if (!source) {
            return "";
          }

          let caption =
            project.title;

          if (
            item &&
            typeof item === "object"
          ) {
            caption =
              item.alt ||
              item.title ||
              caption;
          }

          return `
            <img
              src="${escapeHTML(source)}"
              alt="${escapeHTML(caption)}"
              loading="lazy"
            >
          `;
        }
      )
      .filter(Boolean);

  if (!gallery.length) {
    return "";
  }

  return `
    <section class="project-detail__section">

      <h2>
        Project Gallery
      </h2>

      <div class="project-gallery">
        ${gallery.join("")}
      </div>

    </section>
  `;
}


/* ==========================================================================
   PROJECT DETAIL VIEW
   ========================================================================== */

function renderProjectDetail(
  project
) {
  const projectView =
    $("#projectView");

  if (!projectView) {
    return;
  }

  const cover =
    getProjectImagePath(
      project.image
    );

  const liveLink =
    project.live &&
    isSafeExternalUrl(
      project.live
    )
      ? `
          <a
            class="btn btn-primary btn-large"
            href="${escapeHTML(project.live)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Live Project

            <span aria-hidden="true">
              ↗
            </span>
          </a>
        `
      : "";

  const githubLink =
    project.github &&
    isSafeExternalUrl(
      project.github
    )
      ? `
          <a
            class="btn btn-secondary btn-large"
            href="${escapeHTML(project.github)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Source
          </a>
        `
      : "";

  projectView.innerHTML = `
    <article class="project-detail">

      <header class="project-detail__hero">

        <div class="container">

          <button
            class="project-detail__back"
            type="button"
            data-project-back
          >
            ← Back to projects
          </button>

          <p class="project-detail__eyebrow">
            ${escapeHTML(project.category)}
          </p>

          <h1 class="project-detail__title">
            ${escapeHTML(project.title)}
          </h1>

          <p class="project-detail__summary">
            ${escapeHTML(
              project.longDescription ||
              project.description
            )}
          </p>

          ${
            liveLink ||
            githubLink
              ? `
                <div class="project-detail__actions">
                  ${liveLink}
                  ${githubLink}
                </div>
              `
              : ""
          }

        </div>

      </header>


      ${
        cover
          ? `
            <div class="project-detail__cover">

              <img
                src="${escapeHTML(cover)}"
                alt="${escapeHTML(project.title)}"
              >

              <div
                class="project-image-fallback"
                hidden
                style="min-height:24rem;"
              >
                ${escapeHTML(project.title)}
              </div>

            </div>
          `
          : ""
      }


      <div class="container project-detail__body">

        <div class="project-detail__main">

          <section class="project-detail__section">

            <h2>
              Project Overview
            </h2>

            <p>
              ${escapeHTML(
                project.longDescription ||
                project.description
              )}
            </p>

          </section>


          ${createListSection(
            "Key Features",
            project.features
          )}


          ${createListSection(
            "Challenges & Solutions",
            project.challenges
          )}


          ${createListSection(
            "Results",
            project.results
          )}


          ${createGalleryMarkup(
            project
          )}

        </div>


        <aside class="project-detail__sidebar">

          <div class="project-detail__panel">

            <h3>
              Technologies
            </h3>

            <div class="project-detail__tech">

              ${
                project.technologies.length
                  ? project.technologies
                    .map(
                      (technology) => `
                        <span>
                          ${escapeHTML(technology)}
                        </span>
                      `
                    )
                    .join("")
                  : `
                    <span>
                      Web Development
                    </span>
                  `
              }

            </div>

          </div>


          <div class="project-detail__panel">

            <h3>
              Project Details
            </h3>

            <div class="project-detail__tech">

              <span>
                ${escapeHTML(project.category)}
              </span>

              <span>
                ${escapeHTML(project.status)}
              </span>

            </div>

          </div>

        </aside>

      </div>

    </article>
  `;

  initializeImageFallbacks(
    projectView
  );

  $(
    "[data-project-back]",
    projectView
  )?.addEventListener(
    "click",
    () => {
      navigateHome(
        "#projects"
      );
    }
  );
}


/* ==========================================================================
   SHOW PROJECT
   ========================================================================== */

function showProjectView(
  project
) {
  const main =
    $("#mainContent");

  const projectView =
    $("#projectView");

  if (!main || !projectView) {
    return;
  }

  state.activeProject =
    project;

  renderProjectDetail(
    project
  );

  main.hidden = true;

  projectView.hidden = false;

  closeMobileMenu();

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto"
  });

  document.title =
    `${project.title} | Sayed Rahim Sadat`;
}


/* ==========================================================================
   SHOW HOME
   ========================================================================== */

function showMainView() {
  const main =
    $("#mainContent");

  const projectView =
    $("#projectView");

  state.activeProject = null;

  if (main) {
    main.hidden = false;
  }

  if (projectView) {
    projectView.hidden = true;

    projectView.innerHTML =
      "";
  }

  document.title =
    "Sayed Rahim Sadat | Web Designer & Developer";
}


/* ==========================================================================
   PROJECT ROUTING
   ========================================================================== */

function navigateToProject(
  slug
) {
  const project =
    getProjectBySlug(slug);

  if (!project) {
    showToast(
      "Project not found",
      "That project could not be opened."
    );

    navigateHome(
      "#projects"
    );

    return;
  }

  history.pushState(
    null,
    "",
    `${CONFIG.projectRoutePrefix}${encodeURIComponent(slug)}`
  );

  showProjectView(
    project
  );
}


function navigateHome(
  hash = "#projects"
) {
  showMainView();

  history.pushState(
    null,
    "",
    hash
  );

  window.requestAnimationFrame(
    () => {
      smoothScrollTo(
        hash
      );
    }
  );
}


/* ==========================================================================
   CURRENT ROUTE
   ========================================================================== */

function handleCurrentRoute() {
  const hash =
    window.location.hash;

  if (
    hash.startsWith(
      CONFIG.projectRoutePrefix
    )
  ) {
    const encodedSlug =
      hash.slice(
        CONFIG.projectRoutePrefix
          .length
      );

    let slug =
      encodedSlug;

    try {
      slug =
        decodeURIComponent(
          encodedSlug
        );
    } catch {
      // Keep encodedSlug.
    }

    const project =
      getProjectBySlug(
        slug
      );

    if (project) {
      showProjectView(
        project
      );

      return;
    }
  }

  showMainView();

  if (
    hash &&
    hash !== "#"
  ) {
    window.requestAnimationFrame(
      () => {
        let section = null;

        try {
          section =
            $(hash);
        } catch {
          section = null;
        }

        if (section) {
          smoothScrollTo(
            section
          );
        }
      }
    );
  }
}


/* ==========================================================================
   PROJECT ROUTING INITIALIZATION
   ========================================================================== */

function initializeProjectRouting() {
  document.addEventListener(
    "click",
    (event) => {
      const button =
        event.target.closest(
          "[data-open-project]"
        );

      if (!button) {
        return;
      }

      event.preventDefault();

      const slug =
        button.dataset
          .openProject;

      if (!slug) {
        return;
      }

      navigateToProject(
        slug
      );
    }
  );

  window.addEventListener(
    "popstate",
    handleCurrentRoute
  );
}


/* ==========================================================================
   RECRUITER MODE
   ========================================================================== */

function applyRecruiterMode(
  enabled,
  showMessage = false
) {
  state.recruiterMode =
    Boolean(enabled);

  document.body.classList.toggle(
    "recruiter-mode",
    state.recruiterMode
  );

  const section =
    $("#recruiterSection");

  const toggle =
    $("#recruiterToggle");

  if (section) {
    section.hidden =
      !state.recruiterMode;
  }

  if (toggle) {
    toggle.setAttribute(
      "aria-pressed",
      String(
        state.recruiterMode
      )
    );
  }

  setStorage(
    CONFIG.recruiterStorageKey,
    state.recruiterMode
      ? "true"
      : "false"
  );

  if (showMessage) {
    showToast(
      state.recruiterMode
        ? "Recruiter Mode enabled"
        : "Recruiter Mode disabled",

      state.recruiterMode
        ? "Recommended projects and a quick professional summary are highlighted."
        : "Portfolio returned to the standard view."
    );
  }
}


function initializeRecruiterMode() {
  const stored =
    getStorage(
      CONFIG.recruiterStorageKey,
      "false"
    );

  applyRecruiterMode(
    stored === "true"
  );

  $("#recruiterToggle")
    ?.addEventListener(
      "click",
      () => {
        applyRecruiterMode(
          !state.recruiterMode,
          true
        );

        if (
          state.recruiterMode
        ) {
          window.setTimeout(
            () => {
              smoothScrollTo(
                "#recruiterSection"
              );
            },
            100
          );
        }
      }
    );
}


/* ==========================================================================
   CONTACT FORM
   ========================================================================== */

function initializeContactForm() {
  const form =
    $("#contactForm");

  if (!form) {
    return;
  }

  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();

        return;
      }

      const formData =
        new FormData(form);

      const name =
        String(
          formData.get("name") ||
          ""
        ).trim();

      const email =
        String(
          formData.get("email") ||
          ""
        ).trim();

      const subject =
        String(
          formData.get("subject") ||
          ""
        ).trim();

      const message =
        String(
          formData.get("message") ||
          ""
        ).trim();

      const body = [
        "Hello Sayed,",
        "",
        message,
        "",
        `From: ${name}`,
        `Email: ${email}`
      ].join("\n");

      const mailto =
        `mailto:${CONFIG.contactEmail}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

      showToast(
        "Email prepared",
        "Your email application should open with the message filled in."
      );

      window.location.href =
        mailto;
    }
  );
}


/* ==========================================================================
   PORTFOLIO ASSISTANT
   ========================================================================== */

const ASSISTANT_RESPONSES = {
  "best-projects":
    "Start with FlowDesk, InsightHub, and the featured projects. They demonstrate responsive interface design, front-end development, application structure, and practical UI/UX work.",

  skills:
    "Sayed works with HTML5, CSS3, JavaScript, responsive design, Bootstrap, UI/UX, Figma, Git, REST APIs, WordPress, Shopify, Kajabi, and related web technologies.",

  experience:
    "Sayed has hands-on experience as a Web Designer & Developer and previously worked as a Web Developer at Scholars Playground, focusing on responsive interfaces, maintenance, UI implementation, wireframes, and web platforms.",

  contact:
    "You can contact Sayed at sadatsr52@gmail.com or review his GitHub profile at github.com/Sayed24."
};


function openAssistant() {
  const panel =
    $("#assistantPanel");

  const toggle =
    $("#assistantToggle");

  if (!panel || !toggle) {
    return;
  }

  panel.hidden = false;

  toggle.setAttribute(
    "aria-expanded",
    "true"
  );

  document.body.classList.add(
    "assistant-open"
  );
}


function closeAssistant() {
  const panel =
    $("#assistantPanel");

  const toggle =
    $("#assistantToggle");

  if (!panel || !toggle) {
    return;
  }

  panel.hidden = true;

  toggle.setAttribute(
    "aria-expanded",
    "false"
  );

  document.body.classList.remove(
    "assistant-open"
  );
}


function addAssistantMessage(
  text,
  type = "bot"
) {
  const messages =
    $("#assistantMessages");

  if (!messages) {
    return;
  }

  const message =
    document.createElement(
      "div"
    );

  message.className =
    `assistant-message assistant-message--${type}`;

  message.textContent =
    text;

  messages.appendChild(
    message
  );

  messages.scrollTop =
    messages.scrollHeight;
}


function handleAssistantQuestion(
  key,
  button
) {
  const userText =
    button?.textContent
      ?.trim() ||
    "Tell me more";

  addAssistantMessage(
    userText,
    "user"
  );

  const response =
    ASSISTANT_RESPONSES[key] ||
    "You can explore the projects section, review Sayed's experience, or use the contact section to get in touch.";

  window.setTimeout(
    () => {
      addAssistantMessage(
        response,
        "bot"
      );
    },
    prefersReducedMotion()
      ? 0
      : 250
  );
}


function initializeAssistant() {
  $("#assistantToggle")
    ?.addEventListener(
      "click",
      () => {
        const panel =
          $("#assistantPanel");

        if (!panel) {
          return;
        }

        if (panel.hidden) {
          openAssistant();
        } else {
          closeAssistant();
        }
      }
    );

  $("#assistantClose")
    ?.addEventListener(
      "click",
      closeAssistant
    );

  $("#assistantSuggestions")
    ?.addEventListener(
      "click",
      (event) => {
        const button =
          event.target.closest(
            "[data-assistant-question]"
          );

        if (!button) {
          return;
        }

        handleAssistantQuestion(
          button.dataset
            .assistantQuestion,
          button
        );
      }
    );

  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Escape"
      ) {
        closeAssistant();

        closeMobileMenu();
      }
    }
  );
}


/* ==========================================================================
   RESUME
   ========================================================================== */

function initializeResumeLinks() {
  $$("[data-resume-link]")
    .forEach(
      (link) => {
        link.addEventListener(
          "click",
          () => {
            showToast(
              "Opening resume",
              "The resume will open in a new tab."
            );
          }
        );
      }
    );
}


/* ==========================================================================
   EXTERNAL LINK SECURITY
   ========================================================================== */

function initializeExternalLinks() {
  $$('a[target="_blank"]')
    .forEach(
      (link) => {
        const currentRel =
          link.getAttribute(
            "rel"
          ) || "";

        const values =
          new Set(
            currentRel
              .split(/\s+/)
              .filter(Boolean)
          );

        values.add(
          "noopener"
        );

        values.add(
          "noreferrer"
        );

        link.setAttribute(
          "rel",
          [...values].join(" ")
        );
      }
    );
}


/* ==========================================================================
   REVEAL ANIMATIONS
   ========================================================================== */

let revealObserver =
  null;


function initializeRevealAnimations(
  scope = document
) {
  const elements =
    $$(".reveal", scope);

  if (!elements.length) {
    return;
  }

  if (
    prefersReducedMotion() ||
    !(
      "IntersectionObserver" in
      window
    )
  ) {
    elements.forEach(
      (element) => {
        element.classList.add(
          "is-visible"
        );
      }
    );

    return;
  }

  if (!revealObserver) {
    revealObserver =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                !entry.isIntersecting
              ) {
                return;
              }

              entry.target
                .classList.add(
                  "is-visible"
                );

              revealObserver
                .unobserve(
                  entry.target
                );
            }
          );
        },
        {
          threshold:
            CONFIG.animationThreshold
        }
      );
  }

  elements.forEach(
    (element) => {
      if (
        element.classList.contains(
          "is-visible"
        )
      ) {
        return;
      }

      revealObserver.observe(
        element
      );
    }
  );
}


function markStaticRevealElements() {
  [
    ".section-heading",
    ".about-intro",
    ".about-content",
    ".skill-card",
    ".timeline-item",
    ".contact-content",
    ".contact-form"
  ].forEach(
    (selector) => {
      $$(selector)
        .forEach(
          (element) => {
            element.classList.add(
              "reveal"
            );
          }
        );
    }
  );
}


/* ==========================================================================
   SCROLL HANDLER
   ========================================================================== */

let scrollTicking =
  false;


function handleScroll() {
  if (scrollTicking) {
    return;
  }

  scrollTicking = true;

  window.requestAnimationFrame(
    () => {
      updateHeaderState();

      updateScrollToTop();

      updateActiveNavigation();

      scrollTicking = false;
    }
  );
}


/* ==========================================================================
   NAVIGATION INITIALIZATION
   ========================================================================== */

function initializeNavigation() {
  $("#mobileMenuToggle")
    ?.addEventListener(
      "click",
      toggleMobileMenu
    );

  document.addEventListener(
    "click",
    handleNavigationClick
  );

  $("#scrollToTop")
    ?.addEventListener(
      "click",
      () => {
        window.scrollTo({
          top: 0,
          left: 0,

          behavior:
            prefersReducedMotion()
              ? "auto"
              : "smooth"
        });
      }
    );

  window.addEventListener(
    "scroll",
    handleScroll,
    {
      passive: true
    }
  );

  window.addEventListener(
    "resize",
    () => {
      if (
        window.innerWidth >=
        992
      ) {
        closeMobileMenu();
      }
    }
  );

  updateHeaderState();

  updateScrollToTop();

  updateActiveNavigation();
}


/* ==========================================================================
   SERVICE WORKER
   ========================================================================== */

async function registerServiceWorker() {
  if (
    !("serviceWorker" in navigator)
  ) {
    return null;
  }

  /*
   * Service workers require HTTPS or localhost.
   * They do not work when index.html is opened directly with file://.
   */

  if (
    window.location.protocol !==
      "https:" &&
    window.location.hostname !==
      "localhost" &&
    window.location.hostname !==
      "127.0.0.1"
  ) {
    return null;
  }

  try {
    const registration =
      await navigator
        .serviceWorker
        .register(
          CONFIG.serviceWorkerPath
        );

    /*
     * Ask the browser to check whether service-worker.js changed.
     */

    try {
      await registration.update();
    } catch {
      // Update checks can fail temporarily without breaking the site.
    }


    /* ----------------------------------------------------------------------
       NEW SERVICE WORKER
       ---------------------------------------------------------------------- */

    registration.addEventListener(
      "updatefound",
      () => {
        const worker =
          registration.installing;

        if (!worker) {
          return;
        }

        worker.addEventListener(
          "statechange",
          () => {
            if (
              worker.state ===
                "installed" &&
              navigator
                .serviceWorker
                .controller
            ) {
              worker.postMessage({
                type:
                  "SKIP_WAITING"
              });
            }
          }
        );
      }
    );


    /* ----------------------------------------------------------------------
       CONTROLLER CHANGE

       Reload only once when a newly activated worker takes control.
       This prevents stale versions of app.js/style.css from remaining active.
       ---------------------------------------------------------------------- */

    navigator.serviceWorker
      .addEventListener(
        "controllerchange",
        () => {
          const alreadyReloaded =
            getSessionStorage(
              CONFIG
                .serviceWorkerReloadKey,
              "false"
            );

          if (
            alreadyReloaded ===
            "true"
          ) {
            return;
          }

          setSessionStorage(
            CONFIG
              .serviceWorkerReloadKey,
            "true"
          );

          window.location.reload();
        }
      );

    return registration;
  } catch (error) {
    console.warn(
      "[Portfolio] Service worker registration failed:",
      error
    );

    return null;
  }
}


/* ==========================================================================
   FAILSAFE
   ========================================================================== */

function initializeFailsafe() {
  /*
   * An ordinary runtime error must never leave
   * the visitor trapped behind the loading screen.
   */

  window.setTimeout(
    hideLoadingScreen,
    3500
  );

  window.addEventListener(
    "error",
    (event) => {
      console.error(
        "[Portfolio] Runtime error:",
        event.error ||
        event.message
      );

      hideLoadingScreen();
    }
  );

  window.addEventListener(
    "unhandledrejection",
    (event) => {
      console.error(
        "[Portfolio] Promise error:",
        event.reason
      );

      hideLoadingScreen();
    }
  );
}


/* ==========================================================================
   APPLICATION INITIALIZATION
   ========================================================================== */

async function initializeApp() {
  const startedAt =
    performance.now();

  try {

    /* ----------------------------------------------------------------------
       STATIC WEBSITE FEATURES
       ---------------------------------------------------------------------- */

    initializeCurrentYear();

    initializeTheme();

    initializeNavigation();

    initializeRecruiterMode();

    initializeContactForm();

    initializeAssistant();

    initializeResumeLinks();

    initializeExternalLinks();

    initializeProjectRouting();


    /* ----------------------------------------------------------------------
       PROJECT DATA
       ---------------------------------------------------------------------- */

    await loadProjects();

    renderFeaturedProjects();

    renderFilterButtons();

    renderProjectGrid();

    initializeProjectControls();


    /* ----------------------------------------------------------------------
       ROUTING
       ---------------------------------------------------------------------- */

    handleCurrentRoute();


    /* ----------------------------------------------------------------------
       ANIMATIONS
       ---------------------------------------------------------------------- */

    markStaticRevealElements();

    initializeRevealAnimations();


    /* ----------------------------------------------------------------------
       PWA

       Registration happens after core page functionality so a service-worker
       problem can never prevent the portfolio itself from opening.
       ---------------------------------------------------------------------- */

    registerServiceWorker();


    state.initialized =
      true;

  } catch (error) {
    console.error(
      "[Portfolio] Initialization failed:",
      error
    );

    showToast(
      "Portfolio loaded with limited features",
      "One part of the website could not initialize."
    );
  } finally {
    const elapsed =
      performance.now() -
      startedAt;

    const remaining =
      Math.max(
        0,
        CONFIG.loadingMinimumTime -
        elapsed
      );

    window.setTimeout(
      hideLoadingScreen,
      remaining
    );
  }
}


/* ==========================================================================
   START APPLICATION
   ========================================================================== */

initializeFailsafe();


if (
  document.readyState ===
  "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    initializeApp,
    {
      once: true
    }
  );
} else {
  initializeApp();
}