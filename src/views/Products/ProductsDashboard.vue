<template>
    <div id="layoutSidenav">
        <SideNavbar />
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <div class="row mt-4 justify-content-between">
                        <div class="col-4">
                            <h1 class="mt-4">รายการบริการ</h1>
                            <ol class="breadcrumb mb-4">
                                <li class="breadcrumb-item active">Products</li>
                            </ol>
                        </div>
                        <div class="col-4 text-center align-content-center">
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <ProductsCreate />
                            </div>
                        </div>
                    </div>
                    <div class="card mb-4">
                        <div class="card-header justify-contents-between">
                            <div class="row justify-content-between">
                                <div class="col">
                                    <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"
                                        @submit.prevent="searchAndFilter">
                                        <div class="input-group">
                                            <input v-model="productName" class="form-control" type="text"
                                                placeholder="Search for product..." aria-label="Search for..."
                                                aria-describedby="btnNavbarSearch" />
                                            <button class="btn btn-primary" id="btnNavbarSearch" type="submit">
                                                <i class="fas fa-search"></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>


                                <div class="col-md-6">
                                    <Filter :optionsData="[
                                        'ประเภท',
                                        'ไทย',
                                        'ต่างชาติ',
                                        '-',]" @updateSelection="handleFilterSelectionType" />
                                    <Filter :optionsData="[
                                        'ทั้งหมด',
                                        'facebook',
                                        'instagram',
                                        'twitter',
                                        'youtube',
                                        'shopee',
                                        'tiktok',
                                        'lemon8']" @updateSelection="handleFilterSelection" />
                                </div>

                            </div>
                        </div>

                        <div>
                            <div class="card-body">
                                <table class="table table-striped table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th>ชื่อรายการ</th>
                                            <th class="text-center">แพลตฟอร์ม</th>
                                            <th class="text-center">ประเภท</th>
                                            <th class="text-center" @click="sortProductsByPrice">จำนวน <i
                                                    class="fas fa-sort"></i></th>
                                            <th class="text-center">ราคา</th>

                                            <th class="text-center">สถานะ</th>
                                            <th class="text-center">การจัดการ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="isLoading" class="mt-2 mb-2">
                                            <td class="text-center" colspan="6">
                                                <Loading />
                                            </td>
                                        </tr>
                                        <tr v-else v-for="(item, index) in products" :key="index">
                                            <td>{{ item.attributes.details }}</td>
                                            <td class="text-center">{{ item.attributes.platform }}</td>
                                            <td class="text-center">{{ item.attributes.type }}</td>
                                            <td class="text-center">{{ item.attributes.amount.toLocaleString() }} </td>
                                            <td class="text-center">{{ item.attributes.price.toLocaleString() }} บาท
                                            </td>
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
                                            <td class="text-center">
                                                <div class="d-flex justify-content-center flex-wrap col-auto">
                                                    <div class="m-1">
                                                        <ProductsEdit :productId="item.id" />
                                                    </div>
                                                    <div class="m-1">
                                                        <button class="btn btn-danger btn-block"
                                                            @click="deleteItem(item.id)">ลบ</button>
                                                    </div>
                                                    <div class="m-1">
                                                        <ProductsView :productId="item.id" />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Pagination :total-pages="totalPages" :currentPage="currentPage"
                                    @page-change="handlePageChange" />
                            </div>
                        </div>
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
import { RouterLink } from 'vue-router';
import SideNavbar from '@/components/SideNavbar.vue';
import Swal from 'sweetalert2';
import api from '@/vendors/api';
import Pagination from '@/components/Pagination.vue';
import Filter from '@/components/Filtering.vue';
import Loading from '@/components/Loading.vue';
import ProductsCreate from '@/components/Products/ProductsCreate.vue';
import ProductsEdit from '@/components/Products/ProductsEdit.vue';
import ProductsView from '@/components/Products/ProductsView.vue';
export default {
    components: {
        SideNavbar,
        RouterLink,
        Loading,
        Pagination,
        Filter,
        ProductsCreate,
        ProductsEdit,
        ProductsView
    },
    data() {
        return {
            productName: '',
            type: 'ประเภท',
            selectedFilter: 'ทั้งหมด',
            products: [],
            isLoading: true,
            currentPage: 1,
            itemsPerPage: 10,
            totalPages: 0
        };
    },
    async mounted() {
        await this.fetchProductData();
    },
    methods: {
        async fetchProductData(page = this.currentPage) {
            try {
                this.isLoading = true;
                const response = await api.getProducts(page, this.itemsPerPage, this.selectedFilter, this.type, this.productName);
                this.products = response.data;
                this.totalPages = response.meta.pagination.pageCount;
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setTimeout(() => {
                    this.isLoading = false;

                }, 250);
            }
        },
        async searchAndFilter() {
            this.currentPage = 1;
            await this.fetchProductData();
        },
        handleFilterSelection(filter) {
            this.selectedFilter = filter;
            this.searchAndFilter();
        },
        handleFilterSelectionType(filter) {
            this.type = filter;
            this.searchAndFilter();
        },
        async handlePageChange(page) {
            this.currentPage = page;
            await this.fetchProductData();
        },
        async statePublish(blogId, status) {
            try {
                const updateStatePublish = await api.updateProducts(blogId, {
                    data: {
                        isPublish: status
                    }
                }).then(() => {
                    this.fetchProductData()
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
                        await api.deleteProducts(`${id}`);
                        swalWithBootstrapButtons.fire({
                            title: 'Deleted!',
                            text: 'Your file has been deleted.',
                            icon: 'success',
                        });
                        this.fetchProductData();
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
        // Add this sorting function
        sortProductsByPrice() {
            if (this.sortOrder === 'asc') {
                this.products.sort((a, b) => a.attributes.amount - b.attributes.amount);
                this.sortOrder = 'desc';
            } else {
                this.products.sort((a, b) => b.attributes.amount - a.attributes.amount);
                this.sortOrder = 'asc';
            }
        }
    }
};
</script>