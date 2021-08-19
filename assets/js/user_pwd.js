$(function () {
    class User_pwd {
        constructor () {
            this.form = layui.form;
            // 表单
            this.userPwdForm = $(".layui-form");
            this.rule();
            this.eventUserpwd();
        }


        // 绑定事件
        eventUserpwd() {
            this.userPwdForm.on("submit", e => {
                e.preventDefault();
                $.ajax({
                    method:"POST",
                    url:"/my/updatepwd",
                    data: this.userPwdForm.serialize(),
                    success: res => {
                        if (res.status !== 0) return layui.layer.msg("更新密码失败");
                        layui.layer.msg("更新密码成功");
                        // 重置表单
                        this.userPwdForm[0].reset();
                    }
                })
            })
        }

        // 规则
        rule() {
            this.form.verify({
                pwd:[
                    /^[\S]{6,12}$/
                    ,'密码必须6到12位，且不能出现空格'
                ],
                samePwd: val => {
                    if (val === $("[name=oldPwd]").val()) return "新旧密码不能相同";
                },
                rePwd: val => {
                    if (val !== $("[name=newPwd]").val()) return "两次密码不一致";
                }
            })
        }
    }
    new User_pwd();
})