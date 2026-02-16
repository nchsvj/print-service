(function () {
    const header = document.getElementById('header');
    const root = document.documentElement;

    function setBodyOffset() {
        if (!header) return;
        const h = header.offsetHeight;
        root.style.setProperty('--header-h', h + 'px');
    }

    function onScroll() {
        if (!header) return;
        if (window.scrollY > 20) header.classList.add('is-scrolled');
        else header.classList.remove('is-scrolled');
    }

    setBodyOffset();
    onScroll();

    window.addEventListener('resize', setBodyOffset, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
})();


(function () {
    document.querySelectorAll('[data-scroll]').forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = link.getAttribute('data-scroll');
            const target = document.getElementById(id);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
})();

(function () {
    const cards = document.querySelectorAll('.service-card');
    const isTouchLike = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    if (!isTouchLike) return;

    cards.forEach((card) => {
        card.addEventListener('click', () => {
            cards.forEach((c) => {
                if (c !== card) c.classList.remove('is-open');
            });

            card.classList.toggle("is-open");
        });
    });

    document.addEventListener("click", (e) => {
        if (e.target.closest(".service-card")) return;
        cards.forEach((c) => c.classList.remove("is-open"));
    })
})();