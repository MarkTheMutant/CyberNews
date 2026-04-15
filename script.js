const RSS_URL = "https://feeds.feedburner.com/TheHackersNews";
const API =
  "https://api.rss2json.com/v1/api.json?rss_url=" +
  encodeURIComponent(RSS_URL);

const REFRESH_INTERVAL = 5 * 60 * 1000;

async function loadFeed() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    const list = document.getElementById("news-list");
    list.innerHTML = "";

    data.items.slice(0, 8).forEach(item => {
      const li = document.createElement("li");

      li.innerHTML = `
        <a href="${item.link}" target="_blank" rel="noopener noreferrer">
          [ ALERT ] ${item.title}
        </a>
        <span class="timestamp">${item.pubDate}</span>
      `;

      list.appendChild(li);
    });

  } catch (err) {
    console.log(err);
    document.getElementById("news-list").innerHTML =
      "<li>[ ERROR ] Feed unavailable</li>";
  }
}

loadFeed();
setInterval(loadFeed, REFRESH_INTERVAL);
