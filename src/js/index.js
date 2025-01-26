import { validateForm } from "./modules/formValidation";
import Inputmask from "inputmask";
import '../styles/main.scss';
import { sendFormData } from "./modules/ajaxMock";
import { initModal } from './modules/modal'; 


if (typeof window._isFormInitialized === 'undefined') {
    window._isFormInitialized = true;
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#feedbackForm");
    const phoneInput = document.querySelector("#phone");


    if (phoneInput) {
        const phoneMask = new Inputmask("+375 (99) 999-99-99");
        phoneMask.mask(phoneInput);
    }

    initModal();


    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const isValid = validateForm(form);

        if (isValid) {
            const formData = {
                name: form.name.value,
                email: form.email.value,
                phone: form.phone.value,
                message: form.message.value
            };

            try {
                const response = await sendFormData(formData);

                if (response.status === "success") {
                    alert(response.msg);

                    form.reset();
                    hideErrors(form);
                } else {
                    handleServerErrors(form, response.fields);
                }
            } catch (error) {
                console.error("Ошибка отправки формы", error);
            }
        } else {
            console.log("Форма содержит ошибки");
        }
    });
});
}

function hideErrors(form) {
    const errorMessages = form.querySelectorAll('.form__error-message');
    errorMessages.forEach(message => {
        message.classList.remove('show');
    });

    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach(input => {
        input.classList.remove('input_error');
    });
}

function handleServerErrors(form, fields) {
    Object.keys(fields).forEach((key) => {
        const input = form.querySelector(`#${key}`);
        const errorElement = form.querySelector(`#error_${key}`);
        if (input) input.classList.add("input_error");
        if (errorElement) {
            errorElement.textContent = fields[key];
            errorElement.classList.add("show");
        }
    });
}
