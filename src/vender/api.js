import axios from 'axios';

// const url = 'http://localhost:1338/api'
const url = 'http://27.254.134.141:1338/api'

const api = {
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
  getProducts(page, pageSize, filter, search) {
    let filtering = '';
    let query = '';
    if (filter && filter != 'ทั้งหมด') {
      filtering = `&filters[platform][$eq]=${filter}`;
    }
    if (search) {
      query = `&filters[details][$contains]=${search}`;
    }
    return new Promise((resolve, reject) => {
      axios.get(`${url}/products?pagination[page]=${page}&pagination[pageSize]=${pageSize}${filtering}${query}`, {
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
  getOrders(data) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/orders?pagination[page]=${data}&pagination[pageSize]=10`, {
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
  sortOrders(data) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/orders?sort=createdAt:desc&populate=*&pagination[page]=${data}&pagination[pageSize]=10`, {
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
  queryCarts(id) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/carts?populate=*&filters[orderId][$eq]=${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error);
      })
    })
  },
  getUsers(id) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/users/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      })
    })
  }
}

export default api
