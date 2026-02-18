(function () {
    function loadPrices(callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "data/prices.json", true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;

            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    var data = JSON.parse(xhr.responseText);
                    callback(null, data);
                }   catch (e) {
                    callback(e, null);
                }
            }   else {
                callback(new Error("Ошибка загрузки prices.json: " + xhr.status), null);
            }
        };

        xhr.send();
    }

    function getByPath(obj, path) {
        if (!obj || !path) return null;

        var parts = path.split(".");
        var current = obj;

        for (var i = 0; i < parts.length; i++) {
            if (current && typeof current === "object" && parts[i] in current) {
                current = current[parts[i]];
            }   else {
                return null;
            }
        }

        return current;
    }

    function formatItem(item) {
        var cur = item.currency ? item.currency : "₸";

        if (item.price_from != null) {
            return item.label + " - от " + item.price_from + cur;
        }

        if (item.price != null) {
            return item.label + " - " + item.price + cur;
        }

        return item.label;
    }

    function renderPriceList(block) {
        if (!block || !block.items || block.items.length === 0) {
            return "<span class='muted'>Уточняйте цену</span>";
        }

        var html = "";

        for (var i = 0; i < block.items.length; i++) {
            if (i > 0) html += "<br>"
            html += formatItem(block.items[i]);
        }

        return html;
    }

    function applyPrices(prices) {
        var cards = document.querySelectorAll(".service-card[data-price-key]");

        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];

            var key =card.getAttribute("data-price-key");
            var block = getByPath(prices, key);

            var priceListEl = card.querySelector(".price-list");
            var priceTitleEl = card.querySelector(".price-title");

            if (!priceListEl) continue;

            if (block && block.title && priceTitleEl) {
                priceTitleEl.textContent = block.title;
            }

            priceListEl.innerHTML = renderPriceList(block);
        }
    }

    function init() {
        loadPrices(function (err, prices) {
            if (err) {
                console.error(err);
                return;
            }

            applyPrices(prices);
        });
    }

    document.addEventListener("DOMContentLoaded", init);
})();