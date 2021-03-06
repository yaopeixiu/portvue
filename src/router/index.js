import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const ways = r => require.ensure([], () => r(require('@/page/ways')), 'ways');
const driverList = r => require.ensure([], () => r(require('@/page/driverList')), 'driverList');
const addOrder = r => require.ensure([], () => r(require('@/page/addOrder')), 'addOrder');
const addCar = r => require.ensure([], () => r(require('@/page/addCar')), 'addCar');
const carList = r => require.ensure([], () => r(require('@/page/carList')), 'carList');
const alertList = r => require.ensure([], () => r(require('@/page/alertList')), 'alertList');
const addShop = r => require.ensure([], () => r(require('@/page/addShop')), 'addShop');
const addDriver = r => require.ensure([], () => r(require('@/page/addDriver')), 'addDriver');
const addGoods = r => require.ensure([], () => r(require('@/page/addGoods')), 'addGoods');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const shopList = r => require.ensure([], () => r(require('@/page/shopList')), 'shopList');
const foodList = r => require.ensure([], () => r(require('@/page/foodList')), 'foodList');
const orderList = r => require.ensure([], () => r(require('@/page/orderList')), 'orderList');
const adminList = r => require.ensure([], () => r(require('@/page/adminList')), 'adminList');
const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const newMember = r => require.ensure([], () => r(require('@/page/newMember')), 'newMember');
const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: ['监控'],
		},{
            path: '/alertList',
            component: alertList,
            meta: ['异常报警', '报警列表'],
        },{
            path: '/addCar',
            component: addCar,
            meta: ['车辆管理', '添加车辆'],
        },{
            path: '/carList',
            component: carList,
            meta: ['车辆管理', '车辆列表'],
        },{
            path: '/addDriver',
            component: addDriver,
            meta: ['驾驶员管理', '添加驾驶员'],
        },{
            path: '/driverList',
            component: driverList,
            meta: ['驾驶员管理', '驾驶员列表'],
        },{
            path: '/ways',
            component: ways,
            meta: ['路线'],
        },{
			path: '/addShop',
			component: addShop,
			meta: ['车辆管理'],
		},{
			path: '/addGoods',
			component: addGoods,
			meta: ['添加数据', '添加商品'],
		},{
			path: '/userList',
			component: userList,
			meta: ['管理员管理'],
		},{
			path: '/shopList',
			component: shopList,
			meta: ['异常报警'],
		},{
			path: '/foodList',
			component: foodList,
			meta: ['驾驶员管理'],
		},{
			path: '/orderList',
			component: orderList,
			meta: ['订单管理'],
		},{
                path: '/addOrder',
                component: addOrder,
                meta: ['订单管理', '添加订单'],
        },{
			path: '/adminList',
			component: adminList,
			meta: ['数据管理', '管理员列表'],
		},{
			path: '/visitor',
			component: visitor,
			meta: ['图表', '用户分布'],
		},{
			path: '/newMember',
			component: newMember,
			meta: ['图表', '用户数据'],
		},{
			path: '/uploadImg',
			component: uploadImg,
			meta: ['文本编辑', 'MarkDown'],
		},{
			path: '/vueEdit',
			component: vueEdit,
			meta: ['编辑', '文本编辑'],
		},{
			path: '/adminSet',
			component: adminSet,
			meta: ['设置', '管理员设置'],
		},{
			path: '/sendMessage',
			component: sendMessage,
			meta: ['设置', '发送通知'],
		},{
			path: '/explain',
			component: explain,
			meta: ['说明', '说明'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
