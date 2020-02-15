基于`leaflet` 实现的根据不同等级的数字在地图上标记

#### 参数设置

```javascript
  // 设置好颜色
  var mycolors = ['#6a9955', '#e5da82', '#e36c09', '#ff0000', '#e773fc', '#840c18'];
  var cfg = {
    nums: 6, // 颜色个数，即等级数
    colors: mycolors, // 每个等级对应的颜色
    fontSize: '13px', // 字体大小
    fontColor: '#cccccc' // 字体颜色
  };
```

#### 图层使用

```javascript
var templayer = new BubblesOverlay(cfg);
// 将图层加入地图
layerControl.addOverlay(templayer, 'test'); // 第二个参数为图层的名字
// 加入数据
templayer.setData(data);
```

#### 数据格式

json格式，datan为第n个等级的数据

```json
[
    data1,
    data2,
    data3,
    ....
    datan
]
```

每个datan的数据格式是一样的，下面所示为datan内部的数据。

lon为经度，lat为纬度，value为数值大小。

```json
datan = 
[
    [lon1,lat1,value1],
    [lon2,lat2,value2],
    [lon3,lat3,value3],
    ...
    [lonk,latk,valuek],
]
```

示范，n=2，data1的k为3，data2的k为2，也就是有两个等级的数据，第一个等级的数据内有3个，第二个等级内的数据有2个。

```json
[
  [
    [
      115.78446960,
      33.85064316,
      99
    ],
    [
      116.52641296,
      31.74145126,
      10
    ],
    [
      117.23344421,
      31.82657814,
      16
    ],
  ],
  [
    [
      109.60551453,
      23.11744881,
      163
    ],
    [
      111.57352448,
      24.40945053,
      264
    ]
  ]
]
```

#### 效果图

下图为将地图不断放大的效果

![small](https://github.com/chenshuyuhhh/Leaflet-bubbles/blob/master/pic/bubble1.png)

![mediu](https://github.com/chenshuyuhhh/Leaflet-bubbles/blob/master/pic/bubble2.png)

![big](https://github.com/chenshuyuhhh/Leaflet-bubbles/blob/master/pic/bubble3.png)



#### 补充说明

##### 目录说明：

src/leaflet-bubbles.js：实现上述功能的源代码

demo: 使用leaflet-bubbles.js的示范代码

demo/resource/bubble-test.json：画图所用的jso数据

pic：放置效果图

`ps` 访问本地文件存在跨域问题，可以通过设置开启浏览器跨域访问权限，也可以将数据获取改成网络请求，就不会存在跨域问题。还有一种解决方法是，用 var data = 数据，即改成用变量存取。

##### 样式修改

如果想修改等级样式可以阅读源代码，主要在_draw函数内部。