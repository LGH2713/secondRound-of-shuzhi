window.addEventListener('load', function() {
    //按钮出入动画
    const song_list = document.querySelector('.song_list');
    let song_list_left = song_list.querySelector('.arrow_left');
    let song_list_right = song_list.querySelector('.arrow_right');
    var mod_index_tab = document.querySelector('.mod_index_tab');

    var playlist_con = document.querySelector('.song_list').querySelector('.playlist_con');
    var playlist__list_1 = 'playlist__list_1';
    var song_list_switch = 'song_list_switch';


    const new_song = document.querySelector('#new_song');
    // const new_song_playlist__list = new_song.querySelector('.playlist__list');
    let new_song_left = new_song.querySelector('.arrow_left');
    let new_song_right = new_song.querySelector('.arrow_right');
    arrow(new_song, new_song_left, new_song_right);

    

    // const mv = document.querySelector('#mv');
    // // const mv_playlist__list = mv.querySelector('.playlist__list');
    // let mv_left = mv.querySelector('.arrow_left');
    // let mv_right = mv.querySelector('.arrow_right');

    arrow(song_list, song_list_left, song_list_right);
    // arrow(new_song, new_song_left, new_song_right);
    // arrow(recommend, recommend_left, recommend_right);
    // arrow(mv, mv_left, mv_right);

    function arrow(obj1,arrow_left,arrow_right) {
        let pos = -80;
        obj1.addEventListener('mouseover', function() {
            let timer = setInterval(function() {
                if(pos == 0) {
                    clearInterval(timer);
                } else {
                    pos += 10;
                    arrow_left.style.left = pos + 'px';
                    arrow_right.style.right = pos + 'px';
                }
            }, 20);

            obj1.addEventListener('mouseleave', function() {
                // let pos = 0;
                let timer = setInterval(function() {
                    if(pos == -80) {
                        clearInterval(timer);
                    } else {
                        pos -= 10;
                        arrow_left.style.left = pos + 'px';
                        arrow_right.style.right = pos + 'px';
                    }
                }, 10)
            })
        })
    
        
    }

















































    


    var num = 0;
    var circle = 0;

    const defaultUrlHeader_2 = "http://musicapi.leanapp.cn"; // 默认URL头部2
    var songListUrl = defaultUrlHeader_2 + '/top/playlist';
    AjaxRequest_songList(songListUrl,song_msg,2,5);


    for(let i = 0; i < mod_index_tab.children.length; i++) {
        mod_index_tab.children[i].setAttribute('index',i);
        mod_index_tab.children[i].addEventListener('click', function() {
            let x = mod_index_tab.children[i].getAttribute('index');
            playlist_con.style.left = 0;
            switch (x) {
                case '0':
                    circle = 0;
                    num = 0;
                    songListUrl = defaultUrlHeader_2 + '/top/playlist';
                    AjaxRequest_songList(songListUrl,song_msg,2,5);
                    break;
                case '1':
                    circle = 0;
                    num = 0;
                    songListUrl = defaultUrlHeader_2 + '/top/playlist?&cat=流行';
                    AjaxRequest_songList(songListUrl,song_msg,4,5);
                    break;
                case '2':
                    circle = 0;
                    num = 0;
                    songListUrl = defaultUrlHeader_2 + '/top/playlist?&cat=华语'
                    AjaxRequest_songList(songListUrl,song_msg,4,5);
                    break
                case '3':
                    circle = 0;
                    num = 0;
                    songListUrl = defaultUrlHeader_2 + '/top/playlist?cat=ACG';
                    AjaxRequest_songList(songListUrl,song_msg,4,5);
                    break;
                case '4':
                    circle = 0;
                    num = 0;
                    songListUrl = defaultUrlHeader_2 + '/top/playlist?cat=影视原声';
                    AjaxRequest_songList(songListUrl,song_msg,4,5);
                    break;
                case '5':
                    circle = 0;
                    num = 0;
                    songListUrl = defaultUrlHeader_2 + '/top/playlist?&cat=清新';
                    AjaxRequest_songList(songListUrl,song_msg,4,5);
                    break;
            }
        })
    }


            



    // 歌单推荐模块 start
    // Ajax函数封装
    
    function AjaxRequest_songList(url,fn,num1,num2) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            // alert(xhr.readyState);
            if(xhr.readyState == 4) {
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    let data = JSON.parse(xhr.responseText);
                    console.log(data);
                    fn(playlist_con,playlist__list_1,song_list_switch,data,num1,num2);
                    // callback();
                } else {
                    alert("Request was unsuccessful：" + xhr.status);
                }
            }
        }
        xhr.open("GET", url, false);
        xhr.send();
    };


    


    // obj1 = playlist_con;
    // obj2 = playlist__list_1;
    // obj3 = mod_slide_switch;
    function song_msg(obj1,obj2,obj3,result,num1,num2) {
        obj1.style.left = 0;
        obj1.innerHTML = '';
        for(let i = 0; i < num1; i++) {
            obj1.innerHTML += `<ul class="playlist__list_1 slide__list"></ul>`;
        }

        let j = 0;
        let obj_2 = document.querySelectorAll(`.${obj2}`);
        obj_2.innerHTML = '';
        for(let i = 0; i < num1; i++) {
            for(j = 0; j < num2; j++) {
                obj_2[i].innerHTML += `<li class="playlist__item slide__item">
                <div class="playlist__item_box">
                    <div class="playlist__cover mod_cover">
                        <a href="#" class="js_playlist">
                            <img src=${result.playlists[i*num2 + j].coverImgUrl} alt=""
                                class="playlist__pic">
                            <i class="mod_cover__mask"></i>
                            <i class="icon-play2 f"></i>
                        </a>
                    </div>
                    <h4 class="playlist__title"><span class="playlist__title_txt">
                            <a href="#" class="js_playlist">${result.playlists[i*num2 + j].name}</a></span>
                        <div class="playlist__other">播放量：${result.playlists[i*num2 + j].playCount}</div>
                    </h4>
                </div>
            </li>`
            }
        };
        
        let obj_3 = document.querySelector(`.${obj3}`);
        obj_3.innerHTML = '';

        for(let i = 0; i < num1; i++) {
            obj_3.innerHTML += `<a><i class="slide_switch__item "></i></a>`;
        }

        // 克隆节点
        let copy = obj_2[0].cloneNode(true);
        obj1.appendChild(copy);

        callback(obj1,obj_3);
    };

    // function song(obj1,obj2,obj3,result,num1,num2) {
    //     obj1.style.left = 0;
    //     obj1.innerHTML = '';
    //     console.log(obj1.innerHTML);
    //     for(let i = 0; i < num1; i++) {
    //         obj1.innerHTML += `<ul class="playlist__list_1 slide__list"></ul>`;
    //     }

    //     let j = 0;
    //     let obj_2 = document.querySelectorAll(`.${obj2}`);
    //     obj_2.innerHTML = '';
    //     for(let i = 0; i < num1; i++) {
    //         for(j = 0; j < num2; j++) {
    //             obj_2[i].innerHTML += `<li class="playlist__item slide__item">
    //             <div class="playlist__item_box">
    //                 <div class="playlist__cover mod_cover">
    //                     <a href="#" class="js_playlist">
    //                         <img src=${result.playlists[i*num2 + j].coverImgUrl} alt=""
    //                             class="playlist__pic">
    //                         <i class="mod_cover__mask"></i>
    //                         <i class="icon-play2 f"></i>
    //                     </a>
    //                 </div>
    //                 <h4 class="playlist__title"><span class="playlist__title_txt">
    //                         <a href="#" class="js_playlist">${result.playlists[i*num2 + j].name}</a></span>
    //                     <div class="playlist__other">播放量：${result.playlists[i*num2 + j].playCount}</div>
    //                 </h4>
    //             </div>
    //         </li>`
    //         }
    //     };
        
    //     let obj_3 = document.querySelector(`.${obj3}`);
    //     obj_3.innerHTML = '';

    //     for(let i = 0; i < num1; i++) {
    //         obj_3.innerHTML += `<a><i class="slide_switch__item "></i></a>`;
    //     }

    //     // 克隆节点
    //     let copy = obj_2[0].cloneNode(true);
    //     obj1.appendChild(copy);

    //     callback(obj1,obj_3);
    // };
    // 歌单推荐模块 end

    function callback(item1,item2) {
    let width = 1200;
    let item_2 = item2.querySelectorAll('.slide_switch__item');

    for(let i = 0; i < item_2.length; i++) {
        item_2[i].setAttribute('index', i);
        item_2[i].addEventListener('click', function() {
            // 给所有小圆圈绑定事件，并将其css样式清除
            for(var i = 0; i < item_2.length; i++) {
                item_2[i].className = 'slide_switch__item';
            }
    
            this.className = 'slide_switch__item current';//被点击的当前小圆圈变白
    
            var index = this.getAttribute('index');//获取当前小圆圈的索引号
    
            num = index;
            circle = index;
    
            switch_lr(item1, -index*width);
        })
    }

    item_2[0].className = 'slide_switch__item current';//开始先使第一个小圆圈变白
}





function circleChange() {
    let item_2 = document.querySelector('.mod_slide_switch').querySelectorAll('.slide_switch__item');
    for(var i = 0; i < item_2.length; i++) {
        item_2[i].className = 'slide_switch__item';
    }
    item_2[circle].className = 'slide_switch__item current';
}


function arrowClick(item1,item2,item3,left,right) {
    var flag = true;//节流阀关键
    let width = item1.children[0].offsetWidth;
    let item_2 = item3.querySelector(`.${item2}`)
    right.addEventListener('click',function(){
        if(flag == true) {
            flag = false;

            if(num == item1.children.length - 1) {//若走到最后一张图片的前一张图片，则将移动距离清零，并将num也归零
                item1.style.left = 0;
                num = 0;
            }
            num++;//若未走到最后一张图片，则num加一
            switch_lr(item1,-num*width,function(){
                flag = true;//当图片移动完全节流阀才打开（回调函数）
            });
    
            circle++;//圆圈的索引号加一，保持与图片的索引号一致
            if (circle == item1.children.length - 1) {//当走到最后一个小圆圈时，小圆圈的索引号归零
                circle = 0;
            }
            circleChange();//使相应的小圆圈变白
        }
    })

    left.addEventListener('click',function() {
        if(flag == true) {
            flag = false;
            if(num == 0) {
                num = item1.children.length - 1; 
                item1.style.left = -num*width + 'px';
            }
            num --;
            switch_lr(item1, -num*width,function() {
                flag = true;
            })
    
            circle --;
            if(circle < 0) {
                circle = item_2.children.length - 1;
            }
            circleChange();
        }
    })
}

arrowClick(playlist_con,song_list_switch,song_list,song_list_left,song_list_right);





    

    


})