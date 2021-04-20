window.addEventListener('load', function() {
    const defaultUrlHeader_1 = "https://autumnfish.cn";  // 默认URL头部1
    const defaultUrlHeader_2 = "http://musicapi.leanapp.cn"; // 默认URL头部2
    const defaultUrlHeader_3 = "https://music.163.com";
    var userCookie = window.localStorage.getItem("cookie");
    const user_info_content = document.querySelector('.user_info_content');
    // let user_info_list = document.querySelector('.user_info_list');
    const user_info_name = document.querySelector('.user_info_name');
    // let user_info_follow = document.querySelector('.user_info_follow');
    // let user_info_playlist = document.querySelector('.user_info_playlist');
    // let use_info_level = document.querySelector('.use_info_level');
    const user_interface = document.querySelector('.user_interface')
    const list_songs = user_interface.querySelector('.list_songs');
    const audio = document.querySelector('.progress_container').querySelector('audio');
    var recordNum = 0;
    var scrollNum = 0;

    let login_status = defaultUrlHeader_1 + '/login/status' + userCookie;
    




    AjaxRequest_logined(login_status);
    

    function AjaxRequest_logined(url) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                // alert(xhr.readyState);
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                    let data = JSON.parse(xhr.responseText);
                    console.log(data);
                    window.localStorage.setItem('logined', data.profile.userId);
                    if(data.profile) {
                        callback_logined(data);
                    } 
                } else {
                    alert("Request was unsuccessful：" + xhr.status);
                }
            }
        }
        xhr.open("GET", url, true);
        xhr.send();
    }

    function callback_logined(data) {
        const page_left_nav = document.querySelector('.page_left_nav');
        page_left_nav.innerHTML += `<div class="nav_line pic" style="margin-left: 4px;"><img
        src=${data.profile.avatarUrl} alt=""></div>
<div class="nav_line searchMusic"><a href="#"><i class="icon-search1"></i></a></div>
<div class="nav_line"><a href="#"><i class="icon-music-playlist"></i></a></div>
<div class="nav_line"><a href="#"><i class="icon-star"></i></a></div>
<div class="nav_line"><a href="#"><i class="icon-stats-bars2"></i></a></div>
<div class="nav_line"><a href="#"><i class="icon-download"></i></a></div>
<div class="nav_line"><a href="#"><i class="icon-cog"></i></a></div>`

        user_info_name.innerHTML += `<span>${data.profile.nickname}</span>`;

        const followsUrl = defaultUrlHeader_1 + `/user/follows?uid=${data.profile.userId}`;
        AjaxRequest_follows(followsUrl);

        const followedsUrl = defaultUrlHeader_1 + `/user/followeds?uid=${data.profile.userId}`;
        AjaxRequest_followeds(followedsUrl);

        const subcountUrl = defaultUrlHeader_1 + `/user/subcount` + userCookie;
        AjaxRequest_subcount(subcountUrl);

        const levelUrl = defaultUrlHeader_1 + '/user/level' + userCookie;
        AjaxRequest_level(levelUrl);

        user_info_content.innerHTML += `<img src=${data.profile.avatarUrl} alt="" class="user_avatar">`;

        const user_info_logout = document.querySelector('.user_info_logout');
        const logoutUrl = defaultUrlHeader_1 + '/login/status' + userCookie;
        user_info_logout.addEventListener('click', function() {
            AjaxRequest_loginOut(logoutUrl);
        })

        const userId = window.localStorage.getItem("logined");
        const recordUrl = defaultUrlHeader_1 + `/user/record?uid=${userId}&type=1`;
        AjaxRequest_record(recordUrl);
    }



    const searchMusic = document.querySelector('.searchMusic');



































    








    function AjaxRequest_follows(url) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                // alert(xhr.readyState);
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                    let data = JSON.parse(xhr.responseText);
                    console.log(data);
                    window.localStorage.setItem('follows', data);
                    callback_follows(data);
                } else {
                    alert("Request was unsuccessful：" + xhr.status);
                }
            }
        }
        xhr.open("GET", url, true);
        xhr.send();
    }

    function callback_follows(data) {
        let follow = document.querySelector('.follow');
        follow.innerHTML += `关注 ${data.follow.length}`;
    }





    function AjaxRequest_followeds(url) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                // alert(xhr.readyState);
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                    let data = JSON.parse(xhr.responseText);
                    console.log(data);
                    window.localStorage.setItem('followeds', data);
                    callback_followeds(data);
                } else {
                    alert("Request was unsuccessful：" + xhr.status);
                }
            }
        }
        xhr.open("GET", url, true);
        xhr.send();
    }

    function callback_followeds(data) {
        let followeds = document.querySelector('.followeds');
        followeds.innerHTML += `粉丝 ${data.followeds.length}`;
    }



    function AjaxRequest_subcount(url) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                // alert(xhr.readyState);
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                    let data = JSON.parse(xhr.responseText);
                    console.log(data);
                    window.localStorage.setItem('subcount', data);
                    callback_subcount(data);
                } else {
                    alert("Request was unsuccessful：" + xhr.status);
                }
            }
        }
        xhr.open("GET", url, true);
        xhr.send();
    }

    function callback_subcount(data) {
        let playlist = document.querySelector('.playlist');
        playlist.innerHTML = `歌单 ${data.createdPlaylistCount}`;
    }






    function AjaxRequest_level(url) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                // alert(xhr.readyState);
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                    let data = JSON.parse(xhr.responseText);
                    console.log(data);
                    window.localStorage.setItem('level', data);
                    callback_level(data);
                } else {
                    alert("Request was unsuccessful：" + xhr.status);
                }
            }
        }
        xhr.open("GET", url, true);
        xhr.send();
    }

    function callback_level(result) {
        let level = document.querySelector('.level');
        level.innerHTML = `Lv${result.data.level}`;
    }


    function AjaxRequest_loginOut(url) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                // alert(xhr.readyState);
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                    let data = JSON.parse(xhr.responseText);
                    console.log(data);
                    callback_loginedOut();
                } else {
                    alert("Request was unsuccessful：" + xhr.status);
                }
            }
        }
        xhr.open("GET", url, true);
        xhr.send();
    }

    function callback_loginedOut() {
        localStorage.clear();
        let login_refresh = defaultUrlHeader_1 + '/login/refresh' + userCookie;
        AjaxRequest_logined(login_refresh);
        window.location.replace('../HTML/index.html');
    }

    function AjaxRequest_record(url) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                // alert(xhr.readyState);
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                    let data = JSON.parse(xhr.responseText);
                    console.log(data);
                    let songArray = JSON.stringify(data.weekData);
                    window.localStorage.setItem('record', songArray);
                    callback_record(data);
                } else {
                    alert("Request was unsuccessful：" + xhr.status);
                }
            }
        }
        xhr.open("GET", url, true);
        xhr.send();
    }

    function callback_record(data) {
        let list_song_box = user_interface.querySelector('.list_song_box');
        for(let i = 0; i < 20; i++) {
            list_song_box.innerHTML += `<div class="song_item">
            <div class="song_name">${data.weekData[i].song.name}</div>
            <div class="song_ar">${data.weekData[i].song.ar[0].name}</div>
            <div class="song_operation">
                <i class="icon-heart1"></i>
                <i class="song_item_add">+</i>
                <i class="icon-file_download"></i>
            </div>
            <span class="play_num">1次</span>
        </div>`;
        recordNum = i + 1;
        console.log(recordNum);
        }

        // let song_item_height = document.querySelectorAll('.song_item')[0].offsetHeight;
        var musicFlag = true;
        list_songs.addEventListener('scroll', function() {
            if(musicFlag == true) {
                musicFlag = false;
                scrollNum = scroll(scrollNum, function() {
                    musicFlag = true;
                });
            }
            console.log(scrollNum);
        })

        // function scroll(scrollNum, callback) {
        //     if(list_songs.scrollTop > 0) {
        //         list_song_box.innerHTML += `<div class="song_item">
        //         <div class="song_name">${data.allData[12+scrollNum].song.name}</div>
        //         <div class="song_ar">${data.allData[12+scrollNum].song.ar[0].name}</div>
        //         <div class="song_operation">
        //             <i class="icon-heart1"></i>
        //             <i class="song_item_add">+</i>
        //             <i class="icon-file_download"></i>
        //         </div>
        //         <span class="play_num">1次</span>
        //         </div>`;
                
        //         callback&&callback();
        //         scrollNum++;
        //         return scrollNum;
        //     }
        // }
        
        let song_item = user_interface.querySelectorAll('.song_item');
        let songArray = JSON.parse(window.localStorage.getItem('record'));
        console.log(songArray);
        for(let i = 0; i < song_item.length; i++) {
            song_item[i].setAttribute('index', i);
            song_item[i].addEventListener('click', function() {
                let index = this.getAttribute('index');
                musicPlay(songUrl(songArray[index].song.id))
            })
        }
    }

    

    function musicPlay(url) {
        console.log(url);
        audio.src = url;
        console.log(audio);
    }

    function songUrl(songId) {
        return defaultUrlHeader_3 + `/song/media/outer/url?id=${songId}.mp3` ; 
    }
})