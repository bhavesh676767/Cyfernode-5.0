/**
 * nav.js — Cyfernode Navigation Router
 * Uses clean URLs via server.js
 * Optimized with event delegation to support dynamic Framer/React elements.
 */
(function () {
    var PROMPTS_URL = "https://www.notion.so/Event-Prompts-902c3288d8d243d1942f2a64582bd5c2";

    // Framer button class → destination (checked in order on click)
    var LINK_BUTTONS = [
        { selector: ".framer-yshl83-container", url: "https://www.instagram.com/cyfernode_4.0/", external: true },
        { selector: ".framer-1hireqr-container", url: "https://www.instagram.com/cyfernode_4.0/", external: true },
        { selector: ".framer-6stad1-container", url: "https://discord.gg/wVHcUDWj3", external: true },
        { selector: ".framer-296ee2-container", url: "https://www.youtube.com/@CyferNauts", external: true },
        { selector: ".framer-PDnFr.framer-v-el8xql", url: "https://www.youtube.com/@CyferNauts", external: true },
        { selector: ".framer-puj1sb-container", url: PROMPTS_URL, external: true },
        { selector: ".framer-ov0d3q", url: "/register", external: false }
    ];

    const TEAM_IMAGES = [
      '/images/team/bhavesh.webp',
      '/images/team/aazim.webp',
      '/images/team/aarav.webp',
      '/images/team/arnab.webp',
      '/images/team/vinamrata.webp',
      '/images/team/namish.webp',
      '/images/team/manas.webp',
      '/images/team/sampada.webp',
      '/images/team/yashvardhan.webp',
      '/images/team/pranav.webp',
      '/images/team/nikumbh.webp',
      '/images/team/shaurya.webp',
      '/images/team/yuvraj.webp',
      '/images/team/gyanada.webp'
    ];

    let swRegistered = false;
    let prefetchedAll = false;
    let prefetchedAboveFold = false;

    // Register Service Worker on window load
    window.addEventListener('load', () => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then((reg) => {
                    console.log('[Service Worker] Registered successfully:', reg.scope);
                    swRegistered = true;
                })
                .catch((err) => {
                    console.error('[Service Worker] Registration failed:', err);
                });
        }

        // Trigger idle prefetching
        if (window.requestIdleCallback) {
            requestIdleCallback(idlePrefetch);
        } else {
            setTimeout(idlePrefetch, 2000);
        }
    });

    // Idle prefetching - prefetch HTML and first 6 team images
    function idlePrefetch() {
        if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
            console.log('[Prefetch] Browser idle. Preloading team page shell & above-fold images.');
            prefetchDoc('/team');
            
            // Prefetch above-fold images (first 6)
            for (let i = 0; i < 6; i++) {
                prefetchImage(TEAM_IMAGES[i]);
            }
            prefetchedAboveFold = true;
        }
    }

    // Prefetch a document via link rel="prefetch"
    function prefetchDoc(url) {
        if (document.querySelector(`link[href="${url}"][rel="prefetch"]`)) return;
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        link.as = 'document';
        document.head.appendChild(link);
    }

    // Prefetch an image using Image object
    function prefetchImage(url) {
        if (!url) return;
        const img = new Image();
        img.src = url;
    }

    // Prefetch ALL team images (triggered on hovering/touching Team link)
    function prefetchAllTeamResources() {
        if (prefetchedAll) return;
        console.log('[Prefetch] User interaction detected. Preloading all 14 team images.');
        prefetchDoc('/team');
        TEAM_IMAGES.forEach(prefetchImage);
        prefetchedAll = true;
    }

    // Dynamic style injection to ensure pointer cursor on hover for clickable Framer classes
    var style = document.createElement("style");
    style.innerHTML = `
        .framer-e4e94c, .framer-ov0d3q, .framer-styles-preset-6hy7sq, .framer-ietie1, .framer-puj1sb-container, .framer-13a97tg, .framer-btg6zl, .framer-1kc68j4-container,
        .framer-yshl83-container, .framer-6stad1-container, .framer-296ee2-container, .framer-1hireqr-container, .framer-PDnFr.framer-v-el8xql {
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

    // Helper to check if an element is a Team button / link
    function isTeamElement(el) {
        if (!el) return false;
        if (el.closest(".framer-btg6zl, .framer-1kc68j4-container")) return true;
        
        const textEl = el.closest(".framer-styles-preset-1wicq5s, .framer-styles-preset-21ogod, .framer-text, .framer-bixam4");
        if (textEl && textEl.textContent.trim().toLowerCase() === "team") {
            return true;
        }
        return false;
    }

    // Intercept mouseover and touchstart on document to start aggressive preloading
    document.addEventListener("mouseover", function (e) {
        if (isTeamElement(e.target)) {
            prefetchAllTeamResources();
        }
    }, { passive: true });

    document.addEventListener("touchstart", function (e) {
        if (isTeamElement(e.target)) {
            prefetchAllTeamResources();
        }
    }, { passive: true });

    document.addEventListener("focusin", function (e) {
        if (isTeamElement(e.target)) {
            prefetchAllTeamResources();
        }
    }, { passive: true });

    // Event delegation on document clicks
    document.addEventListener("click", function (e) {
        // Framer social / external link buttons (class → URL pairs)
        for (var i = 0; i < LINK_BUTTONS.length; i++) {
            var btn = LINK_BUTTONS[i];
            var linkEl = e.target.closest(btn.selector);
            if (linkEl) {
                e.preventDefault();
                e.stopPropagation();
                if (btn.external) {
                    window.open(btn.url, "_blank", "noopener,noreferrer");
                } else {
                    window.location.href = btn.url;
                }
                return;
            }
        }

        // Register button check (legacy Framer classes)
        var registerEl = e.target.closest(".framer-e4e94c, .framer-styles-preset-6hy7sq");
        if (registerEl) {
            e.preventDefault();
            window.location.href = "/register";
            return;
        }

        // Prompts link check (legacy Framer classes)
        var promptsEl = e.target.closest(".framer-ietie1, .framer-13a97tg");
        if (promptsEl) {
            e.preventDefault();
            window.open(PROMPTS_URL, "_blank", "noopener,noreferrer");
            return;
        }

        // Team link check
        var teamEl = e.target.closest(".framer-btg6zl, .framer-1kc68j4-container");
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

