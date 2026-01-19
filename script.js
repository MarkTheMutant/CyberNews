const RSS_URL = "https://feeds.feedburner.com/TheHackersNews";
const PROXY = "https://api.allorigins.win/raw?url=" + encodeURIComponent(RSS_URL);
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

function loadFeed() {
  fetch(PROXY)
    .then(r => r.text())
    .then(xmlText => {
      const xml = new DOMParser().parseFromString(xmlText, "application/xml");
      const items = xml.querySelectorAll("item");
      const list = document.getElementById("news-list");

      list.innerHTML = "";

      items.forEach((item, i) => {
        if (i >= 8) return;

        const title = item.querySelector("title")?.textContent;
        const link = item.querySelector("link")?.textContent;
        const date = item.querySelector("pubDate")?.textContent;

        if (!title || !link) return;

        const li = document.createElement("li");
        li.innerHTML = `
          <a href="${link}" target="_blank" rel="noopener noreferrer">
            [ ALERT ] ${title}
          </a>
          <span class="timestamp">${date}</span>
        `;

        list.appendChild(li);
      });
    })
    .catch(() => {
      document.getElementById("news-list").innerHTML =
        "<li>[ ERROR ] Feed unavailable</li>";
    });
}

loadFeed();
setInterval(loadFeed, REFRESH_INTERVAL);
