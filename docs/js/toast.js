function showToast(message, type = "success") {

    const oldToast = document.querySelector(".toast");

    if (oldToast) {
        oldToast.remove();
    }

    const toast = document.createElement("div");

    toast.className = `toast toast-${type}`;

    toast.innerHTML = message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.style.opacity = "0";

        toast.style.transition = "0.3s";

        setTimeout(() => {
            toast.remove();
        }, 300);

    }, 2500);
}