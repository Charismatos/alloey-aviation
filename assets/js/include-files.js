
/* ---------------------------------------------------- */
/* 1. Importing Header And Footer Pages To Other HTML Files  */
/* ---------------------------------------------------- */
const headerBar = document.querySelector('.header-bar');
const footerBar = document.querySelector('.footer-bar');

fetch('/includes/header.html')
    .then(res => res.text())
    .then(data => {
        headerBar.innerHTML = data

        menuDisplayControl();
    })
fetch('/includes/footer.html')
    .then(res => res.text())
    .then(data => {
        footerBar.innerHTML = data
    })