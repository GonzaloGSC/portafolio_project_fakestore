let modalsActivated = [];

function FuncCloseModal(modalId) {
    let modal = document.getElementById(modalId);
    modal.style.display = "none";
    modalsActivated.pop();
    if (modalsActivated.length == 0) {
        document.body.style.overflow = "auto";
    };
};

function FuncOpenModal(modalId) {
    let modal = document.getElementById(modalId);
    modal.style.display = "flex";
    modalsActivated = [...modalsActivated, "modal"];
    document.body.style.overflow = "hidden";
};
