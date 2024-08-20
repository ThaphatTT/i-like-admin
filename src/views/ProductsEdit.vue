<script setup>
import axios from 'axios';
import {reactive} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import Swal from 'sweetalert2';
import api from '@/vender/api'

const route = useRoute();
const router= useRouter();
const productID = route.params.id;
const product = reactive({
    name: '',
    price: ''
})

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});

const handleSubmit = async () => {
    const updatedProduct ={
        data:{
            name:product.name,
            price:product.price
        }
    }
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, edit it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then( async (result) => {
    if (result.isConfirmed) {
        try {
        await api.updateProducts(productID,updatedProduct); 
        swalWithBootstrapButtons.fire({
            title: "Edit!",
            text: "Your Product has been edit.",
            icon: "success"
        });
        router.push(`/Products-Dashboard`)
        
        } catch (error) {
            console.error('Error updated data:', error);
            swalWithBootstrapButtons.fire({
            title: "Error!",
            text: "There was a problem editing the item.",
            icon: "error"
            });
        }
    } else if (
        result.dismiss === Swal.DismissReason.cancel
    ) {
        swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your Product is safe :)",
        icon: "error"
        });
    }
    });
};
</script>

<template>
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-7">
                                <div class="card shadow-lg border-0 rounded-lg mt-5">
                                    <div class="card-header"><h3 class="text-center font-weight-light my-4">Edit</h3></div>
                                    <div class="card-body">
                                        <form @submit.prevent="handleSubmit">
                                            <div class="row mb-3">
                                                <div class="col-md-6">
                                                    <div class="form-floating mb-3 mb-md-0">
                                                        <input class="form-control" id="inputFirstName" type="text"
                                                        v-model="product.name"
                                                        placeholder="Enter your first name" />
                                                        <label for="inputFirstName">Product name</label>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-floating">
                                                        <input class="form-control" 
                                                        v-model="product.price"
                                                        id="inputLastName" type="text"
                                                        placeholder="Enter your last name" />
                                                        <label for="inputLastName">Price</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mt-4 mb-0">
                                                <div class="d-grid"><button class="btn btn-primary btn-block">Update Product</button></div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
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