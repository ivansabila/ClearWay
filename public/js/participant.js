const participantContainer = document.querySelector("#participantContainer");
const input = document.querySelector(".participant input");

input.addEventListener("focus", () => {
    participantContainer.style.outline = "rgb(232 129 110/.5) solid 3px";
})

input.addEventListener("blur", () => {
    participantContainer.style.outline = "transparent solid 3px";
})