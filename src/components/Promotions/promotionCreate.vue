<template>
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createPackage">
    เพิ่มโปรโมชั่นใหม่
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
            <h6 class="text-black-50 d-inline">รูปปก
              <p class="text-danger d-inline">*</p>
              <div class="mb-3">
                <form class="dropzone text-center" id="Imagecover"></form>
              </div>
            </h6>
          </div>
          <div class="mb-3 text-start">
            <label for="exampleFormControlInput1" class="form-label">หัวข้อ</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" v-model="promotion.topic">
          </div>
          <div class="row mb-3 mt-3">
            <div class="col-md-12">
              <div class="fw-bold mb-1 text-start">คำอธิบาย</div>
              <div class="mb-3">
                <tinymce-vue v-model="promotion.details" api-key="nfke35xnxz7bxhuividf2jqprve4fetqodofpcdtrrirsz42"
                  :init="{
                    selector: 'textarea#premiumskinsandicons-jam',
                    skin: 'jam',
                    icons: 'jam',
                    plugins: 'code image link lists',
                    toolbar:
                      'undo redo | styles | bold italic underline forecolor backcolor | align | bullist numlist',
                    menubar: false,
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                    mergetags_list: [
                      { value: 'First.Name', title: 'First Name' },
                      { value: 'Email', title: 'Email' },
                    ],
                    ai_request: (request, respondWith) =>
                      respondWith.string(() =>
                        Promise.reject('See docs to implement AI Assistant')
                      ),
                  }" initial-value="" />
              </div>
            </div>
          </div>
          <div class="text-start">
            <p>
              <small class="text-muted"> <span class="text-danger">****</span>
                กรอกข้อมูลโค้ดเพื่อให้ผู้ใช้สามารถรับโค้ดไปใช้งานได้ (ไม่บังคับ)</small> <span
                class="text-danger">****</span>
            </p>
          </div>
          <div class="row mb-3 mt-3">
            <div class="col-md-3">
              <div class="fw-bold mb-1 text-start">โค้ด</div>
              <input v-model="this.promotion.code" class="form-control" id="code" type="text" />
            </div>
            <div class="col-md-3">
              <div class="fw-bold mb-1 text-start">ประเภท</div>
              <input v-model="this.promotion.type" class="form-control" id="type" type="text" />
            </div>
            <div class="col-md-3">
              <div class="fw-bold mb-1 text-start">จำนวน</div>
              <input v-model="this.promotion.amount" class="form-control" id="amount" type="text" />
            </div>
            <div class="col-md-3">
              <div class="fw-bold mb-1 text-start">หน่วย</div>
              <input v-model="this.promotion.unit" class="form-control" id="unit" type="text" />
            </div>
          </div>
          <div class="row mb-3 mt-3">
            <div class="col-md-12">
              <div class="fw-bold mb-1 text-start">คำอธิบาย</div>
              <textarea v-model="this.promotion.description" class="form-control" id="desc"></textarea>

            </div>
          </div>

          <div class="row mb-3 mt-3">
            <div class="col-md-3">
              <div class="fw-bold mb-1 text-start">จำกัดสิทธิ์</div>
              <input v-model="this.promotion.limit" class="form-control" id="limit" type="number" />
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


<script>
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
import Swal from 'sweetalert2';
import api from '@/vendors/api.js'
import Editor from "@tinymce/tinymce-vue";
export default {
  components: {
    "tinymce-vue": Editor,
  },
  data() {
    return {
      coverImage: null,
      promotion: {
        topics: '',
        details: null,
        coverImg: null,
        price: null,
        isPublish: false,
        code: null,
        limit: null,
        type: null,
        amount: null,
        unit: null,
        description: null,
      },
      // prefix: "http://localhost:1338"
      prefix: "https://strapi.gainlike-service.com"
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
            ...this.promotion,
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
          imageUrl: this.prefix + coverImage.data.url,
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