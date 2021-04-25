window.addEventListener('load', function() {
    const audio = document.querySelector('.progress_container').querySelector('audio');
    const pause = document.querySelector('.pauseOrNot');
    const pause_icon = pause.querySelector('i');
    var flag = false;
    pause.addEventListener('click', function() {
        if(flag == false) {
            audio.pause();
            pause_icon.className = 'icon-play3';
            flag = true;
        } else {
            audio.play();
            pause_icon.className = 'icon-pause2';
            flag = false;
        }
        
    })
})