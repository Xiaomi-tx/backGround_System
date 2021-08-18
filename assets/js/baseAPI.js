// 注意：每次调用 jquery 的 get 或者 post 或者 ajax 的时候。
// 会先调用 ajaxPrefilter 这个函数

$.ajaxPrefilter(function (opt) {
    opt.url = "http://api-breakingnews-web.itheima.net" + opt.url;
    if (opt.url.indexOf('/my/') != -1) {
        opt.headers = {
            Authorization:localStorage.getItem("token") || "",
        }
    }

    // 全集统一挂载 complete 回调函数
    opt.complete = res => {
        if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
            // 1. 强制清空 token
            localStorage.removeItem("token");
            // 2. 强制跳转
            location.href = "/login.html";
        }
    }
}) 