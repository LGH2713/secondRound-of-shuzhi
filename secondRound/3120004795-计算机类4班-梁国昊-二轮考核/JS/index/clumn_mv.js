window.addEventListener('load', function() {
    const mv = document.querySelector('#mv');
    const mv_con = document.querySelector('.mv_con');
    
    var mod_slide_switch = mv.querySelector('.mod_slide_switch');

    var num = 0;
    var circle = 0;

    // 获取左右按钮
    let mv_left = mv.querySelector('.arrow_left');
    let mv_right = mv.querySelector('.arrow_right');


    const defaultUrlHeader = "https://autumnfish.cn/";
    let mvUrl = defaultUrlHeader + '/mv/all?limit=40';

    
    AjaxRequest_mv(mvUrl);

    let mod_index_tab = mv.querySelector('.mod_index_tab');
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
                    mv_con.style.left = 0;
                    mvUrl = defaultUrlHeader + '/mv/all?limit=40';
                    AjaxRequest_mv(mvUrl);
                    break;
                case '1':
                    circle = 0;
                    num = 0;
                    mv_con.style.left = 0;
                    mvUrl = defaultUrlHeader + '/mv/all?area=内地&limit=40';
                    AjaxRequest_mv(mvUrl);
                    break;
                case '2':
                    circle = 0;
                    num = 0;
                    mv_con.style.left = 0;
                    mvUrl = defaultUrlHeader + '/mv/all?area=港台&limit=40';
                    AjaxRequest_mv(mvUrl);
                    break;
                case '3':
                    circle = 0;
                    num = 0;
                    mv_con.style.left = 0;
                    mvUrl = defaultUrlHeader + '/mv/all?area=欧美&limit=40';
                    AjaxRequest_mv(mvUrl);
                    break;
                case '4':
                    circle = 0;
                    num = 0;
                    mv_con.style.left = 0;
                    mvUrl = defaultUrlHeader + '/mv/all?area=韩国&limit=40';
                    AjaxRequest_mv(mvUrl);
                    break;
                case '5':
                    circle = 0;
                    num = 0;
                    mv_con.style.left = 0;
                    mvUrl = defaultUrlHeader + '/mv/all?area=日本&limit=40';
                    AjaxRequest_mv(mvUrl);
                    break;
            }
        });
    }






    var mv_list__list = document.querySelectorAll('.mv_list__list');

    const boxWidth = mv_list__list[0].offsetWidth;//获取轮播图盒子宽度

    


    function AjaxRequest_mv(url) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            // alert(xhr.readyState);
            if(xhr.readyState == 4) {
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    let data = JSON.parse(xhr.responseText);
                    console.log(data);
                    callbackMv(data);
                } else {
                    alert("Request was unsuccessful：" + xhr.status);
                }
            }
        }
        xhr.open("GET", url, false);
        xhr.send();
    }

    function callbackMv(result) {
        mv_con.innerHTML = '';
        for(let i = 0; i < 4; i++) {
            mv_con.innerHTML += `<ul class="mv_list__list "></ul>`;
        }

        var k = 0;
        let mv_list__list = document.querySelectorAll('.mv_list__list');
        for(let i = 0; i < 4; i++) {
            for(k = i*10; k < i*10+10; k++) {
                mv_list__list[i].innerHTML += `<li class="mv_list_item"><div class="mv_mask">
                <div class="mv_mask_icon icon-play2"></div></div>
                <div class="mv_list__item_box">
                    <a href="#" class="mv_list__cover "><img class="mv_list__pic"
                            src=${result.data[k].cover} alt=""></a>
                    <h3 class="mv_list__title"><a href="#">${result.data[k].name}</a></h3>
                    <p class="mv_list__singer"><a href="#">${result.data[k].artistName}</a></p>
                    <div class="mv_list__info"><i class="icon-play2 mv_icon"></i>${result.data[k].playCount}</div>
                </div>
            </li>`
            }
        }
        k = 0;

        creat_circle(mv_list__list,mod_slide_switch);
        let slide_switch__item = mv.querySelectorAll('.slide_switch__item')
        circleNow(slide_switch__item);
    }

    

    function circleNow(item) {
        let mv_list__list = document.querySelectorAll('.mv_list__list');
        for(let i = 0; i < item.length; i++) {
            item[i].setAttribute('index', i);
        }
        // 克隆第一张图片
        var first = mv_list__list[0].cloneNode(true);
        mv_con.appendChild(first); 
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
    
                switch_lr(mv_con, -index*boxWidth);
            })
        }

        
    }





    arrow(mv,mv_left,mv_right);

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


    let slide_switch__item = mv.querySelectorAll('.slide_switch__item');
    circleNow(slide_switch__item);
    

    

    var flag = true;//节流阀关键

    mv_right.addEventListener('click',function(){
        let slide_switch__item = mv.querySelectorAll('.slide_switch__item');
        console.log(num, circle);
        if(flag == true) {
            flag = false;
            if(num == slide_switch__item.length) {//若走到最后一张图片的前一张图片，则将移动距离清零，并将num也归零
                mv_con.style.left = 0;
                num = 0;
            }
            num++;//若未走到最后一张图片，则num加一
            switch_lr(mv_con,-num*boxWidth,function(){
                flag = true;//当图片移动完全节流阀才打开（回调函数）
            });

            circle++;//圆圈的索引号加一，保持与图片的索引号一致
            if (circle == slide_switch__item.length) {//当走到最后一个小圆圈时，小圆圈的索引号归零
                circle = 0;
            }
            console.log(num,circle);
            circleChange(slide_switch__item);//使相应的小圆圈变白
        }
    })

    mv_left.addEventListener('click',function() {
        let slide_switch__item = mv.querySelectorAll('.slide_switch__item');
        if(flag == true) {
            flag = false;
            if(num == 0) {
                num = slide_switch__item.length; 
                mv_con.style.left = -num*boxWidth + 'px';
            }
            num --;
            switch_lr(mv_con, -num*boxWidth,function() {
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