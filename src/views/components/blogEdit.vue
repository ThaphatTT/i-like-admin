<script>
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
import Swal from 'sweetalert2';
import api from '@/vender/api.js'
export default {
  props : {
    blogId : {
      type : String,
      default : ''
    }
  },
  data() {
    return {
      paragraphs: [],
      BlogThumbnail: null,
      BlogImagecover: null,
      blog:{
        Topic: '',
        Description: '',
      },
      prefix: "http://localhost:1337",
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
      this.$nextTick(() => {
        this.paragraphs.forEach((paragraph, index) => {
          this.createDropzoneForParagraph(index, paragraph);
        });
      });
    },
    createDropzoneForParagraph(index, paragraph) {
      const paragraphId = `paragraph-${index + 2}`;
      const formElement = document.getElementById(paragraphId);  
      console.log(paragraphId);
      console.log(formElement);
      if (formElement && !formElement.dropzone) {
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
      } else {
        console.error("Dropzone element not found or already initialized");
      }
    },
    destroyDropzone(paragraphId) {
      const existingDropzone = Dropzone.forElement(`#${paragraphId}`);
      console.log(existingDropzone);
      
      if (existingDropzone) {
        existingDropzone.destroy();
      }
    },
    async getBlogData(id){
      const blog = await api.getBlogId(id);
      this.blog.Topic = blog.data.attributes.topic;
      this.blog.Description = blog.data.attributes.details;
      const paragraph = await api.getParagraph();
      let paragraphBlog = paragraph.data.filter(blogId => blogId.attributes.blogId == blog.data.id)
      for (let index = 0; index < paragraphBlog.length; index++) {
        this.paragraphs.push(
          {
            id: index + 1, 
            content: paragraphBlog[index].attributes.details, 
            image: paragraphBlog[index].attributes.img
          }
        )
      }
      this.$nextTick(() => {
        this.initializeDropzones();
      });  
    },
    removeImage(event, index) {  
      event.preventDefault();
      if (this.paragraphs[index]) {
        this.paragraphs[index].image = null;
        this.$nextTick(() => {
          this.destroyDropzone(`paragraph-${index + 2}`);
          this.createDropzoneForParagraph(index, this.paragraphs[index]); 
        });
      } else {
        console.error("Invalid index:", index);
      }
    }

  },
  mounted() {
    this.$nextTick(() => {
    const dropzoneElement = document.querySelector(`#ThumbnailUpdate${this.blogId}`);
    if (dropzoneElement) {
      this.BlogThumbnail = new Dropzone(`#ThumbnailUpdate${this.blogId}`, {
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

      this.BlogImagecover = new Dropzone(`#ImagecoverUpdate${this.blogId}`, {
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

      
      } else {
        console.error("Dropzone element not found");
      }
    });
    this.getBlogData(this.blogId);
    }
  };
</script>

<template>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#staticBackdropUpdate'+ this.blogId ">
    Edit
  </button>

  <div class="modal fade" :id="'staticBackdropUpdate' + this.blogId" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
              <form v-if="this.blogId" class="dropzone text-center" :id="'ThumbnailUpdate' + blogId">
                
              </form>
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
              <form v-if="this.blogId" class="dropzone text-center" :id="'ImagecoverUpdate' + this.blogId"></form>
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
                  <div v-if="paragraph.image">
                  <div class="d-block text-center mx-auto">
                    <img class="img-fluid" :src="paragraph.image">
                  </div>
                  <div class="d-block d-flex justify-content-end mt-2 mb-2">
                    <button class="btn btn-warning" @click="removeImage($event, index)">Remove</button>
                  </div>
                </div>
                <form v-else class="dropzone text-center" :id="'paragraph-' + parseInt(index + 2)">
                </form>
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
          <button type="button" class="btn btn-primary" @click="">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>