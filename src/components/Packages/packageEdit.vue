<template>
    <button type="button" class="btn btn-warning" data-bs-toggle="modal"
        :data-bs-target="'#editProduct' + this.packageId">
        แก้ไข
    </button>

    <div class="modal fade" :id="'editProduct' + packageId" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">แก้ไขแพ็คเกจ</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <!-- Loading Spinner -->
                <div v-if="isLoading">
                    <Loading />
                </div>

                <!-- Modal Body -->
                <div v-else class="modal-body">
                    <!-- Cover Image Section -->
                    <div>
                        <h6 class="text-black-50 d-inline">รูปปก
                            <p class="text-danger d-inline">*</p>
                        </h6>
                        <div class="mb-3">
                            <div v-if="PackageCoverImage !== null">
                                <div class="d-block text-center mx-auto">
                                    <img class="img-fluid" :src="PackageCoverImage" alt="Cover Image" />
                                </div>
                                <div class="d-flex justify-content-end mt-2 mb-2">
                                    <button class="btn btn-warning" @click="removeImage">ลบออก</button>
                                </div>
                            </div>

                            <!-- Dropzone to Upload New Image -->
                            <form v-else :id="'coverImageDropzone' + packageId" class="dropzone text-center">

                            </form>
                        </div>
                    </div>

                    <!-- Package Details -->
                    <div class="mb-3">
                        <label class="fw-bold mb-1 text-start" for="topic">ชื่อรายการ</label>
                        <input v-model="package.attributes.topic" class="form-control" id="topic" type="text"
                            placeholder="Topic" />
                    </div>

                    <div class="mb-3">
                        <label class="fw-bold mb-1 text-start" for="details">รายละเอียด</label>
                        <textarea v-model="package.attributes.details" class="form-control" id="details" rows="3"
                            placeholder="Details"></textarea>
                    </div>

                    <!-- Service Dropdown -->
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label class="fw-bold mb-1 text-start">บริการ</label>
                            <select v-model="package.attributes.service" class="form-select">
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

                    <!-- Other Package Attributes -->
                    <div class="row mb-3">
                        <div class="col-md-3">
                            <label class="fw-bold mb-1 text-start">ประเภท</label>
                            <select v-model="package.attributes.type" class="form-select">
                                <option value="ไทย">ไทย</option>
                                <option value="ต่างชาติ">ต่างชาติ</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label class="fw-bold mb-1 text-start">แพลตฟอร์ม</label>
                            <select v-model="package.attributes.platform" class="form-select">
                                <option value="facebook">facebook</option>
                                <option value="instagram">instagram</option>
                                <option value="twitter">twitter</option>
                                <option value="youtube">youtube</option>
                                <option value="shopee">shopee</option>
                                <option value="tiktok">tiktok</option>
                                <option value="lemon8">lemon8</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label class="fw-bold mb-1 text-start">จำนวน</label>
                            <input v-model="package.attributes.amount" class="form-control" type="number"
                                placeholder="จำนวน" />
                        </div>
                        <div class="col-md-3">
                            <label class="fw-bold mb-1 text-start">ราคา</label>
                            <input v-model="package.attributes.price" class="form-control" type="number"
                                placeholder="ราคา" />
                        </div>
                    </div>
                </div>

                <!-- Modal Footer with Action Buttons -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
                    <button type="button" class="btn btn-primary" @click="updateProduct(package.id)">แก้ไข</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
import api from '@/vendors/api';
import Swal from 'sweetalert2';
import Loading from '@/components/Loading.vue';

export default {
    props: {
        packageId: {
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
            package: {},
            dropzoneInstance: null,
            PackageCoverImage: null,
            prefix: 'https://strapi.gainlike-service.com'
        };
    },
    async created() {
        try {
            this.isLoading = true;
            // Fetch the package details first
            await this.getPackageId(this.packageId);
        } catch (error) {
            console.error('Error during initialization:', error.message);
        } finally {
            this.isLoading = false;
        }
    },
    methods: {
        // Fetch package data based on the packageId
        async getPackageId(id) {
            try {
                const response = await api.getPackageId(id);
                this.package = response.data;
                this.PackageCoverImage = this.package.attributes.coverImg;
            } catch (error) {
                console.error('Error fetching package data:', error);
            }
        },
        // Initialize Dropzone for image upload after the modal is fully shown
        initDropzone() {
            const dropzoneElement = document.getElementById(`coverImageDropzone${this.packageId}`);

            if (dropzoneElement) {
                this.dropzoneInstance = new Dropzone(dropzoneElement, {
                    url: '#', // Replace with your actual image upload URL
                    maxFiles: 1,
                    maxFilesize: 2, // Maximum file size in MB
                    acceptedFiles: 'image/*',
                });
                this.dropzoneInstance.on("maxfilesexceeded", file => {
                    this.dropzoneInstance.removeFile(file);
                    Swal.fire({
                        title: "Maximum file",
                        text: "You can only upload up to 1 file.",
                        icon: "error"
                    });
                });
            }
        },

        // Update the package with the uploaded image or other details
        async updateProduct(packageId) {
            try {
                this.isLoading = true;

                let uploadImagecover;
                if (this.dropzoneInstance && this.dropzoneInstance.files.length > 0) {
                    const imageCover = new FormData();
                    imageCover.append('files', this.dropzoneInstance.files[0]);
                    const uploadResponse = await api.upload(imageCover);
                    uploadImagecover = uploadResponse // Uploaded image ID
                }

                const updatedData = {
                    ...this.package,
                    img: uploadImagecover ? uploadImagecover[0].id : this.package.attributes.img.data[0].id, // Use new or existing image
                    coverImg: uploadImagecover ? this.prefix + uploadImagecover[0].url : this.PackageCoverImage
                };

                await api.updatePackage(packageId, { data: updatedData });

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Package updated successfully",
                    showConfirmButton: false,
                    timer: 2000,
                }).then(() => {
                    window.location.reload(); // Reload page after success
                });

            } catch (error) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: error.message,
                    showConfirmButton: false,
                    timer: 2000,
                });
                console.log(error);

            } finally {
                this.isLoading = false;
            }
        },

        // Remove the current image and initialize Dropzone
        async removeImage() {
            try {
                const deleteResponse = await api.deleteImg(this.package.attributes.img.data[0].id).then(async res => {
                    await api.updatePackage(this.packageId, {
                        data: { coverImg: null }
                    }).then(async res => {
                        this.PackageCoverImage = null; // Clear cover image
                        await this.$nextTick();
                        this.initDropzone(); // Re-initialize Dropzone for new upload

                    });
                });

            } catch (error) {
                console.error('Error removing image:', error);
            }
        },
    },

    mounted() {
        // Ensure Dropzone is initialized after the modal is fully shown
        document.getElementById(`editProduct${this.packageId}`).addEventListener('shown.bs.modal', () => {
            if (!this.PackageCoverImage) {
                this.initDropzone(); // Initialize Dropzone when the modal is opened
            }
        });
    }
};
</script>