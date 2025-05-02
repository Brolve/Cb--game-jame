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
        // Test için localStorage'ı temizle
        localStorage.removeItem('eventEnded');
        // 30 Mayıs 2025 tarihi için sayaç
        const targetDate = new Date('2025-05-30T00:00:00').getTime();
        
        // Etkinlik bitti mi kontrolü
        if (localStorage.getItem('eventEnded') === 'true') {
            document.getElementById('countdown').innerHTML = `
                <div class="event-started">
                    <h2 class="blink">ETKİNLİK BAŞLADI!</h2>
                    <div class="start-animation"></div>
                </div>
            `;
            
            // Stil ekle
            const style = document.createElement('style');
            style.textContent = `
                .event-started {
                    background: rgba(0, 0, 0, 0.8);
                    padding: 20px;
                    border-radius: 15px;
                    border: 3px solid #c9d011;
                    text-align: center;
                }
                .event-started h2 {
                    color: #c9d011;
                    font-family: 'Press Start 2P', system-ui;
                    font-size: 2rem;
                    margin: 0;
                    text-shadow: 0 0 10px rgba(201, 208, 17, 0.7);
                }
                .blink {
                    animation: blink-animation 1s steps(5, start) infinite;
                }
                @keyframes blink-animation {
                    to {
                        visibility: hidden;
                    }
                }
                .start-animation {
                    height: 3px;
                    background: linear-gradient(to right, transparent, #c9d011, transparent);
                    margin-top: 15px;
                    animation: slide 2s ease-in-out infinite;
                }
                @keyframes slide {
                    0% { transform: scaleX(0); }
                    50% { transform: scaleX(1); }
                    100% { transform: scaleX(0); }
                }
            `;
            document.head.appendChild(style);
            return;
        }

        // Her saniye sayacı güncelle
        const countdownTimer = setInterval(function() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            // Zaman hesaplamaları
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Sayaç elementlerini güncelle
            document.getElementById('days').textContent = days < 10 ? '0' + days : days;
            document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
            document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;

            // Süre dolduğunda
            if (distance < 0) {
                clearInterval(countdownTimer);
                // Etkinliğin bittiğini kaydet
                localStorage.setItem('eventEnded', 'true');
                document.getElementById('countdown').innerHTML = `
                    <div class="event-started">
                        <h2 class="blink">ETKINLIK BAŞLADI!</h2>
                        <div class="start-animation"></div>
                    </div>
                `;
                
                // Stil ekle
                const style = document.createElement('style');
                style.textContent = `
                    .event-started {
                        background: rgba(0, 0, 0, 0.8);
                        padding: 20px;
                        border-radius: 15px;
                        border: 3px solid #c9d011;
                        text-align: center;
                    }
                    .event-started h2 {
                        color: #c9d011;
                        font-family: 'Press Start 2P', system-ui;
                        font-size: 2rem;
                        margin: 0;
                        text-shadow: 0 0 10px rgba(201, 208, 17, 0.7);
                    }
                    .blink {
                        animation: blink-animation 1s steps(5, start) infinite;
                    }
                    @keyframes blink-animation {
                        to {
                            visibility: hidden;
                        }
                    }
                    .start-animation {
                        height: 3px;
                        background: linear-gradient(to right, transparent, #c9d011, transparent);
                        margin-top: 15px;
                        animation: slide 2s ease-in-out infinite;
                    }
                    @keyframes slide {
                        0% { transform: scaleX(0); }
                        50% { transform: scaleX(1); }
                        100% { transform: scaleX(0); }
                    }
                `;
                document.head.appendChild(style);
            }
        }, 1000);

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
