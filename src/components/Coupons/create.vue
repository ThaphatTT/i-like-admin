<template>
  <div
    class="modal fade"
    id="staticBackdrop"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    aria-labelledby="staticBackdrop"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">สร้างคูปองใหม่</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row mb-3 mt-3">
            <div class="col-md-12">
              <div class="fw-bold mb-1 text-star">โค๊ด</div>
              <input
                v-model="coupon.code"
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="โค๊ด lorem..."
              />
            </div>
          </div>
          <div class="row mb-3 mt-3">
            <div class="col-md-6">
              <div class="fw-bold mb-1 text-star">จำกัด</div>
              <input
                v-model="coupon.limits"
                id="numberInput"
                type="number"
                class="form-control"
                rows="3"
                placeholder="จำกัด lorem..."
              />
            </div>
            <div class="col-md-6">
              <div class="fw-bold mb-1 text-star">จำนวน</div>
              <input
                v-model="coupon.amount"
                id="numberInput"
                type="number"
                class="form-control"
                rows="3"
                placeholder="จำนวน lorem..."
              />
            </div>
          </div>
          <div class="row mb-3 mt-3">
            <div class="col-md-6">
              <div class="fw-bold mb-1 text-star">ประเภท</div>
              <input
                v-model="coupon.type"
                class="form-control"
                rows="3"
                placeholder="ประเภท lorem..."
              />
            </div>
            <div class="col-md-6">
              <div class="fw-bold mb-1 text-star">หน่วย</div>
              <input
                v-model="coupon.unit"
                class="form-control"
                rows="3"
                placeholder="หน่วย lorem..."
              />
            </div>
          </div>
          <div class="row mb-3 mt-3">
            <div class="col-md-12">
              <div class="fw-bold mb-1 text-star">ข้อมูลเพิ่มเติม</div>
              <textarea
                v-model="coupon.descriptions"
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="ข้อมูลเพิ่มเติม lorem..."
              ></textarea>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
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
