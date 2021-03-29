export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject, 
        ...updatedProperties
    }
}

export const checkValidationHandler = (eventValue, validation) => {
    let isValid = true;

    if (validation.required) {
        isValid = eventValue.trim() !== "" && isValid;
    }

    if (validation.minLength) {
        isValid = eventValue.length >= validation.minLength && isValid;
    }

    if (validation.maxLength) {
        isValid = eventValue.length <= validation.maxLength && isValid;
    }

    if (validation.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(eventValue) && isValid
    }

    if (validation.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(eventValue) && isValid
    }

    return isValid;
}