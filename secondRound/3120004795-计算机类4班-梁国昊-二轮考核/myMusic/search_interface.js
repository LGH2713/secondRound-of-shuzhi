window.addEventListener('load', function() {
    const defaultUrlHeader = "http://musicapi.leanapp.cn"; // 默认URL头部2
    const defaultUrlHeader_2 = "https://autumnfish.cn"; // 默认URL头部1
    const search_interface = document.querySelector('.search_interface')
    const search_input = document.querySelector('.search_input');
    let list_song_box = search_interface.querySelector('.list_song_box');
    let player_container = document.querySelector('.player_container');
    const audio = document.querySelector('.progress_container').querySelector('audio');
    // console.log(list_song_box);
    const lyric_area = document.querySelector('.lyric_area')
    const lyric_ul = document.querySelector('#lyric_ul');
    const comment_interface = document.querySelector('.comment_interface');
    const list_comment_box = document.querySelector('.list_comment_box');
    // const back = document.querySelector('.back');
    const mv_btn = document.querySelector('.mv_btn');
    const comment_btn = document.querySelector('.comment_btn');

    const search_tab_item = document.querySelectorAll('.search_tab_item');
    
    search_tab_item[0].style.color = "#fff";
    for(let i = 0; i < search_tab_item.length; i++) {
        search_tab_item[i].setAttribute('index', i);
        search_tab_item[i].addEventListener('click', function() {
            for(let k = 0; k < search_tab_item.length; k++) {
                search_tab_item[k].style.color = "black";
            }
            this.style.color = "#fff";

            // let index = this.getAttribute('index');
            // switch(index) {
            //     case'0':   
            // }
        })
    }






    search_input.addEventListener('keyup', function() {
        // console.log(search_input.value);
        if(search_input.value != '') {
            list_song_box.innerHTML = '';
            AjaxRequest_search(searchUrl(search_input.value));
        }
    })





    function AjaxRequest_search(url) {
        let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    // alert(xhr.readyState);
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                        let data = JSON.parse(xhr.responseText);
                        console.log(data);
                        let searchArray = JSON.stringify(data);
                        window.localStorage.setItem('search', searchArray);
                        callback_search(data);
                    } else {
                        alert("Request was unsuccessful：" + xhr.status);
                    }
                }
            }
            xhr.open("GET", url, true);
            xhr.send();
    }

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

    function callback_lyric(data, songIndex) {
        var lines = data.split('\n');
        pattern = /\[\d{2}:\d{2}.(\d{2}|\d{3})\]/g;
        result = [];
        // while (!pattern.test(lines[0])) {
        //     lines = lines.slice(1);
        // };
        // let lyric_length = lines.length;
        // for(let i = 0; i <lyric_length; i++) {
        //     // console.log(lines[i]);
        //     if(pattern.test(lines[i])) {
        //         console.log(lines[i]);
        //         lines = lines.slice(i+1);
        //     }
        // }
        
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
        // console.log(result);



        lyric_ul.innerHTML = '';
        
        let lyric = Array.from(JSON.parse(window.localStorage.getItem('lyric')).split('\n'));
        for(let i = 0; i < result.length; i++) {
            lyric_ul.innerHTML += `<li class="lyric_li">${result[i][1]}</li>`;
            
        }

        let lyric_li = lyric_ul.querySelectorAll('.lyric_li');
        for(let i = 0; i < result.length; i++) {
            lyric_li[i].setAttribute('index', i);
        }

        let heigh = lyric_li[0].offsetHeight;
        console.log(heigh);

        


        audio.ontimeupdate = function(e) {
            for(let i = 0; i < result.length; i++) {
                if(this.currentTime>result[i][0]) {
                    lyric_ul.style.transform = `translateY(${-heigh*i + 'px'})`;
                    if(lyric_li[i - 1]) {
                        console.log(lyric_li[i - 1].style.backgroundColor);

                        lyric_li[i - 1].style.backgroundColor = 'rgba(255, 255, 255, 0)';
                        lyric_li[i - 1].style.color = '#fff';
                    } 
                    lyric_li[i].style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
                    lyric_li[i].style.color = 'chartreuse';
                }
            }
        }

        
    }
    
    function callback_search(data) {
        list_song_box.innerHTML = '';
        for(let i = 0; i < 20 && i < data.result.songs.length; i++) {
            list_song_box.innerHTML += `<div class="song_item">
        <div class="song_order">${i+1}</div>
        <div class="song_item_img"><img src="http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg"
                alt=""></div>
        <div class="song_item_name">${data.result.songs[i].name}&nbsp &nbsp    ${data.result.songs[i].alias[0]}</div>
        <div class="song_ar">${data.result.songs[i].artists[0].name}</div>
    </div>`
        }

        let song_item = list_song_box.querySelectorAll('.song_item');
        let searchData = JSON.parse(window.localStorage.getItem('search'));
        for(let i = 0; i < song_item.length; i++) {
            song_item[i].setAttribute('index', i);
            song_item[i].addEventListener('click', function() {
                let index = Number(this.getAttribute('index'));
                audio.src = `https://music.163.com/song/media/outer/url?id=${searchData.result.songs[index].id}.mp3`;

                

                let lyricUrl = defaultUrlHeader_2 + '/lyric?id=' + searchData.result.songs[index].id;

                AjaxRequest_lyric(lyricUrl,index);



                let mv_con = JSON.parse(window.localStorage.getItem('search'));
                if(mv_con.result.songs[index].mvid) {
                    mv_btn.style.display = 'block';
                    let mvUrl = defaultUrlHeader_2 + '/mv/url?id=' + mv_con.result.songs[index].mvid;
                    AjaxRequest_mv(mvUrl);
                }

                let commentUrl = defaultUrlHeader_2 + `/comment/music?id=${searchData.result.songs[index].id}`;
                AjaxRequest_comment(commentUrl);
            })
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
            main_container.style.display = 'none';
            video_play.style.display = 'block';
            audio.pause();
            player_container.style.display = 'none';
            video.src = `${data}`;
        });

        back.addEventListener('click', function() {
            main_container.style.display = 'block';
            video_play.style.display = 'none';
            player_container.style.display = 'block';
            video.pause();
        })
        
    }

    function AjaxRequest_comment(url) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                // alert(xhr.readyState);
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                    let result = JSON.parse(xhr.responseText);
                    console.log(result);
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
            search_interface.style.display = 'none';
            comment_interface.style.display = 'block';
            list_comment_box.innerHTML = '';
            for(let i = 0; i < data.hotComments.length; i++) {
                list_comment_box.innerHTML += `<div class="list_comment_item">
                <img src=${data.hotComments[i].user.avatarUrl} alt="">
                <div class="comment_con">
                    <div class="commenter_msg">
                        <b>${data.hotComments[i].user.nickname}</b>
                        <span>${data.hotComments[i].time}</span>
                    </div>
                    <div class="comment_text">
                        ${data.hotComments[i].content}
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

    
    function searchUrl(keywords) {
        return defaultUrlHeader + '/search?keywords=' + keywords;
    }
})

