//<script src="<{asset:u/js/201503/zepto.min.js}>"></script>
// <script>
Zepto(function ($){
  var data = [
    {//第二幕动画内容，分两部分，隐藏和显示 
      "wrapId" : "c0",
      "animateIds" : ["pptit01", "pptit02", "pptit03"  ],
      "animateClass":["pptit01" , "pptit02" , "pptit03" ],  
      "done" : false
    },{  
     //第二幕动画内容，分两部分，隐藏和显示 
     "wrapId" : "c1",
     "animateIds" : ["pp01"],
     "animateClass":[ "pp01"], 
     "done" : false
    },{  
     "wrapId" : "c2",
     "animateIds" : ["pp2_01"],
     "animateClass":["pp2_01"],  
     "done" : false
    },{  
     "wrapId" : "c3",
     "animateIds" : [ "pp3_01", "pp3_02"],
     "animateClass":["pp3_01" ,"pp3_02"],  
     "done" : false
    },{  
     "wrapId" : "c4",
     "animateIds" : [ "pp4_01"],
     "animateClass":["pp4_01"],  
     "done" : false
    },{  
     "wrapId" : "c5",
     "animateIds" : [ "pp5_01","pp5_02"],
     "animateClass":["pp5_01","pp5_02"], 
     "done" : false
    },{  
     "wrapId" : "c6",
     "animateIds" : ["pp6_01","pp6_02","pp6_03"],
     "animateClass":["pp6_01","pp6_02","pp6_03"],  
     "done" : false
    }
  ];

  var filterClass = {
    blur : "blur",
    focus : "focus"
  }
      
  var $w = $(window),$body=$("body"),$loading = $("#loading"),$wrap = $("#wrap"),
      $scrollContent = $("#scrollContent"),$content = $(".content");
  
  var contentLength = $content.size();  

  function initPage(){
    var wH = $body.height(),wW = $body.width();
    $wrap.css({ "height" : wH });
    $scrollContent.css({ "height" : wH*contentLength });
    $content.css({ "height" : wH });
    $(".classname").css({ "top" : parseInt(wW*150/640)+"px" });//图片位置居上边高度 配合 background-size: 100% auto;使用
  } 

  function resize(){
    initPage();
  } 

  function windowLoad(){
    $("#loading").css({display: "none"});
    setTimeout(function(){onTouch.initAddClass()},2000);
    $content.first().addClass("focus");
  }

  var onTouch = {//这里出现的this都是指onTouch
    startY : 0,
    currentTop : 0,
    i_current:0,
    wH:$("body").height(),
    onStart : function (e){
      this.startY = e.pageY;//首次触屏的位置
      this.currentTop = this.i_current*this.wH;//这个值带px单位
      //console.log("首次触屏的位置："+this.startY)
      if($(e.target).hasClass("abtn")){
          this.i_current=1;
          $scrollContent.css({ "-webkit-transform" : "translate3d(0,"+( -this.i_current*this.wH)+ "px,0px)" });
      }
    },
    onMove : function (e){
      event.preventDefault();
    },
    onEnd : function (e){
      //console.log("结束触屏的位置："+e.pageY)
      if (this.startY > e.pageY+50) {//向上划屏幕 e.pageY 越靠上越小
        this.goDown();
      }else if (this.startY < e.pageY-50) {//向下划屏幕
        this.goUp();
      };
    },
    goDown : function(){
      this.i_current++;
      if(this.i_current>contentLength-1){this.i_current=contentLength-1}
      this.contentScroll("down");
    },
    goUp : function(){
      this.i_current--;
      if(this.i_current<0){this.i_current=0}
      this.contentScroll("up");
    },
    contentScroll : function(flag){
      if (flag=="down") {//contentLength总共有几屏幕的内容
        if(this.i_current==0){$("#c0").find(div).css("-webkit-animation-play-state","running");}
        $scrollContent.css({
          "-webkit-transform" : "translate3d(0,"+( -this.i_current*this.wH)+ "px,0px)"
        });
        if(this.i_current==3){$(".box_input").addClass("box_input_current")}
        this.filterClass("down");
      }else if (flag=="up"){
        $scrollContent.css({
          "-webkit-transform" : "translate3d(0,"+( -this.i_current*this.wH)+ "px,0px)"
        }); 
        $(".box_input").removeClass("box_input_current");
        this.filterClass("up");
      };
      this.addClass();
    },
    getCurrentIndex : function(){
      return Math.abs(this.i_current);  
    },
    addClass : function(n){
      var index = this.i_current;
      var currentObj = data[index];
      if (currentObj["done"]) {return;};
      for (var i = 0; i < currentObj["animateIds"].length; i++) {
        $("#" + currentObj["animateIds"][i]).addClass(currentObj["animateClass"][i]);
      };
      currentObj["done"] = true;
    },
    initAddClass : function(){
      this.addClass(0);
    },
    filterClass : function(flag){
      var index = this.getCurrentIndex();
      if (flag=="up" && index < contentLength-1) {
        $("#" + data[index]["wrapId"]).addClass(filterClass.focus);
      }else if (flag=="down" && index > 0) {
        $("#" + data[index]["wrapId"]).addClass(filterClass.focus);
      };
    }
  };
  
  (function(){
    initPage();
    window.onload = windowLoad;
    window.onscroll = scroll;
    window.onresize = false;
    window.onorientationchange = false;

    document.body.addEventListener('touchstart', function (e) {
         e = e.changedTouches[0];
         onTouch.onStart(e);
    });
    document.body.addEventListener('touchmove', function (e) {
      onTouch.onMove(e.changedTouches[0], e);
    });
    document.body.addEventListener('touchend', function (e) {
      onTouch.onEnd(e.changedTouches[0]);
    });
  })();
});
// </script>