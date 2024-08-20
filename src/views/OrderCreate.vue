<script setup>
import axios from 'axios';
import {reactive} from 'vue';
import {useRouter} from 'vue-router';
import Swal from 'sweetalert2';
import api from '@/vender/api'

const router= useRouter();
const order = reactive({
    topic: '',
    description:''
})

const handleSubmit = async () => {
    const CreateOrder ={
        data:{
            topic:order.topic,
            description:order.description
        }
    }
    try {
        await api.createOrders(CreateOrder); 
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Create a order success",
            showConfirmButton: false,
            timer: 1500
            });
        router.push(`/Orders-Dashboard`)
        
    } catch (error) {
        console.error('Error create a data:', error);
        Swal.fire({
            title: 'Error!',
            text: 'Error create a order',
            icon: 'error',
            confirmButtonText: 'OK'
            })
    }
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
                                    <div class="card-header"><h3 class="text-center font-weight-light my-4">Create a Order</h3></div>
                                    <div class="card-body">
                                        <form @submit.prevent="handleSubmit">
                                            <div class="row mb-3">
                                                <div class="col-md-6">
                                                    <div class="form-floating mb-3 mb-md-0">
                                                        <input class="form-control" id="inputFirstName" type="text"
                                                        v-model="order.topic"
                                                        placeholder="Enter your first name" />
                                                        <label for="inputFirstName">Topic</label>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-floating">
                                                        <input class="form-control" 
                                                        v-model="order.description"
                                                        id="inputLastName" type="text"
                                                        placeholder="Enter your last name" />
                                                        <label for="inputLastName">Description</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mt-4 mb-0">
                                                <div class="d-grid"><button class="btn btn-primary btn-block">Create a Order</button></div>
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