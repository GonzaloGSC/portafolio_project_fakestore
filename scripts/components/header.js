let show_menu = false;

function FuncNavMenuButton() {
    if (show_menu) {
        document.getElementById("hidden-nav").style.display = "none";
    } else {
        document.getElementById("hidden-nav").style.display = "flex";
    };
    show_menu = !show_menu;
};

function FuncCloseNavMenuButton() {
    if (show_menu) {
        document.getElementById("hidden-nav").style.display = "none";
        show_menu = !show_menu;
    };
};

document.addEventListener('click', event => {
    if (document.getElementById('nav_menu_button').contains(event.target)) {
        FuncNavMenuButton();
    } else {
        FuncCloseNavMenuButton();
    };
});