let removedToasts = [];

export function FuncCreateToast(type, title, message, autoRemove = true, lifeTime = 10000) {
    let validTypes = ["info", "success", "error", "warning"];
    if (validTypes.includes(type)) {
        let container = document.getElementById("toast_container");
        let newToast = document.createElement("div");
        let textDiv = document.createElement("div");
        let contentDiv = document.createElement("div");
        let titleElement = document.createElement("h4");
        let messageElement = document.createElement("p");
        let icon = document.createElement("i");
        titleElement.textContent = title;
        messageElement.textContent = message;
        if (type === "info") {
            newToast.className = "custom-toast s--white-backg";
            icon.className = "icon-info-sign icon-2x s--margin-r-8px s--align-c";
            contentDiv.className = "s--display-f s--fwrap-nw";
        };
        if (type === "success") {
            newToast.className = "custom-toast s--success-backg";
            icon.className = "icon-check-sign icon-2x s--margin-r-8px s--align-c";
            contentDiv.className = "s--display-f s--fwrap-nw";
        };
        if (type === "error") {
            newToast.className = "custom-toast s--error-backg";
            icon.className = "icon-remove-sign icon-2x s--margin-r-8px s--align-c";
            contentDiv.className = "s--display-f s--fwrap-nw";
        };
        if (type === "warning") {
            newToast.className = "custom-toast s--warning-backg";
            icon.className = "icon-warning-sign icon-2x s--margin-r-8px s--align-c";
            contentDiv.className = "s--display-f s--fwrap-nw";
        };
        textDiv.appendChild(titleElement);
        textDiv.appendChild(messageElement);
        contentDiv.appendChild(icon);
        contentDiv.appendChild(textDiv);
        newToast.appendChild(contentDiv);
        container.insertBefore(newToast, container.firstChild);
        newToast.onclick = () => RemoveToast(newToast);
        if (autoRemove) {
            setTimeout(() => {
                RemoveToast(newToast);
            }, lifeTime);
        };
    };
};

function RemoveToast(toast) {
    if (!removedToasts.includes(toast)) {
        removedToasts = [...removedToasts, toast];
        toast.style.animation = "removeToastAnimation 1s forwards";
        let height = toast.offsetHeight;
        const step = 5;
        const intervalId = setInterval(() => {
            height -= step;
            toast.style.height = `${height}px`;
            if (height <= 0) {
                clearInterval(intervalId);
                toast.remove();
            };
        }, 10);
    };
    let index = removedToasts.findIndex(e => e === toast);
    removedToasts.splice(index, index - 1);
};