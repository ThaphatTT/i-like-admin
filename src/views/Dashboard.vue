<script setup>
import axios from 'axios';
import {ref, onMounted} from 'vue'
import { RouterLink } from 'vue-router';
import SideNavbar from '@/components/SideNavbar.vue'
import Swal from 'sweetalert2';
import ButtonLink from './components/ButtonLink.vue';
import api from '@/vender/api'

const isSidebarToggled = ref(false)
const blogs = ref([]);
const toggleSidebar = () => {
    isSidebarToggled.value = !isSidebarToggled.value;
    document.body.classList.toggle('sb-sidenav-toggled', isSidebarToggled.value);
    localStorage.setItem('sb|sidebar-toggle', isSidebarToggled.value);
}

onMounted(() => {
    isSidebarToggled.value = localStorage.getItem('sb|sidebar-toggle') === 'true';
    if (isSidebarToggled.value) {
    document.body.classList.add('sb-sidenav-toggled');
    }
    fetchBlogData();
})

const fetchBlogData = async () => {
    try {
        const response = await api.getBlogs();
        blogs.value = response.data;
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};



const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});

const deleteItem = async (id) => {
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then(async (result) => {
        if (result.isConfirmed) {
        try {
            await api.deleteBlogs(`${id}`);
            swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
            });
            fetchBlogData(); 
        } catch (error) {
            console.error('Error deleting item:', error);

            swalWithBootstrapButtons.fire({
            title: "Error!",
            text: "There was a problem deleting the item.",
            icon: "error"
            });
        }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your file is safe :)",
            icon: "error"
        });
        }
    });
}

</script>

<template>
        <div id="layoutSidenav">
            <SideNavbar/>
            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid px-4">
                        <h1 class="mt-4">Dashboard</h1>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item active">Main Dashboard</li>
                        </ol>
                        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-table me-1"></i>
                                DataTable Example
                            </div>
                            <div class="card-body">
                                <table id="datatablesSimple">
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
                                        <td><RouterLink  :to="'/Blog-Dashboard/edit/'+ item.id" class="btn btn-primary btn-block">Edit</RouterLink></td>
                                        <td><button class="btn btn-primary btn-block" @click="deleteItem(item.id)">Delete</button></td>
                                        <td><RouterLink  :to="'/Blog-Dashboard/view/'+ item.id" class="btn btn-primary btn-block">View</RouterLink></td>
                                    </tr>
                                    </tbody>
                                </table>
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