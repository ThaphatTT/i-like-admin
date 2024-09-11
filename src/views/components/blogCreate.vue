<script>
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
import Swal from 'sweetalert2';
import api from '@/vender/api.js'
export default {
  data() {
    return {
      paragraphs: [{ id: 1, content: '', image: ''}],
      BlogThumbnail: null,
      BlogImagecover: null,
      blog:{
        Topic: '',
        Description: '',
      },
      prefix: "http://localhost:1337"
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
          init: function() {
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
      const thumbnail = new FormData();
      thumbnail.append('files', this.BlogThumbnail.files[0]);
      
      const uploadThumbnail = await api.upload(thumbnail);
      const imageCover = new FormData();
      imageCover.append('files', this.BlogImagecover.files[0]);
      const uploadImagecover = await api.upload(imageCover);

      const createBlog = await api.createBlogs({
        topic: blog.Topic,
        details: blog.Description,
        coverImage: uploadThumbnail[0].id,
        headerImage: uploadImagecover[0].id,
      });
      this.updateBlogImageURL(createBlog.data.id, uploadThumbnail[0].id, uploadImagecover[0].id);
      for (let index = 0; index < this.paragraphs.length; index++) {
        const paragraphImg = new FormData();
        paragraphImg.append('files', this.paragraphs[index].image);
        const uploadParagraph = await api.upload(paragraphImg);
        const createParagraph = await api.createParagraphs({
          blogId: createBlog.data.id.toString(),
          details: this.paragraphs[index].content,
          image: uploadParagraph[0].id,
        });
        this.updateParagraphs(createParagraph.data.id, uploadParagraph[0].id);
      }
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'การทำงานเสร็จสิ้น',
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
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
    async updateBlogImageURL(idBlog, idThumbnail, idCoverImage){
      const thumbnail = await api.getImage(idThumbnail);
      const coverImage = await api.getImage(idCoverImage);
      const updateBlog = await api.updateBlogs(idBlog, {
        data:{
          coverImg: this.prefix + thumbnail.data.url,
          headerImg: this.prefix + coverImage.data.url,
        }
      });
    },
    async updateParagraphs(idParagraph, idParagraphImage){
      const paragraph = await api.getImage(idParagraphImage)
      const updateParagraphs = await api.updateParagraphs(idParagraph, {
        data:{
          img : this.prefix + paragraph.data.url
        }
      })
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

<template>
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    Add
  </button>

  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
            <input class="form-control mb-3" type="text" placeholder="Please, Input your topic." aria-label="default input example" v-model="blog.Topic">
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
            <input class="form-control mb-3" type="text" placeholder="Please, Input your description." aria-label="default input example" v-model="blog.Description">
          </h6>
          </div>
        </div>
        <form>
          <div class="modal-body mb-3">
            <div  class="modal-body mb-3 bg-light rounded-1">
              <div v-for="(paragraph, index) in paragraphs" :key="paragraph.id">
                <h4 class="text-black-50">Paragraph {{ index+1 }}</h4>
              <div>
                <h6 class="text-black-50 d-inline">Image
                  <p class="text-danger d-inline">*</p>
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
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="paragraph.content"></textarea>
                  </div>
                  <div class="d-flex justify-content-end mt-2 mb-2">
                    <button class="btn btn-danger" @click="deleteParagraph($event, index)">Delete</button>
                  </div>
              </div>
              </div>
            </div>
            <div>
              <button class="btn btn-outline-dark w-100 p-3 mt-2 mb-2" type="button" @click="addParagraph">Add Paragraph</button>
            </div>
            </div>
        </form>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="createBlog(blog,paragraphs)">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>