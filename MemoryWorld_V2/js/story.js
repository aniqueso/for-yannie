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
        version: "0.5.1",
        authorNote: "Real-chat edition: bazaar, pudding, lasagna, wake-up calls, open house, and hidden call-era routes."
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
                    hint: "A small yes changes what happens next.",
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
                    hint: "You can always go home. The bazaar will not wait forever.",
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
            type: "timedChoice",
            chapterLabel: "Chapter 1",
            chapterTitle: "Bazaar Rush",
            background: "images/bazaar.jpg",
            speaker: "Timeline",
            question: "Maghrib is getting closer. Pick your route before the bazaar moment passes.",
            timeLimit: 14,
            timeoutNext: "ending_left_bazaar_early",
            timeoutEffects: [
                { type: "addFumble", amount: 1, message: "You spent too long deciding." }
            ],
            choices: [
                {
                    text: "Buy the main meal first",
                    hint: "Safe. You can circle back for dessert.",
                    next: "ch1_food_stall",
                    effects: [
                        { type: "setFlag", key: "boughtMeal", value: true },
                        { type: "addInventory", value: "Main Meal" },
                        { type: "addStat", key: "trust", amount: 1 }
                    ]
                },
                {
                    text: "Wander and scan the dessert tents",
                    hint: "You might notice the stall that matters.",
                    next: "ch1_random_walk",
                    effects: [
                        { type: "setFlag", key: "wanderedBazaar", value: true },
                        { type: "addStat", key: "confidence", amount: 1 }
                    ]
                },
                {
                    text: "Leave early",
                    hint: "Fastest route home. Very bad for the timeline.",
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
            text: "You buy your meal. Dad looks satisfied. One problem solved. Now something sweet sounds nice. You turn toward the dessert tents instead of looping around the bazaar again.",
            next: "ch1_dees_desserts",
            effects: [
                { type: "setFlag", key: "foundDessertStall", value: true },
                { type: "addMemory", value: "After buying the main meal, Aniq finally found Dee's Desserts." }
            ]
        },

        ch1_drinks_stall: {
            type: "story",
            chapterLabel: "Chapter 1",
            chapterTitle: "Bazaar Gameplay",
            background: "images/bazaar.jpg",
            speaker: "Narrator",
            text: "You buy a drink first. Not wrong, but your stomach reminds you that berbuka needs more than sugar water. You grab the main meal, then drift toward the dessert tents.",
            next: "ch1_food_stall"
        },

        ch1_random_walk: {
            type: "story",
            chapterLabel: "Chapter 1",
            chapterTitle: "Bazaar Gameplay",
            background: "images/bazaar.jpg",
            speaker: "Narrator",
            text: "You walk through the crowd with no plan. Somehow, the random path brings you closer to the dessert tents. One sign finally catches your eye: Dee's Desserts.",
            next: "ch1_dees_desserts",
            effects: [
                { type: "setFlag", key: "foundDessertStall", value: true },
                { type: "addSignal", value: "Dee's Desserts spotted at Lima Kedai bazaar." }
            ]
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
                    hint: "Simple, specific, and easy to say.",
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
                    hint: "Let the seller choose where the conversation goes.",
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
                    hint: "Buying time is safe, but silence has a cost.",
                    choiceType: "weak",
                    tone: "neutral",
                    next: "ch1_recover_at_tent",
                    effects: [
                        { type: "addStat", key: "awkwardness", amount: 1 }
                    ]
                },
                {
                    text: "Nothing, just looking",
                    hint: "You can leave without buying anything.",
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
                    hint: "You can decide this was only a one-time bazaar stop.",
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
                    hint: "No message means no chance of saying the wrong thing.",
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
                    hint: "Casual, real, and slightly brave.",
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
                    hint: "Very direct. She may not read it the way you intend.",
                    choiceType: "badEnd",
                    tone: "bad",
                    next: "ending_too_direct_first_text"
                }
            ]
        },

        ch2_hola_reply: {
            type: "phoneChoice",
            chapterLabel: "Chapter 2",
            chapterTitle: "The First Chat",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "1 March 2026 · 9:55 PM",
            messages: [
                { from: "me", text: "hola yannie ke ni" },
                { from: "her", text: "yep nak order kan" },
                { from: "me", text: "haah" },
                { from: "her", text: "tkfaham eh voice tdi" },
                { from: "me", text: "patutla macam kenal kat bazaar tadi" },
                { from: "her", text: "laa tak cam ke" },
                { from: "me", text: "tak dok" },
                { from: "her", text: "hmph" },
                { from: "her", text: "ok bagi order detail" }
            ],
            choices: [
                {
                    text: "Reconstruct this chat before ordering",
                    hint: "The details matter later.",
                    next: "ch2_first_chat_reconstruction",
                    effects: [
                        { type: "addStat", key: "comfort", amount: 1 },
                        { type: "addMemory", value: "First WhatsApp chat — 1 March 2026." }
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
            type: "riskChoice",
            chapterLabel: "Chapter 2",
            chapterTitle: "RM6 Decision",
            background: "images/phone.jpg",
            speaker: "Aniq POV",
            question: "Two chocolate moist cakes. RM6 total. The order is done — but your birthday is tomorrow. Do you make the joke?",
            choices: [
                {
                    text: "takde diskaun bday esok ke HAHAHAHAHA",
                    hint: "This is the real line. It can sound playful or demanding depending on the vibe you've built.",
                    baseChance: 58,
                    boostFrom: { comfort: 3, trust: 2, confidence: 2 },
                    penaltyFrom: { awkwardness: 4 },
                    successText: "The joke lands exactly the way it did in the real chat.",
                    failText: "The joke lands flatter in this timeline. You can still recover.",
                    next: "ch2_birthday_joke_reply",
                    failNext: "ch2_birthday_joke_recovery",
                    effects: [
                        { type: "setFlag", key: "birthdayDiscountJoke", value: true },
                        { type: "addStat", key: "confidence", amount: 1 },
                        { type: "addStat", key: "comfort", amount: 1 }
                    ],
                    failEffects: [
                        { type: "addStat", key: "awkwardness", amount: 1 }
                    ]
                },
                {
                    text: "Okay, thank you. Keep it business.",
                    hint: "Very safe. The pudding route may never open.",
                    baseChance: 94,
                    successText: "Perfectly normal customer behaviour.",
                    next: "ch2_normal_delivery",
                    effects: [
                        { type: "setFlag", key: "noBirthdayHint", value: true },
                        { type: "addStat", key: "trust", amount: 1 }
                    ],
                    fumbleOnFail: false
                },
                {
                    text: "My birthday tomorrow. Free cake can?",
                    hint: "High-pressure version of the same idea.",
                    baseChance: 18,
                    boostFrom: { comfort: 1 },
                    penaltyFrom: { awkwardness: 5 },
                    successText: "Somehow she laughs it off, but the route gets shaky.",
                    failText: "Yeah. Too much.",
                    next: "ch2_birthday_joke_recovery",
                    failNext: "ending_free_cake_demand",
                    effects: [
                        { type: "addStat", key: "awkwardness", amount: 2 }
                    ]
                }
            ]
        },

        ch2_birthday_joke_reply: {
            type: "phoneChoice",
            chapterLabel: "Chapter 2",
            chapterTitle: "Birthday Discount",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "2 March 2026 · 5:16 PM",
            messages: [
                { from: "me", text: "takde diskaun bday esok ke HAHAHAHAHA" },
                { from: "me", text: "takdela" },
                { from: "her", text: "esok beday kaa" },
                { from: "me", text: "iyo" },
                { from: "her", text: "🤔🤔" },
                { from: "her", text: "okayla" },
                { from: "her", text: "belanja puding caramel" },
                { from: "me", text: "uish sumpah ah HAHAHAHA" },
                { from: "her", text: "yeyee" },
                { from: "her", text: "first time bagi cust free sbb beday ni🥰" },
                { from: "her", text: "isokeyy happy birthday btw" }
            ],
            choices: [
                {
                    text: "Notice what changed here",
                    hint: "Don't just look at the free pudding.",
                    next: "ch2_birthday_signal"
                }
            ]
        },

        ch2_delivery_pudding: {
            type: "story",
            chapterLabel: "Chapter 2",
            chapterTitle: "The Pudding Arrives",
            background: "images/pudding.jpg",
            speaker: "Narrator",
            text: "The order arrives. There is caramel pudding with it, plus a small birthday note. What started as a RM6 cake order now has a detail you definitely did not pay for.",
            next: "ch2_pudding_discovery_chat",
            effects: [
                { type: "addInventory", value: "Birthday Caramel Pudding" },
                { type: "addAchievement", value: "First Freebie" },
                { type: "addMemory", value: "Birthday pudding — 2 March 2026." }
            ]
        },

        ch2_pudding_discovery_chat: {
            type: "phoneChoice",
            chapterLabel: "Chapter 2",
            chapterTitle: "Pudding Review",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "2 March 2026 · 7:28 PM",
            messages: [
                { from: "me", text: "pasni review puding" },
                { from: "her", text: "klau enak bgtau" },
                { from: "her", text: "klau sejuk ii lgi sedap" },
                { from: "her", text: "( yakin )" },
                { from: "me", text: "sedap wey srs ii puding karamel tu" },
                { from: "me", text: "yang kek moist tu obviously sedap ah sebabtu order banyak kali an 🤷🏻" },
                { from: "her", text: "paduu doo thanks" },
                { from: "me", text: "lagi sedap bila org lanje an" },
                { from: "her", text: "takpe beday boy" }
            ],
            choices: [
                {
                    text: "Continue into the pudding mission",
                    hint: "Tomorrow, you go back again.",
                    next: "ch2_effort_signal"
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
                    hint: "Public enough to be playful, indirect enough to recover.",
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
                    hint: "This is a lot of energy for where the timeline is right now.",
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
                    hint: "High commitment before the comfort is there.",
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
                    hint: "You are skipping several steps.",
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
            background: "images/room.jpg",
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
            background: "images/room.jpg",
            speaker: "Narrator",
            text: "You are still mostly a customer, but something small is changing. The conversation is not strong yet, but it has not closed either.",
            next: "ch4_lasagna_start"
        },

        /* =====================================================
           CHAPTER 4 — LASAGNA ARC
        ===================================================== */

        ch4_lasagna_start: {
            type: "riskChoice",
            chapterLabel: "Chapter 4",
            chapterTitle: "Lasagna Arc",
            background: "images/phone.jpg",
            speaker: "12 March · Chat",
            question: "Yannie: “jap nak tgk tuto masak lasagna”\n\nWhat do you send?",
            choices: [
                {
                    text: "nak jual ke / nak beli pls 🙏🏻",
                    hint: "The real reply. Slightly shameless, somehow effective.",
                    baseChance: 55,
                    boostFrom: { comfort: 3, trust: 2, signal: 2 },
                    penaltyFrom: { awkwardness: 3 },
                    successText: "She does not shut it down. She actually offers you some.",
                    failText: "The joke feels too transactional in this run.",
                    next: "ch4_she_offers_lasagna",
                    failNext: "ch4_dry_recover",
                    effects: [
                        { type: "addStat", key: "confidence", amount: 1 }
                    ],
                    failEffects: [
                        { type: "addStat", key: "awkwardness", amount: 1 }
                    ]
                },
                {
                    text: "Rajinnya. Good luck chef.",
                    hint: "Safe supportive route.",
                    baseChance: 90,
                    next: "ch4_she_offers_lasagna_soft",
                    effects: [
                        { type: "addStat", key: "trust", amount: 1 },
                        { type: "addStat", key: "comfort", amount: 1 }
                    ],
                    fumbleOnFail: false
                },
                {
                    text: "Make for me. Free ah?",
                    hint: "Same idea, zero finesse.",
                    baseChance: 14,
                    penaltyFrom: { awkwardness: 5 },
                    next: "ch4_she_offers_lasagna_soft",
                    failNext: "ending_lasagna_fumbled",
                    failText: "The lasagna route has left the building."
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
            chatStatus: "12 March 2026",
            messages: [
                { from: "me", text: "nak jual ke" },
                { from: "me", text: "nak beli pls 🙏🏻" },
                { from: "her", text: "nak masak" },
                { from: "her", text: "mau kaa" },
                { from: "her", text: "tak jual la tapi" },
                { from: "her", text: "nak buat makan makan sendiri je" },
                { from: "her", text: "kalau sedap baru bagi" }
            ],
            choices: [
                {
                    text: "HAHAHAHAHA okay",
                    hint: "Take the offer without making it heavier than it is.",
                    next: "ch4_lasagna_memory_order",
                    effects: [
                        { type: "setFlag", key: "lasagnaGiftUnlocked", value: true },
                        { type: "addSignal", value: "Yannie offered a taste of the lasagna if it turned out well.", amount: 2 },
                        { type: "addStat", key: "affection", amount: 1 },
                        { type: "addStat", key: "comfort", amount: 1 }
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
            chapterTitle: "RM70 Lasagna",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "12 March · live updates",
            messages: [
                { from: "her", text: "otw belii" },
                { from: "her", text: "total hit 70" },
                { from: "me", text: "peh 70 ringgit lasagna" },
                { from: "her", text: "ye mat" },
                { from: "her", text: "doakan la 😔😔" },
                { from: "me", text: "menjadi do confirm ii" }
            ],
            choices: [
                {
                    text: "Track the cooking timeline",
                    hint: "One more memory reconstruction.",
                    next: "ch4_lasagna_memory_order"
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
            chapterTitle: "Lasagna Tester",
            background: "images/phone.jpg",
            question: "The lasagna actually happens. How do you react?",
            choices: [
                {
                    text: "Tell her honestly if it is good",
                    hint: "Food review has basically become a recurring language at this point.",
                    next: "ch5_wakeup_request_setup",
                    effects: [
                        { type: "addAchievement", value: "Lasagna Tester" },
                        { type: "addMemory", value: "The RM70 lasagna experiment." },
                        { type: "addStat", key: "trust", amount: 1 }
                    ]
                },
                {
                    text: "Act too cool and barely react",
                    hint: "Low risk, low reward.",
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
            chapterTitle: "The Wake-Up Bet",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "22 March 2026 · 10:07 PM",
            messages: [
                { from: "me", text: "tolog kejut pls esok pagi kul 6 kena gi breakfast" },
                { from: "her", text: "HAHAHAHHAHAHAHAHAHAAHHAHA" },
                { from: "her", text: "susah task tu" },
                { from: "me", text: "tak memasal yang suh kejut bangun dulu" },
                { from: "her", text: "yee HAHHAAHHA" },
                { from: "her", text: "rasenye dia yg kene kejut dulu" },
                { from: "me", text: "baik cip saya jela kejutkan 🥰" }
            ],
            choices: [
                {
                    text: "Set the phone loud and trust the plan",
                    hint: "Tomorrow, the call really comes.",
                    next: "ch5_six_am_call",
                    effects: [
                        { type: "setFlag", key: "askedWakeup", value: true },
                        { type: "addStat", key: "trust", amount: 1 }
                    ]
                },
                {
                    text: "Mute the phone and trust your internal clock",
                    hint: "Very brave for someone asking to be woken up.",
                    next: "ch5_six_am_call",
                    effects: [
                        { type: "addStat", key: "awkwardness", amount: 1 }
                    ]
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
            chapterTitle: "6:30 AM",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "Voice call · 3 hr",
            messages: [
                { from: "her", text: "betul betul jumpa katil ni" },
                { from: "call", text: "24 March 2026 · 6:30 AM · Voice call · 3 hr" },
                { from: "system", text: "The wake-up plan becomes a three-hour call." }
            ],
            choices: [
                {
                    text: "Stay on the call and let the conversation wander",
                    hint: "The task was wake-up. The result is three hours.",
                    next: "ch5_forty_min_call",
                    effects: [
                        { type: "addStat", key: "comfort", amount: 2 },
                        { type: "addSignal", value: "A wake-up call turned into a three-hour conversation.", amount: 2 }
                    ]
                },
                {
                    text: "Thank her and end quickly",
                    hint: "You complete the task, but miss the potential.",
                    next: "ch5_short_call_result",
                    effects: [
                        { type: "addStat", key: "trust", amount: 1 }
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
                    hint: "This turns a soft moment into a demand.",
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
            chapterTitle: "Three Hours",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "Voice call · 3 hr",
            messages: [
                { from: "call", text: "CALL DURATION: 3 HR" },
                { from: "signal", text: "The wake-up request was small. The amount of time given to it was not." }
            ],
            choices: [
                {
                    text: "Save the 3-hour call",
                    hint: "Major call-era memory.",
                    next: "ch6_raya_start",
                    effects: [
                        { type: "addAchievement", value: "Actually Woke Up" },
                        { type: "addMemory", value: "3-hour wake-up call — 24 March 2026." },
                        { type: "setFlag", key: "threeHourWakeCall", value: true }
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
            background: "images/openhouse.jpg",
            speaker: "Narrator",
            text: "Eid morning. Raya feels different this year. She wears a matcha-strawberry themed baju kurung. You wear champagne baju Melayu.",
            next: "ch6_story_choice"
        },

        ch6_story_choice: {
            type: "choice",
            chapterLabel: "Chapter 6",
            chapterTitle: "Raya Stories",
            background: "images/openhouse.jpg",
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
            background: "images/openhouse.jpg",
            speaker: "Narrator",
            text: "You post food only. Safe. Normal. Boring. You miss the outfit-story signal, but Raya still continues.",
            next: "ch7_openhouse_invite_memory"
        },

        /* =====================================================
           CHAPTER 7 — OPEN HOUSE
        ===================================================== */

        ch7_openhouse_invite_memory: {
            type: "phoneChoice",
            chapterLabel: "Chapter 7",
            chapterTitle: "The Invitation",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "5 March 2026",
            messages: [
                { from: "me", text: "oooo baikk cip nanti openhouse nak order" },
                { from: "her", text: "kalau untuk open house kene invite sekali" },
                { from: "her", text: "jkjk" },
                { from: "me", text: "kalau nak datang ah leh jer" },
                { from: "her", text: "di jemput la ni eh" },
                { from: "me", text: "dijemput hadir" }
            ],
            choices: [
                {
                    text: "Fast-forward to 4 April",
                    hint: "The joke invitation became real.",
                    next: "ch7_openhouse_navigation",
                    effects: [
                        { type: "addSignal", value: "The open-house invite started as banter and became a real plan.", amount: 1 }
                    ]
                }
            ]
        },

        ch7_countdown: {
            type: "timedChoice",
            chapterLabel: "Chapter 7",
            chapterTitle: "She's Six Minutes Away",
            background: "images/openhouse.jpg",
            speaker: "4 April · 1:52 PM",
            question: "Yannie: “6 min lagi smpai”\n\nYou are hosting an open house and trying not to malfunction.",
            timeLimit: 9,
            timeoutNext: "ch7_she_arrives_route",
            timeoutEffects: [
                { type: "addFumble", amount: 1, message: "You stare at the phone instead of doing anything useful." },
                { type: "addStat", key: "awkwardness", amount: 1 }
            ],
            choices: [
                {
                    text: "Help with the event and keep the phone nearby",
                    hint: "Balanced.",
                    next: "ch7_she_arrives_route",
                    effects: [
                        { type: "addStat", key: "confidence", amount: 1 },
                        { type: "addStat", key: "trust", amount: 1 }
                    ]
                },
                {
                    text: "Hover near the entrance pretending you're not waiting",
                    hint: "Low efficiency. Very believable.",
                    next: "ch7_she_arrives_route",
                    effects: [
                        { type: "addStat", key: "awkwardness", amount: 1 },
                        { type: "addStat", key: "comfort", amount: 1 }
                    ]
                },
                {
                    text: "Spam 'where are you' messages",
                    hint: "Pressure rises fast.",
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
            type: "phoneChoice",
            chapterLabel: "Chapter 7",
            chapterTitle: "She Made It",
            background: "images/openhouse.jpg",
            chatName: "Yannie",
            chatStatus: "4 April · 2:26 PM",
            messages: [
                { from: "her", text: "aniq" },
                { from: "her", text: "awkward ah" },
                { from: "me", text: "HAHHAHAHAHA" },
                { from: "her", text: "tk expect setable ini" },
                { from: "me", text: "nak table mana lagi" },
                { from: "her", text: "takdela ok je" },
                { from: "her", text: "malu je" }
            ],
            choices: [
                {
                    text: "Go greet her without making the awkwardness bigger",
                    hint: "The real challenge is making the room feel normal.",
                    next: "ch7_greeting_choice"
                }
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
            type: "riskChoice",
            chapterLabel: "Chapter 7",
            chapterTitle: "Open House Social Check",
            background: "images/openhouse.jpg",
            speaker: "Aniq POV",
            question: "She already said she's shy and awkward. How much do you push the interaction?",
            choices: [
                {
                    text: "Smile, greet normally, give her space to settle in",
                    hint: "Not flashy. Very strong for trust.",
                    baseChance: 90,
                    boostFrom: { trust: 1, comfort: 1 },
                    next: "ch7_photo_scene",
                    effects: [
                        { type: "addStat", key: "trust", amount: 2 },
                        { type: "addStat", key: "comfort", amount: 1 }
                    ],
                    fumbleOnFail: false
                },
                {
                    text: "Tease lightly about the maroon / burgundy situation",
                    hint: "Could loosen the mood if comfort is already high.",
                    baseChance: 48,
                    boostFrom: { comfort: 4, signal: 2, confidence: 2 },
                    penaltyFrom: { awkwardness: 4 },
                    next: "ch7_photo_scene",
                    failNext: "ch7_photo_scene",
                    effects: [
                        { type: "addStat", key: "affection", amount: 1 },
                        { type: "addStat", key: "comfort", amount: 1 }
                    ],
                    failEffects: [
                        { type: "addStat", key: "awkwardness", amount: 1 }
                    ]
                },
                {
                    text: "Make the whole thing sound like a date",
                    hint: "Wrong room, wrong timing.",
                    baseChance: 10,
                    penaltyFrom: { awkwardness: 5 },
                    next: "ch7_photo_scene",
                    failNext: "ending_openhouse_too_much",
                    failText: "The room gets approximately 400% more awkward."
                }
            ]
        },

        ch7_photo_scene: {
            type: "signalCheck",
            chapterLabel: "Chapter 7",
            chapterTitle: "The Boundary Check",
            background: "images/photo_together.jpg",
            kicker: "TRUST CHECK",
            title: "What is the important part of this message?",
            prompt: "After the open house, Yannie explains why part of the photo moment felt awkward.",
            meta: "This is not a romance-signal test. It is a boundary test.",
            options: [
                { speaker: "Yannie", text: "awkward sikit je time dorg snap gamba diamdiam tadi", correct: false },
                { speaker: "Yannie", text: "tk suka sikit org amik gamba wthout permission", correct: true },
                { speaker: "Yannie", text: "tuan rumah and all of the fam members baikk jee", correct: false }
            ],
            signal: "Yannie directly said she dislikes photos being taken without permission.",
            signalAmount: 2,
            correctText: "Exactly. The important information is permission, not whether the photo looked cute.",
            wrongText: "You focused on the surface detail and missed the boundary.",
            correctEffects: [
                { type: "addStat", key: "trust", amount: 2 }
            ],
            wrongEffects: [
                { type: "addStat", key: "trust", amount: -2 },
                { type: "addStat", key: "awkwardness", amount: 1 }
            ],
            next: "ch7_privacy_response"
        },

        /* =====================================================
           ENDINGS
        ===================================================== */

        ch7_photo_memory_saved: {
            type: "phoneChoice",
            chapterLabel: "Chapter 7",
            chapterTitle: "After The Open House",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "4 April · 5:40 PM",
            messages: [
                { from: "me", text: "btw tadi cantik do frfr" },
                { from: "her", text: "sumpala HAHAHA" },
                { from: "system", text: "Later that evening: more calls, more photos, more random stories." }
            ],
            choices: [
                {
                    text: "Keep the night going normally",
                    hint: "No grand speech. Just the next conversation.",
                    next: "ch7_after_photo_choice",
                    effects: [
                        { type: "addMemory", value: "Open-house day — 4 April 2026." }
                    ]
                }
            ]
        },

        ch7_after_photo_choice: {
            type: "signalCheck",
            chapterLabel: "Chapter 7",
            chapterTitle: "Late-Night Signal",
            background: "images/phone.jpg",
            kicker: "SIGNAL CHECK",
            title: "A tiny line, big meaning",
            prompt: "Later that night there is no line. Then she says:",
            meta: "Pick the line that shows she actively reaches for you when she needs something.",
            options: [
                { speaker: "Yannie", text: "sini tkde line", correct: false },
                { speaker: "Yannie", text: "tiba tiba need aniqq", correct: true },
                { speaker: "Yannie", text: "hospot", correct: false }
            ],
            signal: "“tiba tiba need aniqq” — she reached out to you directly.",
            signalAmount: 2,
            correctText: "Yep. The hotspot was the reason. Reaching for you was the signal.",
            wrongText: "The practical problem is obvious. The relationship detail is who she chose to ask.",
            correctEffects: [
                { type: "addStat", key: "comfort", amount: 2 }
            ],
            wrongEffects: [
                { type: "addStat", key: "awkwardness", amount: 1 }
            ],
            next: "ch7_dates_montage"
        },

        ch7_dates_montage: {
            type: "route",
            chapterLabel: "Potential Route",
            chapterTitle: "What Happens Next?",
            background: "images/phone.jpg",
            routes: [
                {
                    require: { statAtLeast: { trust: 7, comfort: 6, signal: 6 }, fumblesAtMost: 2 },
                    next: "ch8_nine_hour_unlock"
                },
                {
                    require: { fumblesAtLeast: 3 },
                    next: "ending_unstable_timeline"
                },
                {
                    next: "ending_potential_locked"
                }
            ]
        },


        ch2_first_chat_reconstruction: {
            type: "sequence",
            chapterLabel: "Chapter 2",
            chapterTitle: "Chat Reconstruction",
            background: "images/phone.jpg",
            kicker: "REAL CHAT PUZZLE",
            title: "Put the opening back in order",
            prompt: "Tap the four lines in the exact order they happened on 1 March.",
            items: [
                { text: "hola yannie ke ni" },
                { text: "yep nak order kan" },
                { text: "patutla macam kenal kat bazaar tadi" },
                { text: "laa tak cam ke" }
            ],
            failText: "Nope. The first chat glitches and resets.",
            effects: [
                { type: "addStat", key: "signal", amount: 1 },
                { type: "addAchievement", value: "First Hola" }
            ],
            next: "ch2_order_chat"
        },

        ch2_birthday_joke_recovery: {
            type: "phoneChoice",
            chapterLabel: "Chapter 2",
            chapterTitle: "Recover The Joke",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "Online",
            messages: [
                { from: "system", text: "The birthday joke lands a little weird in this branch." }
            ],
            choices: [
                {
                    text: "HAHAHA gurau je senanya 😭",
                    hint: "Drop the pressure immediately.",
                    next: "ch2_birthday_joke_reply",
                    effects: [
                        { type: "addStat", key: "trust", amount: 1 },
                        { type: "addStat", key: "awkwardness", amount: -1 }
                    ]
                },
                {
                    text: "Double down and ask again",
                    hint: "The recovery window closes.",
                    next: "ending_free_cake_demand"
                }
            ]
        },

        ch2_birthday_signal: {
            type: "signalCheck",
            chapterLabel: "Chapter 2",
            chapterTitle: "Read The Moment",
            background: "images/phone.jpg",
            kicker: "SIGNAL CHECK",
            title: "What mattered most?",
            prompt: "The pudding is obvious. Which line tells you the gesture was unusual for her?",
            options: [
                { speaker: "Yannie", text: "belanja puding caramel", correct: false },
                { speaker: "Yannie", text: "first time bagi cust free sbb beday ni🥰", correct: true },
                { speaker: "Yannie", text: "isokeyy happy birthday btw", correct: false }
            ],
            signal: "You were the first customer she gave a free birthday item to.",
            signalAmount: 2,
            correctText: "Exactly. The special part is that she said she had not done this for a customer before.",
            wrongText: "Cute line, but you missed the unusual detail.",
            correctEffects: [
                { type: "addStat", key: "affection", amount: 1 },
                { type: "addAchievement", value: "Signal Reader I" }
            ],
            wrongEffects: [
                { type: "addStat", key: "awkwardness", amount: 1 }
            ],
            next: "ch2_delivery_pudding"
        },

        ch2_effort_signal: {
            type: "signalCheck",
            chapterLabel: "Chapter 2",
            chapterTitle: "The Pudding Mission",
            background: "images/phone.jpg",
            kicker: "SIGNAL CHECK",
            title: "She noticed the effort",
            prompt: "On 3 March, you went back to the bazaar basically just for pudding. Which line shows she noticed?",
            options: [
                { speaker: "Aniq", text: "datang semata beli puding karamel", correct: false },
                { speaker: "Yannie", text: "effort doo", correct: true },
                { speaker: "Yannie", text: "dala satu je", correct: false }
            ],
            signal: "Yannie explicitly called the pudding trip an effort.",
            signalAmount: 1,
            correctText: "Yep. Not a confession. Just a tiny recognition that you showed up.",
            wrongText: "That line describes what happened, not what she noticed about it.",
            correctEffects: [
                { type: "addAchievement", value: "Pudding Mission" },
                { type: "addStat", key: "comfort", amount: 1 }
            ],
            wrongEffects: [
                { type: "addStat", key: "awkwardness", amount: 1 }
            ],
            next: "ch2_instagram_story"
        },

        ch4_lasagna_memory_order: {
            type: "sequence",
            chapterLabel: "Chapter 4",
            chapterTitle: "Lasagna Timeline",
            background: "images/phone.jpg",
            kicker: "MEMORY RECONSTRUCTION",
            title: "The RM70 lasagna chain",
            prompt: "Put these real updates in chronological order.",
            items: [
                { text: "otw belii" },
                { text: "total hit 70" },
                { text: "doakan la 😔😔" },
                { text: "esok buat i think if balik awal" }
            ],
            failText: "The lasagna timeline collapsed. Try again.",
            effects: [
                { type: "addMemory", value: "RM70 lasagna timeline reconstructed." },
                { type: "addStat", key: "trust", amount: 1 }
            ],
            achievement: "RM70 Lasagna Lore",
            next: "ch4_cooking_update"
        },

        ch5_six_am_call: {
            type: "timedChoice",
            chapterLabel: "Chapter 5",
            chapterTitle: "6:00 AM",
            background: "images/phone.jpg",
            speaker: "INCOMING CALL",
            question: "24 March · 6:00 AM\nYannie is actually calling to wake you. Answer before sleepy Aniq wins.",
            timeLimit: 8,
            timeoutNext: "ch5_missed_call_recovery",
            timeoutEffects: [
                { type: "addFumble", amount: 1, message: "You slept through the first call." },
                { type: "addStat", key: "awkwardness", amount: 1 }
            ],
            choices: [
                {
                    text: "ANSWER",
                    hint: "Wake-up mission successful.",
                    next: "ch5_call_start",
                    effects: [
                        { type: "addStat", key: "trust", amount: 2 },
                        { type: "setFlag", key: "answeredWakeCall", value: true }
                    ]
                },
                {
                    text: "Snooze for 'one minute'",
                    hint: "Dangerous words.",
                    next: "ch5_missed_call_recovery",
                    effects: [
                        { type: "addFumble", amount: 1, message: "Sleepy decision." }
                    ]
                }
            ]
        },

        ch5_missed_call_recovery: {
            type: "phoneChoice",
            chapterLabel: "Chapter 5",
            chapterTitle: "Missed Call",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "6:01 AM",
            messages: [
                { from: "system", text: "Missed voice call" },
                { from: "her", text: "betul betul jumpa katil ni" }
            ],
            choices: [
                {
                    text: "Call back immediately",
                    hint: "Recovery route. The real timeline still has a 3-hour call waiting.",
                    next: "ch5_call_start",
                    effects: [
                        { type: "addStat", key: "trust", amount: 1 }
                    ]
                },
                {
                    text: "Go back to sleep",
                    hint: "You asked for the wake-up and then vanished.",
                    next: "ending_forgot_wakeup"
                }
            ]
        },

        ch7_openhouse_navigation: {
            type: "sequence",
            chapterLabel: "Chapter 7",
            chapterTitle: "Open House Navigation",
            background: "images/phone.jpg",
            kicker: "NAVIGATION PUZZLE",
            title: "Get Yannie through the entrance",
            prompt: "Rebuild the directions without exposing the private address.",
            items: [
                { text: "Search the venue / complex name" },
                { text: "Enter through the guard area" },
                { text: "Scan the visitor QR" },
                { text: "Take the second exit at the roundabout" }
            ],
            failText: "Wrong turn. She is absolutely going to message 'ANIQQ'.",
            effects: [
                { type: "addStat", key: "trust", amount: 1 },
                { type: "addMemory", value: "Open-house directions survived the roundabout." }
            ],
            achievement: "Roundabout Navigator",
            next: "ch7_countdown"
        },

        ch7_privacy_response: {
            type: "riskChoice",
            chapterLabel: "Chapter 7",
            chapterTitle: "Respond To The Boundary",
            background: "images/phone.jpg",
            speaker: "Aniq POV",
            question: "Now that she has told you the photos without permission made her uncomfortable, what do you do?",
            choices: [
                {
                    text: "sokay da suh dorang delete",
                    hint: "The real response. Solve the problem, don't debate the boundary.",
                    baseChance: 95,
                    boostFrom: { trust: 1 },
                    successText: "Simple, immediate, correct.",
                    next: "ch7_photo_memory_saved",
                    effects: [
                        { type: "addStat", key: "trust", amount: 3 },
                        { type: "addAchievement", value: "Privacy Respected" },
                        { type: "setFlag", key: "privacyRespected", value: true }
                    ],
                    fumbleOnFail: false
                },
                {
                    text: "Tell her the photos were harmless",
                    hint: "You are arguing with information she just gave you.",
                    baseChance: 12,
                    penaltyFrom: { awkwardness: 4 },
                    next: "ch7_photo_memory_saved",
                    failNext: "ch7_boundary_recovery",
                    failText: "Trust drops. You made the issue about whether you agreed instead of whether she was comfortable.",
                    failEffects: [
                        { type: "addStat", key: "trust", amount: -3 },
                        { type: "addStat", key: "awkwardness", amount: 2 }
                    ]
                },
                {
                    text: "Ask her to send the photo first anyway",
                    hint: "Maximum fumble potential.",
                    baseChance: 6,
                    next: "ch7_boundary_recovery",
                    failNext: "ending_openhouse_photo_boundary",
                    failText: "Yeah, absolutely not the move."
                }
            ]
        },

        ch7_boundary_recovery: {
            type: "phoneChoice",
            chapterLabel: "Chapter 7",
            chapterTitle: "Repair",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "Open-house aftermath",
            messages: [
                { from: "her", text: "tk suka sikit org amik gamba wthout permission" }
            ],
            choices: [
                {
                    text: "You're right. Sorry. I'll make sure they're deleted.",
                    hint: "You can recover if you stop defending the mistake.",
                    next: "ch7_photo_memory_saved",
                    effects: [
                        { type: "addStat", key: "trust", amount: 2 },
                        { type: "setFlag", key: "privacyRespected", value: true }
                    ]
                },
                {
                    text: "Keep arguing",
                    hint: "No recovery if you refuse the lesson.",
                    next: "ending_openhouse_photo_boundary"
                }
            ]
        },

        ch8_nine_hour_unlock: {
            type: "phoneChoice",
            chapterLabel: "Secret Epilogue",
            chapterTitle: "Four Days Later",
            background: "images/phone.jpg",
            chatName: "Yannie",
            chatStatus: "8 April 2026 · 2:31 PM",
            messages: [
                { from: "her", text: "aniq" },
                { from: "her", text: "call me" },
                { from: "her", text: "im bored" },
                { from: "me", text: "Voice call · 4 min" },
                { from: "call", text: "Video call · 9 hr" }
            ],
            choices: [
                {
                    text: "Unlock the nine-hour route",
                    hint: "This is the game's proof that the open-house chapter was not an ending.",
                    next: "ending_nine_hour_route",
                    effects: [
                        { type: "addAchievement", value: "Nine Hour Route" },
                        { type: "addMemory", value: "8 April 2026 — “call me / im bored” → 9-hour video call." },
                        { type: "addSignal", value: "Yannie directly asked you to call because she was bored.", amount: 3 }
                    ]
                }
            ]
        },

        ending_nine_hour_route: {
            type: "ending",
            chapterLabel: "Potential Ending",
            chapterTitle: "The World Gets Bigger",
            background: "images/photo_together.jpg",
            speaker: "Narrator",
            text: "You reached the route with enough trust, comfort, signal-reading, and not too many fumbles. Four days after the open house, a simple “aniq / call me / im bored” turns into a nine-hour video call.\n\nMemory World does not end at the first photo anymore. It opens into the call era.",
            effects: [
                { type: "addAchievement", value: "Timeline Stable" }
            ],
            choices: [
                { text: "Restart and find another route", next: "SYSTEM_RESTART" }
            ]
        },

        ending_potential_locked: {
            type: "ending",
            chapterLabel: "Potential Ending",
            chapterTitle: "More Was Possible",
            background: "images/phone.jpg",
            speaker: "Narrator",
            text: "You reached the open-house ending, but not with enough trust, comfort, or signal-reading to unlock the hidden continuation. The timeline still survives — but the nine-hour call route stays hidden.\n\nReplay and pay attention to the small lines, not only the obvious romantic choices.",
            choices: [
                { text: "Replay Memory World", next: "SYSTEM_RESTART" }
            ]
        },

        ending_unstable_timeline: {
            type: "ending",
            chapterLabel: "Chaos Ending",
            chapterTitle: "Timeline Held Together With Tape",
            background: "images/phone.jpg",
            speaker: "Narrator",
            text: "Three fumbles. You still made it to the open house, which is honestly impressive, but the timeline is too unstable to unlock the secret epilogue.\n\nThe good news: mistakes are not instant death anymore. The bad news: they actually matter.",
            choices: [
                { text: "Try a cleaner run", next: "SYSTEM_RESTART" }
            ]
        },

        ending_openhouse_photo_boundary: {
            type: "ending",
            chapterLabel: "Bad Ending",
            chapterTitle: "Missed The Boundary",
            background: "images/phone.jpg",
            speaker: "Narrator",
            text: "The problem was never whether the photo looked good. She said she was uncomfortable with photos being taken without permission, and you failed to respect that. Trust drops hard here.",
            choices: [
                { text: "Restart and listen better", next: "SYSTEM_RESTART" }
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
            background: "images/room.jpg",
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
            background: "images/room.jpg",
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
            background: "images/room.jpg",
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
