const BACKUP_KEY = "backup";
const EXPORT_STATUS_KEY = "exportStatus";

document.addEventListener("DOMContentLoaded", async () => {
  await render();
  document.querySelector("#export").addEventListener("click", async () => {
    try {
      const result = await browser.runtime.sendMessage({ type: "export-backup" });
      await render(result.download.message);
    } catch (error) {
      await render(`Download failed: ${error.message}`);
    }
  });
});

async function render(message) {
  const stored = await browser.storage.local.get([BACKUP_KEY, EXPORT_STATUS_KEY]);
  const backup = stored[BACKUP_KEY];
  const exportStatus = stored[EXPORT_STATUS_KEY];
  const status = document.querySelector("#status");

  document.querySelector("#watchlist-count").textContent = backup?.watchlist?.length || 0;
  document.querySelector("#subscriptions-count").textContent = backup?.subscriptions?.length || 0;

  if (message) {
    status.textContent = message;
  } else if (exportStatus) {
    status.textContent = exportStatus.message;
  } else if (backup?.updatedAt) {
    status.textContent = `Last updated: ${new Date(backup.updatedAt).toLocaleString("en-US")}`;
  }
}
