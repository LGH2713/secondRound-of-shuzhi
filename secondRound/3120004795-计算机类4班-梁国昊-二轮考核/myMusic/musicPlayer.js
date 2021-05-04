window.addEventListener('load', function() {
    const Header = 'http://localhost:3000';
    var userCookie = window.localStorage.getItem("cookie");
    var user_info_content = document.querySelector('.user_info_content');
    const user_right_list = document.querySelector('.user_right_list');
    const user_info_name = document.querySelector('.user_info_name');
    const user_interface = document.querySelector('.user_interface');
    const search_interface = document.querySelector('.search_interface');
    const lyric_area = document.querySelector('.lyric_area');
    window.localStorage.setItem('dragFlag', '0');

    
    let login_status = Header + '/login/status' + userCookie;
    AjaxRequest_logined(login_status);

    function AjaxRequest_logined(url) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                    let result = JSON.parse(xhr.responseText);
                    console.log(result);
                    window.localStorage.setItem('logined', result.data.account.id);
                    if(result.data.profile) {
                        callback_logined(result.data);
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
        // 渲染左侧导航栏
        page_left_nav.innerHTML += `<div class="nav_line pic" style="margin-left: 4px;"><img
        src=${data.profile.avatarUrl} alt="">&nbsp;&nbsp;&nbsp;<a href="javascript:;">${data.profile.nickname}</a></div>
<div class="nav_line searchMusic"><a href="javascript:;"><i class="icon-search1"></i>&nbsp;&nbsp;&nbsp;搜索音乐</a></div>
<div class="nav_line myplaylistBtn"><a href="javascript:;"><i class="icon-music-playlist"></i>&nbsp;&nbsp;&nbsp;我的歌单</a></div>
<div class="nav_line"><a href="javascript:;"><i class="icon-star"></i>&nbsp;&nbsp;&nbsp;收藏</a></div>
<div class="nav_line"><a href="javascript:;"><i class="icon-stats-bars2"></i>&nbsp;&nbsp;&nbsp;排行</a></div>
<div class="nav_line"><a href="javascript:;"><i class="icon-download"></i>&nbsp;&nbsp;&nbsp;下载</a></div>
<div class="nav_line"><a href="javascript:;"><i class="icon-cog"></i>&nbsp;&nbsp;&nbsp;设置</a></div>`

        myPlaylistFun();//我的歌单模块导入


        //左侧导航栏的显示与隐藏 start
        page_left_nav.onmouseover = function() {
            page_left_nav.style.width = 150 + 'px';
        }
        page_left_nav.onmouseout = function() {
            page_left_nav.style.width = 50 + 'px';
        }
        //左侧导航栏的显示与隐藏 end

        // 各模块的显示与隐藏 start
        let now_playlist = document.querySelector('.now_playlist');
        const pic = document.querySelector('.pic');
        const myplaylist_interface = document.querySelector('.myplaylist_interface');
        const myplaylist_con = document.querySelector('.myplaylist_con');
        const myplaylist_song_con = myplaylist_interface.querySelector('.myplaylist_song_con');
        const searchMusicBtn = document.querySelector('.searchMusic');
        searchMusicBtn.onclick = function() {
            now_playlist.onmouseover = null;
            now_playlist.onmouseout = null;
            myplaylist_interface.style.display = 'none';//我的歌单模块隐藏
            user_interface.style.display = 'none'; //用户界面模块隐藏
            search_interface.style.display = 'block';//搜索界面模块显示
            // u_list_songs.style.display = 'block';//
            lyric_area.style.display = 'block';//歌词模块显示
            now_playlist_appear(search_interface)
            // audio.pause();
        }

        pic.onclick = function() {
            // user_info_content = document.querySelector('.user_info_content');
            user_interface.style.display = 'block';//用户界面显示 
            search_interface.style.display = 'none';//搜索界面隐藏
            myplaylist_interface.style.display = 'none';//我的歌单模块隐藏
            lyric_area.style.display = 'none';//歌词区域隐藏
            // user_info_content.display = 'block';
            now_playlist_appear(user_right_list);
        }

        const myplaylistBtn = document.querySelector('.myplaylistBtn');
        myplaylistBtn.addEventListener('click', function() {
            let myplaylist_playAll = myplaylist_interface.querySelector('.myplaylist_playAll');
            myplaylist_playAll.style.display = 'none';//播放全部按钮显示
            myplaylist_interface.style.display = 'block';//我的歌单模块显示
            myplaylist_con.style.display = 'block';//歌单显示
            myplaylist_song_con.style.display = 'none';//歌单内歌曲隐藏
            user_interface.style.display = 'none'; //用户界面隐藏
            search_interface.style.display = 'none';//搜索界面隐藏
            lyric_area.style.display = 'none';//歌词区域隐藏
        })
        // 各模块的显示与隐藏 end


        pic.onclick();//初始时点击进入用户界面
        AjaxRequest_flippedList(flippedUrl(idFun_f()));//导入心动歌曲模块
        // AjaxRequest_flippedList
        

        
        user_info_name.innerHTML += `<span>${data.profile.nickname}</span>`;

        const followsUrl = Header + `/user/follows?uid=${data.profile.userId}` + userCookie;
        AjaxRequest_follows(followsUrl);//请求用户关注

        const followedsUrl = Header + `/user/followeds?uid=${data.profile.userId}`;
        AjaxRequest_followeds(followedsUrl);//请求用户粉丝

        const subcountUrl = Header + `/user/subcount` + userCookie;
        AjaxRequest_subcount(subcountUrl);//请求用户歌单数

        const levelUrl = Header + '/user/level' + userCookie;
        AjaxRequest_level(levelUrl);//请求用户等级

        user_info_content.innerHTML += `<img src=${data.profile.avatarUrl} alt="" class="user_avatar">`;


        // 退出登录 start 
        const user_info_logout = document.querySelector('.user_info_logout');
        const logoutUrl = Header + '/login/status' + userCookie;
        user_info_logout.addEventListener('click', function() {
            AjaxRequest_loginOut(logoutUrl);
        })
        // 退出登录 end 


        // 导入用户历史播放记录 start 
        let songRecord = JSON.parse(window.localStorage.getItem('songRecord'));
        if(songRecord) {
            record(songRecord);
        }
        // 导入用户历史播放记录 end


        // 用户界面右侧导航栏 start 
        const right_select_tab_list_item = document.querySelectorAll('.right_select_tab_list_item');
        let list_song_box = document.querySelector('.list_song_box');
        let flipped = document.querySelector('.flipped');
        for(let i = 0; i < right_select_tab_list_item.length; i++) {
            right_select_tab_list_item[i].setAttribute('index', i);
            right_select_tab_list_item[i].addEventListener('click', function() {
                let index = this.getAttribute('index');
                switch(parseInt(index)) {
                    case 0:
                        list_song_box.style.display = 'block';
                        flipped.style.display = 'none';
                        break;
                    case 2:
                        list_song_box.style.display = 'none';
                        flipped.style.display = 'block';
                        break;
                }
            })
        }
        // 用户界面右侧导航栏 end
    }

})


// 用户历史播放记录模块函数
function record(data) {
    const audio = document.querySelector('audio');
    const Header = 'http://localhost:3000';
    const lyric_area = document.querySelector('.lyric_area');
    let list_song_box = document.querySelector('.list_song_box');
    
    if(data.length) {
        data = data.reverse();
    list_song_box.innerHTML = '';
    for(let i = 0; i < data.length && i < 60; i++) {
        if(data[i].artists) {
            list_song_box.innerHTML += `<div class="song_item">
        <div class="song_name">${data[i].name}</div>
        <div class="song_ar">${data[i].artists[0].name}</div>
        <div class="song_operation">
            <i class="icon-play2 playBtn"></i>
            <i class="icon-heart1 song_item_flipped"></i>
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
            <i class="icon-heart1 song_item_flipped"></i>
            <i class="song_item_add">+</i>
            <i class="icon-file_download"></i>
        </div>
        
    </div>`;
        }
    // recordNum = i + 1;
    }
    
    
    let song_item = list_song_box.querySelectorAll('.song_item');
    let playBtn = list_song_box.querySelectorAll('.playBtn')
    let progress_inner = document.querySelector('.progress_inner');
    let progressBarWidth = document.querySelector('.progress_bar').offsetWidth;
    const progress_go = document.querySelector('.progress_go');

    
    audio.ontimeupdate = function() {
        progress_inner.style.left = progressBarWidth * audio.currentTime / audio.duration + 'px';
        progress_go.style.width = progress_inner.style.left;
    }

    for(let i = 0; i < song_item.length; i++) {
        playBtn[i].setAttribute('index', i);
        playBtn[i].addEventListener('click', function() {
            for(let i = 0; i < song_item.length; i++) {
                song_item[i].className = 'song_item';
            }
            song_item[i].className = 'song_item song_item_on';
            let index = this.getAttribute('index');
            audio.src = audio.src = `https://music.163.com/song/media/outer/url?id=${data[index].id}.mp3`;
            if(window.sessionStorage.getItem('recordIndex')) {
                window.sessionStorage.removeItem('recordIndex');
            } else {
                window.sessionStorage.setItem('recordIndex', index);
            }

            // 再下方播放条中加入歌曲信息
            let progress_container_songName = document.querySelector('.progress_container_songName');
            let progress_container_singerName = document.querySelector('.progress_container_singerName');
            progress_container_songName.innerHTML = `${data[index].name}`;
            progress_container_singerName.innerHTML = `${singerName(data, index)}`;
            
            // 歌词请求
            lyric_area.style.display = 'none';
            let lyricUrl = Header + '/lyric?id=' + data[index].id;
            AjaxRequest_lyric(lyricUrl,index);
        })
    }
    window.localStorage.setItem('addNeed', JSON.stringify(data));
    
    addSongs('user');

    flippedSongs('user');
    }
    
}

// Ajax发送获取当前点击歌曲的歌词
function AjaxRequest_lyric(url,index) {
    let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                // alert(xhr.readyState);
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                    let data = JSON.parse(xhr.responseText);
                    console.log(data);
                    callback_lyric(data.lrc.lyric, index);
                } else {
                    alert("Request was unsuccessful：" + xhr.status);
                }
            }
        }
        xhr.open("GET", url, false);
        xhr.send();
}

// 歌词回调函数
function callback_lyric(data, songIndex) {
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

    let heigh = 80;//每句歌词的高度
    let progress_inner = document.querySelector('.progress_inner');
    let progressBarWidth = document.querySelector('.progress_bar').offsetWidth;
    let progress_go = document.querySelector('.progress_go');
    let progress_container_time = document.querySelector('.progress_container_time');
    audio.ontimeupdate = function(e) {
        // let lyric_ul = document.querySelector('.lyric_ul');
        console.log(lyric_ul.style.top);
        progress_container_time.innerHTML = playerTime(audio.currentTime, audio.duration);
        if(parseInt(window.localStorage.getItem('dragFlag')) != 1) {
            progress_inner.style.left = progressBarWidth * audio.currentTime / audio.duration + 'px';
        }
        progress_go.style.width = progress_inner.style.left;


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

    
}

// Ajax发送获取用户关注数量
function AjaxRequest_follows(url) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                let data = JSON.parse(xhr.responseText);
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

// 用户关注回调函数
function callback_follows(data) {
    let follow = document.querySelector('.follow');
    follow.innerHTML += `关注 ${data.follow.length}`;
}

// Ajax发送获取用户粉丝数量请求
function AjaxRequest_followeds(url) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                let data = JSON.parse(xhr.responseText);
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

// 用户粉丝数量回调函数
function callback_followeds(data) {
    let followeds = document.querySelector('.followeds');
    followeds.innerHTML += `粉丝 ${data.followeds.length}`;
}

// Ajax发送获取用户歌单数量请求
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

// 用户歌单数量回调函数
function callback_subcount(data) {
    let playlist = document.querySelector('.playlist');
    playlist.innerHTML = `歌单 ${data.createdPlaylistCount}`;
}

// Ajax发送获取用户等级请求
function AjaxRequest_level(url) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            // alert(xhr.readyState);
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                let data = JSON.parse(xhr.responseText);
                // console.log(data);
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

// 用户等级回调函数
function callback_level(result) {
    let level = document.querySelector('.level');
    level.innerHTML = `Lv${result.data.level}`;
}

// Ajax发送退出登录请求
function AjaxRequest_loginOut(url) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            // alert(xhr.readyState);
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                let data = JSON.parse(xhr.responseText);
                // console.log(data);
                callback_loginedOut();
            } else {
                alert("Request was unsuccessful：" + xhr.status);
            }
        }
    }
    xhr.open("GET", url, true);
    xhr.send();
}

// 退出登录回调函数
function callback_loginedOut() {
    // window.localStorage.clear();
    // window.localStorage.removeItem('playlistInit');
    window.localStorage.removeItem('cookie');
    window.localStorage.removeItem('playing_list');
    // window.localStorage.removeItem('myplaylists');
    let login_refresh = Header + '/login/refresh';
    AjaxRequest_logined(login_refresh);
    window.location.replace('../HTML/index.html');
}


// function AjaxRequest_mv(url) {
//     let xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4) {
//             // alert(xhr.readyState);
//             if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
//                 let result = JSON.parse(xhr.responseText);
//                 console.log(result);
//                 callback_mv(result.data.url)
//             } else {
//                 alert("Request was unsuccessful：" + xhr.status);
//             }
//         }
//     }
//     xhr.open("GET", url, true);
//     xhr.send();
// }

// function callback_mv(data) {
//     let video_play = document.querySelector('.video_play');
//     let main_container = document.querySelector('.main-container');
//     let video = video_play.querySelector('video');
//     let back = document.querySelector('.back');
//     mv_btn.addEventListener('click', function() {
//         main_container.style.display = 'none';
//         video_play.style.display = 'block';
//         lyric_area.style.display = 'none';
//         audio.pause();
//         player_container.style.display = 'none';
//         video.src = `${data}`;
//     });

//     back.addEventListener('click', function() {
//         main_container.style.display = 'block';
//         video_play.style.display = 'none';
//         player_container.style.display = 'block';
//         lyric_area.style.display = 'block';
//         video.pause();
//         video.src = '';
//     })
    
// }

// function AjaxRequest_comment(url) {
//     let xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4) {
//             // alert(xhr.readyState);
//             if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
//                 let result = JSON.parse(xhr.responseText);
//                 console.log(result);
//                 callback_comment(result)
//             } else {
//                 alert("Request was unsuccessful：" + xhr.status);
//             }
//         }
//     }
//     xhr.open("GET", url, true);
//     xhr.send();
// }

// function callback_comment(data) {
//     comment_btn.addEventListener('click', function() {
//         search_interface.style.display = 'none';
//         comment_interface.style.display = 'block';
//         list_comment_box.innerHTML = '';
//         for(let i = 0; i < data.comments.length; i++) {
//             let time = timeSwitch(new Date(data.comments[i].time));
//             // time = time.split(' ');
//             list_comment_box.innerHTML += `<div class="list_comment_item">
//             <img src=${data.comments[i].user.avatarUrl} alt="">
//             <div class="comment_con">
//                 <div class="commenter_msg">
//                     <b>${data.comments[i].user.nickname}</b>
//                     <span>${time}</span>
//                 </div>
//                 <div class="comment_text">
//                     ${data.comments[i].content}
//                 </div>
//             </div>
//         </div>`;
//         console.log(time);
//         console.log(typeof time);
//         }
//     })

//     let back = document.querySelector('.back');
//     back.addEventListener('click', function() {
//         search_interface.style.display = 'block';
//         comment_interface.style.display = 'none';
//     })
// }