// Get references to the modal and buttons
const modal = document.querySelector('.modal');
const openModalButton = document.querySelector('.btnOpen-modal');
const closeModalButton = document.querySelector('.close-modal');
const btnClose = document.querySelector('.close');

// Function to open the modal
function openModal() {
  modal.style.visibility = 'visible';
}

// Function to close the modal
function closeModal() {
  modal.style.visibility = 'hidden';

}

// Function to close the modal when clicking on the close button

btnClose.addEventListener('click', closeModal);

// Event listener to open the modal when the "Modal" button is clicked
openModalButton.addEventListener('click', openModal);

// Event listener to close the modal when the close button inside the modal is clicked
closeModalButton.addEventListener('click', closeModal);




document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});

