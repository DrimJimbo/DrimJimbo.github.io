const btn = document.getElementById("navbutton");
const nav = document.getElementById("nav");
btn.addEventListener("click", () => {
    nav.classList.toggle("open");
});
