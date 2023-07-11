console.log(connected);
function toggleMenu() {
   const menu = document.getElementById("menu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
  
    const menuIcon = document.querySelector('.menu-icon');
     menu = document.getElementById('menu');
  
    // Toggle the class to change the icon to a close button
    menuIcon.classList.toggle('');
  
    // Toggle the menu visibility
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  }
  
  