import axios from 'axios'

// const host = process.env.NODE_ENV === "development"? "模拟地址" : "真实地址"
// axios.defaults.withCredentials = true //开启后服务器才能拿到cookie
// axios.defaults.crossDomain = true;//配置axios跨域
// axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8'//配置默认请求头

// 创建axios实例
// const service = axios.create({
//   baseURL: process.env.BASE_API, // api的base_url
//   timeout: 5000 // 请求超时时间
// })

// axios.defaults.baseURL = process.env.BASE_API
axios.defaults.baseURL = 'http://localhost:8083'

export const requestLogin = params => {
  return axios.post('/admin/auth/login', params).then(
    res => res.data
  )
}

export const OrdersList = params => {
    return axios.post('/order/OrdersList', params).then(
        res => res.data
    )
}

export const updateOrder = params => {
    console.log(params)
    return axios.post('/order/modify', params).then(
        res => res.data
    )
}

export const deleteOrder = params => {
    return axios.post('/order/delete', params).then(
        res => res.data
    )
}

export const add = params => {
    return axios.post('/order/add', params).then(
        res => res.data
    )
}

export const getOnCars = params => {
    return axios.post('/cars/getOnCars', params).then(
        res => res.data
    )
}

export const assignOrder = params => {
    return axios.post('/order/assignOrder', params).then(
        res => res.data
    )
}

export const getLocation = params => {
    return axios.post('/map/location/getLocation', params).then(
        res => res.data
    )
}

export const driverList = params => {
    return axios.post('/driver/driverList', params).then(
        res => res.data
    )
}

export const addDriver = params => {
    return axios.post('/driver/addDriver', params).then(
        res => res.data
    )
}

export const updateDriver = params => {
    return axios.post('/driver/updateDriver', params).then(
        res => res.data
    )
}

export const deleteDriver = params => {
    return axios.post('/driver/deleteDriver', params).then(
        res => res.data
    )
}

export const carList = params => {
    return axios.post('/cars/carList', params).then(
        res => res.data
    )
}

export const updateCar = params => {
    return axios.post('/cars/updateCar', params).then(
        res => res.data
    )
}

export const deleteCar = params => {
    return axios.post('/cars/deleteCar', params).then(
        res => res.data
    )
}

export const addCar = params => {
    return axios.post('/cars/addCar', params).then(
        res => res.data
    )
}

export const processed = params => {
    return axios.post('/alert/processed', params).then(
        res => res.data
    )
}

export const getAlert = params => {
    return axios.post('/alert/getAlert', params).then(
        res => res.data
    )
}

