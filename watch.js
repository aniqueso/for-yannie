const allVideos = [
    {
        id: "us1",
        title: "Lelaki Mengejar Impian",
        file: "videos/us1.MP4",
        poster: "images/us1.jpg",
        views: "17.2M",
        upload: "2 years ago",
        duration: "3:14",
        description: "The classic YannieTube upload. Certified iconic."
    },
    {
        id: "us2",
        title: "Outfit Reveal!",
        file: "videos/us2.MP4",
        poster: "images/us2.jpg",
        views: "8.4M",
        upload: "1 year ago",
        duration: "0:48",
        description: "Outfit reveal because Yannie fashion era is serious."
    },
    {
        id: "us3",
        title: "uhmmmmmmm..",
        file: "videos/us3.MP4",
        poster: "images/us3.jpg",
        views: "29M",
        upload: "11 months ago",
        duration: "1:09",
        description: "No explanation. Just YannieTube chaos."
    },
    {
        id: "us4",
        title: "Cinema Outfit",
        file: "videos/us4.MP4",
        poster: "images/us4.jpg",
        views: "15.7M",
        upload: "3 months ago",
        duration: "2:02",
        description: "Cinema date memory uploaded in 4K inside my heart."
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

const params = new URLSearchParams(location.search);

const currentVideo = {
    id: params.get("id") || "us1",
    file: params.get("video") || "videos/us1.MP4",
    title: params.get("title") || "YannieTube Video",
    views: params.get("views") || "17.3M",
    upload: params.get("upload") || "recently",
    poster: params.get("poster") || "images/us1.jpg",
    description:
        params.get("description") ||
        "A saved memory from YannieTube, uploaded with too much love."
};

const mainVideo = document.getElementById("mainVideo");
const videoTitle = document.getElementById("videoTitle");
const videoMeta = document.getElementById("videoMeta");
const videoDescription = document.getElementById("videoDescription");
const toast = document.getElementById("toast");
const commentList = document.getElementById("commentList");
const commentInput = document.getElementById("commentInput");
const commentSort = document.getElementById("commentSort");

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
}

function initVideo() {
    mainVideo.src = currentVideo.file;
    mainVideo.poster = currentVideo.poster;
    videoTitle.textContent = currentVideo.title;
    videoMeta.textContent = `${currentVideo.views} views • ${currentVideo.upload}`;
    videoDescription.textContent = currentVideo.description;

    addToHistory(currentVideo.id);
    updateActionButtons();
    updateSubscribeButton();
    renderComments();
    renderRecommended();
}

function updateActionButtons() {
    document.getElementById("likeBtn").classList.toggle(
        "active",
        getStore(STORAGE.liked).includes(currentVideo.id)
    );

    document.getElementById("dislikeBtn").classList.toggle(
        "active",
        getStore(STORAGE.disliked).includes(currentVideo.id)
    );

    document.getElementById("saveBtn").classList.toggle(
        "active",
        getStore(STORAGE.playlist).includes(currentVideo.id)
    );
}

document.getElementById("likeBtn").addEventListener("click", () => {
    const liked = toggleStore(STORAGE.liked, currentVideo.id);

    if (liked) {
        setStore(
            STORAGE.disliked,
            getStore(STORAGE.disliked).filter(id => id !== currentVideo.id)
        );
    }

    updateActionButtons();

    showToast(liked ? "Liked. YannieTube approves ❤️" : "Like removed");
});

document.getElementById("dislikeBtn").addEventListener("click", () => {
    const disliked = toggleStore(STORAGE.disliked, currentVideo.id);

    if (disliked) {
        setStore(
            STORAGE.liked,
            getStore(STORAGE.liked).filter(id => id !== currentVideo.id)
        );
    }

    updateActionButtons();

    showToast(disliked ? "Dislike? Impossible but okay 😭" : "Dislike removed");
});

document.getElementById("saveBtn").addEventListener("click", () => {
    const saved = toggleStore(STORAGE.playlist, currentVideo.id);
    updateActionButtons();

    showToast(
        saved
            ? "Saved to Favourite Memories 🌸"
            : "Removed from Favourite Memories"
    );
});

document.getElementById("shareBtn").addEventListener("click", shareVideo);
document.getElementById("shareTopBtn").addEventListener("click", shareVideo);

function shareVideo() {
    if (navigator.share) {
        navigator.share({
            title: currentVideo.title,
            text: "Watch this cute YannieTube memory 💗",
            url: location.href
        }).catch(() => {
            showToast("Share cancelled");
        });
    } else {
        navigator.clipboard?.writeText(location.href);
        showToast("Link copied to clipboard 💌");
    }
}

document.getElementById("downloadBtn").addEventListener("click", () => {
    showToast("Download simulated. Saved directly to heart storage 💗");
});

document.getElementById("replayBtn").addEventListener("click", () => {
    mainVideo.currentTime = 0;
    mainVideo.play();
    showToast("Replaying because this one matters 🎬");
});

document.getElementById("subscribeBtn").addEventListener("click", () => {
    const subscribed = localStorage.getItem(STORAGE.subscribed) === "true";
    localStorage.setItem(STORAGE.subscribed, String(!subscribed));
    updateSubscribeButton();

    showToast(
        !subscribed
            ? "Subscribed with all notifications on 🔔"
            : "Unsubscribed? Emotionally impossible."
    );
});

function updateSubscribeButton() {
    const btn = document.getElementById("subscribeBtn");
    const subscribed = localStorage.getItem(STORAGE.subscribed) === "true";

    btn.classList.toggle("subscribed", subscribed);
    btn.textContent = subscribed ? "Subscribed ✓" : "Subscribe";
}

const defaultComments = [
    {
        name: "queque ❤️",
        text: "This video deserves unlimited replays.",
        time: Date.now() - 999999
    },
    {
        name: "YannieTube Official",
        text: "Certified cute memory archived forever 🌸",
        time: Date.now() - 888888
    },
    {
        name: "Mofusand Cat",
        text: "meow meow approved 🐱",
        time: Date.now() - 777777
    }
];

function getSavedComments() {
    const all = JSON.parse(localStorage.getItem(STORAGE.comments) || "{}");
    return all[currentVideo.id] || [];
}

function setSavedComments(comments) {
    const all = JSON.parse(localStorage.getItem(STORAGE.comments) || "{}");
    all[currentVideo.id] = comments;
    localStorage.setItem(STORAGE.comments, JSON.stringify(all));
}

function renderComments() {
    let comments = [...defaultComments, ...getSavedComments()];

    if (commentSort.value === "new") {
        comments.sort((a, b) => b.time - a.time);
    }

    commentList.innerHTML = "";

    comments.forEach((comment, index) => {
        const div = document.createElement("div");
        div.className = "comment";

        div.innerHTML = `
            <strong>${comment.name}</strong>
            <p>${comment.text}</p>

            <div class="comment-actions">
                <button type="button">Like</button>
                <button type="button">Reply</button>
            </div>
        `;

        div.querySelectorAll("button")[0].addEventListener("click", () => {
            showToast("Comment liked 💗");
        });

        div.querySelectorAll("button")[1].addEventListener("click", () => {
            commentInput.value = `@${comment.name} `;
            commentInput.focus();
        });

        commentList.appendChild(div);
    });
}

document.getElementById("commentBtn").addEventListener("click", postComment);

commentInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        postComment();
    }
});

commentSort.addEventListener("change", renderComments);

function postComment() {
    const text = commentInput.value.trim();

    if (!text) {
        showToast("Write something cute first 🥺");
        return;
    }

    const comments = getSavedComments();

    comments.push({
        name: "Yannie 💗",
        text,
        time: Date.now()
    });

    setSavedComments(comments);

    commentInput.value = "";
    renderComments();
    showToast("Comment posted on YannieTube 💬");
}

function renderRecommended() {
    const grid = document.getElementById("recommendedGrid");

    grid.innerHTML = "";

    allVideos
        .filter(video => video.id !== currentVideo.id)
        .forEach(video => {
            const card = document.createElement("article");
            card.className = "recommend-card";

            card.innerHTML = `
                <img src="${video.poster}" alt="${video.title}">
                <div>
                    <h3>${video.title}</h3>
                    <p>YannieTube • ${video.views} views</p>
                </div>
            `;

            card.addEventListener("click", () => {
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
            });

            grid.appendChild(card);
        });
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);
}

initVideo();
