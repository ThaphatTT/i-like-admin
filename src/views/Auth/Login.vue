<script setup>
import { reactive } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
const router = useRouter();
import Swal from 'sweetalert2';
import api from '@/vendors/api'
const userData = reactive({
    email: '',
    password: ''
});

const handleSubmit = async () => {
    const loginData = {
        identifier: userData.email,
        password: userData.password
    }
    try {
        const response = await api.login(loginData)
        localStorage.setItem('token', response.jwt);
        localStorage.setItem('username', response.user.username);
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Login suceessed",
            showConfirmButton: false,
            timer: 1000
        }).then(() => {
            router.push({ name: 'home' });
        })

    } catch (error) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Login failed",
            showConfirmButton: false,
            timer: 1500
        })
    }
}
</script>

<template>
    <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
            <main>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-5">
                            <div class="card shadow-lg border-0 rounded-lg mt-5">
                                <div class="card-header">
                                    <h3 class="text-center font-weight-light my-4">Login</h3>
                                </div>
                                <div class="card-body">
                                    <form @submit.prevent="handleSubmit">
                                        <div class="form-floating mb-3">
                                            <input class="form-control" id="inputEmail" v-model="userData.email"
                                                type="email" placeholder="name@example.com" />
                                            <label for="inputEmail">Email address</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input class="form-control" v-model="userData.password" id="inputPassword"
                                                type="password" placeholder="Password" />
                                            <label for="inputPassword">Password</label>
                                        </div>
                                        <div class="form-check mb-3">
                                            <input class="form-check-input" id="inputRememberPassword" type="checkbox"
                                                value="" />
                                            <label class="form-check-label" for="inputRememberPassword">Remember
                                                Password</label>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                                            <a class="small" href="password.html">Forgot Password?</a>
                                            <button class="btn btn-primary" type="submit">Login</button>
                                        </div>
                                    </form>
                                </div>
                                <div class="card-footer text-center py-3">
                                    <RouterLink class="small" to="/signup"><a>Need an account? Sign up!</a></RouterLink>
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