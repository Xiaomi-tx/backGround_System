$(function () {
    class User {
        constructor () {
            this.form = layui.form;
            this.layer = layui.layer;
            // 重置按钮
            this.btnReset = $("#btnReset");
            // 表单
            this.userForm = $(".layui-form");
            this.rule();
            this.initUserInfo();
            this.eventUser();
        }

        // 绑定事件
        eventUser() {
            this.btnReset.on("click", e => {
                // 阻止表单默认重置行为
                e.preventDefault();
                this.resetData();
            })
            this.userForm.on("submit", e => {
                // 阻止表单默认行为
                e.preventDefault();
                // 发起ajax请求
                $.ajax({
                    method:"POST",
                    url:"/my/userinfo",
                    data: this.userForm.serialize(),
                    success: res => {
                        if (res.status !== 0) return this.layer.msg("更新用户失败");
                        this.layer.msg("更新用户信息成功");
                        // 调用父页面的方法 
                        window.parent.index.getUserInfo();
                    }
                })
            })
        }

        // 验证规则
        rule() {
            this.form.verify({
                nickname: value => {
                    if (value.length > 6) {
                        return "昵称长度必须在 1 ~ 6 个字符之间!";   
                    }
                }
            })
        }
        //初始化用户信息
        initUserInfo() {
            $.ajax({
                url:"/my/userinfo",
                method:"GET",
                success: res => {
                    if (res.status != 0) return this.layer.msg("获取用户信息失败！");
                    console.log(res);
                    this.form.val("formUserInfo",res.data);
                }
            })
        }

        // 重置表单数据
        resetData() {
            this.initUserInfo();
        }

        // 表单提交
        UserFormSubmit() {

        }
    }
    new User();
})