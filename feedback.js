const chatPanel = document.querySelector(".chat-panel");

let record = null;
try {
    record = JSON.parse(localStorage.getItem("round1Conversation"));
} catch (error) {
    console.warn("对话记录读取失败", error);
}

if (!record || !record.messages.length) {
    chatPanel.textContent = "没有找到对话记录，请先完成一轮练习。";
} else {
    for (const { speaker, text } of record.messages) {
        const message = document.createElement("div");
        message.className = `message ${speaker}-message`;

        const label = document.createElement("p");
        label.className = "speaker";
        label.textContent = speaker === "employee" ? "店員 / 店员" : "あなた / 你";

        const body = document.createElement("p");
        body.textContent = text;

        message.append(label, body);
        chatPanel.append(message);
    }
}
