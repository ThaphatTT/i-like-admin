<template>
  <div id="layoutSidenav">
    <SideNavbar />
    <div id="layoutSidenav_content">
      <main>
        <div class="container-fluid px-4">
          <div class="row mt-4 justify-content-between">
            <div class="col-4">
              <h1 class="mt-4">กิจกรรม</h1>
              <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item active">Events</li>
              </ol>
            </div>
            <div class="col-4 text-center align-content-center">
              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                  class="btn btn-primary"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  เพิ่มกิจกกรรมใหม่
                </button>
              </div>
            </div>
          </div>

          <div class="card mb-4">
            <div v-if="isLoading" class="mt-2 mb-2">
              <Loading />
            </div>
            <div v-else>
              <div class="card-body">
                <table class="table table-striped table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>ชื่อกิจกรรม</th>
                      <th>หมดเขต</th>
                      <th>การจัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in tickets" :key="index">
                      <td>{{ item.attributes.topic }}</td>
                      <td>{{ item.attributes.expiredDate }}</td>
                      <td class="text-center">
                        <div class="row row-cols-auto justify-content-center">
                          <div class="col-2">
                            <EventEdit :eventId="item.id" />
                          </div>
                          <div class="col-2">
                            <button
                              class="btn btn-danger btn-block"
                              v-if="item.attributes.status !== 'เสร็จสิ้น'"
                              @click="deleteItem(item.id)"
                            >
                              ลบ
                            </button>
                            <p v-else></p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <Pagination
              :total-pages="totalPages"
              :currentPage="currentPage"
              @page-change="handlePageChange"
            />
          </div>
        </div>
      </main>
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

  <EventCreate />
</template>

<script>
import SideNavbar from "@/components/SideNavbar.vue";
import Pagination from "@/components/Pagination.vue";
import Filtering from "@/components/Filtering.vue";
import Loading from "@/components/Loading.vue";
import Swal from "sweetalert2";
import api from "@/vendors/api";

import EventCreate from "@/components/Events/create.vue";
import EventEdit from "@/components/Events/edit.vue";

export default {
  components: {
    Loading,
    SideNavbar,
    Filtering,
    Pagination,
    EventCreate,
    EventEdit,
  },
  data() {
    return {
      selectedFilter: "ทั้งหมด",
      tickets: [],
      itemsInPage: 10,
      currentPage: 1,
      totalPages: 0,
      isLoading: true,
    };
  },
  methods: {
    async fetchEventsData(page = this.currentPage, items = this.itemsInPage) {
      try {
        const response = await api.Events.get(page, items);
        this.tickets = response.data;
        this.totalPages = response.meta.pagination.pageCount;
        console.log(this.tickets);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    // handlePageChange(data) {
    //     this.currentPage = data;
    // },
    async handlePageChange(page) {
      this.currentPage = page;
      await this.fetchEventsData();
    },
    async deleteItem(id) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              await api.Events.delete(`${id}`);
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              this.fetchEventsData();
            } catch (error) {
              console.error("Error deleting item:", error);
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: "There was a problem deleting the item.",
                icon: "error",
              });
            }
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Your file is safe :)",
              icon: "error",
            });
          }
        });
    },
  },
  async created() {
    await this.fetchEventsData()
      .catch((error) => console.log(error))
      .finally(() => {
        this.isLoading = false;
      });
  },
};
</script>
