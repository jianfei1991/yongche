function checkMobile(e){ //手机号检查
  var sMobile = $("#cellphone").val(); 
  if(!(/^((1[35678]{1})+\d{9})$/.test(sMobile))){ 
    alert("请输入正确的手机号码"); 
    $("#cellphone").focus().val(""); 
    return false; 
  }else{
    var url ='/activity/2015/leshi/index.php';
    var data1 = {cellphone:sMobile};
    $.get(url,data1,function(data){
      if(data.code == 200){
        alert('成功参与活动，请注意查收乐码短信');
      }else{
        alert(data.msg)
      }
    },'json');
  }
} 










$("#cellphone").each(function(index, el) {//手机号码输入框提示文字  placeholder
  var _this = $(this);
  var text = _this.val();
  _this.focusin(function(event) {
    if(_this.val() == text){
      _this.val("");
    }
  }).focusout(function(event) {
    if(_this.val() == ""){
      _this.val(text);
    }
  });
});





function getCookie(name){ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
    }
    else {
        return null;
    }
}
function setCookie(name, value){ 
    var argv = setCookie.arguments; 
    var argc = setCookie.arguments.length; 
    var expires = (argc > 2) ? argv[2] : null; 
    if(expires!=null){ 
        var LargeExpDate = new Date (); 
        LargeExpDate.setTime(LargeExpDate.getTime() + (expires*1000*3600*24));         
    } 
    document.cookie = name + "=" + escape (value)+((expires == null) ? "" : ("; expires=" +LargeExpDate.toGMTString())); 
}




// 验证身份证号是否合法
function check(id){
    var id = String(id),
        $WS = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
        $_modMap = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'],
        $sum = 0;
    var $id_17 = id.substring(0,17);
    var $id_last = id.substring(17,18);
    var $len_WS = $WS.length;
    for (var i = 0; i < $len_WS; i++) {
        $sum = $sum + $id_17[i]*$WS[i];
        console.log($sum+"--------"+i);
    };
    var last_num = $sum%11;
    console.log(last_num);
    console.log($_modMap[last_num]);
    console.log($id_last);
}
check("362226199001102113");


function addLoadEvent(func) { // 解决多个window.onload问题
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
   window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
     }
  }
}

function $(dom){
  document.querySelector(dom).css = function(json){
    for(var name in json){
      this.style[name] = json[name];
    }
  }
  return document.querySelector(dom);
}


function addEvent(elm, evType, fn, useCapture) {
    if (elm.addEventListener) {
        elm.addEventListener(evType, fn, useCapture); //DOM2.0
        return true;
    } else if (elm.attachEvent) {
        var r = elm.attachEvent(‘on‘ + evType, fn); //IE5+
        return r;
    } else {
        elm['on' + evType] = fn; //DOM 0
    }
}






function getStyle(obj, name){return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];}
/*
type——运动类型

0   匀速
1   加速
2   减速

'a'   匀速
'b'   加速
'c'   减速

'linear'  匀速
'ease-in' 加速
'ease-out'  减速
*/
function move(obj, json, options)
{
  //time, type, fn
  options=options||{};
  options.time=options.time||300;
  options.type=options.type||'ease-out';

  var start={};
  var dis={};

  for(var name in json) {
    if(name=='opacity') {
      start[name]=parseFloat(getStyle(obj, name));
    } else {
      start[name]=parseInt(getStyle(obj, name));
    }
    dis[name]=json[name]-start[name];
  }

  /*
  console.log('起点', start);
  console.log('终点', json);
  console.log('距离', dis);
  */

  var count=Math.round(options.time/30);
  var n=0;

  clearInterval(obj.timer);
  obj.timer=setInterval(function (){
    n++;

    for(var name in json) {
      switch(options.type) {
        case 'linear':
          var cur=start[name]+dis[name]*n/count;
          break;
        case 'ease-in':
          var a=n/count;
          var cur=start[name]+dis[name]*a*a*a;
          break;
        case 'ease-out':
          var a=1-n/count;
          var cur=start[name]+dis[name]*(1-a*a*a);
          break;
      }

      if(name=='opacity') {
        obj.style.opacity=cur;
        obj.style.filter='alpha(opacity:'+cur*100+')';
      } else {
        obj.style[name]=cur+'px';
      }
    }

    if(n==count) {
      clearInterval(obj.timer);
      options.fn && options.fn();
    }
  }, 30);
}

