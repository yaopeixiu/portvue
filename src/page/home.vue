<template>
<!--  <div id="helloworld">-->
<!--    <p class="fonts">这是跳转home</p>-->
<!--  </div>-->
<!--  <el-container>-->
<!--    <el-aside width="200px">Aside</el-aside>-->
<!--    <el-container>-->
<!--      <el-header>Header</el-header>-->
<!--      <el-main>-->
<!--        <baidu-map class="bmView" :scroll-wheel-zoom="true" :center="location" :zoom="zoom" @click="getLocationPoint" ak="RFe9oUcSqrLcuCgTlL6Ncs8y0V77BgNW">-->
<!--        </baidu-map>-->
<!--      </el-main>-->
<!--    </el-container>-->
<!--  </el-container>-->
  <baidu-map class="bmView" :scroll-wheel-zoom="true" :center="location" :zoom="zoom" @click="getLocationPoint" ak="RFe9oUcSqrLcuCgTlL6Ncs8y0V77BgNW">
  </baidu-map>
</template>

<script>
    import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
    export default {
        components: {
            BaiduMap
        },

        data() {
            return {
                location: {
                    lng: 116.404,
                    lat: 39.915
                },
                zoom: 12.8,
                addressKeyword: "",
            };
        },
        methods: {
            getLocationPoint(e) {
                this.lng = e.point.lng;
                this.lat = e.point.lat;
                /* 创建地址解析器的实例 */
                let geoCoder = new BMap.Geocoder();
                /* 获取位置对应的坐标 */
                geoCoder.getPoint(this.addressKeyword, point => {
                    this.selectedLng = point.lng;
                    this.selectedLat = point.lat;
                })
                /* 利用坐标获取地址的详细信息 */
                geocoder.getLocation(e.point, res=> {
                    console.log(res);
                })
            }
        }
    }
</script>

<style scoped>
  .bmView {
    width: 100%;
    height: 100%;
  }
  .fonts{
    line-height: 50px;
    text-align: center;
    font-size: 50px;
  }

  .el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  .el-container {
    margin-bottom: 40px;
    height: 100%;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

</style>
