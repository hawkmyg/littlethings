// Image modal functionality
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('img-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  const closeBtn = document.querySelector('.close-modal');

  document.querySelectorAll('.zoom-img').forEach(img => {
    img.addEventListener('click', function () {
      modal.classList.add('active');
      modalImg.src = this.src;
      modalCaption.textContent = this.alt;
    });
  });

  closeBtn.addEventListener('click', function () {
    modal.classList.remove('active');
    modalImg.src = '';
    modalCaption.textContent = '';
  });

  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.classList.remove('active');
      modalImg.src = '';
      modalCaption.textContent = '';
    }
  });

  // Prevent modal from closing when clicking the image or caption
  modalImg.addEventListener('click', function(e){
    e.stopPropagation();
  });
  modalCaption.addEventListener('click', function(e){
    e.stopPropagation();
  });
});