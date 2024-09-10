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
        coverImgId: '',
        headerImgId: '',
      },
      dropZone:{
        BlogThumbnail: false,
        BlogImagecover: false,
        paragraphs: [],
      },
      prefix: "http://localhost:1337",
    };
  },
  methods: {
    addParagraph(event) {
      event.preventDefault();
      const newId = this.paragraphs.length ? this.paragraphs[this.paragraphs.length - 1].id + 1 : 1;
      this.paragraphs.push({ id: newId, content: '', image: '' });
    },
    deleteParagraph(event, index) {
      event.preventDefault();
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteDataParagraph(this.paragraphs[index])
          this.paragraphs.splice(index, 1);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
    },
    async getBlogData(id){
      const blog = await api.getBlogId(id);
      this.BlogThumbnail = blog.data.attributes.coverImg;
      this.BlogImagecover = blog.data.attributes.headerImg
      this.blog.Topic = blog.data.attributes.topic;
      this.blog.Description = blog.data.attributes.details;
      this.blog.coverImgId = blog.data.attributes.coverImage.data[0].id
      this.blog.headerImgId = blog.data.attributes.headerImage.data[0].id
      
      const paragraph = await api.getParagraph();
      let paragraphBlog = paragraph.data.filter(blogId => blogId.attributes.blogId == blog.data.id)
      for (let index = 0; index < paragraphBlog.length; index++) {
        this.paragraphs.push(
          {
            id: index + 1, 
            content: paragraphBlog[index].attributes.details, 
            image: paragraphBlog[index].attributes.img,
            dropzoneId: `DropzoneParagraph${index + 1}`,
            orderId: paragraphBlog[index].attributes.blogId
          }
        )
      }
    },
    async removeImage(event, index, data) {  
      event.preventDefault();
      switch (data){
        case "BlogThumbnail":
        const deleteImg1 = await api.deleteImg(this.blog.coverImgId)
        const updateBlogThumbnail = await api.updateBlogs(this.blogId,{
          data:{
            coverImg : null,
          }
        })
          this.BlogThumbnail = null
          this.dropZone.BlogThumbnail = true
          await this.$nextTick();
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
        break;
        case "BlogImagecover" : 
          const deleteImg2 = await api.deleteImg(this.blog.headerImgId)
          const updateBlogHeader = await api.updateBlogs(this.blogId,{
          data:{
            headerImg : null
          }
        })
          this.BlogImagecover = null
          this.dropZone.BlogImagecover = true
          await this.$nextTick();
          this.BlogImagecover = new Dropzone(`#imageCoverUpdate${this.blogId}`, {
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
        break;
        case "paragraphs" : 
          this.paragraphs[index].image = null;
          await this.$nextTick();
          this.createDropzoneForParagraph(index);
        break;
      }
    },
    createDropzoneForParagraph(index) {
      const paragraph = this.paragraphs[index];
      const dropzoneElement = document.getElementById(paragraph.dropzoneId);
      if (dropzoneElement) {
        new Dropzone(dropzoneElement, {
          url: "/",
          maxFiles: 1,
          maxFilesize: 1,
          acceptedFiles: "image/*",
        });
      }
    },
    async updateBlog(blogId){
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
        let uploadThumbnail;
        let uploadImagecover;
        if (this.dropZone.BlogThumbnail) {
            const thumbnail = new FormData();
            thumbnail.append('files', this.BlogThumbnail.files[0]);
            uploadThumbnail = await api.upload(thumbnail);
        }
        if (this.dropZone.BlogImagecover) {
            const imageCover = new FormData();
            imageCover.append('files', this.BlogImagecover.files[0]);
            uploadImagecover = await api.upload(imageCover);
        }
        const updateBlog = await api.updateBlog(blogId, {
          data: {
            topic: this.blog.Topic,
            details: this.blog.Description,
            // coverImage: this.dropZone.BlogThumbnail ? [uploadThumbnail[0].id] : [this.blog.coverImgId],
            // headerImage: this.dropZone.BlogImagecover ? [uploadImagecover[0].id] : [this.blog.headerImgId]
          }
            
        }).then(() =>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'สำเร็จ',
            text: "สำเร็จ",
            showConfirmButton: false
          }).then(() =>{
            window.location.reload();
          })
        })
        console.log("createBlog",updateBlog);
      } catch (error) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: error.message,
          showConfirmButton: true
        });
        console.log(error);
      }
    },
    async deleteDataParagraph(index){
      const getParagraph = await api.getParagraph()
      const filterIdParagraph = getParagraph.data.filter(paragraph => paragraph.attributes.img == index.image)
      console.log('filterIdParagraph',filterIdParagraph);
      
      const deleteDataParagraph = await api.deleteParagraph(filterIdParagraph[0].id)
    }
  },
  mounted() {
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
              <div v-if="BlogThumbnail && !dropZone.BlogThumbnail" >
                <div class="d-block text-center mx-auto">
                  <img class="img-fluid" :src="BlogThumbnail">
                </div>
                <div class="d-block d-flex justify-content-end mt-2 mb-2">
                  <button class="btn btn-warning" @click="removeImage($event, index, 'BlogThumbnail')">Remove</button>
                </div>
              </div>
              <form v-else class="dropzone text-center" :id="'ThumbnailUpdate' + blogId">
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
              <div v-if="BlogImagecover && !dropZone.BlogImagecover" >
                <div class="d-block text-center mx-auto">
                  <img class="img-fluid" :src="BlogImagecover">
                </div>
                <div class="d-block d-flex justify-content-end mt-2 mb-2">
                  <button class="btn btn-warning" @click="removeImage($event, index, 'BlogImagecover')">Remove</button>
                </div>
              </div>
              <form v-else class="dropzone text-center" :id="'imageCoverUpdate' + blogId">
              </form>
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
                      <button class="btn btn-warning" @click="removeImage($event, index, 'paragraphs')">Remove</button>
                    </div>
                  </div>
                <form v-else class="dropzone text-center" :id="paragraph.dropzoneId">
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
          <button type="button" class="btn btn-primary" @click="updateBlog(this.blogId)">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>