$(function () {
  class ArtCate {
    constructor() {
      this.layer = layui.layer;
      this.formData = layui.form;
      // 添加类别按钮
      this.btnAddCate = $("#btnAddCate");
      // 表单
      this.form = $("#form-add");
      // 删除按钮
      this.btn_delete = $(".btn-delete");
      this.initArtCateList();
      this.eventCate();
    }

    // 绑定事件
    eventCate() {
      // 添加类别
      this.btnAddCate.on("click",e => {
        this.addCate();
      })

      $("body").on("submit","#form-add" ,e => {
        e.preventDefault();
        this.addArticle();
      })

      $("tbody").on("click",".btn-edit", e => {
        this.emitArticle(e);
      })

      $("body").on("submit","#form-edit", e => {
        e.preventDefault();
        this.emitArticleCate(e);
      })

      $("tbody").on("click",".btn-delete", e => {
        this.deleteArticle(e);
      })

    }
    
    // 删除文章
    deleteArticle(e) {
      var id = $(e.target).attr("data-id");
      console.log(id);
      layer.confirm('确定删除？', {icon: 3, title:'提示'}, index => {
        $.ajax({
          method:"GET",
          url:"/my/article/deletecate/" + id,
          success: res => {
            if(res.status !== 0) return this.layer.msg("删除分类失败");
            this.initArtCateList();
            this.layer.msg("删除分类成功");
            layer.close(index);
          }
        })
        
      });
    }

    // 获取文章分类的列表
    initArtCateList() {
      $.ajax({
        method:"GET",
        url:"/my/article/cates",
        success: res => {
          var str = template("tpl-table",res);
          $("tbody").html(str);
        }
      })
    }

    // 添加文章类别
    addCate() {
      this.indexAdd = this.layer.open({
        area:['500px','300px'],
        type:1,
        title:"添加文章类别",
        content:$("#dialog-add").html(),
      })
    }

    // 修改文章
    emitArticleCate(e) {
      $.ajax({
        method:"POST",
        url:"/my/article/updatecate",
        data:$(e.target).serialize(),
        success: res => {
          if (res.status !== 0) return this.layer.msg("更新数据失败");
          this.layer.msg("更新数据成功");
          this.layer.close(this.indexEdit);
          this.initArtCateList();
        }
      })
    }

    // 修改
    emitArticle(e) {
      this.indexEdit = this.layer.open({
        area:['500px','300px'],
        type:1,
        title:"修改文章类别",
        content:$("#dialog-edit").html(),
      })
      var id = $(e.target).attr("data-id");
      // 发起请求
      $.ajax({
        method:"GET",
        url:"/my/article/cates/" + id,
        success: res => {
          this.formData.val("form-edit",res.data);
          // if ()
          // this.initArtCateList();
        }
      })
    }

    addArticle() {
      $.ajax({
        method:"POST",
        url:"/my/article/addcates",
        data: $("#form-add").serialize(),
        success: res => {
          if(res.status != 0) return this.layer.msg("新增分类失败");
          this.initArtCateList();
          this.layer.msg("新增分类成功");
          this.layer.close(this.indexAdd);
        }
      })
    }

    
  }
  new ArtCate();
})