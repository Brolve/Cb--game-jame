// Geri sayım fonksiyonu
function updateCountdown() {
    const targetDate = new Date('2025-04-25T00:00:00').getTime();
    
    function update() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = '<h2 class="press-start-2p-regular">GAME JAM BAŞLADI!</h2>';
        }
    }

    update();
    const countdownInterval = setInterval(update, 1000);
}

// Sayfa yüklendiğinde geri sayımı başlat
document.addEventListener('DOMContentLoaded', updateCountdown);

function openImage(element) {
    const image = element.querySelector('.section-img');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    // Resim boyutlarını ayarla
    modalImg.style.maxWidth = '6000px';
    modalImg.style.width = 'auto';
    modalImg.style.height = 'auto';
    modalImg.style.maxHeight = '80vh';
    
    modalImg.src = image.src;
    modalImg.className = 'modal-img';
    
    $(modal).modal('show');
}

$(document).ready(function() {
    // Modal kapatma işlemi için
    $('.close').click(function() {
        $('#imageModal').modal('hide');
    });

    // Parallax efekti için
    $(window).scroll(function() {
        const scrolled = $(window).scrollTop();

        $('.parallax-section').each(function() {
            const section = $(this);
            const offset = section.offset().top;
            const height = section.height();

            if (scrolled > offset - window.innerHeight && scrolled < offset + height) {
                const speed = 0.5;
                const yPos = -(scrolled - offset) * speed;
                
                section.find('.content-image').css({
                    'transform': 'perspective(6000px) translateY(' + yPos * 0.1 + 'px) rotateY(' + yPos * 0.02 + 'deg)'
                });

                section.find('.content-text').css({
                    'transform': 'translateY(' + yPos * 0.05 + 'px)'
                });
            }
        });
    });
});

// Geri sayım fonksiyonu
function updateCountdown() {
    const targetDate = new Date('2025-04-25T00:00:00').getTime();
    
    function update() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = '<h2 class="press-start-2p-regular">GAME JAM BAŞLADI!</h2>';
        }
    }

    update();
    const countdownInterval = setInterval(update, 1000);
}

// Sayfa yüklendiğinde geri sayımı başlat
document.addEventListener('DOMContentLoaded', updateCountdown);

// Arka plan değiştirme fonksiyonu
function changeBackground(imageUrl) {
    const bgElement = document.querySelector('.background-image');
    bgElement.style.backgroundImage = `url(${imageUrl})`;
}