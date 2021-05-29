function showLoader() {
    document.querySelector('.loader-overlay').classList.add('d-block')
}

function hideLoader() {
    document.querySelector('.loader-overlay').classList.remove('d-block')
}

function toggleLoader() {
    document.querySelector('.loader-overlay').classList.toggle('d-block')
}