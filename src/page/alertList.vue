<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="search" style="width:100%;margin-left:20px">
            <el-form :inline="true" :model="searchParams" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="searchParams.orderId" style="width: 160px;" placeholder="请输入订单号" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="searchParams.carId" style="width: 180px;" placeholder="请输入车辆ID" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="getAlert()">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="驾驶员ID">
                                <span>{{ props.row.driverId }}</span>
                            </el-form-item>
                            <el-form-item label="驾驶员电话">
                                <span>{{ props.row.mobile }}</span>
                            </el-form-item>
                            <el-form-item label="驾驶员姓名">
                                <span>{{ props.row.realname }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    label="异常报警ID"
                    prop="id">
                </el-table-column>
                <el-table-column
                    label="位置"
                    prop="address">
                </el-table-column>
                <el-table-column
                    label="订单ID"
                    prop="orderId">
                </el-table-column>
                <el-table-column
                    label="异常状态"
                    prop="status">
                </el-table-column>
                <el-table-column
                    label="报警时间"
                    prop="addTime">
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">确认已处理</el-button>
<!--                        <el-button-->
<!--                            size="mini"-->
<!--                            type="danger"-->
<!--                            @click="handleDelete(scope.$index, scope.row)">删 除</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="Pagination" style="text-align: left;margin-top: 10px;">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="20"
                layout="total, prev, pager, next"
                :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
	import { processed, getAlert } from "../api/api"
	export default {
		name: "alertList",
		components: {
			headTop
		},
		data(){
			return {
				counts: 0,
				searchParams: {
					status: null,
					carsId: null,
					orderId: null,
				},
                address: [
                	"湖南省岳阳市岳阳楼区联港南路",
					"湖南富厚酒业有限公司生态产业园"
                ],
				tableData: [],
				page: 1,
				limit: 10,
				count: 0,
				currentPage: 1,
			}
		},
		created(){
			this.initData();
		},
		methods: {
			// handleEdit(index, row) {
			// 	// this.getSelectItemData(row, 'edit')
			// 	const subData = {id: row.id};
			// 	processed(subData).then((res) => {
			// 		try{
			// 			if (res.errno == 0) {
			// 				this.$message({
			// 					type: 'success',
			// 					message: '处理成功'
			// 				});
			// 				this.getAlert();
			// 			}else{
			// 				throw new Error(res.errmsg)
			// 			}}catch(err){
			// 			this.$message({
			// 				type: 'error',
			// 				message: err.message
			// 			});
			// 			console.log('处理操作失败')
			// 		}
            //     })
			// },
			async initData(){
				try{
					this.getAlert();
				}catch(err){
					console.log('获取数据失败', err);
				}
			},
			async handleEdit(index, row) {
				this.$confirm('确认提交吗？', '提示', {}).then(() => {
					// console.log(row.orderId);
					const subData = {id: row.id};
					console.log(subData);
					processed(subData).then((res) => {
						try{
							if (res.errno == 0) {
								this.$message({
									type: 'success',
									message: '操作成功'
								});
								this.getAlert();
							}else{
								throw new Error(res.errmsg)
							}}catch(err){
							this.$message({
								type: 'error',
								message: err.message
							});
							console.log('操作失败')
						}
					})
				})
			},
			async getAlert(){
				const subData = {...this.searchParams};
				const alert = await getAlert(subData);
				console.log(alert);
				this.tableData = [];
				this.count = alert.data.total;
				alert.data.list.forEach((item, index) => {
					const tableData = {};
					tableData.id = item.id;
					tableData.orderId = item.orderId;
					tableData.status = item.status==1?"已解决":"未解决";
					tableData.addTime = item.addTime.substring(0, item.addTime.indexOf('T'));
					tableData.carsId = item.carsId;
					tableData.driverMobile = item.driverMobile;
					tableData.driverName = item.driverName;
					tableData.lng = item.lng;
					tableData.lat = item.lat;
					tableData.address = this.address[this.counts];
                    this.counts = this.counts+1;
					console.log(this.counts);
					// let geocoder= new BMap.Geocoder();  //创建地址解析器的实例
                    // geocoder.getLocation((item.lng, item.lat),rs=>{
					// 	tableData.address = rs.address;
					// });
					this.tableData.push(tableData);
				})
			},

			// async updatealert(){
			// 	this.dialogFormVisible = false;
			// 	try{
			// 		const subData = {model: this.editForm.model, licenseNumber: this.editForm.licenseNumber, frameNumber: this.editForm.frameNumber,carsId: this.editForm.carsId};
			// 		// const subData = {orderId: this.tableData.orderId};
			// 		// console.log(subData);
			// 		// const postData = {...this.selectTable, ...subData};
			// 		// let para = Object.assign({}, this.editForm);
			// 		const res = await updateCar(subData);
			// 		// console.log(res);
			// 		if (res.errno == 0) {
			// 			this.$message({
			// 				type: 'success',
			// 				message: '更新车辆息成功'
			// 			});
			// 			this.getCarList();
			// 		}else{
			// 			this.$message({
			// 				type: 'error',
			// 				message: res.errmsg
			// 			});
			// 		}
			// 	}catch(err){
			// 		console.log('更新车辆信息失败', err);
			// 	}
			// },

			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			async handleCurrentChange(val) {
				this.currentPage = val;
				this.page = val + 1;
				console.log(this.page);
				this.getdriverList()
			},
		}
	}
</script>

<style lang="less">
    @import '../style/mixin';
    .table_container{
        padding: 20px;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
