<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="search" style="width:100%;margin-left:20px">
            <el-form :inline="true" :model="searchParams" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="searchParams.model" style="width: 160px;" placeholder="请输入型号" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="searchParams.driverId" style="width: 180px;" placeholder="请输入驾驶员ID" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="searchParams.license" style="width: 180px;" placeholder="请输入车牌号" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="getCarList()">搜索</el-button>
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
                            <el-form-item label="车架号">
                                <span>{{ props.row.frameNumber }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    label="车辆ID"
                    prop="carsId">
                </el-table-column>
                <el-table-column
                    label="车牌号"
                    prop="licenseNumber">
                </el-table-column>
                <el-table-column
                    label="型号"
                    prop="model">
                </el-table-column>
                <el-table-column
                    label="驾驶员"
                    prop="driverName">
                </el-table-column>
                <el-table-column
                    label="状态"
                    prop="status">
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编 辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删 除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="修改车辆信息" v-model="dialogFormVisible">
                <el-form :model="editForm">
                    <el-form-item label="类型" label-width="100px">
                        <template>
                            <el-select v-model="editForm.model" placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    :disabled="item.disabled">
                                </el-option>
                            </el-select>
                        </template>
                    </el-form-item>
                    <el-form-item label="车牌号" label-width="100px">
                        <el-input v-model="editForm.licenseNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="车架号" label-width="100px">
                        <el-input v-model="editForm.frameNumber"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <!--                   scope.$index:拿到每一行的 -->
                    <el-button type="primary" @click="updateCar">确 定</el-button>
                </div>
            </el-dialog>
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
	import { carList, updateCar, deleteCar } from "../api/api"
	export default {
		name: "carList",
		components: {
			headTop,
		},
		data(){
			return {
				searchParams: {
					model: null,
					license: null,
					driverId: null,
				},
				options: [{
					value: '重型货车',
					label: '重型货车'
				}, {
					value: '中型货车',
					label: '中型货车',
				}, {
					value: '轻型货车',
					label: '轻型货车'
				}, {
					value: '微型货车',
					label: '微型货车'
				}],
				editForm: {
					model: '',
                    licenseNumber: '',
					frameNumber: '',
					carsId: '',
				},
				selectTable: {},
				dialogFormVisible: false,
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
			handleEdit(index, row) {
				// this.getSelectItemData(row, 'edit')
				this.editForm = Object.assign({}, row)
				this.dialogFormVisible = true;
			},
			async initData(){
				try{
					this.getCarList();
				}catch(err){
					console.log('获取数据失败', err);
				}
			},
			async handleDelete(index, row) {
				this.$confirm('确认提交吗？', '提示', {}).then(() => {
					// console.log(row.orderId);
					const subData = {carsId: row.carsId};
					// console.log(subData);
					deleteCar(subData).then((res) => {
						try{
							if (res.errno == 0) {
								this.$message({
									type: 'success',
									message: '删除订单成功'
								});
								this.getCarList();
							}else{
								throw new Error(res.errmsg)
							}}catch(err){
							this.$message({
								type: 'error',
								message: err.message
							});
							console.log('删除订单失败')
						}
					})
				})
			},
			async getCarList(){
				const subData = {...this.searchParams, page: this.page, limit: this.limit};
				const cars = await carList(subData);
				this.tableData = [];
				this.count = cars.data.total;
				cars.data.list.forEach((item, index) => {
					const tableData = {};
					tableData.carsId = item.carsId;
					tableData.model = item.model;
					tableData.status = item.status == 1 ? "忙碌" : " 空闲";
					tableData.driverName = item.driverName;
					tableData.driverId = item.driverId;
					tableData.driverMobile = item.driverMobile;
					tableData.licenseNumber = item.licenseNumber;
					tableData.frameNumber = item.frameNumber;
					this.tableData.push(tableData);
				})
			},

			async updateCar(){
				this.dialogFormVisible = false;
				try{
					const subData = {model: this.editForm.model, licenseNumber: this.editForm.licenseNumber, frameNumber: this.editForm.frameNumber, carsId: this.editForm.carsId};
					// const subData = {orderId: this.tableData.orderId};
					console.log(subData);
					// const postData = {...this.selectTable, ...subData};
					// let para = Object.assign({}, this.editForm);
					const res = await updateCar(subData);
					// console.log(res);
					if (res.errno == 0) {
						this.$message({
							type: 'success',
							message: '更新车辆息成功'
						});
						this.getCarList();
					}else{
						this.$message({
							type: 'error',
							message: res.errmsg
						});
					}
				}catch(err){
					console.log('更新车辆信息失败', err);
				}
			},

			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			async handleCurrentChange(val) {
				this.currentPage = val;
				this.page = val + 1;
				console.log(this.page);
				this.getCarList()
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
