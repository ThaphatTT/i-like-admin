<script>
import api from '@/vender/api';
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
import Swal from 'sweetalert2';
import Loading from '@/components/Loading.vue';
export default {
    props:{
        packageId:{
            type: Number,
            required: true,
        }
    },
    components: {
        Loading
    },
    data() {
        return {
            isLoading : false,
            PackageCoverImage: null,
            BlogThumbnail : null,
            dropzone: {
                PackageCoverImage : false,
            },
            package : {},
            dropzoneInstance: null,
        };
    },
    async created() {
        try {
            await this.getPackageId(this.packageId)
            if (!this.PackageCoverImage.data) {
                // รอให้ DOM อัปเดตให้เรียบร้อยก่อน
                await this.$nextTick();

                // สร้างชื่อ element ID จาก packageId
                let element = `imageCoverUpdate${this.packageId}`;
                
                // ค้นหา element โดยใช้ getElementById
                const dropzoneElement = document.getElementById(element);
                console.log(dropzoneElement); // ตรวจสอบว่าพบ element หรือไม่

                if (dropzoneElement) {
                    this.dropzone.PackageCoverImage = true;
                    this.PackageCoverImage = new Dropzone(`#${element}`, {
                        url: "#",
                        maxFiles: 1,
                        maxFilesize: 1,
                        acceptedFiles: "image/*",
                    });
                    
                    // ตรวจสอบจำนวนไฟล์ที่อัปโหลด
                    this.PackageCoverImage.on("maxfilesexceeded", file => {
                        this.PackageCoverImage.removeFile(file);
                        Swal.fire({
                            title: "Maximum file",
                            text: "You can only upload up to 1 file.",
                            icon: "error"
                        });
                    });

                    console.log(this.PackageCoverImage); // ตรวจสอบว่าการสร้าง Dropzone สำเร็จ
                } else {
                    console.error("Dropzone element not found");
                }
            }

            // this.dropzone.PackageCoverImage = false
                // this.PackageCoverImage = null; 
                // this.PackageCoverImage = new Dropzone(`#imageCoverUpdate`, {
                //     url: "#",
                //     maxFiles: 1,
                //     maxFilesize: 1,
                //     acceptedFiles: "image/*",
                // });
            //     this.PackageCoverImage.on("maxfilesexceeded", file => {
            //         this.PackageCoverImage.removeFile(file);
            //         Swal.fire({
            //             title: "Maximum file",
            //             text: "You can only upload up to 1 file.",
            //             icon: "error"
            //         });
            //     });
                // console.log(this.PackageCoverImage);
                
                
        } catch (error) {
            console.log(error.message);
        } finally {
            this.isLoading = true
        }
    },
    methods :{
        async getPackageId(id) {
            const getPackageId = await api.getPackageId(id);
            this.package = getPackageId.data;
            this.PackageCoverImage = this.package.attributes.img;
        },
        async updateProduct(packageId){
            try {
                let uploadImagecover;
                if (this.dropzone.PackageCoverImage) {
                    const imageCover = new FormData();
                    imageCover.append('files', this.PackageCoverImage.files[0]);
                    uploadImagecover = await api.upload(imageCover);
                }
                const updateProduct = await api.updatePackage(packageId,{
                    data : {
                        topic : this.product.attributes.topic,
                        details : this.product.attributes.details,
                        price: this.product.attributes.price,
                        isPublish : this.product.attributes.isPublish,
                        amount: this.product.attributes.amount,
                        type : this.product.attributes.type,
                        platform: this.product.attributes.platform,
                        service : this.product.attributes.service,
                        img: this.dropzone.PackageCoverImage ? uploadImagecover[0].id : this.PackageCoverImage.data[0].id,
                    }
                })
                this.uploadThumbnail = uploadThumbnail ? uploadThumbnail[0].id : this.blog.coverImgId 
                updatePackageImageURL()
                // .then(()=>{
                //     Swal.fire({
                //         position: "center",
                //         icon: "success",
                //         title: "Your work has been saved",
                //         showConfirmButton: false,
                //         timer: 2000
                //     }).then(()=>{
                //         window.location.reload();
                //     })
                // })
            } catch (error) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: error.message,
                    showConfirmButton: false,
                    timer: 2000
                }).then(()=>{
                    window.location.reload();
                })
            }
        },
        async removeImage(){
            const deleteImg1 = await api.deleteImg(this.package.attributes.img.data[0].id)
            const updatePackageCoverImg = await api.updatePackage(this.packageId,{
            data:{
                coverImg : null,
            }
            })
            this.PackageCoverImage = null
            this.dropzone.PackageCoverImage = true
            await this.$nextTick();
            this.PackageCoverImage = new Dropzone(`#imageCoverUpdate${this.packageId}`, {
                url: "/",
                maxFiles: 1,
                maxFilesize: 1,
                acceptedFiles: "image/*",
            });
            this.PackageCoverImage.on("maxfilesexceeded", file => {
                this.PackageCoverImage.removeFile(file);
                Swal.fire({
                title: "Maximum file",
                text: "You can only upload up to 1 file.",
                icon: "error"
                });
            });
        },
        async updatePackageImageURL(idPackage, idCoverImage){
            const coverImage = await api.getImage(idCoverImage);
            const updateBlog = await api.updateBlogs(idPackage, {
                data:{
                coverImg: coverImage.data.url ? this.prefix + coverImage.data.url : this.PackageCoverImage,
                }
            });
        },
    }
};
</script>

<template>
    <button type="button" class="btn btn-warning" data-bs-toggle="modal" :data-bs-target="'#editProduct' +this.packageId">
        Edit
    </button>
    
    <div class="modal fade" :id="'editProduct'+this.packageId" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Edit a Package</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div v-if="!isLoading">'
                <Loading/>
            </div>
            <div v-else class="modal-body">
                <div>
                    <h6 class="text-black-50 d-inline">CoverImage {{ this.packageId }}
                        <p class="text-danger d-inline">*</p>
                        <div class="mb-3">
                            <div v-if="package.attributes.coverImg && !dropzone.PackageCoverImage" >
                                <div class="d-block text-center mx-auto">
                                    <img class="img-fluid" :src="package.attributes.coverImg">
                                    </div>
                                    <div class="d-block d-flex justify-content-end mt-2 mb-2">
                                    <button class="btn btn-warning" @click="removeImage($event, index)">Remove</button>
                                    </div>
                                </div>
                            <!-- <form v-else class="dropzone text-center" :id="'imageCoverUpdate' + packageId">
                            </form> -->
                            <form class="dropzone text-center" :id="'imageCoverUpdate' + (packageId || '')"></form>
                        </div>
                    </h6>
                </div>
                <div>
                    <div class="fw-bold mb-1 text-start">Details</div>
                    <input v-model="package.attributes.topic" class="form-control" id="inputLastName" type="text" />
                    <div class="col-md-12 mb-3">
                        <div class="fw-bold mb-1 text-start">Comments</div>
                        <textarea v-model="package.attributes.details" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                </div>
                <div class="row mb-3 mt-3">
                    <div class="col-md-6">
                        <div class="fw-bold mb-1 text-start">Service</div>
                        <select v-model="package.attributes.service" class="form-select" aria-label="Default select example">
                            <option value="view">view</option>
                            <option value="add">instagram</option>
                            <option value="twitter">twitter</option>
                            <option value="youtube">youtube</option>
                            <option value="shopee">shopee</option>
                            <option value="tiktok">tiktok</option>
                        </select>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-3">
                        <div class="fw-bold mb-1 text-start">Customer type</div>
                        <select v-model="package.attributes.type" class="form-select" aria-label="Default select example">
                            <option value="ไทย">ไทย</option>
                            <option value="ต่างชาติ">ต่างชาติ</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <div class="fw-bold mb-1 text-start">Platform</div>
                        <select v-model="package.attributes.platform" class="form-select" aria-label="Default select example">
                            <option value="facebook">facebook</option>
                            <option value="instagram">instagram</option>
                            <option value="twitter">twitter</option>
                            <option value="youtube">youtube</option>
                            <option value="shopee">shopee</option>
                            <option value="tiktok">tiktok</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <div class="fw-bold mb-1 text-start">Amount</div>
                            <input v-model="package.attributes.amount" class="form-control" id="inputLastName" type="text" placeholder="Input product amount." />
                    </div>
                    <div class="col-md-3">
                        <div class="fw-bold mb-1 text-start">Price</div>
                            <input v-model="package.attributes.price" class="form-control" id="inputLastName" type="text" placeholder="Input product price." />
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="updateProduct(this.package.id)">Update</button>
            </div>
            </div>
        </div>
    </div>
</template>