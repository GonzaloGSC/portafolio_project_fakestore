import { FuncHideSpinner, FuncShowSpinner } from './components/spinner.js';

export const FuncLoadContent = async (divId, url) => {
    let div = document.getElementById(divId);
    FuncShowSpinner("spinner_1");
    try {
        const response = await fetch(url);
        const html = await response.text();
        div.innerHTML = html;
        setTimeout(() => {
            FuncHideSpinner("spinner_1");
        }, 500);
    } catch (error) {
        console.error(error);
        FuncCreateToast("error", "Error:", error);
        setTimeout(() => {
            FuncHideSpinner("spinner_1");
        }, 500);
    }
    return true;
};