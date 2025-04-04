<template>
    <div id="layoutSidenav">
        <SideNavbar />
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <div class="row mt-4 justify-content-between">
                        <div class="col-4">
                            <h1 class="mt-4">โปรโมชั่น</h1>
                            <ol class="breadcrumb mb-4">
                                <li class="breadcrumb-item active">Promotions</li>
                            </ol>
                        </div>
                        <div class="col-4 text-center align-content-center">
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <promotionCreate />
                            </div>
                        </div>
                    </div>
                    <div class="card mb-4 mt-2 mb-2">
                        <div class="card-header">
                            <div class="row justify-content-between">
                                <div class="col-auto">
                                    <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"
                                        @submit.prevent="">
                                        <div class="input-group">
                                            <input class="form-control" type="text" placeholder="Search for ?..."
                                                aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                                            <button class="btn btn-primary" id="btnNavbarSearch" type="submit"><i
                                                    class="fas fa-search"></i></button>
                                        </div>
                                    </form>
                                </div>
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
                                            <th>หัวข้อ</th>
                                            <th>คำอธิบาย</th>
                                            <th>สถานะ</th>
                                            <th>การจัดการ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in promotions" :key="index">
                                            <td> {{ item.attributes.topic }}</td>
                                            <td v-html="truncateHtml(item.attributes.details, 200)"></td>
                                            <td>
                                                <div class="row row-cols-auto justify-content-center">
                                                    <div class="col-auto">
                                                        <div v-if="item.attributes.isPublish" class="col">
                                                            <button type="button" class="btn btn-success"
                                                                @click="statePublish(item.id, false)">เผยแพร่</button>
                                                        </div>
                                                        <div v-else class="col">
                                                            <button type="button" class="btn btn-danger"
                                                                @click="statePublish(item.id, true)">ปิด</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="row row-cols-auto justify-content-center">
                                                    <div class="col">
                                                        <promotionEdit :promotionId="item.id" />
                                                    </div>
                                                    <div class="col">
                                                        <button class="btn btn-danger btn-block"
                                                            @click="deleteItem(item.id)">ลบ</button>
                                                    </div>
                                                    <div class="col">
                                                        <promotionView :promotionId="item.id" />
                                                    </div>
                                                </div>
                                            </td>
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
import Swal from 'sweetalert2';
import api from '@/vendors/api'
import Pagination from '@/components/Pagination.vue';

import Loading from '@/components/Loading.vue';

import promotionCreate from '@/components/Promotions/promotionCreate.vue';
import promotionEdit from '@/components/Promotions/promotionEdit .vue';
import promotionView from '@/components/Promotions/promotionView.vue';

export default {
    components: {
        Loading,
        SideNavbar,
        promotionCreate,
        promotionEdit,
        promotionView,
        Pagination,
    },
    data() {
        return {
            promotions: [],
            currentPage: 1,
            itemsPerPage: 10,
            totalPages: 0,
            isLoading: true,
        };
    },
    methods: {
        async fetchPromotionsData(page = this.currentPage) {
            try {
                const response = await api.getPromotions(page, this.itemsPerPage);
                this.promotions = response.data;
                this.totalPages = response.meta.pagination.pageCount;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        async deleteItem(id) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger',
                },
                buttonsStyling: false,
            });

            swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await api.deletePromotions(id);
                        swalWithBootstrapButtons.fire({
                            title: 'Deleted!',
                            text: 'Your item has been deleted.',
                            icon: 'success',
                        });
                        this.fetchPromotionsData();
                    } catch (error) {
                        console.error('Error deleting item:', error);
                        swalWithBootstrapButtons.fire({
                            title: 'Error!',
                            text: 'There was a problem deleting the item.',
                            icon: 'error',
                        });
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire({
                        title: 'Cancelled',
                        text: 'Your product is safe :)',
                        icon: 'error',
                    });
                }
            });
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
        async handlePageChange(page) {
            this.currentPage = page;
            await this.fetchPromotionsData();
        },
        async statePublish(promotionId, status) {
            try {
                const updateStatePublish = await api.updatePromotions(promotionId, {
                    data: {
                        isPublish: status
                    }
                }).then(() => {
                    this.fetchPromotionsData()
                })
            } catch (error) {
                console.log(error);

            }
        },
        async deleteItem(id) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger',
                },
                buttonsStyling: false,
            });

            swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await api.deletePromotions(`${id}`);
                        swalWithBootstrapButtons.fire({
                            title: 'Deleted!',
                            text: 'Your file has been deleted.',
                            icon: 'success',
                        });
                        this.fetchPromotionsData();
                    } catch (error) {
                        console.error('Error deleting item:', error);
                        swalWithBootstrapButtons.fire({
                            title: 'Error!',
                            text: 'There was a problem deleting the item.',
                            icon: 'error',
                        });
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire({
                        title: 'Cancelled',
                        text: 'Your file is safe :)',
                        icon: 'error',
                    });
                }
            });
        },
        truncateHtml(html, maxLength) {
            // Create a temporary element to parse the HTML
            const tempElement = document.createElement('div');
            tempElement.innerHTML = html;

            // Extract the text content from the HTML
            let textContent = tempElement.textContent || tempElement.innerText || '';

            // Truncate the text content to the specified length
            if (textContent.length > maxLength) {
                textContent = textContent.substring(0, maxLength) + '...';
            }

            // Return the truncated text as HTML
            return textContent;
        }
    },
    mounted() {
        this.fetchPromotionsData()
            .catch((error) => console.log(error))
            .finally(() => {
                this.isLoading = false;
            });
    },
};
</script>