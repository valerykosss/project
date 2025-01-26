export const validateForm = (form) => {
    let isValid = true;
    const errors = {};

    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
        input.classList.remove("input_error");
        const errorField = form.querySelector(`#error_${input.name}`);
        if (errorField) {
            errorField.textContent = "";
            errorField.classList.remove("show");
        }
    });

    const name = form.name.value.trim();
    if (!name) {
        isValid = false;
        errors.name = "Имя обязательно";
    }

    const email = form.email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        isValid = false;
        errors.email = "Неверный email";
    }

    const phone = form.phone.value.trim();
    if (!phone) {
        isValid = false;
        errors.phone = "Телефон обязателен";
    }

    const message = form.message.value.trim();
    if (!message) {
        isValid = false;
        errors.message = "Сообщение обязательно";
    }

    Object.keys(errors).forEach((key) => {
        const input = form.querySelector(`#${key}`);
        const errorElement = form.querySelector(`#error_${key}`);
        if (input) input.classList.add("input_error");
        if (errorElement) {
            errorElement.textContent = errors[key];
            errorElement.classList.add("show");
        }
    });

    return isValid;
};
