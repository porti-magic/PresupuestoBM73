export function filter(ID, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id == ID) {
            return array[i];
        }
    }
    return [];
}

export function Validate(Element) {
    if (Number(Element.value) < Number(Element.min)) {
        alert(`El sevicio minimo es para ${Element.min} ${Element.name}`);
        Element.value = Element.min;
    }
    else if (Number(Element.value) > Number(Element.max)) {
        alert(`El servico maximo es para ${Element.max} ${Element.name}`);
        Element.value = Element.max;
    }
}
export function ValidateRegex(Element, regex) {
    if (Element.required && !Element.value) {
        alert(`El campo ${Element.name} es requerido`);
    }
    else if (!regex.test(Element.value) && Element.value) {
        alert(`El ${Element.name} no es valido`);
    }
}

export function VerifyAllMandatoriesField(Elements) {
    let incompleted = [];
    for (element in Elements) {
        if (element.required && !element.value) {
            incompleted.push(element);
        }
    }
    alert('');
}