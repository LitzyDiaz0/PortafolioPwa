// js/script.js
document.querySelector('.menu-toggle').addEventListener('click', () => {
    const navLinks = document.querySelector('.nav ul');
    navLinks.classList.toggle('active');
});

//efecto de escritura
document.addEventListener("DOMContentLoaded", function () {
    const text = "Creadora de Desarrollo de Software Multiplataforma y Sitios webs";
    const typewriter = document.getElementById("typewriter");
    let index = 0;

    function typeEffect() {
        if (index < text.length) {
            typewriter.textContent += text.charAt(index);
            index++;
            setTimeout(typeEffect, 100); 
        } else {
            setTimeout(() => {
                typewriter.textContent = ""; 
                index = 0; 
                typeEffect(); 
            }, 3000); 
        }
    }

    typeEffect();
});
