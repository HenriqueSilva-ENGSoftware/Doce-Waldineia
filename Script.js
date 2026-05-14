// Script da Doces da Waldineia
// Garante que o vídeo dê play (alguns navegadores bloqueiam autoplay)
document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.hero-video');
    if (video) {
        video.play().catch(err => {
            console.log('Autoplay bloqueado pelo navegador:', err);
        });
    }
});
