const STORAGE_KEY = "portfolio-comments";

function getStoredComments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Failed to parse stored comments", e);
    return [];
  }
}

function storeComments(comments) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
}

function formatTime(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${d} ${hh}:${mm}`;
}

function renderComments() {
  const listEl = document.getElementById("comment-list");
  const emptyEl = document.getElementById("no-comments");
  const comments = getStoredComments();

  listEl.innerHTML = "";

  if (!comments.length) {
    emptyEl.style.display = "block";
    return;
  }

  emptyEl.style.display = "none";

  comments.forEach((c) => {
    const li = document.createElement("li");
    li.className = "comment-item";

    const header = document.createElement("div");
    header.className = "comment-header";

    const nameSpan = document.createElement("span");
    nameSpan.className = "comment-name";
    nameSpan.textContent = c.name || "訪客";

    const timeSpan = document.createElement("span");
    timeSpan.className = "comment-time";
    timeSpan.textContent = c.time;

    header.appendChild(nameSpan);
    header.appendChild(timeSpan);

    const messageP = document.createElement("p");
    messageP.className = "comment-message";
    messageP.textContent = c.message;

    li.appendChild(header);
    li.appendChild(messageP);

    listEl.appendChild(li);
  });
}

function handleSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById("name");
  const messageInput = document.getElementById("message");

  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  if (!message) return;

  const comments = getStoredComments();
  const now = new Date();

  comments.unshift({
    name: name || "訪客",
    message,
    time: formatTime(now),
  });

  storeComments(comments);
  renderComments();

  messageInput.value = "";
}

function handleClear() {
  if (!confirm("確定要清除這台裝置上所有的留言嗎？")) return;
  storeComments([]);
  renderComments();
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("comment-form");
  const clearBtn = document.getElementById("clear-comments");

  if (form) form.addEventListener("submit", handleSubmit);
  if (clearBtn) clearBtn.addEventListener("click", handleClear);

  renderComments();
});












