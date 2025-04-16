function openImage(element) {
    const image = element.querySelector('.section-img');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
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
                    'transform': 'perspective(1000px) translateY(' + yPos * 0.1 + 'px) rotateY(' + yPos * 0.02 + 'deg)'
                });

                section.find('.content-text').css({
                    'transform': 'translateY(' + yPos * 0.05 + 'px)'
                });
            }
        });
    });
});

// Arka plan değiştirme fonksiyonu
function changeBackground(imageUrl) {
    const bgElement = document.querySelector('.background-image');
    bgElement.style.backgroundImage = `url(${imageUrl})`;
}