const RSS_URL =
  "https://feeds.feedburner.com/TheHackersNews";
const PROXY =
  "https://api.allorigins.win/raw?url=" + encodeURIComponent(RSS_URL);

fetch(PROXY)
  .then(response => {
    if (!response.ok) {
      throw new Error("Network error");
    }
    return response.text();
  })
  .then(xmlText => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "application/xml");

    const items = xml.querySelectorAll("item");
    const list = document.getElementById("news-list");

    list.innerHTML = "";

    items.forEach((item, index) => {
      if (index >= 5) return;

      const title = item.querySelector("title")?.textContent;
      const link = item.querySelector("link")?.textContent;

      if (!title || !link) return;

      const li = document.createElement("li");
      const a = document.createElement("a");

      a.href = link;
      a.textContent = title;
      a.target = "_blank";
      a.rel = "noopener noreferrer";

      li.appendChild(a);
      list.appendChild(li);
    });
  })
  .catch(err => {
    document.getElementById("news-list").innerHTML =
      "<li>News feed unavailable.</li>";
    console.error(err);
  });