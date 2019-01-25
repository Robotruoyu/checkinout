
const ticket = 'HoagFKDcsGMVCIY2vOjf9kVf7mKeAxUHuaEY4w-R73fYAYhcLSH9_CILfosVTxZe6FJgNzW9n7kdrz41VYkKag';
const token = '17_oiBeny7TgKruI1hW76oQ_LwZ6RsMwhiTmYiR6zxj5r8FvT3PV4gPoiu5W0o2Eu_8Yl_lCC82eaAUgj8qi3DBMcx35pgs6T94itHm6npG7yJLwUFB5nvHE54STExoRhrR6cXaZMlOpwofhwH7JWRjAIACPK';

wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wx9c449aad8fc82170', // 必填，公众号的唯一标识
    timestamp: 1548385178571, // 必填，生成签名的时间戳
    nonceStr: '123456789abcdefg', // 必填，生成签名的随机串
    signature: '0f7328c6670487a1844137394d8a062c6d06b2e8',// 必填，签名
    jsApiList: [
        'checkJsApi'
    ] // 必填，需要使用的JS接口列表
});
wx.ready(function(){
    console.log("验证成功");
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
});
wx.error(function(err){
    console.log(err);
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
});
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    },
    methods:{
        handleCheckInOut(){
            console.log("handleCheckInOut");
        },
        checkJsApi(){
            wx.checkJsApi({
                jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function(res) {
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                }
            });
        }
    }
});