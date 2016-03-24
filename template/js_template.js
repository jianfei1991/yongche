//充值模板
$(".link").click(function(){
  if(u.indexOf("YongChe")> -1){//判断app内是否登录
      window.location.href =  "https://pay.yongche.com/touch/rechargerebate/index"
  }else{
      window.location.href = "http://m.yongche.com"
  }
});



//微信禁止分享模板
function onBridgeReady(){
	WeixinJSBridge.call('hideOptionMenu');
}
if (typeof WeixinJSBridge == "undefined"){
	if( document.addEventListener ){
		document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	}else if (document.attachEvent){
		document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
		document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
	}
}else{
	onBridgeReady();
}



