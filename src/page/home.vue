<template>
    <div class="fillcontain">
        <baidu-map class="map" :scroll-wheel-zoom="true" center="岳阳市城陵矶港" :zoom="zoom" @ready="handler" ak="RFe9oUcSqrLcuCgTlL6Ncs8y0V77BgNW" @click="getPoint">
            <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
            <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
            <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>
            <bm-city-list anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-city-list>
<!--            <bm-panorama anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-panorama>-->
            <bm-traffic :predictDate="{weekday: 7, hour: 12}">
            </bm-traffic>
            <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-navigation>
<!--            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>-->
            <div v-for="marker of markers">
                <bm-marker  :position="{lng: marker.lng, lat: marker.lat}" :title="marker.name" @click="infoWindowOpen(marker)" :icon="{url: car,size: {width: 30, height: 30}}">
                    <bm-info-window title="" :position="{lng: marker.lng, lat: marker.lat}"   :show="marker.showFlag" @close="infoWindowClose(marker)" @open="infoWindowOpen(marker)">
                        <div class="login-wrap">
                                <div>位置：{{address}}</div>
                                <div>车牌号：{{marker.licenseNumber}}</div>
                                <div>司机姓名：{{marker.driverName}}</div>
                                <div>司机电话：{{marker.driverMobile}}</div>
                                <div>异常情况：{{marker.status}}</div>
                        </div>
                    </bm-info-window>
                </bm-marker>
            </div>
        </baidu-map>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
    import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
	// import BmGeolocation from 'vue-baidu-map/components/controls/Geolocation.vue'
	import BmDriving from 'vue-baidu-map/components/search/driving.vue'
	import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue'//标记 点
    import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow.vue'
	import BmScale from 'vue-baidu-map/components/controls/scale.vue'
	import BmMapType from 'vue-baidu-map/components/controls/mapType.vue'
	import BmOverviewMap from 'vue-baidu-map/components/controls/overviewMap.vue'
	import BmCityList  from 'vue-baidu-map/components/controls/cityList.vue'
	// import BmPanorama  from 'vue-baidu-map/components/controls/panorama.vue'
	import BmTraffic  from 'vue-baidu-map/components/layers/Traffic.vue'
	import BmNavigation  from 'vue-baidu-map/components/controls/navigation.vue'
	import { getLocation } from "../api/api"
	export default {
        components: {
            BaiduMap,
			// BmGeolocation,
			BmDriving,
			BmMarker,
			BmInfoWindow,
			BmScale,
			BmMapType,
			BmOverviewMap,
			BmCityList,
			BmTraffic,
			BmNavigation,
            headTop
        },
        data() {
        	var car = require('../assets/images/car.png');
            return {
				markers: [
					// {
					// 	lng: 116.405,
					// 	lat: 39.901,
					// 	showFlag:false //flag放在每一条数据里
					// },
                    // {
					// 	lng: 113.00651,
                    //     lat: 29.46135,
			        //     showFlag:false
		            // }
                ],
            	positionMap: {lng: 113.00651, lat: 29.46135},
            	address:'',
            	car: car,
				show: false,
				via: [],
				start: "",
				end: "",
				startCity: "",
				endCity: "",
                location: {
                    lng: 116.404,
                    lat: 39.915
                },
                zoom: 9,
            };
        },
		created(){
			this.initData();
		},
		methods: {
			async initData(){
				try{
					this.getLocation();
				}catch(err){
					console.log('获取数据失败', err);
				}
			},
			getPoint(e){    //点击地图获取一些信息，
				this.positionMap.lng = e.point.lng;     //通过  e.point.lng获取经度
				this.positionMap.lat = e.point.lat;     //通过  e.point.lat获取纬度
                console.log(this.positionMap.lng);
				console.log(this.positionMap.lat);

				let geocoder= new BMap.Geocoder();  //创建地址解析器的实例
				geocoder.getLocation(e.point,rs=>{
					this.address = rs.address;
					//地址描述(string)=
					// console.log(rs.address);    //这里打印可以看到里面的详细地址信息，可以根据需求选择想要的
					// console.log(rs.addressComponents);//结构化的地址描述(object)
					// console.log(rs.addressComponents.province); //省
					// console.log(rs.addressComponents.city); //城市
					// console.log(rs.addressComponents.district); //区县
					// console.log(rs.addressComponents.street); //街道
					// console.log(rs.addressComponents.streetNumber); //门牌号
					// console.log(rs.surroundingPois); //附近的POI点(array)
					// console.log(rs.business); //商圈字段，代表此点所属的商圈(string)
				});
			},
			handler ({BMap, map}) {
				console.log(BMap, map)
				this.center.lng = 116.404
				this.center.lat = 39.915
				this.zoom = 15
			},
			infoWindowClose(marker) {
				marker.showFlag = false
			},
			infoWindowOpen(marker) {
				marker.showFlag = true
			},
			async getLocation(){
				console.log("getLocation")
				const locations = await getLocation();
				console.log(locations)
				locations.data.list.forEach((item, index) => {
					const lac = {};
					lac.lng = item.lng
					lac.lat = item.lat
                    lac.licenseNumber = item.licenseNumber
                    lac.driverMobile = item.driverMobile
                    lac.driverName = item.driverName
                    lac.status = item.status == 0 ? "正常" : "异常"
					lac.showFlag = false
                    this.markers.push(lac)
                })
            }
		}
    }
</script>

<style lang="less">
    @import '../style/mixin';
  .map {
    width: 100%;
    height: 100%;
  }
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        /*background-image: url(../assets/images/login_1.png);*/
        background-size: 100%;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
</style>
