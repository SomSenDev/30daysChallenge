const toggle = document.querySelector('.toggle');

const a = document.getElementsByTagName('a');

toggle.addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('active');
    for (var i = 0; i < a.length; i++) {
        a[i].classList.toggle('active');
    }
    document.querySelector('.content').classList.toggle('active');

});