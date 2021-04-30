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
            player_con(playing_songs, index);
        })
    }

    


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

    // let switchModule = ['list', 'loop', 'random'];
    let order_control = document.querySelector('.order_control');
    let module = document.querySelector('.module');

    order_control.setAttribute('moduleBtn', 'list');


    const Header = 'http://localhost:3000';
    let nowPlaying = JSON.parse(window.localStorage.getItem('nowPlaying'));
    let user_interface = document.querySelector('.user_interface');
    playing_all.addEventListener('click', function() {
        user_interface.style.display = 'none';
        window.localStorage.setItem('now_index', '0')
        let lyricUrl = Header + '/lyric?id=' + nowPlaying[0].id
        AjaxRequest_playingListLyric(lyricUrl, 'list');
        audio.src = `https://music.163.com/song/media/outer/url?id=${nowPlaying[0].id}.mp3`;
    })



    order_control.onclick = function() {
        switch(order_control.getAttribute('moduleBtn')){
            case 'list':
                audio.loop = true;
                module.className = `icon-loop module`
                order_control.setAttribute('moduleBtn', 'loop');
                break;
            case 'loop':
                audio.loop = false;
                // switchSong('random')
                random_playing();
                module.className = `icon-shuffle module`
                order_control.setAttribute('moduleBtn', 'random');
                break;
            case 'random':
                // switchSong('list');
                list_playing();
                module.className = `icon-menu module`;
                order_control.setAttribute('moduleBtn', 'list');
                break;
        }
    }

    
}

function switchSong(module) {
    const Header = 'http://localhost:3000';
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

    previousBtn.onclick = function() {
        
        if(module == 'list') {
            if(now_index <= 0) {
                now_index = playing_list.children.length - 1;
            } else {
                now_index--;
            }
        } else {
            now_index = getRandom(0, nowPlaying.length, 0);
            if(now_index == nowPlaying.length) {
                now_index = nowPlaying.length - 1;
            }
        }

        window.localStorage.setItem('now_index', now_index)

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

        console.log(now_index);
        window.localStorage.setItem('now_index_all', now_index);
        audio.src = `https://music.163.com/song/media/outer/url?id=${nowPlaying[now_index].id}.mp3`;
        let lyricUrl = Header + '/lyric?id=' + nowPlaying[now_index].id
        AjaxRequest_playingListLyric(lyricUrl);
        player_con(nowPlaying, now_index);
    }

    nextBtn.onclick = function() {
        
        if(module == 'list') {
            if(now_index >= playing_list.children.length - 1) {
                now_index = 0;
            } else {
                now_index++;
            }
        } else {
            now_index = getRandom(0, nowPlaying.length, 0);
            if(now_index == nowPlaying.length) {
                now_index = nowPlaying.length - 1;
            }
        }

        window.localStorage.setItem('now_index', now_index)


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

        console.log(now_index);
        window.localStorage.setItem('now_index_all', now_index);
        audio.src = `https://music.163.com/song/media/outer/url?id=${nowPlaying[now_index].id}.mp3`;
        let lyricUrl = Header + '/lyric?id=' + nowPlaying[now_index].id
        AjaxRequest_playingListLyric(lyricUrl, module);
        player_con(nowPlaying, now_index);
    }
}

function player_con(data, index) {
    let progress_container_songName = document.querySelector('.progress_container_songName');
    let progress_container_singerName = document.querySelector('.progress_container_singerName');
    progress_container_songName.innerHTML = `${data[index].name}`;
    progress_container_singerName.innerHTML = `${singerName(data, index)}`;
}

function singerName(item, index) {
    if(item[index].ar) {
        return item[index].ar[0].name;
    } else if(item[index].artists) {
        return item[index].artists[0].name;
    } else {
        return '佚名';
    }
}




function AjaxRequest_playingListLyric(url, module) {
    let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                // alert(xhr.readyState);
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                    let data = JSON.parse(xhr.responseText);
                    console.log(data);
                    callback_playingListLyric(data.lrc.lyric, module);
                } else {
                    alert("Request was unsuccessful：" + xhr.status);
                }
            }
        }
        xhr.open("GET", url, false);
        xhr.send();
}

function callback_playingListLyric(data, module) {
    const audio = document.querySelector('audio');
    var lines = data.split('\n');
    pattern = /\[\d{2}:\d{2}.(\d{2}|\d{3})\]/g;
    result = [];
    
    lines[lines.length - 1].length === 0 && lines.pop();
    lines.forEach(function (v /*数组元素值*/ , i /*元素索引*/ , a /*数组本身*/ ) {
        //提取出时间[xx:xx.xx]
        var time = v.match(pattern),
            //提取歌词

            value = v.replace(pattern, '');

        time.forEach(function (v1, i1, a1) {
            //去掉时间里的中括号得到xx:xx.xx
            var t = v1.slice(1, -1).split(':');
            //将结果压入最终数组
            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
        });
    });

    result.sort(function (a, b) {
        return a[0] - b[0];
    });

    lyric_ul.innerHTML = '';
    
    for(let i = 0; i < result.length; i++) {
        lyric_ul.innerHTML += `<li class="lyric_li">${result[i][1]}</li>`;
        
    }

    let lyric_li = lyric_ul.querySelectorAll('.lyric_li');
    for(let i = 0; i < result.length; i++) {
        lyric_li[i].setAttribute('index', i);
    }

    let heigh = 80;
    let progress_inner = document.querySelector('.progress_inner');
    let progressBarWidth = document.querySelector('.progress_bar').offsetWidth;
    let progress_go = document.querySelector('.progress_go');
    let progress_container_time = document.querySelector('.progress_container_time');
    let nextBtn = document.querySelector('.nextBtn');//下一首
    let previousBtn = document.querySelector('.previousBtn');//上一首
    let nowPlaying = window.localStorage.getItem('nowPlaying');
    audio.ontimeupdate = function(e) {
        progress_container_time.innerHTML = playerTime(audio.currentTime, audio.duration);
        progress_inner.style.left = progressBarWidth * audio.currentTime / audio.duration + 'px';
        progress_go.style.width = progress_inner.style.left;

        switchSong(module);
        if(audio.ended) {
            if(module == 'list') {
                // nextBtn.onclick = null;
                // previousBtn.onclick = null;
                
                console.log(module);
                let now_index = parseInt(window.localStorage.getItem('now_index'));
                audio.src = `https://music.163.com/song/media/outer/url?id=${nowPlaying[now_index].id}.mp3`;
                nextBtn.onclick();
                // console.log(1);

            } else if(module == 'random') {
                nextBtn.onclick = null;
                previousBtn.onclick = null;
                // switchSong(module);
                let now_index = parseInt(window.localStorage.getItem('now_index'));
                audio.src = `https://music.163.com/song/media/outer/url?id=${nowPlaying[now_index].id}.mp3`;
                nextBtn.onclick();
            }
        }

        for(let i = 0; i < result.length; i++) {
            if(this.currentTime > result[i][0]) {
                lyric_ul.style.top = `${-heigh*i + 'px'}`;
                for(let k = 0; k < lyric_li.length; k++) {
                    // lyric_li[k].style.backgroundColor = 'rgba(255, 255, 255, 0)';
                    lyric_li[k].style.color = '#fff';
                } 
                // lyric_li[i].style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
                lyric_li[i].style.color = 'chartreuse';
            }
        }
    }

    
} 

function getRandom(start, end, fixed) {
    console.log(start, end);
    let differ = end - start;
    let random = Math.random();
    return (start + differ * random).toFixed(fixed);
}

function list_playing() {
    const Header = 'http://localhost:3000';
    const user_interface = document.querySelector('.user_interface');
    let nowPlaying = JSON.parse(window.localStorage.getItem('nowPlaying'));
    const nextBtn = document.querySelector('.nextBtn');
    const playing_all = document.querySelector('.playing_all');
    let audio = document.querySelector('audio');
    

    // playing_all.addEventListener('click', function() {
    //     user_interface.style.display = 'none';
    //     window.localStorage.setItem('now_index', '0')
    //     let lyricUrl = Header + '/lyric?id=' + nowPlaying[0].id
    //     AjaxRequest_playingListLyric(lyricUrl, 'list');
    //     audio.src = `https://music.163.com/song/media/outer/url?id=${nowPlaying[0].id}.mp3`;
    // })

    let lyricUrl = Header + '/lyric?id=' + nowPlaying[parseInt(window.localStorage.getItem('now_index'))].id
    AjaxRequest_playingListLyric(lyricUrl, 'list');

}

function random_playing() {
    const Header = 'http://localhost:3000';
    const user_interface = document.querySelector('.user_interface');
    const playing_all = document.querySelector('.playing_all');
    let nowPlaying = JSON.parse(window.localStorage.getItem('nowPlaying'));
    let audio = document.querySelector('audio');

    let lyricUrl = Header + '/lyric?id=' + nowPlaying[parseInt(window.localStorage.getItem('now_index'))].id
    AjaxRequest_playingListLyric(lyricUrl, 'random');
}

function playerTime(curTime, durTime) {
    if(durTime) {
        return `${curTime / 60 > 9 ? parseInt(curTime / 60) : '0' + parseInt(curTime / 60)}:${curTime % 60 > 9 ? parseInt(curTime % 60) : '0' + parseInt(curTime % 60)}/${durTime / 60 > 9 ? parseInt(durTime / 60) : '0' + parseInt(durTime / 60)}:${durTime % 60> 9 ? parseInt(durTime % 60) : '0' + parseInt(durTime % 60)}`;
    }
}
