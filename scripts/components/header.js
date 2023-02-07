let showMenu = false;
let showUserMenu = false;

function FuncNavMenuButton() {
    if (showMenu) {
        document.getElementById("hidden-nav").style.display = "none";
    } else {
        document.getElementById("hidden-nav").style.display = "flex";
    };
    showMenu = !showMenu;
};

function FuncCloseNavMenuButton() {
    if (showMenu) {
        document.getElementById("hidden-nav").style.display = "none";
        showMenu = !showMenu;
    };
};

function FuncNavUserMenuButton() {
    if (showUserMenu) {
        document.getElementById("hidden_nav_user").style.display = "none";
    } else {
        document.getElementById("hidden_nav_user").style.display = "flex";
    };
    showUserMenu = !showUserMenu;
};

function FuncCloseNavUserMenuButton() {
    if (showUserMenu) {
        document.getElementById("hidden_nav_user").style.display = "none";
        showUserMenu = !showUserMenu;
    };
};

document.addEventListener('click', event => {
    if (document.getElementById('nav_menu_button').contains(event.target)) {
        FuncNavMenuButton();
    } else {
        FuncCloseNavMenuButton();
    };
    if (document.getElementById('nav_user_menu_button').contains(event.target)) {
        FuncNavUserMenuButton();
    } else {
        FuncCloseNavUserMenuButton();
    };
});