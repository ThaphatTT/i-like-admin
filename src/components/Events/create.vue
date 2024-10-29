<template>
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">กิจกกรรมใหม่</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div>
                        <h6 class="text-black-50 d-inline">ภาพปก (ขนาดเล็ก)
                            <p class="text-danger d-inline">*</p>
                            <div class="mb-3">
                                <form class="dropzone text-center" id="Thumbnail"></form>
                            </div>
                        </h6>
                    </div>
                    <div>
                        <h6 class="text-black-50 d-inline">ภาพปก
                            <p class="text-danger d-inline">*</p>
                            <div class="mb-3">
                                <form class="dropzone text-center" id="Imagecover"></form>
                            </div>
                        </h6>
                    </div>
                    <div>
                        <h6 class="text-black-50 d-inline">หัวข้อ
                            <p class="text-danger d-inline">*</p>
                            <input class="form-control mb-3" type="text" aria-label="default input example"
                                v-model="tickets.topic">
                        </h6>
                    </div>
                    <div>
                        <h6 class="text-black-50 d-inline">คำอธิบาย
                            <p class="text-danger d-inline">*</p>
                            <tinymce-vue v-model="tickets.details"
                                api-key="nfke35xnxz7bxhuividf2jqprve4fetqodofpcdtrrirsz42" :init="{
                                    selector: 'textarea#premiumskinsandicons-jam',
                                    skin: 'jam',
                                    icons: 'jam',
                                    plugins: 'code image link lists',
                                    toolbar: 'undo redo | styles | bold italic underline forecolor backcolor | align | bullist numlist',
                                    menubar: false,
                                    tinycomments_mode: 'embedded',
                                    tinycomments_author: 'Author name',
                                    mergetags_list: [
                                        { value: 'First.Name', title: 'First Name' },
                                        { value: 'Email', title: 'Email' },
                                    ],
                                    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                                }" initial-value="" />
                        </h6>
                    </div>


                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
import Editor from '@tinymce/tinymce-vue';
export default {
    components: {
        'tinymce-vue': Editor,
    },
    data() {
        return {
            showModal: false,
            tickets: {
                topic: '',
                details: '',
                thumbnail: '',
                image: '',
            }
        }
    },
    mounted() {
        this.tickets.thumbnail = new Dropzone("#Thumbnail", {
            url: "/",
            maxFiles: 1,
            maxFilesize: 1,
            acceptedFiles: "image/*",
        });

        this.tickets.thumbnail.on("maxfilesexceeded", file => {
            this.tickets.thumbnail.removeFile(file);
            Swal.fire({
                title: "Maximum file",
                text: "You can only upload up to 1 file.",
                icon: "error"
            });
        });

        this.tickets.image = new Dropzone("#Imagecover", {
            url: "/",
            maxFiles: 1,
            maxFilesize: 1,
            acceptedFiles: "image/*",
        });

        this.tickets.image.on("maxfilesexceeded", file => {
            this.tickets.image.removeFile(file);
            Swal.fire({
                title: "Maximum file",
                text: "You can only upload up to 1 file.",
                icon: "error"
            });
        });
    },
    methods: {
        openModal() {
            this.showModal = true;
        },
    }
}
</script>