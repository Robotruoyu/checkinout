
const ticket = 'HoagFKDcsGMVCIY2vOjf9kVf7mKeAxUHuaEY4w-R73e6HtWxspsTKcL6SPtFmw9FotRNaEzxGO0qowetXxfRwQ';
const token = '18_YpS8uGssCQiwI6bWu8ZwteME5Te6A1PawaSshSN9W05R85iecrnXOLvATb6y02hbAtJhPUQPfBDi6vH7QV6VPPr9kSSJPSog18WMyUE0Cddo-AN2jU0S3R2CkozIO-FlYJOJpstjZ6tPoXqmWJKjABAMZA';

// const ticket = '';
// const token = '';
const timestamp = Date.now();
const nonceStr = Math.random.toString(16).substr(2);

const urlStr = location.href;
console.log(urlStr);

const originalsignature = 'jsapi_ticket' + ticket
    + 'noncestr' + nonceStr
    + 'timestamp' + timestamp
    + 'url' + urlStr;

var shaObj = new jsSHA('SHA-1', "TEXT");
shaObj.update(originalsignature);
var signature = shaObj.getHash('HEX');

wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wx9c449aad8fc82170', // 必填，公众号的唯一标识
    timestamp: '1548467738137', // 必填，生成签名的时间戳
    nonceStr: '123456789abcdefg', // 必填，生成签名的随机串
    signature: 'f9af98f659ccceb7bcaa04a7b6af37bfb7768586',// 必填，签名
    jsApiList: [
        'checkJsApi',
        'chooseImage',
        'getLocation',
        'openLocation',
        'scanQRCode'
    ] // 必填，需要使用的JS接口列表
});
wx.ready(function () {
    console.log("验证成功");
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
});
wx.error(function (err) {
    console.log(err);
    // this.getToken();
    // this.getTicket();
    // this.getsignature();
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
});
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    },
    mounted() {

    },
    methods: {
        handleCheckInOut() {
            console.log("handleCheckInOut");
        },
        checkJsApi() {
            console.log("checkJsApi");
            wx.checkJsApi({
                jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function (res) {
                    // 以键值对的形式返回，可用的api值true，不可用为false
                    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                    console.log(res);
                }, fail: function (err) {
                    console.log(err);
                }
            });
        },
        chooseImage() {
            console.log("chooseImage");
            wx.chooseImage({
                count: 2, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    // var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    console.log(res);
                },
                fail: function (err) {
                    console.log(err);
                }
            });
        },
        getlocation() {
            console.log('getlocation');
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    // var longitude = ; // 经度，浮点数，范围为180 ~ -180。
                    // var speed = res.speed; // 速度，以米/每秒计
                    // var accuracy = res.accuracy; // 位置精度
                    wx.openLocation({
                        latitude: res.latitude, // 纬度，浮点数，范围为90 ~ -90
                        longitude: res.longitude, // 经度，浮点数，范围为180 ~ -180。
                        name: '', // 位置名
                        address: '', // 地址详情说明
                        scale: 20, // 地图缩放级别,整形值,范围从1~28。默认为最大
                        infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
                    });
                },
                fail: function (err) {
                    console.log(err);
                }
            });
        },
        scanQRCode() {
            wx.scanQRCode({
                needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                }
            });
        },
        getToken() {
            console.log('getToken');



            axios.get('https://api.weixin.qq.com/cgi-bin/token', {
                params: {
                    grant_type: 'client_credential',
                    appid: 'wx9c449aad8fc82170',
                    secret: '2e9537a51f870f003915f96d185c00a6'
                }
            })
                .then(function (response) {
                    console.log(response);
                    token = response.token;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getTicket() {
            axios.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket', {
                params: {
                    access_token: token,
                    type: 'jsapi'
                }
            })
                .then(function (response) {
                    console.log(response);
                    ticket = response.ticket;
                })
                .catch(function (error) {
                    console.log(error);
                });


        },
        getsignature() {
            const timestamp = Date.now();
            const nonceStr = Math.random.toString(16).substr(2);

            const urlStr = location.href;
            console.log(urlStr);

            const originalsignature = 'jsapi_ticket' + ticket
                + 'noncestr' + nonceStr
                + 'timestamp' + timestamp
                + 'url' + urlStr;

            var shaObj = new jsSHA('SHA-1', "TEXT");
            shaObj.update(originalsignature);
            var signature = shaObj.getHash('HEX');
        }
    }
});