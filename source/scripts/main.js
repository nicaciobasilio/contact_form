const buttons = document.querySelectorAll('.form__content__buttons__button');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const sendButton = document.querySelector('.form__content__send');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        button.classList.toggle('form__content__buttons__button--activated');
        validateForm();
    });
});

nameInput.addEventListener('input', validateForm);
emailInput.addEventListener('input', validateForm);
messageInput.addEventListener('input', validateForm);

function validateForm() {
    const isNameValid = validateName(nameInput.value.trim());
    const isEmailValid = validateEmail(emailInput.value.trim());
    const isMessageValid = validateMessage(messageInput.value.trim());
    const isButtonSelected = isAnyButtonSelected();

    if (isNameValid && isEmailValid && isMessageValid && isButtonSelected) {
        sendButton.classList.add('form__content__send--activated');
        sendButton.disabled = false;
    } else {
        sendButton.classList.remove('form__content__send--activated');
        sendButton.disabled = true;
    }
}

function isAnyButtonSelected() {
    return Array.from(buttons).some((button) => button.classList.contains('form__content__buttons__button--activated'));
}

function validateName(name) {
    const nameWords = name.split(' ');
    return nameWords.length >= 2;
}

function validateEmail(email) {
    return email.includes('@') && email.includes('.');
}

function validateMessage(message) {
    return message.length >= 20;
}

sendButton.addEventListener('click', (event) => {
    event.preventDefault();

    const selectedButtonContents = getSelectedButtonContents();
    const inputContents = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim()
    };

    const formData = {
        selectedButtonContents: selectedButtonContents,
        inputContents: inputContents
    };

    console.log('Objeto gerado:', formData);

    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
    buttons.forEach((button) => {
        button.classList.remove('form__content__buttons__button--activated');
    });

    sendButton.classList.remove('form__content__send--activated');
    sendButton.disabled = true;
});

function getSelectedButtonContents() {
    const selectedButtonContents = [];

    buttons.forEach((button) => {
        if (button.classList.contains('form__content__buttons__button--activated')) {
            selectedButtonContents.push(button.textContent);
        }
    });

    return selectedButtonContents;
}