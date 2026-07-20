(async () => {
  const listType = await waitForListPage();
  if (!listType) {
    return;
  }

  // AniWorld may render the list asynchronously after the initial page load.
  await waitForListContainer();
  const entries = extractEntries();
  await browser.runtime.sendMessage({ type: "save-list", listType, entries });
})();

async function waitForListPage() {
  const deadline = Date.now() + 10_000;
  let listType;

  while (!(listType = detectListType()) && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  return listType;
}

async function waitForListContainer() {
  const deadline = Date.now() + 10_000;

  while (!document.querySelector(".seriesListContainer") && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
}

function detectListType() {
  const path = window.location.pathname.toLocaleLowerCase("en-US");

  if (path === "/account/watchlist" || /^\/account\/watchlist\/(asc|desc)$/.test(path)) {
    return "watchlist";
  }

  if (path === "/account/subscribed") {
    return "subscriptions";
  }

  return null;
}

function extractEntries() {
  const seen = new Set();
  const entries = [];
  const list = document.querySelector(".seriesListContainer");

  if (!list) {
    return entries;
  }

  for (const link of list.querySelectorAll(':scope > div > a[href^="/anime/stream/"]')) {
    const url = new URL(link.href, window.location.origin);
    const match = url.pathname.match(/^\/anime\/stream\/([^/]+)/);
    if (!match) {
      continue;
    }

    const id = match[1];
    if (seen.has(id)) {
      continue;
    }

    const title = cleanText(link.querySelector("h1, h2, h3, h4")?.textContent || link.textContent);
    if (!title) {
      continue;
    }

    seen.add(id);
    const image = link.querySelector("img")?.dataset.src || link.querySelector("img")?.src || null;
    entries.push({
      title,
      url: url.origin + url.pathname,
      image: image ? new URL(image, window.location.origin).href : null
    });
  }

  return entries.sort((left, right) => left.title.localeCompare(right.title, "en-US"));
}

function cleanText(value) {
  return value.replace(/\s+/g, " ").trim();
}
