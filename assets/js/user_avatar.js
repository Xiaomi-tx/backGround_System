$(function () {
    class UserAvatar {
        constructor () {
            this.layer = layui.layer;
            // 上传按钮
            this.btnChooseImg = $("#btnChooseImg");
            // 上传文件
            this.file = $("#files");
            // 确定按钮
            this.btnUpload = $("#btnUpload");
            this.tailor();
            this.eventUserAvatar();
        }
        
        // 实现裁剪功能
        tailor() {
            // 1.1 获取裁剪区域的 DOM 元素
            this.$image = $('#image')
            // 1.2 配置选项
            this.options = {
                // 纵横比
                aspectRatio: 1,
                // 指定预览区域
                preview: '.img-preview'
            }

            // 1.3 创建裁剪区域
            this.$image.cropper(this.options)
        }   

        headUpLoading(e) {
            var filelist = e.target.files;
            if (filelist.length == 0) return this.layer.msg("请选择图片")
            
            var file = e.target.files[0];
            var imgURL = URL.createObjectURL(file);
            this.$image
                .cropper('destroy')      // 销毁旧的裁剪区域
                .attr('src', imgURL)  // 重新设置图片路径
                .cropper(this.options)        // 重新初始化裁剪区域
        }

        eventUserAvatar() {
            this.btnChooseImg.on("click", e => {
                this.file.click();
            })
            // 为文件选择框
            this.file.on("change", e => {
                this.headUpLoading(e);
            })

            this.btnUpload.on("click", e => {
                var dataURL = this.$image
                    .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                        width: 100,
                        height: 100
                    })
                    .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

                $.ajax({
                    method:"POST",
                    url:"/my/update/avatar",
                    data: {
                        avatar: dataURL,
                    },
                    success: res => {
                        if (res.status != 0) return this.layer.msg("更换头像失败");
                        this.layer.msg("更换头像成功");
                        window.parent.index.getUserInfo();
                    }
                })
            })
        }
    }
    new UserAvatar();
})