<script>
import SideNavbar from '@/components/SideNavbar.vue'
import BlogCreate from '@/views/components/blogCreate.vue'
import Swal from 'sweetalert2';
import api from '@/vender/api'

import Loading from '@/components/Loading.vue';

import blogEdit from '@/views/components/blogEdit.vue';

import Pagination from './components/Pagination.vue';
export default {
    components: {
        Loading,
        SideNavbar,
        BlogCreate,
        blogEdit,
        Pagination
    },
    data() {
        return {
        blogs: [],
        isLoading: true,
        itemsInPage: 10,
        currentPage: 1,
        totalPages: 0,
        };
    },
    async mounted() {
        try {
        await this.fetchBlogData();
        } catch (error) {
        console.log(error);
        } finally {
        this.isLoading = false;
        }
    },
    methods: {
        async fetchBlogData(page = this.currentPage) {
        try {
            const response = await api.getBlogs(page, this.itemsInPage);
            this.totalPages = response.meta.pagination.pageCount;
            this.blogs = response.data;
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
                    await api.deleteBlogs(`${id}`);
                    swalWithBootstrapButtons.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    icon: 'success',
                    });
                    this.fetchBlogData();
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
        async statePublish (blogId, status){
            try {
                const updateStatePublish = await api.updateBlogs(blogId,{
                data : {
                    publish : status
                }
            }).then(()=>{
                this.fetchBlogData()
            })
            } catch (error) {
                console.log(error);
                
            }
        },
        async handlePageChange(page) {
            this.currentPage = page;
            await this.fetchBlogData();
        },
    },
};
</script>

<template>
    <div id="layoutSidenav">
        <SideNavbar />
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4">Blog</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item active">Blog</li>
                    </ol>
                    <div class="card mb-4">
                        <div class="card-header">
                            <div class="row justify-content-between">
                                <div class="col-auto">
                                </div>
                                <div class="col-auto">
                                    <BlogCreate/>
                                </div>
                            </div>
                        </div>
                        <div v-if="isLoading" class="mt-2 mb-2">
                            <Loading/>
                        </div>
                        <div v-else>
                            <div class="card-body">
                            <table class="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th class="text-center">Name</th>
                                        <th class="text-center">Details</th>
                                        <th class="text-center">Status</th>
                                        <th class="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in blogs" :key="index">
                                        <td class="text-center">{{ item.attributes.topic }}</td>
                                        <td class="text-center">{{ item.attributes.details }}</td>
                                        <td>
                                            <div class="row row-cols-auto justify-content-center">
                                                <div class="col-auto">
                                                    <div v-if="item.attributes.publish" class="col">
                                                        <button type="button" class="btn btn-success" @click="statePublish(item.id, false)">Active</button>
                                                    </div>
                                                    <div v-else class="col">
                                                        <button type="button" class="btn btn-danger" @click="statePublish(item.id, true)">Inactive</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row row-cols-auto justify-content-center">
                                                <div class="col">
                                                    <blogEdit :blogId="item.id || 'not found'"/>
                                                </div>
                                                <div class="col">
                                                    <button class="btn btn-danger btn-block"
                                                    @click="deleteItem(item.id)">Delete</button>
                                                </div>
                                                <div class="col">
                                                    <RouterLink :to="'/Blog-Dashboard/view/' + item.id"
                                                class="btn btn-info btn-block">View</RouterLink>
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