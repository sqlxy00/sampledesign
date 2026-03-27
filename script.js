function handleVideoClick() {
    // メッセージを表示（iframeへの差し替えが可能なことを示す）
    console.log("動画埋め込みエリアがクリックされました。");
    // 将来的にはここでiframeを動的に生成したり、YouTube埋め込みコードに差し替えます
}

document.addEventListener("DOMContentLoaded", function() {
    function initScrollReveal() {
        var targets = document.querySelectorAll(
            "header h1, header .space-y-2, #works h2, #works .mb-12, #works .max-w-4xl, #works .grid > div, #about .text-center, #about .grid > div, #about dl > div, #service h2, #service .grid > div, #recruit h2, #recruit .mb-14, #recruit .text-center > .mb-12, #recruit .text-center > .flex, #contact h2, #contact p, #contact form > div, footer .max-w-7xl > div, footer .flex.space-x-8 a"
        );

        targets.forEach(function(el, index) {
            el.classList.add("reveal");
            el.style.transitionDelay = ((index % 6) * 0.06) + "s";
        });

        if (!("IntersectionObserver" in window)) {
            targets.forEach(function(el) {
                el.classList.add("is-visible");
            });
            return;
        }

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -10% 0px"
        });

        targets.forEach(function(el) {
            observer.observe(el);
        });
    }

    initScrollReveal();

    var mainNav = document.getElementById("main-nav");
    var menuToggle = document.getElementById("menu-toggle");
    var menuClose = document.getElementById("menu-close");
    var menuBackdrop = document.getElementById("mobile-menu-backdrop");
    var mobileMenu = document.getElementById("mobile-menu");
    var mobileMenuPanel = document.getElementById("mobile-menu-panel");
    var closeTimer = null;

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

    function openMenu() {
        if (closeTimer) {
            clearTimeout(closeTimer);
            closeTimer = null;
        }
        mobileMenu.classList.remove("hidden");
        requestAnimationFrame(function() {
            mobileMenuPanel.classList.remove("translate-x-full");
        });
        menuToggle.setAttribute("aria-expanded", "true");
        document.body.classList.add("overflow-hidden");
        setNavStyleForMenu();
    }

    function closeMenu() {
        mobileMenuPanel.classList.add("translate-x-full");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("overflow-hidden");
        setNavStyleForMenu();
        if (closeTimer) {
            clearTimeout(closeTimer);
        }
        closeTimer = setTimeout(function() {
            mobileMenu.classList.add("hidden");
            closeTimer = null;
        }, 300);
    }

    menuToggle.addEventListener("click", function() {
        var isOpen = !mobileMenu.classList.contains("hidden");
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    if (menuClose) {
        menuClose.addEventListener("click", function() {
            closeMenu();
        });
    }

    if (menuBackdrop) {
        menuBackdrop.addEventListener("click", function() {
            closeMenu();
        });
    }

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    mobileMenu.querySelectorAll("a").forEach(function(link) {
        link.addEventListener("click", function() {
            closeMenu();
        });
    });

    window.addEventListener("resize", function() {
        if (window.innerWidth >= 768) {
            closeMenu();
        }
    });
});
