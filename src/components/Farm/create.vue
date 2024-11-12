<template>
    <div class="modal fade" id="staticBackdrop" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        aria-labelledby="staticBackdrop" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">สร้างคูปองใหม่</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row mb-3 mt-3">
                        <div class="col-md-6">
                            <select class="form-select" aria-label="Default select example">
                                <option selected disabled>แพลตฟอร์ม</option>
                                <option value="facebook">facebook</option>
                                <option value="instagram">instagram</option>
                                <option value="tiktok">tiktok</option>
                                <option value="youtube">youtube</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <select class="form-select" aria-label="Default select example">
                                <option selected>ประเภท</option>
                                <option value="ไทย">ไทย</option>
                                <option value="ต่างชาติ">ต่างชาติ</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3 mt-3">
                        <div class="col-md-12">
                            <div class="fw-bold mb-1 text-star">token</div>
                            <textarea v-model="coupon.descriptions" class="form-control"
                                id="exampleFormControlTextarea1" rows="3"
                                placeholder="ข้อมูลเพิ่มเติม lorem..."></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                    </button>
                    <button type="button" class="btn btn-primary" @click="createCoupon()">
                        Create
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/vendors/api";
import Swal from "sweetalert2";
export default {
    data() {
        return {
            coupon: {
                code: null,
                limits: null,
                amount: null,
                type: null,
                unit: null,
                descriptions: null,
            },
        };
    },
    methods: {
        async createCoupon() {
            Swal.fire({
                title: "กำลังโหลด...",
                text: "กรุณารอสักครู่",
                icon: "info",
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading();
                },
            });
            try {
                const couponCreate = await api.Coupons.create({
                    data: {
                        code: this.coupon.code,
                        limits: this.coupon.limits,
                        amount: this.coupon.amount,
                        type: this.coupon.type,
                        unit: this.coupon.unit,
                        descriptions: this.coupon.descriptions,
                    },
                });
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "การทำงานเสร็จสิ้น",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    window.location.reload();
                });
            } catch (error) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "เกิดข้อผิดพลาด",
                    text: error.message,
                    showConfirmButton: true,
                });
            }
        },
    },
};
</script>