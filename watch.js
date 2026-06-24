const params =
new URLSearchParams(
window.location.search
);

document
.getElementById("mainVideo")
.src =
params.get("video");

document
.getElementById("videoTitle")
.innerText =
params.get("title");

document
.getElementById("videoViews")
.innerText =
params.get("views")
+
" views";

// 🌸 FLOWERS

const flowers = [

"🌸",
"🌷",
"🌼",
"💗",
"✨"

];

setInterval(()=>{

const flower =
document.createElement("div");

flower.className =
"floatingFlower";

flower.innerHTML =
flowers[
Math.floor(
Math.random() *
flowers.length
)
];

flower.style.left =
Math.random()*100 +
"vw";

flower.style.animationDuration =
(8 + Math.random()*8)

* "s";

document
.getElementById(
"flowerBackground"
)
.appendChild(
flower
);

setTimeout(()=>{

flower.remove();

},16000);

},800);

// ❤️ LIKE BUTTON

const likeButton =
document.getElementById(
"likeButton"
);

const likeCount =
document.getElementById(
"likeCount"
);

let liked =
localStorage.getItem(
"liked-" +
params.get("title")
);

if(liked){

likeButton.style.background =
"#ffe4ec";

likeCount.innerText =
"1M";

}

likeButton.addEventListener(
"click",
()=>{

    const rect =
likeButton.getBoundingClientRect();

explodeLove(

rect.left +
rect.width/2,

rect.top +
rect.height/2

);

if(liked) return;

liked = true;

localStorage.setItem(
"liked-" +
params.get("title"),
true
);

likeCount.innerText =
"1M";

likeButton.animate(

[
{
transform:"scale(1)"
},
{
transform:"scale(1.5)"
},
{
transform:"scale(.9)"
},
{
transform:"scale(1)"
}
],

{
duration:500
}

);

setTimeout(()=>{

likeButton.style.transform =
"scale(1)";

},300);

likeButton.style.background =
"#ffe4ec";

}
);

// 💗 SUBSCRIBE

const subscribeButton =
document.getElementById(
"subscribeButton"
);

let subscribed =
localStorage.getItem(
"subscribed"
);

if(subscribed){

subscribeButton.innerHTML =
"Subscribed ❤️";

}

subscribeButton.addEventListener(
"click",
()=>{

    const rect =
subscribeButton
.getBoundingClientRect();

explodeLove(

rect.left +
rect.width/2,

rect.top +
rect.height/2

);

subscribeButton.innerHTML =
"Subscribed ❤️";

subscribeButton.animate(

[
{
transform:"scale(1)"
},
{
transform:"scale(1.4)"
},
{
transform:"scale(.9)"
},
{
transform:"scale(1)"
}
],

{
duration:600
}

);

setTimeout(()=>{

subscribeButton.style.transform =
"scale(1)";

},300);

localStorage.setItem(
"subscribed",
true
);

});

// 💬 COMMENTS

const commentInput =
document.getElementById(
"commentInput"
);

const commentButton =
document.getElementById(
"commentButton"
);

const commentsList =
document.getElementById(
"commentsList"
);

const commentKey =
"comments-" +
params.get("title");

let comments =
JSON.parse(
localStorage.getItem(
commentKey
)
) || [

"Need more Yannie content 😭",

"Watching this for the 87th time ❤️",

"She's so prettyyy 🌸"

];

function renderComments(){

commentsList.innerHTML =
"";

comments.forEach(comment=>{

commentsList.innerHTML +=

`

<div class="comment">

<strong>
Yannie ❤️
</strong>

<p>
${comment}
</p>

</div>
`;

});

}

renderComments();

commentButton.addEventListener(
"click",
()=>{

if(
commentInput.value.trim()
=== ""
) return;

comments.unshift(
commentInput.value
);

localStorage.setItem(
commentKey,
JSON.stringify(comments)
);

renderComments();

commentInput.value =
"";

});

function explodeLove(x,y){

    const particles = [

        "💗",
        "❤️",
        "🌸",
        "🌷",
        "🌼",
        "✨",
        "💕",
        "💖"

    ];

    for(let i=0;i<25;i++){

        const particle =
        document.createElement("div");

        particle.className =
        "explosion";

        particle.innerHTML =
        particles[
            Math.floor(
                Math.random() *
                particles.length
            )
        ];

        particle.style.left =
        x + "px";

        particle.style.top =
        y + "px";

        particle.style.setProperty(
        "--x",
        (Math.random()*300-150)
        + "px"
        );

        particle.style.setProperty(
        "--y",
        (Math.random()*300-150)
        + "px"
        );

        document.body.appendChild(
        particle
        );

        setTimeout(()=>{

            particle.remove();

        },1000);

    }

}
