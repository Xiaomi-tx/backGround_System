// 注意：每次调用 jquery 的 get 或者 post 或者 ajax 的时候。
// 会先调用 ajaxPrefilter 这个函数

$.ajaxPrefilter(function (opt) {
    opt.url = "http://api-breakingnews-web.itheima.net" + opt.url;
    console.log(opt.url);
}) 