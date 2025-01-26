export function initModal() {
    const modal = document.getElementById("modal");
    const openModal = document.getElementById("openModal");
    const closeModal = document.getElementById("closeModal");
    const body = document.querySelector("body");

    const getScrollbarWidth = () => {
        return window.innerWidth - document.documentElement.clientWidth;
    };

    if (openModal) {
        openModal.addEventListener("click", () => {
            const scrollbarWidth = getScrollbarWidth();
            body.style.paddingRight = `${scrollbarWidth}px`;
            modal.classList.remove("hidden");
            body.classList.add("lock");
            modal.style.opacity = 1;
            modal.style.visibility = "visible";
        });
    }

    if (closeModal) {
        closeModal.addEventListener("click", () => {
            modal.style.opacity = 0;
            modal.style.visibility = "hidden";

            setTimeout(() => {
                body.style.paddingRight = "0";
                modal.classList.add("hidden");
                body.classList.remove("lock");
            }, 300);
        });
    }
}