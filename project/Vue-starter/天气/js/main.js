var app = new Vue({
    el: "#app",
    data: {
        city: '徐州',
        weatherList: [],
        hotCitys: ['成都','绵阳','徐州','凉山']
    },
    methods: {
        searchWeather:function(city){
            this.weatherList=[];
            var that=this;
            axios.get('http://wthrcdn.etouch.cn/weather_mini?city='+this.city)
            .then(function(response){
                console.log(response);
                that.weatherList=response.data.data.forecast;
                console.log(that.weatherList);
            })
            .catch(function(err){
                console.log(err);
                alert("未查到该城市天气信息");
            })
        },
        clickSearch:function(city){
            this.city=city;
            console.log(this.city);
            this.searchWeather(city);
        }
    }
}
)