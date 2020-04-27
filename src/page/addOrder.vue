<template>
    <div>
        <head-top></head-top>
        <div class="content">
            <!-- 省市区三级联动 -->
            <v-distpicker @selected="selected"></v-distpicker>
            <!-- 表单内容 -->
            <el-form
                :model="ruleForm"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="详细地址">
                    <el-input v-model="ruleForm.addr"></el-input>
                </el-form-item>
                <el-form-item label="收货人姓名">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="收货人电话">
                    <el-input v-model="ruleForm.mobile"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
	import headTop from '@/components/headTop'
	import VDistpicker from 'v-distpicker'
    import { add } from "../api/api"
	export default {
		components: {
			VDistpicker,
            headTop
        },

		data() {
			return {
				ruleForm: {
					province: '', // 省
					city: '', // 市
					area: '', // 区
					name: '', // 收货人姓名
					addr: '', // 详细地址
					mobile: '', // 收货人电话
				}
			}
		},
		methods: {
			// 省市区选择最后一项触发
			selected(data) {
				// 对象的遍历,添加到另一对象中
				for (var obj in data) {
					this.ruleForm[obj] = data[obj].value
				}
			},
			// 保存新增
			submitForm() {
				this.$confirm('确认提交吗？', '提示', {}).then(() => {
					let subData = Object.assign({}, this.ruleForm);
					add(subData).then((res) => {
						try{
							if (res.errno == 0) {
								this.$message({
									type: 'success',
									message: '添加订单成功'
								});
							}else{
								throw new Error(res.errmsg)
							}}catch(err){
							this.$message({
								type: 'error',
								message: err.errmsg
							});
							console.log('添加订单失败')
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
