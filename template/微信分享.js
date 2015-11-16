(function () {//分享
  var shareImg = "";
  var shareTitle = "";

  document.title = shareTitle;
  document.getElementById("shareImg").src = shareImg;
    // 分享变量设置
  var _protocolLinkBase = "yongche://share?";
  var _protocolLinkFriend = "yongche://shareToFriend?";
  var _protocolLinkTimeline = "yongche://shareToTimeline?";
  var shareRead_link = encodeURIComponent(location.href);// 分享地址
  var shareRead_pics = encodeURIComponent(shareImg);// 分享的图片
  var shareRead_title = encodeURIComponent(shareTitle);// 分享的标题
  var shareRead_content = encodeURIComponent('');// 分享的内容
  var shareRead_sourceType = 42;

  var Tools = {
    shareThisPageToFriend:function(){
        var _str = "link="+shareRead_link+"&pics="+shareRead_pics+"&title="+shareRead_title+"&content="+shareRead_content+"&sourceType="+shareRead_sourceType;
        var _tmpOpenLink = _protocolLinkFriend + _str;
        window.location.href = _tmpOpenLink;
    },
    shareThisPageToTimeline:function(){
        var _str = "link="+shareRead_link+"&pics="+shareRead_pics+"&title="+shareRead_title+"&content="+shareRead_content+"&sourceType="+shareRead_sourceType;
        var _tmpOpenLink = _protocolLinkTimeline + _str;
        window.location.href = _tmpOpenLink;
    },
    shareBase:function(){
        var _str = "link="+shareRead_link+"&pics="+shareRead_pics+"&title="+shareRead_title+"&content="+shareRead_content+"&sourceType="+shareRead_sourceType;
        var _tmpOpenLink = _protocolLinkBase + _str;
        window.location.href = _tmpOpenLink;
    }
  };
  var _str = "link="+shareRead_link+"&pics="+shareRead_pics+"&title="+shareRead_title+"&content="+shareRead_content+"&sourceType="+shareRead_sourceType+"&from=iframe";
  var _tmpOpenLink = _protocolLinkBase + _str;
  document.getElementById("share_iframe").src = _tmpOpenLink;
})()


// <iframe frameborder="0" style="display: none;" id="share_iframe"></iframe>