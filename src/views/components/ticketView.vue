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
            ticketId : null,
            ticket:{},
            isLoading: false,
        }
    },
    async created() {
        try {
            this.ticketId = this.$route.params.id
            await this.getTicketId()
        } catch (error) {
            console.log(error);
        } finally {
            this.isLoading = true
        }
    },
    methods: {
        async getTicketId(){
            try {
                const responseTicket = await api.getTicketId(this.ticketId);
                this.ticket = responseTicket.data;
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
                                    <div class="card-header"><h3 class="text-center font-weight-light my-4">Order {{  this.ticketId  }}: Ticket Details</h3></div>
                                    <div class="card-body">
                                        <form >
                                            <div class="row mb-4">
                                                <div class="d-block text-center mx-auto">
                                                    <img class="img-fluid" :src="this.ticket.attributes.coverImg">
                                                    <div class="form-floating mt-3 mb-md-0">
                                                        <input class="form-control" id="inputFirstName" type="text"
                                                        v-model="this.ticket.attributes.topic" readonly/>
                                                        <label for="inputFirstName">Topic</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mb-4">
                                                <div class="d-block text-center mx-auto">
                                                    <div class="form-floating mt-3 mb-md-0">
                                                        <textarea  class="form-control" id="inputFirstName" type="text"
                                                        v-model="this.ticket.attributes.details" readonly></textarea>
                                                        <label for="inputFirstName">Details</label>
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