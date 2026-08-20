const videos = [
    {
        id: "us1",
        title: "Lelaki Mengejar Impian",
        file: "videos/us1.MP4",
        poster: "images/us1.jpg",
        views: "17.2M",
        upload: "2 years ago",
        duration: "3:14",
        category: ["memory", "cute"],
        description: "The classic YannieTube upload. Certified iconic.",
        isShort: false,
        isLive: false
    },
    {
        id: "us2",
        title: "Outfit Reveal!",
        file: "videos/us2.MP4",
        poster: "images/us2.jpg",
        views: "8.4M",
        upload: "1 year ago",
        duration: "0:48",
        category: ["outfit", "cute", "short"],
        description: "Outfit reveal because Yannie fashion era is serious.",
        isShort: true,
        isLive: false
    },
    {
        id: "us3",
        title: "uhmmmmmmm..",
        file: "videos/us3.MP4",
        poster: "images/us3.jpg",
        views: "29M",
        upload: "11 months ago",
        duration: "1:09",
        category: ["cute", "memory", "short"],
        description: "No explanation. Just YannieTube chaos.",
        isShort: true,
        isLive: false
    },
    {
        id: "us4",
        title: "Cinema Outfit",
        file: "videos/us4.MP4",
        poster: "images/us4.jpg",
        views: "15.7M",
        upload: "3 months ago",
        duration: "2:02",
        category: ["date", "outfit"],
        description: "Cinema date memory uploaded in 4K inside my heart.",
        isShort: false,
        isLive: false
    }
];

const STORAGE = {
    liked: "yt_liked",
    disliked: "yt_disliked",
    watchLater: "yt_watchLater",
    playlist: "yt_playlist",
    history: "yt_history",
    subscribed: "yt_subscribed",
    comments: "yt_comments"
};

let activeFilter = "all";
let currentLibrary = "history";
let miniPlayerVideo = null;

const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const searchSuggestions = document.getElementById("searchSuggestions");
const videoGrid = document.getElementById("videoGrid");
const subscriptionGrid = document.getElementById("subscriptionGrid");
const shortsFeed = document.getElementById("shortsFeed");
const videoCount = document.getElementById("videoCount");
const emptyState = document.getElementById("emptyState");
const featuredTitle = document.getElementById("featuredTitle");
const featuredMeta = document.getElementById("featuredMeta");
const featuredPlayBtn = document.getElementById("featuredPlayBtn");
const featuredCard = document.querySelector(".featured-card");
const toast = document.getElementById("toast");

function getStore(key) {
    return JSON.parse(localStorage.getItem(key) || "[]");
}

function setStore(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function toggleStore(key, id) {
    const list = getStore(key);

    if (list.includes(id)) {
        setStore(key, list.filter(item => item !== id));
        return false;
    }

    list.push(id);
    setStore(key, list);
    return true;
}

function addToHistory(id) {
    const list = getStore(STORAGE.history).filter(item => item !== id);
    list.unshift(id);
    setStore(STORAGE.history, list.slice(0, 20));
    updateLibraryCounts();
}

function findVideo(id) {
    return videos.find(video => video.id === id);
}

function getDailyVideo() {
    const today = new Date();
    const seed = today.getFullYear() + today.getMonth() + today.getDate();
    return videos[seed % videos.length];
}

function initFeatured() {
    const featured = getDailyVideo();

    featuredTitle.textContent = featured.title;
    featuredMeta.textContent =
        `${featured.views} views • ${featured.upload} • daily recommended memory`;

    featuredCard.style.backgroundImage =
        `linear-gradient(135deg, rgba(255,122,162,.92), rgba(255,190,210,.88)), url("${featured.poster}")`;

    featuredPlayBtn.onclick = () => openWatch(featured);
}

function renderVideos(target = videoGrid, sourceVideos = videos) {
    const query = searchInput.value.trim().toLowerCase();

    const liked = getStore(STORAGE.liked);

    const filtered = sourceVideos.filter(video => {
        const matchesFilter =
            activeFilter === "all" ||
            video.category.includes(activeFilter) ||
            (activeFilter === "favourite" && liked.includes(video.id));

        const text = [
            video.title,
            video.description,
            video.views,
            video.upload,
            ...video.category
        ].join(" ").toLowerCase();

        return matchesFilter && text.includes(query);
    });

    target.innerHTML = "";

    filtered.forEach(video => {
        target.appendChild(createVideoCard(video));
    });

    if (target === videoGrid) {
        videoCount.textContent =
            `${filtered.length} ${filtered.length === 1 ? "video" : "videos"}`;

        emptyState.style.display = filtered.length ? "none" : "block";
    }
}

function createVideoCard(video) {
    const card = document.createElement("article");
    card.className = "video-card";

    const liked = getStore(STORAGE.liked).includes(video.id);
    const watchLater = getStore(STORAGE.watchLater).includes(video.id);

    card.innerHTML = `
        <div class="thumbnail-wrap">
            <video
                src="${video.file}"
                poster="${video.poster}"
                muted
                preload="metadata"
                playsinline
            ></video>

            ${video.isLive ? `<span class="live-badge">LIVE</span>` : ""}
            <span class="duration">${video.duration}</span>
        </div>

        <div class="video-info">
            <img
                src="images/us1.jpg"
                class="video-pfp"
                alt="YannieTube profile"
            >

            <div>
                <h3>${video.title}</h3>
                <p>YannieTube • ${video.views} views • ${video.upload}</p>

                <div class="video-tags">
                    ${video.category.map(tag => `<span>#${tag}</span>`).join("")}
                </div>
            </div>

            <button
                class="card-menu"
                type="button"
                aria-label="Video menu"
            >
                ⋮
            </button>
        </div>
    `;

    const preview = card.querySelector("video");

    card.addEventListener("mouseenter", () => {
        preview.play().catch(() => {});
    });

    card.addEventListener("mouseleave", () => {
        preview.pause();
        preview.currentTime = 0;
    });

    card.addEventListener("click", event => {
        if (event.target.closest(".card-menu")) {
            event.stopPropagation();

            const saved = toggleStore(STORAGE.watchLater, video.id);

            showToast(
                saved
                    ? `Saved "${video.title}" to Watch Later ⏰`
                    : `Removed "${video.title}" from Watch Later`
            );

            updateLibraryCounts();
            return;
        }

        openWatch(video);
    });

    return card;
}

function renderShorts() {
    shortsFeed.innerHTML = "";

    videos
        .filter(video => video.isShort)
        .forEach(video => {
            const card = document.createElement("article");
            card.className = "short-card";

            card.innerHTML = `
                <video
                    src="${video.file}"
                    poster="${video.poster}"
                    muted
                    loop
                    playsinline
                    preload="metadata"
                ></video>

                <div class="short-actions">
                    <button type="button" data-action="like">❤️</button>
                    <button type="button" data-action="comment">💬</button>
                    <button type="button" data-action="share">↗</button>
                </div>

                <div class="short-overlay">
                    <h2>${video.title}</h2>
                    <p>@YannieTube • ${video.views} views</p>
                </div>
            `;

            const vid = card.querySelector("video");

            card.addEventListener("click", event => {
                const button = event.target.closest("button");

                if (button) {
                    const action = button.dataset.action;

                    if (action === "like") {
                        toggleStore(STORAGE.liked, video.id);
                        showToast("Short liked ❤️");
                    }

                    if (action === "comment") {
                        openWatch(video);
                    }

                    if (action === "share") {
                        showToast("Shared to Queque’s heart 💌");
                    }

                    return;
                }

                if (vid.paused) {
                    vid.play().catch(() => {});
                    showToast("Playing short 🎬");
                } else {
                    vid.pause();
                    showToast("Paused");
                }
            });

            shortsFeed.appendChild(card);
        });
}

function openWatch(video) {
    addToHistory(video.id);

    const params = new URLSearchParams({
        id: video.id,
        video: video.file,
        title: video.title,
        views: video.views,
        upload: video.upload,
        poster: video.poster,
        description: video.description,
        duration: video.duration
    });

    location.href = `watch.html?${params.toString()}`;
}

function showPage(page) {
    document.querySelectorAll(".page").forEach(item => {
        item.classList.remove("active");
    });

    document.getElementById(`${page}Page`).classList.add("active");

    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.toggle("active", item.dataset.page === page);
    });

    if (page === "shorts") {
        renderShorts();
        showToast("Shorts mode unlocked 🎬");
    }

    if (page === "subscriptions") {
        subscriptionGrid.innerHTML = "";
        videos.forEach(video => {
            subscriptionGrid.appendChild(createVideoCard(video));
        });
    }

    if (page === "library") {
        renderLibrary(currentLibrary);
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => {
        showPage(item.dataset.page);
    });
});

document.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
        document.querySelectorAll(".chip").forEach(item => {
            item.classList.remove("active");
        });

        chip.classList.add("active");
        activeFilter = chip.dataset.filter;
        renderVideos();
    });
});

const suggestions = [
    "love",
    "call",
    "date",
    "outfit",
    "cinema",
    "cute",
    "memory",
    "first date",
    "yannie"
];

function renderSuggestions() {
    searchSuggestions.innerHTML = "";

    suggestions.forEach(item => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "suggestion";
        btn.textContent = item;

        btn.addEventListener("click", () => {
            searchInput.value = item;
            clearSearchBtn.style.display = "grid";
            renderVideos();
            secretSearch(item);
        });

        searchSuggestions.appendChild(btn);
    });
}

searchInput.addEventListener("input", () => {
    const value = searchInput.value.trim().toLowerCase();
    clearSearchBtn.style.display = value ? "grid" : "none";
    renderVideos();
    secretSearch(value);
});

clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    clearSearchBtn.style.display = "none";
    renderVideos();
});

let secretLock = "";

function secretSearch(value) {
    if (!value || value === secretLock) return;

    secretLock = value;

    if (value.includes("love")) {
        showToast("Search result: Yannie. Always Yannie. 💗");
    } else if (value.includes("call")) {
        showToast("Secret archive: first long call memory 📞");
    } else if (value.includes("date")) {
        showToast("Date archive loading... more uploads coming soon 🌸");
    } else if (value.includes("yannie")) {
        showToast("YannieTube algorithm says: perfect girl detected.");
    }
}

document.getElementById("subscribeBtn").addEventListener("click", event => {
    const subscribed = localStorage.getItem(STORAGE.subscribed) === "true";
    localStorage.setItem(STORAGE.subscribed, String(!subscribed));

    updateSubscribeButton();

    showToast(
        !subscribed
            ? "Subscribed to YannieTube with all notifications on 🔔"
            : "Unsubscribed? Fake. You are still emotionally subscribed."
    );
});

document.getElementById("joinBtn").addEventListener("click", () => {
    showToast("Joined Queque Premium: unlimited love, no ads 💗");
});

document.getElementById("notificationBtn").addEventListener("click", () => {
    showToast("Notifications: YannieTube misses you today 🥺");
});

document.getElementById("backBtn").addEventListener("click", () => {
    history.back();
});

function updateSubscribeButton() {
    const btn = document.getElementById("subscribeBtn");
    const subscribed = localStorage.getItem(STORAGE.subscribed) === "true";

    btn.classList.toggle("subscribed", subscribed);
    btn.textContent = subscribed ? "Subscribed ✓" : "Subscribe";
}

document.querySelectorAll(".library-card").forEach(card => {
    card.addEventListener("click", () => {
        currentLibrary = card.dataset.library;
        renderLibrary(currentLibrary);
    });
});

function renderLibrary(type) {
    const titles = {
        history: ["History", "Recently watched"],
        liked: ["Liked videos", "Videos you hearted"],
        watchLater: ["Watch Later", "Saved to watch again"],
        playlist: ["Favourite Memories", "Your saved memories"]
    };

    document.getElementById("libraryTitle").textContent = titles[type][0];
    document.getElementById("librarySubtitle").textContent = titles[type][1];

    const keyMap = {
        history: STORAGE.history,
        liked: STORAGE.liked,
        watchLater: STORAGE.watchLater,
        playlist: STORAGE.playlist
    };

    const ids = getStore(keyMap[type]);
    const selectedVideos = ids.map(findVideo).filter(Boolean);

    const grid = document.getElementById("libraryGrid");
    const empty = document.getElementById("libraryEmpty");

    grid.innerHTML = "";
    selectedVideos.forEach(video => grid.appendChild(createVideoCard(video)));

    empty.style.display = selectedVideos.length ? "none" : "block";
}

function updateLibraryCounts() {
    document.getElementById("historyCount").textContent =
        `${getStore(STORAGE.history).length} watched`;

    document.getElementById("likedCount").textContent =
        `${getStore(STORAGE.liked).length} liked`;

    document.getElementById("watchLaterCount").textContent =
        `${getStore(STORAGE.watchLater).length} saved`;

    document.getElementById("playlistCount").textContent =
        `${getStore(STORAGE.playlist).length} saved`;
}

document.getElementById("createBtn").addEventListener("click", () => {
    document.getElementById("uploadModal").classList.add("active");
});

document.getElementById("closeUploadBtn").addEventListener("click", () => {
    document.getElementById("uploadModal").classList.remove("active");
});

document.getElementById("fakeUploadBtn").addEventListener("click", () => {
    const title = document.getElementById("uploadTitle").value.trim();
    const status = document.getElementById("uploadStatus");

    if (!title) {
        status.textContent = "Give the memory a title first 🥺";
        return;
    }

    status.textContent = "Uploading memory...";

    setTimeout(() => {
        status.textContent = "Processing cuteness...";
    }, 900);

    setTimeout(() => {
        status.textContent = "Upload complete. Queque approved 💗";
        showToast("Fake upload complete: memory saved in heart.");
    }, 1800);
});

function openMiniPlayer(video) {
    miniPlayerVideo = video;

    const mini = document.getElementById("miniPlayer");
    const videoEl = document.getElementById("miniVideo");

    document.getElementById("miniTitle").textContent = video.title;
    videoEl.src = video.file;
    videoEl.poster = video.poster;
    videoEl.play().catch(() => {});

    mini.classList.add("active");
}

document.getElementById("miniOpenBtn").addEventListener("click", () => {
    if (miniPlayerVideo) {
        openWatch(miniPlayerVideo);
    }
});

document.getElementById("miniCloseBtn").addEventListener("click", () => {
    document.getElementById("miniPlayer").classList.remove("active");
    document.getElementById("miniVideo").pause();
});

const flowers = ["🌸", "🌷", "🌼", "💗", "✨"];

function createFlower() {
    const flower = document.createElement("div");

    flower.className = "floatingFlower";
    flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    flower.style.left = Math.random() * 100 + "vw";
    flower.style.animationDuration = (9 + Math.random() * 7) + "s";
    flower.style.fontSize = (18 + Math.random() * 18) + "px";

    document.getElementById("flowerBackground").appendChild(flower);

    setTimeout(() => {
        flower.remove();
    }, 17000);
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);
}

setInterval(createFlower, 1700);

renderSuggestions();
initFeatured();
renderVideos();
renderShorts();
updateSubscribeButton();
updateLibraryCounts();
