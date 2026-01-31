const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modal-img");
const closeBtn = document.querySelector(".close");
const images = document.querySelectorAll(".gallery-img");
const menuButton = document.getElementById("menu-button");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("hide");
});

/* Open modal */
images.forEach(img => {
    img.addEventListener("click", () => {
        modal.classList.remove("hide"); // Removes the display: none
        modalImg.src = img.src;
        modalImg.alt = img.alt;
    });
});

/* Close with X */
closeBtn.addEventListener("click", () => {
    modal.classList.add("hide");
});

/* Close by clicking outside the image */
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.add("hide");
    }
});