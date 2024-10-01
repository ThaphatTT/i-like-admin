<script>
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
import Swal from 'sweetalert2';
import api from '@/vender/api.js'
export default {
  data() {
    return {
      coverImage: null,
      promotion: {
        details: null,
        coverImg: null,
        price: null,
        isPublish: false,
      },
      prefix: "http://localhost:1337" // http://27.254.134.141:1338/
    };
  },
  methods: {
    async createPackage() {
      Swal.fire({
        title: 'กำลังโหลด...',
        text: 'กรุณารอสักครู่',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        }
      });
      try {
        const imageCover = new FormData();
        imageCover.append('files', this.coverImage.files[0]);
        const uploadImagecover = await api.upload(imageCover);

        const createPromotion = await api.createPromotions({
          data: {
            details: this.promotion.details,
            price: this.promotion.price,
            isPublish: this.promotion.isPublish,
            coverImage: uploadImagecover[0].id,
          }
        });
        this.updatePromotionImageURL(createPromotion.data.id, uploadImagecover[0].id);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'การทำงานเสร็จสิ้น',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload();
        })
      } catch (error) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: error.message,
          showConfirmButton: true
        });
      }
    },
    async updatePromotionImageURL(idPromotion, idCoverImage) {
      const coverImage = await api.getImage(idCoverImage);
      const updatePackage = await api.updatePromotions(idPromotion, {
        data: {
          coverImg: this.prefix + coverImage.data.url,
        }
      });
    },
  },
  mounted() {
    this.coverImage = new Dropzone("#Imagecover", {
      url: "#",
      maxFiles: 1,
      maxFilesize: 1,
      acceptedFiles: "image/*",
    });

    this.coverImage.on("maxfilesexceeded", file => {
      this.coverImage.removeFile(file);
      Swal.fire({
        title: "Maximum file",
        text: "You can only upload up to 1 file.",
        icon: "error"
      });
    });
  }
};
</script>

<template>
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createPackage">
    Add
  </button>

  <div class="modal fade" id="createPackage" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Add a new Promotion</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div>
            <h6 class="text-black-50 d-inline">Image cover
              <p class="text-danger d-inline">*</p>
              <div class="mb-3">
                <form class="dropzone text-center" id="Imagecover"></form>
              </div>
            </h6>
          </div>
          <div class="row mb-3 mt-3">
            <div class="col-md-12">
              <div class="fw-bold mb-1 text-star">Details</div>
              <textarea v-model="this.promotion.details" class="form-control" id="exampleFormControlTextarea1" rows="3"
                placeholder="Input detals"></textarea>
            </div>
          </div>
          <div class="row mb-3 mt-3">
            <div class="col-md-1">
              <div class="fw-bold mb-1 text-star">Price</div>
              <input v-model="this.promotion.price" class="form-control" id="inputLastName" type="text" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="createPackage()">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>