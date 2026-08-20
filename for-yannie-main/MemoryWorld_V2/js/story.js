/* =========================================================
   MEMORY WORLD — STORY DATA V2
   File: js/story.js

   Version focus:
   - Better System 2: Yannie Signal moments
   - Better System 3: More gameplay in each chapter
   - Better System 5: Bad / weak / good / canon choice types
========================================================= */

window.MW_STORY = {
    meta: {
        title: "Memory World",
        version: "0.3.0",
        authorNote: "Interactive Aniq x Yannie arc: Bazaar to Open House."
    },

    startScene: "ch1_morning_start",

    stats: {
        affection: { label: "Affection", min: -5, max: 20, default: 0 },
        trust: { label: "Trust", min: -5, max: 20, default: 0 },
        confidence: { label: "Confidence", min: -5, max: 20, default: 0 },
        awkwardness: { label: "Awkward", min: 0, max: 15, default: 0 },
        comfort: { label: "Comfort", min: -5, max: 20, default: 0 },
        signal: { label: "Signal", min: 0, max: 20, default: 0 }
    },

    characters: {
        narrator: { name: "Narrator" },
        aniq: { name: "Aniq", spriteId: "aniq" },
        yannie: { name: "Yannie", spriteId: "yannie" },
        dad: { name: "Dad", spriteId: "dad" },
        friend: { name: "Friend" },
        mom: { name: "Mom" },
        yannieFriend: { name: "Yannie's Friend" }
    },

    scenes: {
        /* =====================================================
           CHAPTER 1 — THE BAZAAR
        ===================================================== */

        ch1_morning_start: {
            type: "story",
            chapterLabel: "Chapter 1",
            chapterTitle: "The Bazaar",
            background: "images/room.jpg",
            speaker: "Narrator",
            text: "1 March 2026. Ramadhan. A normal fasting day. Wake up. Gym. Scroll social media. Lie around. Try not to think too much.",
            next: "ch1_morning_lifesim"
        },

        ch1_morning_lifesim: {
            type: "choice",
            chapterLabel: "Chapter 1",
            chapterTitle: "Morning Routine",
            background: "images/room.jpg",
            question: "Morning phase. What do you do before the day gets heavier?",
            choices: [
                {
                    text: "Workout at the gym",
                    hint: "Start the day with discipline. Confidence matters later.",
                    choiceType: "good",
                    tone: "good",
                    next: "ch1_afternoon_thoughts",
                    effects: [
                        { type: "setFlag", key: "wentGym", value: true },
                        { type: "addStat", key: "confidence", amount: 1 },
                        { type: "addMemory", value: "Aniq started Ramadhan with a gym session." }
                    ]
                },
                {
                    text: "Scroll social media for too long",
                    hint: "Relatable, but it makes you overthink more.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch1_afternoon_thoughts",
                    effects: [
                        { type: "setFlag", key: "doomScrolled", value: true },
                        { type: "addStat", key: "confidence", amount: -1 },
                        { type: "addStat", key: "awkwardness", amount: 1 }
                    ]
                },
                {
                    text: "Lie down and imagine a random love story",
                    hint: "Not productive, but very Aniq POV.",
                    choiceType: "canon",
                    tone: "canon",
                    next: "ch1_afternoon_thoughts",
                    effects: [
                        { type: "setFlag", key: "imaginedLove", value: true },
                        { type: "addStat", key: "comfort", amount: 1 }
                    ]
                }
            ]
        },

        ch1_afternoon_thoughts: {
            type: "choice",
            chapterLabel: "Chapter 1",
            chapterTitle: "Aniq's POV",
            background: "images/room.jpg",
            question: "The afternoon feels slow. Your mind starts talking louder than usual.",
            choices: [
                {
                    text: "Think: When will I ever find love?",
                    hint: "You admit the thought instead of running from it.",
                    choiceType: "canon",
                    tone: "canon",
                    next: "ch1_evening_dad",
                    effects: [
                        { type: "setFlag", key: "thoughtAboutLove", value: true },
                        { type: "addMemory", value: "Aniq wondered when he would ever find love." }
                    ]
                },
                {
                    text: "Tell yourself: maybe today will be different",
                    hint: "Small hope. Small courage.",
                    choiceType: "good",
                    tone: "good",
                    next: "ch1_evening_dad",
                    effects: [
                        { type: "setFlag", key: "hopefulStart", value: true },
                        { type: "addStat", key: "confidence", amount: 1 }
                    ]
                },
                {
                    text: "Ignore the feeling completely",
                    hint: "You survive the moment, but you do not grow from it.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch1_evening_dad",
                    effects: [
                        { type: "setFlag", key: "ignoredLonelyFeeling", value: true },
                        { type: "addStat", key: "comfort", amount: -1 }
                    ]
                }
            ]
        },

        ch1_evening_dad: {
            type: "vn",
            chapterLabel: "Chapter 1",
            chapterTitle: "The Bazaar",
            background: "images/livingroom.jpg",
            speaker: "Dad",
            character: "dad",
            text: "Nak ikut pergi bazaar? Dekat Lima Kedai.",
            next: "ch1_dad_choice"
        },

        ch1_dad_choice: {
            type: "choice",
            chapterLabel: "Chapter 1",
            chapterTitle: "The Bazaar",
            background: "images/livingroom.jpg",
            question: "Dad is going to Lima Kedai bazaar to find food for berbuka.",
            choices: [
                {
                    text: "Yes, ikut pergi bazaar",
                    hint: "Canon route. A small yes creates the whole story.",
                    choiceType: "canon",
                    tone: "canon",
                    next: "ch1_bazaar_arrival",
                    effects: [
                        { type: "setFlag", key: "wentBazaar", value: true },
                        { type: "addStat", key: "confidence", amount: 1 },
                        { type: "addMemory", value: "Aniq said yes to Lima Kedai bazaar." }
                    ]
                },
                {
                    text: "No, stay home",
                    hint: "Bad ending. No bazaar, no cake, no Yannie.",
                    choiceType: "badEnd",
                    tone: "bad",
                    next: "ending_stayed_home",
                    effects: [
                        { type: "setFlag", key: "stayedHome", value: true }
                    ]
                }
            ]
        },

        ch1_bazaar_arrival: {
            type: "story",
            chapterLabel: "Chapter 1",
            chapterTitle: "Lima Kedai Bazaar",
            background: "images/bazaar.jpg",
            speaker: "Narrator",
            text: "The bazaar is alive. Tents everywhere. Smoke from grills. Plastic bags swinging from people's hands. The smell of food hits before you even decide where to walk.",
            next: "ch1_bazaar_explore"
        },

        ch1_bazaar_explore: {
            type: "explore",
            chapterLabel: "Chapter 1",
            chapterTitle: "Bazaar Gameplay",
            background: "images/bazaar.jpg",
            location: "Lima Kedai Bazaar",
            time: "35 minutes before Maghrib",
            status: "Goal: buy food first, then find dessert.",
            question: "Where do you walk?",
            choices: [
                {
                    text: "Main food stall",
                    hint: "Buy your meal first. Responsible route.",
                    choiceType: "good",
                    tone: "good",
                    next: "ch1_food_stall",
                    effects: [
                        { type: "setFlag", key: "boughtMeal", value: true },
                        { type: "addInventory", value: "Main Meal" },
                        { type: "addStat", key: "trust", amount: 1 }
                    ]
                },
                {
                    text: "Drinks stall",
                    hint: "Useful, but you still need food.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch1_drinks_stall",
                    effects: [
                        { type: "setFlag", key: "boughtDrink", value: true },
                        { type: "addInventory", value: "Cold Drink" }
                    ]
                },
                {
                    text: "Walk around with no plan",
                    hint: "You might notice something interesting.",
                    choiceType: "good",
                    tone: "good",
                    next: "ch1_random_walk",
                    effects: [
                        { type: "setFlag", key: "wanderedBazaar", value: true },
                        { type: "addStat", key: "confidence", amount: 1 }
                    ]
                },
                {
                    text: "Go toward the dessert tents",
                    hint: "This is where the memory begins.",
                    lockedHint: "Buy a meal or walk around first. You have not naturally reached that area yet.",
                    choiceType: "canon",
                    tone: "canon",
                    require: { anyFlagTrue: ["boughtMeal", "wanderedBazaar"] },
                    next: "ch1_dees_desserts"
                },
                {
                    text: "Leave the bazaar early",
                    hint: "Bad ending. You avoid the exact tent that changes everything.",
                    choiceType: "badEnd",
                    tone: "bad",
                    next: "ending_left_bazaar_early"
                }
            ]
        },

        ch1_food_stall: {
            type: "story",
            chapterLabel: "Chapter 1",
            chapterTitle: "Bazaar Gameplay",
            background: "images/bazaar.jpg",
            speaker: "Narrator",
            text: "You buy your meal. Dad looks satisfied. One problem solved. Now something sweet sounds nice.",
            next: "ch1_bazaar_explore"
        },

        ch1_drinks_stall: {
            type: "story",
            chapterLabel: "Chapter 1",
            chapterTitle: "Bazaar Gameplay",
            background: "images/bazaar.jpg",
            speaker: "Narrator",
            text: "You buy a drink first. Not wrong, but your stomach reminds you that berbuka needs more than sugar water.",
            next: "ch1_bazaar_explore"
        },

        ch1_random_walk: {
            type: "story",
            chapterLabel: "Chapter 1",
            chapterTitle: "Bazaar Gameplay",
            background: "images/bazaar.jpg",
            speaker: "Narrator",
            text: "You walk through the crowd with no plan. Somehow, the random path brings you closer to the dessert tents.",
            next: "ch1_bazaar_explore"
        },

        ch1_dees_desserts: {
            type: "story",
            chapterLabel: "Chapter 1",
            chapterTitle: "Dee's Desserts",
            background: "images/deesdesserts.jpg",
            speaker: "Narrator",
            text: "One tent catches your eye: Dee's Desserts. Then you see her. Short. Cute. Glasses. Sitting at the side until she notices you.",
            next: "ch1_yannie_greets"
        },

        ch1_yannie_greets: {
            type: "vn",
            chapterLabel: "Chapter 1",
            chapterTitle: "First Sight",
            background: "images/deesdesserts.jpg",
            speaker: "Yannie",
            character: "yannie",
            text: "Nak beli apa?",
            next: "ch1_first_response"
        },

        ch1_first_response: {
            type: "choice",
            chapterLabel: "Chapter 1",
            chapterTitle: "First Sight",
            background: "images/deesdesserts.jpg",
            question: "You are mesmerised, but you obviously cannot say that. Respond normally. Please.",
            choices: [
                {
                    text: "Chocolate moist cake satu",
                    hint: "Canon route. This cake becomes the excuse for everything later.",
                    choiceType: "canon",
                    tone: "canon",
                    next: "ch1_buy_cake",
                    effects: [
                        { type: "setFlag", key: "boughtChocolateMoist", value: true },
                        { type: "addInventory", value: "Chocolate Moist Cake" },
                        { type: "addStat", key: "affection", amount: 1 },
                        { type: "addStat", key: "comfort", amount: 1 },
                        { type: "addMemory", value: "Aniq bought chocolate moist cake from Yannie." }
                    ]
                },
                {
                    text: "Apa yang paling sedap dekat sini?",
                    hint: "Good choice. It gives her space to recommend something.",
                    choiceType: "good",
                    tone: "good",
                    next: "ch1_yannie_recommend",
                    effects: [
                        { type: "addStat", key: "trust", amount: 1 },
                        { type: "addStat", key: "comfort", amount: 1 }
                    ]
                },
                {
                    text: "Uhh... kejap, saya tengok dulu",
                    hint: "Weak choice. You survive, but the pause is awkward.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch1_recover_at_tent",
                    effects: [
                        { type: "addStat", key: "awkwardness", amount: 1 }
                    ]
                },
                {
                    text: "Nothing, just looking",
                    hint: "Bad ending. You met her, then immediately removed yourself from the plot.",
                    choiceType: "badEnd",
                    tone: "bad",
                    next: "ending_just_looking"
                }
            ]
        },

        ch1_yannie_recommend: {
            type: "vn",
            chapterLabel: "Chapter 1",
            chapterTitle: "Dee's Desserts",
            background: "images/deesdesserts.jpg",
            speaker: "Yannie",
            character: "yannie",
            text: "Chocolate moist cake selalu orang ambil.",
            next: "ch1_buy_cake"
        },

        ch1_recover_at_tent: {
            type: "choice",
            chapterLabel: "Chapter 1",
            chapterTitle: "Awkward Recovery",
            background: "images/deesdesserts.jpg",
            question: "She waits politely. You need to recover.",
            choices: [
                {
                    text: "Okay, chocolate moist cake satu",
                    hint: "Good recovery. Still reaches canon cake route.",
                    choiceType: "good",
                    tone: "good",
                    next: "ch1_buy_cake",
                    effects: [
                        { type: "setFlag", key: "boughtChocolateMoist", value: true },
                        { type: "addInventory", value: "Chocolate Moist Cake" },
                        { type: "addStat", key: "affection", amount: 1 }
                    ]
                },
                {
                    text: "Panic and walk away",
                    hint: "Bad ending. The cake route dies here.",
                    choiceType: "badEnd",
                    tone: "bad",
                    next: "ending_walked_away"
                }
            ]
        },

        ch1_buy_cake: {
            type: "story",
            chapterLabel: "Chapter 1",
            chapterTitle: "Chocolate Moist Cake",
            background: "images/cake.jpg",
            speaker: "Narrator",
            text: "You pay, take the cake, and walk away like a normal customer. Inside, your brain is absolutely not normal.",
            next: "ch1_break_fast"
        },

        ch1_break_fast: {
            type: "story",
            chapterLabel: "Chapter 1",
            chapterTitle: "After Maghrib",
            background: "images/cake.jpg",
            speaker: "Narrator",
            text: "After breaking fast, you finally taste the cake. Holy damn. This is good. Too good. Suspiciously good.",
            next: "ch1_text_friend"
        },

        ch1_text_friend: {
            type: "phoneChoice",
            chapterLabel: "Chapter 1",
            chapterTitle: "Text Friend",
            background: "images/phone.jpg",
            chatName: "Friend",
            chatStatus: "Online",
            messages: [
                { from: "system", text: "You open WhatsApp." },
                { from: "me", text: "Bro." },
                { from: "me", text: "The cake from Dee's Desserts is actually insane." }
            ],
            choices: [
                {
                    text: "Ask if she takes online orders",
                    hint: "Smart. Business reason first.",
                    choiceType: "good",
                    tone: "good",
                    next: "ch1_friend_order_reply",
                    effects: [
                        { type: "addStat", key: "trust", amount: 1 },
                        { type: "setFlag", key: "askedOnlineOrders", value: true }
                    ]
                },
                {
                    text: "Ask directly for her number",
                    hint: "Works, but sounds obvious.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch1_friend_number_direct",
                    effects: [
                        { type: "addStat", key: "awkwardness", amount: 1 },
                        { type: "setFlag", key: "askedNumberDirectly", value: true }
                    ]
                },
                {
                    text: "Do nothing. Just enjoy the cake.",
                    hint: "Bad ending. You had the bridge but refused to cross it.",
                    choiceType: "badEnd",
                    tone: "bad",
                    next: "ending_no_number"
                }
            ]
        },

        ch1_friend_order_reply: {
            type: "phoneChoice",
            chapterLabel: "Chapter 1",
            chapterTitle: "Text Friend",
            background: "images/phone.jpg",
            chatName: "Friend",
            chatStatus: "Online",
            messages: [
                { from: "her", text: "Yeah she takes online orders." },
                { from: "me", text: "Can I get her number?" },
                { from: "her", text: "Nah, ni nombor dia." },
                { from: "system", text: "Yannie's number saved." }
            ],
            choices: [
                {
                    text: "Save number and stare at the contact",
                    hint: "Chapter 2 begins.",
                    choiceType: "canon",
                    tone: "canon",
                    next: "ch2_first_text_setup",
                    effects: [
                        { type: "setFlag", key: "hasYannieNumber", value: true },
                        { type: "addInventory", value: "Yannie's Number" },
                        { type: "addMemory", value: "Aniq got Yannie's number from Friend." }
                    ]
                }
            ]
        },

        ch1_friend_number_direct: {
            type: "phoneChoice",
            chapterLabel: "Chapter 1",
            chapterTitle: "Text Friend",
            background: "images/phone.jpg",
            chatName: "Friend",
            chatStatus: "Online",
            messages: [
                { from: "me", text: "Bro can I get her number?" },
                { from: "her", text: "Laju do." },
                { from: "her", text: "But okay. Nah, ni nombor dia." },
                { from: "system", text: "Yannie's number saved." }
            ],
            choices: [
                {
                    text: "Pretend you are calm",
                    hint: "You are not calm.",
                    choiceType: "canon",
                    tone: "canon",
                    next: "ch2_first_text_setup",
                    effects: [
                        { type: "setFlag", key: "hasYannieNumber", value: true },
                        { type: "addInventory", value: "Yannie's Number" },
                        { type: "addMemory", value: "Aniq got Yannie's number from Friend, not very subtly." }
                    ]
                }
            ]
        },

        /* =====================================================
           CHAPTER 2 — BIRTHDAY DISCOUNT
        ===================================================== */

        ch2_first_text_setup: {
            type: "phoneChoice",
            chapterLabel: "Chapter 2",
            chapterTitle: "Birthday Discount",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "New contact",
            messages: [
                { from: "system", text: "1 March 2026. You open her chat." },
                { from: "system", text: "Aniq POV: First text. Do not be weird. Impossible challenge." }
            ],
            choices: [
                {
                    text: "hola yannie ke ni",
                    hint: "Canon route. Casual, real, and slightly brave.",
                    choiceType: "canon",
                    tone: "canon",
                    next: "ch2_hola_reply",
                    effects: [
                        { type: "setFlag", key: "firstText", value: "hola" },
                        { type: "addStat", key: "confidence", amount: 1 },
                        { type: "addStat", key: "comfort", amount: 1 }
                    ]
                },
                {
                    text: "Hi, ni Aniq. Nak order cake.",
                    hint: "Safe business route. Less spark, more trust.",
                    choiceType: "good",
                    tone: "good",
                    next: "ch2_formal_reply",
                    effects: [
                        { type: "setFlag", key: "firstText", value: "formal" },
                        { type: "addStat", key: "trust", amount: 1 }
                    ]
                },
                {
                    text: "You yang jual cake tadi kan?",
                    hint: "Weak. Not terrible, but less smooth.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch2_plain_reply",
                    effects: [
                        { type: "setFlag", key: "firstText", value: "plain" },
                        { type: "addStat", key: "awkwardness", amount: 1 }
                    ]
                },
                {
                    text: "Hi, I saw you at bazaar. You cute lah.",
                    hint: "Bad ending. Too much, too early.",
                    choiceType: "badEnd",
                    tone: "bad",
                    next: "ending_too_direct_first_text"
                }
            ]
        },

        ch2_hola_reply: {
            type: "phoneChoice",
            chapterLabel: "Chapter 2",
            chapterTitle: "First Reply",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "Online",
            messages: [
                { from: "me", text: "hola yannie ke ni" },
                { from: "her", text: "yep nak order kan" },
                { from: "signal", text: "Signal: instant reply." }
            ],
            choices: [
                {
                    text: "Haa nak order chocolate moist cake lagi",
                    hint: "Natural. Keeps the conversation alive.",
                    choiceType: "good",
                    tone: "good",
                    next: "ch2_order_chat",
                    effects: [
                        { type: "addSignal", value: "Yannie replied instantly to your first text.", amount: 1 },
                        { type: "addStat", key: "affection", amount: 1 },
                        { type: "addStat", key: "trust", amount: 1 }
                    ]
                },
                {
                    text: "Yes. Price berapa?",
                    hint: "Business-like. Safe, but less personal.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch2_order_chat",
                    effects: [
                        { type: "addSignal", value: "Yannie replied instantly to your first text.", amount: 1 },
                        { type: "addStat", key: "trust", amount: 1 }
                    ]
                }
            ]
        },

        ch2_formal_reply: {
            type: "phoneChoice",
            chapterLabel: "Chapter 2",
            chapterTitle: "First Reply",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "Online",
            messages: [
                { from: "me", text: "Hi, ni Aniq. Nak order cake." },
                { from: "her", text: "Hi, boleh. Nak order untuk bila?" }
            ],
            choices: [
                {
                    text: "Tomorrow evening boleh?",
                    hint: "Clean and respectful.",
                    choiceType: "good",
                    tone: "good",
                    next: "ch2_order_chat",
                    effects: [
                        { type: "addStat", key: "trust", amount: 1 }
                    ]
                }
            ]
        },

        ch2_plain_reply: {
            type: "phoneChoice",
            chapterLabel: "Chapter 2",
            chapterTitle: "First Reply",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "Online",
            messages: [
                { from: "me", text: "You yang jual cake tadi kan?" },
                { from: "her", text: "Yes saya." },
                { from: "her", text: "Nak order ke?" }
            ],
            choices: [
                {
                    text: "Yes yes, sorry awkward sikit haha. Nak order cake.",
                    hint: "Good recovery. Honesty reduces awkwardness.",
                    choiceType: "good",
                    tone: "good",
                    next: "ch2_order_chat",
                    effects: [
                        { type: "addStat", key: "awkwardness", amount: -1 },
                        { type: "addStat", key: "comfort", amount: 1 },
                        { type: "addStat", key: "trust", amount: 1 }
                    ]
                },
                {
                    text: "Yeah.",
                    hint: "Weak. Dry replies make the connection colder.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch2_order_chat",
                    effects: [
                        { type: "addStat", key: "comfort", amount: -1 }
                    ]
                }
            ]
        },

        ch2_order_chat: {
            type: "phoneChoice",
            chapterLabel: "Chapter 2",
            chapterTitle: "Ordering Cake",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "Online",
            messages: [
                { from: "her", text: "Okay nanti saya arrange delivery." },
                { from: "me", text: "Alright thank you." },
                { from: "system", text: "The order is set. But your birthday is two days away." }
            ],
            choices: [
                {
                    text: "is there a birthday discount?",
                    hint: "Canon route. A joke that accidentally creates a memory.",
                    choiceType: "canon",
                    tone: "canon",
                    next: "ch2_birthday_joke_reply",
                    effects: [
                        { type: "setFlag", key: "birthdayDiscountJoke", value: true },
                        { type: "addStat", key: "confidence", amount: 1 },
                        { type: "addStat", key: "comfort", amount: 1 }
                    ]
                },
                {
                    text: "Okayy, thank you Yannie",
                    hint: "Safe. You miss the birthday pudding route.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch2_normal_delivery",
                    effects: [
                        { type: "setFlag", key: "noBirthdayHint", value: true },
                        { type: "addStat", key: "trust", amount: 1 }
                    ]
                },
                {
                    text: "My birthday soon, free cake can ah?",
                    hint: "Bad ending. Too demanding, not cute.",
                    choiceType: "badEnd",
                    tone: "bad",
                    next: "ending_free_cake_demand"
                }
            ]
        },

        ch2_birthday_joke_reply: {
            type: "phoneChoice",
            chapterLabel: "Chapter 2",
            chapterTitle: "Birthday Discount",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "Online",
            messages: [
                { from: "me", text: "is there a birthday discount?" },
                { from: "her", text: "Hahaha birthday bila?" },
                { from: "me", text: "2 days lagi" },
                { from: "her", text: "Ohh okayy" },
                { from: "system", text: "You expected nothing from that joke." }
            ],
            choices: [
                {
                    text: "Sleep thinking it was just a normal joke",
                    hint: "Continue to tomorrow's delivery.",
                    choiceType: "canon",
                    tone: "canon",
                    next: "ch2_delivery_pudding"
                }
            ]
        },

        ch2_delivery_pudding: {
            type: "story",
            chapterLabel: "Chapter 2",
            chapterTitle: "Unexpected Pudding",
            background: "images/cake.jpg",
            speaker: "Narrator",
            text: "The next evening, the delivery arrives. You open the plastic and pause. There is a caramel pudding slice inside. You did not order this.",
            next: "ch2_pudding_discovery_chat"
        },

        ch2_pudding_discovery_chat: {
            type: "phoneChoice",
            chapterLabel: "Chapter 2",
            chapterTitle: "HBD Aniq",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "Online",
            messages: [
                { from: "me", text: "Yannie I think you accidentally put pudding in my order" },
                { from: "her", text: "Nope" },
                { from: "her", text: "For your birthday" },
                { from: "system", text: "You look again. On the side, she wrote: hbd Aniq." },
                { from: "signal", text: "Signal: she remembered and added something herself." }
            ],
            choices: [
                {
                    text: "Wait seriously? Thank you, that's so nice of you 😭",
                    hint: "Good. Honest appreciation without being too much.",
                    choiceType: "signal",
                    tone: "signal",
                    next: "ch2_instagram_story",
                    effects: [
                        { type: "addSignal", value: "Yannie gave you birthday pudding with 'hbd Aniq'.", amount: 2 },
                        { type: "addStat", key: "affection", amount: 2 },
                        { type: "addStat", key: "comfort", amount: 1 },
                        { type: "addMemory", value: "Birthday pudding: hbd Aniq." }
                    ]
                },
                {
                    text: "Ohh haha thanks",
                    hint: "Weak. You hide too much, so the moment lands softer.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch2_instagram_story",
                    effects: [
                        { type: "addSignal", value: "Yannie gave you birthday pudding with 'hbd Aniq'.", amount: 1 },
                        { type: "addStat", key: "affection", amount: 1 }
                    ]
                },
                {
                    text: "This means you like me right?",
                    hint: "Bad ending. You turned a sweet gesture into pressure.",
                    choiceType: "badEnd",
                    tone: "bad",
                    next: "ending_pressured_her"
                }
            ]
        },

        ch2_normal_delivery: {
            type: "story",
            chapterLabel: "Chapter 2",
            chapterTitle: "Normal Delivery",
            background: "images/cake.jpg",
            speaker: "Narrator",
            text: "The delivery arrives normally. The cake is still great, but there is no pudding, no birthday writing, no unexpected emotional damage.",
            next: "ch2_instagram_story"
        },

        ch2_instagram_story: {
            type: "choice",
            chapterLabel: "Chapter 2",
            chapterTitle: "Instagram Story",
            background: "images/cake.jpg",
            question: "An hour before your birthday, you feel weirdly happy. Do you post the cake?",
            choices: [
                {
                    text: "Take photos with the cake and post on Instagram Story",
                    hint: "Canon route. Public but not too direct.",
                    choiceType: "canon",
                    tone: "canon",
                    next: "ch2_story_liked",
                    effects: [
                        { type: "setFlag", key: "postedCakeStory", value: true },
                        { type: "addStat", key: "confidence", amount: 1 },
                        { type: "addMemory", value: "Aniq posted birthday cake photos on Instagram." }
                    ]
                },
                {
                    text: "Keep the photos private",
                    hint: "Weak. Safe, but no story-like signal.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch3_cake_era_start",
                    effects: [
                        { type: "setFlag", key: "keptCakePhotosPrivate", value: true },
                        { type: "addStat", key: "comfort", amount: -1 }
                    ]
                },
                {
                    text: "Post five stories tagging her repeatedly",
                    hint: "Bad ending. Brother, relax.",
                    choiceType: "badEnd",
                    tone: "bad",
                    next: "ending_story_spam"
                }
            ]
        },

        ch2_story_liked: {
            type: "phoneChoice",
            chapterLabel: "Chapter 2",
            chapterTitle: "She Liked The Story",
            background: "images/phone.jpg",
            chatName: "Instagram",
            chatStatus: "Story activity",
            messages: [
                { from: "system", text: "Yannie viewed your story." },
                { from: "signal", text: "Yannie liked your story." },
                { from: "system", text: "Aniq POV: Okay. Okay okay okay. Calm down." }
            ],
            choices: [
                {
                    text: "Act normal and do not overthink. Impossible, but try.",
                    hint: "Good. Signal noticed, dignity preserved.",
                    choiceType: "signal",
                    tone: "signal",
                    next: "ch3_cake_era_start",
                    effects: [
                        { type: "addSignal", value: "Yannie liked your birthday cake story.", amount: 1 },
                        { type: "addStat", key: "comfort", amount: 1 },
                        { type: "addMemory", value: "She liked the birthday story." }
                    ]
                },
                {
                    text: "Immediately post another story to test if she likes it too",
                    hint: "Weak. Overthinking begins.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch3_cake_era_start",
                    effects: [
                        { type: "addSignal", value: "Yannie liked your birthday cake story.", amount: 1 },
                        { type: "addStat", key: "awkwardness", amount: 1 }
                    ]
                }
            ]
        },

        /* =====================================================
           CHAPTER 3 — CAKE ERA
        ===================================================== */

        ch3_cake_era_start: {
            type: "story",
            chapterLabel: "Chapter 3",
            chapterTitle: "Cake Era",
            background: "images/cake.jpg",
            speaker: "Narrator",
            text: "After that, you keep finding reasons to order. Luckily, the cake is actually good. Even your mom likes it, which is dangerously convenient.",
            next: "ch3_mom_likes_cake"
        },

        ch3_mom_likes_cake: {
            type: "choice",
            chapterLabel: "Chapter 3",
            chapterTitle: "Finding Reasons",
            background: "images/cake.jpg",
            question: "Mom says the cake is nice. This creates a perfect excuse. What do you do with it?",
            choices: [
                {
                    text: "Use Mom's request as a natural reason to order again",
                    hint: "Good. Not desperate. Actually believable.",
                    choiceType: "good",
                    tone: "good",
                    next: "ch3_order_again_chat",
                    effects: [
                        { type: "setFlag", key: "momLikesCake", value: true },
                        { type: "addStat", key: "trust", amount: 1 },
                        { type: "addStat", key: "comfort", amount: 1 },
                        { type: "addMemory", value: "Mom liked Yannie's cake, giving Aniq a natural reason to order again." }
                    ]
                },
                {
                    text: "Pretend you need cake for no reason",
                    hint: "Weak. Still works, but it feels less natural.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch3_order_again_chat",
                    effects: [
                        { type: "addStat", key: "awkwardness", amount: 1 }
                    ]
                },
                {
                    text: "Text: I just want to talk to you actually",
                    hint: "Bad ending. Too early, too intense.",
                    choiceType: "badEnd",
                    tone: "bad",
                    next: "ending_too_much_cake_era"
                }
            ]
        },

        ch3_order_again_chat: {
            type: "phoneChoice",
            chapterLabel: "Chapter 3",
            chapterTitle: "Less Business",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "Online",
            messages: [
                { from: "me", text: "Can I order again? My mom liked the cake too." },
                { from: "her", text: "Aww really? Thank youu" },
                { from: "her", text: "Same chocolate moist?" },
                { from: "signal", text: "Signal: warmer reply, extra letters, softer tone." }
            ],
            choices: [
                {
                    text: "Same one. At this point my house trusts your cake already.",
                    hint: "Good. Playful but still about cake.",
                    choiceType: "signal",
                    tone: "signal",
                    next: "ch3_topics_shift",
                    effects: [
                        { type: "addSignal", value: "Yannie replied warmly when your mom liked her cake.", amount: 1 },
                        { type: "addStat", key: "affection", amount: 1 },
                        { type: "addStat", key: "comfort", amount: 1 }
                    ]
                },
                {
                    text: "Yes same.",
                    hint: "Weak. Transaction continues, but less spark.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch3_topics_shift",
                    effects: [
                        { type: "addStat", key: "trust", amount: 1 }
                    ]
                }
            ]
        },

        ch3_topics_shift: {
            type: "phoneChoice",
            chapterLabel: "Chapter 3",
            chapterTitle: "Different Topics",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "Online",
            messages: [
                { from: "system", text: "Day by day, the messages start moving away from orders." },
                { from: "her", text: "Btw today bazaar quite tiring." },
                { from: "system", text: "Aniq POV: She told me something not related to cake." }
            ],
            choices: [
                {
                    text: "You okay? Bazaar must be tiring during Ramadhan.",
                    hint: "Good. You respond to her life, not only her product.",
                    choiceType: "good",
                    tone: "good",
                    next: "ch3_realization_route",
                    effects: [
                        { type: "addStat", key: "trust", amount: 1 },
                        { type: "addStat", key: "comfort", amount: 1 },
                        { type: "addStat", key: "affection", amount: 1 },
                        { type: "addMemory", value: "The conversation became less about orders and more about daily life." }
                    ]
                },
                {
                    text: "Still got cake stock?",
                    hint: "Weak. You pull the conversation back to business.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch3_realization_route",
                    effects: [
                        { type: "addStat", key: "trust", amount: 1 },
                        { type: "addStat", key: "comfort", amount: -1 }
                    ]
                },
                {
                    text: "I can accompany you every day if you want",
                    hint: "Bad ending. Not yet. Way too forward.",
                    choiceType: "badEnd",
                    tone: "bad",
                    next: "ending_too_forward_daily"
                }
            ]
        },

        ch3_realization_route: {
            type: "route",
            routes: [
                {
                    require: { statAtLeast: { comfort: 3 } },
                    next: "ch3_realization_good"
                },
                {
                    next: "ch3_realization_neutral"
                }
            ]
        },

        ch3_realization_good: {
            type: "story",
            chapterLabel: "Chapter 3",
            chapterTitle: "Realization",
            background: "images/night.jpg",
            speaker: "Narrator",
            text: "You realize the excuse is not just cake anymore. You are starting to like the notification. The name. The way the conversation continues.",
            next: "ch4_lasagna_start",
            effects: [
                { type: "addMemory", value: "Aniq realized he might actually be starting to like Yannie." }
            ]
        },

        ch3_realization_neutral: {
            type: "story",
            chapterLabel: "Chapter 3",
            chapterTitle: "Realization",
            background: "images/night.jpg",
            speaker: "Narrator",
            text: "You are still mostly a customer, but something small is changing. The conversation is not strong yet, but it has not closed either.",
            next: "ch4_lasagna_start"
        },

        /* =====================================================
           CHAPTER 4 — LASAGNA ARC
        ===================================================== */

        ch4_lasagna_start: {
            type: "phoneChoice",
            chapterLabel: "Chapter 4",
            chapterTitle: "Lasagna Arc",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "Online",
            messages: [
                { from: "her", text: "Wait I wanna look a tutorial on how to make lasagnas" },
                { from: "system", text: "Aniq POV: Lasagna? Is she selling it? Is this a product announcement?" }
            ],
            choices: [
                {
                    text: "Are you going to sell it? I wanna buy it.",
                    hint: "Canon route. This accidentally opens the lasagna gift scene.",
                    choiceType: "canon",
                    tone: "canon",
                    next: "ch4_she_offers_lasagna",
                    effects: [
                        { type: "addStat", key: "confidence", amount: 1 }
                    ]
                },
                {
                    text: "Rajinnya you belajar buat lasagna",
                    hint: "Good. Warm and supportive.",
                    choiceType: "good",
                    tone: "good",
                    next: "ch4_she_offers_lasagna_soft",
                    effects: [
                        { type: "addStat", key: "affection", amount: 1 },
                        { type: "addStat", key: "comfort", amount: 1 }
                    ]
                },
                {
                    text: "Oh okay",
                    hint: "Weak. Conversation almost dies.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch4_dry_recover",
                    effects: [
                        { type: "addStat", key: "comfort", amount: -1 }
                    ]
                },
                {
                    text: "Make for me la. Free ah?",
                    hint: "Bad ending. Asking free food directly ruins the sweetness.",
                    choiceType: "badEnd",
                    tone: "bad",
                    next: "ending_lasagna_fumbled"
                }
            ]
        },

        ch4_dry_recover: {
            type: "phoneChoice",
            chapterLabel: "Chapter 4",
            chapterTitle: "Recovery",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "Online",
            messages: [
                { from: "her", text: "Haha yeah saja try" },
                { from: "system", text: "The chat slows down. You can still recover." }
            ],
            choices: [
                {
                    text: "If you ever sell it, I want to buy one.",
                    hint: "Good recovery. Back to lasagna route.",
                    choiceType: "good",
                    tone: "good",
                    next: "ch4_she_offers_lasagna",
                    effects: [
                        { type: "addStat", key: "comfort", amount: 1 }
                    ]
                },
                {
                    text: "Leave the conversation there",
                    hint: "Weak. Lasagna scene closes, but story continues weaker.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch5_wakeup_request_setup",
                    effects: [
                        { type: "setFlag", key: "missedLasagnaGift", value: true },
                        { type: "addStat", key: "signal", amount: -1 }
                    ]
                }
            ]
        },

        ch4_she_offers_lasagna: {
            type: "phoneChoice",
            chapterLabel: "Chapter 4",
            chapterTitle: "Lasagna Offer",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "Online",
            messages: [
                { from: "me", text: "Are you going to sell it? I wanna buy it." },
                { from: "her", text: "Do you want it?" },
                { from: "her", text: "But I didn't sell it" },
                { from: "signal", text: "Signal: she's offering you a taste of her own cooking." }
            ],
            choices: [
                {
                    text: "Wait really? I mean yes, of course I want it 😭",
                    hint: "Signal route. Excited but still sweet.",
                    choiceType: "signal",
                    tone: "signal",
                    next: "ch4_lasagna_updates",
                    effects: [
                        { type: "setFlag", key: "lasagnaGiftUnlocked", value: true },
                        { type: "addSignal", value: "Yannie offered you homemade lasagna for free.", amount: 2 },
                        { type: "addStat", key: "affection", amount: 2 },
                        { type: "addStat", key: "comfort", amount: 1 },
                        { type: "addMemory", value: "Lasagna gift route unlocked." }
                    ]
                },
                {
                    text: "If it's not troublesome, yes please.",
                    hint: "Good. Respectful and safe.",
                    choiceType: "good",
                    tone: "good",
                    next: "ch4_lasagna_updates",
                    effects: [
                        { type: "setFlag", key: "lasagnaGiftUnlocked", value: true },
                        { type: "addSignal", value: "Yannie offered you homemade lasagna for free.", amount: 1 },
                        { type: "addStat", key: "trust", amount: 1 }
                    ]
                },
                {
                    text: "Free food? Nice.",
                    hint: "Weak. You make it sound less special.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch4_lasagna_updates",
                    effects: [
                        { type: "setFlag", key: "lasagnaGiftUnlocked", value: true },
                        { type: "addStat", key: "awkwardness", amount: 1 }
                    ]
                }
            ]
        },

        ch4_she_offers_lasagna_soft: {
            type: "phoneChoice",
            chapterLabel: "Chapter 4",
            chapterTitle: "Lasagna Offer",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "Online",
            messages: [
                { from: "me", text: "Rajinnya you belajar buat lasagna" },
                { from: "her", text: "Haha saja try" },
                { from: "her", text: "Do you want it if jadi?" },
                { from: "signal", text: "Signal: she offers before you even ask properly." }
            ],
            choices: [
                {
                    text: "Obviously yes. I volunteer as tester.",
                    hint: "Playful and warm.",
                    choiceType: "signal",
                    tone: "signal",
                    next: "ch4_lasagna_updates",
                    effects: [
                        { type: "setFlag", key: "lasagnaGiftUnlocked", value: true },
                        { type: "addSignal", value: "Yannie offered you homemade lasagna before you asked directly.", amount: 2 },
                        { type: "addStat", key: "comfort", amount: 2 },
                        { type: "addStat", key: "affection", amount: 1 }
                    ]
                }
            ]
        },

        ch4_lasagna_updates: {
            type: "phoneChoice",
            chapterLabel: "Chapter 4",
            chapterTitle: "Live Updates",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "Typing...",
            messages: [
                { from: "her", text: "I'm buying the stuff now" },
                { from: "her", text: "Need sauce, cheese, pasta sheets" },
                { from: "system", text: "Aniq POV: She is updating me? About the lasagna? About her whereabouts? Be normal." }
            ],
            choices: [
                {
                    text: "Careful jalan, bazaar area crowded right now",
                    hint: "Good. Caring without being controlling.",
                    choiceType: "good",
                    tone: "good",
                    next: "ch4_cooking_update",
                    effects: [
                        { type: "addStat", key: "trust", amount: 1 },
                        { type: "addStat", key: "comfort", amount: 1 },
                        { type: "addSignal", value: "Yannie updated you while buying lasagna ingredients.", amount: 1 }
                    ]
                },
                {
                    text: "Chef Yannie arc unlocked",
                    hint: "Playful. Good if comfort is already decent.",
                    choiceType: "signal",
                    tone: "signal",
                    next: "ch4_cooking_update",
                    effects: [
                        { type: "addStat", key: "affection", amount: 1 },
                        { type: "addStat", key: "comfort", amount: 1 },
                        { type: "addSignal", value: "Yannie updated you while buying lasagna ingredients.", amount: 1 }
                    ]
                },
                {
                    text: "Okay",
                    hint: "Weak. You receive updates but do not build on them.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch4_cooking_update",
                    effects: [
                        { type: "addStat", key: "comfort", amount: -1 }
                    ]
                }
            ]
        },

        ch4_cooking_update: {
            type: "phoneChoice",
            chapterLabel: "Chapter 4",
            chapterTitle: "Cooking Updates",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "Online",
            messages: [
                { from: "her", text: "Making sauce now" },
                { from: "her", text: "I hope jadi" },
                { from: "her", text: "Finished." },
                { from: "signal", text: "Signal: she kept updating you from start to finish." }
            ],
            choices: [
                {
                    text: "I'm invested already. Cannot fail now.",
                    hint: "Good playful reply.",
                    choiceType: "good",
                    tone: "good",
                    next: "ch4_receive_lasagna",
                    effects: [
                        { type: "addStat", key: "comfort", amount: 1 },
                        { type: "addStat", key: "affection", amount: 1 },
                        { type: "addMemory", value: "Yannie updated Aniq while making lasagna." }
                    ]
                },
                {
                    text: "Thank you for making it btw. Really.",
                    hint: "Warm and sincere.",
                    choiceType: "signal",
                    tone: "signal",
                    next: "ch4_receive_lasagna",
                    effects: [
                        { type: "addStat", key: "trust", amount: 1 },
                        { type: "addStat", key: "affection", amount: 1 },
                        { type: "addMemory", value: "Aniq sincerely thanked Yannie for making lasagna." }
                    ]
                }
            ]
        },

        ch4_receive_lasagna: {
            type: "choice",
            chapterLabel: "Chapter 4",
            chapterTitle: "Taste Test",
            background: "images/cake.jpg",
            question: "The next day, she really gives you the lasagna. You taste it. Holy damn. It is good.",
            choices: [
                {
                    text: "Text her immediately: this is actually so good",
                    hint: "Canon. Genuine reaction matters.",
                    choiceType: "canon",
                    tone: "canon",
                    next: "ch5_wakeup_request_setup",
                    effects: [
                        { type: "addStat", key: "affection", amount: 1 },
                        { type: "addStat", key: "comfort", amount: 1 },
                        { type: "addMemory", value: "Aniq tasted Yannie's homemade lasagna." }
                    ]
                },
                {
                    text: "Wait a few hours so you don't look too excited",
                    hint: "Weak. Playing it too cool weakens the warmth.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch5_wakeup_request_setup",
                    effects: [
                        { type: "addStat", key: "comfort", amount: -1 }
                    ]
                }
            ]
        },

        /* =====================================================
           CHAPTER 5 — WAKE-UP CALL
        ===================================================== */

        ch5_wakeup_request_setup: {
            type: "phoneChoice",
            chapterLabel: "Chapter 5",
            chapterTitle: "Wake-Up Call",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "Late night",
            messages: [
                { from: "system", text: "One night, the texting goes longer than usual." },
                { from: "her", text: "Can you wake me up tomorrow?" },
                { from: "system", text: "Aniq POV: OH MY GAAAAAAAAAAAAAAAAAAAAAAAAAAAA" }
            ],
            choices: [
                {
                    text: "Call her in the morning",
                    hint: "Canon route. This can become the 40-minute call.",
                    choiceType: "canon",
                    tone: "canon",
                    next: "ch5_call_start",
                    effects: [
                        { type: "setFlag", key: "agreedWakeCall", value: true },
                        { type: "addStat", key: "confidence", amount: 1 },
                        { type: "addSignal", value: "Yannie asked you to wake her up.", amount: 2 }
                    ]
                },
                {
                    text: "Text only: wake up wake up",
                    hint: "Weak. It fulfills the task but misses the intimacy.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch5_text_only_route",
                    effects: [
                        { type: "setFlag", key: "textedWakeupOnly", value: true },
                        { type: "addStat", key: "trust", amount: 1 },
                        { type: "addStat", key: "signal", amount: -1 }
                    ]
                },
                {
                    text: "Forget to wake her up",
                    hint: "Bad ending. Trust crash.",
                    choiceType: "badEnd",
                    tone: "bad",
                    next: "ending_forgot_wakeup"
                }
            ]
        },

        ch5_text_only_route: {
            type: "story",
            chapterLabel: "Chapter 5",
            chapterTitle: "Text Only",
            background: "images/phone.jpg",
            speaker: "Narrator",
            text: "You text her in the morning. She wakes up. It works. But the moment stays practical, not special.",
            next: "ch6_raya_start"
        },

        ch5_call_start: {
            type: "call",
            chapterLabel: "Chapter 5",
            chapterTitle: "Wake-Up Call",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "Voice call • 05:12 AM",
            callTime: "05:12 AM",
            messages: [
                { from: "call", text: "CALL STARTED" },
                { from: "her", text: "Hello...?" },
                { from: "system", text: "She sounds sleepy. Your job was simple: wake her up. Your heart disagrees." }
            ],
            choices: [
                {
                    text: "Morning. You awake?",
                    hint: "Gentle. Good start.",
                    choiceType: "good",
                    tone: "good",
                    next: "ch5_call_topic_one",
                    effects: [
                        { type: "addStat", key: "trust", amount: 1 },
                        { type: "addStat", key: "comfort", amount: 1 }
                    ]
                },
                {
                    text: "Bangun bangun, nanti lambat",
                    hint: "Practical and caring.",
                    choiceType: "good",
                    tone: "good",
                    next: "ch5_call_topic_one",
                    effects: [
                        { type: "addStat", key: "trust", amount: 1 }
                    ]
                },
                {
                    text: "Wake-up call service ni kena bayar tau",
                    hint: "Playful. Good if comfort is high, risky if not.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch5_call_topic_one",
                    effects: [
                        { type: "addStat", key: "comfort", amount: 1 },
                        { type: "addStat", key: "awkwardness", amount: 1 }
                    ]
                },
                {
                    text: "Stay silent because you panic",
                    hint: "Weak. Awkward silence on a call hits harder.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch5_call_topic_one",
                    effects: [
                        { type: "addStat", key: "awkwardness", amount: 2 }
                    ]
                }
            ]
        },

        ch5_call_topic_one: {
            type: "call",
            chapterLabel: "Chapter 5",
            chapterTitle: "Call Continues",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "Voice call • 06:03",
            messages: [
                { from: "her", text: "I'm awake... I think." },
                { from: "system", text: "The call should end here. Somehow, it does not." }
            ],
            choices: [
                {
                    text: "Ask about her Raya morning plans",
                    hint: "Good. Natural topic that fits the day.",
                    choiceType: "good",
                    tone: "good",
                    next: "ch5_call_topic_two",
                    effects: [
                        { type: "addStat", key: "comfort", amount: 1 },
                        { type: "addStat", key: "trust", amount: 1 }
                    ]
                },
                {
                    text: "Talk about random things until both of you laugh",
                    hint: "Signal route if stats support it.",
                    choiceType: "signal",
                    tone: "signal",
                    next: "ch5_call_topic_two",
                    effects: [
                        { type: "addStat", key: "affection", amount: 1 },
                        { type: "addStat", key: "comfort", amount: 2 }
                    ]
                },
                {
                    text: "End the call quickly",
                    hint: "Weak. Safe, but you lose the 40-minute memory.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch5_short_call_result",
                    effects: [
                        { type: "setFlag", key: "shortWakeCall", value: true }
                    ]
                }
            ]
        },

        ch5_call_topic_two: {
            type: "call",
            chapterLabel: "Chapter 5",
            chapterTitle: "Call Continues",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "Voice call • 28:41",
            messages: [
                { from: "call", text: "CALL DURATION: 28:41" },
                { from: "system", text: "This is no longer just a wake-up call." },
                { from: "her", text: "Eh we've been talking for quite long." }
            ],
            choices: [
                {
                    text: "Yeah haha, but it's nice talking to you",
                    hint: "Good. Honest but not too heavy.",
                    choiceType: "signal",
                    tone: "signal",
                    next: "ch5_call_route_check",
                    effects: [
                        { type: "addStat", key: "affection", amount: 1 },
                        { type: "addStat", key: "comfort", amount: 1 }
                    ]
                },
                {
                    text: "Sorry, I didn't realize. You can go get ready first.",
                    hint: "Good. Respectful and caring.",
                    choiceType: "good",
                    tone: "good",
                    next: "ch5_call_route_check",
                    effects: [
                        { type: "addStat", key: "trust", amount: 1 }
                    ]
                },
                {
                    text: "So you like talking to me lah?",
                    hint: "Bad ending. Too much pressure in a soft moment.",
                    choiceType: "badEnd",
                    tone: "bad",
                    next: "ending_call_pressure"
                }
            ]
        },

        ch5_call_route_check: {
            type: "route",
            routes: [
                {
                    require: { statAtLeast: { comfort: 6, signal: 4 }, statAtMost: { awkwardness: 3 } },
                    next: "ch5_forty_min_call"
                },
                {
                    require: { statAtLeast: { comfort: 3 } },
                    next: "ch5_warm_call_result"
                },
                {
                    next: "ch5_short_call_result"
                }
            ]
        },

        ch5_forty_min_call: {
            type: "call",
            chapterLabel: "Chapter 5",
            chapterTitle: "40-Minute Call",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "Voice call • 40:00",
            messages: [
                { from: "call", text: "CALL DURATION: 40:00" },
                { from: "signal", text: "Signal: the wake-up call became a real conversation." },
                { from: "system", text: "Aniq POV: Maybe she likes talking to me too." }
            ],
            choices: [
                {
                    text: "Save this as a memory",
                    hint: "Major memory unlocked.",
                    choiceType: "signal",
                    tone: "signal",
                    next: "ch6_raya_start",
                    effects: [
                        { type: "addSignal", value: "The wake-up call became a 40-minute conversation.", amount: 2 },
                        { type: "addMemory", value: "40-minute wake-up call on Raya morning." },
                        { type: "setFlag", key: "fortyMinuteCall", value: true }
                    ]
                }
            ]
        },

        ch5_warm_call_result: {
            type: "story",
            chapterLabel: "Chapter 5",
            chapterTitle: "Warm Call",
            background: "images/phone.jpg",
            speaker: "Narrator",
            text: "The call does not reach 40 minutes, but it still feels warm. She stayed on longer than she needed to.",
            next: "ch6_raya_start",
            effects: [
                { type: "addSignal", value: "Yannie stayed on the wake-up call longer than necessary.", amount: 1 }
            ]
        },

        ch5_short_call_result: {
            type: "story",
            chapterLabel: "Chapter 5",
            chapterTitle: "Short Call",
            background: "images/phone.jpg",
            speaker: "Narrator",
            text: "The wake-up call stays short. Useful, but not unforgettable. Still, she trusted you enough to ask.",
            next: "ch6_raya_start"
        },

        /* =====================================================
           CHAPTER 6 — RAYA
        ===================================================== */

        ch6_raya_start: {
            type: "story",
            chapterLabel: "Chapter 6",
            chapterTitle: "Raya",
            background: "images/raya.jpg",
            speaker: "Narrator",
            text: "Eid morning. Raya feels different this year. She wears a matcha-strawberry themed baju kurung. You wear champagne baju Melayu.",
            next: "ch6_story_choice"
        },

        ch6_story_choice: {
            type: "choice",
            chapterLabel: "Chapter 6",
            chapterTitle: "Raya Stories",
            background: "images/raya.jpg",
            question: "Do you post your Raya outfit?",
            choices: [
                {
                    text: "Post the champagne baju Melayu story",
                    hint: "Canon. This allows the mutual story-like moment.",
                    choiceType: "canon",
                    tone: "canon",
                    next: "ch6_mutual_story_like",
                    effects: [
                        { type: "setFlag", key: "postedRayaOutfit", value: true },
                        { type: "addStat", key: "confidence", amount: 1 }
                    ]
                },
                {
                    text: "Post food only",
                    hint: "Weak. Safe, but no outfit signal.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch6_food_story_only",
                    effects: [
                        { type: "addStat", key: "comfort", amount: -1 }
                    ]
                },
                {
                    text: "Don't post anything",
                    hint: "Weak. No story interaction today.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch7_openhouse_invite_memory"
                }
            ]
        },

        ch6_mutual_story_like: {
            type: "phoneChoice",
            chapterLabel: "Chapter 6",
            chapterTitle: "Raya Felt Different",
            background: "images/phone.jpg",
            chatName: "Instagram",
            chatStatus: "Story activity",
            messages: [
                { from: "system", text: "You post your Raya outfit." },
                { from: "signal", text: "Yannie liked your story." },
                { from: "system", text: "You see her matcha-strawberry themed outfit and like her story too." }
            ],
            choices: [
                {
                    text: "Act calm even though Raya suddenly feels different",
                    hint: "Signal memory unlocked.",
                    choiceType: "signal",
                    tone: "signal",
                    next: "ch7_openhouse_invite_memory",
                    effects: [
                        { type: "addSignal", value: "You and Yannie liked each other's Raya stories.", amount: 1 },
                        { type: "addMemory", value: "Raya felt different this year." },
                        { type: "addStat", key: "affection", amount: 1 }
                    ]
                }
            ]
        },

        ch6_food_story_only: {
            type: "story",
            chapterLabel: "Chapter 6",
            chapterTitle: "Food Story Only",
            background: "images/raya.jpg",
            speaker: "Narrator",
            text: "You post food only. Safe. Normal. Boring. You miss the outfit-story signal, but Raya still continues.",
            next: "ch7_openhouse_invite_memory"
        },

        /* =====================================================
           CHAPTER 7 — OPEN HOUSE
        ===================================================== */

        ch7_openhouse_invite_memory: {
            type: "story",
            chapterLabel: "Chapter 7",
            chapterTitle: "Open House",
            background: "images/openhouse.jpg",
            speaker: "Narrator",
            text: "Back during Ramadhan, you once asked if she wanted to come to your open house during Eid. She said yes. Now it is 4 April 2026.",
            next: "ch7_countdown"
        },

        ch7_countdown: {
            type: "choice",
            chapterLabel: "Chapter 7",
            chapterTitle: "Countdown",
            background: "images/openhouse.jpg",
            question: "Open house day. You know she might come. How do you handle the waiting?",
            choices: [
                {
                    text: "Help around the house while checking your phone occasionally",
                    hint: "Good. Nervous but functional.",
                    choiceType: "good",
                    tone: "good",
                    next: "ch7_she_arrives_route",
                    effects: [
                        { type: "addStat", key: "trust", amount: 1 },
                        { type: "addStat", key: "confidence", amount: 1 }
                    ]
                },
                {
                    text: "Stand near the entrance pretending not to wait",
                    hint: "Canon POV. Very obvious internally.",
                    choiceType: "canon",
                    tone: "canon",
                    next: "ch7_she_arrives_route",
                    effects: [
                        { type: "addStat", key: "awkwardness", amount: 1 },
                        { type: "addStat", key: "comfort", amount: 1 }
                    ]
                },
                {
                    text: "Text her too many times asking where she is",
                    hint: "Bad ending. Pressure kills the sweetness.",
                    choiceType: "badEnd",
                    tone: "bad",
                    next: "ending_openhouse_pressure"
                }
            ]
        },

        ch7_she_arrives_route: {
            type: "route",
            routes: [
                {
                    require: { statAtLeast: { trust: 4 } },
                    next: "ch7_she_arrives"
                },
                {
                    next: "ch7_she_arrives_low_trust"
                }
            ]
        },

        ch7_she_arrives: {
            type: "story",
            chapterLabel: "Chapter 7",
            chapterTitle: "She Arrives",
            background: "images/openhouse.jpg",
            speaker: "Narrator",
            text: "Then she arrives. And your brain stops for half a second. She is wearing almost the same colour as you.",
            next: "ch7_greeting_choice",
            effects: [
                { type: "addSignal", value: "Yannie came to your open house wearing almost the same colour as you.", amount: 2 }
            ]
        },

        ch7_she_arrives_low_trust: {
            type: "story",
            chapterLabel: "Chapter 7",
            chapterTitle: "She Arrives",
            background: "images/openhouse.jpg",
            speaker: "Narrator",
            text: "She arrives, but the energy is more polite than close. Still, she came. That alone matters.",
            next: "ch7_greeting_choice"
        },

        ch7_greeting_choice: {
            type: "choice",
            chapterLabel: "Chapter 7",
            chapterTitle: "Almost Matching",
            background: "images/openhouse.jpg",
            question: "She is here. Almost matching colours. Do not malfunction.",
            choices: [
                {
                    text: "Smile and greet her calmly",
                    hint: "Good. Stable, warm, normal.",
                    choiceType: "good",
                    tone: "good",
                    next: "ch7_photo_scene",
                    effects: [
                        { type: "addStat", key: "trust", amount: 1 },
                        { type: "addStat", key: "comfort", amount: 1 }
                    ]
                },
                {
                    text: "Tease lightly: eh matching colour pulak",
                    hint: "Signal route. Works best if comfort is high.",
                    choiceType: "signal",
                    tone: "signal",
                    next: "ch7_photo_scene",
                    effects: [
                        { type: "addStat", key: "affection", amount: 1 },
                        { type: "addStat", key: "comfort", amount: 1 },
                        { type: "addSignal", value: "You noticed the almost-matching open house colours together.", amount: 1 }
                    ]
                },
                {
                    text: "Avoid mentioning it and act too formal",
                    hint: "Weak. You stay safe but lose warmth.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch7_photo_scene",
                    effects: [
                        { type: "addStat", key: "comfort", amount: -1 }
                    ]
                },
                {
                    text: "Say: we look like a couple already",
                    hint: "Bad ending. Too much, wrong timing.",
                    choiceType: "badEnd",
                    tone: "bad",
                    next: "ending_openhouse_too_much"
                }
            ]
        },

        ch7_photo_scene: {
            type: "choice",
            chapterLabel: "Chapter 7",
            chapterTitle: "First Photo Together",
            background: "images/photo_together.jpg",
            question: "Her girl friend takes photos of both of you standing together. Camera flash. A real memory forms.",
            choices: [
                {
                    text: "Save the photo memory",
                    hint: "Major memory unlocked.",
                    choiceType: "signal",
                    tone: "signal",
                    next: "ch7_photo_memory_saved",
                    effects: [
                        { type: "addMemory", value: "First Photo Together — 4 April 2026." },
                        { type: "addSignal", value: "Yannie took a photo together with you at your open house.", amount: 2 },
                        { type: "setFlag", key: "firstPhotoTogether", value: true }
                    ]
                }
            ]
        },

        /* =====================================================
           ENDINGS
        ===================================================== */

        ch7_photo_memory_saved: {
            type: "story",
            chapterLabel: "Finale",
            chapterTitle: "First Photo Together",
            background: "images/photo_together.jpg",
            speaker: "Narrator",
            text: "The camera flash fades, but the feeling does not. For a second, everything becomes too loud and too quiet at the same time. You are standing beside her, almost matching, trying to act normal while your heart is doing absolute nonsense.",
            next: "ch7_after_photo_choice",
            effects: [
                { type: "addMemory", value: "The camera flash that started everything after the open house." }
            ]
        },

        ch7_after_photo_choice: {
            type: "choice",
            chapterLabel: "Finale",
            chapterTitle: "Hold The Moment",
            background: "images/photo_together.jpg",
            question: "You look at the photo again. This does not feel like a normal picture. It feels like proof that all the tiny choices somehow became something real.",
            choices: [
                {
                    text: "Let yourself be ridiculously happy",
                    hint: "Final route. No more pretending you are calm.",
                    choiceType: "signal",
                    tone: "signal",
                    next: "ch7_dates_montage",
                    effects: [
                        { type: "addStat", key: "affection", amount: 2 },
                        { type: "addStat", key: "comfort", amount: 2 },
                        { type: "addSignal", value: "The first photo together felt like the beginning of something bigger.", amount: 2 }
                    ]
                },
                {
                    text: "Save the feeling quietly",
                    hint: "Sweet route. Same ending, softer energy.",
                    choiceType: "good",
                    tone: "good",
                    next: "ch7_dates_montage",
                    effects: [
                        { type: "addStat", key: "trust", amount: 1 },
                        { type: "addStat", key: "comfort", amount: 1 }
                    ]
                }
            ]
        },

        ch7_dates_montage: {
            type: "phoneChoice",
            chapterLabel: "Finale",
            chapterTitle: "The Rest Is History",
            background: "images/photo_together.jpg",
            chatName: "Memory World",
            chatStatus: "Final memory unlocked",
            messages: [
                { from: "system", text: "After that photo, the story did not stop." },
                { from: "signal", text: "One cake became one number." },
                { from: "signal", text: "One number became daily texts." },
                { from: "signal", text: "Daily texts became calls, inside jokes, food hunting, soft updates, nervous smiles, and a long list of dates." },
                { from: "system", text: "There are too many memories after this. Enough to fill a whole year of chapters." }
            ],
            choices: [
                {
                    text: "Continue to the final memory",
                    hint: "End the current game sweetly.",
                    choiceType: "canon",
                    tone: "canon",
                    next: "ending_the_rest_is_history",
                    effects: [
                        { type: "addMemory", value: "A long list of dates that would take a year of chapters." },
                        { type: "addSignal", value: "The rest is history between Aniq and Yannie.", amount: 3 }
                    ]
                }
            ]
        },

        ending_the_rest_is_history: {
            type: "ending",
            chapterLabel: "Final Ending",
            chapterTitle: "The Rest Is History",
            background: "images/photo_together.jpg",
            speaker: "Narrator",
            text: "And after that... the rest is history between us. From Dee's Desserts, to the birthday pudding, to the lasagna, to the wake-up call, to Raya, to the first photo together — somehow, every small moment kept choosing us back. What came next was not one simple ending. It was a long list of dates, stories, laughter, nervous firsts, and memories so many that it would take a whole year of chapters to tell them properly. So for now, Memory World ends here — not because the story is over, but because this is where the beginning became unforgettable.\n\nI love youu, Hasrieyannie Iman Delaila.. always! Thank you for playing my POV, babyyyyy.",
            effects: [
                { type: "addMemory", value: "Final Ending — The Rest Is History." }
            ],
            choices: [
                { text: "Restart Memory World", hint: "Replay the beginning of the story.", next: "SYSTEM_RESTART", choiceType: "good", tone: "good" }
            ]
        },

        ending_current_build_complete: {
            type: "ending",
            chapterLabel: "Final Ending",
            chapterTitle: "The Rest Is History",
            background: "images/photo_together.jpg",
            speaker: "Narrator",
            text: "The first photo together becomes the final memory of this build. The rest is history.",
            choices: [
                { text: "Restart Game", hint: "Replay and test different choices.", next: "SYSTEM_RESTART", choiceType: "good", tone: "good" }
            ]
        },

        ending_stayed_home: {
            type: "ending",
            chapterLabel: "Bad Ending",
            chapterTitle: "Stayed Home",
            background: "images/room.jpg",
            speaker: "Narrator",
            text: "You stayed home. No bazaar. No chocolate moist cake. No number. No Yannie. The most realistic but least cinematic ending.",
            choices: [
                { text: "Restart Game", hint: "Say yes to Dad next time.", next: "SYSTEM_RESTART", choiceType: "good", tone: "good" }
            ]
        },

        ending_left_bazaar_early: {
            type: "ending",
            chapterLabel: "Bad Ending",
            chapterTitle: "Left Too Early",
            background: "images/night.jpg",
            speaker: "Narrator",
            text: "You left the bazaar early. Somewhere behind you, Dee's Desserts continued selling cake. You never knew what you missed.",
            choices: [
                { text: "Restart Game", hint: "Find dessert next time.", next: "SYSTEM_RESTART", choiceType: "good", tone: "good" }
            ]
        },

        ending_just_looking: {
            type: "ending",
            chapterLabel: "Bad Ending",
            chapterTitle: "Just Looking",
            background: "images/deesdesserts.jpg",
            speaker: "Narrator",
            text: "You said you were just looking and walked away. Technically true. Emotionally tragic.",
            choices: [
                { text: "Restart Game", hint: "Buy the chocolate moist cake.", next: "SYSTEM_RESTART", choiceType: "good", tone: "good" }
            ]
        },

        ending_walked_away: {
            type: "ending",
            chapterLabel: "Bad Ending",
            chapterTitle: "Panic Walk",
            background: "images/night.jpg",
            speaker: "Narrator",
            text: "You panicked and walked away. You remember the girl with glasses, but the route ends before it begins.",
            choices: [
                { text: "Restart Game", hint: "Recover by buying the cake.", next: "SYSTEM_RESTART", choiceType: "good", tone: "good" }
            ]
        },

        ending_no_number: {
            type: "ending",
            chapterLabel: "Bad Ending",
            chapterTitle: "No Number",
            background: "images/night.jpg",
            speaker: "Narrator",
            text: "You enjoyed the cake and did nothing. A delicious dessert. A dead route. Balanced, as all things should be.",
            choices: [
                { text: "Restart Game", hint: "Ask Friend for her number.", next: "SYSTEM_RESTART", choiceType: "good", tone: "good" }
            ]
        },

        ending_too_direct_first_text: {
            type: "ending",
            chapterLabel: "Bad Ending",
            chapterTitle: "Too Direct",
            background: "images/phone.jpg",
            speaker: "Narrator",
            text: "You opened with 'you cute lah'. Brave? Yes. Strategic? Absolutely not. The chat becomes polite, then silent.",
            choices: [
                { text: "Restart Game", hint: "Try 'hola yannie ke ni'.", next: "SYSTEM_RESTART", choiceType: "good", tone: "good" }
            ]
        },

        ending_free_cake_demand: {
            type: "ending",
            chapterLabel: "Bad Ending",
            chapterTitle: "Free Cake Fumble",
            background: "images/phone.jpg",
            speaker: "Narrator",
            text: "You asked for free cake like a customer service complaint. The birthday pudding route immediately packs its bags and leaves.",
            choices: [
                { text: "Restart Game", hint: "Make the birthday discount joke softer.", next: "SYSTEM_RESTART", choiceType: "good", tone: "good" }
            ]
        },

        ending_pressured_her: {
            type: "ending",
            chapterLabel: "Bad Ending",
            chapterTitle: "Pressure",
            background: "images/phone.jpg",
            speaker: "Narrator",
            text: "You turned a kind birthday gesture into a confession trap. She pulls back. The pudding deserved better.",
            choices: [
                { text: "Restart Game", hint: "Thank her sincerely.", next: "SYSTEM_RESTART", choiceType: "good", tone: "good" }
            ]
        },

        ending_story_spam: {
            type: "ending",
            chapterLabel: "Bad Ending",
            chapterTitle: "Story Spam",
            background: "images/phone.jpg",
            speaker: "Narrator",
            text: "Five tagged stories. One cake. Zero chill. She sees them. You see your own downfall.",
            choices: [
                { text: "Restart Game", hint: "One story is enough.", next: "SYSTEM_RESTART", choiceType: "good", tone: "good" }
            ]
        },

        ending_too_much_cake_era: {
            type: "ending",
            chapterLabel: "Bad Ending",
            chapterTitle: "Too Much Too Soon",
            background: "images/phone.jpg",
            speaker: "Narrator",
            text: "You skipped the slow burn and jumped straight into intensity. The cake era ends from second-hand embarrassment.",
            choices: [
                { text: "Restart Game", hint: "Use Mom's cake excuse instead.", next: "SYSTEM_RESTART", choiceType: "good", tone: "good" }
            ]
        },

        ending_too_forward_daily: {
            type: "ending",
            chapterLabel: "Bad Ending",
            chapterTitle: "Too Forward",
            background: "images/phone.jpg",
            speaker: "Narrator",
            text: "You offered daily emotional support before the relationship could carry it. The chat becomes careful and distant.",
            choices: [
                { text: "Restart Game", hint: "Ask how she is instead.", next: "SYSTEM_RESTART", choiceType: "good", tone: "good" }
            ]
        },

        ending_lasagna_fumbled: {
            type: "ending",
            chapterLabel: "Bad Ending",
            chapterTitle: "Lasagna Fumbled",
            background: "images/phone.jpg",
            speaker: "Narrator",
            text: "You asked for free lasagna before she could offer it. The magic disappears. The cheese never stretches.",
            choices: [
                { text: "Restart Game", hint: "Let her offer it naturally.", next: "SYSTEM_RESTART", choiceType: "good", tone: "good" }
            ]
        },

        ending_forgot_wakeup: {
            type: "ending",
            chapterLabel: "Bad Ending",
            chapterTitle: "Forgot Wake-Up",
            background: "images/phone.jpg",
            speaker: "Narrator",
            text: "She trusted you with a simple wake-up request. You forgot. Trust takes damage the story cannot recover from in this build.",
            choices: [
                { text: "Restart Game", hint: "Call her in the morning.", next: "SYSTEM_RESTART", choiceType: "good", tone: "good" }
            ]
        },

        ending_call_pressure: {
            type: "ending",
            chapterLabel: "Bad Ending",
            chapterTitle: "Call Pressure",
            background: "images/phone.jpg",
            speaker: "Narrator",
            text: "You tried to force a meaning out of a soft moment. The call gets shorter. The silence after gets louder.",
            choices: [
                { text: "Restart Game", hint: "Let the call breathe.", next: "SYSTEM_RESTART", choiceType: "good", tone: "good" }
            ]
        },

        ending_openhouse_pressure: {
            type: "ending",
            chapterLabel: "Bad Ending",
            chapterTitle: "Open House Pressure",
            background: "images/openhouse.jpg",
            speaker: "Narrator",
            text: "You texted too many times asking where she was. The open house starts feeling like an obligation instead of an invitation.",
            choices: [
                { text: "Restart Game", hint: "Wait normally. Or at least pretend to.", next: "SYSTEM_RESTART", choiceType: "good", tone: "good" }
            ]
        },

        ending_openhouse_too_much: {
            type: "ending",
            chapterLabel: "Bad Ending",
            chapterTitle: "Too Much At The Door",
            background: "images/openhouse.jpg",
            speaker: "Narrator",
            text: "'We look like a couple already' was not the line. The photo still happens in another universe, not this one.",
            choices: [
                { text: "Restart Game", hint: "Greet her normally or tease lightly.", next: "SYSTEM_RESTART", choiceType: "good", tone: "good" }
            ]
        }
    }
};
