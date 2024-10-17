<template>
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    Add
  </button>

  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Add a new blog</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div>
            <h6 class="text-black-50 d-inline">Thumbnail
              <p class="text-danger d-inline">*</p>
              <div class="mb-3">
                <form class="dropzone text-center" id="Thumbnail"></form>
              </div>
            </h6>
          </div>
          <div>
            <h6 class="text-black-50 d-inline">Topic
              <p class="text-danger d-inline">*</p>
              <input class="form-control mb-3" type="text" placeholder="Please, Input your topic."
                aria-label="default input example" v-model="blog.Topic">
            </h6>
          </div>
          <div>
            <h6 class="text-black-50 d-inline">Image cover
              <p class="text-danger d-inline">*</p>
              <div class="mb-3">
                <form class="dropzone text-center" id="Imagecover"></form>
              </div>
            </h6>
          </div>
          <div>
            <h6 class="text-black-50 d-inline">Description
              <p class="text-danger d-inline">*</p>
              <input class="form-control mb-3" type="text" placeholder="Please, Input your description."
                aria-label="default input example" v-model="blog.Description">
            </h6>
          </div>
        </div>
        <form>
          <div class="modal-body mb-3">
            <div class="modal-body mb-3 bg-light rounded-1">
              <div v-for="(paragraph, index) in paragraphs" :key="paragraph.id">
                <h4 class="text-black-50">Paragraph {{ index + 1 }}</h4>
                <div>
                  <h6 class="text-black-50 d-inline">Image
                    <!-- <p class="text-danger d-inline">*</p> -->
                  </h6>
                  <div class="mb-3">
                    <form class="dropzone text-center" :id="'paragraph-' + parseInt(index + 1)"></form>
                  </div>
                </div>
                <div>
                  <h6 class="text-black-50 d-inline">Paragraph
                    <p class="text-danger d-inline">*</p>
                  </h6>
                  <div class="mb-3">
                    <tinymce-vue v-model="paragraph.content" api-key="nfke35xnxz7bxhuividf2jqprve4fetqodofpcdtrrirsz42"
                      :init="{
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

                  </div>
                  <div class="d-flex justify-content-end mt-2 mb-2">
                    <button class="btn btn-danger" @click="deleteParagraph($event, index)">Delete</button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button class="btn btn-outline-dark w-100 p-3 mt-2 mb-2" type="button" @click="addParagraph">Add
                Paragraph</button>
            </div>
          </div>
        </form>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="createBlog(blog, paragraphs)">Save</button>
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
import Editor from '@tinymce/tinymce-vue';

export default {
  components: {
    'tinymce-vue': Editor,
  },
  data() {
    return {
      paragraphs: [{ id: 1, content: '', image: '' }],
      BlogThumbnail: null,
      BlogImagecover: null,
      blog: {
        Topic: '',
        Description: '',
      },
      prefix: "https://strapi.gainlike-service.com",
      localPrefix: 'http://localhost:1338',
      text: ''
    };
  },
  methods: {
    addParagraph(event) {
      event.preventDefault();
      const newId = this.paragraphs.length ? this.paragraphs[this.paragraphs.length - 1].id + 1 : 1;
      this.paragraphs.push({ id: newId, content: '', image: '' });
      this.$nextTick(() => {
        this.createDropzoneForParagraph(this.paragraphs.length - 1, this.paragraphs[this.paragraphs.length - 1]);
      });
    },

    deleteParagraph(event, index) {
      event.preventDefault();
      this.paragraphs.splice(index, 1);
    },

    initializeDropzones() {
      this.paragraphs.forEach((paragraph, index) => {
        this.createDropzoneForParagraph(index, paragraph);
      });
    },

    createDropzoneForParagraph(index, paragraph) {
      const paragraphId = `paragraph-${index + 1}`;
      const formElement = document.getElementById(paragraphId);
      if (formElement) {
        const dropzoneInstance = new Dropzone(`#${paragraphId}`, {
          url: "#",
          maxFiles: 1,
          maxFilesize: 1,
          acceptedFiles: "image/*",
          init: function () {
            this.on('addedfile', (file) => {
              paragraph.image = file;
            });
            this.on('error', (file, response) => {
              console.error(response);
            });
          }
        });

        dropzoneInstance.on("maxfilesexceeded", file => {
          dropzoneInstance.removeFile(file);
          Swal.fire({
            title: "Maximum file",
            text: "You can only upload up to 1 file.",
            icon: "error",
          });
        });
      }
    },
    async createBlog(blog, paragraphs) {
      // console.log(this.text);

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
        // Append the image
        const thumbnail = new FormData();
        const imageCover = new FormData();

        thumbnail.append('files', this.BlogThumbnail.files[0]);
        imageCover.append('files', this.BlogImagecover.files[0]);

        // Upload Blog thumbnail and image
        const uploadThumbnail = await api.upload(thumbnail);
        const uploadImagecover = await api.upload(imageCover);

        // Create Blog details and image
        const createBlog = await api.createBlogs({
          topic: blog.Topic,
          details: blog.Description,
          coverImage: uploadThumbnail[0].id,
          headerImage: uploadImagecover[0].id,
          publish: false,
          coverImg: this.localPrefix + uploadThumbnail[0].url,
          headerImg: this.localPrefix + uploadImagecover[0].url,
        });

        for (let index = 0; index < this.paragraphs.length; index++) {
          const paragraphImg = new FormData();
          let uploadParagraph = ''
          if (this.paragraphs[index].image) {
            paragraphImg.append('files', this.paragraphs[index].image);
            uploadParagraph = await api.upload(paragraphImg);
          } else {
            uploadParagraph = '';
          }
          await api.createParagraphs({
            blogId: createBlog.data.id.toString(),
            wysiwyg: this.paragraphs[index].content,
            image: this.paragraphs[index].image ? uploadParagraph[0].id : null,
            img: this.paragraphs[index].image ? uploadParagraph[0].url : ''
          }).then((res) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'การทำงานเสร็จสิ้น',
              showConfirmButton: false,
              timer: 1500
            })
              .then(() => {
                window.location.reload();
              })
          })

        }

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

  },
  mounted() {
    this.BlogThumbnail = new Dropzone("#Thumbnail", {
      url: "/",
      maxFiles: 1,
      maxFilesize: 1,
      acceptedFiles: "image/*",
    });

    this.BlogThumbnail.on("maxfilesexceeded", file => {
      this.BlogThumbnail.removeFile(file);
      Swal.fire({
        title: "Maximum file",
        text: "You can only upload up to 1 file.",
        icon: "error"
      });
    });

    this.BlogImagecover = new Dropzone("#Imagecover", {
      url: "/",
      maxFiles: 1,
      maxFilesize: 1,
      acceptedFiles: "image/*",
    });

    this.BlogImagecover.on("maxfilesexceeded", file => {
      this.BlogImagecover.removeFile(file);
      Swal.fire({
        title: "Maximum file",
        text: "You can only upload up to 1 file.",
        icon: "error"
      });
    });
    this.initializeDropzones()
  }
};
</script>