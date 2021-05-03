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
        let dragFlag = 1;
        window.localStorage.removeItem('dragFlag');
        window.localStorage.setItem('dragFlag', dragFlag);
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
        let dragFlag = 0;
        window.localStorage.removeItem('dragFlag');
        window.localStorage.removeItem('dragFlag', dragFlag);
        audio.currentTime = audio.duration * progress_inner.offsetLeft / progress_bar.offsetWidth;
    }
    // 进度条控制 end

    // // 歌词拖拽控制 start 
    // // const lyric_area = document.querySelector('.lyric_area');
    
    // function lyricDrag() {
    //     const lyric_area = document.querySelector('.lyric_area');
    //     const lyric_ul = document.querySelector('#lyric_ul');
    //     lyric_area.onmousedown = function(e) {
    //         var dargY = item1.offsetTop -  e.clientY;
    //         lyric_ul.onmousemove = function(e) {
    //             let top = dargY - e.clientY;
    //             if(top >= 0) {
    //                 top = 0;
    //             } else if(top <= -item1.offsetHeight) {
    //                 top = -item1.offsetHeight
    //             }
    //             item1.style.top = top + 'px';
    //         }
    //     }
    
    //     item2.onmouseup = function(e) {
    //         this.onmousedown = null;
    //         this.onmousemove = null;
    //         // audio.currentTime = audio.duration * progress_inner.offsetLeft / progress_bar.offsetWidth;
    //     }
    // }
    
    // // 歌词拖拽控制 end 

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