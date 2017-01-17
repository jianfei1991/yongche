<?php 
    define('NO_AUTH',1);
    require $_SERVER['PHP_ROOT'] . 'init.inc.php';
    $url = YC_Util::getCurrentUrl();
    $js_data = YC_Util::getWeixinSignature($url);  
?>

<script src="<{asset:js/jquery/jquery-1.8.3.min.js}>"></script>
<script src="<?=$a['js/app/i/weixin/js-api.min.js']?>"></script>



<body>
  <img id="shareImg" src="" style="position:fixed;left:-100%;" />
  <iframe frameborder="0" style="display: none;" id="share_iframe"></iframe>
</body>




(function () {//分享
  var shareImg = "";//分享图
  var shareTitle = "主标题";//主标题
  var timeStr = "副标题";//副标题

  document.title = shareTitle;
  document.getElementById("shareImg").src = shareImg;


  /**start of 端内分享**/
  var _protocolLinkBase = "yongche://share?";
  var _protocolLinkFriend = "yongche://shareToFriend?";
  var _protocolLinkTimeline = "yongche://shareToTimeline?";
  var shareRead_link = encodeURIComponent(location.href);// 分享地址
  var shareRead_pics = encodeURIComponent(shareImg);// 分享的图片
  var shareRead_title = encodeURIComponent(shareTitle);// 分享的标题
  var shareRead_content = encodeURIComponent(timeStr);// 分享的内容
  var shareRead_sourceType = 42;

  var Tools = {
    str:"link="+shareRead_link+"&pics="+shareRead_pics+"&title="+shareRead_title+"&content="+shareRead_content+"&sourceType="+shareRead_sourceType,
    shareThisPageToFriend:function(){
        var _tmpOpenLink = _protocolLinkFriend + this.str;
        window.location.href = _tmpOpenLink;
    },
    shareThisPageToTimeline:function(){
        var _tmpOpenLink = _protocolLinkTimeline + this.str;
        window.location.href = _tmpOpenLink;
    },
    shareBase:function(){
        var _tmpOpenLink = _protocolLinkBase + this.str;
        window.location.href = _tmpOpenLink;
    }
  };
  var _str = Tools.str+"&from=iframe";
  var _tmpOpenLink = _protocolLinkBase + _str;
  if (navigator.userAgent.indexOf('YongChe') != -1) {
    document.getElementById("share_iframe").src = _tmpOpenLink;//防止端外通过协议不断打开易到APP
  }
  /**end of 端内分享**/



  /**start of 二次分享**/
  var shareData ={
      "title": shareTitle,
      "desc": timeStr,
      "imgUrl" : shareImg,
      "link" : window.location.href
  };
  var wxConfig = [];
  wxConfig = <?= $js_data ? json_encode($js_data) : '[]';?>;
  var callback = {};
  var c =  new WxJsApi(wxConfig,shareData,callback);
  c.init();
})()