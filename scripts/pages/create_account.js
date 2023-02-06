import { FuncCreateToast } from '../components/toast.js';
import { FuncLoadContent } from '../utils.js';

document.addEventListener("input", event => {
    if (event.target.id === "create_account_form_email1") {
        event.target.className = "";
    };
    if (event.target.id === "create_account_form_email2") {
        event.target.className = "";
    };
    if (event.target.id === "create_account_form_name") {
        event.target.className = "";
    };
    if (event.target.id === "create_account_form_password1") {
        event.target.className = "";
    };
    if (event.target.id === "create_account_form_password2") {
        event.target.className = "";
    };
    if (event.target.id === "create_account_form_gender") {
        event.target.className = "";
    };
    if (event.target.id === "create_account_form_terms") {
        event.target.className = "";
    };
    if (event.target.id === "create_account_form_privacy") {
        event.target.className = "";
    };
});



export function FuncCreateAccountFormSubmited(event) {
    event.preventDefault();
    let elements = event.target.form.elements;
    const formData = {
        email1: elements.email1.value,
        email2: elements.email2.value,
        gender: elements.gender.value,
        name: elements.name.value,
        password1: elements.password1.value,
        password2: elements.password2.value,
        terms: elements.terms.checked,
        privacy: elements.privacy.checked,
        logged_in: false,
        // captcha_solution: elements.captcha_solution.defaultValue,
    };
    let validated = true;
    const reg = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$");
    let inputEmail1 = document.getElementById("create_account_form_email1");
    let inputEmail2 = document.getElementById("create_account_form_email2");
    let inputName = document.getElementById("create_account_form_name");
    let inputPassw1 = document.getElementById("create_account_form_password1");
    let inputPassw2 = document.getElementById("create_account_form_password2");
    let selectGender = document.getElementById("create_account_form_gender");
    let inputTerms = document.getElementById("create_account_form_terms");
    let inputPrivacy = document.getElementById("create_account_form_privacy");
    let errorMessage = "";
    if (!reg.test(formData.email1)) {
        inputEmail1.className = "is-invalid";
        validated = false;
        errorMessage = errorMessage + "Invalid email. ";
    } else {
        inputEmail1.className = "";
    };
    if (formData.email1 != formData.email2) {
        inputEmail2.className = "is-invalid";
        validated = false;
        errorMessage = errorMessage + "The two emails are not the same. ";
    } else {
        inputEmail2.className = "";
    };
    if (!["", "male", "female", "other"].includes(formData.gender)) {
        selectGender.className = "is-invalid";
        validated = false;
        errorMessage = errorMessage + "The gender value does not correspond to the options. ";
    } else {
        selectGender.className = "";
    };
    if (formData.name.length < 4 || formData.name.length > 20) {
        inputName.className = "is-invalid";
        validated = false;
        errorMessage = errorMessage + "The name must have 4 to 20 characters. ";
    } else {
        inputName.className = "";
    };
    if (formData.password1.length < 4 || formData.password1.length > 10) {
        inputPassw1.className = "is-invalid";
        validated = false;
        errorMessage = errorMessage + "The password must have 4 to 10 characters. ";
    } else {
        inputPassw1.className = "";
    };
    if (formData.password1 != formData.password2) {
        inputPassw2.className = "is-invalid";
        validated = false;
        errorMessage = errorMessage + "The two passwords are not the same. ";
    } else {
        inputPassw2.className = "";
    };
    if (!formData.terms) {
        inputTerms.className = "is-invalid";
        validated = false;
        errorMessage = errorMessage + "You have to accept the Terms and Conditions. ";
    } else {
        inputTerms.className = "";
    };
    if (!formData.privacy) {
        inputPrivacy.className = "is-invalid";
        validated = false;
        errorMessage = errorMessage + "You have to accept the Privacy Policies. ";
    } else {
        inputPrivacy.className = "";
    };
    if (validated) {
        let actualUsers = [];
        if (localStorage.getItem("users")) {
            actualUsers = JSON.parse(localStorage.getItem("users"));
            if (actualUsers.find(e => e.email1 === formData.email1)) {
                validated = false;
                inputEmail1.className = "is-invalid";
                FuncCreateToast("info", "Input error:", "The email entered is already registered.");
            } else {
                actualUsers = [...actualUsers, formData];
                localStorage.setItem("users", JSON.stringify(actualUsers));
                inputEmail1.className = "";
            };
        } else {
            actualUsers = [formData];
            localStorage.setItem("users", JSON.stringify(actualUsers));
        };
        if (validated) {
            inputEmail1.value = "";
            inputEmail2.value = "";
            inputName.value = "";
            inputPassw1.value = "";
            inputPassw2.value = "";
            selectGender.value = "";
            inputTerms.checked = false;
            inputPrivacy.checked = false;
            FuncCreateToast("success", "Message:", "User created successfully.");
            setTimeout(() => {
                FuncLoadContent("content_div", "/02_fake_store/pages/login.html").then(e => {
                    document.getElementsByTagName('header')[0].style.display = "none";
                    document.getElementsByTagName('footer')[0].style.display = "none";
                });
            }, 300);
        };
    } else {
        FuncCreateToast("warning", "Input error:", errorMessage);
    };
};