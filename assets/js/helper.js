let x;
const toast = document.getElementById('toast');
function showToast(message) {
    toast.querySelector('.toast-body').innerHTML = message;
    toast.classList.add('visible');
    clearTimeout(x);
    x = setTimeout(() => {
        toast.classList.remove('visible');
    }, 4000);
}

async function copyContributeMDContent() {
    let copyText = document.getElementById("contributing");

    // Copy the text inside the text field
    await navigator.clipboard.writeText(copyText.textContent);
    // Alert the copied text
    alert("CONTRIBUTING.md markdown content copied");
}

async function copyCOCMDContent() {
    let copyText = document.getElementById("code_of_conduct");

    // Copy the text inside the text field
    await navigator.clipboard.writeText(copyText.textContent);

    // Alert the copied text
    alert("CODE_OF_CONDUCT.md markdown content copied");
}