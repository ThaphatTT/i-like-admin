<script>
import api from '@/vendors/api';
import Swal from 'sweetalert2';
import Loading from '@/components/Loading.vue';
export default {
    props: {
        productId: {
            type: Number,
            required: true,
        }
    },
    components: {
        Loading
    },
    data() {
        return {
            isLoading: false,
            product: {
                details: null,
                price: null,
                platform: null,
                service: null,
                customerType: null,
                amount: null,
                link: null,
                comments: null,
                isPublish: true
            }
        };
    },
    async mounted() {
        try {
            await this.getProductId()
        } catch (error) {
            console.log(error);
        } finally {
            this.isLoading = true
        }
    },
    methods: {
        async getProductId() {
            const getProductId = await api.getProductId(this.productId)
            this.product = getProductId.data
        },
        async updateProduct(productId) {
            try {
                const updateProduct = await api.updateProducts(productId, {
                    data: {
                        details: this.product.attributes.details,
                        price: this.product.attributes.price,
                        isPublish: this.product.attributes.isPublish,
                        amount: this.product.attributes.amount,
                        type: this.product.attributes.type,
                        platform: this.product.attributes.platform,
                        service: this.product.attributes.service,
                        comments: this.product.attributes.comments,
                        link: this.product.attributes.link,
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
    <button type="button" class="btn btn-warning" data-bs-toggle="modal"
        :data-bs-target="'#editProduct' + this.productId">
        แก้ไข
    </button>

    <div class="modal fade" :id="'editProduct' + this.productId" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">แก้ไข</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div v-if="!isLoading">'
                    <Loading />
                </div>
                <div v-else class="modal-body">
                    <div>
                        <div class="fw-bold mb-1 text-start">รายละเอียด</div>
                        <input v-model="product.attributes.details" class="form-control" id="inputLastName"
                            type="text" />
                    </div>
                    <div class="row mb-3 mt-3">
                        <!-- <div class="col-md-6">
                            <div class="fw-bold mb-1 text-start">Link</div>
                            <input v-model="product.attributes.link" class="form-control" id="inputLastName" type="text"
                                placeholder="Please, Input a customer link." />
                        </div> -->
                        <div class="col-md-6">
                            <div class="fw-bold mb-1 text-start">บริการ</div>
                            <select v-model="product.attributes.service" class="form-select"
                                aria-label="Default select example">
                                <option value="view">ยอดวิว</option>
                                <option value="like">ไลก์</option>
                                <option value="follow">ติดตาม</option>
                                <option value="save post">บันทึกโพสต์</option>
                                <option value="comment">คอมเม้นท์</option>
                                <option value="live">ไลฟ์</option>
                                <option value="share post">แชร์โพสต์</option>
                                <option value="month like">ไลก์รายเดือน</option>
                                <option value="like + follow">ไลก์ + ติดตาม</option>
                                <option value="emoji">อีโมจิ</option>
                                <option value="add member">เพิ่มเข้ากลุ่ม</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-3">
                            <div class="fw-bold mb-1 text-start">ประเภท</div>
                            <select v-model="product.attributes.type" class="form-select"
                                aria-label="Default select example">
                                <option value="ไทย">ไทย</option>
                                <option value="ต่างชาติ">ต่างชาติ</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <div class="fw-bold mb-1 text-start">แพลตฟอร์ม</div>
                            <select v-model="product.attributes.platform" class="form-select"
                                aria-label="Default select example">
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
                            <div class="fw-bold mb-1 text-start">จำนวน</div>
                            <input v-model="product.attributes.amount" class="form-control" id="inputLastName"
                                type="text" placeholder="Input product amount." />
                        </div>
                        <div class="col-md-3">
                            <div class="fw-bold mb-1 text-start">ราคา</div>
                            <input v-model="product.attributes.price" class="form-control" id="inputLastName"
                                type="text" placeholder="Input product price." />
                        </div>
                        <!-- <div class="col-md-12 mb-3">
                            <div class="fw-bold mb-1 text-start">Comments</div>
                            <textarea v-model="product.attributes.comments" class="form-control"
                                id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div> -->
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary"
                        @click="updateProduct(this.product.id)">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>