/* =========================================================
   MEMORY WORLD — GAME ENGINE V2
   File: js/engine.js

   Supports:
   - story / vn / ending
   - choice / explore
   - chat / phoneChoice
   - call / route
   - active stats, hidden flags, signals, memories
========================================================= */

(() => {
    "use strict";

    const STORAGE_KEY = "memoryWorldSave_v3";
    const STORY = window.MW_STORY;

    if (!STORY) {
        console.error("MW_STORY not found. Make sure js/story.js loads before js/engine.js.");
        return;
    }

    const $ = (selector) => document.querySelector(selector);

    const statValues = {};
    const statBars = {};

    Object.keys(STORY.stats || {}).forEach((key) => {
        statValues[key] = $(`#${key}Value`);
        statBars[key] = $(`#${key}Bar`);
    });

    const dom = {
        background: $("#background"),
        chapterLabel: $("#chapterLabel"),
        chapterTitle: $("#chapterTitle"),

        speaker: $("#speaker"),
        dialogue: $("#dialogue"),
        nextBtn: $("#nextBtn"),
        dialogueBox: $("#dialogueBox"),
        choiceBox: $("#choiceBox"),

        chatScreen: $("#chatScreen"),
        chatName: $("#chatName"),
        chatStatus: $("#chatStatus"),
        chatMessages: $("#chatMessages"),
        chatContinueBtn: $("#chatContinueBtn"),

        menuBtn: $("#menuBtn"),
        menuPanel: $("#menuPanel"),
        closeMenuBtn: $("#closeMenuBtn"),
        saveBtn: $("#saveBtn"),
        loadBtn: $("#loadBtn"),
        restartBtn: $("#restartBtn"),

        inventoryList: $("#inventoryList"),
        signalList: $("#signalList"),
        memoryList: $("#memoryList"),
        historyList: $("#historyList"),
        achievementList: $("#achievementList"),

        timelineRiskValue: $("#timelineRiskValue"),
        fumbleValue: $("#fumbleValue"),

        challengeLayer: $("#challengeLayer"),
        challengeCard: $("#challengeCard"),
        challengeKicker: $("#challengeKicker"),
        challengeTitle: $("#challengeTitle"),
        challengePrompt: $("#challengePrompt"),
        challengeMeta: $("#challengeMeta"),
        challengeBody: $("#challengeBody"),

        toast: $("#toast"),
        fadeLayer: $("#fadeLayer"),

        statValues,
        statBars,

        sprites: {
            aniq: $("#aniq"),
            yannie: $("#yannie"),
            dad: $("#dad")
        }
    };

    let state = createInitialState();
    let activeScene = null;
    let isTyping = false;
    let typingTimer = null;
    let fullDialogueText = "";
    let chatIndex = 0;
    let toastTimer = null;
    let challengeTimer = null;
    let challengeDeadlineTimer = null;

    function createInitialState() {
        const stats = {};

        Object.entries(STORY.stats || {}).forEach(([key, config]) => {
            stats[key] = Number(config.default ?? 0);
        });

        return {
            currentSceneId: STORY.startScene,
            stats,
            flags: {},
            inventory: [],
            signals: [],
            memories: [],
            achievements: [],
            history: [],
            fumbles: 0,
            riskRolls: {},
            appliedSceneEffects: {},
            appliedChoiceEffects: {}
        };
    }

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function getScene(sceneId) {
        return STORY.scenes?.[sceneId] || null;
    }

    function renderScene(sceneId) {
        if (sceneId === "SYSTEM_RESTART") {
            restartGame();
            return;
        }

        const scene = getScene(sceneId);

        if (!scene) {
            console.error(`Scene not found: ${sceneId}`);
            showToast(`Missing scene: ${sceneId}`, "bad");
            return;
        }

        clearChallengeTimers();
        hideChallengeLayer();
        state.currentSceneId = sceneId;
        activeScene = scene;

        updateChapter(scene);
        updateBackground(scene.background);
        updateSprites(scene.character);
        updateHud();
        updateMenuLists();

        if (scene.type !== "route") {
            addHistory(sceneId, scene);
        }

        applySceneEffectsOnce(sceneId, scene);

        clearChoiceBox();
        hideChatScreen();

        switch (scene.type) {
            case "story":
            case "vn":
                renderDialogueScene(scene);
                break;

            case "choice":
            case "explore":
                renderChoiceScene(scene);
                break;

            case "timedChoice":
                renderTimedChoiceScene(scene);
                break;

            case "riskChoice":
                renderRiskChoiceScene(scene);
                break;

            case "signalCheck":
                renderSignalCheckScene(scene);
                break;

            case "sequence":
                renderSequenceScene(scene);
                break;

            case "chat":
                renderChatScene(scene);
                break;

            case "phoneChoice":
                renderPhoneChoiceScene(scene, false);
                break;

            case "call":
                renderPhoneChoiceScene(scene, true);
                break;

            case "route":
                resolveRouteScene(scene);
                break;

            case "ending":
                renderEndingScene(scene);
                break;

            default:
                console.warn(`Unknown scene type: ${scene.type}`);
                renderDialogueScene({
                    speaker: "Narrator",
                    text: "This scene type is not supported yet.",
                    next: null
                });
        }
    }

    function updateChapter(scene) {
        if (dom.chapterLabel) dom.chapterLabel.textContent = scene.chapterLabel || "";
        if (dom.chapterTitle) dom.chapterTitle.textContent = scene.chapterTitle || STORY.meta?.title || "Memory World";
    }

    function updateBackground(backgroundPath) {
        if (!dom.background || !backgroundPath) return;
        dom.background.style.backgroundImage = `radial-gradient(circle at center, rgba(255, 92, 168, 0.18), rgba(0, 0, 0, 0.95)), url("${backgroundPath}")`;
    }

    function updateSprites(activeCharacterKey) {
        Object.values(dom.sprites).forEach((sprite) => {
            if (!sprite) return;
            sprite.classList.add("hiddenCharacter");
            sprite.classList.remove("active", "inactive");
        });

        if (!activeCharacterKey) return;

        const character = STORY.characters?.[activeCharacterKey];
        const activeSpriteId = character?.spriteId || activeCharacterKey;

        Object.entries(dom.sprites).forEach(([key, sprite]) => {
            if (!sprite) return;
            sprite.classList.remove("hiddenCharacter");

            if (key === activeSpriteId) {
                sprite.classList.add("active");
                sprite.classList.remove("inactive");
            } else {
                sprite.classList.add("inactive");
                sprite.classList.remove("active");
            }
        });
    }

    function renderDialogueScene(scene) {
        showDialogueBox();
        setSpeaker(scene.speaker || "Narrator");
        typeDialogue(scene.text || "");

        if (dom.nextBtn) {
            dom.nextBtn.style.display = "inline-block";
            dom.nextBtn.textContent = scene.next ? "Next ▶" : "End";
            dom.nextBtn.onclick = () => {
                if (isTyping) {
                    finishTypingImmediately();
                    return;
                }

                if (scene.next) renderScene(scene.next);
            };
        }
    }

    function renderEndingScene(scene) {
        showDialogueBox();
        setSpeaker(scene.speaker || "Narrator");
        typeDialogue(scene.text || "Ending reached.");

        if (dom.nextBtn) dom.nextBtn.style.display = "none";

        if (Array.isArray(scene.choices)) renderChoices(scene.choices, dom.choiceBox);
    }

    function renderChoiceScene(scene) {
        showDialogueBox();

        const title = scene.type === "explore" ? "Explore" : "Choice";
        setSpeaker(scene.speaker || title);

        const lines = [];
        if (scene.location) lines.push(`📍 ${scene.location}`);
        if (scene.time) lines.push(`⏳ ${scene.time}`);
        if (scene.status) lines.push(scene.status);
        lines.push(scene.question || "What do you want to do?");

        typeDialogue(lines.join("\n\n"));

        if (dom.nextBtn) dom.nextBtn.style.display = "none";

        renderChoices(scene.choices || [], dom.choiceBox);
    }

    function showChallengeLayer() {
        if (dom.challengeLayer) dom.challengeLayer.classList.add("active");
    }

    function hideChallengeLayer() {
        if (dom.challengeLayer) dom.challengeLayer.classList.remove("active");
        if (dom.challengeBody) dom.challengeBody.innerHTML = "";
        if (dom.challengeMeta) dom.challengeMeta.innerHTML = "";
    }

    function clearChallengeTimers() {
        clearInterval(challengeTimer);
        clearTimeout(challengeDeadlineTimer);
        challengeTimer = null;
        challengeDeadlineTimer = null;
    }

    function renderTimedChoiceScene(scene) {
        showDialogueBox();
        setSpeaker(scene.speaker || "Moment");
        typeDialogue(scene.question || scene.text || "Choose before the moment passes.");
        if (dom.nextBtn) dom.nextBtn.style.display = "none";

        renderChoices(scene.choices || [], dom.choiceBox);

        const seconds = Math.max(3, Number(scene.timeLimit || 8));
        let remaining = seconds;
        const timer = document.createElement("div");
        timer.className = "choiceTimer";
        timer.innerHTML = `<span>Moment closes in</span><strong>${remaining}s</strong><div><i></i></div>`;
        dom.choiceBox?.prepend(timer);
        const fill = timer.querySelector("i");
        const value = timer.querySelector("strong");

        challengeTimer = setInterval(() => {
            remaining -= 1;
            if (value) value.textContent = `${Math.max(0, remaining)}s`;
            if (fill) fill.style.width = `${Math.max(0, (remaining / seconds) * 100)}%`;
        }, 1000);

        challengeDeadlineTimer = setTimeout(() => {
            clearChallengeTimers();
            const timeoutEffects = scene.timeoutEffects || [];
            const timeoutAlreadyAddsFumble = timeoutEffects.some(effect => effect?.type === "addFumble");
            if (!timeoutAlreadyAddsFumble) {
                addFumble(1, "You hesitated and the moment moved without you.");
            }
            applyEffects(timeoutEffects);
            if (scene.timeoutNext) renderScene(scene.timeoutNext);
            else if (scene.next) renderScene(scene.next);
        }, seconds * 1000);
    }

    function calculateChoiceChance(choice) {
        let chance = Number(choice.baseChance ?? 65);
        Object.entries(choice.boostFrom || {}).forEach(([key, multiplier]) => {
            chance += Number(state.stats[key] || 0) * Number(multiplier || 0);
        });
        Object.entries(choice.penaltyFrom || {}).forEach(([key, multiplier]) => {
            chance -= Number(state.stats[key] || 0) * Number(multiplier || 0);
        });
        chance -= Number(state.fumbles || 0) * 4;
        return clamp(Math.round(chance), 5, 95);
    }

    function renderRiskChoiceScene(scene) {
        showDialogueBox();
        setSpeaker(scene.speaker || "Risk");
        typeDialogue(scene.question || scene.text || "How far do you push the moment?");
        if (dom.nextBtn) dom.nextBtn.style.display = "none";
        clearChoiceBox();

        (scene.choices || []).forEach((choice, index) => {
            const isUnlocked = checkRequirement(choice.require);
            const chance = calculateChoiceChance(choice);
            const button = document.createElement("button");
            button.className = "choiceBtn riskChoiceBtn";
            button.type = "button";
            button.disabled = !isUnlocked;
            if (!isUnlocked) button.classList.add("locked");

            const textNode = document.createElement("span");
            textNode.className = "choiceText";
            textNode.textContent = choice.text || `Choice ${index + 1}`;
            const meter = document.createElement("span");
            meter.className = "riskChance";
            const label = chance >= 78 ? "LOW RISK" : chance >= 50 ? "MEDIUM RISK" : "HIGH RISK";
            meter.innerHTML = `<b>${label}</b><i>${chance}%</i>`;
            const hint = document.createElement("span");
            hint.className = "choiceHint";
            hint.textContent = isUnlocked ? (choice.hint || "The timeline can bend here.") : (choice.lockedHint || "Locked for now.");
            button.append(textNode, meter, hint);

            if (isUnlocked) button.addEventListener("click", () => selectRiskChoice(choice, index, chance));
            dom.choiceBox?.appendChild(button);
        });
    }

    function selectRiskChoice(choice, index, chance) {
        const key = `${state.currentSceneId}:${index}`;
        if (!state.riskRolls[key]) {
            const roll = Math.floor(Math.random() * 100) + 1;
            state.riskRolls[key] = { roll, chance, success: roll <= chance };
        }
        const result = state.riskRolls[key];

        showChallengeLayer();
        dom.challengeKicker.textContent = "RISK CHECK";
        dom.challengeTitle.textContent = result.success ? "It landed." : "Timeline wobble.";
        dom.challengePrompt.textContent = result.success
            ? (choice.successText || "The moment survives the risk.")
            : (choice.failText || "Not every brave choice lands cleanly.");
        dom.challengeMeta.innerHTML = `<span>Chance ${result.chance}%</span><span>Roll ${result.roll}</span>`;
        dom.challengeBody.innerHTML = "";
        const continueBtn = document.createElement("button");
        continueBtn.className = "challengeContinue";
        continueBtn.type = "button";
        continueBtn.textContent = result.success ? "Keep going →" : "Recover →";
        continueBtn.addEventListener("click", () => {
            hideChallengeLayer();
            const effects = result.success ? (choice.effects || choice.successEffects || []) : (choice.failEffects || []);
            applyEffects(effects);
            if (!result.success && choice.fumbleOnFail !== false) addFumble(1, choice.fumbleText || "That could have gone smoother.");
            const next = result.success ? (choice.next || choice.successNext) : (choice.failNext || choice.next);
            if (next) renderScene(next);
        });
        dom.challengeBody.appendChild(continueBtn);
    }

    function renderSignalCheckScene(scene) {
        hideDialogueBox();
        clearChoiceBox();
        showChallengeLayer();
        dom.challengeKicker.textContent = scene.kicker || "SIGNAL CHECK";
        dom.challengeTitle.textContent = scene.title || "What actually mattered?";
        dom.challengePrompt.textContent = scene.prompt || "Pick the line you think mattered most in this memory.";
        dom.challengeMeta.textContent = scene.meta || "Read the wording, not just the obvious event.";
        dom.challengeBody.innerHTML = "";

        (scene.options || []).forEach((option, index) => {
            const button = document.createElement("button");
            button.className = "signalOption";
            button.type = "button";
            button.innerHTML = `<span>${option.speaker || "Chat"}</span><strong>${option.text || ""}</strong>`;
            button.addEventListener("click", () => {
                [...dom.challengeBody.querySelectorAll("button")].forEach((b) => b.disabled = true);
                const correct = option.correct === true;
                button.classList.add(correct ? "correct" : "wrong");
                if (correct) {
                    applyEffects(scene.correctEffects || []);
                    if (scene.signal) addSignal(scene.signal, Number(scene.signalAmount ?? 1));
                    dom.challengeMeta.textContent = scene.correctText || "You caught it.";
                } else {
                    applyEffects(scene.wrongEffects || []);
                    addFumble(Number(scene.fumbleOnWrong ?? 1), scene.wrongText || "You read the moment wrong.");
                    dom.challengeMeta.textContent = scene.wrongText || "Not quite. Context matters.";
                }
                const nextBtn = document.createElement("button");
                nextBtn.className = "challengeContinue";
                nextBtn.type = "button";
                nextBtn.textContent = "Continue →";
                nextBtn.addEventListener("click", () => renderScene(scene.next));
                dom.challengeBody.appendChild(nextBtn);
            });
            dom.challengeBody.appendChild(button);
        });
    }

    function renderSequenceScene(scene) {
        hideDialogueBox();
        clearChoiceBox();
        showChallengeLayer();
        dom.challengeKicker.textContent = scene.kicker || "MEMORY RECONSTRUCTION";
        dom.challengeTitle.textContent = scene.title || "Put the messages back in order";
        dom.challengePrompt.textContent = scene.prompt || "Tap the messages in the order they happened.";
        dom.challengeMeta.textContent = "0 / " + (scene.items?.length || 0);
        dom.challengeBody.innerHTML = "";

        let progress = 0;
        const items = (scene.items || []).map((item, index) => ({ ...item, originalIndex: index }));
        const shuffled = [...items].sort(() => Math.random() - 0.5);
        const selectedWrap = document.createElement("div");
        selectedWrap.className = "sequenceSelected";
        const optionWrap = document.createElement("div");
        optionWrap.className = "sequenceOptions";
        dom.challengeBody.append(selectedWrap, optionWrap);

        function resetAttempt() {
            progress = 0;
            selectedWrap.innerHTML = "";
            optionWrap.innerHTML = "";
            shuffled.forEach((item) => addItemButton(item));
            dom.challengeMeta.textContent = `0 / ${items.length}`;
        }

        function addItemButton(item) {
            const button = document.createElement("button");
            button.className = "sequenceOption";
            button.type = "button";
            button.textContent = item.text;
            button.addEventListener("click", () => {
                const expected = items[progress];
                if (item.originalIndex === expected.originalIndex) {
                    const chosen = document.createElement("div");
                    chosen.className = "sequenceChosen";
                    chosen.textContent = item.text;
                    selectedWrap.appendChild(chosen);
                    button.remove();
                    progress += 1;
                    dom.challengeMeta.textContent = `${progress} / ${items.length}`;
                    if (progress === items.length) {
                        applyEffects(scene.effects || []);
                        if (scene.achievement) addAchievement(scene.achievement);
                        const nextBtn = document.createElement("button");
                        nextBtn.className = "challengeContinue";
                        nextBtn.type = "button";
                        nextBtn.textContent = "Memory restored →";
                        nextBtn.addEventListener("click", () => renderScene(scene.next));
                        optionWrap.appendChild(nextBtn);
                    }
                } else {
                    addFumble(1, scene.failText || "Wrong order. The memory glitches.");
                    optionWrap.classList.add("shake");
                    setTimeout(() => optionWrap.classList.remove("shake"), 380);
                    resetAttempt();
                }
            });
            optionWrap.appendChild(button);
        }

        resetAttempt();
    }

    function renderChoices(choices, container) {
        if (!container) return;
        container.innerHTML = "";

        choices.forEach((choice, index) => {
            const isUnlocked = checkRequirement(choice.require);
            const button = document.createElement("button");
            const text = document.createElement("span");
            const hint = document.createElement("span");

            button.className = "choiceBtn";
            button.type = "button";

            const tone = choice.tone || choice.choiceType || "";
            if (tone) button.classList.add(`${tone}Choice`);

            text.className = "choiceText";
            text.textContent = choice.text || `Choice ${index + 1}`;

            hint.className = "choiceHint";
            hint.textContent = isUnlocked
                ? buildChoiceHint(choice)
                : (choice.lockedHint || "Locked for now.");

            button.appendChild(text);
            button.appendChild(hint);

            if (!isUnlocked) {
                button.disabled = true;
                button.classList.add("locked");
            } else {
                button.onclick = () => selectChoice(choice, index);
            }

            container.appendChild(button);
        });
    }

    function buildChoiceHint(choice) {
        const hint = choice.hint || "";
        if (choice.riskLabel) return hint ? `${choice.riskLabel} risk · ${hint}` : `${choice.riskLabel} risk`;
        return hint;
    }

    function selectChoice(choice, index) {
        clearChallengeTimers();
        const sceneId = state.currentSceneId;
        const effectKey = `${sceneId}:${index}`;

        if (!state.appliedChoiceEffects[effectKey]) {
            applyEffects(choice.effects || []);
            state.appliedChoiceEffects[effectKey] = true;
        }

        if (choice.next) renderScene(choice.next);
    }

    function renderChatScene(scene) {
        hideDialogueBox();
        clearChoiceBox();
        showChatScreen();

        chatIndex = 0;
        dom.chatMessages.innerHTML = "";
        dom.chatName.textContent = scene.chatName || "Chat";
        dom.chatStatus.textContent = scene.chatStatus || "Online";

        if (dom.chatContinueBtn) {
            dom.chatContinueBtn.classList.add("active");
            dom.chatContinueBtn.textContent = "Next Message ▶";
            dom.chatContinueBtn.onclick = () => advanceChat(scene);
        }

        advanceChat(scene);
    }

    function advanceChat(scene) {
        const messages = scene.messages || [];

        if (chatIndex < messages.length) {
            appendChatMessage(messages[chatIndex]);
            chatIndex += 1;

            if (chatIndex >= messages.length) dom.chatContinueBtn.textContent = scene.next ? "Continue ▶" : "End";
            return;
        }

        if (scene.next) renderScene(scene.next);
    }

    function renderPhoneChoiceScene(scene, isCall) {
        hideDialogueBox();
        clearChoiceBox();
        showChatScreen();

        dom.chatMessages.innerHTML = "";
        dom.chatName.textContent = scene.chatName || (isCall ? "Voice Call" : "Chat");
        dom.chatStatus.textContent = scene.chatStatus || (isCall ? `Voice call${scene.callTime ? ` • ${scene.callTime}` : ""}` : "Online");

        if (dom.chatContinueBtn) dom.chatContinueBtn.classList.remove("active");

        (scene.messages || []).forEach((message) => appendChatMessage(message));

        const choiceWrap = document.createElement("div");
        choiceWrap.className = "phoneChoices";
        dom.chatMessages.appendChild(choiceWrap);
        renderChoices(scene.choices || [], choiceWrap);
        dom.chatMessages.scrollTop = dom.chatMessages.scrollHeight;
    }

    function appendChatMessage(message) {
        const bubble = document.createElement("div");
        let from = message.from === "me" ? "me" : "her";

        if (message.from === "system") from = "system";
        if (message.from === "signal") from = "signalBubble";
        if (message.from === "call") from = "callSystem";

        bubble.className = `message ${from}`;
        bubble.textContent = message.text || "";

        dom.chatMessages.appendChild(bubble);
        dom.chatMessages.scrollTop = dom.chatMessages.scrollHeight;
    }

    function resolveRouteScene(scene) {
        const matchedRoute = (scene.routes || []).find((route) => checkRequirement(route.require));

        if (matchedRoute?.next) {
            renderScene(matchedRoute.next);
            return;
        }

        console.error("Route scene has no valid route.", scene);
        showToast("No route found", "bad");
    }

    function applySceneEffectsOnce(sceneId, scene) {
        if (!scene.effects || state.appliedSceneEffects[sceneId]) return;
        applyEffects(scene.effects);
        state.appliedSceneEffects[sceneId] = true;
    }

    function applyEffects(effects) {
        effects.forEach((effect) => {
            switch (effect.type) {
                case "addStat":
                    addStat(effect.key, Number(effect.amount || 0));
                    break;

                case "setStat":
                    setStat(effect.key, Number(effect.value || 0));
                    break;

                case "setFlag":
                    state.flags[effect.key] = effect.value;
                    if (effect.toast) showToast(effect.toast, "neutral");
                    break;

                case "addInventory":
                    addUnique(state.inventory, effect.value);
                    showToast(`Item added: ${effect.value}`, "neutral");
                    break;

                case "removeInventory":
                    state.inventory = state.inventory.filter((item) => item !== effect.value);
                    showToast(`Item removed: ${effect.value}`, "neutral");
                    break;

                case "addMemory":
                    addUnique(state.memories, effect.value);
                    showToast("Memory unlocked", "good");
                    break;

                case "addSignal":
                    addSignal(effect.value, Number(effect.amount ?? 1));
                    break;

                case "addFumble":
                    addFumble(Number(effect.amount ?? 1), effect.message);
                    break;

                case "addAchievement":
                    addAchievement(effect.value);
                    break;

                case "toast":
                    showToast(effect.message, effect.tone || "neutral");
                    break;

                default:
                    console.warn("Unknown effect:", effect);
            }
        });

        updateHud();
        updateMenuLists();
    }

    function addSignal(value, amount = 1) {
        if (value) {
            addUnique(state.signals, value);
            showToast("Signal noticed", "good");
        }

        if (STORY.stats?.signal) addStat("signal", amount, false);
    }

    function addAchievement(value) {
        if (!value) return;
        const before = state.achievements.length;
        addUnique(state.achievements, value);
        if (state.achievements.length > before) showToast(`Achievement: ${value}`, "good");
        updateMenuLists();
    }

    function addFumble(amount = 1, message = "Fumble") {
        state.fumbles = clamp(Number(state.fumbles || 0) + Number(amount || 0), 0, 3);
        if (message) showToast(`${message} (${state.fumbles}/3)`, state.fumbles >= 3 ? "bad" : "neutral");
        if (state.fumbles >= 3) state.flags.timelineUnstable = true;
        updateHud();
        updateMenuLists();
    }

    function calculateTimelineRisk() {
        const awkward = Number(state.stats.awkwardness || 0) * 5;
        const confidence = Number(state.stats.confidence || 0) * 1.6;
        const trust = Number(state.stats.trust || 0) * 1.4;
        const comfort = Number(state.stats.comfort || 0) * 1.2;
        const fumble = Number(state.fumbles || 0) * 14;
        return clamp(Math.round(28 + awkward + fumble - confidence - trust - comfort), 4, 96);
    }

    function addStat(key, amount, show = true) {
        const config = STORY.stats?.[key];
        if (!config) return;

        const oldValue = Number(state.stats[key] ?? config.default ?? 0);
        const newValue = clamp(oldValue + amount, config.min, config.max);
        state.stats[key] = newValue;

        if (!show || amount === 0) return;

        const sign = amount > 0 ? "+" : "";
        const tone = amount >= 0 ? "good" : "bad";
        showToast(`${config.label || key} ${sign}${amount}`, tone);
    }

    function setStat(key, value) {
        const config = STORY.stats?.[key];
        if (!config) return;
        state.stats[key] = clamp(value, config.min, config.max);
        showToast(`${config.label || key} set`, "neutral");
    }

    function addUnique(list, value) {
        if (!value) return;
        if (!list.includes(value)) list.push(value);
    }

    function checkRequirement(requirement) {
        if (!requirement) return true;

        if (requirement.allFlagTrue) {
            const ok = requirement.allFlagTrue.every((key) => state.flags[key] === true);
            if (!ok) return false;
        }

        if (requirement.anyFlagTrue) {
            const ok = requirement.anyFlagTrue.some((key) => state.flags[key] === true);
            if (!ok) return false;
        }

        if (requirement.notFlagTrue) {
            const ok = requirement.notFlagTrue.every((key) => state.flags[key] !== true);
            if (!ok) return false;
        }

        if (requirement.flagEquals) {
            const ok = Object.entries(requirement.flagEquals).every(([key, value]) => state.flags[key] === value);
            if (!ok) return false;
        }

        if (requirement.hasInventory) {
            const ok = requirement.hasInventory.every((item) => state.inventory.includes(item));
            if (!ok) return false;
        }

        if (requirement.hasSignal) {
            const ok = requirement.hasSignal.every((signal) => state.signals.includes(signal));
            if (!ok) return false;
        }

        if (requirement.hasMemory) {
            const ok = requirement.hasMemory.every((memory) => state.memories.includes(memory));
            if (!ok) return false;
        }

        if (requirement.statAtLeast) {
            const ok = Object.entries(requirement.statAtLeast).every(([key, value]) => Number(state.stats[key] || 0) >= value);
            if (!ok) return false;
        }

        if (requirement.statAtMost) {
            const ok = Object.entries(requirement.statAtMost).every(([key, value]) => Number(state.stats[key] || 0) <= value);
            if (!ok) return false;
        }

        if (requirement.fumblesAtMost !== undefined && Number(state.fumbles || 0) > Number(requirement.fumblesAtMost)) return false;
        if (requirement.fumblesAtLeast !== undefined && Number(state.fumbles || 0) < Number(requirement.fumblesAtLeast)) return false;

        return true;
    }

    function updateHud() {
        Object.entries(STORY.stats || {}).forEach(([key, config]) => {
            const value = Number(state.stats[key] ?? config.default ?? 0);
            const min = Number(config.min ?? 0);
            const max = Number(config.max ?? 10);
            const percentage = ((value - min) / (max - min)) * 100;

            if (dom.statValues[key]) dom.statValues[key].textContent = value;
            if (dom.statBars[key]) dom.statBars[key].style.width = `${clamp(percentage, 0, 100)}%`;
        });

        if (dom.timelineRiskValue) dom.timelineRiskValue.textContent = `${calculateTimelineRisk()}%`;
        if (dom.fumbleValue) {
            const used = Number(state.fumbles || 0);
            dom.fumbleValue.textContent = `${"♥ ".repeat(3 - used)}${"♡ ".repeat(used)}`.trim();
            dom.fumbleValue.dataset.level = used;
        }
    }

    function updateMenuLists() {
        renderList(dom.inventoryList, state.inventory, "No items yet.");
        renderList(dom.signalList, state.signals, "No signals noticed yet.");
        renderList(dom.memoryList, state.memories, "No memories unlocked yet.");
        renderList(dom.achievementList, state.achievements, "No achievements yet.");
        renderList(dom.historyList, state.history.map((entry) => entry.label), "No story log yet.");
    }

    function renderList(listElement, items, emptyText) {
        if (!listElement) return;
        listElement.innerHTML = "";

        if (!items.length) {
            const li = document.createElement("li");
            li.className = "emptyText";
            li.textContent = emptyText;
            listElement.appendChild(li);
            return;
        }

        items.slice(-14).forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item;
            listElement.appendChild(li);
        });
    }

    function addHistory(sceneId, scene) {
        const label = `${scene.chapterLabel || "Scene"}: ${scene.chapterTitle || sceneId}`;
        const lastEntry = state.history[state.history.length - 1];

        if (lastEntry?.sceneId === sceneId) return;
        state.history.push({ sceneId, label });
        if (state.history.length > 50) state.history.shift();
    }

    function setSpeaker(speakerKeyOrName) {
        const character = STORY.characters?.[speakerKeyOrName];
        dom.speaker.textContent = character?.name || speakerKeyOrName || "Narrator";
    }

    function typeDialogue(text) {
        clearTimeout(typingTimer);
        fullDialogueText = text;
        dom.dialogue.textContent = "";
        isTyping = true;

        let index = 0;
        const speed = 14;

        function typeNextChar() {
            if (!isTyping) return;
            dom.dialogue.textContent = fullDialogueText.slice(0, index);
            index += 1;

            if (index <= fullDialogueText.length) typingTimer = setTimeout(typeNextChar, speed);
            else isTyping = false;
        }

        typeNextChar();
    }

    function finishTypingImmediately() {
        clearTimeout(typingTimer);
        dom.dialogue.textContent = fullDialogueText;
        isTyping = false;
    }

    function showDialogueBox() {
        if (dom.dialogueBox) dom.dialogueBox.style.display = "block";
    }

    function hideDialogueBox() {
        if (dom.dialogueBox) dom.dialogueBox.style.display = "none";
    }

    function clearChoiceBox() {
        if (dom.choiceBox) dom.choiceBox.innerHTML = "";
    }

    function showChatScreen() {
        if (dom.chatScreen) dom.chatScreen.classList.add("active");
    }

    function hideChatScreen() {
        if (dom.chatScreen) dom.chatScreen.classList.remove("active");
    }

    function showToast(message, tone = "neutral") {
        if (!dom.toast || !message) return;

        clearTimeout(toastTimer);
        dom.toast.textContent = message;
        dom.toast.className = "";
        dom.toast.classList.add("show", tone);

        toastTimer = setTimeout(() => {
            dom.toast.classList.remove("show");
        }, 1500);
    }

    function saveGame() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            showToast("Game saved", "good");
            updateMenuLists();
        } catch (error) {
            console.error(error);
            showToast("Save failed", "bad");
        }
    }

    function loadGame() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (!saved) {
                showToast("No save file found", "bad");
                return;
            }

            const parsed = JSON.parse(saved);
            state = normalizeLoadedState(parsed);
            showToast("Game loaded", "good");
            closeMenu();
            renderScene(state.currentSceneId || STORY.startScene);
        } catch (error) {
            console.error(error);
            showToast("Load failed", "bad");
        }
    }

    function normalizeLoadedState(savedState) {
        const fresh = createInitialState();
        return {
            ...fresh,
            ...savedState,
            stats: { ...fresh.stats, ...(savedState.stats || {}) },
            flags: savedState.flags || {},
            inventory: savedState.inventory || [],
            signals: savedState.signals || [],
            memories: savedState.memories || [],
            achievements: savedState.achievements || [],
            history: savedState.history || [],
            fumbles: Number(savedState.fumbles || 0),
            riskRolls: savedState.riskRolls || {},
            appliedSceneEffects: savedState.appliedSceneEffects || {},
            appliedChoiceEffects: savedState.appliedChoiceEffects || {}
        };
    }

    function restartGame() {
        clearChallengeTimers();
        hideChallengeLayer();
        state = createInitialState();
        closeMenu();
        showToast("Restarted", "neutral");
        renderScene(STORY.startScene);
    }

    function openMenu() {
        updateMenuLists();
        dom.menuPanel?.classList.add("active");
    }

    function closeMenu() {
        dom.menuPanel?.classList.remove("active");
    }

    function bindEvents() {
        dom.menuBtn?.addEventListener("click", openMenu);
        dom.closeMenuBtn?.addEventListener("click", closeMenu);
        dom.saveBtn?.addEventListener("click", saveGame);
        dom.loadBtn?.addEventListener("click", loadGame);
        dom.restartBtn?.addEventListener("click", restartGame);

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                if (dom.menuPanel?.classList.contains("active")) closeMenu();
                else openMenu();
            }

            if (event.key === "Enter" || event.key === " ") {
                const isChatOpen = dom.chatScreen?.classList.contains("active");
                const isMenuOpen = dom.menuPanel?.classList.contains("active");

                if (isMenuOpen) return;

                if (isChatOpen && dom.chatContinueBtn?.classList.contains("active")) {
                    event.preventDefault();
                    dom.chatContinueBtn.click();
                    return;
                }

                if (dom.nextBtn && dom.nextBtn.style.display !== "none") {
                    event.preventDefault();
                    dom.nextBtn.click();
                }
            }
        });
    }

    function boot() {
        bindEvents();
        updateHud();
        renderScene(state.currentSceneId || STORY.startScene);
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
    else boot();
})();
