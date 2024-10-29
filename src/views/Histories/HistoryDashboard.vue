<template>
    <div id="layoutSidenav">
        <SideNavbar />
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4">ประวัติการเงิน</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item active">Histories</li>
                    </ol>
                    <div class="card mb-4">
                        <div class="card-header">
                            <div class="col-md-12">
                                <Filtering :optionsData="[
                                    'ทั้งหมด',
                                ]" @updateSelection="handleSelectionChange" />
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
                                            <th>ไอดี</th>
                                            <th>ชื่อผู้ใช้</th>
                                            <th>ประเภท</th>
                                            <th>สถานะ</th>
                                            <th>วันที่</th>
                                            <th>จำนวนเงิน</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in tickets" :key="index">
                                            <td> {{ item.id }}</td>
                                            <td> {{ item.attributes.username }}</td>
                                            <td> {{ item.attributes.type }}</td>
                                            <td> {{ item.attributes.status }}</td>
                                            <td> {{ new Date(item.attributes.createdAt).toLocaleDateString() }} </td>
                                            <td> {{ item.attributes.amount }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <Pagination :total-pages="totalPages" :currentPage="currentPage"
                            @page-change="handlePageChange" />
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

<script>
import SideNavbar from '@/components/SideNavbar.vue'
import Pagination from '@/components/Pagination.vue';
import Filtering from '@/components/Filtering.vue';
import Loading from '@/components/Loading.vue';
import Swal from 'sweetalert2';
import api from '@/vendors/api'

export default {
    components: {
        Loading,
        SideNavbar,
        Filtering,
        Pagination,
    },
    data() {
        return {
            selectedFilter: 'ทั้งหมด',
            tickets: [],
            itemsInPage: 10,
            currentPage: 1,
            totalPages: 0,
            isLoading: true,
        };
    },
    methods: {
        async fetchHistoriesData(page = this.currentPage, items = this.itemsInPage) {
            try {
                const response = await api.getHistories(page, items)
                    .then(async (result) => {
                        for (let i = 0; i < result.data.length; i++) {
                            const element = result.data[i];
                            const username = await api.getUsers(element.attributes.userId)
                            element.attributes.username = username.data.username
                        }
                        return result;

                    })
                this.tickets = response.data;
                this.totalPages = response.meta.pagination.pageCount;
                console.log(this.tickets);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        changeLanguage(data) {
            if (data === true) {
                return 'เผยแพร่แล้ว';
            } else if (data === false) {
                return 'ยังไม่ได้เผยแพร่';
            } else {
                return 'ไม่พบข้อมูล';
            }
        },
        handlePageChange(data) {
            this.currentPage = data;
        },
        async statePublish(promotionId, status) {
            try {
                const updateStatePublish = await api.updatePromotions(promotionId, {
                    data: {
                        isPublish: status
                    }
                }).then(() => {
                    this.fetchTicketsData()
                })
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
                    status: "เสร็จสิ้น"
                }
            };

            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
            });

            swalWithBootstrapButtons.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, Update it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await api.getTicketId(id);
                        const checkStatus = response.data.attributes.status;
                        if (checkStatus == "กำลังดำเนินการ") {
                            await api.updateTicket(id, updatedTicket);
                            swalWithBootstrapButtons.fire({
                                title: "Updated!",
                                text: "Your order has been updated.",
                                icon: "success"
                            });
                            await this.fetchTicketsData();
                        } else {
                            swalWithBootstrapButtons.fire({
                                title: "Error!",
                                text: "This item has been canceled or updated",
                                icon: "error"
                            });
                        }
                    } catch (error) {
                        console.error('Error updating data:', error);
                        swalWithBootstrapButtons.fire({
                            title: "Error!",
                            text: "There was a problem updating the item.",
                            icon: "error"
                        });
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire({
                        title: "Cancelled",
                        text: "Your imaginary item is safe :)",
                        icon: "error"
                    });
                }
            });
        },
    },
    async created() {
        await this.fetchHistoriesData()
            .catch((error) => console.log(error))
            .finally(() => {
                this.isLoading = false;
            });
    },
};
</script>
