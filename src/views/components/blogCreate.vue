<script>
export default {
  data() {
    return {
      paragraphs: [{ id: 1, content: '' }],
    };
  },
  methods: {
    addParagraph(event) {
      event.preventDefault();
      const newId = this.paragraphs.length ? this.paragraphs[this.paragraphs.length - 1].id + 1 : 1;
      this.paragraphs.push({ id: newId, content: '' });
    },
    deleteParagraph(event, index) {
      event.preventDefault();
      this.paragraphs.splice(index, 1);
    }
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
            <input class="form-control" type="file" id="formFile">
          </div>
        </h6>
        </div>
        <div>
          <h6 class="text-black-50 d-inline">Topic
          <p class="text-danger d-inline">*</p>
          <input class="form-control mb-3" type="text" placeholder="Please, Input your topic." aria-label="default input example">
        </h6>
        </div>
        <div>
          <h6 class="text-black-50 d-inline">Image cover
          <p class="text-danger d-inline">*</p>
          <div class="mb-3">
            <input class="form-control" type="file" id="formFile">
          </div>
        </h6>
        </div>
        <div>
          <h6 class="text-black-50 d-inline">Description
          <p class="text-danger d-inline">*</p>
          <input class="form-control mb-3" type="text" placeholder="Please, Input your description." aria-label="default input example">
        </h6>
        </div>
      </div>
      <form action="">
        <div class="modal-body mb-3">
          <div  class="modal-body mb-3 bg-light rounded-1">
            <div v-for="(paragraph, index) in paragraphs" :key="paragraph.id">
              <h4 class="text-black-50">Paragraph {{ index+1 }}</h4>
            <div>
              <h6 class="text-black-50 d-inline">Image
                <p class="text-danger d-inline">*</p>
              </h6>
              <div class="mb-3">
                  <input class="form-control" type="file" id="formFile">
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
        <button type="button" class="btn btn-primary">Save</button>
      </div>
    </div>
  </div>
</div>
</template>