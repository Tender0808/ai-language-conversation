// 第一轮对话：目前用固定台词模拟店员，之后把 getEmployeeReply 换成调用 AI API 即可
const employeeScript = [
    "ご予約ですね。ありがとうございます。ご希望の日にちをお伺いしてもよろしいでしょうか。",
    "かしこまりました。お時間は何時ごろがよろしいでしょうか。",
    "承知いたしました。何名様でいらっしゃいますか。",
    "ありがとうございます。お席は禁煙席と喫煙席がございますが、どちらになさいますか。",
    "かしこまりました。ご予約のお名前をお伺いしてもよろしいでしょうか。",
    "ありがとうございます。お席のご用意ができますので、ご予約を承りました。ほかに何かご質問はございますか。",
    "かしこまりました。それでは、当日お待ちしております。お電話ありがとうございました。"
];

const chatPanel = document.querySelector(".chat-panel");
const form = document.querySelector(".message-form");
const textarea = document.querySelector("#user-message");
const sendButton = form.querySelector("button");
const endButton = document.querySelector(".end-button");

const conversation = [
    { speaker: "employee", text: chatPanel.querySelector(".employee-message p:last-child").textContent }
];

function addMessage(speaker, text) {
    conversation.push({ speaker, text });

    const message = document.createElement("div");
    message.className = `message ${speaker}-message`;

    const label = document.createElement("p");
    label.className = "speaker";
    label.textContent = speaker === "employee" ? "店員 / 店员" : "あなた / 你";

    const body = document.createElement("p");
    body.textContent = text;

    message.append(label, body);
    chatPanel.append(message);
    message.scrollIntoView({ behavior: "smooth", block: "end" });
}

// 接入 AI 后改成：把 conversation 发给后端，返回店员的下一句
function getEmployeeReply() {
    const userTurns = conversation.filter((item) => item.speaker === "user").length;
    return Promise.resolve(employeeScript[userTurns - 1] ?? null);
}

function isFinished() {
    const userTurns = conversation.filter((item) => item.speaker === "user").length;
    return userTurns >= employeeScript.length;
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const text = textarea.value.trim();
    if (!text) {
        return;
    }

    addMessage("user", text);
    textarea.value = "";
    sendButton.disabled = true;

    // 稍等一下再回复，模拟店员说话的节奏
    await new Promise((resolve) => setTimeout(resolve, 600));
    const reply = await getEmployeeReply();
    if (reply) {
        addMessage("employee", reply);
    }

    if (isFinished()) {
        form.hidden = true;
        endButton.textContent = "通話終了 / 查看本轮反馈";
    } else {
        sendButton.disabled = false;
        textarea.focus();
    }
});

endButton.addEventListener("click", () => {
    try {
        localStorage.setItem("round1Conversation", JSON.stringify({
            finishedAt: new Date().toISOString(),
            messages: conversation
        }));
    } catch (error) {
        console.warn("对话记录保存失败", error);
    }
    window.location.href = "feedback.html";
});
