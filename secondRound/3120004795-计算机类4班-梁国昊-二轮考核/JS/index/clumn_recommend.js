window.addEventListener('load', function() {
    const recommend = document.querySelector('#recommend');
    let recommend_left = recommend.querySelector('.arrow_left');
    let recommend_right = recommend.querySelector('.arrow_right');
    arrow(recommend,recommend_left,recommend_right);


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















    var r_num = 0;
    var r_circle = 0;
    let recom_switch = 'mod_slide_switch';

    



    function creat_circle(item1,item2,item3) {
        let con = item1.querySelector(`.${item2}`);
        // console.log(con);
        con.innerHTML = '';
        for(let i = 0; i < item3.length; i++) {
            con.innerHTML += `<a><i class="slide_switch__item "></i></a>`;
        }
    }

    let recom_container = document.querySelectorAll('.recom_container')
    creat_circle(recommend,recom_switch,recom_container)


    let recom_con = document.querySelector('.recom_con');

    // 克隆第一张图片
    var first = recom_container[0].cloneNode(true);
    recom_con.appendChild(first); 
    // let recom_switch = document.querySelector('#recommend').querySelector('.mod_slide_switch');
    // circleOther(recom_con,recommend);



    function circleChange() {
        let item = recommend.querySelectorAll('.slide_switch__item');
        for(var i = 0; i < item.length; i++) {
            item[i].className = 'slide_switch__item';
        }
        item[r_circle].className = 'slide_switch__item current';
    }


        // console.log(item1,item2,item3,left,right);
        var r_flag = true;//节流阀关键
        let width = recom_con.children[0].offsetWidth;
        let slide_switch__item = recommend.querySelectorAll('.slide_switch__item');

        for(var i = 0; i < recom_container.length; i++) {
            // 根据图片的数量创建相应数量的小圆圈
            // var circle_li = document.createElement('li');
            // circle_ol.appendChild(circle_li);
            // circle_li.setAttribute('index', i);

        
            slide_switch__item[i].addEventListener('click', function() {
                // 给所有小圆圈绑定事件，并将其css样式清除
                for(var i = 0; i < slide_switch__item.length; i++) {
                    slide_switch__item[i].className = 'slide_switch__item';
                    slide_switch__item[i].setAttribute('index',i);
                }
        
                this.className = 'slide_switch__item current';//被点击的当前小圆圈变白
        
                var index = this.getAttribute('index');//获取当前小圆圈的索引号        
                r_num = index;
                r_circle = index;
        
                switch_lr(recom_con, -index*width);
            })
        }
        
        slide_switch__item[0].className = 'slide_switch__item current';//开始先使第一个小圆圈变白
        
        
        
        
        recommend_right.addEventListener('click',function(){
            if(r_flag == true) {
                r_flag = false;
                if(r_num == slide_switch__item.length) {//若走到最后一张图片的前一张图片，则将移动距离清零，并将num也归零
                    recom_con.style.left = 0;
                    r_num = 0;
                }
                r_num++;//若未走到最后一张图片，则num加一
                switch_lr(recom_con,-r_num*width,function(){
                    r_flag = true;//当图片移动完全节流阀才打开（回调函数）
                });
        
                r_circle++;//圆圈的索引号加一，保持与图片的索引号一致
                if (r_circle == slide_switch__item.length) {//当走到最后一个小圆圈时，小圆圈的索引号归零
                    r_circle = 0;
                }
                circleChange();//使相应的小圆圈变白
            }
        })
        
        recommend_left.addEventListener('click',function() {
            if(r_flag == true) {
                r_flag = false;
                if(r_num == 0) {
                    r_num = slide_switch__item.length; 
                    recom_con.style.left = -r_num*width + 'px';
                }
                r_num --;
                switch_lr(recom_con, -r_num*width,function() {
                    r_flag = true;
                })
        
                r_circle --;
                if(r_circle < 0) {
                    r_circle = slide_switch__item.length - 1;
                }
                circleChange();
            }
        })














        // let item_2 = recommend.querySelector(`mod_slide_switch`)
        // recommend_right.addEventListener('click',function(){
        //     if(r_flag == true) {
        //         r_flag = false;
    
        //         if(r_num == recom_con.children.length - 1) {//若走到最后一张图片的前一张图片，则将移动距离清零，并将num也归零
        //             recom_con.style.left = 0;
        //             r_num = 0;
        //         }
        //         r_num++;//若未走到最后一张图片，则num加一
        //         switch_lr(recom_con,-r_num*width,function(){
        //             r_flag = true;//当图片移动完全节流阀才打开（回调函数）
        //         });
        
        //         r_circle++;//圆圈的索引号加一，保持与图片的索引号一致
        //         if (r_circle == recom_con.children.length - 1) {//当走到最后一个小圆圈时，小圆圈的索引号归零
        //             r_circle = 0;
        //         }
        //         circleChange();//使相应的小圆圈变白
        //     }
        // })
    
        // recommend_left.addEventListener('click',function() {
        //     if(r_flag == true) {
        //         r_flag = false;
        //         if(r_num == 0) {
        //             r_num = recom_con.children.length - 1; 
        //             recom_con.style.left = -r_num*width + 'px';
        //         }
        //         r_num --;
        //         switch_lr(recom_con, -r_num*width,function() {
        //             r_flag = true;
        //         })
        
        //         r_circle --;
        //         if(r_circle < 0) {
        //             r_circle = item_2.children.length - 1;
        //         }
        //         circleChange();
        //     }
        // })




})