const messageForm = document.querySelector(".message-form");
const messageInput = document.querySelector("#user-message");
const chatPanel = document.querySelector(".chat-panel");
const sendButton = document.querySelector(".message-form button");
function addMessage(type, speakerName, text) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", type);

    const speakerElement = document.createElement("p");
    speakerElement.classList.add("speaker");
    speakerElement.textContent = speakerName;

    const textElement = document.createElement("p");
    textElement.textContent = text;

    messageElement.append(speakerElement, textElement);
    chatPanel.appendChild(messageElement);
}
const employeeReplies = [
    "ご予約ですね。ありがとうございます。ご希望の日にちをお伺いしてもよろしいでしょうか。",
    "かしこまりました。お時間は何時ごろがよろしいでしょうか。",
    "承知いたしました。何名様でいらっしゃいますか。",
    "お席は禁煙席と喫煙席がございますが、どちらになさいますか。",
    "かしこまりました。ご予約のお名前をお伺いしてもよろしいでしょうか。",
    "ありがとうございます。それでは、当日お待ちしております。"
];
let replyIndex = 0;

messageForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const userMessage = messageInput.value.trim();
    console.log("用户输入：", userMessage);

    if (userMessage === "") {
        return;
    }

    addMessage("user-message", "あなた / 你", userMessage);
    messageInput.value = "";

    if (replyIndex < employeeReplies.length) {
        addMessage("employee-message", "店員 / 店员", employeeReplies[replyIndex]);
        replyIndex++;

        if (replyIndex === employeeReplies.length) {
            sendButton.disabled = true;
            messageInput.disabled = true;
        }
    }
});