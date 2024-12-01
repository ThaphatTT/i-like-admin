<template>
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createPackage">
    เพิ่มแพ็คเกจใหม่
  </button>

  <div class="modal fade" id="createPackage" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">เพิ่มแพ็คเกจใหม่</h5>
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
          <div class="row mb-3 mt-3">
            <div class="col-md-6">
              <div class="fw-bold mb-1 text-star">ชื่อรายการ</div>
              <input v-model="this.package.topic" class="form-control" id="inputLastName" type="text" />
            </div>
            <div class="col-md-6">
              <div class="fw-bold mb-1">บริการ</div>
              <select v-model="this.package.service" class="form-select" aria-label="Default select example">
                <option value="view">ยอดวิว</option>
                <option value="like">ไลก์</option>
                <option value="follow">ติดตาม</option>
                <option value="comment">คอมเมนต์</option>
                <option value="save post">บันทึกโพสต์</option>
                <option value="share post">แชร์โพสต์</option>
                <option value="live">ไลฟ์</option>
                <option value="month like">รายเดือน</option>
                <option value="like + follow">ไลก์ + ติดตาม</option>
                <option value="emoji">อีโมจิ</option>
              </select>
            </div>
          </div>
          <div class="row mb-3 mt-3">
            <div class="col-md-12">
              <div class="fw-bold mb-1 text-star">รายละเอียด</div>
              <textarea v-model="this.package.details" class="form-control" id="exampleFormControlTextarea1" rows="3"
                placeholder="Input detals"></textarea>
            </div>
          </div>
          <div class="row mb-3 mt-3">
            <div class="col-md-2">
              <div class="fw-bold mb-1 text-star">ประเภท</div>
              <select v-model="this.package.type" class="form-select" aria-label="Default select example">
                <option value="ไทย">ไทย</option>
                <option value="ต่างชาติ">ต่างชาติ</option>
              </select>
            </div>
            <div class="col-md-2">
              <div class="fw-bold mb-1 text-star">แพลตฟอร์ม</div>
              <select v-model="this.package.platform" class="form-select" aria-label="Default select example">
                <option value="facebook">facebook</option>
                <option value="instagram">instagram</option>
                <option value="twitter">twitter</option>
                <option value="youtube">youtube</option>
                <option value="shopee">shopee</option>
                <option value="tiktok">tiktok</option>
                <option value="lemon8">lemon8</option>
              </select>
            </div>
            <div class="col-md-2">
              <div class="fw-bold mb-1 text-star">จำนวน</div>
              <input v-model="this.package.amount" class="form-control" id="inputLastName" type="number"
                placeholder="จำนวน" />
            </div>
            <div class="col-md-2">
              <div class="fw-bold mb-1 text-star">ราคา</div>
              <input v-model="this.package.price" class="form-control" id="inputLastName" type="number"
                placeholder="ราคา" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
          <button type="button" class="btn btn-primary" @click="createPackage()">บันทึก</button>
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
export default {
  data() {
    return {
      coverImage: null,
      package: {
        details: null,
        coverImg: null,
        type: null,
        service: null,
        price: null,
        amount: null,
        platform: null,
        isPublish: false,
        topic: null,
        img: null,
      },
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

        const createPackage = await api.createPackage({
          data: {
            ...this.package,
            img: uploadImagecover[0].id,
          }
        });
        this.updateBlogImageURL(createPackage.data.id, uploadImagecover[0].id);
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
    async updateBlogImageURL(idPackage, idCoverImage) {
      const coverImage = await api.getImage(idCoverImage);
      const updatePackage = await api.updatePackage(idPackage, {
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