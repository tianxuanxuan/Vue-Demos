/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/

var app = new Vue({
    el: "#player",
    data: {

        //搜索关键字
        query: "",
        //歌曲列表
        musicList: [],
        //歌曲url
        musicUrl: "",
        //歌曲封面
        musicCover: "",
        //热门评论
        hotComments: [],
        //音乐播放状态
        isPalying:false,
        //遮罩层状态
        isShow: false,
        //mv播放url
        mvUrl: ""
    },
    methods: {
        //搜索歌曲方法
        searchMusic:function(){
            var that=this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.query)
            .then(function(response){
                //console.log(response);
                that.musicList=response.data.result.songs;
            },function(err){})
        },
        //播放歌曲方法
        playMusic:function(musicId){
            var that = this;

            //获取歌曲播放url，通过v-bind 简写：src绑定到元素
            axios.get("https://autumnfish.cn/song/url?id=" + musicId)
            .then(function(response){
                //console.log(response);
                that.musicUrl=response.data.data[0].url;
            },function(err){});

            //获取歌曲封面url
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicId)
            .then(function(response){
                //console.log(response);
                that.musicCover=response.data.songs[0].al.picUrl;
            },function(err){});

            //获取歌曲评论
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
            .then(function(response){
                console.log(response);
                that.hotComments=response.data.hotComments;
            },function(err){});
        },
        //音乐播放
        playing:function(){
            this.isPalying=true;
        },
        //音乐暂停
        pause:function(){
            this.isPalying=false;
        },
        //获取mv地址
        playMV:function(mvid){
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id=" + mvid)
            .then(function(response){
                that.isShow=true;
                //console.log(response.data.data.url);
                that.mvUrl=response.data.data.url;
            },function(err){});
        },
        //隐藏遮罩层
        hide:function(){
            this.isShow=false;
            this.$refs.video.pause();
        }
    }
})