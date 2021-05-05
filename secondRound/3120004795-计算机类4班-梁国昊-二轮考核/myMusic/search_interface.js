window.addEventListener('load', function() {
    var userCookie = window.localStorage.getItem("cookie");
    const Header = "http://localhost:3000"; // 默认URL头部1
    const user_interface = document.querySelector('.user_interface');
    const search_interface = document.querySelector('.search_interface')
    const search_input = document.querySelector('.search_input');
    var list_song_box = search_interface.querySelector('.list_song_box');
    var list_singer_box = search_interface.querySelector('.list_singer_box');
    var list_playlist_box = search_interface.querySelector('.list_playlist_box');
    const list_singerSong_box = document.querySelector('.list_singerSong_box');
    const list_playlistSong_box = document.querySelector('.list_playlistSong_box')
    let player_container = document.querySelector('.player_container');
    const audio = document.querySelector('.progress_container').querySelector('audio');
    const progress_container_songName = document.querySelector('.progress_container_songName');
    const progress_container_singerName = document.querySelector('.progress_container_singerName');
    const progress_container_time = document.querySelector('.progress_container_time');
    const list_songs_inner = document.querySelectorAll('.list_songs_inner');
    var songRecord = [];

    const lyric_area = document.querySelector('.lyric_area')
    const lyric_ul = document.querySelector('#lyric_ul');
    const comment_interface = document.querySelector('.comment_interface');
    const list_comment_box = document.querySelector('.list_comment_box');
    const mv_btn = document.querySelector('.mv_btn');
    const comment_btn = document.querySelector('.comment_btn');
    const search_tab_item = document.querySelectorAll('.search_tab_item');

    var initSearchBtn = true;



    function initSearchAjax() {
        search_input.value = '';
            search_input.addEventListener('keyup', function() {
                list_song_box.style.display = 'block';
                list_singer_box.style.display = 'none';
                list_playlist_box.style.display = 'none';
                for(let i = 0; i < search_tab_item.length; i++) {
                    search_tab_item[i].style.color = 'black';
                }
                search_tab_item[0].style.color = "#fff";
                if(search_input.value != '') {
                    list_song_box.innerHTML = '';
                    setTimeout(function(){
                        AjaxRequest_search_song(searchUrl(search_input.value,'&type=1'));
                    }, 700)
                }
            })
        initSearchBtn = false;
    }


    list_song_box = search_interface.querySelector('.list_song_box');
    if(initSearchBtn == true) {
        initSearchAjax();
    }


    
    search_tab_item[0].style.color = "#fff";
    for(let i = 0; i < search_tab_item.length; i++) {
        search_tab_item[i].setAttribute('index', i);
        search_tab_item[i].addEventListener('click', function() {
            for(let k = 0; k < search_tab_item.length; k++) {
                search_tab_item[k].style.color = "black";
            }
            this.style.color = "#fff";
            let index = this.getAttribute('index');

            list_song_box = search_interface.querySelector('.list_song_box');
            list_singer_box = document.querySelector('.list_singer_box');
            list_playlist_box = document.querySelector('.list_playlist_box');

            switch(index) {
                case '0':
                    list_song_box.style.display = 'block';
                    list_singer_box.style.display = 'none';
                    list_playlist_box.style.display = 'none';
                    for(let i = 0; i < list_songs_inner.length; i++) {
                        list_songs_inner[i].style.display = 'none';
                    }
                    list_song_box.style.display = 'block';
                    AjaxRequest_search_song(searchUrl(search_input.value,'&type=1'));
                    break;
                case '1':
                    list_song_box.style.display = 'none';
                    list_singer_box.style.display = 'block';
                    list_playlist_box.style.display = 'none';
                    for(let i = 0; i < list_songs_inner.length; i++) {
                        list_songs_inner[i].style.display = 'none';
                    }
                    list_singer_box.style.display = 'block';
                    AjaxRequest_search_singer(searchUrl(search_input.value,'&type=100'));
                    break;
                case '2':
                    list_song_box.style.display = 'none';
                    list_singer_box.style.display = 'none';
                    list_playlist_box.style.display = 'block';
                    for(let i = 0; i < list_songs_inner.length; i++) {
                        list_songs_inner[i].style.display = 'none';
                    }
                    list_playlist_box.style.display = 'block';
                    AjaxRequest_search_playlist(searchUrl(search_input.value,'&type=1000'));
                    break;
            }
            
        })
    }









// 搜索单曲 start 

    function AjaxRequest_search_song(url) {
        let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    // alert(xhr.readyState);
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                        let data = JSON.parse(xhr.responseText);
                        let searchArray = JSON.stringify(data);
                        window.localStorage.setItem('search', searchArray);
                        callback_searchSong(data);
                    } else {
                        alert("Request was unsuccessful：" + xhr.status);
                    }
                }
            }
            xhr.open("GET", url, true);
            xhr.send();
    }

    function playerTime(curTime, durTime) {
        if(durTime) {
            return `${curTime / 60 > 9 ? parseInt(curTime / 60) : '0' + parseInt(curTime / 60)}:${curTime % 60 > 9 ? parseInt(curTime % 60) : '0' + parseInt(curTime % 60)}/${durTime / 60 > 9 ? parseInt(durTime / 60) : '0' + parseInt(durTime / 60)}:${durTime % 60> 9 ? parseInt(durTime % 60) : '0' + parseInt(durTime % 60)}`;
        }
    }

    function callback_searchSong(data) {
        // list_song_box.innerHTML = '';
        for(let i = 0; i < data.result.songs.length && i < 20; i++) {
            list_song_box.innerHTML += `<div class="song_item">
        <div class="song_order">${i+1}</div>
        <div class="song_item_img"><img src="http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg"
                alt=""></div>
        <div class="song_item_name">${data.result.songs[i].name}&nbsp &nbsp    ${songDetail(data.result.songs[i].alias[0])}</div>
        <div class="song_ar">${data.result.songs[i].artists[0].name}</div>
        <div class="song_operation" style="right: 12px;">
                                <i class="icon-play2 playBtn"></i>
                                <i class="icon-heart1 song_item_flipped"></i>
                                <i class="song_item_add">+</i>
                                <i class="icon-file_download"></i>
                            </div>
    </div>`
        }

        let playBtn = list_song_box.querySelectorAll('.playBtn');
        let searchData = JSON.parse(window.localStorage.getItem('search'));
        for(let i = 0; i < playBtn.length; i++) {
            playBtn[i].setAttribute('index', i);
            playBtn[i].addEventListener('click', function() {
                lyric_area.style.display = 'block';                
                let index = Number(this.getAttribute('index'));
                // window.localStorage.removeItem('songRecord');
                if(window.localStorage.getItem('songRecord')) {
                    songRecord = JSON.parse(window.localStorage.getItem('songRecord'));//解析搜索记录并用新数组保存
                    songRecord.push(searchData.result.songs[index]); //将点击的歌曲推入新数组
                    songRecord = clearMore(songRecord);//数组去重
                    window.localStorage.removeItem('songRecord');//移除原数据
                    window.localStorage.setItem('songRecord',JSON.stringify(songRecord))//储存新数组
                } else {
                    songRecord.push(searchData.result.songs[index]);
                    console.log(songRecord);
                    window.localStorage.setItem('songRecord',JSON.stringify(songRecord))
                }

                list_record(songRecord);
                songRecord = [];
                
                audio.src = `https://music.163.com/song/media/outer/url?id=${searchData.result.songs[index].id}.mp3`;
                progress_container_songName.innerHTML = `${searchData.result.songs[index].name}`;
                progress_container_singerName.innerHTML = `${searchData.result.songs[index].artists[0].name}`;

                
                let lyricUrl = Header + '/lyric?id=' + searchData.result.songs[index].id;
                AjaxRequest_lyric(lyricUrl,index);



                let mv_con = JSON.parse(window.localStorage.getItem('search'));
                if(mv_con.result.songs[index].mvid) {
                    mv_btn.style.display = 'block';
                    let mvUrl = Header + '/mv/url?id=' + mv_con.result.songs[index].mvid;
                    AjaxRequest_mv(mvUrl);
                } else {
                    mv_btn.style.display = 'none';
                }

                let commentUrl = Header + `/comment/music?id=${searchData.result.songs[index].id}`;
                comment_btn.style.display = 'block';
                AjaxRequest_comment(commentUrl);
            })
        }
        addSongs('searchSongs');
        flippedSongs('searchSongs');
    }

// 搜索单曲 end 





// 搜索歌手 start 

    function AjaxRequest_search_singer(url) {
        let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                        let data = JSON.parse(xhr.responseText);
                        console.log(data);
                        callback_searchSinger(data);
                    } else {
                        alert("Request was unsuccessful：" + xhr.status);
                    }
                }
            }
            xhr.open("GET", url, true);
            xhr.send();
    }

    function callback_searchSinger(data) {
        list_singer_box.innerHTML = ' ';
        for(let i = 0; i < 20; i++) {
            // console.log(i);
            list_singer_box.innerHTML += `<div class="list_singer_item">
            <img src=${search_SingerPic(data.result.artists[i].picUrl)} alt="">
            <div class="list_singer_item_name">${data.result.artists[i].name}</div>
        </div>`
        }

        let list_singer_item = list_singer_box.querySelectorAll('.list_singer_item');
        for(let i = 0; i < list_singer_item.length; i++) {
            list_singer_item[i].setAttribute('index', i);
            list_singer_item[i].addEventListener('click', function() {
                let index = this.getAttribute('index');
                let singerSongUrl = Header + `/artist/top/song?id=${data.result.artists[index].id}`;
                list_singer_box.style.display = 'none';
                list_singerSong_box.style.display = 'block';
                AjaxRequest_singerSong(singerSongUrl,data.result.artists[index].name);
            })
        }
    }



    function search_SingerPic(result) {
        if(result != null) {
            return result;
        } else {
            return `../image/u=2746384919,2327107392&fm=26&gp=0.jpg`;
        }
    }

    function AjaxRequest_singerSong(url,name) {
        let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    // alert(xhr.readyState);
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                        let data = JSON.parse(xhr.responseText);
                        console.log(data);
                        let searchArray = JSON.stringify(data);
                        window.localStorage.setItem('singerSong', searchArray);
                        callback_singerSong(data, name);
                    } else {
                        alert("Request was unsuccessful：" + xhr.status);
                    }
                }
            }
            xhr.open("GET", url, true);
            xhr.send();
    }

    function callback_singerSong(data, name) {
        list_singerSong_box.innerHTML = ' ';
        for(let i = 0; i < 30; i++) {
            list_singerSong_box.innerHTML += `<div class="song_item">
            <div class="song_order">${i+1}</div>
            <div class="song_item_img"><img src=${data.songs[i].al.picUrl} alt=""></div>
            <div class="song_item_name">${data.songs[i].name}&nbsp &nbsp &nbsp   ${songDetail(data.songs[i].alia)}</div>
            <div class="song_ar">${name}</div>
            <div class="song_operation" style="right: 12px;">
                                <i class="icon-play2 playBtn"></i>
                                <i class="icon-heart1 song_item_flipped"></i>
                                <i class="song_item_add">+</i>
                                <i class="icon-file_download"></i>
                            </div>
        </div>`;
        }

        let playBtn = list_singerSong_box.querySelectorAll('.playBtn');
        let singerSong = JSON.parse(window.localStorage.getItem('singerSong'));
        console.log(singerSong);
        for(let i = 0; i < playBtn.length; i++) {
            playBtn[i].setAttribute('index', i);
        }

        for(let i = 0; i < playBtn.length; i++) {
            playBtn[i].addEventListener('click', function() {
                let index = this.getAttribute('index');
                audio.src = `https://music.163.com/song/media/outer/url?id=${singerSong.songs[index].id}.mp3`;

                progress_container_songName.innerHTML = `${data.songs[index].name}`;
                progress_container_singerName.innerHTML = `${singerName(data, index)}`;

                if(window.localStorage.getItem('songRecord')) {
                    songRecord = JSON.parse(window.localStorage.getItem('songRecord'));//解析搜索记录并用新数组保存
                    console.log(songRecord);
                    songRecord.push(data.songs[index]); //将点击的歌曲推入新数组
                    songRecord = clearMore(songRecord);//数组去重
                    window.localStorage.removeItem('songRecord');//移除原数据
                    window.localStorage.setItem('songRecord',JSON.stringify(songRecord))//储存新数组
                } else {
                    songRecord.push(data.songs[index]);
                    console.log(songRecord);
                    window.localStorage.setItem('songRecord',JSON.stringify(songRecord))
                }

                list_record(songRecord);
                songRecord = [];

                let lyricUrl = Header + '/lyric?id=' + singerSong.songs[index].id;

                AjaxRequest_lyric(lyricUrl,index);
                // let mv_con = JSON.parse(window.localStorage.getItem('singerSong'));
                if(singerSong.songs[index].mv) {
                    mv_btn.style.display = 'block';
                    let mvUrl = Header + '/mv/url?id=' + singerSong.songs[index].mv;
                    AjaxRequest_mv(mvUrl);
                } else {
                    mv_btn.style.display = 'none';
                }

                let commentUrl = Header + `/comment/music?id=${singerSong.songs[index].id}`;
                comment_btn.style.display = 'block';
                AjaxRequest_comment(commentUrl);
            
            })
        }

        addSongs('searchSingerSongs');
        flippedSongs('searchSingerSongs');
    }

// 搜索歌手 end 








// 搜索歌单 start 

// 输入搜索内容发送请求
    function AjaxRequest_search_playlist(url) {
        let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                        let data = JSON.parse(xhr.responseText);
                        callback_searchPlaylist(data);
                    } else {
                        alert("Request was unsuccessful：" + xhr.status);
                    }
                }
            }
            xhr.open("GET", url, true);
            xhr.send();
    }    

// 传回搜索内容渲染到页面 发送点击的歌单请求
    function callback_searchPlaylist(data) {
        list_playlist_box = search_interface.querySelector('.list_playlist_box');
        list_playlist_box.innerHTML = ' ';
        for(let i = 0; i < 20; i++) {
            list_playlist_box.innerHTML += `<div class="list_playlist_item">
            <img src=${data.result.playlists[i].coverImgUrl} alt="">
            <div class="list_playlist_item_name">${data.result.playlists[i].name}</div>
            <div class="playlist_item_author">
                <span>By: ${data.result.playlists[i].creator.nickname}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>播放次数：${data.result.playlists[i].playCount}</span>
            </div>
            <div class="playlist_trackcount">${i + 1 > 9 ? i + 1 : '0' + i + 1}</div>
        </div>`
        }

        let playlist_control = document.querySelector('.playlist_control');
        
        let list_playlist_item = document.querySelectorAll('.list_playlist_item');
        for(let i = 0; i < list_playlist_item.length; i++) {
            list_playlist_item[i].setAttribute('index', i);
            list_playlist_item[i].addEventListener('click', function() {

                playlist_control.style.display = 'block';
                let add_all = document.querySelector('.add_all');
                add_all.addEventListener('click', function() {
                    // a();
                    myPlaylistFun();//将搜索结果导入我的歌单
                })


                let index = this.getAttribute('index');
                let playlistUrl = Header + '/playlist/detail?id=' + data.result.playlists[index].id;
                for(let i = 0; i < list_songs_inner.length; i++) {
                    list_songs_inner[i].style.display = 'none';
                }
                list_playlistSong_box.style.display = 'block';
                AjaxRequest_playlist_song(playlistUrl, index);
            })
        }
    }

// 发送歌单详情请求
    function AjaxRequest_playlist_song(url, index) {
        let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    // alert(xhr.readyState);
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                        let data = JSON.parse(xhr.responseText);
                        console.log(data);
                        var myplaylists_arr = [];
                        if(JSON.parse(window.localStorage.getItem('myplaylists'))) {
                            myplaylists_arr = JSON.parse(window.localStorage.getItem('myplaylists'));
                            myplaylists_arr.push(data.playlist);
                            window.localStorage.removeItem('myplaylists');
                            window.localStorage.setItem('myplaylists', JSON.stringify(myplaylists_arr));
                            console.log(data.playlist.trackIds);
                        } else {
                            myplaylists_arr.push(data.playlist);
                            window.localStorage.removeItem('myplaylists');
                            window.localStorage.setItem('myplaylists', JSON.stringify(myplaylists_arr));
                        }
                        
                        let playlistSongPlayUrl = Header + '/song/detail?ids=' + playlist_songs(data.playlist.trackIds);
                        console.log(playlistSongPlayUrl);
                        AjaxRequest_playlist_song_detail(playlistSongPlayUrl)
                    } else {
                        alert("Request was unsuccessful：" + xhr.status);
                    }
                }
            }
            xhr.open("GET", url, true);
            xhr.send();
    }


    // 发送具体歌曲请求
    function AjaxRequest_playlist_song_detail(url) {
        let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    // alert(xhr.readyState);
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                        let data = JSON.parse(xhr.responseText);
                        console.log(data);
                        window.localStorage.setItem('playlistSongs', JSON.stringify(data));
                        let play_all = document.querySelector('.play_all');
                        play_all.addEventListener('click', function() {
                            // alert(1);
                            window.localStorage.removeItem('playing_list');
                            window.localStorage.setItem('playing_list', JSON.stringify(data.songs));
                            AjaxRequest_playingList(playingUrl(idFun()));
                        })
                        callback_playlist_song_play(data);
                    } else {
                        alert("Request was unsuccessful：" + xhr.status);
                    }
                }
            }
            xhr.open("GET", url, true);
            xhr.send();
    }


    function callback_playlist_song_play(data) {
        list_playlistSong_box.innerHTML = ' ';
        for(let i = 0; i < data.songs.length; i++) {
            list_playlistSong_box.innerHTML += `<div class="song_item">
            <div class="song_order">${i+1}</div>
            <div class="song_item_img"><img src=${data.songs[i].al.picUrl} alt=""></div>
            <div class="song_item_name">${data.songs[i].name}&nbsp &nbsp &nbsp   ${songDetail(data.songs[i].alia)}</div>
            <div class="song_ar">${data.songs[i].ar[0].name}</div>
            <div class="song_operation" style="right: 12px;">
                                <i class="icon-play2 playBtn"></i>
                                <i class="icon-heart1 song_item_flipped"></i>
                                <i class="song_item_add">+</i>
                                <i class="icon-file_download"></i>
                            </div>
        </div>`;
        }

        let playBtn = list_playlistSong_box.querySelectorAll('.playBtn');
        for(let i = 0; i < playBtn.length; i++) {
            playBtn[i].setAttribute('index', i);
        }

        for(let i = 0; i < playBtn.length; i++) {
            playBtn[i].addEventListener('click', function() {
                let index = this.getAttribute('index');
                audio.src = `https://music.163.com/song/media/outer/url?id=${data.songs[index].id}.mp3`;


                progress_container_songName.innerHTML = `${data.songs[index].name}`;
                progress_container_singerName.innerHTML = `${singerName(data, index)}`;

                if(window.localStorage.getItem('songRecord')) {
                    songRecord = JSON.parse(window.localStorage.getItem('songRecord'));//解析搜索记录并用新数组保存
                    console.log(songRecord);
                    songRecord.push(data.songs[index]); //将点击的歌曲推入新数组
                    songRecord = clearMore(songRecord);//数组去重
                    window.localStorage.removeItem('songRecord');//移除原数据
                    window.localStorage.setItem('songRecord',JSON.stringify(songRecord))//储存新数组
                } else {
                    songRecord.push(data.songs[index]);
                    console.log(songRecord);
                    window.localStorage.setItem('songRecord',JSON.stringify(songRecord))
                }

                list_record(songRecord);
                songRecord = [];

                let lyricUrl = Header + '/lyric?id=' + data.songs[index].id;

                AjaxRequest_lyric(lyricUrl,index);


                if(data.songs[index].mv) {
                    mv_btn.style.display = 'block';
                    let mvUrl = Header + '/mv/url?id=' + data.songs[index].mv;
                    AjaxRequest_mv(mvUrl);
                } else {
                    mv_btn.style.display = 'none';
                }

                let commentUrl = Header + `/comment/music?id=${data.songs[index].id}`;
                comment_btn.style.display = 'block';
                
                AjaxRequest_comment(commentUrl);
            
                
            })

            
        }

        addSongs('searchPlaylistSongs');
        flippedSongs('searchPlaylistSongs');
    }

// 搜索歌单 end 


    function clearMore(arr) {
        var i, j, len = arr.length;
        for(i = 0; i < len; i++) {
            for(j = i + 1; j < len; j++) {
                if(arr[i].id == arr[j].id) {
                    arr.splice(j, 1);
                    len--;
                    j--;
                }
            }
        }
        return arr;
    }

    function list_record(data) {
        // let data = JSON.parse(window.localStorage.getItem('songRecord'))
        let list_song_box = document.querySelector('.list_song_box');
        data = data.reverse();
        list_song_box.innerHTML = '';
        for(let i = 0; i < data.length; i++) {
            if(data[i].artists) {
                list_song_box.innerHTML += `<div class="song_item">
            <div class="song_name">${data[i].name}</div>
            <div class="song_ar">${data[i].artists[0].name}</div>
            <div class="song_operation">
                <i class="icon-play2 playBtn"></i>
                <i class="icon-heart1"></i>
                <i class="song_item_add">+</i>
                <i class="icon-file_download"></i>
            </div>
            
        </div>`;
            } else {
                list_song_box.innerHTML += `<div class="song_item">
            <div class="song_name">${data[i].name}</div>
            <div class="song_ar">${data[i].ar[0].name}</div>
            <div class="song_operation">
                <i class="icon-play2 playBtn"></i>
                <i class="icon-heart1"></i>
                <i class="song_item_add">+</i>
                <i class="icon-file_download"></i>
            </div>
            
        </div>`;
            }
            
        }

            
        let playBtn = user_interface.querySelectorAll('.playBtn');
        for(let i = 0; i < playBtn.length; i++) {
            playBtn[i].setAttribute('index', i);
            playBtn[i].addEventListener('click', function() {
                let index = this.getAttribute('index');
                audio.src = audio.src = `https://music.163.com/song/media/outer/url?id=${data[index].id}.mp3`;
                // musicPlay(songUrl(data[index].id))
            })
        }

        let playing_list = [];
        let song_item_add = user_interface.querySelectorAll('.song_item_add')
        for(let i = 0; i < song_item_add.length; i++) {
            // 放入当前播放列表 start
            song_item_add[i].setAttribute('index', i);
            song_item_add[i].addEventListener('click', function() {
                let index = this.getAttribute('index');
                if(window.localStorage.getItem('playing_list')) {
                    playing_list = JSON.parse(window.localStorage.getItem('playing_list'));//解析搜索记录并用新数组保存
                    console.log(playing_list);
                    playing_list.push(data[index]); //将点击的歌曲推入新数组
                    playing_list = clearMore(playing_list);//数组去重
                    window.localStorage.removeItem('playing_list');//移除原数据
                    window.localStorage.setItem('playing_list',JSON.stringify(playing_list))//储存新数组
                } else {
                    playing_list.push(data[index]);
                    console.log(playing_list);
                    window.localStorage.setItem('playing_list',JSON.stringify(playing_list))
                }
                console.log(data[index]);

                // AjaxRequest_playingList
                AjaxRequest_playingList(playingUrl(idFun()));
            })
            // 放入当前列表 end 
        }
    }


    

    function AjaxRequest_lyric(url,index) {
        let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    // alert(xhr.readyState);
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                        let data = JSON.parse(xhr.responseText);
                        callback_lyric(data.lrc.lyric, index);
                    } else {
                        alert("Request was unsuccessful：" + xhr.status);
                    }
                }
            }
            xhr.open("GET", url, false);
            xhr.send();
    }

    function callback_lyric(data, songIndex) {
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
        
        // let lyric = Array.from(JSON.parse(window.localStorage.getItem('lyric')).split('\n'));
        for(let i = 0; i < result.length; i++) {
            lyric_ul.innerHTML += `<li class="lyric_li">${result[i][1]}</li>`;
            
        }

        let lyric_li = lyric_ul.querySelectorAll('.lyric_li');
        for(let i = 0; i < result.length; i++) {
            lyric_li[i].setAttribute('index', i);
        }

        let heigh = lyric_li[0].offsetHeight;
        let progress_inner = document.querySelector('.progress_inner');
        let progressBarWidth = document.querySelector('.progress_bar').offsetWidth;
        let progress_go = document.querySelector('.progress_go');
        audio.ontimeupdate = function(e) {
            progress_container_time.innerHTML = playerTime(audio.currentTime, audio.duration);
            if(parseInt(window.localStorage.getItem('dragFlag')) != 1) {
                progress_inner.style.left = progressBarWidth * audio.currentTime / audio.duration + 'px';
                for(let i = 0; i < result.length; i++) {
                    if(this.currentTime > result[i][0]) {
                        lyric_ul.style.top = `${-heigh*i + 'px'}`;
                        for(let k = 0; k < lyric_li.length; k++) {
                            lyric_li[k].style.color = '#333';
                        } 
                        lyric_li[i].style.color = ' rgba(19, 2, 250, 0.603)';
                    }
                }
            }            
            progress_go.style.width = progress_inner.style.left;

            
        }

        
    }

    function AjaxRequest_mv(url) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                // alert(xhr.readyState);
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                    let result = JSON.parse(xhr.responseText);
                    console.log(result);
                    callback_mv(result.data.url)
                } else {
                    alert("Request was unsuccessful：" + xhr.status);
                }
            }
        }
        xhr.open("GET", url, true);
        xhr.send();
    }

    function callback_mv(data) {
        let video_play = document.querySelector('.video_play');
        let main_container = document.querySelector('.main-container');
        let video = video_play.querySelector('video');
        let back = document.querySelector('.back');
        mv_btn.addEventListener('click', function() {
            //返回键的显示
            let back = document.querySelector('.back');
            back.style.display = 'block';
            back.onclick = function() {
                back.style.display = 'none';
            }
            //返回键的显示
            
            main_container.style.display = 'none';
            video_play.style.display = 'block';
            lyric_area.style.display = 'none';
            audio.pause();
            player_container.style.display = 'none';
            video.src = `${data}`;
        });

        back.addEventListener('click', function() {
            main_container.style.display = 'block';
            video_play.style.display = 'none';
            player_container.style.display = 'block';
            lyric_area.style.display = 'block';
            video.pause();
            video.src = '';
        })
        
    }

    function AjaxRequest_comment(url) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                // alert(xhr.readyState);
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                    let result = JSON.parse(xhr.responseText);
                    callback_comment(result)
                } else {
                    alert("Request was unsuccessful：" + xhr.status);
                }
            }
        }
        xhr.open("GET", url, true);
        xhr.send();
    }

    function callback_comment(data) {
        comment_btn.addEventListener('click', function() {
            //返回键的显示
            let back = document.querySelector('.back');
            back.style.display = 'block';
            back.onclick = function() {
                back.style.display = 'none';
            }
            //返回键的显示


            search_interface.style.display = 'none';
            comment_interface.style.display = 'block';
            list_comment_box.innerHTML = '';
            for(let i = 0; i < data.comments.length; i++) {
                let time = timeSwitch(new Date(data.comments[i].time));
                // time = time.split(' ');
                list_comment_box.innerHTML += `<div class="list_comment_item">
                <img src=${data.comments[i].user.avatarUrl} alt="">
                <div class="comment_con">
                    <div class="commenter_msg">
                        <b>${data.comments[i].user.nickname}</b>
                        <span>${time}</span>
                    </div>
                    <div class="comment_text">
                        ${data.comments[i].content}
                    </div>
                </div>
            </div>`;
            }
        })

        let back = document.querySelector('.back');
        back.addEventListener('click', function() {
            search_interface.style.display = 'block';
            comment_interface.style.display = 'none';
        })
    }

    function timeSwitch(time) {
        time = (time.toString()).split(' ');
        switch(time[1]) {
            case 'Jan':
                time[1] = '1月';
                break;
            case 'Feb':
                time[1] = '2';
                break;
            case 'Mar':
                time[1] = '3';
                break;
            case 'Apr':
                time[1] = '4';
                break;
            case 'May':
                time[1] = '5';
                break;
            case 'Jun':
                time[1] = '6';
                break;
            case 'Jul':
                time[1] = '7';
                break;
            case 'Aug':
                time[1] = '8';
                break;
            case 'Sept':
                time[1] = '9';
                break;
            case 'Oct':
                time[1] = '10';
                break;
            case 'Nov':
                time[1] = '11';
                break;
            case 'Dec':
                time[1] = '12';
                break;
        }

        return time[3] + '年' + time[1] + '月' + time[2] + '日';
    }

    
    function searchUrl(keywords,type) {
        return Header + '/search?keywords=' + keywords + type + `&${userCookie}`;
    }


    function singerName(item, index) {
        if(item.songs) {
            return item.songs[index].ar[0].name;
        } else if(item[index].ar) {
            return item[index].ar[0].name;
        } else if(item[index].artists) {
            return item[index].artists[0].name;
        } else {
            return '佚名';
        }
    }
})

