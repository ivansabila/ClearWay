function updateCharCount() {
    const description = document.querySelector("#description");
    const charCount = document.querySelector("#charCount");

    charCount.textContent = `${description.value.length}/250`;
}

window.onload = function () {
    updateCharCount();
};

