<script>
import SideNavbar from "@/components/SideNavbar.vue";
import api from "@/vendors/api.js";
import Loading from "@/components/Loading.vue";
export default {
  components: {
    SideNavbar,
    Loading,
  },
  data() {
    return {
      ticketId: null,
      ticket: {},
      isLoading: false,
    };
  },
  async created() {
    try {
      this.ticketId = this.$route.params.id;
      await this.getTicketId();
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = true;
    }
  },
  methods: {
    async getTicketId() {
      try {
        const responseTicket = await api.getTicketId(this.ticketId);
        this.ticket = responseTicket.data;
        console.log(this.ticket);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <div id="layoutSidenav">
    <SideNavbar />
    <div v-if="!isLoading" class="mt-2 mb-2">
      <Loading />
    </div>
    <div v-else id="layoutSidenav_content">
      <main>
        <div class="container-fluid px-4">
          <h2 class="text-center mt-3 mb-3">
            {{ this.ticket.attributes.topic }}
          </h2>
          <div class="row mb-3 mb-3">
            <div class="col-12 d-flex align-items-stretch">
              <div class="card w-100">
                <div class="card-body p-4">
                  <form>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label"
                        >หัวข้อปัญหา</label
                      >
                      <p>{{ this.ticket.attributes.topic }}</p>
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label"
                        >รายระเอียดปัญหา</label
                      >
                      <p>
                        {{ this.ticket.attributes.details }}
                      </p>
                    </div>
                    <div class="mb-3">
                      <h6 class="text-end">"TIME STAMP"</h6>
                      <h6 class="text-end">"USER"</h6>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 d-flex align-items-stretch">
              <div class="card w-100">
                <div class="card-body p-4">
                  <h5 class="text-start form-label">ความคิดเห็น</h5>
                  <form>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label"
                        >"Admin"</label
                      >
                      <p class="ms-3">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Minus unde ducimus consequatur facere veniam ea eveniet
                        eius impedit soluta doloremque!
                      </p>
                    </div>
                    <div class="mb-3">
                      <h6 class="text-end">"TIME STAMP"</h6>
                    </div>
                  </form>
                </div>
                <div class="container-fluid ms-5">
                  <div class="row mb-3 mb-3">
                    <div class="col-11 d-flex align-items-stretch">
                      <div class="card w-100">
                        <div class="card-body p-4">
                          <form>
                            <div class="mb-3">
                              <label for="exampleInputEmail1" class="form-label"
                                >"User"</label
                              >
                              <p class="ms-3">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Minus unde ducimus consequatur
                                facere veniam ea eveniet eius impedit soluta
                                doloremque!
                              </p>
                            </div>
                            <div class="mb-3">
                              <h6 class="text-end">"TIME STAMP"</h6>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="container-fluid ms-5">
                  <div class="row mb-3 mb-3">
                    <div class="col-11 d-flex align-items-stretch">
                      <div class="card w-100">
                        <div class="card-body p-4">
                          <form>
                            <div class="mb-3">
                              <label for="exampleInputEmail1" class="form-label"
                                >"Admin"</label
                              >
                              <p class="ms-3">Lorem ipsum dolor sit amet.</p>
                            </div>
                            <div class="mb-3">
                              <h6 class="text-end">"TIME STAMP"</h6>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-12 d-flex align-items-stretch">
                    <div class="card w-100">
                      <div class="card-body p-4">
                        <form>
                          <div>
                            <label for="exampleInputEmail1" class="form-label"
                              >แสดงความคิดเห็น</label
                            >
                            <input
                              type="email"
                              class="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="คิดอะไรอยู่?"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div id="layoutSidenav_footer">
        <footer class="py-4 bg-light mt-auto">
          <div class="container-fluid px-4">
            <div
              class="d-flex align-items-center justify-content-between small"
            >
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
