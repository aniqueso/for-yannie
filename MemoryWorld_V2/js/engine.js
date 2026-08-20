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

    const STORAGE_KEY = "memoryWorldSave_v2";
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
            history: [],
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
        const labelMap = {
            badEnd: "Bad ending",
            weak: "Weak choice",
            good: "Good choice",
            canon: "Canon route",
            signal: "Signal moment"
        };

        const label = labelMap[choice.choiceType];
        const hint = choice.hint || "";

        if (!label) return hint;
        return hint ? `${label} — ${hint}` : label;
    }

    function selectChoice(choice, index) {
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
    }

    function updateMenuLists() {
        renderList(dom.inventoryList, state.inventory, "No items yet.");
        renderList(dom.signalList, state.signals, "No signals noticed yet.");
        renderList(dom.memoryList, state.memories, "No memories unlocked yet.");
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
            history: savedState.history || [],
            appliedSceneEffects: savedState.appliedSceneEffects || {},
            appliedChoiceEffects: savedState.appliedChoiceEffects || {}
        };
    }

    function restartGame() {
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
