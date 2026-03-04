const APP_ID = 431960;
const LIMIT = 20;
const DOMAINS = ["steamcommunity.com", "api.steampowered.com"];
const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320'%3E%3Crect width='100%25' height='100%25' fill='%230d1117'/%3E%3Ctext x='50%25' y='50%25' fill='%2358a6ff' text-anchor='middle' dy='.3em' font-size='14'%3EWallHub%3C/text%3E%3C/svg%3E";

const els = {
  kw: document.getElementById("kw"),
  sort: document.getElementById("sort"),
  status: document.getElementById("status"),
  list: document.getElementById("list"),
  searchBtn: document.getElementById("searchBtn"),
  copyBtn: document.getElementById("copyBtn"),
  domains: document.getElementById("domains")
};

els.domains.textContent = DOMAINS.join(" / ");
els.searchBtn.addEventListener("click", loadItems);
els.kw.addEventListener("keydown", (e) => { if (e.key === "Enter") loadItems(); });
els.copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(DOMAINS.join("\n"));
    setStatus("代理域名已复制");
  } catch {
    setStatus("复制失败，请手动复制");
  }
});

loadItems();

async function loadItems() {
  setStatus("正在访问 Steam...");
  els.list.innerHTML = "";
  try {
    const ids = await fetchWorkshopIds(els.kw.value.trim(), els.sort.value);
    if (!ids.length) {
      setStatus("未找到结果，请检查关键词或代理状态");
      renderEmpty("没有检索到可展示的壁纸");
      return;
    }
    const details = await fetchDetails(ids);
    renderCards(details);
    setStatus(`加载完成：${details.length} 项`);
  } catch (err) {
    renderError(err);
  }
}

async function fetchWorkshopIds(keyword, sort) {
  const url = new URL("https://steamcommunity.com/workshop/browse/");
  url.searchParams.set("appid", String(APP_ID));
  url.searchParams.set("section", "readytouseitems");
  url.searchParams.set("actualsort", sort);
  url.searchParams.set("browsesort", sort);
  url.searchParams.set("p", "1");
  url.searchParams.set("numperpage", String(LIMIT));
  if (keyword) url.searchParams.set("searchtext", keyword);

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error(`Steam 页面请求失败：HTTP ${res.status}`);
  const html = await res.text();
  const ids = [...html.matchAll(/data-publishedfileid="(\d+)"/g)].map(m => m[1]);
  return [...new Set(ids)].slice(0, LIMIT);
}

async function fetchDetails(ids) {
  const body = new URLSearchParams();
  body.set("itemcount", String(ids.length));
  ids.forEach((id, i) => body.set(`publishedfileids[${i}]`, id));
  const res = await fetch("https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/", {
    method: "POST",
    body
  });
  if (!res.ok) throw new Error(`详情接口失败：HTTP ${res.status}`);
  const data = await res.json();
  const list = data?.response?.publishedfiledetails || [];
  return list.filter(x => x && String(x.result) === "1");
}

function renderCards(items) {
  if (!items.length) {
    renderEmpty("已拿到 ID，但详情接口未返回可用数据");
    return;
  }
  els.list.innerHTML = items.map(item => {
    const id = item.publishedfileid;
    const title = esc(item.title || `Wallpaper ${id}`);
    const thumb = item.preview_url || PLACEHOLDER;
    const subs = num(item.subscriptions || item.lifetime_subscriptions || 0);
    const type = getType(item.tags || []);
    return `
      <div class="card">
        <img class="thumb" src="${thumb}" alt="${title}" loading="lazy" onerror="this.src='${PLACEHOLDER}'">
        <div class="content">
          <div class="title">${title}</div>
          <div class="meta">ID: ${id}</div>
          <div class="meta">类型: ${type} · 订阅: ${subs}</div>
          <div class="actions">
            <a class="a" target="_blank" href="https://steamcommunity.com/sharedfiles/filedetails/?id=${id}">工坊页</a>
            <a class="a" target="_blank" href="steam://openurl/https://steamcommunity.com/sharedfiles/filedetails/?id=${id}">Steam打开</a>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function renderError(err) {
  const msg = esc(err?.message || "未知错误");
  setStatus("加载失败，请检查系统代理");
  els.list.innerHTML = `
    <div class="card err" style="grid-column:1/-1">
      <div class="content">
        <div class="title" style="height:auto;color:#ffb3b3">请求失败</div>
        <div class="meta" style="word-break:break-all">${msg}</div>
        <div class="meta">请确认系统代理可访问 Steam 域名后重试</div>
      </div>
    </div>
  `;
}

function renderEmpty(text) {
  els.list.innerHTML = `
    <div class="card" style="grid-column:1/-1">
      <div class="content">
        <div class="title" style="height:auto">${esc(text)}</div>
      </div>
    </div>
  `;
}

function setStatus(text) {
  els.status.textContent = text;
}

function num(n) {
  const v = Number(n) || 0;
  if (v >= 1e6) return (v / 1e6).toFixed(1) + "M";
  if (v >= 1e3) return (v / 1e3).toFixed(1) + "K";
  return String(v);
}

function getType(tags) {
  const set = new Set(tags.map(t => String((t && t.tag) || t || "").toLowerCase()));
  if (set.has("video")) return "Video";
  if (set.has("scene")) return "Scene";
  if (set.has("web")) return "Web";
  return "Other";
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
