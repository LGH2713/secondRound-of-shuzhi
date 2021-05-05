window.addEventListener('load', function() {
    const now_control = document.querySelector('.now_control');
    const lyric_area = document.querySelector('.lyric_area');
    const now_playlist = document.querySelector('.now_playlist');
    const now_playListBtn = document.querySelector('.now_playListBtn');
    
    const audio = document.querySelector('.progress_container').querySelector('audio');
    const pause = document.querySelector('.pauseOrNot');
    const pause_icon = pause.querySelector('i');
    var flag = false;

    now_playlist.addEventListener('mouseover', function() {
        now_playListBtn.className = 'now_playListBtn_c now_playListBtn';
    })

    now_playlist.addEventListener('mouseout', function() {
        now_playListBtn.className = ' now_playListBtn'
    })

    



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

    var search_interface = document.querySelector('.search_interface');
    var myplaylist_interface = document.querySelector('.myplaylist_interface');
    var user_interface = document.querySelector('.user_interface');
    now_control.addEventListener('click', function() {
        search_interface.style.display = 'none';
        myplaylist_interface.style.display = 'none';
        user_interface.style.display = 'none';
        lyric_area.style.display = 'block';
        
    })

    


    // 进度条控制 start
    const progress_container = document.querySelector('.progress_container');
    const progress_bar = document.querySelector('.progress_bar');
    const progress_inner = document.querySelector('.progress_inner');
    const progress_go = document.querySelector('.progress_go');

    progress_inner.onmousedown = function(e) {
        // console.log(`e.clientX = ${e.clientX};progress_inner.offsetLeft = ${progress_inner.offsetLeft}`);
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

    // 音量控制 start    
    const volume_control_box = document.querySelector('.volume_control_box');
    const volume_progress_bar = document.querySelector('.volume_progress_bar');
    const volume_progress_inner = document.querySelector('.volume_progress_inner');
    const volume_progress_go = document.querySelector('.volume_progress_go');

    volume_progress_inner.style.bottom = '42%';
    volume_progress_go.style.height = '58%';
    audio.volume = 0.5;

    volume_progress_inner.onmousedown = function(e) {
        volume_control_box.onmousemove = function(e) {
            volume_progress_inner.style.bottom = (positionNum(volume_progress_bar, e)) + 'px';
            audio.volume = positionNum(volume_progress_bar, e) / volume_progress_bar.offsetHeight;
            volume_progress_go.style.height = (100 - (audio.volume) * 100) + '%';
        }
    }

    volume_control_box.onmouseup = function() {
        this.onmousemove = null;
        this.onmousedown = null;
    }
    // 音量控制 end 

    // 歌词拖拽 start
    const playingLine = document.querySelector('.playingLine');
    const lyric_ul = document.getElementById('lyric_ul');
    var dragMove;
    lyric_ul.onmousedown = function(e) {
        playingLine.style.display = 'block';
        let dragFlag = 1;
        window.localStorage.setItem('dragFlag', dragFlag);
        var dragPrevious = e.clientY;
        var top = lyric_ul.offsetTop;
        lyric_area.onmousemove = function(e) {
            dragMove = top - (dragPrevious - e.clientY);
            if(dragMove <= -lyric_ul.offsetHeight) {
                lyric_ul.style.top = -lyric_ul.offsetHeight + 'px';
            } else if (dragMove >= 0) {
                lyric_ul.style.top = 0 + 'px';
            } else {
                lyric_ul.style.top = dragMove + 'px';
            }

            
        }
    }
    
    var lyric_li = lyric_ul.getElementsByTagName('li');
    lyric_area.onmouseup = function() {
        playingLine.style.display = 'none';
            let now = lyric_li[-(dragMove - dragMove % 80) / 80].getAttribute('time');
            audio.currentTime = now;
            this.onmousemove = null;
            this.onmousedown = null;
            let dragFlag = 0;
            window.localStorage.removeItem('dragFlag');
            window.localStorage.removeItem('dragFlag', dragFlag);
    }
    // 歌词拖拽 end 

})

function positionNum(item1, item2) {
    const volume_control_icon = document.querySelector('.volume_control_icon');
    let num1 = item1.getBoundingClientRect().y + item1.offsetHeight;
    let num2 = item2.clientY
    if(num1 - num2 <= 0) {
        volume_control_icon.className = 'icon-volume-mute volume_control_icon';
        return 0;
    } else if(num1 - num2 >= item1.offsetHeight) {
        volume_control_icon.className = 'icon-volume-high volume_control_icon';
        return item1.offsetHeight;
    } else {
        if((num1 - num2) / num1 >= 0.04) {
            volume_control_icon.className = 'icon-volume-medium volume_control_icon'
        } else if((num1 - num2) / num1 < 0.04) {
            volume_control_icon.className = 'icon-volume-low volume_control_icon'
        }
        return num1 - num2;
    }
}

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