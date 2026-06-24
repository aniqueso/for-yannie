const videos = [

{
    title:"Lelaki Mengejar Impian",
    file:"videos/us1.MP4",
    views:"17.2M",
    
    upload:"2 years ago"
},

{
    title:"Outfit Reveal!",
    file:"videos/us2.MP4",
    views:"8.4M",
    
    upload:"1 year ago"
},

{
    title:"uhmmmmmmm..",
    file:"videos/us3.MP4",
    views:"29M",
   
    upload:"11 months ago"
},

{
    title:"Cinema Outfit",
    file:"videos/us4.MP4",
    views:"15.7M",

    upload:"3 months ago"
}

];

const grid =
document.getElementById("videoGrid");

videos.forEach(video=>{

    const card =
    document.createElement("div");

    card.className =
    "video-card";

    card.innerHTML = `

        <video
        src="${video.file}"
        muted>
        </video>

        <h3>
        ${video.title}
        </h3>

        <p>
        ${video.views}
        views •
        ${video.upload}
        </p>

    `;

    card.addEventListener(
    "click",
    ()=>{

        location.href =
        `watch.html?video=${
        encodeURIComponent(video.file)
        }&title=${
        encodeURIComponent(video.title)
        }&views=${
        encodeURIComponent(video.views)
        }`;

    });

    grid.appendChild(card);

});

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
    + "s";

    document
    .getElementById(
    "flowerBackground"
    )
    .appendChild(flower);

    setTimeout(()=>{

        flower.remove();

    },16000);

},800);