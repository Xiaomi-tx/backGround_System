$(function () {
    class Index {
        constructor() {
            this.username = $("#welcome");
            // 用户头像
            this.userHead = $(".layui-nav-img"); 
            //文本头像
            this.testHead = $(".text-avatar");
            // 退出
            this.out = $("#btnLogout");
            this.layer = layui.layer;
            this.getUserInfo();
            this.eventIndex();
        }

        // 绑定事件
        eventIndex() {
            this.out.on("click", (e) => {
                this.layer.confirm('确定退出登录', {icon: 3, title:'提示'}, index => {    
                    
                    // 1. 清空本地存储的 token
                    localStorage.removeItem("token");
                    // 2. 跳转到登录页
                    location.href = "/login.html";
                    this.layer.close(index);

                });
            })
        }

        // 渲染用户头像
        renderAvatar(user) {
            // 1. 获取用户名称
            this.name = user.data.nickname || user.data.username; 
            let reg = /(?:\*\*\*)+/;
            let b = this.username.text().match(reg);
            this.username.text(this.username.text().replace(b,this.name));

            // 2. 渲染头像
            if (user.data.user_pic != null) {
                // 渲染图片头像
                this.userHead.attr("src",user.data.user_pic).show();
                this.testHead.hide();
            } else {
                // 渲染文本头像
                this.userHead.hide();
                this.testHead.show();
                var firt = this.name[0].toUpperCase();
                this.testHead.html(firt);
            }
        }
        // 获取用户数据
        getUserInfo() {
            $.ajax({
                method:"GET",
                url:'/my/userinfo',
                // 请求头 配置对象
                // headers: {
                //     Authorization: localStorage.getItem("token") || "",
                // },
                success: res => {
                    if (res.status != 0) return layui.layer.msg("获取用户信息失败");
                    this.renderAvatar(res);
                },
                // complete: res => {
                //     if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
                //        // 1. 强制清空 token
                //        localStorage.removeItem("token");
                //        // 2. 强制跳转
                //        location.href = "/login.html";
                //     }
                // }
             })
            
        }
    }
    let index = new Index();
    window.index = index;
})

