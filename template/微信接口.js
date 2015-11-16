if (navigator.userAgent.indexOf( 'MicroMessenger' ) >= 0){
  document.addEventListener( 'WeixinJSBridgeReady' ,  function () {
    WeixinJSBridge.call('hideToolbar');//微信去掉下方刷新栏
  });
}