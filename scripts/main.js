import { FuncCreateAccountFormSubmited } from './pages/create_account.js';
import { FuncLogin, FuncGetUserLoggedIn } from './pages/login.js';
import { FuncCreateToast } from './components/toast.js';
import { FuncLoadContent } from './utils.js';

let user = {};

$(document).ready(function () {
    FuncLoadContent("spinner_content", "/02_fake_store/pages/components/spinner.html");
    FuncLoadContent("toast_content", "/02_fake_store/pages/components/toast.html");
    setTimeout(() => {
        FuncLoadContent("modals_content", "/02_fake_store/pages/components/modals.html");
        FuncLoadContent("header_content_div", "/02_fake_store/pages/components/header.html");
        FuncLoadContent("footer_content_div", "/02_fake_store/pages/components/footer.html");
        FuncLoadContent("content_div", "/02_fake_store/pages/home.html");
    }, 100);
    setInterval(() => {
        user = FuncGetUserLoggedIn();
    }, 1000);
});

document.addEventListener("click", event => {
    let target = event.target;
    if (target.localName === "button") {
        document.activeElement.blur();
    };
    if (target.id === "create_account_form_button") {
        FuncCreateAccountFormSubmited(event);
    };
    if (target.id === "login_form_button") {
        FuncLogin(event);
    };
    if (target.id === "login_delete_button") {
        localStorage.clear();
        FuncCreateToast("info", "Message:", "Localstorage cleaned up.");
    };
    if (target.name?.includes("_html")) {
        event.preventDefault();
        FuncLoadContent("content_div", `/02_fake_store/pages/${target.name.replace(/_html/g, ".html")}`)
            .then(e => {
                // if (target.name === "create_account_html") {
                // document.getElementById('script_1')?.remove();
                // document.getElementById('script_2')?.remove();
                // let script1 = document.createElement('script');
                // let script2 = document.createElement('script');
                // script1.src = 'https://unpkg.com/friendly-challenge@0.9.10/widget.module.min.js';
                // script1.type = 'text/javascript';
                // script2.src = 'https://unpkg.com/friendly-challenge@0.9.10/widget.min.js';
                // script2.type = 'text/javascript';
                // script1.async = true;
                // script1.defer = true;
                // script2.async = true;
                // script2.defer = true;
                // script1.id = "script_1";
                // script2.id = "script_2";
                // document.getElementsByTagName('head')[0].appendChild(script1);
                // document.getElementsByTagName('head')[0].appendChild(script2);
                // };

                if (target.name === "login_html") {
                    document.getElementsByTagName('header')[0].style.display = "none";
                    document.getElementsByTagName('footer')[0].style.display = "none";
                } else {
                    document.getElementsByTagName('header')[0].style.display = "flex";
                    document.getElementsByTagName('footer')[0].style.display = "flex";
                };

            })
    };
});

// CAPTCHA SOURCE: https://docs.friendlycaptcha.com