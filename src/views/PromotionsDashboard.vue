<script>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router';
import SideNavbar from '@/components/SideNavbar.vue'
import Swal from 'sweetalert2';
import api from '@/vender/api'
import moment from 'moment';
import sortDropDown from './components/sortDropDown.vue';
import Pagination from './components/Pagination.vue';

import Loading from '@/components/Loading.vue';

export default {
    components:{
        Loading,
        SideNavbar,
    },
    data() {
        return {
        promotions: [],
        itemsInPage: 25,
        currentPage: 1,
        isLoading: true,
        };
    },
    computed: {
        paginatedOrders() {
        const start = (this.currentPage - 1) * this.itemsInPage;
        return this.promotions.slice(start, start + this.itemsInPage);
        },
        totalPages() {
        return Math.ceil(this.promotions.length / this.itemsInPage);
        },
    },
    methods: {
        async fetchPromotionsData() {
        try {
            const response = await api.getPromotions();
            this.promotions = response.data;
            console.log(this.promotions);
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
        handlePageChange(data) {
        this.currentPage = data;
        },
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

<template>
    <div id="layoutSidenav">
        <SideNavbar />
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4">Promotions</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item active">Promotions</li>
                    </ol>
                    <div class="row align-items-start">
                        <div class="col">
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
                    <div class="row align-items-start mt-2 mb-2">
                        <div class="col">
                            <sortDropDown />
                        </div>
                    </div>
                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table me-1"></i>
                            Promotion data
                        </div>
                        <div v-if="isLoading" class="mt-2 mb-2">
                            <Loading/>
                        </div>
                        <div v-else>
                            <div class="card-body">
                            <table class="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>isPublish</th>
                                        <th>CreateAt</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in paginatedOrders" :key="index">
                                        <td> {{ item.attributes.cov }}</td>
                                        <td>{{ changeLanguage(item.attributes.isPublish) }}</td>
                                        <td>{{ moment(item.attributes.createdAt).local().format('YYYY-MM-DD HH:mm:ss')
                                            }}</td>
                                        <td>
                                            <RouterLink :to="'/Promotions-Dashboard/edit/' + item.id"
                                                class="btn btn-primary btn-block">Update</RouterLink>
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