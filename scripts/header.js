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