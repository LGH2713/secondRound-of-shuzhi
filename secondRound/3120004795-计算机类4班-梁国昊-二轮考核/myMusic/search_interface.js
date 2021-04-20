window.addEventListener('load', function() {
    const defaultUrlHeader = "http://musicapi.leanapp.cn"; // 默认URL头部2
    const defaultUrlHeader_2 = "https://autumnfish.cn"; // 默认URL头部1
    const search_interface = document.querySelector('.search_interface')
    const search_input = document.querySelector('.search_input');
    let list_song_box = search_interface.querySelector('.list_song_box');
    const audio = document.querySelector('.progress_container').querySelector('audio');
    // console.log(list_song_box);
    const lyric_ul = document.querySelector('#lyric_ul');
    






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

    function AjaxRequest_lyric(url) {
        let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    // alert(xhr.readyState);
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                        let data = JSON.parse(xhr.responseText);
                        console.log(data);
                        // let lyricArray = JSON.stringify(data.tlyric.lyric);
                        // window.localStorage.setItem('lyric', lyricArray);
                        // console.log(lyricArray);
                        // alert(1)
                        callback_lyric(data.lrc.lyric);
                    } else {
                        alert("Request was unsuccessful：" + xhr.status);
                    }
                }
            }
            xhr.open("GET", url, true);
            xhr.send();
    }

    function callback_lyric(data) {
        var lines = data.split('\n');
        console.log(lines);
        pattern = /\[\d{2}:\d{2}.\d{3}\]/g;
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
        
        console.log(lines);
        lines[lines.length - 1].length === 0 && lines.pop();
        lines.forEach(function (v /*数组元素值*/ , i /*元素索引*/ , a /*数组本身*/ ) {
            //提取出时间[xx:xx.xx]
            var time = v.match(pattern),
                //提取歌词

                value = v.replace(pattern, '');

            // console.log('time=' + time);
            time.forEach(function (v1, i1, a1) {
                //去掉时间里的中括号得到xx:xx.xx
                var t = v1.slice(1, -1).split(':');
                // console.log(parseFloat(t[1]));
                //将结果压入最终数组
                // console.log('value=' + value);
                result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
                // console.log('result=' + result);
            });
        });

        result.sort(function (a, b) {
            return a[0] - b[0];
        });
        console.log(result);










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
                console.log(result[i][0]);
                if(this.currentTime>result[i][0]) {
                    lyric_ul.style.transform = `translateY(${-heigh*i + 'px'})`;
                    // lyric_li[i].style.className = 'lyric_li lineHigh'
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
                audio.src = `https://music.163.com/song/media/outer/url?id=${searchData.result.songs[index].id}.mp3 `
                let lyricUrl = defaultUrlHeader_2 + '/lyric?id=' + searchData.result.songs[index].id;
                AjaxRequest_lyric(lyricUrl);
            })
        }
    }
    
    function searchUrl(keywords) {
        return defaultUrlHeader + '/search?keywords=' + keywords;
    }
})

