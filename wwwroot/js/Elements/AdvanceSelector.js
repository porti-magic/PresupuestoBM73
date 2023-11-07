export function SetUp(selectorContainer, optionSelected ="") {
    let selector = NewAdvancedSelector(selectorContainer);
    selector.ToggleBtn.onclick = function () { SwitchInputMethod(selector) };
    selector.DropdownSelector.onclick = function () { AsignSelectorValue(selector); }

    for (var options of selector.DropdownSelector.getElementsByTagName("option")) {
        if (options.value == optionSelected) {
            options.setAttribute("selected", "");
        }
        else {
            options.removeAttribute("selected");
        }

    }

    AsignSelectorValue(selector);
}

window.addEventListener('load', function () {
    const AdvanceselectorContainers = document.getElementsByClassName('AdvanceSelector-container');

    for (let selectorContainer of AdvanceselectorContainers) {
        SetUp(selectorContainer);
    }
});


function SwitchInputMethod(selector)
{
    if (selector.ToggleBtn.checked) {
        selector.CustomInput.removeAttribute("hidden");
        selector.DropdownSelector.setAttribute("hidden", "");
    }
    else {
        selector.CustomInput.setAttribute("hidden", "");
        selector.DropdownSelector.removeAttribute("hidden");
        AsignSelectorValue(selector);
    }
}

function AsignSelectorValue(selector)
{
    selector.CustomInput.value = selector.DropdownSelector.value;
}

export function NewAdvancedSelector(AdvanceselectorContainer)
{
    let AdvanceSelector = {};

    AdvanceSelector.ToggleBtn = AdvanceselectorContainer.getElementsByClassName("CustomInputToggle")[0];
    AdvanceSelector.CustomInput = AdvanceselectorContainer.getElementsByClassName("AdvanceSelector-customInput")[0];
    AdvanceSelector.DropdownSelector = AdvanceselectorContainer.getElementsByClassName("AdvanceSelector-selector")[0];

    return AdvanceSelector;
}