function flippedUrl(ids) {
    let playingHeader = 'http://localhost:3000';
    return playingHeader + '/song/detail?ids=' + ids;
}

function idFun_f() {
    let ids = ''
    if(window.localStorage.getItem('flipped_list')) {
        let flipped_list = JSON.parse(window.localStorage.getItem('flipped_list'));
        for(let i = 0; i < flipped_list.length; i++) {
            ids += flipped_list[i].id;
            if(i < flipped_list.length - 1) {
                ids += ',';
            }
        }
    }
    return ids;
}

function flippedSongs() {
    let list_song_box = document.querySelector('.list_song_box');
    let song_item = list_song_box.querySelectorAll('.song_item');
    var song_item_flipped = list_song_box.querySelectorAll('.song_item_flipped')
        for(let i = 0; i < song_item.length; i++) {
            // 心动歌曲列表 start
            song_item_flipped[i].setAttribute('index', i);
            song_item_flipped[i].addEventListener('click', function() {
                clickFlipped(song_item_flipped[i]);
            })
            // 放入心动歌曲列表 end 
        }
}

function clickFlipped(item) {
    var flipped_list = [];
    var data = JSON.parse(window.localStorage.getItem('addNeed'));
    let index = parseInt(item.getAttribute('index'));
    if(window.localStorage.getItem('flipped_list')) {
        flipped_list = JSON.parse(window.localStorage.getItem('flipped_list'));//解析搜索记录并用新数组保存
        // console.log(flipped_list);
        flipped_list.push(data[index]); //将点击的歌曲推入新数组
        flipped_list = clearMore(flipped_list);//数组去重
        window.localStorage.removeItem('flipped_list');//移除原数据
        window.localStorage.setItem('flipped_list',JSON.stringify(flipped_list))//储存新数组
    } else {
        flipped_list.push(data[index]);
        window.localStorage.setItem('flipped_list',JSON.stringify(flipped_list))
    }
    AjaxRequest_flippedList(flippedUrl(idFun_f()))
}

function AjaxRequest_flippedList(url) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                let result = JSON.parse(xhr.responseText);
                console.log(result.songs);
                window.localStorage.setItem('flippedList', JSON.stringify(result.songs));
                callback_flippedList(result);
            } else {
                alert("Request was unsuccessful：" + xhr.status);
            }
        }
    }
    xhr.open("GET", url, true);
    xhr.send();
}

function callback_flippedList(data) {
    const flipped = document.querySelector('.flipped');
    flipped.innerHTML = '';
    for(let i = 0; i < data.songs.length; i++) {
        flipped.innerHTML += `<div class="song_item">
        <div class="song_name">${data.songs[i].name}</div>
        <div class="song_ar">${data.songs[i].ar[0].name}</div>
        <div class="song_operation">
            <i class="icon-play2 playBtn"></i>
            <i class="song_item_add">+</i>
            <i class="icon-file_download"></i>
            <i class="icon-cancel-circle cancelBtn"></i>
        </div>

    </div>`;
    }

    var flipped_item_playBtn = flipped.querySelectorAll('.playBtn');
    var cancelBtn = flipped.querySelectorAll('.cancelBtn');
    var audio = document.querySelector('audio');
    for(let i = 0; i < flipped_item_playBtn.length; i++) {
        flipped_item_playBtn[i].setAttribute('index', i);
        cancelBtn[i].setAttribute('index', i);
        flipped_item_playBtn[i].addEventListener('click', function() {
            let index = this.getAttribute('index');
            var flippedList = JSON.parse(window.localStorage.getItem('flippedList'));
            audio.src = `https://music.163.com/song/media/outer/url?id=${flippedList[index].id}.mp3`;
        })
    };

    deleteFlipped();
}

function deleteFlipped() {
    var flipped = document.querySelector('.flipped');
    var song_item = flipped.querySelectorAll('.song_item');
    var cancelBtn = flipped.querySelectorAll('.cancelBtn');

    for(let i = 0; i < cancelBtn.length; i++) {
        cancelBtn[i].removeAttribute('index');
    }

    for(let i = 0; i < cancelBtn.length; i++) {
        cancelBtn[i].setAttribute('index', i);
        cancelBtn[i].addEventListener('click', function() {
            var index = parseInt(this.getAttribute('index'));
            cancelBtn = flipped.querySelectorAll('.cancelBtn');
            song_item = flipped.querySelectorAll('.song_item');

            let flippedList = JSON.parse(window.localStorage.getItem('flippedList'));
            // flippedList.splice(index, 1);

            if(cancelBtn.length == 1) {
                index = this.getAttribute('index');
                flippedList = [];//点击单曲删除后删除该元素
                song_item[0].remove();//删除该节点
            } else {
                index = this.getAttribute('index');
                flippedList.splice(index, 1);//点击单曲删除后删除该元素
                song_item[index].remove();//删除该节点
            }

            window.localStorage.removeItem('flipped_list');
            window.localStorage.setItem('flippedflipped_listList' ,JSON.stringify(flippedList));
        })
    }
}