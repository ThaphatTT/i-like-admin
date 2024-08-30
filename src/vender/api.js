import axios from 'axios';

const url = 'http://localhost:1337/api'

const api = {
  // Missing Registration API

  login(data) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}/auth/local`, data)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        })
    })
  },
  getBlogs() {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/blogs`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }).then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error);
      })
    })
  },
  deleteBlogs(id) {
    return new Promise((resolve, reject) => {
      axios.delete(`${url}/blogs/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }).then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error);
      })
    })
  },
  createBlogs(data) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}/blogs`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error)
      })
    })
  },
  updateBlogs(id, data) {
    return new Promise((resolve, reject) => {
      axios.put(`${url}/blogs/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error)
      })
    })
  },
  getPromotions() {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/promotions`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }).then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error);
      })
    })
  },
  deletePromotions(id) {
    return new Promise((resolve, reject) => {
      axios.delete(`${url}/promotions/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }).then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error);
      })
    })
  },
  createPromotions(data) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}/promotions`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error)
      })
    })
  },
  updatePromotions(id, data) {
    return new Promise((resolve, reject) => {
      axios.put(`${url}/promotions/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error)
      })
    })
  },
  getProducts() {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/products`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }).then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error);
      })
    })
  },
  deleteProducts(id) {
    return new Promise((resolve, reject) => {
      axios.delete(`${url}/products/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }).then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error);
      })
    })
  },
  createProducts(data) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}/products`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error)
      })
    })
  },
  updateProducts(id, data) {
    return new Promise((resolve, reject) => {
      axios.put(`${url}/products/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error)
      })
    })
  },
  getOrders() {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/orders`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error);
      })
    })
  },
  sortOrders() {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/orders?sort=createdAt:desc&populate=*`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }).then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error);
      })
    })
  },
  getOrder(id) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/orders/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }).then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error);
      })
    })
  },
  deleteOrders(id) {
    return new Promise((resolve, reject) => {
      axios.delete(`${url}/orders/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }).then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error);
      })
    })
  },
  createOrders(data) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}/orders`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error)
      })
    })
  },
  updateOrders(id, data) {
    return new Promise((resolve, reject) => {
      axios.put(`${url}/orders/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error)
      })
    })
  },
  queryCarts(id){
    return new Promise((resolve, reject)=>{
      axios.get(`${url}/carts?populate=*&filters[orderId][$eq]=${id}`, {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then((response)=>{  
        resolve(response.data);
      }).catch((error)=>{
        reject(error);
      })
    })
  },
  getUsers(id){
    return new Promise((resolve, reject)=>{
      axios.get(`${url}/users/${id}`, {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then((response)=>{  
        resolve(response);
      }).catch((error)=>{
        reject(error);
      })
    })
  }
}

export default api
