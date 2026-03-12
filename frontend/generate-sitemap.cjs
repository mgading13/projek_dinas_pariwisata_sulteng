const fs = require("fs");

const urls = [
  "/",
  "/desa-wisata",
  "/event",
  "/paket-wisata",
  "/kuliner",
  "/hotel",
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>https://beranikamaimo.sultengprov.go.id${url}</loc>
  </url>`
  )
  .join("")}
</urlset>`;

fs.writeFileSync("./public/sitemap.xml", sitemap);