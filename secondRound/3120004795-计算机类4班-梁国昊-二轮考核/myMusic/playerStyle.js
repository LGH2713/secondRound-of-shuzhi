window.addEventListener('load', function() {
    const main_container = document.querySelector('.main-container');
    const user_info_content = document.querySelector('.user_info_content');
    const now_control = document.querySelector('.now_control');
    const lyric_area = document.querySelector('.lyric_area');
    const list_songs = document.querySelector('.list_songs');
    const now_playlist = document.querySelector('.now_playlist');
    const now_playListBtn = document.querySelector('.now_playListBtn');
    var back;
    
    const audio = document.querySelector('.progress_container').querySelector('audio');
    const pause = document.querySelector('.pauseOrNot');
    const pause_icon = pause.querySelector('i');
    var flag = false;
    var now_playListBtn_flag = false;
    // var songRecord = (JSON.parse(window.localStorage.getItem('songRecord'))).reverse();
    
    // console.log(window.sessionStorage.getItem('recordIndex'));

    // audio.ontimeupdate = function() {
    //     // alert(window.sessionStorage.getItem('recordIndex'))
    //     var index = parseInt(window.sessionStorage.getItem('recordIndex'));
    //     if(audio.ended() && index < songRecord.length) {
    //         audio.src = `https://music.163.com/song/media/outer/url?id=${songRecord[index + 1].id}.mp3`;
    //         window.sessionStorage.removeItem('recordIndex');
    //         window.sessionStorage.setItem('recordIndex', index + 1)
    //     } else {
    //         audio.pause();
    //         window.sessionStorage.removeItem('recordIndex');
    //         window.sessionStorage.setItem('recordIndex', index)
    //     }
    // }

    now_playlist.addEventListener('mouseover', function() {
        now_playListBtn.className = 'now_playListBtn_c now_playListBtn'
    })

    now_playlist.addEventListener('mouseout', function() {
        now_playListBtn.className = ' now_playListBtn'
    })

    now_playListBtn.addEventListener('click', function() {
        var step;
        if(now_playListBtn_flag == false) {
            step = -42;
            let timer = setInterval(function(){
                if(step == 0) {
                    clearInterval(timer);
                    now_playListBtn_flag = true;
                }
                step += 1;
                now_playlist.style.right = `${step}%`;
            },5)
        } else {
            step = 0;
            let timer = setInterval(function(){
                if(step <= -42) {
                    clearInterval(timer);
                    now_playListBtn_flag = false;
                }
                step -= 1;
                now_playlist.style.right = `${step}%`;
            },5)
        }
        
    });
    




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

    var user_interface = document.querySelector('.user_interface');
    now_control.addEventListener('click', function() {
        user_interface.style.display = 'none';
        lyric_area.style.display = 'block';
        
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

function songDetail(result) {
    if(result) {
        return result;
    } else {
        return '';
    }
}

function playlist_songs(item) {
    let result = '';
    for(let i = 0; i < item.length; i++) {
        result += item[i].id;
        if(i < item.length - 1) {
            result += ',';
        }
    }
    return result;
}