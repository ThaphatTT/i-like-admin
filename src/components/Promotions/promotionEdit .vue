<script>
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
import api from '@/vendors/api';
import Swal from 'sweetalert2';
import Loading from '@/components/Loading.vue';

export default {
    props: {
        promotionId: {
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
            promotion: {},
            dropzoneInstance: null,
            promotionCoverImage: null,
            prefix: "http://localhost:1338"  //"https://strapi.gainlike-service.com"
        };
    },
    async created() {
        try {
            this.isLoading = true;
            await this.getPromotionId(this.promotionId);

        } catch (error) {
            console.error('Error during initialization:', error.message);
        } finally {
            this.isLoading = false;
        }
    },
    methods: {
        async getPromotionId(id) {
            try {
                const response = await api.getPromotionId(id);
                this.promotion = response.data;
                this.promotionCoverImage = this.promotion.attributes.coverImg;
            } catch (error) {
                console.error('Error fetching package data:', error);
            }
        },
        // Initialize Dropzone for image upload after the modal is fully shown
        initDropzone() {
            const dropzoneElement = document.getElementById(`coverImageDropzone${this.promotionId}`);

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
        async updatePromotion(promotionId) {
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
                    details: this.promotion.attributes.details,
                    price: this.promotion.attributes.price,
                    coverImage: uploadImagecover ? uploadImagecover[0].id : this.promotion.attributes.coverImage.data[0].id,
                    coverImg: uploadImagecover ? this.prefix + uploadImagecover[0].url : this.promotionCoverImage
                };

                await api.updatePromotions(promotionId, { data: updatedData });

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
                const deleteResponse = await api.deleteImg(this.promotion.attributes.coverImage.data[0].id).then(async res => {
                    await api.updatePromotions(this.promotionId, {
                        data: { coverImg: null }
                    }).then(async res => {
                        this.promotionCoverImage = null; // Clear cover image
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
        document.getElementById(`editPromotion${this.promotionId}`).addEventListener('shown.bs.modal', () => {
            if (!this.promotionCoverImage) {
                this.initDropzone(); // Initialize Dropzone when the modal is opened
            }
        });
    }
};
</script>

<template>
    <button type="button" class="btn btn-warning" data-bs-toggle="modal"
        :data-bs-target="'#editPromotion' + this.promotionId">
        แกไข
    </button>

    <div class="modal fade" :id="'editPromotion' + promotionId" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Edit a Package</h5>
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
                        <h6 class="text-black-50 d-inline">Cover Image
                            <p class="text-danger d-inline">*</p>
                        </h6>
                        <div class="mb-3">
                            <div v-if="promotionCoverImage !== null">
                                <div class="d-block text-center mx-auto">
                                    <img class="img-fluid" :src="promotionCoverImage" alt="Cover Image" />
                                </div>
                                <div class="d-flex justify-content-end mt-2 mb-2">
                                    <button class="btn btn-warning" @click="removeImage">Remove</button>
                                </div>
                            </div>

                            <!-- Dropzone to Upload New Image -->
                            <form v-else :id="'coverImageDropzone' + promotionId" class="dropzone text-center">

                            </form>
                        </div>
                    </div>

                    <!-- Promotion Details -->

                    <div class="mb-3">
                        <label class="fw-bold mb-1 text-start" for="details">Comments</label>
                        <textarea v-model="promotion.attributes.details" class="form-control" id="details" rows="3"
                            placeholder="Details"></textarea>
                    </div>
                </div>

                <!-- Modal Footer with Action Buttons -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="updatePromotion(promotionId)">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>