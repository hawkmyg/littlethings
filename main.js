// Image modal functionality (keep as-is if you want to use modals elsewhere)
document.addEventListener('DOMContentLoaded', function () {
  // Modal code if needed (not affecting carousel)
  const modal = document.getElementById('img-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  const closeBtn = document.querySelector('.close-modal');

  if (modal && modalImg && modalCaption && closeBtn) {
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
  }

  // --- Carousel logic ---
  const carouselTrack = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let productImages = [];
  let currentIndex = 0;
  let autoSlideInterval;

  function showImage(index) {
    if (!productImages.length) return;
    carouselTrack.innerHTML = '';
    const img = document.createElement('img');
    img.src = productImages[index];
    img.alt = `Product ${index + 1}`;
    img.className = 'carousel-img';
    carouselTrack.appendChild(img);
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % productImages.length;
      showImage(currentIndex);
    }, 8000); // 3 seconds
  }

  function stopAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
  }

  prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    currentIndex = (currentIndex - 1 + productImages.length) % productImages.length;
    showImage(currentIndex);
    startAutoSlide();
  });

  nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    currentIndex = (currentIndex + 1) % productImages.length;
    showImage(currentIndex);
    startAutoSlide();
  });

  // Fetch the image list from product-images.json
  fetch('images/product-images.json')
    .then(resp => resp.json())
    .then(images => {
      productImages = images;
      if (productImages.length > 0) {
        showImage(currentIndex);
        startAutoSlide();
      }
    });
});