<template>
  <button type="button" class="btn btn-warning" data-bs-toggle="modal"
    :data-bs-target="'#staticBackdropUpdate' + this.blogId">
    Edit
  </button>

  <div class="modal fade" :id="'staticBackdropUpdate' + this.blogId" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Add a new blog</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            @click="getBlogData(this.blogId)"></button>
        </div>
        <div class="modal-body">
          <div>
            <h6 class="text-black-50 d-inline">Thumbnail
              <p class="text-danger d-inline">*</p>
              <div class="mb-3">
                <div v-if="BlogThumbnail && !dropZone.BlogThumbnail">
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
              <input class="form-control mb-3" type="text" placeholder="Please, Input your topic."
                aria-label="default input example" v-model="blog.Topic">
            </h6>
          </div>
          <div>
            <h6 class="text-black-50 d-inline">Description
              <p class="text-danger d-inline">*</p>
              <input class="form-control mb-3" type="text" placeholder="Please, Input your description."
                aria-label="default input example" v-model="blog.Description">
            </h6>
          </div>
          <div>
            <h6 class="text-black-50 d-inline">Tags
              <p class="text-danger d-inline">*</p>
              <input class="form-control mb-3" type="text" placeholder="Please, Input your description."
                aria-label="default input example" v-model="blog.Tags">
            </h6>
          </div>
          <div>
            <h6 class="text-black-50 d-inline">Image cover
              <p class="text-danger d-inline">*</p>
              <div class="mb-3">
                <div v-if="BlogImagecover && !dropZone.BlogImagecover">
                  <div class="d-block text-center mx-auto">
                    <img class="img-fluid" :src="BlogImagecover">
                  </div>
                  <div class="d-block d-flex justify-content-end mt-2 mb-2">
                    <button class="btn btn-warning"
                      @click="removeImage($event, index, 'BlogImagecover')">Remove</button>
                  </div>
                </div>
                <form v-else class="dropzone text-center" :id="'imageCoverUpdate' + blogId">
                </form>
              </div>
            </h6>
          </div>

        </div>
        <form>
          <div class="modal-body mb-3">
            <div class="modal-body mb-3 bg-light rounded-1">
              <div v-for="(paragraph, index) in paragraphs" :key="paragraph.id">
                <h4 class="text-black-50">Paragraph {{ index + 1 }}</h4>

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

                </div>
                <div>
                  <h6 class="text-black-50 d-inline">Image
                    <!-- <p class="text-danger d-inline">*</p> -->
                  </h6>
                  <div class="mb-3">
                    <div v-if="paragraph.image && !dropZone.paragraphRemove">
                      <div class="d-block text-center mx-auto">
                        <img class="img-fluid" :src="paragraph.image">
                      </div>
                      <div class="d-block d-flex justify-content-end mt-2 mb-2">
                        <button class="btn btn-warning"
                          @click="removeImage($event, index, 'paragraphs')">Remove</button>
                      </div>
                    </div>
                    <div v-else-if="paragraph.image && paragraph.imageId">
                      <div class="d-block text-center mx-auto">
                        <img class="img-fluid" :src="paragraph.image">
                      </div>
                      <div class="d-block d-flex justify-content-end mt-2 mb-2">
                        <button class="btn btn-warning"
                          @click="removeImage($event, index, 'paragraphs')">Remove</button>
                      </div>
                    </div>
                    <form v-else class="dropzone text-center" :id="paragraph.dropzoneId">
                    </form>
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
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
            @click="getBlogData(this.blogId)">Close</button>
          <button type="button" class="btn btn-primary" @click="updateBlog(this.blogId)">Update</button>
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
  props: {
    blogId: {
      type: Number,
      default: ''
    }
  },
  data() {
    return {
      paragraphs: [],
      paragraphsconst: [],
      BlogThumbnail: null,
      BlogImagecover: null,
      blog: {
        Topic: '',
        Description: '',
        coverImgId: '',
        headerImgId: '',
        Tags: ''
      },
      dropZone: {
        BlogThumbnail: false,
        BlogImagecover: false,
        paragraphs: [],
        paragraphRemove: false,
        addFileParagraph: false,
        addImage: false
      },
      prefix: "https://strapi.gainlike-service.com",
      localPrefix: 'http://localhost:1338',

    };
  },
  methods: {
    addParagraph(event) {
      event.preventDefault();
      const newId = this.paragraphs.length ? this.paragraphs[this.paragraphs.length - 1].id + 1 : 1;
      this.paragraphs.push(
        {
          id: newId,
          content: null,
          image: null,
          dropzoneId: `DropzoneParagraph${newId}`,
          orderId: null,
          imageId: null,
          paragraphId: null
        });
      this.$nextTick(() => {
        this.createDropzoneForParagraph(this.paragraphs.length - 1);
      });
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
      }).then(async (result) => {
        if (result.isConfirmed) {
          console.log(this.paragraphs[index]);

          await api.deleteParagraph(this.paragraphs[index].paragraphId)
          this.paragraphs.splice(index, 1);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
    },
    async getBlogData(id) {
      try {
        // Get the blog data
        const blog = await api.getBlogId(id);
        this.paragraphs = [];
        this.BlogThumbnail = blog.data.attributes.coverImg;
        this.BlogImagecover = blog.data.attributes.headerImg
        this.blog.Topic = blog.data.attributes.topic;
        this.blog.Description = blog.data.attributes.details;
        this.blog.Tags = blog.data.attributes.tags;
        this.blog.coverImgId = (blog.data?.attributes?.coverImage?.data && blog.data.attributes.coverImage.data.length > 0)
          ? blog.data.attributes.coverImage.data[0].id
          : null
        this.blog.headerImgId = (blog.data?.attributes?.headerImage?.data && blog.data.attributes.headerImage.data.length > 0)
          ? blog.data.attributes.headerImage.data[0].id
          : null

        // Set up dropZones for blog
        if (!this.BlogThumbnail) {
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
        }
        if (!this.BlogImagecover) {
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
        }
        // Get the paragrains data
        const paragraph = await api.getParagraph();
        let paragraphBlog = paragraph.data.filter(blogId => blogId.attributes.blogId == blog.data.id)
        for (let index = 0; index < paragraphBlog.length; index++) {
          this.paragraphs.push(
            {
              id: index + 1,
              content: paragraphBlog[index].attributes.wysiwyg,
              image: paragraphBlog[index]?.attributes?.img || null,
              dropzoneId: `DropzoneParagraph${index + 1}`,
              orderId: paragraphBlog[index].attributes.blogId,
              imageId: (paragraphBlog[index]?.attributes?.image?.data && paragraphBlog[index].attributes.image.data.length > 0)
                ? paragraphBlog[index].attributes.image.data[0].id : null,
              paragraphId: paragraphBlog[index].id
            }
          )
          await this.$nextTick();
          if (!this.paragraphs.image) {
            this.createDropzoneForParagraph(index);
          }
          this.paragraphsconst.push({
            id: index + 1
          })
        }
      } catch (error) {

      } finally {
        this.fetchSuccess = true
      }
    },
    async removeImage(event, index, data) {
      event.preventDefault();
      switch (data) {
        case "BlogThumbnail":
          const deleteImg1 = await api.deleteImg(this.blog.coverImgId)
          const updateBlogThumbnail = await api.updateBlogs(this.blogId, {
            data: {
              coverImg: null,
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
        case "BlogImagecover":
          const deleteImg2 = await api.deleteImg(this.blog.headerImgId)
          const updateBlogHeader = await api.updateBlogs(this.blogId, {
            data: {
              headerImg: null
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
        case "paragraphs":
          const deleteImg3 = await api.deleteImg(this.paragraphs[index].imageId)
          const updateParagraph = await api.updateParagraphs(this.paragraphs[index].paragraphId, {
            data: {
              img: null,
            }
          })
          this.paragraphs[index].image = null;
          await this.$nextTick();
          this.createDropzoneForParagraph(index);
          this.dropZone.paragraphRemove = true;
          break;
      }
    },
    createDropzoneForParagraph(index) {
      const paragraph = this.paragraphs[index];
      const dropzoneElement = document.getElementById(paragraph.dropzoneId);

      if (dropzoneElement) {
        new Dropzone(dropzoneElement, {
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
        this.dropZone.paragraphRemove = true
        this.dropZone.addImage = true
      }
    },
    async updateBlog(blogId) {
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
        // Update Blog thumbnail and image
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
            coverImage: this.dropZone.BlogThumbnail ? uploadThumbnail[0].id : this.blog.coverImgId,
            headerImage: this.dropZone.BlogImagecover ? uploadImagecover[0].id : this.blog.headerImgId
          }
        })
        this.uploadThumbnail = uploadThumbnail ? uploadThumbnail[0].id : this.blog.coverImgId
        this.uploadImagecover = uploadImagecover ? uploadImagecover[0].id : this.blog.headerImgId
        this.updateBlogImageURL(blogId, this.uploadThumbnail, this.uploadImagecover)

        // update paragraphs
        for (let index = 0; index < this.paragraphs.length; index++) {
          const element1 = this.paragraphs[index]

          if (!element1.imageId) {
            let stateCreate = false;
            let uploadParagraph;
            let paragraphImg = new FormData();

            if (element1.image) {
              paragraphImg.append('files', element1.image);
              uploadParagraph = await api.upload(paragraphImg);

            }

            for (let j = 0; j < this.paragraphsconst.length; j++) {
              const element2 = this.paragraphsconst[j]
              if (element1 <= element2) {
                if (element1.id != element2.id) {
                  if (element1.image) {
                    paragraphImg.append('files', element1.image);
                    uploadParagraph = await api.upload(paragraphImg);
                  }

                  const createParagraph = await api.createParagraphs({
                    blogId: blogId.toString(),
                    wysiwyg: element1.content,
                    image: this.paragraphs[index].image ? uploadParagraph[0].id : null,
                    img: this.paragraphs[index].image ? uploadParagraph[0].url : ''
                  });
                  // this.updateParagraphs(createParagraph.data.id, uploadParagraph[0].id);
                  stateCreate = true;
                }
              }
            }

            if (!stateCreate) {
              let paragraphId = await api.getParagraphId(element1.paragraphId)
              paragraphId = paragraphId ? paragraphId : element1.paragraphId;
              uploadParagraph = uploadParagraph ? uploadParagraph[0].id : this.paragraphs.imageId
              this.updateParagraphs(paragraphId.data.id, uploadParagraph);
            }
          }
        }
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
    async updateBlogImageURL(idBlog, idThumbnail, idCoverImage) {
      const thumbnail = await api.getImage(idThumbnail);
      const coverImage = await api.getImage(idCoverImage);
      const updateBlog = await api.updateBlogs(idBlog, {
        data: {
          coverImg: thumbnail.data.url ? this.prefix + thumbnail.data.url : this.BlogThumbnail,
          headerImg: coverImage.data.url ? this.prefix + coverImage.data.url : this.BlogImagecover,
        }
      });
    },
    async updateParagraphs(idParagraph, idParagraphImage) {
      try {
        const paragraph = await api.getImage(idParagraphImage);
        const imageUrl = paragraph.data.url ? this.prefix + paragraph.data.url : this.paragraphs.image;
        const updateParagraphs = await api.updateParagraphs(idParagraph, {
          data: {
            img: imageUrl,
            image: idParagraphImage ? idParagraphImage : this.paragraphs.imageId
          }
        });
      } catch (error) {
        console.error("Error updating paragraphs:", error);
      }
    },
  },
  mounted() {
    this.getBlogData(this.blogId);
  }
};
</script>