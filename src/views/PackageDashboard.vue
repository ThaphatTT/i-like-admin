<script>
import { RouterLink } from 'vue-router';
import SideNavbar from '@/components/SideNavbar.vue'
import api from '@/vendors/api'
import moment from 'moment';
import Swal from 'sweetalert2';
import sortDropDown from '@/views/components/sortDropDown.vue'
import Pagination from './components/Pagination.vue';

import Loading from '@/components/Loading.vue';
import packgeCreate from './components/packgeCreate.vue';
import packageEdit from './components/packageEdit .vue';

import packageView from './components/packageView.vue'

export default {
    components: {
        SideNavbar,
        sortDropDown,
        Pagination,
        RouterLink,
        Loading,
        packgeCreate,
        packageEdit,
        packageView
    },
    data() {
        return {
            package: [],
            itemsPerPage: 10,
            currentPage: 1,
            totalPages: 0,
            isLoading: true,
            packageData: null,
        };
    },
    methods: {
        formatDate(date) {
            return moment(date).format('YYYY-MM-DD HH:mm:ss');
        },
        async fetchPackageData(page = this.currentPage) {
            try {
                this.isLoading = true;
                const response = await api.getPackages(page, this.itemsPerPage);
                this.package = response.data;
                this.totalPages = response.meta.pagination.pageCount;
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setTimeout(() => {
                    this.isLoading = false;
                }, 250);
            }
        },
        async handlePageChange(page) {
            this.currentPage = page;
            await this.fetchPackageData();
        },
        // async searchUser(data) {
        //     try {
        //         const response = await api.getPackages();
        //         // this.package = response.data.filter((package) => package);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // },
        async statePublish(packageId, status) {
            try {
                const updateStatePublish = await api.updatePackage(packageId, {
                    data: {
                        isPublish: status
                    }
                }).then(() => {
                    this.fetchPackageData()
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
                        await api.deletePackage(`${id}`);
                        swalWithBootstrapButtons.fire({
                            title: 'Deleted!',
                            text: 'Your file has been deleted.',
                            icon: 'success',
                        });
                        this.fetchPackageData();
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
    },
    mounted() {
        this.fetchPackageData().finally(() => {
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
                    <h1 class="mt-4">Package</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item active">Package</li>
                    </ol>
                    <div class="card mb-4 mt-2 mb-2">
                        <div class="card-header">
                            <div class="row justify-content-between">
                                <div class="col-auto">
                                    <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"
                                        @submit.prevent="searchUser(userData)">
                                        <div class="input-group">
                                            <input v-model="packageData" class="form-control" type="text"
                                                placeholder="Search for ?..." aria-label="Search for..."
                                                aria-describedby="btnNavbarSearch" />
                                            <button class="btn btn-primary" id="btnNavbarSearch" type="submit"><i
                                                    class="fas fa-search"></i></button>
                                        </div>
                                    </form>
                                </div>
                                <div class="col-auto">
                                    <packgeCreate />
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
                                            <th>UserName</th>
                                            <th class="text-center">Date</th>
                                            <th class="text-center">Price</th>
                                            <th class="text-center">Status</th>
                                            <th class="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in package" :key="index">
                                            <td>{{ item.attributes.user?.data?.attributes.username || 'No user' }}</td>
                                            <td>{{ formatDate(item.attributes.createdAt)
                                                }}</td>
                                            <td>{{ item.attributes.price }}</td>
                                            <td>{{ item.attributes.status }}</td>
                                            <td>
                                                <div class="row row-cols-auto justify-content-center">
                                                    <div class="col-auto">
                                                        <div v-if="item.attributes.isPublish" class="col">
                                                            <button type="button" class="btn btn-success"
                                                                @click="statePublish(item.id, false)">Active</button>
                                                        </div>
                                                        <div v-else class="col">
                                                            <button type="button" class="btn btn-danger"
                                                                @click="statePublish(item.id, true)">Inactive</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="row row-cols-auto justify-content-center">
                                                    <div class="col">
                                                        <packageEdit :packageId="item.id" />
                                                    </div>
                                                    <div class="col">
                                                        <packageView :packageId="item.id" />
                                                    </div>
                                                    <div class="col">
                                                        <button class="btn btn-danger btn-block"
                                                            @click="deleteItem(item.id)">Delete</button>
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