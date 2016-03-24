var WxJsApi = function Weixin(a, b, c) {
    this.init = function() {
        $.getScript("http://res.wx.qq.com/open/js/jweixin-1.0.0.js", function() {
            wx.config({ debug: a.debug || false, appId: a.appId, timestamp: a.timestamp, nonceStr: a.nonceStr, signature: a.signature, jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "hideOptionMenu", "showOptionMenu"] });
            wx.ready(function() {
                wx.checkJsApi({ jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] });
                wx.onMenuShareAppMessage({ title: b.title || b.tile, desc: b.desc || b.desc, link: b.link || b.link, imgUrl: b.imgUrl || b.imgUrl, trigger: function(d) { c.shareAppMessage && c.shareAppMessage.trigger && c.shareAppMessage.trigger() }, success: function(d) { c.shareAppMessage && c.shareAppMessage.success && c.shareAppMessage.success() }, cancel: function(d) { c.shareAppMessage && c.shareAppMessage.cancle && c.shareAppMessage.cancle() }, fail: function(d) { c.shareAppMessage && c.shareAppMessage.fail && c.shareAppMessage.fail() } });
                wx.onMenuShareTimeline({ title: b.title || b.tile, link: b.link || b.link, imgUrl: b.imgUrl || b.imgUrl, trigger: function(d) { c.shareTimeline && c.shareTimeline.trigger && c.shareTimeline.trigger() }, success: function(d) { c.shareTimeline && c.shareTimeline.success && c.shareTimeline.success() }, cancel: function(d) { c.shareTimeline && c.shareTimeline.cancle && c.shareTimeline.cancle() }, fail: function(d) { c.shareTimeline && c.shareTimeline.fail && c.shareTimeline.fail() } })
            })
        })
    }
};
