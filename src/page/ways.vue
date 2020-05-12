<template>
    <baidu-map class="map" :scroll-wheel-zoom="true" center="长沙市" :zoom="zoom" @ready="handler" ak="RFe9oUcSqrLcuCgTlL6Ncs8y0V77BgNW">
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
        <bm-view class="bmview">
        </bm-view>
        <bm-driving
            :start=this.start
            :end=this.$route.query.end
            :startCity=this.startCity
            :endCity=this.endCity
            :auto-viewport="true"
            :waypoints=this.via>
        </bm-driving>
    </baidu-map>
</template>

<script>
	import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
	import BmGeolocation from 'vue-baidu-map/components/controls/Geolocation.vue'
	import BmDriving from 'vue-baidu-map/components/search/driving.vue'
	import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue'; //标记 点
	export default {
		name: "ways",
		components: {
			BaiduMap,
			BmGeolocation,
			BmDriving,
			BmMarker
		},
		data() {
			return {
				via: [],
				start: "湖南省岳阳市城陵矶港",
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
		methods: {
			handler ({BMap, map}) {
				console.log(BMap, map)
				this.center.lng = 116.404
				this.center.lat = 39.915
				this.zoom = 15
			}
		}
	}
</script>

<style scoped>
    .map {
        width: 100%;
        height: 100%;
    }
</style>
