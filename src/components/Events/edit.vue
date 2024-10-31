<template>
  <button
    type="button"
    class="btn btn-warning"
    data-bs-toggle="modal"
    :data-bs-target="'#staticBackdropEventUpdate' + this.eventId"
  >
    แก้ไข
  </button>

  <div
    class="modal fade"
    :id="'staticBackdropEventUpdate' + this.eventId"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropEventUpdate"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">แก้ไขกิจกรรม</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="getEventData(this.eventId)"
          ></button>
        </div>
        <div class="modal-body text-start">
          <div>
            <h6 class="text-black-50 d-inline">
              ภาพปก (ขนาดเล็ก)
              <p class="text-danger d-inline">*</p>
              <div class="mb-3">
                <div v-if="eventThumbnail && !dropZone.eventThumbnail">
                  <div class="d-block text-center mx-auto">
                    <img class="img-fluid" :src="eventThumbnail" />
                  </div>
                  <div class="d-block d-flex justify-content-end mt-2 mb-2">
                    <button
                      class="btn btn-warning"
                      @click="removeImage($event, index, 'eventThumbnail')"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <form
                  v-else
                  class="dropzone text-center"
                  :id="'eventThumbnail' + eventId"
                ></form>
              </div>
            </h6>
          </div>
          <div>
            <h6 class="text-black-50 d-inline">
              ภาพปก
              <p class="text-danger d-inline">*</p>
              <div class="mb-3">
                <div v-if="eventImagecover && !dropZone.eventImagecover">
                  <div class="d-block text-center mx-auto">
                    <img class="img-fluid" :src="eventImagecover" />
                  </div>
                  <div class="d-block d-flex justify-content-end mt-2 mb-2">
                    <button
                      class="btn btn-warning"
                      @click="removeImage($event, index, 'eventImagecover')"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <form
                  v-else
                  class="dropzone text-center"
                  :id="'eventImageUpdate' + eventId"
                ></form>
              </div>
            </h6>
          </div>
          <div>
            <h6 class="text-black-50 d-inline">
              หัวข้อ
              <p class="text-danger d-inline">*</p>
              <input
                class="form-control mb-3"
                type="text"
                aria-label="default input example"
                v-model="event.topic"
              />
            </h6>
          </div>
          <div>
            <h6 class="text-black-50 d-inline">
              คำอธิบาย
              <p class="text-danger d-inline">*</p>
              <tinymce-vue
                v-model="event.details"
                api-key="nfke35xnxz7bxhuividf2jqprve4fetqodofpcdtrrirsz42"
                :init="{
                  selector: 'textarea#premiumskinsandicons-jam',
                  skin: 'jam',
                  icons: 'jam',
                  plugins: 'code image link lists',
                  toolbar:
                    'undo redo | styles | bold italic underline forecolor backcolor | align | bullist numlist',
                  menubar: false,
                  tinycomments_mode: 'embedded',
                  tinycomments_author: 'Author name',
                  mergetags_list: [
                    { value: 'First.Name', title: 'First Name' },
                    { value: 'Email', title: 'Email' },
                  ],
                  ai_request: (request, respondWith) =>
                    respondWith.string(() =>
                      Promise.reject('See docs to implement AI Assistant')
                    ),
                }"
                initial-value=""
              />
            </h6>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="getEventData(this.eventId)"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="updateEvent(this.eventId)"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
import Swal from "sweetalert2";
import api from "@/vendors/api.js";
import Editor from "@tinymce/tinymce-vue";
export default {
  components: {
    "tinymce-vue": Editor,
  },
  props: {
    eventId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      eventThumbnail: null,
      eventImagecover: null,
      event: {
        topic: null,
        details: null,
        imageId: null,
        thumbnailId: null,
      },
      dropZone: {
        eventThumbnail: false,
        eventImagecover: false,
      },
      prefix: "https://strapi.gainlike-service.com",
      localPrefix: "http://localhost:1338",
    };
  },
  methods: {
    async getEventData(id) {
      try {
        // Get the event data
        const event = await api.Events.find(id);
        this.eventThumbnail = event.data.attributes.thumbnailUrl;
        this.eventImagecover = event.data.attributes.imageUrl;
        this.event.topic = event.data.attributes.topic;
        this.event.details = event.data.attributes.details;
        this.event.imageId = event.data.attributes.image.data
          ? event.data.attributes.image.data.id
          : null;
        this.event.thumbnailId =
          event.data?.attributes?.thumbnail?.data &&
          event.data.attributes.thumbnail.data.length > 0
            ? event.data.attributes.thumbnail.data[0].id
            : null;
        // Set up dropZones for event
        if (!this.eventThumbnail) {
          await this.$nextTick();
          this.eventThumbnail = null;
          this.dropZone.eventThumbnail = true;
          this.eventThumbnail = new Dropzone(`#eventThumbnail${this.eventId}`, {
            url: "/",
            maxFiles: 1,
            maxFilesize: 1,
            acceptedFiles: "image/*",
          });
          this.eventThumbnail.on("maxfilesexceeded", (file) => {
            this.eventThumbnail.removeFile(file);
            Swal.fire({
              title: "Maximum file",
              text: "You can only upload up to 1 file.",
              icon: "error",
            });
          });
        }
        if (!this.eventImagecover) {
          await this.$nextTick();
          this.eventImagecover = null;
          this.dropZone.eventImagecover = true;
          this.eventImagecover = new Dropzone(
            `#eventImageUpdate${this.eventId}`,
            {
              url: "/",
              maxFiles: 1,
              maxFilesize: 1,
              acceptedFiles: "image/*",
            }
          );
          this.eventImagecover.on("maxfilesexceeded", (file) => {
            this.eventImagecover.removeFile(file);
            Swal.fire({
              title: "Maximum file",
              text: "You can only upload up to 1 file.",
              icon: "error",
            });
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async removeImage(event, index, data) {
      event.preventDefault();
      switch (data) {
        case "eventThumbnail":
          const deleteImg1 = await api.deleteImg(this.event.thumbnailId);
          const updateEventThumbnail = await api.Events.update(this.eventId, {
            data: {
              thumbnailUrl: null,
            },
          });
          this.eventThumbnail = null;
          this.dropZone.eventThumbnail = true;
          await this.$nextTick();
          this.eventThumbnail = new Dropzone(`#eventThumbnail${this.eventId}`, {
            url: "/",
            maxFiles: 1,
            maxFilesize: 1,
            acceptedFiles: "image/*",
          });
          this.eventThumbnail.on("maxfilesexceeded", (file) => {
            this.eventThumbnail.removeFile(file);
            Swal.fire({
              title: "Maximum file",
              text: "You can only upload up to 1 file.",
              icon: "error",
            });
          });
          break;
        case "eventImagecover":
          const deleteImg2 = await api.deleteImg(this.event.imageId);
          const updateEventHeader = await api.Events.update(this.eventId, {
            data: {
              imageUrl: null,
            },
          });
          this.eventImagecover = null;
          this.dropZone.eventImagecover = true;
          await this.$nextTick();
          this.eventImagecover = new Dropzone(
            `#eventImageUpdate${this.eventId}`,
            {
              url: "/",
              maxFiles: 1,
              maxFilesize: 1,
              acceptedFiles: "image/*",
            }
          );
          this.eventImagecover.on("maxfilesexceeded", (file) => {
            this.eventImagecover.removeFile(file);
            Swal.fire({
              title: "Maximum file",
              text: "You can only upload up to 1 file.",
              icon: "error",
            });
          });
          break;
      }
    },
    async updateEvent(eventId) {
      Swal.fire({
        title: "กำลังโหลด...",
        text: "กรุณารอสักครู่",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      try {
        let uploadThumbnail;
        let uploadImagecover;
        if (this.dropZone.eventThumbnail) {
          const thumbnail = new FormData();
          thumbnail.append("files", this.eventThumbnail.files[0]);
          uploadThumbnail = await api.upload(thumbnail);
        }
        if (this.dropZone.eventImagecover) {
          const imageCover = new FormData();
          imageCover.append("files", this.eventImagecover.files[0]);
          uploadImagecover = await api.upload(imageCover);
        }
        const updateEvent = await api.Events.update(eventId, {
          data: {
            topic: this.event.topic,
            details: this.event.details,
            thumbnail: this.dropZone.eventThumbnail
              ? uploadThumbnail[0].id
              : this.event.imageId,
            image: this.dropZone.eventImagecover
              ? uploadImagecover[0].id
              : this.event.thumbnailId,
          },
        });
        this.uploadThumbnail = uploadThumbnail
          ? uploadThumbnail[0].id
          : this.event.imageId;
        this.uploadImagecover = uploadImagecover
          ? uploadImagecover[0].id
          : this.event.thumbnailId;
        this.updateEventImageURL(
          eventId,
          this.uploadThumbnail,
          this.uploadImagecover
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: "การทำงานเสร็จสิ้น",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload();
        });
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: error.message,
          showConfirmButton: true,
        });
        console.log(error);
      }
    },
    async updateEventImageURL(idEvent, idThumbnail, idCoverImage) {
      const thumbnail = await api.getImage(idThumbnail);
      const coverImage = await api.getImage(idCoverImage);
      const updateEvent = await api.Events.update(idEvent, {
        data: {
          thumbnailUrl: thumbnail.data.url
            ? this.localPrefix + thumbnail.data.url
            : this.eventThumbnail,
          imageUrl: coverImage.data.url
            ? this.localPrefix + coverImage.data.url
            : this.eventImagecover,
        },
      });
    },
  },
  async mounted() {
    await this.getEventData(this.eventId);
    console.log(this.event);
  },
};
</script>
