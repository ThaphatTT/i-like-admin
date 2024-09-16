<script>
import SideNavbar from '@/components/SideNavbar.vue'
import api from '@/vender/api.js'
import Loading from '@/components/Loading.vue';
export default {
    components: {
        SideNavbar,
        Loading
    },
    data(){
        return{
            blogId : null,
            blog:{},
            isLoading: false,
            paragraphs:[]
        }
    },
    async mounted() {
        try {
            this.blogId = this.$route.params.id
            await this.getDataBlogId()
        } catch (error) {
            console.log(error);
        } finally {
            this.isLoading = true
        }
    },
    methods: {
        async getDataBlogId(){
            try {
                const responseBlog = await api.getBlogId(this.blogId);
                const responseParagraph = await api.getParagraph();
                const paragraph = responseParagraph.data.filter(paragraph => paragraph.attributes.blogId == this.blogId)
                this.blog = responseBlog.data;
                this.paragraphs = paragraph;
            } catch (error) {
                console.log(error);
            }
        }
    },
};

</script>

<template>
    <div id="layoutSidenav">
        <SideNavbar/>
        <div v-if="!isLoading" class="mt-2 mb-2">
            <Loading/>
        </div>
        <div v-else id="layoutSidenav_content">
                <main>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-7">
                                <div class="card shadow-lg border-0 rounded-lg mt-5">
                                    <div class="card-header"><h3 class="text-center font-weight-light my-4">Blog Detail</h3></div>
                                    <div class="card-body">
                                        <form >
                                            <div class="row mb-4">
                                                <div class="d-block text-center mx-auto">
                                                    <img class="img-fluid" :src="this.blog.attributes.coverImg">
                                                    <div class="form-floating mt-3 mb-md-0">
                                                        <input class="form-control" id="inputFirstName" type="text"
                                                        v-model="this.blog.attributes.topic" readonly/>
                                                        <label for="inputFirstName">Topic</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mb-4">
                                                <div class="d-block text-center mx-auto">
                                                    <img class="img-fluid" :src="this.blog.attributes.coverImg">
                                                    <div class="form-floating mt-3 mb-md-0">
                                                        <textarea  class="form-control" id="inputFirstName" type="text"
                                                        v-model="this.blog.attributes.details" readonly></textarea>
                                                        <label for="inputFirstName">Details</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-body mb-3">
                                                <div  class="modal-body mb-3 bg-light rounded-1">
                                                    <div v-for="(paragraph, index) in this.paragraphs" :key="paragraph.id">
                                                        <h4 class="text-black-50">Paragraph {{ index+1 }}</h4>
                                                    <div>
                                                        <h6 class="text-black-50 d-inline">Image
                                                        <p class="text-danger d-inline">*</p>
                                                        </h6>
                                                        <div class="mb-3">
                                                        <div v-if="paragraph.attributes.img">
                                                            <div class="d-block text-center mx-auto">
                                                            <img class="img-fluid" :src="paragraph.attributes.img">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                    <div>
                                                        <h6 class="text-black-50 d-inline">Paragraph
                                                        <p class="text-danger d-inline">*</p>
                                                        </h6>
                                                        <div class="mb-3">
                                                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="paragraph.attributes.details"></textarea>
                                                        </div>
                                                    </div>
                                                    </div>
                                                    </div>
                                                </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <div id="layoutSidenav_footer">
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid px-4">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; Your Website 2023</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
            </div>
    </div>
</template>