// Descarga las ultimas publicaciones de Instagram (via Meta Graph API) y las inyecta
// en index.html entre los marcadores INSTAGRAM-FEED:START / END.
// Requiere las variables de entorno INSTAGRAM_ACCESS_TOKEN e INSTAGRAM_USER_ID
// (configuradas como GitHub Actions secrets, ver .github/workflows/instagram-sync.yml).

const fs = require("fs");
const path = require("path");

const TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const USER_ID = process.env.INSTAGRAM_USER_ID;
const INDEX_PATH = path.join(__dirname, "..", "index.html");
const START_MARKER = "<!-- INSTAGRAM-FEED:START -->";
const END_MARKER = "<!-- INSTAGRAM-FEED:END -->";
const MAX_POSTS = 8;
const MAX_CAPTION_LENGTH = 90;

function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function truncate(str, max) {
    if (!str) return "";
    const firstLine = str.split("\n")[0];
    if (firstLine.length <= max) return firstLine;
    return firstLine.slice(0, max - 1).trimEnd() + "…";
}

function buildCard(post) {
    const isReel = post.media_type === "VIDEO";
    const aspectClass = isReel ? "aspect-[9/16] w-40 sm:w-48" : "aspect-square w-56 sm:w-64";
    const imageUrl = post.thumbnail_url || post.media_url;
    const caption = escapeHtml(truncate(post.caption, MAX_CAPTION_LENGTH));

    return `                <a href="${post.permalink}" target="_blank" rel="noopener noreferrer" class="relative flex-shrink-0 ${aspectClass} rounded-xl overflow-hidden border border-border snap-start block">
                    <img src="${imageUrl}" alt="Publicación de Instagram de AquaLab Pro" class="absolute inset-0 w-full h-full object-cover" loading="lazy">
                    <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-transparent"></div>
                    <i data-lucide="instagram" class="absolute top-3 left-3 w-5 h-5 text-white drop-shadow"></i>${isReel ? `
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="flex items-center justify-center w-12 h-12 rounded-full bg-white/90">
                            <i data-lucide="play" class="w-6 h-6 text-foreground ml-0.5"></i>
                        </div>
                    </div>` : ""}${caption ? `
                    <p class="absolute top-8 left-3 right-3 text-center text-white text-xs font-medium drop-shadow">${caption}</p>` : ""}
                </a>`;
}

async function fetchPosts() {
    const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
    const url = `https://graph.facebook.com/v19.0/${USER_ID}/media?fields=${fields}&limit=${MAX_POSTS}&access_token=${TOKEN}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.error) {
        throw new Error(`Instagram Graph API error: ${data.error.message}`);
    }
    return (data.data || []).filter((p) => p.media_type !== "CAROUSEL_ALBUM" || p.media_url);
}

function injectIntoIndex(cardsHtml) {
    const html = fs.readFileSync(INDEX_PATH, "utf8");
    const startIdx = html.indexOf(START_MARKER);
    const endIdx = html.indexOf(END_MARKER);
    if (startIdx === -1 || endIdx === -1) {
        throw new Error("No se encontraron los marcadores INSTAGRAM-FEED en index.html");
    }
    const before = html.slice(0, startIdx + START_MARKER.length);
    const after = html.slice(endIdx);
    const newHtml = `${before}\n${cardsHtml}\n                `.trimEnd() + `\n                ${after}`;
    fs.writeFileSync(INDEX_PATH, newHtml, "utf8");
}

async function main() {
    if (!TOKEN || !USER_ID) {
        console.warn("INSTAGRAM_ACCESS_TOKEN o INSTAGRAM_USER_ID no configurados. Se omite la sincronización.");
        process.exit(0);
    }

    const posts = await fetchPosts();
    if (posts.length === 0) {
        console.warn("No se encontraron publicaciones.");
        process.exit(0);
    }

    const cardsHtml = posts.map(buildCard).join("\n");
    injectIntoIndex(cardsHtml);
    console.log(`Sincronizadas ${posts.length} publicaciones de Instagram.`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
