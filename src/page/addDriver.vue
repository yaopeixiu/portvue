<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="content">
            <el-form
                :model="ruleForm"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="姓名">
                    <el-input v-model="ruleForm.realname"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="ruleForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="身份证号码">
                    <el-input v-model="ruleForm.card"></el-input>
                </el-form-item>
                <el-form-item label="住址">
                    <el-input v-model="ruleForm.address"></el-input>
                </el-form-item>
                <el-form-item label="入职日期">
                    <template>
                        <div class="block">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="ruleForm.entryDate"
                                type="datetime"
                                placeholder="选择日期时间"
                                default-time="12:00:00">
                            </el-date-picker>
                        </div>
                    </template>
                </el-form-item>
                <el-form-item label="驾驶证" label-width="100px">
                    <el-upload
                        class="avatar-uploader"
                        :action="baseUrl + '/v1/addimg/shop'"
                        :show-file-list="false"
                        :on-success="handleServiceAvatarScucess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="ruleForm.license" :src="ruleForm.license" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="ruleForm.remark"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
	import { addDriver} from "../api/api"
	import headTop from '../components/headTop'
	import {baseUrl, baseImgPath} from '@/config/env'
	export default {
		name: "addDriver",
        data(){
			return {
				baseUrl,
				baseImgPath,
				value3: '',
				ruleForm: {
					license: '',
                    realname: '',
                    mobile: '',
					card: '',
                    address: '',
					entryDate: '',
                    remark: '',
                },
            }
        },
		components: {
			headTop
		},
		methods: {
			handleServiceAvatarScucess(res, file) {
				// if (res.status == 1) {
				// 	this.ruleForm.imageUrl = res.imageUrl;
				// }else{
				// 	this.$message.error('上传图片失败！');
				// }
				this.ruleForm.license = URL.createObjectURL(file.raw);
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
			submitForm(){
				this.$confirm('确认提交吗？', '提示', {}).then(() => {
					let subData = Object.assign({}, this.ruleForm);
					addDriver(subData).then((res) => {
						try{
							if (res.errno == 0) {
								this.$message({
									type: 'success',
									message: '添加驾驶员成功'
								});
							}else{
								throw new Error(res.errmsg)
							}}catch(err){
							this.$message({
								type: 'error',
								message: err.errmsg
							});
							console.log('添加驾驶员失败')
						}
					})
				})
            }
        }
	}
</script>

<style lang="less">
    @import '../style/mixin';

    .content {
        height: 710px;
        width: 100%;
        background-color: #fff;
        box-shadow: 2px 2px 5px #e6e6e6;
        box-sizing: border-box;
        overflow-x: auto;
        padding: 12px 44px;

        .distpicker-address-wrapper {
            text-align: left;
            margin-bottom: 40px;

            select {
                margin-right: 20px;
            }
        }

        .el-form {
            width: 600px;
        }
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
