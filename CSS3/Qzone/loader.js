/**
* @fileOverview 鍏叡缁勪欢鍔犺浇鍣�
* @author Viktor Li
*/

;(function () {
    try{document.domain="qzone.qq.com";}catch(e){try{document.domain="qzone.com";}catch(e){document.domain="qq.com";}}
    window.debug = location.host.match(/^(ttest|touch)\.qzs(\.qzone)?\.qq\.com$/i);

    //鍏叡搴撶殑鐗堟湰鍙枫€佹椂闂存埑閰嶇疆
     window.qzaVer = window.qzaVer || {
            sea:'2.1.2',
            jquery: '1.10.2',
            '@lib@': 'index.r201602171329440.js'	//  lib/index.js鐨勬椂闂存埑锛岀敱JSC缂栬瘧鍚堝苟鏃惰嚜鍔ㄧ敓鎴�
    };

    var _CDN = location.protocol+'//qzonestyle.gtimg.cn',
         _JQ = _CDN+'/ac/lib/jquery/'+qzaVer.jquery+'/jquery.js';

    if(debug && debug[1]){
        _CDN = location.protocol+'//'+debug[1]+'.qzonestyle.gtimg.cn';
        //鍔犺浇touch鍩熷悕鐨刢ss
        var links = document.getElementsByTagName('link'),
            head = document.getElementsByTagName('head')[0],
            length = links.length;
        for(var i = 0; i < length; i++){
            var href = links[i].href.replace(/(https?:\/\/)([a-zA-Z0-9\.]+)(\/)/,'$1ttest.qzonestyle.gtimg.cn$3');
            links[i].href = href;
        }
    }

    /** 寮傛鍔犺浇js
     * @param url   闇€瑕佸姞杞界殑js鍦板潃
     * @param id   鐢熸垚鐨剆cript鏍囩id
     */
    function loadJS(url,id) {
        var doc = document,
             ele = doc.createElement('script'),
             hd = doc.getElementsByTagName('head')[0];	//HTML蹇呴』鏈塰ead锛屼笉鍋氬閿�
        if(id) {
            ele.id = id+'node';
        }
        ele.async = true;
        ele.src = url;
        hd.appendChild(ele);
    }

    /** seajs鐨勯鐢虫槑锛堥渶瑕乻eajs鏀寔寮傛鍔犺浇鏂瑰紡锛宻eajs2.0涔嬪悗闇€瑕佹敼婧愮爜鏀寔锛�
     */
    function initSea(m, o, d, c,u, l, a, r) {
        if(m[o]) return;
        function f(n) { return function() { r.push(n, arguments); return a } }
        m[o] = a = { args: (r = []), config: f(1), use: f(2) };
        m.define = f(0);
        var qzlib;
        if(debug){
            qzlib = 'qzact.v8/lib/index.js?max_age=20141016';
        }else{
            qzlib = 'qzact.v8/lib/' + qzaVer['@lib@']+'?max_age=20141016';
        }
        //seajs鍏敤閰嶇疆
        m[o].config({
            charset: 'utf-8',
            base:_CDN+'/qzone/qzact/',
            paths:{
                'v8':   _CDN+'/qzone/v8',
                'mall.v8':_CDN+"/qzone/mall/v8",
                'qzact.v8': _CDN + '/qzone/qzact',		//鏃х増鍒悕锛岄渶瑕佷繚鐣欏吋瀹规棫浠ｇ爜
                'qzact': _CDN + '/qzone/qzact',
                'cssBase': _CDN
            },
            alias: {
                'qzact.v8.lib': qzlib,	//鏃х増鍒悕
                'qzact.lib': qzlib,
                'jquery': _JQ,
                'qqapi' : location.protocol+'//pub.idqqimg.com/qqmobile/qqapi.js?_bid=152',
                'wx_jssdk' : location.protocol+'//res.wx.qq.com/open/js/jweixin-1.0.0.js',
                'qzoneapi' : location.protocol+'//qzonestyle.gtimg.cn/qzone/phone/m/v4/widget/mobile/jsbridge.js?_bid=339'
            },
            map: [
                [/^.+\/lib\/jquery\.js/,_JQ]
            ]
        });

        loadJS(c+'/ac/lib/sea/'+qzaVer.sea+'/sea.js',o + 'node');

        //棰勫姞杞絡query銆乹zlib
        m[o].use('jquery');
        m[o].use('qzact.lib');
    }

    //鍔犺浇seajs
    if(!window.seajs) {
        initSea(window,'seajs',document,_CDN);
    }

    //榛勯捇icon
    (function () {
        var hd = document.getElementsByTagName('head'),
             icon;

        hd = hd&&hd[0];
        if(hd) {
            icon = document.createElement('link');
            icon.setAttribute('rel','Shortcut Icon');
            icon.setAttribute('href',_CDN+'/aoi/img/logo/favicon.ico?max_age=31536000');
            icon.setAttribute('type','image/x-icon');
            hd.appendChild(icon);
        }
    })();
    
    //寰俊瀹氬埗鍒嗕韩锛屾妸url涓婄殑sid鍘绘帀锛岄槻姝㈡湭瀹氬埗鐨勬椿鍔ㄥ甫鍑簊id
    if(navigator.userAgent.indexOf('MicroMessenger') !== -1) {

        (function(){
            var shareContent = {
                "title" : document.title,
                "link": location.href.replace(/(\?|&)sid=(.*?)(&|#|$)/, '$1$3').replace("\?&", "?").replace(/&{2}/, "&").replace(/[&?]$/, "")
            };

            var _share = function() {

                try {
                    // 鍒嗕韩鍒版湅鍙嬪湀
                    WeixinJSBridge.on('menu:share:timeline', function (argv) {
                        WeixinJSBridge.invoke('shareTimeline', shareContent, function (res) {});
                    });
                    // 鍙戦€佺粰濂藉弸
                    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
                        WeixinJSBridge.invoke('sendAppMessage', shareContent, function (res) {});
                    });
                } catch (e) {
                    // do nothing
                }
            };
            if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
                _share();
            } else {
                if (document.addEventListener) {
                    document.addEventListener("WeixinJSBridgeReady", _share, false);
                } else if (document.attachEvent) {
                    document.attachEvent("WeixinJSBridgeReady", _share);
                    document.attachEvent("onWeixinJSBridgeReady", _share);
                }
            }
        })()
    }else if(navigator.userAgent.indexOf('Qzone/') !== -1) {
        //qzone鐙珛鐗�
        seajs.use(location.protocol+'//qzonestyle.gtimg.cn/qzone/phone/m/v4/widget/mobile/jsbridge.js',function(){
            if(QZAppExternal && QZAppExternal.setShare) {
                var params = {
                    "share_url" : location.href.replace(/(\?|&)sid=(.*?)(&|#|$)/, '$1$3').replace("\?&", "?").replace(/&{2}/, "&").replace(/[&?]$/, ""),
                    "title" : "",
                    "desc" : "" ,
                    "image_url" : ""
                };
                var imageArr = [],
                    titleArr = [],
                    summaryArr = [],
                    shareURLArr = [];
                for(var i =0;i < 5; i++) {
                    imageArr.push(params.image_url);
                    titleArr.push(params.title);
                    summaryArr.push(params.desc);
                    shareURLArr.push(params.share_url);
                }
                QZAppExternal.setShare(function(data){
                }, {
                    'type' : "share",
                    'image' : imageArr,
                    'title' : titleArr,
                    'summary' : summaryArr,
                    'shareURL' : shareURLArr
                });
            }
        });
    }

})();