const PASSWORD = "02082009";

function checkPassword(){

const input =
document.getElementById("passwordInput").value;

if(input === PASSWORD){

document.getElementById("lockScreen").style.display="none";

document.getElementById("website").style.display="block";

}
else{
alert("Sorry my babyy, but you've entered the wrong password! (hint, it's your birthdate!)😔");
}

}

function showSection(id){

document.querySelectorAll("section")
.forEach(section=>{
section.classList.remove("active");
});

document
.getElementById(id)
.classList.add("active");

}

showSection("home");

function countdown(){

    const birthday =
    new Date("2026-08-02T00:00:00");

    function update(){

        const now = new Date();

        const diff =
        birthday - now;

        if(diff <= 0){

            document
            .getElementById("countdown")
            .innerHTML =
            "🎉 Happy 17th Birthday Yannie!";

            return;
        }

        const days =
        Math.floor(
            diff / 86400000
        );

        const hours =
        Math.floor(
            (diff % 86400000)
            / 3600000
        );

        const minutes =
        Math.floor(
            (diff % 3600000)
            / 60000
        );

        const seconds =
        Math.floor(
            (diff % 60000)
            / 1000
        );

        document
        .getElementById("countdown")
        .innerHTML =

        `
        <div class="countdown-number">
            ${days}
        </div>

        <div class="countdown-label">
            Countdown Until Your 17th Birthday! 🎂
        </div>

        <div class="countdown-time">

            <div class="time-box">
                ${String(hours).padStart(2,'0')}
            </div>

            <span>:</span>

            <div class="time-box">
                ${String(minutes).padStart(2,'0')}
            </div>

            <span>:</span>

            <div class="time-box">
                ${String(seconds).padStart(2,'0')}
            </div>

        </div>
        `;

    }

    update();

    setInterval(update,1000);

}
countdown();
const messages=[

"I love you so so much sayanggg 💗",
"I REALLY REALLY MISS YOUU MY BABYY 🌸",
"I made this website just for youu, lovee! ❤️",
"Thank you for becoming a part of my life, yannieee 🥰",


];

document.getElementById("dailyMessage")
.innerText =
messages[Math.floor(Math.random()*messages.length)];

const openWhenLetters=[

`Haii my babyy Yannieee 💗

If you're reading this because
you miss me...

I'm missing you sososososo much moreeeee!

But it's fine, I will be here for youu, just text me or ven better, call me anytime! I love you sosososo much okiee sayangg?

Love,
queque ❤️`,

`Dear sayanggg,

Bad days happen. Don't be sad for longg, okayy?

But please remember
I will always be here waiting for youu to hear your prroblems and we can solve it together!

Don't keep it all to yourself okayy, princess? 

Love youu,
queque ❤️`,

`Dear hasrieyanniee,

I know you are currently stressed outt right noww, but it's finee.

Don't forget to take a break, drink much water, and cool off in any way possibleee

You can even let out your stress on me, prettyyy.


You've got this my lovee I believe in youu ❤️`,

`Dear princess,

Don't overthink much okayy, sweetheart? As I always saidd, I will always find youu and only youu babyyy!

I promise sayanggg I will love youu and only youu 🌸`

];

function openLetter(index){

document.getElementById(
"letterModal"
).style.display="flex";

document.getElementById(
"letterText"
).innerText=
openWhenLetters[index];

}

function closeLetter(){

document.getElementById(
"letterModal"
).style.display="none";

}


function playMusic(){

document
.getElementById("music")
.play();

}
const decor = ["🌼","💗","✨","🌸"];

setInterval(()=>{

    const item =
    document.createElement("div");

    item.className="decor";

    item.innerHTML =
    decor[Math.floor(Math.random()*decor.length)];

    item.style.left =
    Math.random()*100+"vw";

    item.style.fontSize =
    (20+Math.random()*30)+"px";

    item.style.animationDuration =
    (10+Math.random()*10)+"s";

    document
    .getElementById("backgroundDecor")
    .appendChild(item);

    setTimeout(()=>{
        item.remove();
    },20000);

},600);

const cats=[
"images/cat1.png",
"images/cat2.png",
"images/cat3.png"
];

setInterval(()=>{

    const cat =
    document.createElement("img");

    cat.src =
    cats[Math.floor(Math.random()*cats.length)];

    cat.className="floatingCat";

    cat.style.left =
    Math.random()*100+"vw";

    document.body.appendChild(cat);

    setTimeout(()=>{
        cat.remove();
    },25000);

},5000);

document.addEventListener("mousemove",(e)=>{

const flower=
document.createElement("div");

flower.innerHTML="🌼";

flower.className="cursorFlower";

flower.style.left=e.pageX+"px";
flower.style.top=e.pageY+"px";

document.body.appendChild(flower);

setTimeout(()=>{
flower.remove();
},1000);

});

function openPhoto(
img,
memory
){

document.getElementById(
"photoModal"
).style.display="flex";

document.getElementById(
"modalImage"
).src=img;

document.getElementById(
"modalMemory"
).innerText=memory;

}

function closePhoto(){

document.getElementById(
"photoModal"
).style.display="none";

}

const tapStickers = [
    "🌼",
    "🌸",
    "💗",
    "✨",
    "🤎"
];

function createFlower(x,y){

    const flower =
    document.createElement("div");

    flower.className =
    "cursorFlower";

    flower.innerHTML =
    tapStickers[
        Math.floor(
            Math.random() *
            tapStickers.length
        )
    ];

    flower.style.left =
    x + "px";

    flower.style.top =
    y + "px";

    document.body.appendChild(
        flower
    );

    setTimeout(()=>{
        flower.remove();
    },1000);

}

document.addEventListener(
"touchstart",
(e)=>{

    const touch = e.touches[0];

    createFlower(
        touch.pageX,
        touch.pageY
    );

});

document
.getElementById("loveButton")
.addEventListener("click", function(){

    const loveResults = [

"💗 Love Level: 9999999%",

"🌸 Yannie Happiness: MAXIMUM",

"🥺 Missing Level: CRITICAL",

"💌 Hug Requirement: IMMEDIATELY",

"❤️ Soulmate Status: CONFIRMED",

"🐱 Mofusand Approval: YES",

"✨ Cuteness Level: DANGEROUS"

];
document
.getElementById("loveButton")
.addEventListener("click", function(){

    const result =
    loveResults[
        Math.floor(
            Math.random() *
            loveResults.length
        )
    ];

    document
    .getElementById("loveResult")
    .innerHTML = result;
});
});

function searchYannie(){

    const query =
    document
    .getElementById("searchInput")
    .value
    .toLowerCase();

    let result;

    if(
        query.includes("love")
    ){

        result =
        "❤️ Search Result: Yannie";

    }

    else if(
        query.includes("cute")
    ){

        result =
        "🥺 Search Result: Yannie";

    }

    else if(
        query.includes("beautiful")
    ){

        result =
        "🌸 Search Result: Yannie";

    }

    else if(
        query.includes("wife")
    ){

        result =
        "💍 Future Result: Yannie";

    }

    else{

        result =
        "🔍 Did you mean: Yannie?";

    }

    document
    .getElementById("searchResult")
    .innerHTML =
    result;

}

const loveMessages = [

    "I love you ❤️",
    "Miss you 🥺",
    "Mwah 😚",
    "Thinking about Yannie 💗",
    "Pretty girl 🌸",
    "Come hereee ❤️",
    "Need hugs 🥺",
    "You're beautiful 💕",
    "I MISS YOUUU 😭",
    "My princess 👑"

];

setInterval(()=>{

    const msg =
    document.createElement("div");

    msg.className =
    "loveFly";

    msg.innerHTML =
    loveMessages[
        Math.floor(
            Math.random() *
            loveMessages.length
        )
    ];

    msg.style.left =
    Math.random()*85 + "vw";

    msg.style.top =
    Math.random()*80 + "vh";

    msg.style.fontSize =
    (0.9 + Math.random()*0.6) +
    "rem";

    document.body.appendChild(msg);

    setTimeout(()=>{

        msg.remove();

    },8000);

},3000);

const sweetNotifications = [

    "i miss youuu so much yannieee 🥺💗",

    "i lovee youuu babyyy ❤️",

    "wachu doinggg rn sayangg? 🌸",

    "pleaseeee find me everytimeee princess 💌",

    "mwahhh mwahhh sending youu virtual kissess 💋💋",

    "MANAAAAA MY HASRIEYANNIEEE NIEEEE 😭",

    "random reminder that you have all my time and attentionn sayangkuuu ❤️",

    "SHANDARR SEDANG MENCARII YANNIEEEEE PLS CALL HIM SEKARANGG 📢😭💗"

];

function showNotification(){

    const notification =
    document.createElement("div");

    notification.className =
    "fake-notification";

    const now =
    new Date();

    const time =
    now.toLocaleTimeString(
        [],
        {
            hour:"numeric",
            minute:"2-digit"
        }
    );

    const message =
    sweetNotifications[
        Math.floor(
            Math.random() *
            sweetNotifications.length
        )
    ];

    notification.innerHTML = `

        <div class="notification-top">

            <div class="notification-app">
                💬 Messages
            </div>

            <div>
                ${time}
            </div>

        </div>

        <div class="notification-name">
            Queque ❤️
        </div>

        <div class="notification-text">
            ${message}
        </div>

    `;

    document.body.appendChild(
        notification
    );

    setTimeout(()=>{

        notification.remove();

    },8000);

}

function scheduleNotification(){

    const randomTime =

        180000 +

        Math.random() * 120000;

    setTimeout(()=>{

        showNotification();

        scheduleNotification();

    }, randomTime);

}

scheduleNotification();

setTimeout(()=>{

    showNotification();

},30000);

document
.getElementById("openCookieShop")
.addEventListener("click",()=>{

    document
    .getElementById("cookieShop")
    .style.display="flex";

});


function closeCookieShop(){

    document
    .getElementById("cookieShop")
    .style.display="none";

}

document
.getElementById("buyCookieButton")
.addEventListener("click",()=>{

    const status =
    document.getElementById(
    "cookieStatus"
    );

    status.innerHTML =
    "Processing payment...";

    setTimeout(()=>{

        status.innerHTML =
        "Verifying Yannie status...";

    },1000);

    setTimeout(()=>{

        status.innerHTML =
        "Approved ❤️";

    },2000);

    setTimeout(()=>{

        status.innerHTML =
        "Preparing cookie...";

    },3000);

    setTimeout(()=>{

        status.innerHTML =
        "🚚 Out for delivery";

    },4000);

    setTimeout(()=>{

        document
        .getElementById("cookieShop")
        .style.display="none";

        document
        .getElementById(
        "cookieSimulator"
        )
        .style.display="flex";

    },5000);

});

let cookieBites = 0;

const cookieMessages = [

"Fresh from the oven 😋",

"Marshmallow layer detected 🍫",

"KUNAFA CORE DISCOVERED 😭",

"One more biteee",

"Yannie is enjoying this cookie 🌸",

"Cookie integrity critical ⚠️",

"Last bite incoming 🥺"

];

document
.getElementById("cookieImage")
.addEventListener("click",()=>{

    if(cookieBites < 7){

        cookieBites++;

        document
        .getElementById("cookieImage")
        .src =
        `images/cookie${cookieBites}.png`;

        document
        .getElementById("cookieText")
        .innerHTML =
        cookieMessages[
        cookieBites-1
        ];

    }

    else{

        document
        .getElementById("cookieText")
        .innerHTML =

        "😭 YANNIE ATE THE WHOLE COOKIE<br><br>🐱 Mofusand stole the crumbs.";

    }

});

setInterval(()=>{

    document
    .getElementById("viewerCount")
    .innerHTML =

    `⚡ ${
        10 +
        Math.floor(
            Math.random()*10
        )
    } people viewing now`;

},3000
);

function closeCookieSimulator(){

    document
    .getElementById("cookieSimulator")
    .style.display="none";

}

function openYannieTube(){

    window.open(
        "yannietube.html",
        "_blank"
    );

}

setTimeout(()=>{

    document
    .getElementById(
    "facetimePopup"
    )
    .style.display =
    "flex";

},13000);

document
.getElementById(
"acceptCall"
)
.addEventListener(
"click",
()=>{

    document
    .getElementById(
    "facetimePopup"
    )
    .style.display =
    "none";

    document
    .getElementById(
    "videoCallScreen"
    )
    .style.display =
    "block";

    const video =
    document
    .getElementById(
    "callVideo"
    );

    video.muted = false;

    video.play();

});

const video =
document
.getElementById(
"callVideo"
);

video.addEventListener(
"ended",
()=>{

    document
    .getElementById(
    "videoCallScreen"
    )
    .style.display =
    "none";

    showCallEnded();

});

function showCallEnded(){

    document
    .getElementById(
    "callEndedScreen"
    )
    .style.display =
    "flex";

    setTimeout(()=>{

        document
        .getElementById(
        "callEndedScreen"
        )
        .style.display =
        "none";

    },3000);

}
