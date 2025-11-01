const button = document.querySelector('#header-button-area button');
const burgerMenu = document.querySelector('#burger-menu');

button.addEventListener('click', () => {
    if (burgerMenu.className === "burger-menu-hidden") {
        burgerMenu.className = "burger-menu-show";
    } else {
        burgerMenu.className = "burger-menu-hidden";
    }
})