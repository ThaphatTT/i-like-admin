<template>
    <div id="layoutSidenav">
        <SideNavbar />
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4">Products</h1>

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
                                            'ทั้งหมด',
                                            'facebook',
                                            'instagram',
                                            'twitter',
                                            'youtube',
                                            'shopee',
                                            'tiktok',]" @updateSelection="handleFilterSelection" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="card-body">
                                <table class="table table-striped table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="text-center">Platform</th>
                                            <th class="text-center">Type</th>
                                            <th class="text-center">Amount</th>
                                            <th class="text-center">Price</th>
                                            <!-- <th class="text-center">Actions</th> -->
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
                                            <td class="text-center">{{ item.attributes.amount }} </td>
                                            <td class="text-center">{{ item.attributes.price }} baht</td>
                                            <!-- <td class="text-center">
                                                <RouterLink :to="'/Products-Dashboard/edit/' + item.id"
                                                    class="btn btn-primary btn-block me-2">Edit</RouterLink>
                                                <RouterLink :to="'/Products-Dashboard/view/' + item.id"
                                                    class="btn btn-primary btn-block me-2">View</RouterLink>
                                                <button class="btn btn-primary btn-block"
                                                    @click="deleteItem(item.id)">Delete</button>
                                            </td> -->
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
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import SideNavbar from '@/components/SideNavbar.vue';
import Swal from 'sweetalert2';
import api from '@/vender/api';
import Pagination from './components/Pagination.vue';
import Filter from '@/views/components/Filtering.vue';
import Loading from '@/components/Loading.vue';

export default {
    components: {
        SideNavbar,
        RouterLink,
        Loading,
        Pagination,
        Filter
    },
    data() {
        return {
            productName: '',
            selectedFilter: 'ทั้งหมด', // Default to 'All'
            products: [],
            isLoading: true,
            currentPage: 1,
            itemsPerPage: 10,
            totalPages: 0
        };
    },
    mounted() {
        this.fetchProductData();
    },
    methods: {
        async fetchProductData(page = this.currentPage) {
            try {
                this.isLoading = true;
                const response = await api.getProducts(page, this.itemsPerPage, this.selectedFilter, this.productName);
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
            // Called when performing a search or applying a filter
            this.currentPage = 1; // Reset to the first page
            await this.fetchProductData();
        },
        handleFilterSelection(filter) {
            this.selectedFilter = filter;
            this.searchAndFilter(); // Perform both search and filter together
        },
        async handlePageChange(page) {
            this.currentPage = page;
            await this.fetchProductData();
        },
        async deleteItem(id) {
            // Your delete logic...
        }
    }
};
</script>