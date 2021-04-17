window.addEventListener('load', function() {
    const new_disc = document.querySelector('#new_disc');
    const new_disc_con = document.querySelector('.new_disc_con');
    
    var mod_slide_switch = new_disc.querySelector('.mod_slide_switch');

    var num = 0;
    var circle = 0;

    // 获取左右按钮
    let new_disc_left = new_disc.querySelector('.arrow_left');
    let new_disc_right = new_disc.querySelector('.arrow_right');


    const defaultUrlHeader = "https://autumnfish.cn";
    let new_discUrl = defaultUrlHeader + '/album/new?limit=20';

    mod_slide_switch.innerHTML = '';
    AjaxRequest_newDisc(new_discUrl);

    let mod_index_tab = new_disc.querySelector('.mod_index_tab');
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
                    new_disc_con.style.left = 0;
                    new_discUrl = defaultUrlHeader + '/album/new?limit=20';
                    AjaxRequest_newDisc(new_discUrl);
                    break;
                case '1':
                    circle = 0;
                    num = 0;
                    new_disc_con.style.left = 0;
                    new_discUrl = defaultUrlHeader + '/album/new?area=ZH&limit=20';
                    AjaxRequest_newDisc(new_discUrl);
                    break;
                case '2':
                    circle = 0;
                    num = 0;
                    new_disc_con.style.left = 0;
                    new_discUrl = defaultUrlHeader + '/album/new?area=EA&limit=20';
                    AjaxRequest_newDisc(new_discUrl);
                    break;
                case '3':
                    circle = 0;
                    num = 0;
                    new_disc_con.style.left = 0;
                    new_discUrl = defaultUrlHeader + '/album/new?area=KR&limit=20';
                    AjaxRequest_newDisc(new_discUrl);
                    break;
                case '4':
                    circle = 0;
                    num = 0;
                    new_disc_con.style.left = 0;
                    new_discUrl = defaultUrlHeader + '/album/new?area=JP&limit=20';
                    AjaxRequest_newDisc(new_discUrl);
                    break;
            }
        });
    }



    let new_disc_list = document.querySelectorAll('.new_disc_list');

    const boxWidth = 1220;//获取轮播图盒子宽度

    


    function AjaxRequest_newDisc(url) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            // alert(xhr.readyState);
            if(xhr.readyState == 4) {
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    let data = JSON.parse(xhr.responseText);
                    // console.log(data);
                    callbackNewDisc(data);
                } else {
                    alert("Request was unsuccessful：" + xhr.status);
                }
            }
        }
        xhr.open("GET", url, false);
        xhr.send();
    }

    function callbackNewDisc(result) {
        new_disc_con.innerHTML = '';
        for(let i = 0; i < 2; i++) {
            new_disc_con.innerHTML += `<ul class="new_disc_list"></ul>`;
        }

        var k = 0;
        let new_disc_list = document.querySelectorAll('.new_disc_list');
        for(let i = 0; i < 2; i++) {
            for(k = i*10; k < i*10+10; k++) {
                new_disc_list[i].innerHTML += `<li class="new_disc_list_item">
                <div class="new_disc_item_box">
                    <div class="new_disc_item_cover">
                        <div class="new_disc_item__mask">
                            <div class="new_disc_item_icon icon-play2"></div>
                        </div>
                        <a href="#" class="new_disc_pic">
                            <img src=${result.albums[k].blurPicUrl} alt="">
                        </a>
                    </div>
                    <h4 class="playlist__title"><a href="#">${result.albums[k].name}</a></h4>
                    <div class="playlist__author"><a href="#">${result.albums[k].artist.name}</a></div>
                </div>

            </li>`
            }
        }
        k = 0;

        creat_circle(new_disc_list,mod_slide_switch);
        let slide_switch__item = new_disc.querySelectorAll('.slide_switch__item')
        circleNow(slide_switch__item);
    }

    

    function circleNow(item) {
        let new_disc_list = document.querySelectorAll('.new_disc_list');
        for(let i = 0; i < item.length; i++) {
            item[i].setAttribute('index', i);
        }
        // 克隆第一张图片
        var first = new_disc_list[0].cloneNode(true);
        new_disc_con.appendChild(first); 
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
    
                switch_lr(new_disc_con, -index*boxWidth);
            })
        }

        
    }





    arrow(new_disc,new_disc_left,new_disc_right);

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


    let slide_switch__item = new_disc.querySelectorAll('.slide_switch__item');
    circleNow(slide_switch__item);
    

    

    var flag = true;//节流阀关键

    new_disc_right.addEventListener('click',function(){
        let slide_switch__item = new_disc.querySelectorAll('.slide_switch__item');
        if(flag == true) {
            flag = false;
            if(num == slide_switch__item.length) {//若走到最后一张图片的前一张图片，则将移动距离清零，并将num也归零
                new_disc_con.style.left = 0;
                num = 0;
            }
            num++;//若未走到最后一张图片，则num加一
            switch_lr(new_disc_con,-num*boxWidth,function(){
                flag = true;//当图片移动完全节流阀才打开（回调函数）
            });

            circle++;//圆圈的索引号加一，保持与图片的索引号一致
            if (circle == slide_switch__item.length) {//当走到最后一个小圆圈时，小圆圈的索引号归零
                circle = 0;
            }
            circleChange(slide_switch__item);//使相应的小圆圈变白
        }
    })

    new_disc_left.addEventListener('click',function() {
        let slide_switch__item = new_disc.querySelectorAll('.slide_switch__item');
        if(flag == true) {
            flag = false;
            if(num == 0) {
                num = slide_switch__item.length; 
                new_disc_con.style.left = -num*boxWidth + 'px';
            }
            num --;
            switch_lr(new_disc_con, -num*boxWidth,function() {
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

})