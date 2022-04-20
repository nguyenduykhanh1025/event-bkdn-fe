import apiService from './apiService'

const productService = {
  getProducts: () => {
    apiService.get('/test').then(res => console.log(res))
  }
}

export default productService
