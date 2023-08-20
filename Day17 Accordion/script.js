document.addEventListener('DOMContentLoaded', function () {
    const faqSections = document.querySelectorAll('.faq-section');

    faqSections.forEach(section => {
        const question = section.querySelector('.question');
        const answer = section.querySelector('.answer p');
        const plusSign = section.querySelector('.plus');

        question.addEventListener('click', () => {
            // Toggle the active class on the clicked section
            section.classList.toggle('active');

            // Toggle the plus/minus sign
            if (section.classList.contains('active')) {
                plusSign.textContent = '-';
                plusSign.classList.add('minus');
                
            } else {
                plusSign.textContent = '+';
                plusSign.classList.remove('minus');
            }

            // Toggle the visibility of the answer
            answer.classList.toggle('visible');
        });
    });
});
