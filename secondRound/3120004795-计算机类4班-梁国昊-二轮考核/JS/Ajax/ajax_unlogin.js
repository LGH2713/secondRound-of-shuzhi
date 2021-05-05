window.addEventListener('load', function() {



// 登录框 start
let body = document.querySelector('body');
let body_mask = document.querySelector('.body_mask');
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

    const Header = "http://localhost:3000";  // 默认URL头部1

    let phoneUrl = Header + '/login/cellphone?';


    var userCookie = '?cookie=';

    // 账号密码登录 start
    const btn = document.querySelector('.btn');
    

    btn.addEventListener('click', function() {
        let url = password_login();
        console.log(url);
        AjaxRequest_login(url);
    });

    function password_login() {
        const u = document.getElementById('u');
        const p = document.getElementById('p');
        window.localStorage.setItem('phone',u.value);
        window.localStorage.setItem('password', p.value);
        let result = `${phoneUrl}phone=${u.value}&password=${p.value}`;
        return result; 
    }

    // 1、向服务器发送Ajax请求，并获得cookie
    // 2、通过cookie继续发送别的Ajax请求
    function callback_login(data) {
        if(data) {
            var cookie = encodeURIComponent(data.cookie);
        userCookie += cookie;
        window.localStorage.setItem('cookie', userCookie);
        window.localStorage.setItem('token', encodeURIComponent(data.token));
        window.location.replace('index_logined.html')
        }
    }
    

    function AjaxRequest_login(url) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                // alert(xhr.readyState);
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                    var data = JSON.parse(xhr.responseText);
                    console.log(data);
                    callback_login(data);
                } else {
                    alert("您的输入有误");
                }
                
            }
        }
        xhr.open("GET", url, false);
        xhr.send();
    }

    
    // 账号密码登陆 end






})