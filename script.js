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
        showNotification("Welcome back to Yannie World 💗");
    }
    else{
        alert("Sorry my babyy, wrong passwordd 😔 Hint: princess birthday.");
    }
}

function showSection(id){
    document.querySelectorAll("section").forEach(section => section.classList.remove("active"));
    const target = document.getElementById(id);
    if(target) target.classList.add("active");
    renderAchievements();
    renderVault();
}

function countdown(){
    const birthday = new Date("2026-08-02T00:00:00");
    function update(){
        const now = new Date();
        const diff = birthday - now;
        const el = document.getElementById("countdown");
        if(!el) return;
        if(diff <= 0){
            el.innerHTML = "🎉 Happy 17th Birthday Yannie!";
            return;
        }
        const days = Math.floor(diff / 86400000);
        const hours = Math.floor((diff % 86400000) / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        el.innerHTML = `
            <div class="countdown-number">${days}</div>
            <div class="countdown-label">Countdown Until Your 17th Birthday! 🎂</div>
            <div class="countdown-time">
                <div class="time-box">${String(hours).padStart(2,"0")}</div><span>:</span>
                <div class="time-box">${String(minutes).padStart(2,"0")}</div><span>:</span>
                <div class="time-box">${String(seconds).padStart(2,"0")}</div>
            </div>`;
    }
    update();
    setInterval(update,1000);
}

const messages = [
    "I love you so so much sayanggg 💗",
    "I REALLY REALLY MISS YOUU MY BABYY 🌸",
    "I made this website just for youu, lovee! ❤️",
    "Thank you for becoming a part of my life, yannieee 🥰",
    "Random reminder: you are my favourite person alwaysss ✨",
    "Come hereee, I have unlimited hugs reserved for youu 🧸"
];

function setDailyMessage(){
    const el = document.getElementById("dailyMessage");
    if(el) el.innerText = pickDaily(messages);
}

const missions = [
    "Tap the Love Machine and collect one love result.",
    "Open one memory and remember how cute we are.",
    "Search for a secret word in Yannie Search.",
    "Open one Open When letter.",
    "Check your mood and let me comfort you.",
    "Play the cookie simulator until the cookie suffers.",
    "Open Memory World and replay how it all started."
];

const dailyMemories = [
    "The first chocolate moist cake from Dee's Desserts.",
    "The birthday pudding with HBD Aniq written on it.",
    "The night you liked my Instagram story.",
    "The lasagna arc that made me blush so hard.",
    "The wake-up call that somehow became a long call.",
    "Raya morning, matcha strawberry and champagne colours.",
    "Open house day, almost matching colours, first photo together.",
    "Our first date at the stadium, including burger with spoon lore."
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
        btn.innerText = "Completed Today 💗";
        btn.classList.add("done");
        status.innerText = "Come back tomorrow for a new little mission.";
    }
    else{
        btn.innerText = "Complete Today's Mission";
        btn.classList.remove("done");
        status.innerText = "Do the mission, then tap this button.";
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
    showNotification("Daily love collected. Come back tomorrow, babyy 🌞💗");
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
    happy: "I love seeing you happyyy. Please keep that smile, babyy. It is literally one of my favourite things in this world 🌸",
    miss: "I miss you moreee. Like actually more. Come find me, text me, call me, disturb me, anything. I am yours anyway 🥺💗",
    sad: "Come here, sayang. You do not have to be okay all the time. I am proud of you for surviving today, and I will stay with you through the heavy parts too.",
    mad: "Okay okay, I will not fight you. I will sit quietly, love you gently, and wait until my princess cools down 😭❤️",
    tired: "Rest, babyy. Drink water, lie down, and stop forcing yourself to carry everything. You deserve soft treatment today.",
    stress: "Breathe first. One thing at a time. You are not alone in this, okay? Tell me everything, and we solve it slowly together 📚💗"
};

function chooseMood(mood){
    document.getElementById("moodResult").innerText = moodMessages[mood];
    unlockAchievement("mood_checked");
}

const careMessages = {
    period: "Period Mode: do not fight Yannie, do not repeat annoying questions, give sweets if needed, make her laugh, and remind her she is loved.",
    silent: "When You Go Quiet: I should not panic or force you. I should ask gently, give space, and invite a slowtalk when you are ready.",
    sad: "When You Feel Sad: I stay soft, listen properly, and remind you that you are not hard to love.",
    stress: "When You’re Stressed: drink water, take a break, tell me the problem, then we handle it one by one.",
    jealous: "When You’re Jealous: the answer is reassurance, not defensiveness. You are the only one I want, always.",
    miss: "When You Miss Me: call me, text me, spam me, find me. I will always be happy to be found by you."
};

function showCare(type){
    document.getElementById("careResult").innerText = careMessages[type];
}

const secretSearches = {
    lasagna: "🍝 Secret Memory: The lasagna arc was dangerous because you were not even selling it, but you still gave it to me. For free. How was I supposed to not fall harder?",
    cake: "🍰 Secret Memory: It started with chocolate moist cake, but somehow became the start of everything.",
    "miss you": "🥺 Search Result: I miss you more. This is not negotiable.",
    queque: "❤️ Search Result: Your queque is currently loving you at maximum capacity.",
    raya: "🌙 Secret Memory: Matcha strawberry and champagne. Raya felt different because you were in it.",
    "open house": "🏠 Secret Memory: You came wearing almost the same colour. I was not normal about it.",
    kiss: "💋 System Error: Yannie still owes 100 kisses.",
    spm: "📚 Future Result: I will wait, support you, and take you seriously after SPM, always.",
    "02082009": "🎂 Birthday Girl unlocked. The world became better on 2 August 2009."
};

function searchYannie(){
    const query = document.getElementById("searchInput").value.toLowerCase().trim();
    let result = "🔍 Did you mean: Yannie?";
    let foundKey = null;

    Object.keys(secretSearches).forEach(key => {
        if(query.includes(key)){
            result = `<div class="secret-result">${secretSearches[key]}</div>`;
            foundKey = key;
        }
    });

    if(!foundKey){
        if(query.includes("love")) result = "❤️ Search Result: Yannie";
        else if(query.includes("cute")) result = "🥺 Search Result: Yannie";
        else if(query.includes("beautiful")) result = "🌸 Search Result: Yannie";
        else if(query.includes("wife")) result = "💍 Future Result: Yannie";
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
`Haii my babyy Yannieee 💗\n\nIf you're reading this because you miss me... I'm missing you sososososo much moreeeee!\n\nJust text me or even better, call me anytime. I love you sosososo much okiee sayangg?\n\nLove,\nqueque ❤️`,
`Dear sayanggg,\n\nBad days happen. Don't be sad for longg, okayy?\n\nPlease remember I will always be here waiting for youu to hear your problems and we can solve it together. Don't keep it all to yourself okayy, princess?\n\nLove youu,\nqueque ❤️`,
`Dear Hasrieyanniee,\n\nI know you are stressed right noww, but it's finee. Take a break, drink water, and cool off slowly.\n\nYou can even let out your stress on me, prettyyy. You've got this my lovee. I believe in youu ❤️`,
`Dear princess,\n\nDon't overthink too much okayy, sweetheart? I will always find youu and only youu babyyy.\n\nI promise sayanggg, I will love youu and only youu 🌸`,
`Happy Birthday, my lovee 🎂\n\nYou deserve the softest day, the sweetest cake, and the biggest reminder that you are loved beyond words. I am so thankful you exist.`,
`After SPM, babyy 📚\n\nI hope you know I meant it. I will wait, support you, and take you seriously. I am proud of you already, and I cannot wait to see the life you build.`
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
    showNotification("Main letter completed. A surprise is calling soon... 💌");
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

function playMusic(){ document.getElementById("music").play(); }

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
    toast.innerHTML = `<b>Achievement Unlocked</b><br>${data.icon} ${data.title}`;
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
        showNotification("Secret Vault unlocked 🎁");
    }
}

function renderVault(){
    const el = document.getElementById("vaultContent");
    if(!el) return;
    const reqs = vaultRequirements();
    const ready = reqs.every(req => req.done);
    if(!ready){
        el.innerHTML = `<h3>Vault Locked 🔒</h3><p>Complete these little love tasks to unlock the final secret.</p><div class="vault-progress">${reqs.map(req => `<div class="vault-check">${req.done ? "✅" : "⬜"} ${req.label}</div>`).join("")}</div>`;
        return;
    }
    el.innerHTML = `<h3>Vault Unlocked 🎁</h3>
        <p class="vault-final">You found the whole Yannie World.</p>
        <p>Thank you for being my favourite person, my safest place, my prettiest girl, and the reason this whole thing exists.</p>
        <p><b>I love youu, Hasrieyannie Iman Delaila. Always.</b></p>
        <button onclick="triggerFacetime()">Replay Surprise Call ❤️</button>`;
}

function openYannieTube(){
    unlockAchievement("yannietube_visitor");
    window.open("yannietube.html","_blank");
}

function setupLoveMachine(){
    const loveResults = [
        "💗 Love Level: 9999999%",
        "🌸 Yannie Happiness: MAXIMUM",
        "🥺 Missing Level: CRITICAL",
        "💌 Hug Requirement: IMMEDIATELY",
        "❤️ Soulmate Status: CONFIRMED",
        "🐱 Mofusand Approval: YES",
        "✨ Cuteness Level: DANGEROUS"
    ];
    document.getElementById("loveButton").addEventListener("click",()=>{
        const result = loveResults[Math.floor(Math.random()*loveResults.length)];
        document.getElementById("loveResult").innerHTML = result;
    });
}

function createFlower(x,y){
    const stickers = ["🌼","🌸","💗","✨","🤎"];
    const flower = document.createElement("div");
    flower.className = "cursorFlower";
    flower.innerHTML = stickers[Math.floor(Math.random()*stickers.length)];
    flower.style.left = x + "px";
    flower.style.top = y + "px";
    document.body.appendChild(flower);
    setTimeout(()=>flower.remove(),1000);
}

document.addEventListener("pointerdown", e => createFlower(e.pageX,e.pageY));

document.addEventListener("pointermove", e => {
    const now = Date.now();
    if(now - lastFlowerTime > 180){
        lastFlowerTime = now;
        createFlower(e.pageX,e.pageY);
    }
});

function startDecorations(){
    const decor = ["🌼","💗","✨","🌸"];
    setInterval(()=>{
        const item = document.createElement("div");
        item.className = "decor";
        item.innerHTML = decor[Math.floor(Math.random()*decor.length)];
        item.style.left = Math.random()*100 + "vw";
        item.style.fontSize = (18+Math.random()*22) + "px";
        item.style.animationDuration = (13+Math.random()*12) + "s";
        document.getElementById("backgroundDecor").appendChild(item);
        setTimeout(()=>item.remove(),26000);
    },1800);

    const cats = ["images/cat1.png","images/cat2.png","images/cat3.png"];
    setInterval(()=>{
        const cat = document.createElement("img");
        cat.src = cats[Math.floor(Math.random()*cats.length)];
        cat.className = "floatingCat";
        cat.style.left = Math.random()*100 + "vw";
        document.body.appendChild(cat);
        setTimeout(()=>cat.remove(),25000);
    },10000);

    const loveMessages = ["I love you ❤️","Miss you 🥺","Mwah 😚","Thinking about Yannie 💗","Pretty girl 🌸","Come hereee ❤️","Need hugs 🥺","My princess 👑"];
    setInterval(()=>{
        const msg = document.createElement("div");
        msg.className = "loveFly";
        msg.innerHTML = loveMessages[Math.floor(Math.random()*loveMessages.length)];
        msg.style.left = Math.random()*82 + "vw";
        msg.style.top = Math.random()*76 + "vh";
        msg.style.fontSize = (0.9 + Math.random()*0.45) + "rem";
        document.body.appendChild(msg);
        setTimeout(()=>msg.remove(),8000);
    },6500);
}

const sweetNotifications = [
    "i miss youuu so much yannieee 🥺💗",
    "i lovee youuu babyyy ❤️",
    "wachu doinggg rn sayangg? 🌸",
    "pleaseeee find me everytimeee princess 💌",
    "mwahhh mwahhh sending youu virtual kissess 💋💋",
    "random reminder that you have all my time and attentionn sayangkuuu ❤️"
];

function showNotification(customMessage){
    const notification = document.createElement("div");
    notification.className = "fake-notification";
    const now = new Date();
    const time = now.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});
    const message = customMessage || sweetNotifications[Math.floor(Math.random()*sweetNotifications.length)];
    notification.innerHTML = `<div class="notification-top"><div class="notification-app">💬 Messages</div><div>${time}</div></div><div class="notification-name">Queque ❤️</div><div class="notification-text">${message}</div>`;
    document.body.appendChild(notification);
    setTimeout(()=>notification.remove(),8000);
}

function scheduleNotification(){
    const randomTime = 240000 + Math.random()*180000;
    setTimeout(()=>{
        showNotification();
        scheduleNotification();
    },randomTime);
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
        showNotification("YannieTok Shop is live. Dubai Cookie drop is waiting 🍪");
    }

    function addToCart(){
        cartItems = qty;
        updateCartUI();
        showNotification("Dubai Cookie added to cart 🛒");
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
            showNotification("Order delivered! Cookie simulator unlocked 🍪");
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
        showNotification("Only one left, babyyy. This drop is exclusive 😭");
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
    startDecorations();
    scheduleNotification();
});
