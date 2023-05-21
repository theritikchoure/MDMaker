
let x;
const toast = document.getElementById('toast');

window.onload = () => {

    if (localStorage.getItem("theme") === 'dark-theme') {
        themeToggle();
    }
}

function showToast(message, messageType) {
    let toastBody = toast.querySelector('.toast-body');
    toastBody.innerHTML = message;
    toastBody.classList.add(messageType);
    toast.classList.add('visible');
    clearTimeout(x);
    x = setTimeout(() => {
        toast.classList.remove('visible');
        toastBody.classList.remove(messageType);
        toastBody.innerHTML = '';
    }, 4000);
}

async function copyContributeMDContent() {
    let copyText = document.getElementById("contributing");

    // Copy the text inside the text field
    await navigator.clipboard.writeText(copyText.textContent);

    // Alert the copied text
    showToast("CONTRIBUTING.md markdown content copied", 'success'); 
}

async function copyCOCMDContent() {
    let copyText = document.getElementById("code_of_conduct");

    // Copy the text inside the text field
    await navigator.clipboard.writeText(copyText.textContent);

    // Alert the copied text
    showToast("CODE_OF_CONDUCT.md markdown content copied", 'success');
}

function themeToggle() {
    // Toggle the theme class on the root element
    // Get the toggle button element
    const toggleButton = document.getElementById("theme-toggle");
    const rootElement = document.documentElement; // Get the root HTML element

    rootElement.classList.toggle("dark-theme");
    rootElement.classList.toggle("light-theme");
    toggleButton.classList.toggle("fa-moon");
    toggleButton.classList.toggle("fa-sun");

    localStorage.setItem("theme", rootElement.className);
}