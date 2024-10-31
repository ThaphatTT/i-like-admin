<script>
import SideNavbar from "@/components/SideNavbar.vue";
import api from "@/vendors/api";
import Pagination from "@/components/Pagination.vue";

import Loading from "@/components/Loading.vue";
import Filtering from "@/components/Filtering.vue";
import Swal from "sweetalert2";

export default {
  components: {
    Loading,
    SideNavbar,
    Filtering,
    Pagination,
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
    async fetchTicketsData(page = this.currentPage, items = this.itemsInPage) {
      try {
        const response = await api.getTickets(page, items);
        this.tickets = response.data;
        this.totalPages = response.meta.pagination.pageCount;
        console.log(this.tickets);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    changeLanguage(data) {
      if (data === true) {
        return "เผยแพร่แล้ว";
      } else if (data === false) {
        return "ยังไม่ได้เผยแพร่";
      } else {
        return "ไม่พบข้อมูล";
      }
    },
    handlePageChange(data) {
      this.currentPage = data;
    },
    async statePublish(promotionId, status) {
      try {
        const updateStatePublish = await api
          .updatePromotions(promotionId, {
            data: {
              isPublish: status,
            },
          })
          .then(() => {
            this.fetchTicketsData();
          });
      } catch (error) {
        console.log(error);
      }
    },
    async handlePageChange(page) {
      this.currentPage = page;
      await this.fetchTicketsData();
    },
    async handleUpdateSubmit(id) {
      const updatedTicket = {
        data: {
          status: "เสร็จสิ้น",
        },
      };

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
          confirmButtonText: "Yes, Update it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await api.getTicketId(id);
              const checkStatus = response.data.attributes.status;
              if (checkStatus == "กำลังดำเนินการ") {
                await api.updateTicket(id, updatedTicket);
                swalWithBootstrapButtons.fire({
                  title: "Updated!",
                  text: "Your order has been updated.",
                  icon: "success",
                });
                await this.fetchTicketsData();
              } else {
                swalWithBootstrapButtons.fire({
                  title: "Error!",
                  text: "This item has been canceled or updated",
                  icon: "error",
                });
              }
            } catch (error) {
              console.error("Error updating data:", error);
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: "There was a problem updating the item.",
                icon: "error",
              });
            }
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Your imaginary item is safe :)",
              icon: "error",
            });
          }
        });
    },
  },
  async created() {
    await this.fetchTicketsData()
      .catch((error) => console.log(error))
      .finally(() => {
        this.isLoading = false;
      });
  },
};
</script>

<template>
  <div id="layoutSidenav">
    <SideNavbar />
    <div id="layoutSidenav_content">
      <main>
        <div class="container-fluid px-4">
          <div class="row mt-4 justify-content-between">
            <div class="col-4">
              <h1 class="mt-4">ตั๋วแจ้งปัญหา</h1>
              <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item active">Tickets</li>
              </ol>
            </div>
            <div class="col-4 text-center align-content-center">
              <div class="d-grid gap-2 col-6 mx-auto">
                <promotionCreate />
              </div>
            </div>
          </div>
          <div class="card mb-4">
            <div class="card-header">
              <div class="col-md-12">
                <Filtering
                  :optionsData="['ทั้งหมด']"
                  @updateSelection="handleSelectionChange"
                />
              </div>
            </div>
            <div v-if="isLoading" class="mt-2 mb-2">
              <Loading />
            </div>
            <div v-else>
              <div class="card-body">
                <table class="table table-striped table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>ชื่อผู้ใช้</th>
                      <th>หัวข้อ</th>
                      <th>สถานะ</th>
                      <th>ช่วงเวลา</th>
                      <th>จัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in tickets" :key="index">
                      <td>lorem user</td>
                      <td>{{ item.attributes.topic }}</td>
                      <td>{{ item.attributes.status }}</td>
                      <td>lorem timestamp</td>
                      <td class="text-center">
                        <div class="row row-cols-auto justify-content-center">
                          <div class="col-auto">
                            <RouterLink
                              :to="'/tickets/view/' + item.id"
                              class="btn btn-info btn-block"
                              >ตอบกลับ</RouterLink
                            >
                          </div>
                          <div class="col-auto">
                            <button
                              class="btn btn-primary btn-block"
                              v-if="item.attributes.status !== 'เสร็จสิ้น'"
                              @click="handleUpdateSubmit(item.id)"
                            >
                              อัพเดทสถานะ
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
</template>
