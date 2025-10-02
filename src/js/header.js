(function(){

const fullscreenButton = document.querySelector('[data-id="fullScreenVideo"]');
    function videoCustom() {

  const videoEl = document.querySelector('#header__media--video');
  const playBtn = document.querySelector('[data-id="play"]');
  const pauseBtn = document.querySelector('[data-id="pause"]');
  

  if (!videoEl || !playBtn || !pauseBtn) {
    console.error('Один из элементов видео не найден!');

  }


  playBtn.addEventListener("click", () => {
    videoEl.play()
      .then(() => {
    
        playBtn.classList.add("hidden");
        pauseBtn.classList.remove("hidden");
      })
      .catch(error => {
        console.error('Ошибка воспроизведения видео:', error);
      });
  });

 
  pauseBtn.addEventListener("click", () => {
    videoEl.pause();
    playBtn.classList.remove("hidden");
    pauseBtn.classList.add("hidden");
  });


  videoEl.addEventListener('play', () => {
    playBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
  });

  videoEl.addEventListener('pause', () => {
    playBtn.classList.remove("hidden");
    pauseBtn.classList.add("hidden");
  });


  videoEl.addEventListener('ended', () => {
    playBtn.classList.remove("hidden");
    pauseBtn.classList.add("hidden");
  });
}

function toggleFullscreen(element) {
  if (!document.fullscreenElement) {
    // Если не в полноэкранном режиме, запрашиваем его
    if (element.requestFullscreen) {
      element.requestFullscreen(); // Стандартный
    } else if (element.mozRequestFullScreen) {
      /* Firefox */
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      /* IE/Edge */
      element.msRequestFullscreen();
    }
  } else {
    // Если в полноэкранном режиме, выходим из него
    if (document.exitFullscreen) {
      document.exitFullscreen(); // Стандартный
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
  }
}


function toggleMute() {

  if (!muteButton || !unmuteButton || !videoO) {
    console.error('Один из элементов управления звуком не найден!');
    return;
  }

 
  const updateMuteState = () => {
    const isMuted = videoO.muted;
    muteButton.classList.toggle('hidden', isMuted);
    unmuteButton.classList.toggle('hidden', !isMuted);
  };


  muteButton.addEventListener('click', () => {
    videoO.muted = true;
    updateMuteState();
  });


  unmuteButton.addEventListener('click', () => {
    videoO.muted = false;
    updateMuteState();
  });

 
  videoO.addEventListener('volumechange', updateMuteState);
  

  updateMuteState();
}



// toggleMute()
fullscreenButton.addEventListener("click", function () {
  toggleFullscreen(videoO);
});
videoCustom()
})()