import axios from "axios";

const url = "http://localhost:1338/api";
// const url = 'https://strapi.gainlike-service.com/api'

const api = {
  // Authentications
  login(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}/auth/local`, data)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getUsers(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/users/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // Blogs
  getBlogs(page, pageSize) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}/blogs?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getBlogId(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/blogs/${id}?populate=*`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  deleteBlogs(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}/blogs/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  createBlogs(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}/blogs`,
          { data },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateBlogs(id, data) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${url}/blogs/${id}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateBlog(id, data) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${url}/blogs/${id}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // Promotions
  getPromotions(page, pageSize) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}/promotions?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  deletePromotions(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}/promotions/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  createPromotions(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}/promotions`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updatePromotions(id, data) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${url}/promotions/${id}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getPromotionId(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/promotions/${id}?populate=*`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // Products
  getProducts(page, pageSize, filter, search) {
    let filtering = "";
    let query = "";
    if (filter && filter != "ทั้งหมด") {
      filtering = `&filters[platform][$eq]=${filter}`;
    }
    if (search) {
      query = `&filters[details][$contains]=${search}`;
    }
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}/products?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}${filtering}${query}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getProductId(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/products/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  deleteProducts(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}/products/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  createProducts(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}/products`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateProducts(id, data) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${url}/products/${id}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // Orders
  getOrders(data) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}/orders?sort[0]=id:desc&pagination[page]=${data}&pagination[pageSize]=10`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  sortOrders(data) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}/orders?sort=createdAt:desc&populate=*&pagination[page]=${data}&pagination[pageSize]=10`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getOrder(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/orders/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  deleteOrders(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}/orders/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  createOrders(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}/orders`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateOrders(id, data) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${url}/orders/${id}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // Carts
  queryCarts(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/carts?populate=*&filters[orderId][$eq]=${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // Paragraphes
  createParagraphs(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}/paragraphs`,
          { data },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateParagraphs(id, data) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${url}/paragraphs/${id}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getParagraph() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/paragraphs?populate=*`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getParagraphId(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/paragraphs/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  deleteParagraph(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}/paragraphs/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // Image files
  upload(data) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: `${url}/upload`,
        data: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.error(
            "Error uploading file:",
            error.response ? error.response.data : error.message
          );
          reject(error);
        });
    });
  },
  getUpload(id) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: `${url}/files/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.error(
            "Error uploading file:",
            error.response ? error.response.data : error.message
          );
          reject(error);
        });
    });
  },
  getUploads() {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: `${url}/files`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.error(
            "Error uploading file:",
            error.response ? error.response.data : error.message
          );
          reject(error);
        });
    });
  },
  getImage(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/upload/files/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  deleteImg(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}/upload/files/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // Packages
  getPackages(page, pageSize) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}/packages?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getPackageId(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/packages/${id}?populate=*`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  createPackage(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}/packages`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updatePackage(id, data) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${url}/packages/${id}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  deletePackage(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}/packages/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // Tickets
  getTickets(page, pageSize) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}/tickets?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getTicketId(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/tickets/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateTicket(id, data) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${url}/tickets/${id}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // Payments history
  getHistories(page, pageSize) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${url}/payments?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // Coupons
  Coupons: {
    get: (page, pageSize) => {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${url}/coupons?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    find: (id) => {},
    create: (data) => {
      return new Promise((resolve, reject) => {
        axios
          .post(`${url}/coupons`, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    update: (id, data) => {},
    delete: (id, data) => {
      return new Promise((reslove, reject) => {
        axios
          .delete(`${url}/coupons/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            reslove(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  // Events and rewards
  Events: {
    get: (page, pageSize) => {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${url}/events?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    find: (id) => {
      return new Promise((resolve, reject) => {
        axios
          .get(`${url}/events/${id}?populate=*`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    create: (data) => {
      return new Promise((resolve, reject) => {
        axios
          .post(`${url}/events`, data, {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    update: (id, data) => {
      return new Promise((resolve, reject) => {
        axios
          .put(`${url}/events/${id}`, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    delete: (id, data) => {
      return new Promise((reslove, reject) => {
        axios
          .delete(`${url}/events/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            reslove(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  Rewards: {
    get: (page, pageSize) => {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${url}/rewards?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    find: (id) => {},
    create: (data) => {
      return new Promise((resolve, reject) => {
        axios
          .post(`${url}/rewards`, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    update: (id, data) => {},
    delete: (id, data) => {
      return new Promise((reslove, reject) => {
        axios
          .delete(`${url}/rewards/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            reslove(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};

export default api;
