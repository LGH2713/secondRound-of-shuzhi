window.addEventListener('load', function() {
    const defaultUrlHeader_1 = "https://autumnfish.cn";  // 默认URL头部1
    const defaultUrlHeader_2 = "http://musicapi.leanapp.cn"; // 默认URL头部2
    let userCookie = window.localStorage.getItem("cookie");
    console.log(userCookie);

    const login_status = defaultUrlHeader_1 + '/login/status' + userCookie;
    AjaxRequest_msg(login_status);


    function callback_logined(data) {
        let userPic = document.querySelector('.userPic');
        userPic.innerHTML = `<img src="${data.profile.avatarUrl}" alt="" class="pic">`;

        let userDetail = document.querySelector('.userDetail');
        userDetail.innerHTML = `<img src="${data.profile.avatarUrl}" alt="" class="list_img">
        <div class="user_name">
            <span class="user_name_con">
                <p style="font-size: 18px; color: #333; margin-bottom: 3px">${data.profile.nickname}</p>
                <p style="font-size: 12px; color: #999999;">欢迎您的登录~</p>
            </span>
        </div>`

        const user_select_list = document.querySelector('.user_select_list');
        user_select_list.innerHTML = `<li class="user_select_list_item">
        <span class="user_select_list_item_pay">绿钻豪华版</span>
        <i>开通立即赠送付费音乐包</i>
        <span class="to_pay">开通</span>
        </li>
        <li class="user_select_list_item">
        <span class="user_select_list_item_pay">付费音乐包</span>
        <i>畅享千万包月曲库</i>
        <span class="to_pay">开通</span>
        </li>
        <li s="user_select_list_item" id="comment">评论通知</li>
        <li s="user_select_list_item" id="login_out">退出登录</li>`;



        const pic = document.querySelector('.pic');
        const user_container = document.querySelector('.user_container');
        let user_select = document.querySelector('.user_select');
        var h = 0;




        const login_out = document.querySelector('#login_out'); 
        // let userCookie = window.localStorage.getItem("cookie");
        const loginOutUrl = defaultUrlHeader_1 + '/login/status' + userCookie;
        login_out.addEventListener('click', function() {
            AjaxRequest_loginOut(loginOutUrl);
        })

    }

    function callback_loginedOut() {
        localStorage.clear();
        let login_refresh = defaultUrlHeader_1 + '/login/refresh' + userCookie;
        AjaxRequest_msg(login_refresh);
        window.location.replace('index.html');
    };



    



    function AjaxRequest_msg(url) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                // alert(xhr.readyState);
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                    let data = JSON.parse(xhr.responseText);
                    console.log(data);
                    if(data.profile) {
                        callback_logined(data);
                    } 
                } else {
                    alert("Request was unsuccessful：" + xhr.status);
                }
            }
        }
        xhr.open("GET", url, true);
        xhr.send();
    }


    function AjaxRequest_loginOut(url) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                // alert(xhr.readyState);
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 301 || xhr.status == 304) {
                    let data = JSON.parse(xhr.responseText);
                    console.log(data);
                    callback_loginedOut();
                } else {
                    alert("Request was unsuccessful：" + xhr.status);
                }
            }
        }
        xhr.open("GET", url, true);
        xhr.send();
    }
})