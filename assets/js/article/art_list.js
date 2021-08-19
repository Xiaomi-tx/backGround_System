$(function () {
  class ArtList {
    constructor() {
      this.layer = layui.layer;
      this.layForm = layui.form;
      this.form = $("#form-serach");
      this.data = {
        pagenum: 1, // 页码值
        pagesize: 2, // 一页显示数量
        cate_id: "", // 文章分类ID
        state: "", // 文章发布状态
      }
      this.initTable();
      this.initCate();
      this.event();
    }
    // 获取文章数据方法
    initTable() {
      $.ajax({
        method:"GET",
        url:"/my/article/list",
        data: this.data,
        success: res => {
          if (res.status != 0) return this.layer.msg("获取文章列表失败");
          // 使用模板引擎渲染数据。
          var htmlStr = template("tpl-table",res);
          $("tbody").html(htmlStr);
        }
      })
    }

    // 绑定事件
    event() {
      this.form.on("submit",e => {
        e.preventDefault();
        // 获取表单中选中的值
        this.filterData();
        
      })
    }

    // 筛选数据
    filterData() {
      var cate_id = $("[name=cate_id]").val();
      var state = $("[name=state]").val();
      this.data.cate_id = cate_id;
      this.data.state = state;
      // 根据最新筛选条件，重新渲染数据。
      this.initTable();
      console.log(this.data);
    }

    // 美化时间过滤器
    beautifyData() {
      template.defaults.imports.dataFormat = (date,format = "YYYY-MM-DD HH-mm-SS") => {
        const dt = new Date(date);
        // 年
        const config = {
          YYYY: dt.getFullYear(),
          MM: dt.getMonth(),
          DD: dt.getDate(),
          HH: dt.getHours(),
          mm: dt.getMinutes(),
          SS: dt.getSeconds(),
        }
        
        for (const key in config) {
          config[key] < 10 ? "0" + config[key] : config[key];
          format = format.replace(key,config[key]);
        }
        return format;
      }
    }

    // 初始化文章分类
    initCate() {
      $.ajax({
        method:"GET",
        url:"/my/article/cates",
        success: res => {
          if (res.status !== 0) return this.layer.msg("获取分类数据失败");
          var htmlStr = template("tpl-cate",res);
          $("select[name=cate_id]").html(htmlStr);
          this.layForm.render();
        }
      })
    }
  }
  new ArtList();
})