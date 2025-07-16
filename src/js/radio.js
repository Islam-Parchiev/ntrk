
document.querySelector('.radio__items').addEventListener('click', (e) => {

    const radioItem = e.target.closest('.radio-item');
    if (!radioItem) return;


    const isPlayButtonClicked = e.target.closest('.radio-item__play_btn');
    if (!isPlayButtonClicked) return;


    const playBtn = radioItem.querySelector('.radio-item__play_btn');
    const audio = radioItem.querySelector('audio');
    

    document.querySelectorAll('.radio-item').forEach(item => {
        if (item !== radioItem) {
         
            const otherAudio = item.querySelector('audio');
            const otherBtn = item.querySelector('.radio-item__play_btn');
            
            if (otherAudio && !otherAudio.paused) {
                otherAudio.pause();
                otherAudio.currentTime = 0;
            }
            otherBtn?.classList.remove('active');
        }
    });

   
    const isActive = playBtn.classList.toggle('active');
    
   
    if (isActive) {
        audio.play().catch(error => {
            console.error('Ошибка воспроизведения:', error);
            playBtn.classList.remove('active');
        });
    } else {
        audio.pause();
        audio.currentTime = 0;
    }
});