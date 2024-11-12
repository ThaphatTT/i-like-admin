<script>
import api from '@/vendors/api';
import Swal from 'sweetalert2';
export default {
    components: {
    },
    data() {
        return {
            product: {
                details: null,
                price: null,
                platform: null,
                service: null,
                customerType: null,
                amount: null,
                link: null,
                comments: null,
                isPublish: false
            }
        };
    },
    mounted() {

    },
    methods: {
        async createProduct() {
            try {
                const createProduct = await api.createProducts({
                    data: {
                        details: this.product.details,
                        price: this.product.price,
                        isPublish: this.product.isPublish,
                        amount: this.product.amount,
                        type: this.product.customerType,
                        platform: this.product.platform,
                        service: this.product.service,
                        comments: this.product.comments,
                        link: this.product.link,
                    }
                }).then(() => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        window.location.reload();
                    })
                })
            } catch (error) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: error.message,
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    window.location.reload();
                })
            }
        }
    }
};
</script>

<template>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        เพิ่มบริการใหม่
    </button>

    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Create a Product</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="fw-bold mb-1  text-start">Details</div>
                        <input v-model="product.details" class="form-control" id="inputLastName" type="text"
                            placeholder="Please, Input a product details." />
                    </div>
                    <div class="row mb-3 mt-3">
                        <div class="col-md-6">
                            <div class="fw-bold mb-1 text-star">Link</div>
                            <input v-model="product.link" class="form-control" id="inputLastName" type="text"
                                placeholder="Please, Input a customer link." />
                        </div>
                        <div class="col-md-6">
                            <div class="fw-bold mb-1">Service</div>
                            <select v-model="product.service" class="form-select" aria-label="Default select example">
                                <option value="view">view</option>
                                <option value="like">like</option>
                                <option value="follow">follow</option>

                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-3">
                            <div class="fw-bold mb-1">Customer type</div>
                            <select v-model="product.customerType" class="form-select"
                                aria-label="Default select example">
                                <option value="ไทย">ไทย</option>
                                <option value="ต่างชาติ">ต่างชาติ</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <div class="fw-bold mb-1">Platform</div>
                            <select v-model="product.platform" class="form-select" aria-label="Default select example">
                                <option value="facebook">facebook</option>
                                <option value="instagram">instagram</option>
                                <option value="twitter">twitter</option>
                                <option value="youtube">youtube</option>
                                <option value="shopee">shopee</option>
                                <option value="tiktok">tiktok</option>
                                <option value="tiktok">lemon8</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <div class="fw-bold mb-1">Amount</div>
                            <input v-model="product.amount" class="form-control" id="inputLastName" type="text"
                                placeholder="Input product amount." />
                        </div>
                        <div class="col-md-3">
                            <div class="fw-bold mb-1">Price</div>
                            <input v-model="product.price" class="form-control" id="inputLastName" type="text"
                                placeholder="Input product price." />
                        </div>
                        <div class="col-md-12 mb-3">
                            <div class="fw-bold mb-1">Comments</div>
                            <textarea v-model="product.comments" class="form-control" id="exampleFormControlTextarea1"
                                rows="3"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="createProduct">Add</button>
                </div>
            </div>
        </div>
    </div>
</template>