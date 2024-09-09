<script>
import SideNavbar from '@/components/SideNavbar.vue'
import BlogCreate from '@/views/components/blogCreate.vue'
import Swal from 'sweetalert2';
import api from '@/vender/api'

import Loading from '@/components/Loading.vue';

import blogEdit from '@/views/components/blogEdit.vue';

export default {
    components: {
        Loading,
        SideNavbar,
        BlogCreate,
        blogEdit
    },
    data() {
        return {
        blogs: [],
        isLoading: true,
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
        async fetchBlogData() {
        try {
            const response = await api.getBlogs();
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
                    <div class="d-flex align-items-end flex-column mt-2 mb-2">
                        <div class="col">
                            <BlogCreate/>
                        </div>
                    </div>
                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table me-1"></i>
                            DataTable Example
                        </div>
                        <div v-if="isLoading" class="mt-2 mb-2">
                            <Loading/>
                        </div>
                        <div v-else>
                            <div class="card-body">
                            <table class="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Position</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in blogs" :key="index">
                                        <td>{{ item.attributes.topic }}</td>
                                        <td>{{ item.attributes.description }}</td>
                                        <td>
                                            <blogEdit :blogId="item.id || 'not found'"/>
                                        </td>
                                        <td><button class="btn btn-primary btn-block"
                                                @click="deleteItem(item.id)">Delete</button></td>
                                        <td>
                                            <RouterLink :to="'/Blog-Dashboard/view/' + item.id"
                                                class="btn btn-primary btn-block">View</RouterLink>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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