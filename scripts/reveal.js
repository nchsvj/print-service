(() => {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    document.querySelectorAll("[data-stagger-group]").forEach(group => {
        const children = group.querySelectorAll(".reveal[data-stagger]");
        children.forEach((el, i) => {
            const base = Number(group.getAttribute("data-stagger-base") || 80);
            const start = Number(group.getAttribute("data-stagger-start") || 0);
            el.style.setProperty("--d", `${start + i * base}ms`);
        });
    });

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");

                if (entry.target.hasAttribute("data-once")) {
                    io.unobserve(entry.target);
                }
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px"
    });

    items.forEach(el => io.observe(el));
})();