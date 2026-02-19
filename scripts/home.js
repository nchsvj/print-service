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