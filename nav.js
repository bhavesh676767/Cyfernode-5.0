/**
 * nav.js — Cyfernode Navigation Router
 * Uses clean URLs via server.js
 * Optimized with event delegation to support dynamic Framer/React elements.
 */
(function () {
    var PROMPTS_URL = "https://www.notion.so/Event-Prompts-902c3288d8d243d1942f2a64582bd5c2?source=copy_link";

    // Dynamic style injection to ensure pointer cursor on hover for clickable Framer classes
    var style = document.createElement("style");
    style.innerHTML = `
        .framer-e4e94c, .framer-ov0d3q, .framer-styles-preset-6hy7sq, .framer-ietie1, .framer-puj1sb-container, .framer-13a97tg, .framer-btg6zl {
            cursor: pointer !important;
        }
    `;
    if (document.head) {
        document.head.appendChild(style);
    } else {
        document.addEventListener("DOMContentLoaded", function () {
            document.head.appendChild(style);
        });
    }

    // Event delegation on document clicks
    document.addEventListener("click", function (e) {
        // Register button check
        var registerEl = e.target.closest(".framer-e4e94c, .framer-ov0d3q, .framer-styles-preset-6hy7sq");
        if (registerEl) {
            e.preventDefault();
            window.location.href = "/register";
            return;
        }

        // Prompts link check
        var promptsEl = e.target.closest(".framer-ietie1, .framer-puj1sb-container, .framer-13a97tg");
        if (promptsEl) {
            e.preventDefault();
            window.open(PROMPTS_URL, "_blank");
            return;
        }

        // Team link check
        var teamEl = e.target.closest(".framer-btg6zl");
        if (teamEl) {
            e.preventDefault();
            window.location.href = "/team";
            return;
        }

        // Text-based fallback checks
        var textEl = e.target.closest(".framer-styles-preset-1wicq5s, .framer-styles-preset-21ogod, .framer-text, .framer-bixam4");
        if (textEl) {
            var txt = textEl.textContent.trim().toLowerCase();
            if (txt === "register") {
                e.preventDefault();
                window.location.href = "/register";
            } else if (txt === "prompts") {
                e.preventDefault();
                window.open(PROMPTS_URL, "_blank");
            } else if (txt === "team") {
                e.preventDefault();
                window.location.href = "/team";
            }
        }
    });
})();

