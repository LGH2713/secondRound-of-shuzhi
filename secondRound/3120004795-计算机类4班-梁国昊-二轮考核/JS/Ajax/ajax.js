window.addEventListener('load', function() {

    const defaultUrlHeader = "http://musicapi.leanapp.cn"; // 默认URL头部2
    const songsUrlHeader = "http://music.163.com"; // 音乐URL头部

    // Ajax函数封装
    function AjaxRequest(url) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    let data = JSON.parse(xhr.responseText);
                    console.log(data.playlists[0].coverImgUrl);
                } else {
                    alert("Request was unsuccessful：" + xhr.status);
                }
            }
        }
        xhr.open("GET", url, true);
        xhr.send();
    }

    

    let keywordsUrl = defaultUrlHeader + '/top/playlist?limit=10&order=new';
    AjaxRequest(keywordsUrl);

    // AjaxRequest()

     


    // 歌单推荐模块 start


    // 歌单推荐模块 end
})