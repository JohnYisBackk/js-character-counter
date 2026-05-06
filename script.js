"use strict";

// ======================================================
// SELECT ELEMENTS
// ======================================================

const statusPill = document.getElementById("statusPill");

const counterText = document.getElementById("counterText");
const helperText = document.getElementById("helperText");
const progressBar = document.getElementById("progressBar");

const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");

const textareaBox = document.querySelector("textarea");

// ======================================================
// SETTINGS
// ======================================================

const maxLength = 200;

// ======================================================
// UPDATE COUNTER FUNCTION
// ======================================================

function updateCounter() {
  if (textareaBox.value.length > 200) {
    textareaBox.value = textareaBox.value.slice(0, maxLength);
  }

  const length = textareaBox.value.length;
  const percentage = (length / maxLength) * 100;

  counterText.textContent = `${length} / ${maxLength} characters`;
  progressBar.style.width = `${percentage}%`;

  progressBar.classList.remove("warning", "danger");
  statusPill.classList.remove("warning", "danger", "success");

  if (length === 0) {
    helperText.textContent = "You can start typing.";
    statusPill.textContent = "Ready";

    copyBtn.disabled = true;
  } else if (percentage < 70) {
    helperText.textContent = "Looking good.";
    statusPill.textContent = "Good";

    statusPill.classList.add("success");

    copyBtn.disabled = false;
  } else if (percentage < 90) {
    helperText.textContent = "Getting close to the limit.";
    statusPill.textContent = "Warning";

    progressBar.classList.add("warning");
    statusPill.classList.add("warning");

    copyBtn.disabled = false;
  } else {
    helperText.textContent = "Limit almost reached.";
    statusPill.textContent = "Limit";

    progressBar.classList.add("danger");
    statusPill.classList.add("danger");

    copyBtn.disabled = false;
  }
}

// ======================================================
// CLEAR TEXT FUNCTION
// ======================================================

function clearText() {
  textareaBox.value = "";

  updateCounter();
  textareaBox.focus();

  autoResize();
}

// ======================================================
// COPY TEXT FUNCTION
// ======================================================

async function copyText() {
  const value = textareaBox.value;

  if (value.trim() === "") return;

  await navigator.clipboard.writeText(value);

  helperText.textContent = "Copied!";
  copyBtn.textContent = "Copied ✓";

  setTimeout(() => {
    copyBtn.textContent = "Copy";
  }, 2000);
}

// ======================================================
// AUTO RESIZE FUNCTION
// ======================================================

function autoResize() {
  textareaBox.style.height = "auto";
  textareaBox.style.height = `${textareaBox.scrollHeight}px`;
}

// ======================================================
// EVENT LISTENERS
// ======================================================

textareaBox.addEventListener("input", () => {
  updateCounter();
  autoResize();
});

clearBtn.addEventListener("click", clearText);
copyBtn.addEventListener("click", copyText);

// ======================================================
// INITIAL STATE
// ======================================================

updateCounter();
