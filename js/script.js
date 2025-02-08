//  MENU

 // Toggle navigation and switch between hamburger/close icons
 const hamburger = document.querySelector('.hamburger');
 const nav = document.querySelector('nav');
 const icon = hamburger.querySelector('i'); // Get the <i> inside the button
 
 hamburger.addEventListener('click', () => {
     nav.classList.toggle('show');  // Toggle 'show' class to display/hide the menu
     hamburger.classList.toggle('close-icon');  // Toggle class to switch icon
     if (nav.classList.contains('show')) {
         icon.classList.remove('fa-bars');  // Change to close icon
         icon.classList.add('fa-times');
     } else {
         icon.classList.remove('fa-times');  // Change back to hamburger icon
         icon.classList.add('fa-bars'); 
     }
 });







//  TOP

// Show back-to-top button
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});




 
        // PRELOADER
        
        const loader = document.getElementById('loader');
        window.addEventListener('load', () => {
            loader.classList.add('hidden');
        });





        // VIEW GRID - VIEW LIST

        document.addEventListener('DOMContentLoaded', function () {
            const gridViewBtn = document.getElementById('grid-view');
            const listViewBtn = document.getElementById('list-view');
            const projectsGrid = document.getElementById('projects-grid');
            
            gridViewBtn.addEventListener('click', function () {
                projectsGrid.classList.remove('projects-list');
                projectsGrid.classList.add('projects-grid');
                gridViewBtn.classList.add('active');
                listViewBtn.classList.remove('active');
            });
        
            listViewBtn.addEventListener('click', function () {
                projectsGrid.classList.remove('projects-grid');
                projectsGrid.classList.add('projects-list');
                listViewBtn.classList.add('active');
                gridViewBtn.classList.remove('active');
            });
        });









        // TYPEWRITER
  const phrases = ['Hi, I hope you are well.', 'My name is Arnold.', 'Welcome to my web portfolio.'];
  const typewriterElement = document.querySelector('.typewriter .text');
  let phraseIndex = 0;
  let letterIndex = 0;
  let typingSpeed = 120;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    typewriterElement.innerHTML = currentPhrase;
    typewriterElement.style.opacity = '1'; // Ensure text is visible
    let currentLetterIndex = 0;

    function type() {
      if (currentLetterIndex < currentPhrase.length) {
        typewriterElement.innerHTML = currentPhrase.substring(0, currentLetterIndex + 1);
        currentLetterIndex++;
        setTimeout(type, typingSpeed);
      } else {
        // Pause before fading out
        // setTimeout(fadeOutEffect, 1000);  infinite
        
        // stop
      // Pause before proceeding to the next phrase or stopping
      setTimeout(() => {
        phraseIndex++;
        if (phraseIndex < phrases.length) {
          typeEffect();
        }
      }, 1000);
    }
  }

  type();
}

  function fadeOutEffect() {
    typewriterElement.style.transition = 'opacity 1s ease';
    typewriterElement.style.opacity = '0'; // Fade out text

    setTimeout(() => {
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typewriterElement.style.transition = 'none'; // Disable transition for instant update
      typeEffect(); // Start typing new phrase
    }, 1000); // Match this duration with fade-out duration
  }

  // Start the typing animation
  typeEffect();


// Create dynamic floating shapes
function createFloatingShapes() {
    const shapes = document.querySelector('.floating-shapes');
    for(let i = 0; i < 5; i++) {
        const shape = document.createElement('div');
        shape.className = 'shape';
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.width = `${50 + Math.random() * 100}px`;
        shape.style.height = shape.style.width;
        shape.style.animationDelay = `${Math.random() * 20}s`;
        shapes.appendChild(shape);
    }
}

// Optional: Mouse movement parallax effect
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    shapes.forEach(shape => {
        const shapeX = (mouseX - 0.5) * 20;
        const shapeY = (mouseY - 0.5) * 20;
        shape.style.transform = `translate(${shapeX}px, ${shapeY}px)`;
    });
});

createFloatingShapes();




   // GET THE MODAL

   var modal = document.getElementById("certificate-modal");
    
   // Get the image and insert it inside the modal
   var img = document.querySelector(".certificate-thumbnail");
   var modalImg = document.getElementById("certificate-image");
   var captionText = document.getElementById("caption");

   img.onclick = function(){ 
       modal.style.display = "flex";
       modalImg.src = this.src;
       // captionText.innerHTML = this.alt;
   }

   // Get the <span> element that closes the modal
   var span = document.getElementsByClassName("close")[0];

   // When the user clicks on <span> (x), close the modal
   span.onclick = function() { 
       modal.style.display = "none";
   }
