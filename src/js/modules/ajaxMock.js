export function sendFormData(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (data.name && data.email && data.phone && data.message) {
                resolve({ status: "success", msg: "Ваша заявка успешно отправлена" });
            } else {
                resolve({
                    status: "error",
                    fields: {
                        name: "Имя обязательно",
                        email: "Неверный email",
                        phone: "Телефон обязателен",
                    },
                });
            }
        }, 1000);
    });
}
