$(function () {


    // var weatherArr = [];

    var localWd = localStorage.getItem('wd') ? JSON.parse(localStorage.getItem('wd')) : [];

    var icons = {
        104: {
            title: '阴',
            icon: "icon-tianqi-yin"
        },
        101: {
            title: '多云',
            icon: "icon-tianqi-duoyun"
        },
        100: {
            title: '晴',
            icon: "icon-tianqi-qing"
        },
        300: {
            title: '阵雨',
            icon: "icon-tianqi-zhenyu"
        },
        301: {
            title: '阵雨',
            icon: "icon-tianqi-zhenyu"
        },
        302: {
            title: '雷阵雨',
            icon: "icon-tianqi-leizhenyu"
        },
        303: {
            title: '雷阵雨',
            icon: "icon-tianqi-leizhenyu"
        },
        305: {
            title: '小雨',
            icon: "icon-tianqi-xiaoyu"
        },
        306: {
            title: '中雨',
            icon: "icon-tianqi-zhongyu"
        },
        307: {
            title: '大雨',
            icon: "icon-tianqi-dayu"
        },
        310: {
            title: '暴雨',
            icon: "icon-tianqi-baoyu"
        },
        311: {
            title: '大暴雨',
            icon: "icon-tianqi-dabaoyu"
        },
        312: {
            title: '特大暴雨',
            icon: "icon-tianqi-tedabaoyu"
        },
        314: {
            title: '小雨转中雨',
            icon: "icon-tianqi-xiaoyuzhuanzhongyu"
        },
        315: {
            title: '中雨转大雨',
            icon: "icon-tianqi-zhongyuzhuandayu"
        },
        316: {
            title: '大雨转暴雨',
            icon: "icon-tianqi-dayuzhuanbaoyu"
        },
        317: {
            title: '大雨转特大暴雨',
            icon: "icon-tianqi-dayuzhuantedabaoyu"
        },
        399: {
            title: '雨',
            icon: "icon-tianqi-yu"
        },
        499: {
            title: '雪',
            icon: "icon-tianqi-xue"
        },
        501: {
            title: '雾',
            icon: "icon-tianqi-wu"
        }
    };


    localWeather();



    //保存搜索过的城市
    function SaveCity(arr, cty) {
        $('.manage-content>ul').empty();



        for (var i = 0; i < arr.length; i++) {

            if (cty && arr[i].city == cty) {

                console.log(1);

                var li = $(`<li class="save-citys">
                <div class="del">删除</div>
        <div class="save-wdImg">
            <i class="icon iconfont ${arr[i].icon}"></i>
        </div>
        <div class="save-city">
            <div class="cityName">${arr[i].city}<i class="show"></i>
            </div>
            <div class="cityWeather">
                ${arr[i].wd}&nbsp;&nbsp;&nbsp;${arr[i].minWd}° - ${arr[i].maxWd}°
            </div>
        </div>
        <div class="show-city">
            <div class="circle"></div>
        </div>
    </li>`)

                $('.manage-content>ul').append(li)

            } else {
                var li = $(`<li class="save-citys">
                <div class="del">删除</div>
                <div class="save-wdImg">
                    <i class="icon iconfont ${arr[i].icon}"></i>
                </div>
                <div class="save-city">
                    <div class="cityName">${arr[i].city}<i class="show"></i>
                    </div>
                    <div class="cityWeather">
                        ${arr[i].wd}&nbsp;&nbsp;&nbsp;${arr[i].minWd}° - ${arr[i].maxWd}°
                    </div>
                </div>
                <div class="show-city">
            <div class="circle circle-hide"></div>
        </div>
               
            </li>`)

                $('.manage-content>ul').append(li)
            }

        }


    }



    //未来七天

    function weekWeather(cty) {

        $('.afterday').empty();
        $.ajax({
            //请求方式
            type: 'get',
            url: 'https://api.heweather.net/s6/weather/forecast',
            data: {
                location: cty,
                key: '4038816cde6b4b34b7cdc559c991212e'
            },
            success: function (d) {
                console.log(d);
                var city = d.HeWeather6[0].basic.location
                $('.city').text(city);

                // var temperature = d.HeWeather6[0].daily_forecast[0]

                var rd = d.HeWeather6[0].daily_forecast;
                var hour = new Date(d.HeWeather6[0].update.loc).getHours();
                $('.afterday').empty()

                for (var i = 0; i < d.HeWeather6[0].daily_forecast.length; i++) {
                    var li = $(`<li>
                  <div>${d.HeWeather6[0].daily_forecast[i].date}</div>
                  <div><span class="afterday-wd">${hour >= rd[i].sr.substr(0, 2) && hour < rd[i].ss.substr(0, 2) ? rd[i].cond_txt_d : rd[i].cond_txt_n}</span>
                  <i class="icon iconfont ${hour >= rd[i].sr.substr(0, 2) && hour < rd[i].ss.substr(0, 2) ? icons[rd[i].cond_code_d].icon :  icons[rd[i].cond_code_n].icon} "></i>
                  </div>
                  <div>${d.HeWeather6[0].daily_forecast[i].tmp_min}° - ${d.HeWeather6[0].daily_forecast[i].tmp_max}°</div>
              </li>`)



                    $('.afterday').append(li)

                }

                $('.wind span').text(d.HeWeather6[0].daily_forecast[0].wind_sc)

                $('.tdweather').text(d.HeWeather6[0].daily_forecast[0].cond_txt_d)
                $('.humidity span').text(d.HeWeather6[0].daily_forecast[0].hum)

                var wdObj = {};

                wdObj.minWd = d.HeWeather6[0].daily_forecast[0].tmp_min;
                wdObj.maxWd = d.HeWeather6[0].daily_forecast[0].tmp_max;
                wdObj.icon = hour >= rd[0].sr.substr(0, 2) && hour < rd[0].ss.substr(0, 2) ? icons[rd[0].cond_code_d].icon : icons[rd[0].cond_code_n].icon;
                wdObj.wd = hour >= rd[0].sr.substr(0, 2) && hour < rd[0].ss.substr(0, 2) ? rd[0].cond_txt_d : rd[0].cond_txt_n;

                wdObj.city = city;

                console.log(wdObj);

                if (localWd.length == 0) {
                    console.log(1);

                    localWd.push(wdObj);
                    console.log($('.city').text());
                    SaveCity(localWd, city)
                    // return;
                    localStorage.setItem('wd', JSON.stringify(localWd))

                } else {
                    for (var i = 0; i < localWd.length; i++) {
                        if (localWd[i].city == city) {
                            SaveCity(localWd, city)
                            return;
                        }
                    }
                    localWd.push(wdObj);

                    console.log(1);

                    localStorage.setItem('wd', JSON.stringify(localWd))
                    SaveCity(localWd, city)

                    // console.log(city);

                }
            }
        })

    }


    //当前天气
    function tdWeather(cty) {


        $.ajax({
            //请求方式
            type: 'get',
            url: 'https://api.heweather.net/s6/weather/hourly',
            data: {
                location: cty,
                key: '4038816cde6b4b34b7cdc559c991212e'
            },
            success: function (d) {
                console.log(d);
                
                //如果不存在城市
                if (d.HeWeather6[0].status !== 'ok') {
                    alert('没有' + cty + '的天气');
                    return;
                }
                $('.weather-hours ul').empty()




                console.log(d);
                var currentHour24Weather = d.HeWeather6[0].hourly.slice(0, 24);
                $('.temperature').text(d.HeWeather6[0].hourly[0].tmp + '°')

                for (var i = 0; i < currentHour24Weather.length; i++) {

                    var time = currentHour24Weather[i].time.slice(11, 16);

                    var $li = $(`<li>
              <div>${time}</div>
              <div>${currentHour24Weather[i].cond_txt}</div>
              <div><i class="icon iconfont ${icons[currentHour24Weather[i].cond_code].icon}"></i></div>
              <div>${currentHour24Weather[i].tmp}°</div>
          </li>`);
                    $('.weather-hours ul').append($li)
                }

                // wdObj


                weekWeather(cty)
                lifeCount(cty)



            }
        })
    }

    $('.menu').on('click', function () {
        $('.menu-box').toggle();

    })


    //生活指数
    function lifeCount(cty) {
        $.ajax({
            //请求方式
            type: 'get',
            url: 'https://api.heweather.net/s6/weather/lifestyle',
            data: {
                location: cty,
                key: '4038816cde6b4b34b7cdc559c991212e'
            },
            success: function (d) {
                console.log(d);

                $('.air span').text(d.HeWeather6[0].lifestyle[7].brf)
            }
        })
    }

    function localWeather() {
        $.ajax({
            type: 'get',
            url: 'https://apis.map.qq.com/ws/location/v1/ip',
            data: {
                key: '5F2BZ-33K3U-PMDVV-BCREH-QLNEV-4CBNX',
                output: 'jsonp'
            },

            dataType: 'jsonp',

            success: function (data) {
                console.log(data);

                tdWeather(data.result.ad_info.city)


            }
        })
    }




    //输入搜索城市获取天气
    $('.search-icon').on('click', function () {

        var city = $('.search input').val();

        tdWeather(city)

        $('.search input').val('')
        console.log(localWd);


        changeSaveCity()




    })


    $('.cityManage').on('click', function () {

        $('.weather-box').hide();
        $('.manage-box').show();
        changeSaveCity();


    })

    $('.back').on('click', function () {
        $('.weather-box').show();
        $('.manage-box').hide();
        $('.menu-box').hide();

    })


    //切换保存城市
    function changeSaveCity() {
        if ($('.circle').length == 0) {
            return;
        }
        $('.manage-content').on('click', '.show-city', function () {

            $('.circle').addClass('circle-hide')
            $(this).find('.circle').removeClass('circle-hide')
            console.log(this);


            var city = $(this).parents('li').find('.cityName').text()

            tdWeather(city)
        })
    }


    $('.reduce').on('click', function () {

        console.log($('.del').css('display'));

        if ($('.del').css('display') === 'none') {
            $('.del').css('display', 'block')
        } else {
            $('.del').css('display', 'none')
        }
    })

    $('.manage-content').on('click', '.del', function () {

        if ($('.circle').length == 1) {
            alert('至少保留一个城市')
            return;
        }
        var city = $(this).parents('li').find('.cityName').text().trim();

        console.log(city);
        console.log(localWd[0].city);

        for (var i = 0; i < localWd.length; i++) {


            if (localWd[i].city == city) {
                localWd.splice(i, 1);
                console.log(localWd);

                localStorage.setItem('wd', JSON.stringify(localWd))
                var nowCity = localWd[0].city
                SaveCity(localWd,nowCity)
                tdWeather(nowCity)
                return;

            }
        }




    })





})