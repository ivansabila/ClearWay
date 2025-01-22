const toast = document.querySelector("#toast");

console.log(toastMessage);

if (toastMessage) {
    toast.classList.remove("hidden");
    setTimeout(() => {
        toast.style.bottom = "0px";
        setTimeout(() => {
            toast.style.bottom = "-5rem";
            setTimeout(() => toast.remove(), 2000);
        }, 3000);
    }, 500);
}
