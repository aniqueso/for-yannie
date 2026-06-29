const STORAGE_KEY = "yanniegram_state_v7";

const YG_ASSETS = {
    yannieAvatar: "images/yanniegram/profile-yannie.jpg",
    aniqAvatar: "images/yanniegram/profile-aniq-iskandar.jpg",
    mofusandAvatar: "images/yanniegram/profile-mofusand.png",
    yanniefyAvatar: "images/yanniegram/profile-yanniefy.png",
    yannietubeAvatar: "images/yanniegram/profile-yannietube.png",
    cuteNotesAvatar: "images/yanniegram/profile-cute-notes.png",
    princessAvatar: "images/yanniegram/profile-princess-diary.png",
    prettyAvatar: "images/yanniegram/profile-pretty-reminders.png",
    softGalleryAvatar: "images/yanniegram/profile-soft-gallery.png"
};

const socialPeople = [
    { name: "Anique", handle: "@anique.notes", avatar: YG_ASSETS.aniqAvatar },
    { name: "Aniq Iskandar", handle: "@anique.iskandar", avatar: YG_ASSETS.aniqAvatar },
    { name: "Aniq", handle: "@aniq.for.yannie", avatar: YG_ASSETS.aniqAvatar },
    { name: "Iskandar", handle: "@iskandar.memo", avatar: YG_ASSETS.aniqAvatar },
    { name: "Mofusand Cat", handle: "@mofusand.guardian", avatar: YG_ASSETS.mofusandAvatar },
    { name: "YannieFy", handle: "@yanniefy.official", avatar: YG_ASSETS.yanniefyAvatar },
    { name: "YannieTube", handle: "@yannietube", avatar: YG_ASSETS.yannietubeAvatar },
    { name: "Cute Notes", handle: "@sayangg.notes", avatar: YG_ASSETS.cuteNotesAvatar },
    { name: "Princess Diary", handle: "@princess.diary", avatar: YG_ASSETS.princessAvatar },
    { name: "Pretty Reminders", handle: "@pretty.reminders", avatar: YG_ASSETS.prettyAvatar },
    { name: "Soft Gallery", handle: "@babyy.gallery", avatar: YG_ASSETS.softGalleryAvatar }
];

const defaultStories = [
    {
        id: "story-01",
        user: "Anique",
        avatar: YG_ASSETS.aniqAvatar,
        media: "images/yanniegram/story-01.jpg",
        kicker: "for yannie only",
        title: "Yannie, holding flowers.",
        text: "A lovable girl.",
        time: "4m",
        music: "music/song2.mp3",
        musicName: "Ingat"
    },
    {
        id: "story-02",
        user: "Cute Notes",
        avatar: YG_ASSETS.cuteNotesAvatar,
        media: "images/yanniegram/story-02.jpg",
        kicker: "close friends",
        title: "Babyy reminder ✨",
        text: "Drink water, rest your eyes, and remember that you are loved very gently today.",
        time: "9m",
        music: "music/song3.mp3",
        musicName: "Pulang"
    },
    {
        id: "story-03",
        user: "Mofusand Cat",
        avatar: YG_ASSETS.mofusandAvatar,
        media: "images/yanniegram/story-03.jpg",
        kicker: "guardian mode",
        title: "Mofusand duty 🐱",
        text: "Mofusand is guarding the app, the inbox, and all the soft notifications from Aniq.",
        time: "12m",
        music: "music/song1.mp3",
        musicName: "Rahsia Tuhan"
    },
    {
        id: "story-04",
        user: "Aniq",
        avatar: YG_ASSETS.aniqAvatar,
        media: "images/yanniegram/story-04.jpg",
        kicker: "private note",
        title: "Pretty girl note 🌸",
        text: "This app is not trying to be loud. It just quietly says: you are precious, pretty, and special.",
        time: "22m",
        music: "music/song9.mp3",
        musicName: "Bintang"
    },
    {
        id: "story-05",
        user: "Princess Diary",
        avatar: YG_ASSETS.princessAvatar,
        media: "images/yanniegram/story-05.jpg",
        kicker: "soft mode",
        title: "Princess energy 👑",
        text: "A tiny corner for soft pink, cocoa brown, cute photos, gentle music, and princess treatment.",
        time: "31m",
        music: "music/song7.mp3",
        musicName: "Mengejar Rindu"
    },
    {
        id: "story-06",
        user: "YannieFy",
        avatar: YG_ASSETS.yanniefyAvatar,
        media: "images/yanniegram/story-06.jpg",
        kicker: "music sticker",
        title: "Add music, babyy 🎵",
        text: "Stories can use YannieFy songs. Pick a track, post a picture, and make it feel alive.",
        time: "47m",
        music: "music/song10.mp3",
        musicName: "Cinta Muka Buku"
    },
    {
        id: "story-07",
        user: "Pretty Reminders",
        avatar: YG_ASSETS.prettyAvatar,
        media: "images/yanniegram/story-07.jpg",
        kicker: "tiny message",
        title: "You are enough 🤍",
        text: "Even on quiet days, tired days, or overthinking days, you are still easy to love.",
        time: "1h",
        music: "music/Firasat.mp3",
        musicName: "Firasat"
    }
];

const defaultPosts = [
    {
        id: "post-1",
        user: "Anique",
        handle: "@anique.notes",
        avatar: YG_ASSETS.aniqAvatar,
        media: "images/yanniegram/post-01.jpg",
        type: "image",
        title: "For Yannie",
        location: "Close Friends",
        caption: "Do you remember our first real planned outing, babyyy? I wore the outfit that you bought for me!",
        tags: ["sayangg", "cute", "aniq"],
        likes: 1289,
        time: "2 hours ago",
        comments: [
            { name: "Mofusand Cat", text: "Meow. Soft post approved." },
            { name: "Anique", text: "Very, very special moment 💗" }
        ]
    },
    {
        id: "post-2",
        user: "Cutie Yannie",
        handle: "@sayangg.only",
        avatar: YG_ASSETS.cuteNotesAvatar,
        media: "images/yanniegram/post-02.jpg",
        type: "image",
        title: "Beautiful Girl.",
        location: "Soft Reminder Board",
        caption: "Tiny reminder: you do not need to be perfect today. Just breathe slowly, babyy.",
        tags: ["sayangg", "soft", "reminder"],
        likes: 984,
        time: "5 hours ago",
        comments: [
            { name: "Aniq", text: "Soft treatment only." },
            { name: "Princess Diary", text: "Reminder saved." }
        ]
    },
    {
        id: "post-3",
        user: "Mofusand Cat",
        handle: "@mofusand.guardian",
        avatar: YG_ASSETS.mofusandAvatar,
        media: "images/yanniegram/post-03.jpg",
        type: "image",
        title: "Mofusand Guardian",
        location: "YannieGram Protection Squad",
        caption: "Mofusand has entered the app to guard the inbox, stories, reactions, and all cute reminders.",
        tags: ["mofusand", "cat", "guardian"],
        likes: 1730,
        time: "yesterday",
        comments: [
            { name: "Anique", text: "Official guardian appointed 🐱" },
            { name: "YannieFy", text: "Meow soundtrack loading." }
        ]
    },
    {
        id: "post-4",
        user: "Princess Diary",
        handle: "@princess.diary",
        avatar: YG_ASSETS.princessAvatar,
        media: "images/yanniegram/post-04.jpg",
        type: "image",
        title: "Princess Treatment",
        location: "Private Little World",
        caption: "For princess days, tired days, happy days, and the days where she just needs to feel loved gently.",
        tags: ["princess", "babyy", "pretty"],
        likes: 1904,
        time: "2 days ago",
        comments: [
            { name: "Aniq Iskandar", text: "This is the correct treatment." },
            { name: "Pretty Reminders", text: "Soft mode activated." }
        ]
    },
    {
        id: "post-5",
        user: "Pretty Reminders",
        handle: "@pretty.reminders",
        avatar: YG_ASSETS.prettyAvatar,
        media: "images/yanniegram/post-05.jpg",
        type: "image",
        title: "Pretty Girl Reminder",
        location: "Daily Soft Board",
        caption: "Pretty girl reminder: your smile is precious, your heart matters, and you deserve a gentle day.",
        tags: ["pretty", "cute", "reminder"],
        likes: 1210,
        time: "1 week ago",
        comments: [
            { name: "Mofusand Cat", text: "Meow meow approved." },
            { name: "Anique", text: "I agree with this whole post." }
        ]
    },
    {
        id: "post-6",
        user: "YannieFy",
        handle: "@yanniefy.official",
        avatar: YG_ASSETS.yanniefyAvatar,
        media: "images/yanniegram/post-06.jpg",
        type: "image",
        title: "Story Music Ready",
        location: "Now Playing",
        caption: "Pick a song, add it to a story, and make the post feel like a tiny music video.",
        tags: ["music", "story", "cute"],
        likes: 2206,
        time: "1 week ago",
        comments: [
            { name: "Anique", text: "Every song somehow becomes about her." },
            { name: "YannieTube", text: "Crossover ready." }
        ]
    },
    {
        id: "post-7",
        user: "Soft Gallery",
        handle: "@babyy.gallery",
        avatar: YG_ASSETS.softGalleryAvatar,
        media: "images/yanniegram/post-07.jpg",
        type: "image",
        title: "Babyy Gallery Slot",
        location: "Cammemory Roll Placeholder",
        caption: "Replace this with your real photo later. The app is ready for actual Yannie memories.",
        tags: ["babyy", "gallery", "memory"],
        likes: 1606,
        time: "1 week ago",
        comments: [
            { name: "Aniq", text: "Waiting for the real photo, sayangg." },
            { name: "Cute Notes", text: "Placeholder but still cute." }
        ]
    },
    {
        id: "post-8",
        user: "YannieTube",
        handle: "@yannietube",
        avatar: YG_ASSETS.yannietubeAvatar,
        media: "images/yanniegram/post-08.jpg",
        type: "image",
        title: "Reel Slot Ready",
        location: "Video Placeholder",
        caption: "Upload your own reel later and this space becomes part of the private app world.",
        tags: ["reels", "video", "mofusand"],
        likes: 1739,
        time: "2 weeks ago",
        comments: [
            { name: "Mofusand Cat", text: "Video guarded." },
            { name: "Anique", text: "I will replace this with real memories soon." }
        ]
    }
];

const defaultReels = [
    { id: "reel-1", user: "Anique", handle: "@anique.notes", avatar: YG_ASSETS.aniqAvatar, title: "For Yannie Reel", src: "videos/yanniegram/reel-01.mp4", poster: "images/yanniegram/reel-01-poster.jpg", caption: "Replace this with your real reel later. Soft layout is ready.", sound: "original sound - Anique", likes: 17200 },
    { id: "reel-2", user: "Mofusand Cat", handle: "@mofusand.guardian", avatar: YG_ASSETS.mofusandAvatar, title: "Mofusand Guard", src: "videos/yanniegram/reel-02.mp4", poster: "images/yanniegram/reel-02-poster.jpg", caption: "Mofusand keeps this app cute and safe.", sound: "meow meow audio", likes: 8400 },
    { id: "reel-3", user: "Cute Notes", handle: "@sayangg.notes", avatar: YG_ASSETS.cuteNotesAvatar, title: "Sayangg Reminder", src: "videos/yanniegram/reel-03.mp4", poster: "images/yanniegram/reel-03-poster.jpg", caption: "A reel slot for a cute reminder video.", sound: "YannieFy • Ingat", likes: 29000 },
    { id: "reel-4", user: "Princess Diary", handle: "@princess.diary", avatar: YG_ASSETS.princessAvatar, title: "Princess Mode", src: "videos/yanniegram/reel-04.mp4", poster: "images/yanniegram/reel-04-poster.jpg", caption: "Soft princess treatment, but make it a reel.", sound: "YannieFy • Pulang", likes: 15700 },
    { id: "reel-5", user: "Pretty Reminders", handle: "@pretty.reminders", avatar: YG_ASSETS.prettyAvatar, title: "Pretty Girl Note", src: "videos/yanniegram/reel-05.mp4", poster: "images/yanniegram/reel-05-poster.jpg", caption: "A reel for pretty reminders and soft edits.", sound: "YannieGram audio", likes: 11300 },
    { id: "reel-6", user: "YannieFy", handle: "@yanniefy.official", avatar: YG_ASSETS.yanniefyAvatar, title: "Music Sticker", src: "videos/yanniegram/reel-06.mp4", poster: "images/yanniegram/reel-06-poster.jpg", caption: "A reel slot for music memories.", sound: "YannieFy • Bintang", likes: 9800 },
    { id: "reel-7", user: "Soft Gallery", handle: "@babyy.gallery", avatar: YG_ASSETS.softGalleryAvatar, title: "Babyy Gallery", src: "videos/yanniegram/reel-07.mp4", poster: "images/yanniegram/reel-07-poster.jpg", caption: "Replace with a real gallery reel later.", sound: "aesthetic audio", likes: 9300 },
    { id: "reel-8", user: "Aniq", handle: "@aniq.for.yannie", avatar: YG_ASSETS.aniqAvatar, title: "Private Reminder", src: "videos/yanniegram/reel-08.mp4", poster: "images/yanniegram/reel-08-poster.jpg", caption: "A private reel from Aniq for Yannie.", sound: "original sound - Aniq", likes: 18100 },
    { id: "reel-9", user: "YannieTube", handle: "@yannietube", avatar: YG_ASSETS.yannietubeAvatar, title: "Memory Video Slot", src: "videos/yanniegram/reel-09.mp4", poster: "images/yanniegram/reel-09-poster.jpg", caption: "A reel slot for a YannieTube-style memory.", sound: "YannieTube original audio", likes: 22400 },
    { id: "reel-10", user: "Iskandar", handle: "@iskandar.memo", avatar: YG_ASSETS.aniqAvatar, title: "Quiet Promise", src: "videos/yanniegram/reel-10.mp4", poster: "images/yanniegram/reel-10-poster.jpg", caption: "A soft future reminder, still private.", sound: "quiet promise - Iskandar", likes: 20100 },
    { id: "reel-11", user: "Cute Notes", handle: "@sayangg.notes", avatar: YG_ASSETS.cuteNotesAvatar, title: "Babyy Smile", src: "videos/yanniegram/reel-11.mp4", poster: "images/yanniegram/reel-11-poster.jpg", caption: "A cute slot for a smile video.", sound: "soft reminder", likes: 14300 },
    { id: "reel-12", user: "Anique", handle: "@anique.notes", avatar: YG_ASSETS.aniqAvatar, title: "Goodnight Sayang", src: "videos/yanniegram/reel-12.mp4", poster: "images/yanniegram/reel-12-poster.jpg", caption: "A goodnight reel placeholder for Yannie.", sound: "goodnight - Anique", likes: 19900 }
];

const defaultChats = [
    {
        id: "chat-aniq",
        name: "Anique / Aniq 💗",
        avatar: YG_ASSETS.aniqAvatar,
        status: "active now • private chat for Yannie",
        time: "now",
        pinned: true,
        messages: [
            { from: "aniq", sender: "Anique", text: "Hai sayangg. This inbox is from me — Anique, Aniq Iskandar, your Aniq — so you can open soft reminders anytime." },
            { from: "aniq", sender: "Anique", text: "No random people here. Just you, me, Mofusand, music, cute posts, and tiny reminders for my pretty girl." },
            { from: "aniq", sender: "Anique", text: "If you post a story here, add music. I want this little app to feel alive for you, babyy." }
        ]
    },
    {
        id: "chat-mofusand",
        name: "Mofusand Cat 🐱",
        avatar: YG_ASSETS.mofusandAvatar,
        status: "guarding soft notifications",
        time: "12m",
        messages: [
            { from: "them", sender: "Mofusand Cat", text: "Meow. I am guarding this app while Aniq is not beside you." },
            { from: "aniq", sender: "Anique", text: "If you feel sad, open my chat. Aniq left soft treatment there." }
        ]
    },
    {
        id: "chat-yanniefy",
        name: "YannieFy Official",
        avatar: YG_ASSETS.yanniefyAvatar,
        status: "music stickers ready",
        time: "18m",
        messages: [
            { from: "them", sender: "YannieFy", text: "Story music is available now. Try Ingat, Pulang, Bintang, or Mengejar Rindu 🎵" },
            { from: "aniq", sender: "Anique", text: "Aniq added these songs because stories feel better with music." }
        ]
    },
    {
        id: "chat-cute-notes",
        name: "Cute Notes 💗",
        avatar: YG_ASSETS.cuteNotesAvatar,
        status: "sayangg reminders ready",
        time: "40m",
        messages: [
            { from: "them", sender: "Cute Notes", text: "Sayangg reminder: rest your eyes and do not carry everything alone today." },
            { from: "aniq", sender: "Anique", text: "You deserve soft treatment even on normal days." }
        ]
    },
    {
        id: "chat-princess",
        name: "Princess Diary 👑",
        avatar: YG_ASSETS.princessAvatar,
        status: "pretty reminders only",
        time: "2h",
        messages: [
            { from: "them", sender: "Princess Diary", text: "Princess mode is active. No stress allowed for too long." },
            { from: "aniq", sender: "Anique", text: "My pretty girl deserves gentle days, babyy." }
        ]
    }
];

const suggestions = ["aniq", "anique", "mofusand", "sayangg", "babyy", "princess", "pretty", "cute", "music", "story", "love", "goodnight"];

const storyMusicTracks = {
    "music/song1.mp3": "Rahsia Tuhan",
    "music/song2.mp3": "Ingat",
    "music/song3.mp3": "Pulang",
    "music/song7.mp3": "Mengejar Rindu",
    "music/song8.mp3": "Bahagiamu Deritaku",
    "music/song9.mp3": "Bintang",
    "music/song10.mp3": "Cinta Muka Buku",
    "music/Firasat.mp3": "Firasat"
};

const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));

function cloneData(value) {
    return JSON.parse(JSON.stringify(value));
}

function esc(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function loadState() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (saved && Array.isArray(saved.posts)) {
            return {
                posts: saved.posts,
                stories: saved.stories || [],
                liked: saved.liked || [],
                saved: saved.saved || [],
                notifications: saved.notifications || [],
                chats: saved.chats || cloneData(defaultChats),
                theme: saved.theme || "pink",
                unread: saved.unread || 0,
                storyReactions: saved.storyReactions || []
            };
        }
    } catch (error) {
        console.warn("Could not load YannieGram state", error);
    }

    return {
        posts: cloneData(defaultPosts),
        stories: [],
        liked: [],
        saved: [],
        notifications: [
            { from: "Anique", text: "left a private reminder in your Inbox 💌", time: "2m" },
            { from: "Mofusand Cat", text: "is guarding your story cammemory 🐱", time: "8m" },
            { from: "YannieFy", text: "added Bintang to your Story music options 🎵", time: "14m" },
            { from: "Pretty Reminders", text: "sent a pretty reminder 🌸", time: "26m" },
            { from: "Memory Vault", text: "prepared new blank reel slots for Anique to replace later.", time: "1h" }
        ],
        chats: cloneData(defaultChats),
        theme: "pink",
        unread: 3,
        storyReactions: []
    };
}

let state = loadState();
let currentPage = "home";
let currentStoryIndex = 0;
let currentCommentsPostId = null;
let currentChatId = state.chats[0]?.id || "chat-aniq";
let activeProfileTab = "posts";
let draftImage = "";
let notificationTimer = null;

let storyBaseImage = null;
let storyStrokes = [];
let activeStroke = null;
let storyCanvasReady = false;

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function vibrate(ms = 12) {
    if (navigator.vibrate) navigator.vibrate(ms);
}

function showToast(message) {
    const toast = $("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function openModal(selector) {
    const modal = $(selector);
    if (!modal) return;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
}

function closeModal(selector) {
    const modal = $(selector);
    if (!modal) return;
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
}

function addNotification(text, options = {}) {
    state.notifications.unshift({
        from: options.from || "Anique",
        text,
        time: options.time || "just now"
    });
    state.notifications = state.notifications.slice(0, 50);
    state.unread = Math.min((state.unread || 0) + 1, 99);
    saveState();
    renderNotifications();
    renderNotificationBadge();
    if (options.popup !== false) showInAppNotification(text, options.from || "Anique");
}

function showInAppNotification(text, from = "Anique") {
    const box = $("#inAppNotification");
    if (!box) return;
    box.innerHTML = `<b>${esc(from)}</b><p>${esc(text)}</p>`;
    box.classList.add("show");
    clearTimeout(showInAppNotification.timer);
    showInAppNotification.timer = setTimeout(() => box.classList.remove("show"), 4200);
}

function renderNotificationBadge() {
    const bubble = $("#notifBubble");
    if (!bubble) return;
    const count = state.unread || 0;
    bubble.textContent = count > 9 ? "9+" : String(count);
    bubble.classList.toggle("show", count > 0);
}

function startSoftNotifications() {
    clearInterval(notificationTimer);
    const activity = [
        { from: "Anique", text: "misses you and left a soft note 💌" },
        { from: "Mofusand Cat", text: "is guarding your inbox 🐱" },
        { from: "YannieFy", text: "suggested Pulang for your next story 🎵" },
        { from: "Pretty Reminders", text: "sent a pretty reminder for Yannie 🌸" },
        { from: "Soft Gallery", text: "saved a new cute-memory slot 💗" },
        { from: "Pink Brown Studio", text: "updated the soft pink + cocoa theme 🤎" },
        { from: "Memory Vault", text: "prepared a blank reel slot for Anique to fill later 🎬" },
        { from: "YannieTube", text: "is ready for a memory folder crossover ▶️" }
    ];

    setTimeout(() => {
        const first = activity[Math.floor(Math.random() * activity.length)];
        addNotification(first.text, { from: first.from, popup: true });
    }, 2200);

    setTimeout(() => {
        showInAppNotification("YannieGram now feels softer and truly private — signed by Anique, from Aniq Iskandar.", "Aniq Iskandar");
    }, 5200);

    notificationTimer = setInterval(() => {
        const item = activity[Math.floor(Math.random() * activity.length)];
        addNotification(item.text, { from: item.from, popup: true });
    }, 28000);
}

function showPage(page) {
    currentPage = page;
    $$(".page").forEach(item => item.classList.remove("active"));
    $(`#${page}Page`)?.classList.add("active");

    $$(".nav-item").forEach(item => {
        item.classList.toggle("active", item.dataset.page === page);
    });

    if (page === "explore") renderExplore();
    if (page === "reels") renderReels();
    if (page === "inbox") renderChats();
    if (page === "profile") renderProfile();

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function allStories() {
    const custom = state.stories.map(story => ({ ...story, isCustom: true }));
    return [...custom, ...defaultStories];
}

function renderStories() {
    const strip = $("#storiesStrip");
    if (!strip) return;
    strip.innerHTML = "";

    allStories().forEach((story, index) => {
        const button = document.createElement("button");
        button.className = "story-bubble";
        button.type = "button";
        const thumb = story.isCustom ? story.media : story.avatar;
        button.innerHTML = `
            <div class="story-ring"><img src="${esc(thumb)}" alt="${esc(story.user)}"></div>
            <small>${esc(story.user || "Story")}</small>
        `;
        button.addEventListener("click", () => openStory(index));
        strip.appendChild(button);
    });
}

function openStory(index) {
    currentStoryIndex = index;
    renderStory();
    const viewer = $("#storyViewer");
    viewer.classList.add("active");
    viewer.setAttribute("aria-hidden", "false");
    vibrate(20);
}

function renderStory() {
    const stories = allStories();
    const story = stories[currentStoryIndex];
    if (!story) return;

    const viewer = $("#storyViewer");
    const media = story.media || "images/yanniegram/story-placeholder.jpg";
    viewer.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.75)), url("${media}")`;
    viewer.classList.toggle("custom-story", !!story.isCustom);

    $("#storyAvatar").src = story.avatar || YG_ASSETS.yannieAvatar;
    $("#storyUser").textContent = story.user || "Yannie";
    $("#storyTime").textContent = story.time || "just now";
    $("#storyKicker").textContent = story.kicker || "posted story";
    $("#storyTitle").textContent = story.title || "YannieGram Story";
    $("#storyText").textContent = story.text || "A new story from YannieGram.";
    $("#storyProgressFill").style.width = `${((currentStoryIndex + 1) / stories.length) * 100}%`;

    const display = $("#storyCanvasDisplay");
    if (display) display.style.backgroundImage = story.isCustom ? `url("${media}")` : "";

    const pill = $("#storyMusicPill");
    const audio = $("#storyMusicAudio");
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
    if (story.music && audio && pill) {
        audio.src = story.music;
        audio.volume = 0.55;
        audio.play().catch(() => {});
        pill.textContent = `🎵 ${story.musicName || storyMusicTracks[story.music] || "Story music"}`;
        pill.classList.add("show");
        pill.onclick = () => {
            if (audio.paused) audio.play().catch(() => {});
            else audio.pause();
        };
    } else if (pill) {
        pill.classList.remove("show");
    }
}

function nextStory() {
    const stories = allStories();
    if (currentStoryIndex < stories.length - 1) {
        currentStoryIndex++;
        renderStory();
        vibrate(10);
    } else {
        closeStory();
    }
}

function previousStory() {
    if (currentStoryIndex > 0) {
        currentStoryIndex--;
        renderStory();
        vibrate(10);
    }
}

function closeStory() {
    const viewer = $("#storyViewer");
    viewer.classList.remove("active", "custom-story");
    viewer.setAttribute("aria-hidden", "true");
    const audio = $("#storyMusicAudio");
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
}

function reactToStory(reaction) {
    const story = allStories()[currentStoryIndex];
    if (!story) return;
    state.storyReactions.push({ storyId: story.id, reaction, time: Date.now() });
    saveState();
    burstHearts(8, reaction);
    showToast(`${reaction} reacted to ${story.user}'s story`);
    addNotification(`Anique noticed your ${reaction} reaction on a story.`, { from: "Anique" });
}

function setupStoryCanvas() {
    const canvas = $("#storyCanvas");
    if (!canvas || storyCanvasReady) return;
    storyCanvasReady = true;

    const getPoint = event => {
        const rect = canvas.getBoundingClientRect();
        const pointer = event.touches?.[0] || event;
        return {
            x: ((pointer.clientX - rect.left) / rect.width) * canvas.width,
            y: ((pointer.clientY - rect.top) / rect.height) * canvas.height
        };
    };

    const start = event => {
        event.preventDefault();
        const point = getPoint(event);
        activeStroke = {
            color: $("#storyPenColor")?.value || "#ff69b4",
            size: Number($("#storyPenSize")?.value || 7),
            points: [point]
        };
        storyStrokes.push(activeStroke);
        renderStoryEditor();
    };

    const move = event => {
        if (!activeStroke) return;
        event.preventDefault();
        activeStroke.points.push(getPoint(event));
        renderStoryEditor();
    };

    const end = () => {
        activeStroke = null;
    };

    canvas.addEventListener("pointerdown", start);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", end);
    canvas.addEventListener("pointercancel", end);
    canvas.addEventListener("touchstart", start, { passive: false });
    canvas.addEventListener("touchmove", move, { passive: false });
    canvas.addEventListener("touchend", end);

    ["#storyPenColor", "#storyPenSize", "#storyTextColor", "#storyTextSize"].forEach(selector => {
        $(selector)?.addEventListener("input", renderStoryEditor);
    });

    renderStoryEditor();
}

function openStoryCreator() {
    openModal("#storyCreateModal");
    setupStoryCanvas();
    renderStoryEditor();
    addNotification("Yannie opened Story Cammemory. Aniq hopes she posts something cute 📷", { from: "Aniq", popup: false });
}

function closeStoryCreator() {
    closeModal("#storyCreateModal");
}

function handleStoryImageUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        const img = new Image();
        img.onload = () => {
            storyBaseImage = img;
            renderStoryEditor();
            showToast("Photo added to story cammemory 📷");
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
}

function drawCoverImage(ctx, img, width, height) {
    const scale = Math.max(width / img.width, height / img.height);
    const x = (width - img.width * scale) / 2;
    const y = (height - img.height * scale) / 2;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = String(text || "").split(/\s+/).filter(Boolean);
    let line = "";
    for (const word of words) {
        const test = line ? `${line} ${word}` : word;
        if (ctx.measureText(test).width > maxWidth && line) {
            ctx.fillText(line, x, y);
            line = word;
            y += lineHeight;
        } else {
            line = test;
        }
    }
    if (line) ctx.fillText(line, x, y);
    return y + lineHeight;
}

function renderStoryEditor() {
    const canvas = $("#storyCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, "#ff9ecf");
    gradient.addColorStop(0.52, "#ffd6ea");
    gradient.addColorStop(1, "#6b4232");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    if (storyBaseImage) drawCoverImage(ctx, storyBaseImage, w, h);

    ctx.fillStyle = "rgba(0,0,0,.18)";
    ctx.fillRect(0, 0, w, h);

    for (const stroke of storyStrokes) {
        if (stroke.points.length < 1) continue;
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.size;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        stroke.points.slice(1).forEach(point => ctx.lineTo(point.x, point.y));
        ctx.stroke();
    }

    const title = $("#storyTitleInput")?.value.trim() || "YannieGram Story";
    const text = $("#storyTextInput")?.value.trim() || "Tap, draw, type, and post your own story 💗";
    const textColor = $("#storyTextColor")?.value || "#ffffff";
    const textSize = Number($("#storyTextSize")?.value || 34);

    ctx.shadowColor = "rgba(0,0,0,.35)";
    ctx.shadowBlur = 12;
    ctx.fillStyle = textColor;
    ctx.font = `800 ${textSize}px Poppins, sans-serif`;
    let y = h - 170;
    y = wrapText(ctx, title, 24, y, w - 48, textSize + 8);

    ctx.font = `500 ${Math.max(18, textSize * 0.55)}px Poppins, sans-serif`;
    wrapText(ctx, text, 24, y + 10, w - 48, Math.max(25, textSize * 0.72));
    ctx.shadowBlur = 0;

    const hint = $("#storyCanvasHint");
    if (hint) hint.style.display = storyBaseImage || storyStrokes.length || $("#storyTitleInput")?.value || $("#storyTextInput")?.value ? "none" : "grid";
}

function clearStoryCanvas() {
    storyStrokes = [];
    renderStoryEditor();
    showToast("Drawing cleared 🧽");
}

function publishStory() {
    const canvas = $("#storyCanvas");
    if (!canvas) return;
    renderStoryEditor();

    const title = $("#storyTitleInput")?.value.trim() || "Yannie's Story 💗";
    const text = $("#storyTextInput")?.value.trim() || "Posted from YannieGram Story Cammemory.";
    const music = $("#storyMusicSelect")?.value || "";
    const musicName = storyMusicTracks[music] || "";
    const media = canvas.toDataURL("image/png");

    const story = {
        id: `custom-story-${Date.now()}`,
        user: "Yannie",
        avatar: YG_ASSETS.yannieAvatar,
        media,
        kicker: "posted by Yannie",
        title,
        text,
        time: "just now",
        music,
        musicName
    };

    state.stories.unshift(story);
    state.stories = state.stories.slice(0, 20);
    saveState();
    renderStories();
    closeStoryCreator();
    showToast("Story published 💗");
    addNotification(`Yannie posted a new story: “${title}”. Anique would smile so hard.`, { from: "YannieGram" });
    burstHearts(16, "💗");

    $("#storyCammemoryInput").value = "";
    $("#storyGalleryInput").value = "";
    $("#storyTitleInput").value = "";
    $("#storyTextInput").value = "";
    storyBaseImage = null;
    storyStrokes = [];
    renderStoryEditor();
}

function renderFeed() {
    const feed = $("#feed");
    if (!feed) return;
    feed.innerHTML = "";
    state.posts.forEach(post => feed.appendChild(createPostCard(post)));
    $("#feedCount").textContent = `${state.posts.length} ${state.posts.length === 1 ? "post" : "posts"}`;
}

function createPostCard(post) {
    const card = document.createElement("article");
    card.className = "post-card";
    card.dataset.postId = post.id;

    const liked = state.liked.includes(post.id);
    const saved = state.saved.includes(post.id);
    const likeCount = post.likes + (liked ? 1 : 0);
    const tags = (post.tags || []).map(tag => `<span>#${esc(tag)}</span>`).join("");

    card.innerHTML = `
        <div class="post-top">
            <img src="${esc(post.avatar || YG_ASSETS.yannieAvatar)}" alt="${esc(post.user || "YannieGram")}">
            <div>
                <h3>${esc(post.user || "YannieGram")}</h3>
                <p>${esc(post.location || "YannieGram")} • ${esc(post.time || "just now")}</p>
            </div>
            <button class="post-menu" type="button" aria-label="Post menu">⋯</button>
        </div>
        <div class="post-media">
            ${post.media ? `<img src="${esc(post.media)}" alt="${esc(post.title || "Post")}">` : `<div class="post-placeholder"><h2>${esc(post.title || "YannieGram Memory")}</h2></div>`}
            <div class="post-heart-pop">♥</div>
        </div>
        <div class="post-actions">
            <button class="like-btn ${liked ? "liked" : ""}" type="button" aria-label="Like">${liked ? "♥" : "♡"}</button>
            <button class="comment-btn" type="button" aria-label="Comment">💬</button>
            <button class="share-btn" type="button" aria-label="Share">↗</button>
            <button class="save-btn ${saved ? "saved" : ""}" type="button" aria-label="Save">${saved ? "★" : "☆"}</button>
        </div>
        <div class="post-body">
            <div class="post-likes">${likeCount.toLocaleString()} likes</div>
            <p class="post-caption"><b>${esc(post.handle || "@yanniegram")}</b> ${esc(post.caption || "")}</p>
            <div class="post-tags">${tags}</div>
            <button class="view-comments" type="button">View ${post.comments.length} comments</button>
        </div>
    `;

    card.querySelector(".post-media").addEventListener("dblclick", () => {
        if (!state.liked.includes(post.id)) toggleLike(post.id);
        const heart = card.querySelector(".post-heart-pop");
        heart.classList.remove("show");
        void heart.offsetWidth;
        heart.classList.add("show");
        vibrate(20);
    });

    card.querySelector(".like-btn").addEventListener("click", () => toggleLike(post.id));
    card.querySelector(".save-btn").addEventListener("click", () => toggleSave(post.id));
    card.querySelector(".comment-btn").addEventListener("click", () => openComments(post.id));
    card.querySelector(".view-comments").addEventListener("click", () => openComments(post.id));
    card.querySelector(".share-btn").addEventListener("click", () => sharePost(post));
    card.querySelector(".post-menu").addEventListener("click", () => {
        showToast("Saved to soft saved folder ✨");
        if (!state.saved.includes(post.id)) toggleSave(post.id);
    });

    return card;
}

function toggleLike(postId) {
    if (state.liked.includes(postId)) {
        state.liked = state.liked.filter(id => id !== postId);
        showToast("Like removed");
    } else {
        state.liked.push(postId);
        showToast("Liked by Yannie 💗");
        burstHearts(10, "💗");
        addNotification("Aniq would definitely like that post too.", { from: "Aniq", popup: false });
    }
    saveState();
    renderFeed();
    renderExplore();
    renderProfile();
}

function toggleSave(postId) {
    if (state.saved.includes(postId)) {
        state.saved = state.saved.filter(id => id !== postId);
        showToast("Removed from saved");
    } else {
        state.saved.push(postId);
        showToast("Saved to private saved folder ☆");
        addNotification("Iskandar says: good choice saving that memory.", { from: "Iskandar" , popup: false });
    }
    saveState();
    renderFeed();
    renderExplore();
    renderProfile();
}

function sharePost(post) {
    const text = `YannieGram memory: ${post.title}`;
    if (navigator.share) {
        navigator.share({ title: post.title, text, url: location.href }).catch(() => showToast("Share cancelled"));
    } else {
        navigator.clipboard?.writeText(`${text} — ${location.href}`);
        showToast("Post link copied 💌");
    }
}

function openComments(postId) {
    currentCommentsPostId = postId;
    renderComments();
    openModal("#commentsModal");
}

function renderComments() {
    const post = state.posts.find(item => item.id === currentCommentsPostId);
    const list = $("#commentsList");
    if (!post || !list) return;
    list.innerHTML = "";
    if (!post.comments.length) {
        list.innerHTML = `<p class="modal-subtitle">No comments yet. Be the first 💗</p>`;
        return;
    }
    post.comments.forEach(comment => {
        const row = document.createElement("div");
        row.className = "comment-row";
        row.innerHTML = `<b>${esc(comment.name)}</b><p>${esc(comment.text)}</p>`;
        list.appendChild(row);
    });
}

function submitComment() {
    const input = $("#commentInput");
    const text = input.value.trim();
    if (!text || !currentCommentsPostId) return;
    const post = state.posts.find(item => item.id === currentCommentsPostId);
    if (!post) return;
    post.comments.push({ name: "Yannie", text });
    input.value = "";
    saveState();
    renderComments();
    renderFeed();
    addNotification(`Yannie commented on “${post.title}”.`, { from: "YannieGram" });
}


function openActionSheet() {
    openModal("#createActionSheet");
}

function closeActionSheet() {
    closeModal("#createActionSheet");
}

function chooseCreatePost() {
    closeActionSheet();
    openCreateModal();
}

function chooseCreateStory() {
    closeActionSheet();
    openStoryCreator();
}

function openCreateModal() {
    openModal("#createModal");
}

function closeCreateModal() {
    closeModal("#createModal");
    resetCreateForm();
}

function handleImageUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        draftImage = reader.result;
        $("#postPreview").src = draftImage;
        $(".upload-box").classList.add("has-image");
    };
    reader.readAsDataURL(file);
}

function publishPost() {
    const title = $("#postTitleInput").value.trim() || "New YannieGram Memory";
    const locationText = $("#postLocationInput").value.trim() || "YannieGram Cammemory Roll";
    const caption = $("#postCaptionInput").value.trim() || "A new soft memory has been uploaded to YannieGram.";
    const tag = $("#postTagInput").value || "memory";

    const newPost = {
        id: `post-${Date.now()}`,
        user: "Yannie",
        owner: "yannie",
        handle: "@yanniegram",
        avatar: YG_ASSETS.yannieAvatar,
        media: draftImage,
        type: "image",
        title,
        location: locationText,
        caption,
        tags: [tag, "new", "private"],
        likes: 0,
        time: "just now",
        comments: [{ name: "Aniq", text: "Already my favourite post because you made it 💗" }]
    };

    state.posts.unshift(newPost);
    saveState();
    renderFeed();
    renderExplore();
    renderProfile();
    closeCreateModal();
    addNotification(`Yannie published new post: “${title}”.`, { from: "YannieGram" });
    showToast("Post published on YannieGram ✨");
    burstHearts(12, "✨");
}

function resetCreateForm() {
    draftImage = "";
    $("#postImageInput").value = "";
    $("#postTitleInput").value = "";
    $("#postLocationInput").value = "";
    $("#postCaptionInput").value = "";
    $("#postTagInput").value = "memory";
    $("#postPreview").removeAttribute("src");
    $(".upload-box").classList.remove("has-image");
}

function renderSearchChips() {
    const box = $("#searchChips");
    if (!box) return;
    box.innerHTML = "";
    suggestions.forEach(item => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.textContent = item;
        chip.addEventListener("click", () => {
            $("#searchInput").value = item;
            $("#clearSearchBtn").style.display = "grid";
            renderExplore();
            if (["love", "cake", "date", "aniq"].includes(item)) showToast(`Secret search mood: ${item} 💗`);
        });
        box.appendChild(chip);
    });
}

function renderExplore() {
    const query = $("#searchInput")?.value.trim().toLowerCase() || "";
    const grid = $("#exploreGrid");
    if (!grid) return;
    const results = state.posts.filter(post => {
        const searchable = [post.title, post.caption, post.location, ...(post.tags || []), post.user].join(" ").toLowerCase();
        return searchable.includes(query);
    });
    grid.innerHTML = "";
    results.forEach(post => {
        const tile = document.createElement("button");
        tile.type = "button";
        tile.className = "explore-tile";
        tile.innerHTML = post.media
            ? `<img src="${esc(post.media)}" alt="${esc(post.title)}"><span>${esc(post.tags?.[0] || "post")}</span>`
            : `<div class="post-placeholder"><h2>${esc(post.title)}</h2></div><span>${esc(post.tags?.[0] || "post")}</span>`;
        tile.addEventListener("click", () => {
            showPage("home");
            setTimeout(() => document.querySelector(`[data-post-id="${post.id}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 120);
        });
        grid.appendChild(tile);
    });
    $("#exploreCount").textContent = `${results.length} ${results.length === 1 ? "result" : "results"}`;
    $("#exploreEmpty").style.display = results.length ? "none" : "block";
}

function renderReels() {
    const feed = $("#reelsFeed");
    if (!feed) return;
    feed.innerHTML = "";
    defaultReels.forEach(reel => {
        const card = document.createElement("article");
        card.className = "reel-card";
        card.innerHTML = `
            <video src="${esc(reel.src)}" poster="${esc(reel.poster)}" muted loop playsinline preload="metadata"></video>
            <div class="reel-user-chip">
                <img src="${esc(reel.avatar || reel.poster || YG_ASSETS.yannieAvatar)}" alt="${esc(reel.user || "YannieGram")}">
                <div><b>${esc(reel.user || "YannieGram")}</b><small>${esc(reel.handle || "@yanniegram")}</small></div>
            </div>
            <div class="reel-actions">
                <button data-action="like" type="button">♡</button>
                <button data-action="comment" type="button">💬</button>
                <button data-action="share" type="button">↗</button>
            </div>
            <div class="reel-overlay">
                <h2>${esc(reel.title)}</h2>
                <p>${reel.likes.toLocaleString()} likes<br>${esc(reel.caption)}</p>
                <small>🎵 ${esc(reel.sound || "original audio")}</small>
            </div>
        `;
        const video = card.querySelector("video");
        video.addEventListener("error", () => {
            card.querySelector("video")?.remove();
            card.insertAdjacentHTML("afterbegin", `<div class="reel-fallback"><div><h2>${esc(reel.title)}</h2><p>Video file not found yet, but the reel layout works.</p></div></div>`);
        });
        card.addEventListener("click", event => {
            const btn = event.target.closest("button");
            if (btn) {
                const action = btn.dataset.action;
                if (action === "like") {
                    btn.textContent = "♥";
                    burstHearts(8, "💗");
                    addNotification(`${reel.user || "Someone"} noticed you liked “${reel.title}”.`, { from: reel.user || "YannieGram" });
                    showToast("Reel liked 💗");
                }
                if (action === "comment") showToast("Open comments from the feed style soon 💬");
                if (action === "share") showToast("Reel shared to Anique’s heart storage 💌");
                return;
            }
            if (video && !video.paused) {
                video.pause();
                showToast("Reel paused");
            } else if (video) {
                video.play().catch(() => {});
                showToast("Playing reel 🎬");
            }
        });
        feed.appendChild(card);
    });
}

function renderChats() {
    const list = $("#chatList");
    if (!list) return;
    list.innerHTML = "";

    const inboxHeader = document.createElement("div");
    inboxHeader.className = "chat-note-card realistic-note";
    inboxHeader.innerHTML = `<b>YannieGram Inbox</b><span>Close friends, music stickers, soft reminders, and Anique’s private chat.</span>`;
    list.appendChild(inboxHeader);

    state.chats.forEach(chat => {
        const last = chat.messages[chat.messages.length - 1]?.text || "Start chatting";
        const item = document.createElement("button");
        item.type = "button";
        item.className = `chat-item ${chat.pinned ? "pinned-chat" : ""}`;
        item.innerHTML = `
            <img src="${esc(chat.avatar)}" alt="${esc(chat.name)}">
            <div><h3>${esc(chat.name)} ${chat.pinned ? "<em>PINNED</em>" : ""}</h3><p>${esc(last)}</p></div>
            <small>${esc(chat.time || "now")}</small>
        `;
        item.addEventListener("click", () => openChat(chat.id));
        list.appendChild(item);
    });
    renderChatPanel();
}

function openChat(chatId) {
    currentChatId = chatId;
    renderChatPanel();
    $("#chatPanel").classList.add("active");
    setTimeout(() => $("#chatInput").focus(), 200);
}

function renderChatPanel() {
    const chat = state.chats.find(item => item.id === currentChatId) || state.chats[0];
    if (!chat) return;
    $("#chatAvatar").src = chat.avatar;
    $("#chatName").textContent = chat.name;
    $("#chatStatus").textContent = chat.status;
    const box = $("#chatMessages");
    box.innerHTML = "";
    chat.messages.forEach(message => {
        const bubble = document.createElement("div");
        const sideClass = message.from === "me" ? "me" : "them";
        const sender = message.from === "me" ? "Yannie" : (message.sender || "Anique");
        bubble.className = `bubble ${sideClass}`;
        bubble.innerHTML = `<span class="sender-name">${esc(sender)}</span><span>${esc(message.text)}</span>`;
        box.appendChild(bubble);
    });
    box.scrollTop = box.scrollHeight;
}

function sendMessage() {
    const input = $("#chatInput");
    const text = input.value.trim();
    if (!text) return;
    const chat = state.chats.find(item => item.id === currentChatId);
    if (!chat) return;
    chat.messages.push({ from: "me", sender: "Yannie", text });
    input.value = "";
    saveState();
    renderChats();
    renderChatPanel();
    showToast("Reply sent to Aniq 💌");

    setTimeout(() => {
        chat.messages.push({ from: "aniq", sender: "Anique", text: autoReply(text) });
        saveState();
        renderChats();
        renderChatPanel();
        addNotification("Anique replied in your Inbox 💌", { from: "Anique" });
    }, 650);
}

function autoReply(text) {
    const lower = text.toLowerCase();
    if (lower.includes("miss")) return "I miss you moreeee. Like actually more. Come find me anytime 🥺💗";
    if (lower.includes("love")) return "I love you too, always. That one is permanent 💗";
    if (lower.includes("sad")) return "Come here. You do not have to be okay all the time. I am still here 🤍";
    if (lower.includes("stress") || lower.includes("tired")) return "Rest first, sayang. One thing at a time. I am proud of you.";
    if (lower.includes("cookie")) return "Dubai cookie content detected. I would buy it for you again 🍪";
    if (lower.includes("story")) return "Post a story for me. Add music too. I want to see your world 📷🎵";
    return "Message saved in my heart storage. — Anique ✨";
}

function getYanniePosts() {
    return state.posts.filter(post =>
        post.owner === "yannie" ||
        (post.user || "").toLowerCase() === "yannie" ||
        (post.handle || "").toLowerCase() === "@yanniegram"
    );
}

function renderProfile() {
    const yanniePosts = getYanniePosts();
    $("#profilePosts").textContent = yanniePosts.length;
    $("#profileLikes").textContent = state.liked.length;
    $("#profileSaved").textContent = state.saved.length;

    let posts = yanniePosts;
    if (activeProfileTab === "saved") posts = state.posts.filter(post => state.saved.includes(post.id));
    if (activeProfileTab === "liked") posts = state.posts.filter(post => state.liked.includes(post.id));

    const grid = $("#profileGrid");
    grid.innerHTML = "";
    posts.forEach(post => {
        const tile = document.createElement("button");
        tile.type = "button";
        tile.className = "explore-tile";
        tile.innerHTML = post.media
            ? `<img src="${esc(post.media)}" alt="${esc(post.title)}"><span>${esc(post.tags?.[0] || "post")}</span>`
            : `<div class="post-placeholder"><h2>${esc(post.title)}</h2></div><span>${esc(post.tags?.[0] || "post")}</span>`;
        tile.addEventListener("click", () => {
            showPage("home");
            setTimeout(() => document.querySelector(`[data-post-id="${post.id}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 120);
        });
        grid.appendChild(tile);
    });

    const emptyCopy = {
        posts: "Yannie has not posted on her profile yet. Tap ＋ and choose Feed Post to add her first one.",
        saved: "Saved posts will appear here after Yannie taps the save button.",
        liked: "Liked posts will appear here after Yannie taps the heart."
    };
    $("#profileEmpty").querySelector("p").textContent = emptyCopy[activeProfileTab] || emptyCopy.posts;
    $("#profileEmpty").style.display = posts.length ? "none" : "block";
}

function renderNotifications() {
    const list = $("#notifList");
    if (!list) return;
    list.innerHTML = "";
    if (!state.notifications.length) {
        list.innerHTML = `<div class="empty-state" style="display:block"><h3>No activity yet</h3><p>Anique's reminders, story updates, likes, saves, and replies will appear here.</p></div>`;
        return;
    }
    state.notifications.forEach(item => {
        const row = document.createElement("div");
        row.className = "notif-item";
        row.innerHTML = `<b>${esc(item.from || "Anique")}</b>${esc(item.text)}<small>${esc(item.time || "just now")}</small>`;
        list.appendChild(row);
    });
}

function setTheme(theme) {
    state.theme = theme;
    saveState();
    applyTheme();
    closeModal("#themeModal");
    showToast("YannieGram theme updated ✨");
}

function applyTheme() {
    document.body.classList.toggle("theme-brown", state.theme === "brown");
    document.body.classList.toggle("theme-night", state.theme === "night");
    document.body.classList.toggle("theme-peach", state.theme === "peach");
}

function burstHearts(count = 8, symbol = "💗") {
    for (let i = 0; i < count; i++) {
        const heart = document.createElement("div");
        heart.className = "fly-heart";
        heart.textContent = symbol;
        heart.style.left = `${window.innerWidth / 2 + Math.random() * 220 - 110}px`;
        heart.style.top = `${window.innerHeight / 2 + Math.random() * 170 - 80}px`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1700);
    }
}

function startSparkles() {
    const symbols = ["✨", "💗", "🌸", "✦"];
    setInterval(() => {
        const layer = $("#sparkleLayer");
        if (!layer) return;
        const sparkle = document.createElement("div");
        sparkle.className = "sparkle";
        sparkle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        sparkle.style.left = `${Math.random() * 100}vw`;
        sparkle.style.fontSize = `${16 + Math.random() * 18}px`;
        sparkle.style.animationDuration = `${10 + Math.random() * 12}s`;
        layer.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 23000);
    }, 2200);
}

function bindEvents() {
    $("#backBtn")?.addEventListener("click", () => history.back());
    $("#brandBtn")?.addEventListener("click", () => showPage("home"));
    $("#notifBtn")?.addEventListener("click", () => {
        state.unread = 0;
        saveState();
        renderNotificationBadge();
        openModal("#notifDrawer");
    });
    $("#closeNotifBtn")?.addEventListener("click", () => closeModal("#notifDrawer"));

    $$(".nav-item").forEach(item => {
        item.addEventListener("click", () => showPage(item.dataset.page));
    });

    $("#fabCreateBtn")?.addEventListener("click", openActionSheet);
    $("#quickPostBtn")?.addEventListener("click", openActionSheet);
    $("#sheetPostBtn")?.addEventListener("click", chooseCreatePost);
    $("#sheetStoryBtn")?.addEventListener("click", chooseCreateStory);
    $("#closeCreateSheetBtn")?.addEventListener("click", closeActionSheet);

    $("#closeCreateBtn")?.addEventListener("click", closeCreateModal);
    $("#publishPostBtn")?.addEventListener("click", publishPost);
    $("#postImageInput")?.addEventListener("change", handleImageUpload);

    $("#closeStoryCreateBtn")?.addEventListener("click", closeStoryCreator);
    $("#storyCammemoryInput")?.addEventListener("change", handleStoryImageUpload);
    $("#storyGalleryInput")?.addEventListener("change", handleStoryImageUpload);
    $("#storyTitleInput")?.addEventListener("input", renderStoryEditor);
    $("#storyTextInput")?.addEventListener("input", renderStoryEditor);
    $("#storyClearCanvasBtn")?.addEventListener("click", clearStoryCanvas);
    $("#publishStoryBtn")?.addEventListener("click", publishStory);

    $("#closeStoryBtn")?.addEventListener("click", closeStory);
    $("#storyNextZone")?.addEventListener("click", nextStory);
    $("#storyPrevZone")?.addEventListener("click", previousStory);
    $$(".story-reactions button").forEach(btn => {
        btn.addEventListener("click", event => {
            event.stopPropagation();
            reactToStory(btn.dataset.react);
        });
    });

    $("#searchInput")?.addEventListener("input", () => {
        $("#clearSearchBtn").style.display = $("#searchInput").value.trim() ? "grid" : "none";
        renderExplore();
    });
    $("#clearSearchBtn")?.addEventListener("click", () => {
        $("#searchInput").value = "";
        $("#clearSearchBtn").style.display = "none";
        renderExplore();
    });

    $("#closeCommentsBtn")?.addEventListener("click", () => closeModal("#commentsModal"));
    $("#commentForm")?.addEventListener("submit", event => {
        event.preventDefault();
        submitComment();
    });

    $("#closeChatBtn")?.addEventListener("click", () => $("#chatPanel").classList.remove("active"));
    $("#chatForm")?.addEventListener("submit", event => {
        event.preventDefault();
        sendMessage();
    });

    $("#editProfileBtn")?.addEventListener("click", () => openModal("#themeModal"));
    $("#closeThemeBtn")?.addEventListener("click", () => closeModal("#themeModal"));
    $$(".theme-options button").forEach(button => {
        button.addEventListener("click", () => setTheme(button.dataset.theme));
    });

    $$(".profile-tab").forEach(tab => {
        tab.addEventListener("click", () => {
            activeProfileTab = tab.dataset.profileTab;
            $$(".profile-tab").forEach(item => item.classList.remove("active"));
            tab.classList.add("active");
            renderProfile();
        });
    });

    document.addEventListener("keydown", event => {
        if ($("#storyViewer")?.classList.contains("active")) {
            if (event.key === "ArrowRight") nextStory();
            if (event.key === "ArrowLeft") previousStory();
            if (event.key === "Escape") closeStory();
        }
    });
}

function init() {
    applyTheme();
    bindEvents();
    setupStoryCanvas();
    renderStories();
    renderFeed();
    renderSearchChips();
    renderExplore();
    renderReels();
    renderChats();
    renderProfile();
    renderNotifications();
    renderNotificationBadge();
    startSparkles();
    startSoftNotifications();
}

init();
