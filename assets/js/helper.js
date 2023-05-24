
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
    if(!formSubmitted) {
        showToast("First fill the form and generate file content", 'error');
        return;
    }

    let msg = contributingFileHtmlContent(options);

    // Copy the text inside the text field
    await navigator.clipboard.writeText(msg);

    // Alert the copied text
    showToast("CONTRIBUTING.md markdown content copied", 'success'); 
}

async function copyCOCMDContent() {
    if(!formSubmitted) {
        showToast("First fill the form and generate file content", 'error');
        return;
    }
    let msg = codeOfConductFileHtmlContent(options);

    // Copy the text inside the text field
    await navigator.clipboard.writeText(msg);

    // Alert the copied text
    showToast("CODE_OF_CONDUCT.md markdown content copied", 'success');
}

async function downloadContributeMDContent() {
    if(!formSubmitted) {
        showToast("First fill the form and generate file content", 'error');
        return;
    }
    let msg = contributingFileHtmlContent(options);
    let dataStr = "data:text/text;charset=utf-8," + encodeURIComponent(msg);
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "CONTRIBUTING.md");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    showToast("CONTRIBUTING.md file successfully downloaded", 'success');
    return;
}

async function downloadCOCMDContent() {
    if(!formSubmitted) {
        showToast("First fill the form and generate file content", 'error');
        return;
    }
    let msg = codeOfConductFileHtmlContent(options);
    let dataStr = "data:text/text;charset=utf-8," + encodeURIComponent(msg);
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "CODE_OF_CONDUCT.md");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    showToast("CODE_OF_CONDUCT.md file successfully downloaded", 'success');
    return;
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