window.addEventListener('load', function() {
    // 登录框 start
    let body = document.querySelector('body');
    let body_mask = document.querySelector('.body_mask')
    let mod_popup = document.querySelector('.mod_popup');
    let top_login__link = document.querySelector('.top_login__link');
    let popup__close = document.querySelector('.popup__close');
    let qq_login = document.querySelector('.qq_login');
    let wx_login = document.querySelector('.wx_login');
    let qq = document.getElementById('qq');
    let wx = document.getElementById('wx');


    wx.addEventListener('click', function() {
        wx_login.style.display = 'block';
        qq_login.style.display = 'none';
        wx.style.color = '#31c27c';
        qq.style.color = '#000';
    });

    qq.addEventListener('click', function() {
        qq_login.style.display = 'block';
        wx_login.style.display = 'none';
        qq.style.color = '#31c27c';
        wx.style.color = '#000';
    })

    top_login__link.addEventListener('click', function() {
        mod_popup.style.display = 'block';
        body.style = "overflow-y: hidden;";// 使滚动条消失
        body_mask.style.display = 'block';


        let qq_ewm_login = document.querySelector('.qq_ewm_login');
        let combine_page = document.querySelector('.combine_page');
        let bq_1 = document.getElementById('bq_1');
        let bq_2 = document.getElementById('bq_2');
        let link = document.getElementById('link');



        let link_1 = document.querySelector('.link_1');
        link_1.addEventListener('click', function() {
            qq_ewm_login.style.display = 'none';
            bq_1.style.display = 'none';
            combine_page.style.display = 'block';
            bq_2.style.display = 'block';

            let uin_number = document.querySelector('.uin');
            let uin_tips = document.getElementById('uin_tips');
            // uin_number.style.border = '1px solid #1E6FFF';

            let password = document.querySelector('.password');
            let password_tips = document.getElementById('password_tips');

            if(uin_number.value.length == 0) {
                uin_number.focus();
            } else if(password.value.length == 0) {
                password.focus();
            }

            input_login(uin_number, uin_tips);
            input_login(password, password_tips);
        });

        
        link.addEventListener('click', function() {
            qq_ewm_login.style.display = 'block';
            bq_1.style.display = 'block';
            combine_page.style.display = 'none';
            bq_2.style.display = 'none';
        })



        function input_login(obj1,obj2) {
            obj1.addEventListener('focus', function() {
            this.style.border = '1px solid #1E6FFF';
            obj2.style.opacity = 0.5;
        })
        obj1.addEventListener('keydown', function() {
            obj2.style.display = 'none';
            
            obj1.addEventListener('keyup', function() {
                if(obj1.value.length == 0 ) {
                    obj2.style.display = 'block';
                }
            })
        })
        obj1.addEventListener('blur', function() {
            this.style.border = '1px solid #CBCDD1';
            obj2.style.opacity = 1;
            if(obj1.value.length == 0 ) {
                obj2.style.display = 'block';
            }
        })
        }
    });

    popup__close.addEventListener('click', function() {
        mod_popup.style.display = 'none';
        body.style = "";
        body_mask.style.display = 'none';
    })


    


    // 登录框 end





















    const song_list = document.querySelector('.song_list');
    // const song_list_playlist__list = song_list.querySelector('.playlist__list');
    let song_list_left = song_list.querySelector('.arrow_left');
    let song_list_right = song_list.querySelector('.arrow_right');

    const new_song = document.querySelector('#new_song');
    // const new_song_playlist__list = new_song.querySelector('.playlist__list');
    let new_song_left = new_song.querySelector('.arrow_left');
    let new_song_right = new_song.querySelector('.arrow_right');

    const recommend = document.querySelector('#recommend');
    // const recommend_playlist__list = recommend.querySelector('.playlist__list');
    let recommend_left = recommend.querySelector('.arrow_left');
    let recommend_right = recommend.querySelector('.arrow_right');

    const mv = document.querySelector('#mv');
    // const mv_playlist__list = mv.querySelector('.playlist__list');
    let mv_left = mv.querySelector('.arrow_left');
    let mv_right = mv.querySelector('.arrow_right');

    arrow(song_list, song_list_left, song_list_right);
    arrow(new_song, new_song_left, new_song_right);
    arrow(recommend, recommend_left, recommend_right);
    arrow(mv, mv_left, mv_right);

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

    // 歌单推荐模块 start
    let playlist__list_1 = document.querySelector('.playlist__list_1');
    for(let i = 0; i < 10; i++) {
        playlist__list_1.innerHTML += '<li class="playlist__item slide__item"><div class="playlist__item_box"><div class="playlist__cover mod_cover"><a href="#" class="js_playlist"><img src="../image/u=2746384919,2327107392&fm=26&gp=0.jpg" alt=""class="playlist__pic"><i class="mod_cover__mask"></i><i class="icon-play2 f"></i></a></div><h4 class="playlist__title"><span class="playlist__title_txt"><a href="#" class="js_playlist">1111111111</a></span><div class="playlist__other">44444444</div></h4></div></li>'
    }

    let playlist__item_1 = playlist__list_1.querySelectorAll('li');
    let width = (playlist__item_1[0].offsetWidth + 20) * playlist__item_1.length;
    let mod_slide_switch = document.querySelector('.mod_slide_switch');
    for(let i = 0; i < Math.floor(width/1200); i++) {
        mod_slide_switch.innerHTML += '<a><i class="slide_switch__item "></i></a>';
    }

    // 歌单推荐模块 end


})