/**
 * nav.js — Cyfernode Navigation Router
 * Uses clean URLs via server.js
 */
document.addEventListener("DOMContentLoaded", function () {

    var PROMPTS_URL = "https://www.notion.so/Event-Prompts-902c3288d8d243d1942f2a64582bd5c2?source=copy_link";

    // ── PROMPTS → Notion link ──────────────────────────────
    // Direct class selectors
    [".framer-ietie1", ".framer-puj1sb-container", ".framer-13a97tg"].forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (el) {
            el.style.cursor = "pointer";
            el.addEventListener("click", function (e) {
                e.preventDefault();
                window.open(PROMPTS_URL, "_blank");
            });
        });
    });

    // Any element with preset classes whose text is "Prompts"
    document.querySelectorAll(".framer-styles-preset-1wicq5s, .framer-text").forEach(function (el) {
        if (el.textContent.trim() === "Prompts") {
            el.style.cursor = "pointer";
            el.addEventListener("click", function (e) {
                e.preventDefault();
                window.open(PROMPTS_URL, "_blank");
            });
        }
    });

    // ── TEAM → /team ───────────────────────────────────────
    // Direct selector — always routes to team
    document.querySelectorAll(".framer-btg6zl").forEach(function (el) {
        el.style.cursor = "pointer";
        el.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "/team";
        });
    });

    // Text-based selectors
    [".framer-bixam4"].forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (el) {
            if (el.textContent.trim() === "Team") {
                el.style.cursor = "pointer";
                el.addEventListener("click", function (e) {
                    e.preventDefault();
                    window.location.href = "/team";
                });
            }
        });
    });

    document.querySelectorAll(".framer-styles-preset-1wicq5s, .framer-styles-preset-21ogod, .framer-text").forEach(function (el) {
        if (el.textContent.trim() === "Team") {
            el.style.cursor = "pointer";
            el.addEventListener("click", function (e) {
                e.preventDefault();
                window.location.href = "/team";
            });
        }
    });

    // ── REGISTER → /register ───────────────────────────────
    document.querySelectorAll(".framer-e4e94c, .framer-styles-preset-1wicq5s, .framer-text").forEach(function (el) {
        if (el.textContent.trim() === "Register") {
            el.style.cursor = "pointer";
            el.addEventListener("click", function (e) {
                e.preventDefault();
                window.location.href = "/register";
            });
        }
    });

});
