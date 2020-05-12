<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="search" style="width:100%;margin-left:20px">
            <el-form :inline="true" :model="searchParams" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="searchParams.realName" style="width: 160px;" placeholder="请输驾驶员姓名" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="searchParams.mobile" style="width: 180px;" placeholder="请输入驾驶员联系电话" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="searchParams.card" style="width: 180px;" placeholder="请输入驾驶员身份证号" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="getdriverList()">搜索</el-button>
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
<!--                            <el-form-item label="身份证号">-->
<!--                                <span>{{ props.row.card }}</span>-->
<!--                            </el-form-item>-->
                            <el-form-item label="住址">
                                <span>{{ props.row.address }}</span>
                            </el-form-item>
                            <el-form-item label="备注">
                                <span>{{ props.row.remark }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column width="100px"
                    label="驾驶员ID"
                    prop="driverId">
                </el-table-column>
                <el-table-column
                    label="驾驶员姓名"
                    prop="realname">
                </el-table-column>
                <el-table-column
                    label="联系电话"
                    prop="mobile">
                </el-table-column>
                <el-table-column
                    label="身份证号"
                    prop="card">
                </el-table-column>
                <el-table-column label="驾驶证">
                    <template slot-scope="scope">
                        <img style="width:100px;height:80px;border:none;" :src="scope.row.license">
                    </template>
                </el-table-column>
                <el-table-column
                    label="入职日期"
                    prop="entryDate">
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
            <el-dialog title="修改驾驶员信息" v-model="dialogFormVisible">
                <el-form :model="editForm">
                    <el-form-item label="姓名" label-width="100px">
                        <el-input v-model="editForm.realname" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" label-width="100px">
                        <el-input v-model="editForm.card"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" label-width="100px">
                        <el-input v-model="editForm.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="住址" label-width="100px">
                        <el-input v-model="editForm.address"></el-input>
                    </el-form-item>
                    <el-form-item label="驾驶证" label-width="100px">
                        <el-upload
                            class="avatar-uploader"
                            :action="baseUrl + '/v1/addimg/shop'"
                            :show-file-list="false"
                            :on-success="handleServiceAvatarScucess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="editForm.license" :src="editForm.license" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <!--                   scope.$index:拿到每一行的 -->
                    <el-button type="primary" @click="updateDriver">确 定</el-button>
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
	import { driverList, updateDriver, deleteDriver } from "../api/api"
	import {baseUrl, baseImgPath} from '@/config/env'
	export default {
		name: "driverList",
		components: {
			headTop,
		},
		data(){
			return {
				searchParams: {
					realName: null,
					mobile: null,
					card: null
				},
				imageUrl: '',
				baseUrl,
				baseImgPath,
				editForm: {
					realname: '',
					card: '',
					mobile: '',
					address: '',
                    driverId: '',
                    license: '',
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
			handleServiceAvatarScucess(res, file) {
				this.editForm.license = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isRightType) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isRightType && isLt2M;
			},
			handleEdit(index, row) {
				// this.getSelectItemData(row, 'edit')
				this.editForm = Object.assign({}, row)
				this.dialogFormVisible = true;
			},
			async initData(){
				try{
					this.getdriverList();
				}catch(err){
					console.log('获取数据失败', err);
				}
            },
			async handleDelete(index, row) {
				this.$confirm('确认提交吗？', '提示', {}).then(() => {
					// console.log(row.orderId);
					const subData = {driverId: row.driverId};
					// console.log(subData);
					deleteDriver(subData).then((res) => {
						try{
							if (res.errno == 0) {
								this.$message({
									type: 'success',
									message: '删除驾驶员信息成功'
								});
								this.getdriverList();
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
			async getdriverList(){
				const subData = {...this.searchParams, page: this.page, limit: this.limit};
				console.log(subData);
				const drivers = await driverList(subData);
				this.tableData = [];
				this.count = drivers.data.total;
				drivers.data.list.forEach((item, index) => {
					const tableData = {};
					tableData.driverId = item.driverId;
					tableData.realname = item.realname;
					tableData.mobile = item.mobile;
					tableData.license = item.license;
					tableData.remark = item.remark;
					tableData.card = item.card;
					tableData.address = item.address;
					tableData.entryDate = item.entryDate.substring(0, item.entryDate.indexOf('T'));
					this.tableData.push(tableData);
				})
            },

			async updateDriver(){
				this.dialogFormVisible = false;
				try{
					const subData = {card: this.editForm.card, address: this.editForm.address, mobile: this.editForm.mobile, realname: this.editForm.realname, driverId: this.editForm.driverId, license: this.editForm.license};
					// const subData = {orderId: this.tableData.orderId};
					// console.log(subData);
					// const postData = {...this.selectTable, ...subData};
					// let para = Object.assign({}, this.editForm);
					const res = await updateDriver(subData);
					// console.log(res);
					if (res.errno == 0) {
						this.$message({
							type: 'success',
							message: '更新驾驶员信息成功'
						});
						this.getdriverList();
					}else{
						this.$message({
							type: 'error',
							message: res.errmsg
						});
					}
				}catch(err){
					console.log('更新驾驶员信息失败', err);
				}
			},

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
        width: 100%;
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
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>
