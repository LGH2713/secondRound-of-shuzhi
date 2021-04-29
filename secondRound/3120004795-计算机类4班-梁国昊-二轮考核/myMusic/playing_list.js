function playingUrl(ids) {
    let playingHeader = 'http://localhost:3000';
    return playingHeader + '/song/detail?ids=' + ids;
}

function idFun() {
    let ids = ''
    if(window.localStorage.getItem('playing_list')) {
        let playing_list = JSON.parse(window.localStorage.getItem('playing_list'));
        for(let i = 0; i < playing_list.length; i++) {
            ids += playing_list[i].id;
            if(i < playing_list.length - 1) {
                ids += ',';
            }
        }
    }
    return ids;
}

function AjaxRequest_playingList(url) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                let result = JSON.parse(xhr.responseText);
                console.log(result);
                window.localStorage.setItem('nowPlaying', JSON.stringify(result.songs));
                callback_playingList(result);
            } else {
                alert("Request was unsuccessful：" + xhr.status);
            }
        }
    }
    xhr.open("GET", url, true);
    xhr.send();
}

function isAlia(item) {
    if(item) {
        if(item[0]) {
            return item[0];
        } else {
            return '';
        }
    } else {
        return '';
    }
}

function isAr(item) {
    if(item) {
        return item[0].name;
    } else {
        return '';
    }
}

function callback_playingList(data) {
    let playing_list = document.querySelector('.playing_list');
    let delete_all = document.querySelector('.delete_all');
    const playing_all = document.querySelector('.playing_all');
    let audio = document.querySelector('audio');
    // console.log(delete_all);
    playing_list.innerHTML = '';
    for(let i = 0; i < data.songs.length; i++) {
        playing_list.innerHTML += `<li class="playing_list_item">
        <span class="playing_list_item_num">${i + 1}</span>
        <div class="playing_list_item_img"><img src=${data.songs[i].al.picUrl}
                alt=""></div>
        <div class="playing_list_item_msg">
            <div class="playing_list_item_song">
                <div class="playing_list_item_songDetail">${data.songs[i].al.name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${isAlia(data.songs[i].alia)}
                </div>
            </div>
            <span class="playing_list_item_singer">${isAr(data.songs[i].ar)}</span>
        </div>
        <div class="delete_one"><i class=" icon-cancel-circle""></i></div>
    </li>`
    }


    var playing_songs = JSON.parse(window.localStorage.getItem('playing_list'));
    let playing_list_item = document.querySelectorAll('.playing_list_item');
    let playing_list_item_num = document.querySelectorAll('.playing_list_item_num');
    let playing_list_item_img = document.querySelectorAll('.playing_list_item_img');
    let playing_list_item_msg = document.querySelectorAll('.playing_list_item_msg');
    for(let i = 0; i < playing_list_item.length; i++) {
        playing_list_item[i].setAttribute('index', i);
        playing_list_item[i].addEventListener('click', function() {
            for(let i = 0; i < playing_list_item.length; i++) {
                playing_list_item[i].className = 'playing_list_item';
                playing_list_item_num[i].className = 'playing_list_item_num';
                playing_list_item_img[i].className = 'playing_list_item_img';
                playing_list_item_msg[i].className = 'playing_list_item_msg';
            }

            let index = this.getAttribute('index');

            playing_list_item[index].className = 'playing_list_item playing_list_item_on';
            playing_list_item_num[index].className = 'playing_list_item_num playing_list_item_num_on';
            playing_list_item_img[index].className = 'playing_list_item_img playing_list_item_img_on';
            playing_list_item_msg[index].className = 'playing_list_item_msg playing_list_item_msg_on';


            window.localStorage.setItem('now_index',index)//保存当前索引号
            audio.src = `https://music.163.com/song/media/outer/url?id=${playing_songs[index].id}.mp3`;
        })
    }

    switchSong();


    delete_all.addEventListener('click', function() {
        let audio = document.querySelector('audio');
        if(window.localStorage.getItem('playing_list')) {
            playing_songs = null;
            window.localStorage.setItem('playing_list', '');
            console.log(window.localStorage.getItem('playing_list'));
            // audio.pause();
            playing_list.innerHTML = '';
            location.reload();
        }
    })


    // playing_all.addEventListener('click', function() {
    //     // const audio_player = document.querySelector('.audio_player');
    //     let playing_songs = JSON.parse(window.localStorage.getItem('playing_list'));
    //     let index = 0;
    //     // audio_player.innerHTML = '';
    //     // audio_player.innerHTML = '<audio src="" id="m_player" class="played_audio" autoplay autoplay></audio>'
    //     audio.ontimeupdate = function() {
    //         if(index == 0) {
    //             audio.src = `https://music.163.com/song/media/outer/url?id=${playing_songs[0].id}.mp3`;
    //             index++;
    //         } else (audio.ended) {
    //             audio.src = `https://music.163.com/song/media/outer/url?id=${playing_songs[index].id}.mp3`;
    //             if(index < playing_songs.length) {
    //                 index++;
    //             }
    //         }
    //     }
    // })
}

function switchSong() {
    const audio = document.querySelector('audio');
    const previousBtn = document.querySelector('.previousBtn');
    const nextBtn = document.querySelector('.nextBtn');
    const playing_list = document.querySelector('.playing_list');
    let nowPlaying = JSON.parse(window.localStorage.getItem('nowPlaying'));
    var now_index = parseInt(window.localStorage.getItem('now_index'));
    console.log(playing_list.children);

    let playing_list_item = document.querySelectorAll('.playing_list_item');
    let playing_list_item_num = document.querySelectorAll('.playing_list_item_num');
    let playing_list_item_img = document.querySelectorAll('.playing_list_item_img');
    let playing_list_item_msg = document.querySelectorAll('.playing_list_item_msg');

    previousBtn.addEventListener('click', function() {
        
        if(now_index == 0) {
            now_index = playing_list.children.length;
        } else {
            now_index--;
        }

        for(let i = 0; i < playing_list_item.length; i++) {
            playing_list_item[i].className = 'playing_list_item';
            playing_list_item_num[i].className = 'playing_list_item_num';
            playing_list_item_img[i].className = 'playing_list_item_img';
            playing_list_item_msg[i].className = 'playing_list_item_msg';
        }


        playing_list_item[now_index].className = 'playing_list_item playing_list_item_on';
        playing_list_item_num[now_index].className = 'playing_list_item_num playing_list_item_num_on';
        playing_list_item_img[now_index].className = 'playing_list_item_img playing_list_item_img_on';
        playing_list_item_msg[now_index].className = 'playing_list_item_msg playing_list_item_msg_on';

        audio.src = `https://music.163.com/song/media/outer/url?id=${nowPlaying[now_index - 1].id}.mp3`
    })

    nextBtn.addEventListener('click', function() {
        let flag = false;
        if(now_index == 0) {
            flag = true;
        }

        if(now_index == playing_list.children.length) {
            now_index = 0;
        } else {
            now_index++;
        }


        for(let i = 0; i < playing_list_item.length; i++) {
            playing_list_item[i].className = 'playing_list_item';
            playing_list_item_num[i].className = 'playing_list_item_num';
            playing_list_item_img[i].className = 'playing_list_item_img';
            playing_list_item_msg[i].className = 'playing_list_item_msg';
        }


        playing_list_item[now_index].className = 'playing_list_item playing_list_item_on';
        playing_list_item_num[now_index].className = 'playing_list_item_num playing_list_item_num_on';
        playing_list_item_img[now_index].className = 'playing_list_item_img playing_list_item_img_on';
        playing_list_item_msg[now_index].className = 'playing_list_item_msg playing_list_item_msg_on';

        // if(flag == true) {

        // }
        audio.src = `https://music.163.com/song/media/outer/url?id=${nowPlaying[now_index].id}.mp3`
    })
}