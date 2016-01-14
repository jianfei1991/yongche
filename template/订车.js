//马上订车
var city='<?=$gCity?>';
$("#order_car").click(function() {
    if (navigator.userAgent.indexOf('YongChe') != -1) {
        window.location.href = "yongche://neworder?car_type_id=55&type=asap&city="+city;
    } else {
        window.location.href = "http://m.yongche.com";
    }
});  