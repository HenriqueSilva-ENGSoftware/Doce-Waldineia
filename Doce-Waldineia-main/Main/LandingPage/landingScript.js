// Garante que o vídeo dê play (alguns navegadores bloqueiam autoplay, pq? Eu não faço a menor ideia, mas é o que tem pra hoje)
document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.hero-video');
    if (video) {
        video.play().catch(err => {
            console.log('Autoplay bloqueado pelo navegador:', err);
        });
    }
});
