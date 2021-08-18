$(function () {
    class Login {
        constructor () {
            this.enroll = $("#enroll");
            this.login = $("#login");
            this.confirmCode = $(".confirmCode");
            this.confirmCodeipt = $(".confirmCode input");
            this.login_btn = $(".login_btn");
            // 表单
            this.form_login = $("#form_login");
            this.event_Login();
            this.rule();
        }

        event_Login() {
            this.enroll.on("click",(e) => {
                this.toggle_Login();
            })
            this.login.on("click", (e) => {
                this.toggle_Login();
            })

            this.form_login.on("submit",(e) => {
                e.preventDefault();
                this.Submit();
            })

        }

        toggle_Login() {
            if (this.login.css("display") == "none") {
                this.confirmCode.show();
                this.confirmCodeipt.attr("name","aginPassword");
                this.confirmCodeipt.attr("lay-verify","required|pwd|repwd");
                this.login_btn.html("注册");
                this.enroll.hide();
                this.login.show();
            } else {
                this.confirmCode.hide();
                this.confirmCodeipt.removeAttr("name");
                this.confirmCodeipt.removeAttr("lay-verify");
                this.login_btn.html("登录");
                this.login.hide();
                this.enroll.show();
            }
        }
        // 注册规则
        rule() {
            let form = layui.form;
            form.verify({
                pwd:[/^[\S]{6,12}$/,"密码必须6到12为，并且不能出现空格"],
                repwd: function (value) {
                   var pwd = $(".loginBox_box input[name=password]").val();
                   if (pwd !== value) return "两次密码不一致";
                }
            })
        }

        // 注册成功
        enrollSuccess() {
            $.post("/api/reguser",{
                username: $(".loginBox_box input[name=username]").val(),password: $(".loginBox_box input[name=password]").val(),
            }, res => {
                if (res.status != 0) return layer.msg(res.message);
                layer.msg(res.message);
                this.login.trigger("click")
                // this.login.click();
            })  
        }

        // 登录成功
        loginRoute() {
            $.ajax({
                method:"POST",
                url:"/api/login",
                // 快速获取表单数据。
                data: $("#form_login").serialize(),
                success: function (res) {
                    if (res.status != 0) return layer.msg("登录失败");
                    layer.msg("登录成功");
                    // 将登录成功得到的 token 字符串，保存到 localstorage 中。
                    localStorage.setItem("token",res.token);
                    // 跳转网页
                    location.href = "/index.html";
                }
            })
        }

        // 提交
        Submit() {
            let layer = layui.layer;
            if (this.login.css("display") == "block") {
                this.enrollSuccess();
            } else {
                this.loginRoute();
            }
        }
    }
    new Login();
})