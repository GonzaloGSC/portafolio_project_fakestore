let spinnersActivated = [];

export function FuncHideSpinner(spinnerId) {
    let spinner = document.getElementById(spinnerId);
    const index = spinnersActivated.findIndex(e => e === spinnerId);
    spinnersActivated = spinnersActivated.slice(index, index - 1);
    if (!spinnersActivated.includes(spinnerId)){
        spinner.style.opacity = 0;
        spinner.style.zIndex = -1000;
    };
};

export function FuncShowSpinner(spinnerId) {
    let spinner = document.getElementById(spinnerId);
    if (spinner) {
        spinner.style.opacity = 1;
        spinner.style.zIndex = 1000;
        spinnersActivated = [...spinnersActivated, spinnerId];
    };
};