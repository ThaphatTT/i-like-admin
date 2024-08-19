<script setup>
import axios from 'axios';
import {ref, onMounted} from 'vue'
import { RouterLink } from 'vue-router';
import SideNavbar from '@/components/SideNavbar.vue'
import Swal from 'sweetalert2';
import ButtonLink from './components/ButtonLink.vue';

const isSidebarToggled = ref(false)
const products = ref([]);
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
    fetchProductData()
})

const fetchProductData = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:1337/api/products',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }); 
        products.value = response.data.data;
        
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
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:1337/api/products/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });

            swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your item has been deleted.",
            icon: "success"
            });
            fetchProductData(); 
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
            text: "Your product is safe :)",
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
                        <h1 class="mt-4">Products</h1>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item active">Products</li>
                        </ol>
                        <div class="row">
                            <div>
                                <ButtonLink
                                buttonText="Go to Dashboard" 
                                buttonClass="btn btn-success" 
                                to="/dashboard" />
                            </div>
                        </div>
                        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-table me-1"></i>
                                DataTable Example
                            </div>
                            <div class="card-body">
                                <table id="datatablesSimple">
                                    <thead>
                                        <td><RouterLink to="/Products-Dashboard/create" class="btn btn-primary btn-block">Create</RouterLink></td>
                                        <td>
                                            <RouterLink to="/Product-Dashboard/list" class="btn btn-primary btn-block">List</RouterLink>
                                        </td>
                                    <tr>
                                        <th>Name</th>
                                        <th>Position</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(item, index) in products" :key="index">
                                        <td>{{ item.attributes.name }}</td>
                                        <td>{{ item.attributes.price }}</td>
                                        <td><RouterLink  :to="'/Products-Dashboard/edit/'+ item.id" class="btn btn-primary btn-block">Edit</RouterLink></td>
                                        <td><button class="btn btn-primary btn-block" @click="deleteItem(item.id)">Delete</button></td>
                                        <td><RouterLink  :to="'/Products-Dashboard/view/'+ item.id" class="btn btn-primary btn-block">View</RouterLink></td>
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