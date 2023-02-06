import { FuncCreateToast } from '../components/toast.js';
import { FuncLoadContent } from '../utils.js';

document.addEventListener("input", event => {
    if (event.target.id === "login_form_email") {
        event.target.className = "";
    };
    if (event.target.id === "login_form_password") {
        event.target.className = "";
    };
});

export function FuncClearLoggedinUsers(usersArray) {
    return usersArray.map(e => {
        e.logged_in = false;
        return e;
    });
};

export function FuncGetUserLoggedIn() {
    let actualUsers = [];
    let user = {};
    if (localStorage.getItem("users")) {
        actualUsers = JSON.parse(localStorage.getItem("users"));
        let index = actualUsers.findIndex(e => e.logged_in === true);
        if (index == -1) {
            actualUsers = FuncClearLoggedinUsers(actualUsers);
            localStorage.setItem("users", JSON.stringify(actualUsers));
            document.getElementById('logged_in_div').style.display = "none";
            document.getElementById('no_logged_in_div').style.display = "flex";
        } else {
            user = actualUsers[index];
            document.getElementById('logged_in_div').style.display = "flex";
            document.getElementById('no_logged_in_div').style.display = "none";
            document.getElementById('p_welcome_to_user').textContent = `Welcome ${user.gender == 'male' ? "Mr." : user.gender == 'female' ? "Ms." : ""} ${user.name}`;
        };
    } else {
        document.getElementById('logged_in_div').style.display = "none";
        document.getElementById('no_logged_in_div').style.display = "flex";
    }
    return user;
}

export function FuncLogin(event) {
    event.preventDefault();
    const formData = {
        "password": event.target.form.elements.password.value,
        "email": event.target.form.elements.email.value,
    };
    const reg = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$");
    let validated = true;
    let errorMessage = "";
    let inputEmail = document.getElementById("login_form_email");
    let inputPassw = document.getElementById("login_form_password");
    if (!reg.test(formData.email)) {
        inputEmail.className = "is-invalid";
        validated = false;
        errorMessage = errorMessage + "Invalid email. ";
    } else {
        inputEmail.className = "";
    };
    if (validated) {
        let actualUsers = [];
        if (localStorage.getItem("users")) {
            actualUsers = JSON.parse(localStorage.getItem("users"));
            let index = actualUsers.findIndex(e => e.email1 === formData.email && e.password1 === formData.password);
            if (index == -1) {
                inputEmail.className = "is-invalid";
                inputPassw.className = "is-invalid";
                FuncCreateToast("warning", "Error:", "The email and password combination is invalid.");
            } else {
                actualUsers = FuncClearLoggedinUsers(actualUsers);
                actualUsers[index].logged_in = true;
                localStorage.setItem("users", JSON.stringify(actualUsers));
                inputEmail.value = "";
                inputPassw.value = "";
                inputEmail.className = "";
                inputPassw.className = "";
                FuncCreateToast("success", "Message:", "Successful login. Welcome.");
                setTimeout(() => {
                    FuncLoadContent("content_div", "/02_fake_store/pages/all.html").then(e => {
                        document.getElementsByTagName('header')[0].style.display = "flex";
                        document.getElementsByTagName('footer')[0].style.display = "flex";
                    });
                }, 300);
            };
        } else {
            FuncCreateToast("warning", "Error:", "The email and password combination is invalid.");
            inputEmail.className = "is-invalid";
            inputPassw.className = "is-invalid";
        };
    } else {
        FuncCreateToast("warning", "Input error:", errorMessage);
    };
}