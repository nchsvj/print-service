(function() {
    const header = document.getElementById('header');
    const root = document.documentElement;

    function setBodyOffset () {
        const h = header.offsetHeight;
        root.style.setProperty('--header-h', h + 'px')
    }

    function onScroll () {
        if (window.scrollY > 20) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    }

    setBodyOffset();
    onScroll();

    window.addEventListener('resize', setBodyOffset, {passive: true});
    window.addEventListener('scroll', onScroll, {passive: true});
})