<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router';
import SideNavbar from '@/components/SideNavbar.vue'
import Swal from 'sweetalert2';
import ButtonLink from './components/ButtonLink.vue';
import api from '@/vender/api'

const products = ref([]);

onMounted(() => {
    fetchProductData()
})

const fetchProductData = async () => {
    try {
        const response = await api.getProducts();
        products.value = response.data;

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
        <SideNavbar />
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4">Products</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item active">Products</li>
                    </ol>
                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table me-1"></i>
                            DataTable Example
                        </div>
                        <div class="card-body">
                            <table class="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th class="text-center">Type</th>
                                        <th class="text-center">Amount</th>
                                        <th class="text-center">Price</th>
                                        <th class="text-center">Actions</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in products" :key="index">
                                        <td>{{ item.attributes.details }}</td>
                                        <td class="text-center">{{ item.attributes.type }}</td>
                                        <td class="text-center">{{ item.attributes.amount }} </td>
                                        <td class="text-center">{{ item.attributes.price }} baht</td>

                                        <td class="text-center">
                                            <RouterLink :to="'/Products-Dashboard/edit/' + item.id"
                                                class="btn btn-primary btn-block me-2">Edit</RouterLink>
                                            <RouterLink :to="'/Products-Dashboard/view/' + item.id"
                                                class="btn btn-primary btn-block me-2">View</RouterLink>
                                            <button class="btn btn-primary btn-block"
                                                @click="deleteItem(item.id)">Delete</button>
                                        </td>
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