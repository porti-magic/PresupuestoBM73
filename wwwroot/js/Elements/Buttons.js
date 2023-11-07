window.addEventListener('load', function () {

    //Set Up Accordions' "Toggle All" Buttons
    const AccordionToggleAllButtons = document.querySelectorAll('.accordion-toggle-all');
    AccordionToggleAllButtons.forEach((button) => {
        SetUpAccordionToggleAllButtons(button);
    });
});

//Accordions' 'Toggle All' buttons
function ToggleAccordinItem(item, isExpanded) {
    const button = item.querySelector('.accordion-button');
    button.setAttribute('aria-expanded', !isExpanded);
    button.classList.toggle("collapsed", isExpanded)
    item.querySelector('.accordion-collapse').classList.toggle('show', !isExpanded);
}
function SetUpAccordionToggleAllButtons(button) {
    const accordionID = button.getAttribute("data-bs-target");
    const accordionItems = document.querySelectorAll(`.accordion-item[data-bs-parent="${accordionID}"]`);

    button.textContent = button.getAttribute('aria-expanded') === 'false' ? 'Mostrar Todo' : 'Cerrar todo';
    button.addEventListener('click', () => {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        accordionItems.forEach((item) => {
            ToggleAccordinItem(item, isExpanded);
        });

        button.setAttribute('aria-expanded', !isExpanded);
        button.textContent = isExpanded ? 'Mostrar Todo' : 'Cerrar todo';
    });

}