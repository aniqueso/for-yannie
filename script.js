const PASSWORD = "02082009";
const STORAGE_KEY = "yannieWorldV2State";

const achievementData = {
    daily_visitor: { icon: "🌞", title: "Daily Visitor", desc: "Completed a daily love mission." },
    mood_checked: { icon: "🧸", title: "Mood Checked", desc: "Used the mood check-in." },
    secret_finder: { icon: "🔍", title: "Secret Finder", desc: "Found a secret search result." },
    super_secret_finder: { icon: "🕵️", title: "Super Secret Finder", desc: "Found three secret search results." },
    letter_reader: { icon: "💌", title: "Letter Reader", desc: "Opened an Open When letter." },
    envelope_collector: { icon: "✉️", title: "Envelope Collector", desc: "Opened all Open When letters." },
    heart_reader: { icon: "❤️", title: "Heart Reader", desc: "Finished the main letter." },
    memory_reader: { icon: "📖", title: "Memory Reader", desc: "Read a memory card." },
    memory_keeper: { icon: "📸", title: "Memory Keeper", desc: "Opened all gallery photos." },
    cookie_destroyer: { icon: "🍪", title: "Cookie Destroyer", desc: "Finished the Dubai cookie simulator." },
    yannietube_visitor: { icon: "▶️", title: "YannieTube Visitor", desc: "Opened YannieTube." },
    pov_player: { icon: "🎮", title: "POV Player", desc: "Opened Memory World." },
    vault_unlocked: { icon: "🎁", title: "Secret Vault", desc: "Unlocked the final vault." }
};

const defaultState = {
    achievements: [],
    completedMissionDates: [],
    foundSecrets: [],
    openedPhotos: [],
    openedLetters: [],
    mainLetterRead: false,
    cookieFinished: false,
    facetimeShown: false
};

let state = loadState();
let cookieBites = 0;
let lastFlowerTime = 0;

function loadState(){
    try{
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return { ...defaultState, ...(saved || {}) };
    }
    catch(e){
        return { ...defaultState };
    }
}

function saveState(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function todayKey(){
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

function hashString(str){
    let h = 0;
    for(let i=0;i<str.length;i++){
        h = (h * 31 + str.charCodeAt(i)) >>> 0;
    }
    return h;
}

function pickDaily(arr){
    return arr[hashString(todayKey()) % arr.length];
}

function checkPassword(){
    const input = document.getElementById("passwordInput").value;
    if(input === PASSWORD){
        document.getElementById("lockScreen").style.display = "none";
        document.getElementById("website").style.display = "block";
        showSection("home");
        showNotification("Archive unlocked. Welcome back.");
    }
    else{
        alert("Wrong password. Hint: it is a date you know.");
    }
}

function showSection(id){
    document.querySelectorAll("section").forEach(section => section.classList.remove("active"));
    const target = document.getElementById(id);
    if(target) target.classList.add("active");
    document.querySelectorAll("nav [data-section]").forEach(btn => btn.classList.toggle("active", btn.dataset.section === id));
    renderAchievements();
    renderVault();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function countdown(){
    const startDate = new Date("2026-03-01T21:55:00+08:00");
    function update(){
        const el = document.getElementById("sinceStartDays");
        if(!el) return;
        const now = new Date();
        const days = Math.max(0, Math.floor((now - startDate) / 86400000));
        el.textContent = days;
    }
    update();
    setInterval(update, 3600000);
}

const messages = [
    "Reminder: eat properly before pretending you are not hungry.",
    "The RM6 cake order really got out of hand, huh?",
    "Good luck with whatever you are studying today. One chapter at a time.",
    "If texting feels boring, we already know the solution: call later.",
    "Current status: still collecting random stories to tell each other.",
    "Burger-with-spoon evidence remains in the archive."
];

function setDailyMessage(){
    const el = document.getElementById("dailyMessage");
    if(el) el.innerText = pickDaily(messages);
}

const missions = [
    "Open one memory you have not looked at in a while.",
    "Use Yannie Search and try one of the inside-joke keywords.",
    "Open one Open When envelope only if the label actually fits today.",
    "Pick your mood honestly. No overthinking the button choice.",
    "Open the scrapbook and swipe through one chapter.",
    "Open the museum and replace one placeholder photo when you have time.",
    "Take a break from the site and do one useful thing first."
];

const dailyMemories = [
    "1 March: chocolate moist cake x2. Total RM6.",
    "The birthday caramel pudding that became permanent lore.",
    "Coming to the bazaar mostly for pudding and pretending that was completely normal.",
    "The wake-up call that refused to stay a normal wake-up call.",
    "Raya colours: matcha strawberry and champagne.",
    "The stadium date and the burger-with-spoon investigation.",
    "Those absurdly long calls that made normal texting feel insufficient.",
    "SPM on one side, UTeM on the other, phone line somewhere in the middle."
];

function renderDaily(){
    const mission = pickDaily(missions);
    const memory = pickDaily(dailyMemories);
    const doneToday = state.completedMissionDates.includes(todayKey());

    document.getElementById("dailyMission").innerText = mission;
    document.getElementById("dailyMemory").innerText = memory;
    document.getElementById("homeDailyPreview").innerText = `${mission} Today’s memory: ${memory}`;

    const btn = document.getElementById("completeMissionBtn");
    const status = document.getElementById("missionStatus");
    if(doneToday){
        btn.innerText = "Completed today";
        btn.classList.add("done");
        status.innerText = "A new one appears tomorrow.";
    }
    else{
        btn.innerText = "Complete Today's Mission";
        btn.classList.remove("done");
        status.innerText = "Do it first, then mark it complete.";
    }
    document.getElementById("streakNumber").innerText = calculateStreak();
}

function completeDailyMission(){
    if(!state.completedMissionDates.includes(todayKey())){
        state.completedMissionDates.push(todayKey());
        unlockAchievement("daily_visitor");
        saveState();
    }
    renderDaily();
    showNotification("Daily drop marked complete. Come back tomorrow.");
}

function calculateStreak(){
    const set = new Set(state.completedMissionDates);
    let streak = 0;
    const d = new Date();
    while(true){
        const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
        if(set.has(key)){
            streak++;
            d.setDate(d.getDate()-1);
        }
        else break;
    }
    return streak;
}

const moodMessages = {
    happy: "Good. Keep the good mood. Go enjoy it instead of analysing why you feel good.",
    miss: "Noted. Save the stories for later, then call when both of you are free.",
    sad: "You do not need a motivational speech right now. Eat, drink something, rest a bit, and talk when you feel ready.",
    mad: "Do not force a conversation while annoyed. Cool down first, then explain the actual problem without turning it into ten other problems.",
    tired: "This one is easy: rest. Revision and everything else works better when you are actually awake.",
    stress: "Pick the smallest next task and do only that. One paper, one question, one thing at a time."
};

function chooseMood(mood){
    document.getElementById("moodResult").innerText = moodMessages[mood];
    unlockAchievement("mood_checked");
}

const careMessages = {
    period: "Period mode: less arguing, more patience. Food, water, rest, and do not keep asking the same question five times.",
    silent: "If one of us goes quiet: ask once, do not chase every minute, and leave space for a proper conversation later.",
    sad: "Listen before trying to fix it. Sometimes the useful answer is just 'yeah, that sucks'.",
    stress: "Help reduce the problem, not add another one. Break it into smaller tasks and let the tired person rest.",
    jealous: "Be clear, answer the actual concern, then move on. Reassurance works better than getting defensive.",
    miss: "If both are free: call. If not: leave updates for later. We have survived this exact problem many times."
};

function showCare(type){
    document.getElementById("careResult").innerText = careMessages[type];
}

const secretSearches = {
    lasagna: "🍝 Archive result: the lasagna arc. Somehow free food kept becoming plot development.",
    cake: "🍰 1 March 2026: chocolate moist cake x2. RM6. Origin event detected.",
    "miss you": "📞 Suggested action: save the update and call when both of you are free.",
    queque: "🗂️ Search result: recurring character. Appears in an unreasonable number of messages.",
    raya: "🌙 Archive result: matcha strawberry + champagne colours.",
    "open house": "🏠 Archive result: almost matching colours and the first-photo-together era.",
    pudding: "🍮 Birthday caramel pudding. Extremely important historical object for no good reason.",
    spm: "📚 Current chapter: revision, trials, tired mornings, and a lot of encouragement.",
    utem: "🎓 Current chapter: campus life, roommates, quieter calls, and constant updates.",
    "02082009": "🎂 Correct. You clearly know the password."
};

function searchYannie(){
    const query = document.getElementById("searchInput").value.toLowerCase().trim();
    let result = "No exact archive result. Try another inside joke.";
    let foundKey = null;

    Object.keys(secretSearches).forEach(key => {
        if(query.includes(key)){
            result = `<div class="secret-result">${secretSearches[key]}</div>`;
            foundKey = key;
        }
    });

    if(!foundKey){
        if(query.includes("call")) result = "📞 Search result: probably longer than intended.";
        else if(query.includes("burger")) result = "🍔 Search result: burger + spoon. Case remains unsolved.";
        else if(query.includes("study")) result = "📚 Search result: do the next question first, then complain.";
        else if(query.includes("cat")) result = "🐱 Search result: apparently less scary now.";
    }
    else{
        if(!state.foundSecrets.includes(foundKey)){
            state.foundSecrets.push(foundKey);
            unlockAchievement("secret_finder");
            if(state.foundSecrets.length >= 3) unlockAchievement("super_secret_finder");
            saveState();
        }
    }

    document.getElementById("searchResult").innerHTML = result;
    renderVault();
}

const openWhenLetters = [
`If you miss me:

Save the random stories. Send the updates if you want. If we are both free, just call — we already know texting alone sometimes feels weirdly insufficient.

— Aniq`,
`If today is bad:

You do not need to fix the entire day. Eat something, drink water, get through the next hour, then tell me what happened when you feel like talking.

— Aniq`,
`If you are stressed:

Stop looking at the whole pile at once. Pick one chapter, one exercise, or one problem. Finish that first. Then decide what is next.

— Aniq`,
`If you are overthinking:

Ask the actual question instead of building ten imaginary answers in your head. I would rather explain something properly than have you guess.

— Aniq`,
`Birthday note:

I hope the day feels like yours — good food, people you like, and enough quiet time to actually enjoy it. Also: the original birthday pudding is still an important historical event.

— Aniq`,
`After SPM:

Whatever happens next, I hope you get to choose something you genuinely want. Finish this chapter properly first. Future-you can handle the next one after that.

— Aniq`
];

function openLetter(index){
    document.getElementById("letterModal").style.display = "flex";
    document.getElementById("letterText").innerText = openWhenLetters[index];
    if(!state.openedLetters.includes(index)){
        state.openedLetters.push(index);
        unlockAchievement("letter_reader");
        if(state.openedLetters.length >= openWhenLetters.length) unlockAchievement("envelope_collector");
        saveState();
    }
    renderVault();
}
function closeLetter(){ document.getElementById("letterModal").style.display = "none"; }

function finishMainLetter(){
    state.mainLetterRead = true;
    saveState();
    unlockAchievement("heart_reader");
    showNotification("Letter finished. One old surprise is about to replay.");
    setTimeout(triggerFacetime, 2500);
    renderVault();
}

function openPhoto(img,memory){
    document.getElementById("photoModal").style.display = "flex";
    document.getElementById("modalImage").src = img;
    document.getElementById("modalMemory").innerText = memory;
    if(!state.openedPhotos.includes(img)){
        state.openedPhotos.push(img);
        if(state.openedPhotos.length >= 4) unlockAchievement("memory_keeper");
        saveState();
    }
    renderVault();
}
function closePhoto(){ document.getElementById("photoModal").style.display = "none"; }

function playMusic(){ return document.getElementById("music").play(); }
function toggleMusic(){
    const audio = document.getElementById("music");
    const player = document.getElementById("miniPlayer");
    const icon = document.getElementById("musicIcon");
    if(audio.paused){
        const promise = audio.play();
        if(promise && promise.catch) promise.catch(()=>{});
        player?.classList.add("playing");
        if(icon) icon.textContent = "Ⅱ";
    } else {
        audio.pause();
        player?.classList.remove("playing");
        if(icon) icon.textContent = "▶";
    }
}

function unlockAchievement(id){
    if(!achievementData[id] || state.achievements.includes(id)) return;
    state.achievements.push(id);
    saveState();
    showAchievementToast(achievementData[id]);
    renderAchievements();
    checkVaultUnlock();
}

function showAchievementToast(data){
    const toast = document.getElementById("achievementToast");
    toast.innerHTML = `<b>Achievement unlocked</b><br>${data.icon} ${data.title}`;
    toast.classList.add("show");
    setTimeout(()=>toast.classList.remove("show"),3200);
}

function renderAchievements(){
    const el = document.getElementById("achievementList");
    if(!el) return;
    el.innerHTML = Object.entries(achievementData).map(([id,data]) => {
        const unlocked = state.achievements.includes(id);
        return `<div class="badge ${unlocked ? "unlocked" : ""}">
            <div class="badge-icon">${unlocked ? data.icon : "🔒"}</div>
            <div><div class="badge-title">${data.title}</div><div class="badge-desc">${unlocked ? data.desc : "Locked. Keep exploring Yannie World."}</div></div>
        </div>`;
    }).join("");
}

function vaultRequirements(){
    return [
        { label:"Complete a daily mission", done:state.achievements.includes("daily_visitor") },
        { label:"Use Mood Check-In", done:state.achievements.includes("mood_checked") },
        { label:"Find at least 3 secret searches", done:state.achievements.includes("super_secret_finder") },
        { label:"Finish the main letter", done:state.achievements.includes("heart_reader") },
        { label:"Open at least one Open When letter", done:state.achievements.includes("letter_reader") },
        { label:"Open all 4 gallery photos", done:state.achievements.includes("memory_keeper") }
    ];
}

function checkVaultUnlock(){
    const ready = vaultRequirements().every(req => req.done);
    if(ready && !state.achievements.includes("vault_unlocked")){
        unlockAchievement("vault_unlocked");
        showNotification("Vault unlocked.");
    }
}

function renderVault(){
    const el = document.getElementById("vaultContent");
    if(!el) return;
    const reqs = vaultRequirements();
    const ready = reqs.every(req => req.done);
    if(!ready){
        el.innerHTML = `<h3>Vault locked</h3><p>The site keeps track of what you have explored. Finish these first.</p><div class="vault-progress">${reqs.map(req => `<div class="vault-check">${req.done ? "✓" : "○"} ${req.label}</div>`).join("")}</div>`;
        return;
    }
    el.innerHTML = `<h3>Vault unlocked</h3>
        <p class="vault-final">Okay, you actually explored everything.</p>
        <p>This site started small and kept growing because the archive kept growing too. That is basically the point.</p>
        <button onclick="triggerFacetime()">Replay the surprise call</button>`;
}

function openYannieTube(){
    unlockAchievement("yannietube_visitor");
    window.open("yannietube.html","_blank");
}

function setupLoveMachine(){
    const loveResults = [
        "Call later: probably yes.",
        "Pudding rating: still suspiciously important.",
        "Burger + spoon: case unresolved.",
        "Current mood: save this story for the next call.",
        "Mofusand approval: acceptable.",
        "Study first. Complain after.",
        "RM6 investment return: statistically ridiculous."
    ];
    document.getElementById("loveButton").addEventListener("click",()=>{
        const result = loveResults[Math.floor(Math.random()*loveResults.length)];
        document.getElementById("loveResult").textContent = result;
    });
}

function createFlower(){ /* intentionally quiet in the makeover */ }

function startDecorations(){
    // The old floating hearts/cats were fun, but the makeover keeps the background calm.
}

const sweetNotifications = [
    "remember to eat before saying you are not hungry",
    "save the story, tell me on call later",
    "good luck with revision today",
    "random archive reminder: RM6 cake order",
    "drink water. yes, this is the notification",
    "if you are tired, go sleep. revolutionary advice"
];

function showNotification(customMessage){
    const notification = document.createElement("div");
    notification.className = "fake-notification";
    const now = new Date();
    const time = now.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});
    const message = customMessage || sweetNotifications[Math.floor(Math.random()*sweetNotifications.length)];
    notification.innerHTML = `<div class="notification-top"><div class="notification-app">Messages</div><div>${time}</div></div><div class="notification-name">Aniq</div><div class="notification-text">${message}</div>`;
    document.body.appendChild(notification);
    setTimeout(()=>notification.remove(),8000);
}

function scheduleNotification(){
    const randomTime = 480000 + Math.random()*420000;
    setTimeout(()=>{
        showNotification();
        scheduleNotification();
    },randomTime);
}

const makeoverMemories = [
    { title:"The pudding incident", text:"A birthday joke turned into free caramel pudding, and somehow that became part of the origin story." },
    { title:"Back to the bazaar", text:"Coming back for pudding was apparently enough reason to keep the conversation going. Convenient." },
    { title:"The wake-up call", text:"A practical request somehow turned into a long call. This would become a recurring problem." },
    { title:"Raya colour theory", text:"Matcha strawberry, champagne, almost-matching outfits — the archive has evidence." },
    { title:"Burger with spoon", text:"First date at the stadium. One burger. One spoon. Questions remain." },
    { title:"Calls got ridiculous", text:"One hour became three, five, nine, eleven, twelve. At some point texting started feeling like the backup option." },
    { title:"Two schedules", text:"SPM and trial season on one side; UTeM classes and roommates on the other. Updates kept crossing between both." },
    { title:"Current chapter", text:"Mostly ordinary things now: class updates, results, food, tiredness, calls, random photos. That is what makes it feel real." }
];

const makeoverCallStats = [
    ["1 hr","a normal one"],
    ["3 hr","still reasonable-ish"],
    ["5 hr","okay, this is becoming a habit"],
    ["9 hr","basically background ambience"],
    ["11 hr","yes, really"],
    ["12 hr","texting never stood a chance"]
];

const chapterNotes = {
    "01":"1 March 2026 — a normal dessert order that absolutely did not stay normal.",
    "02":"The stage where ordering food became random daily conversation for no obvious reason.",
    "03":"Calls got longer until texting alone started to feel like the backup plan.",
    "04":"SPM and UTeM: different schedules, same habit of sending every unnecessary update.",
    "05":"The current chapter is mostly ordinary life — which is kind of the whole point."
};

let makeoverMemoryIndex = 0;
let makeoverCallIndex = makeoverCallStats.length - 1;

function renderMakeoverMemory(index){
    const card = document.getElementById("memoryShuffler");
    const item = makeoverMemories[index];
    if(!item) return;
    card?.classList.remove("swap");
    void card?.offsetWidth;
    card?.classList.add("swap");
    const title = document.getElementById("homeMemoryTitle");
    const copy = document.getElementById("homeMemoryText");
    const count = document.getElementById("memoryIndex");
    if(title) title.textContent = item.title;
    if(copy) copy.textContent = item.text;
    if(count) count.textContent = `${String(index+1).padStart(2,"0")} / ${String(makeoverMemories.length).padStart(2,"0")}`;
}

function shuffleHomeMemory(){
    let next = makeoverMemoryIndex;
    while(next === makeoverMemoryIndex && makeoverMemories.length > 1) next = Math.floor(Math.random()*makeoverMemories.length);
    makeoverMemoryIndex = next;
    renderMakeoverMemory(makeoverMemoryIndex);
}

function openOriginReceipt(){
    const modal = document.getElementById("originReceiptModal");
    modal?.classList.add("open");
    modal?.setAttribute("aria-hidden","false");
}

function closeOriginReceipt(){
    const modal = document.getElementById("originReceiptModal");
    modal?.classList.remove("open");
    modal?.setAttribute("aria-hidden","true");
}

function setupMakeoverInteractions(){
    renderMakeoverMemory(0);
    document.getElementById("shuffleMemory")?.addEventListener("click",shuffleHomeMemory);
    document.getElementById("heroShuffleBtn")?.addEventListener("click",shuffleHomeMemory);

    document.getElementById("nextCallStat")?.addEventListener("click",()=>{
        makeoverCallIndex = (makeoverCallIndex + 1) % makeoverCallStats.length;
        const [value,caption] = makeoverCallStats[makeoverCallIndex];
        document.getElementById("callStat").textContent = value;
        document.getElementById("callStatCaption").textContent = caption;
    });

    document.querySelectorAll(".chapter-chip").forEach(btn=>btn.addEventListener("click",()=>{
        document.querySelectorAll(".chapter-chip").forEach(item=>item.classList.remove("active"));
        btn.classList.add("active");
        const note = document.getElementById("chapterNote");
        if(note) note.textContent = chapterNotes[btn.dataset.chapter] || "";
    }));

    document.getElementById("receiptStamp")?.addEventListener("click",e=>{
        e.currentTarget.classList.toggle("stamped");
        e.currentTarget.textContent = e.currentTarget.classList.contains("stamped") ? "ARCHIVED · 01.03.26" : "tap to stamp";
    });

    document.addEventListener("keydown",e=>{ if(e.key === "Escape") closeOriginReceipt(); });
    document.querySelector('nav [data-section="home"]')?.classList.add("active");
}

function setupCookieShop(){
    const shop = document.getElementById("cookieShop");
    const cart = document.getElementById("cookieCart");
    const orderComplete = document.getElementById("cookieOrderComplete");
    const simulator = document.getElementById("cookieSimulator");

    const cartBubble = document.getElementById("cartBubble");
    const cartEmpty = document.getElementById("cartEmpty");
    const cartFilled = document.getElementById("cartFilled");
    const cartQty = document.getElementById("cartQty");
    const cookieQty = document.getElementById("cookieQty");
    const cartSubtotal = document.getElementById("cartSubtotal");
    const cartTotal = document.getElementById("cartTotal");
    const status = document.getElementById("cookieStatus");
    const biteFill = document.getElementById("biteProgressFill");
    const biteCounter = document.getElementById("biteCounter");

    let qty = 1;
    let cartItems = 0;
    let checkoutRunning = false;

    function money(amount){
        return `RM${amount.toFixed(2)}`;
    }

    function updateCartUI(){
        cookieQty.innerHTML = qty;
        cartQty.innerHTML = cartItems || qty;
        cartBubble.innerHTML = cartItems;

        const subtotal = 18.90 * (cartItems || qty);
        const total = Math.max(subtotal - 5, 0);

        cartSubtotal.innerHTML = money(subtotal);
        cartTotal.innerHTML = money(total);

        cartEmpty.classList.toggle("hidden", cartItems > 0);
        cartFilled.classList.toggle("active", cartItems > 0);
    }

    function openShop(){
        shop.style.display = "flex";
        updateCartUI();
        showNotification("YannieTok Shop is open. The cookie simulator is still ridiculous.");
    }

    function addToCart(){
        cartItems = qty;
        updateCartUI();
        showNotification("Cookie added to cart.");
    }

    function setStep(index, message){
        document.querySelectorAll("#orderProgress .step").forEach((step,stepIndex)=>{
            step.classList.toggle("active", stepIndex <= index);
        });
        status.innerHTML = message;
    }

    function startCheckout(){
        if(checkoutRunning) return;

        checkoutRunning = true;
        cartItems = cartItems || qty;
        updateCartUI();

        shop.style.display = "flex";
        cart.style.display = "none";

        setStep(0, "Cookie added to cart...");
        setTimeout(()=>setStep(1,"Voucher applied. Payment approved ❤️"),850);
        setTimeout(()=>setStep(2,"Packing cookie carefully for Yannie..."),1700);
        setTimeout(()=>setStep(3,"Out for delivery to Yannie’s hand 🚚"),2550);
        setTimeout(()=>{
            checkoutRunning = false;
            shop.style.display = "none";
            orderComplete.style.display = "flex";
            showNotification("Order delivered. Cookie simulator unlocked.");
        },3400);
    }

    function updateBiteUI(){
        document.getElementById("cookieImage").src = `images/cookie${cookieBites}.png`;
        biteFill.style.width = `${Math.min((cookieBites/7)*100,100)}%`;
        biteCounter.innerHTML = `${Math.min(cookieBites,7)}/7 bites`;
    }

    function resetCookie(){
        cookieBites = 0;
        document.getElementById("cookieText").innerHTML = "Tap the cookie to take a bite 😋";
        updateBiteUI();
    }

    document.getElementById("openCookieShop").addEventListener("click", openShop);
    document.getElementById("openCartBtn").addEventListener("click",()=>{
        cart.style.display = "flex";
        updateCartUI();
    });

    document.getElementById("qtyMinus").addEventListener("click",()=>{
        qty = Math.max(1, qty - 1);
        updateCartUI();
    });

    document.getElementById("qtyPlus").addEventListener("click",()=>{
        qty = 1;
        showNotification("Maximum quantity: one. Apparently this is an exclusive drop.");
        updateCartUI();
    });

    document.getElementById("addToCartButton").addEventListener("click", addToCart);
    document.getElementById("buyCookieButton").addEventListener("click", startCheckout);
    document.getElementById("checkoutCartBtn").addEventListener("click", startCheckout);

    document.getElementById("openCookieSimulatorBtn").addEventListener("click",()=>{
        orderComplete.style.display = "none";
        simulator.style.display = "flex";
        updateBiteUI();
    });

    document.getElementById("resetCookieBtn").addEventListener("click", resetCookie);

    document.querySelectorAll(".product-tabs .tab").forEach(tab=>{
        tab.addEventListener("click",()=>{
            document.querySelectorAll(".product-tabs .tab").forEach(item=>item.classList.remove("active"));
            document.querySelectorAll(".tab-panel").forEach(panel=>panel.classList.remove("active"));

            tab.classList.add("active");
            document.getElementById(`tab${tab.dataset.tab[0].toUpperCase()}${tab.dataset.tab.slice(1)}`).classList.add("active");
        });
    });

    const cookieMessages = [
        "First bite. Crispy outside, soft inside 😋",
        "Chocolate layer discovered 🍫",
        "Pistachio kunafa core unlocked 💚",
        "Yannie rating increased to 999/10 🌸",
        "Cookie happiness level: critical 😭",
        "Almost gone, babyyy...",
        "Last bite incoming 🥺"
    ];

    document.getElementById("cookieImage").addEventListener("click",()=>{
        if(cookieBites < 7){
            cookieBites++;
            updateBiteUI();
            document.getElementById("cookieText").innerHTML = cookieMessages[cookieBites-1];
        }
        else{
            document.getElementById("cookieText").innerHTML = "😭 YANNIE ATE THE WHOLE COOKIE<br><br>🐱 Mofusand stole the crumbs.";
            state.cookieFinished = true;
            saveState();
            unlockAchievement("cookie_destroyer");
            renderVault();
        }
    });

    setInterval(()=>{
        document.getElementById("viewerCount").innerHTML = `⚡ ${12 + Math.floor(Math.random()*280)} people viewing now`;
    },2800);

    updateCartUI();
    updateBiteUI();
}

function closeCookieShop(){ document.getElementById("cookieShop").style.display="none"; }
function closeCookieCart(){ document.getElementById("cookieCart").style.display="none"; }
function closeOrderComplete(){ document.getElementById("cookieOrderComplete").style.display="none"; }
function closeCookieSimulator(){ document.getElementById("cookieSimulator").style.display="none"; }

function triggerFacetime(){
    if(state.facetimeShown && !state.achievements.includes("vault_unlocked")) return;
    state.facetimeShown = true;
    saveState();
    document.getElementById("facetimePopup").style.display = "flex";
}
function closeFacetimePopup(){ document.getElementById("facetimePopup").style.display="none"; }

function setupFacetime(){
    document.getElementById("acceptCall").addEventListener("click",()=>{
        document.getElementById("facetimePopup").style.display="none";
        document.getElementById("videoCallScreen").style.display="block";
        const video = document.getElementById("callVideo");
        video.muted = false;
        const playPromise = video.play();
        if(playPromise && playPromise.catch) playPromise.catch(()=>{});
    });

    const video = document.getElementById("callVideo");
    video.addEventListener("ended",()=>{
        document.getElementById("videoCallScreen").style.display="none";
        showCallEnded();
    });
}

function showCallEnded(){
    document.getElementById("callEndedScreen").style.display="flex";
    setTimeout(()=>document.getElementById("callEndedScreen").style.display="none",3500);
}

window.addEventListener("DOMContentLoaded",()=>{
    countdown();
    setDailyMessage();
    renderDaily();
    renderAchievements();
    renderVault();
    setupLoveMachine();
    setupCookieShop();
    setupFacetime();
    setupMakeoverInteractions();
    startDecorations();
    scheduleNotification();
});
