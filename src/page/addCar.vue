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
                <el-form-item label="型号">
                    <template>
                        <el-select v-model="ruleForm.model" placeholder="请选择">
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
                <el-form-item label="车牌号">
                    <el-input v-model="ruleForm.licenseNumber"></el-input>
                </el-form-item>
                <el-form-item label="车架号">
                    <el-input v-model="ruleForm.frameNumber"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
	import { addCar} from "../api/api"
	export default {
		name: "addCar",
		data(){
			return {
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
				ruleForm: {},
			}
		},
		components: {
			headTop
		},
		methods: {
			submitForm(){
				this.$confirm('确认提交吗？', '提示', {}).then(() => {
					let subData = Object.assign({}, this.ruleForm);
					addCar(subData).then((res) => {
						try{
							if (res.errno == 0) {
								this.$message({
									type: 'success',
									message: '添加车辆成功'
								});
							}else{
								throw new Error(res.errmsg)
							}}catch(err){
							this.$message({
								type: 'error',
								message: err.errmsg
							});
							console.log('添加车辆失败')
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
</style>
