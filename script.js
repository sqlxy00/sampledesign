function handleVideoClick() {
    console.log("動画埋め込みエリアがクリックされました。");
}

document.addEventListener("DOMContentLoaded", function () {
    function initScrollReveal() {
        var targets = document.querySelectorAll(
            ".hero-title, .hero-description p, .section-title, .works-section-item, .works-text-center, .works-project-card, .works-video-area, .about-profile-visual, .about-profile-list > div, .service-card, .recruit-positions, .recruit-section, .recruit-cta-area, .section-container-contact > *, .footer-container > *"
        );

        targets.forEach(function (el, index) {
            el.classList.add("reveal");
            el.style.transitionDelay = ((index % 6) * 0.06) + "s";
        });

        if (!("IntersectionObserver" in window)) {
            targets.forEach(function (el) {
                el.classList.add("is-visible");
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -10% 0px"
        });

        targets.forEach(function (el) {
            observer.observe(el);
        });
    }

    function initVideoPlaceholder() {
        var videoButtons = document.querySelectorAll("[data-video-placeholder]");
        videoButtons.forEach(function (button) {
            button.addEventListener("click", handleVideoClick);
        });
    }

    function initMobileMenu() {
        var mainNav = document.getElementById("main-nav");
        var menuToggle = document.getElementById("menu-toggle");
        var menuClose = document.getElementById("menu-close");
        var menuBackdrop = document.getElementById("mobile-menu-backdrop");
        var mobileMenu = document.getElementById("mobile-menu");
        var mobileMenuPanel = document.getElementById("mobile-menu-panel");
        var focusableSelectors = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
        var closeTimer = null;
        var lastFocusedElement = null;

        if (!menuToggle || !mobileMenu || !mobileMenuPanel) {
            return;
        }

        function setNavStyleForMenu() {
            if (!mainNav) {
                return;
            }
            mainNav.classList.add("bg-white", "backdrop-blur-none");
            mainNav.classList.remove("bg-white/80", "backdrop-blur-md");
        }

        function getFocusableElements() {
            return Array.prototype.slice.call(mobileMenuPanel.querySelectorAll(focusableSelectors));
        }

        function trapFocus(event) {
            if (event.key !== "Tab" || mobileMenu.classList.contains("hidden")) {
                return;
            }

            var focusableElements = getFocusableElements();
            if (!focusableElements.length) {
                return;
            }

            var firstElement = focusableElements[0];
            var lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }

        function openMenu() {
            if (closeTimer) {
                clearTimeout(closeTimer);
                closeTimer = null;
            }

            lastFocusedElement = document.activeElement;
            mobileMenu.classList.remove("hidden");
            mobileMenu.setAttribute("aria-hidden", "false");

            requestAnimationFrame(function () {
                mobileMenuPanel.classList.remove("translate-x-full");
                var focusableElements = getFocusableElements();
                if (focusableElements.length) {
                    focusableElements[0].focus();
                }
            });

            menuToggle.setAttribute("aria-expanded", "true");
            document.body.classList.add("menu-open");
            setNavStyleForMenu();
        }

        function closeMenu() {
            mobileMenuPanel.classList.add("translate-x-full");
            menuToggle.setAttribute("aria-expanded", "false");
            document.body.classList.remove("menu-open");
            setNavStyleForMenu();

            if (closeTimer) {
                clearTimeout(closeTimer);
            }

            closeTimer = setTimeout(function () {
                mobileMenu.classList.add("hidden");
                mobileMenu.setAttribute("aria-hidden", "true");
                closeTimer = null;

                if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
                    lastFocusedElement.focus();
                }
            }, 300);
        }

        menuToggle.addEventListener("click", function () {
            var isOpen = !mobileMenu.classList.contains("hidden");
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        if (menuClose) {
            menuClose.addEventListener("click", closeMenu);
        }

        if (menuBackdrop) {
            menuBackdrop.addEventListener("click", closeMenu);
        }

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
                closeMenu();
            }
            trapFocus(event);
        });

        mobileMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth >= 768 && !mobileMenu.classList.contains("hidden")) {
                closeMenu();
            }
        });

        mobileMenu.setAttribute("aria-hidden", "true");
    }

    initScrollReveal();
    initVideoPlaceholder();
    initMobileMenu();
});
