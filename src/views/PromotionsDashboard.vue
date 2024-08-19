<script setup>
import axios from 'axios';
import {ref, onMounted} from 'vue'
import { RouterLink } from 'vue-router';
import SideNavbar from '@/components/SideNavbar.vue'
import Swal from 'sweetalert2';
import ButtonLink from './components/ButtonLink.vue';

const isSidebarToggled = ref(false)
const promotions = ref([]);
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
    fetchPromotionsData()
})

const fetchPromotionsData = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:1337/api/promotions',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }); 
        promotions.value = response.data.data;
        console.log(promotions);
        
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
            await axios.delete(`http://localhost:1337/api/promotions/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });

            swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your item has been deleted.",
            icon: "success"
            });
            fetchPromotionsData(); 
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
                        <h1 class="mt-4">Promotions</h1>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item active">Promotions</li>
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
                                        <td><RouterLink to="/Promotions-Dashboard/create" class="btn btn-primary btn-block">Create</RouterLink></td>
                                        <td>
                                            <RouterLink to="/Promotions-Dashboard/list" class="btn btn-primary btn-block">List</RouterLink>
                                        </td>
                                    <tr>
                                        <th>Name</th>
                                        <th>Position</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(item, index) in promotions" :key="index">
                                        <td>{{ item.attributes.topic }}</td>
                                        <td>{{ item.attributes.description }}</td>
                                        <td><RouterLink  :to="'/Promotions-Dashboard/edit/'+ item.id" class="btn btn-primary btn-block">Edit</RouterLink></td>
                                        <td><button class="btn btn-primary btn-block" @click="deleteItem(item.id)">Delete</button></td>
                                        <td><RouterLink  :to="'/Promotions-Dashboard/view/'+ item.id" class="btn btn-primary btn-block">View</RouterLink></td>
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