var BubblesOverlay = L.Layer.extend({

    /**
     * 
     * @param {nums:Int, colors:Array,fontSize,fontColor} config 
     */
    initialize: function (config) {
        this.myGroup = [];
        this.layers = [];
        this.cfg = config;
        this.data = [];
        if (this.cfg.nums != this.cfg.colors.length) {
            throw Error('The length of icons is not equal to the numbers of your grade')
        }
    },

    // removeData: function () {
    //     // 将数据清空
    //     this.data = []
    //     // 将标记全部移除
    //     for (marker_temp in this.markers) {
    //         map.removeLayer(marker_temp);
    //     }
    // },

    onAdd: function (map) {
        this._map = map;
        // 一开始画数据
        this._draw(this.data);
    },

    addTo: function (map) {
        map.addLayer(this);
        return this;
    },

    onRemove: function (map) {
        // 将数据清空
        this.layers = [];
        this.myGroup.clearLayers();
    },

    _draw: function (data) {
        if(data.length!=this.cfg.nums){
            throw Error('The types of your data is not equal to the types of color')
        }
        // 根据坐标和值画图
        for (var i = 0; i < data.length; i++) {
            var data_one = data[i];// 取每一种data
            var mycolor = this.cfg.colors[i] // 这种data对应的icon
            for (var j = 0; j < data_one.length; j++) {
                mydata = data_one[j];
                latlng = [];
                latlng.push(mydata[1]);
                latlng.push(mydata[0]);
                // 文字标记
                var myIcon = L.divIcon({
                    html: mydata[2],
                    className: 'my-div-icon',
                    iconSize: 0
                });
                var txtMarker = new L.marker(latlng, { icon: myIcon });
                this.layers.push(txtMarker);

                // 圆圈标记
                var circleMarker = new L.circle([51.5, -0.09], {
                    color: mycolor,
                    // fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 10000
                });
                circleMarker.setLatLng(latlng)
                this.layers.push(circleMarker);
            }
        }
        this.myGroup = L.layerGroup(this.layers);
        this._map.addLayer(this.myGroup);
        var elements = document.getElementsByClassName("my-div-icon");
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.fontSize = this.cfg.fontSize;
            elements[i].style.color = this.cfg.fontColor;
        }
    },

    /**
     * 设置数据
     * @param {数据} data 
     */
    setData: function (data) {
        this.data = data;
    },

    /**
     * 添加数据
     * @param {数据} data 
     */
    addData: function (data) {
        this.data.push(data);
        this._draw(data);
    }
});