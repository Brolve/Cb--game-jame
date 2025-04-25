function openImage(element) {
    try {
        const image = element.querySelector('.section-img');
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const modalCloseBtn = modal.querySelector('.close');
        
        if (!image || !modal || !modalImg) {
            console.error('Gerekli elementler bulunamadı');
            return;
        }

        // Resmi yükle ve boyutlarını al
        const tempImg = new Image();
        tempImg.onerror = function() {
            console.error('Resim yüklenemedi');
        };
        
        tempImg.onload = function() {
            const imgWidth = this.width;
            const imgHeight = this.height;
            
            // Ekran boyutlarını al
            const windowWidth = window.innerWidth * 0.9;
            const windowHeight = window.innerHeight * 0.8;
            
            // En-boy oranını koru
            const aspectRatio = imgWidth / imgHeight;
            
            // Resmin boyutlarını hesapla
            let newWidth = imgWidth;
            let newHeight = imgHeight;
            
            if (newWidth > windowWidth) {
                newWidth = windowWidth;
                newHeight = newWidth / aspectRatio;
            }
            
            if (newHeight > windowHeight) {
                newHeight = windowHeight;
                newWidth = newHeight * aspectRatio;
            }
            
            // Modal resim boyutlarını ayarla
            modalImg.style.width = newWidth + 'px';
            modalImg.style.height = newHeight + 'px';
            
            // Modal dışındaki içeriği inert yap
            document.body.childNodes.forEach(node => {
                if (node !== modal && node.nodeType === 1) {
                    node.inert = true;
                }
            });
            
            // Modalı göster
            modal.style.display = 'block';
            modalImg.focus();
        };
        
        tempImg.src = image.src;
        modalImg.src = image.src;
        modalImg.className = 'modal-img';

        // Modal kapatma işlemleri
        const closeModal = () => {
            modal.style.display = 'none';
            // inert özelliğini kaldır
            document.body.childNodes.forEach(node => {
                if (node.nodeType === 1) {
                    node.inert = false;
                }
            });
        };

        modalCloseBtn.onclick = closeModal;
        modal.onclick = (e) => {
            if (e.target === modal) {
                closeModal();
            }
        };

        // ESC tuşu ile kapatma
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });

    } catch (error) {
        console.error('Resim açma işlemi sırasında hata:', error);
    }
}

// Sayfa yüklendiğinde işlemleri başlat
document.addEventListener('DOMContentLoaded', function() {
    try {

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

        // Credits popup kontrolü
        const creditsBtn = document.querySelector('.credits-btn');
        const creditsPopup = document.querySelector('.credits-popup');
        const overlay = document.querySelector('.overlay');
        const closePopup = document.querySelector('.close-popup');

        if (creditsBtn && creditsPopup && overlay && closePopup) {
            // Credits butonuna tıklandığında
            creditsBtn.addEventListener('click', function() {
                creditsPopup.style.display = 'block';
                overlay.style.display = 'block';
            });

            // Kapatma butonuna tıklandığında
            closePopup.addEventListener('click', function() {
                creditsPopup.style.display = 'none';
                overlay.style.display = 'none';
            });

            // Overlay'e tıklandığında
            overlay.addEventListener('click', function() {
                creditsPopup.style.display = 'none';
                overlay.style.display = 'none';
            });
        }
    } catch (error) {
        console.error('Sayfa yüklenirken hata:', error);
    }
});
