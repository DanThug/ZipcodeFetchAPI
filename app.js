const buttonFetch = document.querySelector('#buttonFetch');
const inputZipCode = document.querySelector('#inputZipCode');
const errorAlert = document.querySelector('[data-js="error-message"]');

const zipCodeValidation = zipCode => {
    const isEmpty = zipCode === '';
    
    if (isEmpty) {
        return;
    }

    logZipCode(zipCode);
}

const getZipCode = async zipCode => {
    try {
        const zipCodeUrlRequest = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
        return await zipCodeUrlRequest.json();
    } catch (error) {
        const errorMessage = 'Ocorreu um erro ao consultar o CEP informado!';

        errorAlert.classList.remove('d-none');
        errorAlert.textContent = errorMessage;
        throw new Error(errorMessage);
    }
}

const logZipCode = async zipCode => {
    const address = await getZipCode(zipCode);
    setAddress(address);
}

const setAddress = address => {
    document.querySelector('#logradouro').value = address.logradouro;
    document.querySelector('#bairro').value = address.bairro;
    document.querySelector('#cidade').value = address.localidade;
    document.querySelector('#estado').value = address.uf;

    resetInputZipCode();
}

const resetInputZipCode = () => {
    inputZipCode.value = '';
    inputZipCode.focus();
}

const setZipCodeMaxLengthAttribute = target => {
    const isAboveEight = target.maxLength >= Number(target.maxLength);

    if (isAboveEight) {
        target.value = target.value.slice(0, target.maxLength);
    }
}

const getOnlyNumbers = ({ value }) => value.replace(/[^0-9]/, '');

buttonFetch.addEventListener('click', () => {
    zipCodeValidation(inputZipCode.value);
});

inputZipCode.addEventListener('input', ({ target }) => {
    target.value = getOnlyNumbers(target);
    setZipCodeMaxLengthAttribute(target);
})