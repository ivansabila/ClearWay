var inputContainer = document.querySelector(".passwordContent");
var input = document.querySelector(".passwordContent input");
var icon = document.querySelector("#showHide");

input.addEventListener("focus", () => {
    inputContainer.style.outline = "rgb(232 129 110/.5) solid 3px";
});

input.addEventListener("blur", () => {
    inputContainer.style.outline = "transparent solid 3px";
});

icon.addEventListener("click", () => {
    if (input.type == "password") {
        icon.src = "/images/icons/ic_eye_off.svg";
        input.type = "text";
    } else {
        icon.src = "/images/icons/ic_eye.svg";
        input.type = "password";
    }
});
