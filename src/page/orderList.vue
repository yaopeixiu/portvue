<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
			    :data="tableData"
			    @expand='expand'
                :expand-row-keys='expendRow'
                :row-key="row => row.index"
			    style="width: 100%">
			    <el-table-column
			      label="订单ID"
			      prop="orderId">
			    </el-table-column>
			    <el-table-column width="200px"
			      label="地址"
			      prop="address">
			    </el-table-column>
			    <el-table-column
			      label="订单类型"
			      prop="type">
			    </el-table-column>
                <el-table-column
                    label="收货人姓名"
                    prop="name">
                </el-table-column>
                <el-table-column
                    label="收货人电话"
                    prop="mobile">
                </el-table-column>
                <el-table-column
                    label="司机姓名"
                    prop="driverName">
                </el-table-column>
                <el-table-column
                    label="司机电话"
                    prop="driverMobile">
                </el-table-column>
                <el-table-column
                    label="车辆ID"
                    prop="carId">
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button
                            size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button
                            size="small"
                            type="success"
                            @click="getOnCars(scope.$index, scope.row)">派 单</el-button>
                    </template>
                </el-table-column>
			</el-table>
            <el-dialog title="修改订单信息" v-model="dialogFormVisible">
                <el-form :model="editForm">
                    <el-form-item label="送货地址" label-width="100px">
                        <el-input v-model="editForm.address" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="收件人姓名" label-width="100px">
                        <el-input v-model="editForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="收件人电话" label-width="100px">
                        <el-input v-model="editForm.mobile"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
<!--                   scope.$index:拿到每一行的 -->
                    <el-button type="primary" @click="updateOrder">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="选择车辆" v-model="dialogTableVisible">
                <el-table :data="carData">
                    <el-table-column property="carId" label="车辆ID"></el-table-column>
                    <el-table-column property="model" label="型号"></el-table-column>
                    <el-table-column property="status" label="状态"></el-table-column>
                    <el-table-column property="driverName" label="司机姓名"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                size="small"
                                type="success"
                                @click="handleAssign(scope.$index, scope.row)">派 单</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
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
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getResturantDetail, getUserInfo, getAddressById} from '@/api/getData'
    import { OrdersList, updateOrder, deleteOrder, getOnCars, assignOrder} from "../api/api";

	export default {
        data(){
            return {
            	editForm: {
            		address: '',
                    name: '',
                    mobile: '',
                    orderId: '',
                },
				// carData: {
            	// 	carId: '',   //车辆id
				// 	model: '',   //型号
                //     status: '',   //状态：0空闲，1忙碌
				// 	driverName: '',   //司机姓名
                // },
                orderId: '',
				carData: [],
                tableData: [],
				menuOptions: [],
				selectTable: {},
				dialogFormVisible: false,
				dialogTableVisible: false,
                currentRow: null,
                page: 1,
                limit: 20,
                count: 0,
                currentPage: 1,
                restaurant_id: null,
                expendRow: [],
            }
        },
    	components: {
    		headTop,
    	},
        created(){
        	this.restaurant_id = this.$route.query.restaurant_id;
            this.initData();
        },
        mounted(){

        },
        methods: {
            async initData(){
                try{
                    // const countData = await getOrderCount({restaurant_id: this.restaurant_id});
                    // if (countData.status == 1) {
                    //     this.count = countData.count;
                    // }else{
                    //     throw new Error('获取数据失败');
                    // }
                    this.getOrders();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.page = (val - 1)*this.limit;
                this.getOrders()
            },
            async getOrders(){
                const Orders = await OrdersList({page: this.page, limit: this.limit});
                console.log(Orders);
                this.tableData = [];
                this.count = Orders.data.total;
                Orders.data.list.forEach((item, index) => {
                    const tableData = {};
                    tableData.orderId = item.orderId;
                    tableData.address = item.address;
					tableData.type = item.type == false ? "订单" : "运单";
					tableData.mobile = item.mobile;
					tableData.name = item.name;
					tableData.driverName = item.driverName;
					tableData.driverMobile = item.driverMobile;
					tableData.carId = item.carId;
                    this.tableData.push(tableData);
                })
            },

			async getOnCars(index, row){
				this.dialogTableVisible = true;
				this.orderId = row.orderId;
				const Cars = await getOnCars();
				console.log(Cars);
				Cars.data.list.forEach((item, index) => {
					const carData = {};
					carData.carId = item.carId;
					carData.model = item.model;
					carData.status = item.status;
					carData.driverName = item.driverName;
					this.carData.push(carData);
				})
            },

            async expand(row, status){
            	if (status) {
            		const restaurant = await getResturantDetail(row.restaurant_id);
	            	const userInfo = await getUserInfo(row.user_id);
	            	const addressInfo = await getAddressById(row.address_id);

	                this.tableData.splice(row.index, 1, {...row, ...{restaurant_name: restaurant.name, restaurant_address: restaurant.address, address: addressInfo.address, user_name: userInfo.username}});
                    this.$nextTick(() => {
                        this.expendRow.push(row.index);
                    })
	            }else{
                    const index = this.expendRow.indexOf(row.index);
                    this.expendRow.splice(index, 1)
                }
            },
			handleEdit(index, row) {
				// this.getSelectItemData(row, 'edit')
                console.log("edit...")
				this.editForm = Object.assign({}, row)
                console.log(this.editForm)
				this.dialogFormVisible = true;
			},
			handleAssign(index, row) {
				// this.carData = Object.assign({}, row)
				const subData = {carsId: row.carId, orderId : this.orderId};
				assignOrder(subData).then((res) => {
					try{
						if (res.errno == 0) {
							this.$message({
								type: 'success',
								message: '派单成功'
							});
							this.$router.push({ path:'/OrderList'})
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
				this.dialogTableVisible = true;
			},
			handleSelect(index){
				this.selectIndex = index;
				this.selectMenu = this.menuOptions[index];
			},
			async handleDelete(index, row) {
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
						// console.log(row.orderId);
						const subData = {id: row.orderId};
						// console.log(subData);
					deleteOrder(subData).then((res) => {
						try{
							if (res.errno == 0) {
								this.$message({
									type: 'success',
									message: '删除订单成功'
								});
								this.getOrders();
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
			async updateOrder(){
				this.dialogFormVisible = false;
				this.dialogTableVisible = false;
				try{
					const subData = {address: this.editForm.address, mobile: this.editForm.mobile, name: this.editForm.name, orderId: this.editForm.orderId};
                    // const subData = {orderId: this.tableData.orderId};
                    // console.log(subData);
					// const postData = {...this.selectTable, ...subData};
					// let para = Object.assign({}, this.editForm);
					const res = await updateOrder(subData);
					// console.log(res);
					if (res.errno == 0) {
						this.$message({
							type: 'success',
							message: '更新订单信息成功'
						});
						this.getOrders();
					}else{
						this.$message({
							type: 'error',
							message: res.errmsg
						});
					}
				}catch(err){
					console.log('更新订单信息失败', err);
				}
			},
        },
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
