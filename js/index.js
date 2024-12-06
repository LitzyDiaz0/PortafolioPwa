// js/script.js
document.querySelector('.menu-toggle').addEventListener('click', () => {
    const navLinks = document.querySelector('.nav ul');
    navLinks.classList.toggle('active');
});
