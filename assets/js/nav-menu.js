// menuDisplayControl();

/* ---------------------------------------------------- */
/* 2. Mobile Navigation Toggle (Assuming a Burger Menu)  */
/* ---------------------------------------------------- */
// function menuDisplayControl() {



const menuToggleButton = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu-list');
const header = document.querySelector('.main-header');
const navbar = document.querySelector('.nav-bar');
const withDropdowns = document.querySelectorAll('.has-dropdown');
const dropdownsToDisplay = document.querySelectorAll('.dropdown-menu');



if (menuToggleButton && navMenu) {
    menuToggleButton.addEventListener('click', function (event) {
        /*Toggle the 'active' class on the on the menu list*/
        navMenu.classList.toggle('active');

        /*Toggle the 'active' class on the button it'self (for css Icon swap)*/
        menuToggleButton.classList.toggle('active');


        /*Update the ARIA attribute For Accessibility*/
        const isExpanded = navMenu.classList.contains('active');

        menuToggleButton.setAttribute('aria-expanded', isExpanded);

        /*To Prevent background scrolling when menu is open*/
        document.body.classList.toggle('no-scroll', isExpanded);
        console.log(event.key);
        /*Stop Click event from propagating to the body listener*/
        event.stopPropagation();
    });

    /*Close menu if if anypoint in the body is licked*/
    document.body.addEventListener('click', function (event) {
        const isMenuOpen = navMenu.classList.contains('active');
        const clickedInsideMenu = navMenu.contains(event.target);
        const clickedOnMenuToggleButton = menuToggleButton.contains(event.target);
        if (isMenuOpen && !clickedInsideMenu && !clickedOnMenuToggleButton) {
            navMenu.classList.remove('active');
            menuToggleButton.classList.remove('active');
            menuToggleButton.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('no-scroll');
        }
    });

    /*Close menu if link is clicked*/
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function (event) {
            const clickedNavLinkInDropdown = navbar.contains(event.target);
            const clickedDropdownLink = withDropdowns.contains(event.target);
            if (navMenu.classList.contains('active') && !clickedDropdownLink || clickedNavLinkInDropdown) {
                navMenu.classList.remove('active');
                menuToggleButton.classList.remove('active');
                menuToggleButton.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('no-scroll');
            }
        });
    });
}



withDropdowns.forEach(hasDropdown => {
    hasDropdown.addEventListener('click', function (event) {
        event.preventDefault();
        dropdownsToDisplay.forEach(dropdown => {
            if (dropdown !== this.nextElementSibling) {
                dropdown.classList.remove('active');
            }
        });
        // The "this" refers to the clicked has-dropdown element and nextElementSibling is the associated dropdown menu because within HTML the next HTML element after the <a> (of class has-dropdown) is the <ul> (of class dropdown-menu)
        // therefore the code below means add class "active" to the to an already  existing list of classes in this case dropdown-menu so the it becomes [class = "dropdown-menu active"] 
        this.nextElementSibling.classList.toggle('active');
    });
    document.addEventListener('click', function (event) {
        if (!navbar.contains(event.target)) {
            dropdownsToDisplay.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});



// // --- Dropdown Interaction (Click based) ---
// withDropdowns.forEach(hasDropdown => {
//     hasDropdown.addEventListener('hover', function (e) {
//         e.preventDefault(); // Prevents jump to top of page
//         const parentItem = this.parentElement;
//         // Optional: Close other open dropdowns when opening a new one for cleaner UI
//         document.querySelectorAll('.nav-item.active').forEach(activeItem => {
//             if (activeItem !== parentItem) {
//                 activeItem.classList.remove('active');
//             }
//         });

//         // Toggle the clicked item
//         parentItem.classList.toggle('active');
//     });
// });

