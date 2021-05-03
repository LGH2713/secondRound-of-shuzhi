function clumn_newSong() {
    const new_song = document.querySelector('#new_song');
    let playlist_con = new_song.querySelector('.playlist_con');
    
    var mod_slide_switch = new_song.querySelector('.mod_slide_switch');

    var num = 0;
    var circle = 0;

    // 获取左右按钮
    let newSong_left = new_song.querySelector('.arrow_left');
    let newSong_right = new_song.querySelector('.arrow_right');


    const defaultUrlHeader = "https://autumnfish.cn";
    let newSongUrl = defaultUrlHeader + '/top/song?type=0';

    AjaxRequest_newSong(newSongUrl);
    

    let mod_index_tab = new_song.querySelector('.mod_index_tab');
    mod_index_tab.children[0].style.color = '#31c27c';
    for(let i = 0; i < mod_index_tab.children.length; i++) {


        mod_index_tab.children[i].addEventListener('click', function() {
            for(let k = 0; k < mod_index_tab.children.length; k++) {
                mod_index_tab.children[k].style.color = '#000';
                mod_index_tab.children[k].setAttribute('index', k);
            }
            this.style.color = '#31c27c';

            let index = this.getAttribute('index');
            switch(index) {
                case '0':
                    circle = 0;
                    num = 0;
                    playlist_con.style.left = 0;
                    newSongUrl = defaultUrlHeader + '/top/song?type=0';
                    AjaxRequest_newSong(newSongUrl);
                    break;
                case '1':
                    circle = 0;
                    num = 0;
                    playlist_con.style.left = 0;
                    newSongUrl = defaultUrlHeader + '/top/song?type=7';
                    AjaxRequest_newSong(newSongUrl);
                    break;
                case '2':
                    circle = 0;
                    num = 0;
                    playlist_con.style.left = 0;
                    newSongUrl = defaultUrlHeader + '/top/song?type=96';
                    AjaxRequest_newSong(newSongUrl);
                    break;
                case '3':
                    circle = 0;
                    num = 0;
                    playlist_con.style.left = 0;
                    newSongUrl = defaultUrlHeader + '/top/song?type=8';
                    AjaxRequest_newSong(newSongUrl);
                    break;
                case '4':
                    circle = 0;
                    num = 0;
                    playlist_con.style.left = 0;
                    newSongUrl = defaultUrlHeader + '/top/song?type=16';
                    AjaxRequest_newSong(newSongUrl);
                    break;
            }
        });
    }






    let column = document.querySelectorAll('.column');


    const boxWidth = column[0].offsetWidth;//获取轮播图盒子宽度

    


    function AjaxRequest_newSong(url) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            // alert(xhr.readyState);
            if(xhr.readyState == 4) {
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    let data = JSON.parse(xhr.responseText);
                    console.log(data);
                    callbacknewSong(data);
                } else {
                    alert("Request was unsuccessful：" + xhr.status);
                }
            }
        }
        xhr.open("GET", url, false);
        xhr.send();
    }

    function callbacknewSong(result) {
        playlist_con.innerHTML = '';
        for(let i = 0; i < 8; i++) {
            playlist_con.innerHTML += `<div class="column"></div>`;
        }

        var k = 0;
        var j = 0;
        let column = document.querySelectorAll('.column');
        for(let i = 0; i < 8; i++) {
            for(k = i*9; k < i*9+9; k += 9) {
                for(j = k; j < k + 9; j += 3) {
                    column[i].innerHTML += `<ul class="column_container">
                    <li class="column_container_item">
                        <div class="mod_cover">
                            <a href="javascript:;" class="column_container_item_pic">
                                <img src=${result.data[j].album.blurPicUrl} alt="">
                                <i class="mod_cover__mask"></i>
                                <i class="icon-play2 f"></i>
                            </a>
                        </div>
                        <div class="column_item_detail">
                            <span class="sp1">${result.data[j].name}</span>
                            <span class="sp2">${result.data[j].artists[0].name}</span>
                        </div>
                        <div class="debutlist__time ">${'0' + parseInt(result.data[j].duration / 1000 / 60)}:${songDuring(result.data[j].duration)}</div>
                    </li>
                    <li class="column_container_item">
                        <div class="mod_cover">
                            <a href="javascript:;" class="column_container_item_pic">
                                <img src=${result.data[j+1].album.blurPicUrl} alt="">
                                <i class="mod_cover__mask"></i>
                                <i class="icon-play2 f"></i>
                            </a>
                        </div>
                        <div class="column_item_detail">
                            <span class="sp1">${result.data[j+1].name}</span>
                            <span class="sp2">${result.data[j+1].artists[0].name}</span>
                        </div>
                        <div class="debutlist__time ">${'0' + parseInt(result.data[j+1].duration / 1000 / 60)}:${songDuring(result.data[j+1].duration)}</div>
                    </li>
                    <li class="column_container_item">
                        <div class="mod_cover">
                            <a href="javascript:;" class="column_container_item_pic">
                                <img src=${result.data[j+2].album.blurPicUrl} alt="">
                                <i class="mod_cover__mask"></i>
                                <i class="icon-play2 f"></i>
                            </a>
                        </div>
                        <div class="column_item_detail">
                            <span class="sp1">${result.data[j+2].name}</span>
                            <span class="sp2">${result.data[j+2].artists[0].name}</span>
                        </div>
                        <div class="debutlist__time ">${ songDuring_m(result.data[j+2].duration)}:${songDuring(result.data[j+2].duration)}</div>
                    </li>
                </ul>`
                }
            }
        }
        // console.log(k);
        k = 0;
        j = 0;
        creat_circle(column,mod_slide_switch);
        let slide_switch__item = new_song.querySelectorAll('.slide_switch__item')
        circleNow(slide_switch__item);
    }

    function songDuring(secondTime) {
        secondTime = secondTime % 60000
        return parseInt(secondTime / 1000) >= 10 ? parseInt(secondTime / 1000) : '0' + parseInt(secondTime / 1000) ;
    }

    function songDuring_m(minTime) {
        minTime = minTime / 60000;
        return parseInt(minTime) >= 10 ? parseInt(minTime) : '0' + parseInt(minTime) ;
    }

    function circleNow(item) {
        let column = document.querySelectorAll('.column');
        for(let i = 0; i < item.length; i++) {
            item[i].setAttribute('index', i);
        }
        // 克隆第一张图片
        var first = column[0].cloneNode(true);
        playlist_con.appendChild(first); 
        item[0].className = 'slide_switch__item current';//开始先使第一个小圆圈变白
        for(var i = 0; i < item.length; i++) {

            item[i].addEventListener('click', function() {
                // 给所有小圆圈绑定事件，并将其css样式清除
                for(var i = 0; i < item.length; i++) {
                    item[i].className = 'slide_switch__item';
                }
    
                this.className = 'slide_switch__item current';//被点击的当前小圆圈变白
    
                var index = this.getAttribute('index');//获取当前小圆圈的索引号
                console.log(index);
                num = index;
                circle = index;
    
                switch_lr(playlist_con, -index*boxWidth);
            })
        }

        
    }


    arrow(new_song,newSong_left,newSong_right);

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

    


    function creat_circle(item1,item2) {
        item2.innerHTML = '';
        for(let i = 0; i < item1.length; i++) {
            item2.innerHTML += `<a><i class="slide_switch__item "></i></a>`;
        }
    }


    let slide_switch__item = new_song.querySelectorAll('.slide_switch__item');
    circleNow(slide_switch__item);
    

    

    var flag = true;//节流阀关键

    newSong_right.addEventListener('click',function(){
        let slide_switch__item = new_song.querySelectorAll('.slide_switch__item');
        // console.log(num, circle);
        if(flag == true) {
            flag = false;
            if(num == slide_switch__item.length) {//若走到最后一张图片的前一张图片，则将移动距离清零，并将num也归零
                playlist_con.style.left = 0;
                num = 0;
            }
            num++;//若未走到最后一张图片，则num加一
            switch_lr(playlist_con,-num*boxWidth,function(){
                flag = true;//当图片移动完全节流阀才打开（回调函数）
            });

            circle++;//圆圈的索引号加一，保持与图片的索引号一致
            if (circle == slide_switch__item.length) {//当走到最后一个小圆圈时，小圆圈的索引号归零
                circle = 0;
            }
            circleChange(slide_switch__item);//使相应的小圆圈变白
        }
    })

    newSong_left.addEventListener('click',function() {
        let slide_switch__item = new_song.querySelectorAll('.slide_switch__item');
        if(flag == true) {
            flag = false;
            if(num == 0) {
                num = slide_switch__item.length; 
                playlist_con.style.left = -num*boxWidth + 'px';
            }
            num --;
            switch_lr(playlist_con, -num*boxWidth,function() {
                flag = true;
            })

            circle --;
            if(circle < 0) {
                circle = slide_switch__item.length - 1;
            }
            circleChange(slide_switch__item);
        }
    })

    function circleChange(item) {
        for(var i = 0; i < item.length; i++) {
            item[i].className = 'slide_switch__item';
        }
        item[circle].className = 'slide_switch__item current';
    }
}