const BACKUP_KEY = "backup";
const EXPORT_STATUS_KEY = "exportStatus";

browser.runtime.onMessage.addListener(async (message) => {
  if (message.type === "save-list") {
    const existing = await browser.storage.local.get(BACKUP_KEY);
    const backup = existing[BACKUP_KEY] || createEmptyBackup();

    backup[message.listType] = message.entries;
    backup.updatedAt = new Date().toISOString();
    await browser.storage.local.set({ [BACKUP_KEY]: backup });
    const download = await downloadBackup(backup);
    return { backup, download };
  }

  if (message.type === "export-backup") {
    const existing = await browser.storage.local.get(BACKUP_KEY);
    const backup = existing[BACKUP_KEY] || createEmptyBackup();
    const download = await downloadBackup(backup);
    return { backup, download };
  }
});

function createEmptyBackup() {
  return {
    format: "aniworld-list-backup",
    version: 1,
    updatedAt: null,
    watchlist: [],
    subscriptions: []
  };
}

async function downloadBackup(backup) {
  const content = JSON.stringify(backup, null, 2);
  const url = URL.createObjectURL(new Blob([content], { type: "application/json;charset=utf-8" }));

  try {
    const downloadId = await browser.downloads.download({
      url,
      filename: "AniWorld-Backup/aniworld-lists.json",
      conflictAction: "overwrite",
      saveAs: false
    });
    hideDownloadFromHistory(downloadId).catch(() => {});
    const status = {
      ok: true,
      message: `Download sent to Firefox (ID ${downloadId}).`,
      updatedAt: new Date().toISOString()
    };
    await browser.storage.local.set({ [EXPORT_STATUS_KEY]: status });
    return status;
  } catch (error) {
    const status = {
      ok: false,
      message: `Download failed: ${error.message}`,
      updatedAt: new Date().toISOString()
    };
    await browser.storage.local.set({ [EXPORT_STATUS_KEY]: status });
    return status;
  } finally {
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }
}

async function hideDownloadFromHistory(downloadId) {
  const downloads = await browser.downloads.search({ id: downloadId });

  if (downloads[0]?.state === "complete") {
    await clearBackupDownloadsFromHistory();
    return;
  }

  const onChanged = (delta) => {
    if (delta.id !== downloadId || !delta.state) {
      return;
    }

    browser.downloads.onChanged.removeListener(onChanged);
    if (delta.state.current === "complete") {
      clearBackupDownloadsFromHistory().catch(() => {});
    }
  };

  browser.downloads.onChanged.addListener(onChanged);
}

async function clearBackupDownloadsFromHistory() {
  await browser.downloads.erase({
    filenameRegex: "AniWorld-Backup[\\\\/]aniworld-lists\\.json$"
  });
}
