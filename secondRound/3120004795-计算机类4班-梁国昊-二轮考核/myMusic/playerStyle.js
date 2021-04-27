window.addEventListener('load', function() {
    const user_info_content = document.querySelector('.user_info_content');
    const now_control = document.querySelector('.now_control');
    const lyric_area = document.querySelector('.lyric_area');
    var back;
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

    now_control.addEventListener('click', function() {
        user_info_content.style.display = 'none';
        lyric_area.style.display = 'block';
        back = document.querySelector('.back');
        back.onclick = function() {
            user_info_content.style.display = 'block';
            lyric_area.style.display = 'none';
            back = null;
        }
    })

    


    // 进度条控制 start
    const progress_container = document.querySelector('.progress_container');
    const progress_bar = document.querySelector('.progress_bar');
    const progress_inner = document.querySelector('.progress_inner');
    const progress_go = document.querySelector('.progress_go');

    progress_inner.onmousedown = function(e) {
        var dragX = e.clientX - progress_inner.offsetLeft;
        progress_container.onmousemove = function(e) {
            let left = e.clientX - dragX;
            if(left <= 0) {
                left = 0;
            } else if(left >= progress_bar.offsetWidth) {
                left = progress_bar.offsetWidth;
            }
            progress_inner.style.left = left + 'px';
            progress_go.style.width = left + 'px';
        }
    }

    progress_container.onmouseup = function(e) {
        this.onmousedown = null;
        this.onmousemove = null;
        audio.currentTime = audio.duration * progress_inner.offsetLeft / progress_bar.offsetWidth;
    }
    // 进度条控制 end

    // 歌词拖拽控制 start 
    // const lyric_area = document.querySelector('.lyric_area');
    const lyric_ul = document.querySelector('#lyric_ul');
    function lyricDrag(item1, item2) {
        item1.onmousedown = function(e) {
            var dargY = item1.offsetTop -  e.clientY;
            item2.onmousemove = function(e) {
                let top = dargY - e.clientY;
                if(top >= 0) {
                    top = 0;
                } else if(top <= -item1.offsetHeight) {
                    top = -item1.offsetHeight
                }
                console.log(top);
                item1.style.top = top + 'px';
            }
        }
    
        item2.onmouseup = function(e) {
            this.onmousedown = null;
            this.onmousemove = null;
            // audio.currentTime = audio.duration * progress_inner.offsetLeft / progress_bar.offsetWidth;
        }
    }
    
    // 歌词拖拽控制 end 

})