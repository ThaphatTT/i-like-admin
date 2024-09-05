<script>
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router';
import SideNavbar from '@/components/SideNavbar.vue'
import api from '@/vender/api'
import moment from 'moment';
import subList from '@/views/components/subList.vue'
import Swal from 'sweetalert2';
import sortDropDown from '@/views/components/sortDropDown.vue'
import Pagination from './components/Pagination.vue';

import Loading from '@/components/Loading.vue';

export default {
    components:{
        subList,
        sortDropDown,
        Loading,
        SideNavbar,
        Pagination
    },
    data() {
        return {
        order: [],
        itemsInPage: 0,
        currentPage: 1,
        totalPages: 0,
        isLoading: true,
        selectedValue: '',
        userData: '',
        };
    },
    async mounted() {
        try {
        await this.fetchOrderData();
        } catch (error) {
        console.log(error);
        } finally {
        this.isLoading = false;
        }
    },
    methods: {
        formatDate(date) {
            return moment(date).format('YYYY-MM-DD HH:mm:ss');
        },
        async fetchOrderData(page = this.currentPage) {
        try {
            let response = await api.getOrders(page);
            this.order = response.data;
            for (let index = 0; index < response.data.length; index++) {
            let element = response.data[index];
            const userId = await api.getUsers(element.attributes.userId);
            this.order[index].attributes.userId = userId.data.username;
            }
            this.itemsInPage = response.meta.pagination.pageSize
            this.totalPages = response.meta.pagination.pageCount;
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally{
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Fetch data successed!",
                showConfirmButton: false,
                timer: 1000
            });
        }
        },
        async handlePageChange(data) {
            this.currentPage = data;
            await this.fetchOrderData(data);
        },
        async handleUpdateSubmit(id) {
        const updatedOrder = {
            data: {
            status: "สถานะทั้งหมด"
            }
        };
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Update it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
            try {
                const response = await api.getOrder(id);
                const checkStatus = response.data.attributes.status;
                if (checkStatus == "กำลังดำเนินการ") {
                await api.updateOrders(id, updatedOrder);
                swalWithBootstrapButtons.fire({
                    title: "Updated!",
                    text: "Your order has been updated.",
                    icon: "success"
                });
                await this.fetchOrderData();
                } else {
                swalWithBootstrapButtons.fire({
                    title: "Error!",
                    text: "This item has been canceled or updated",
                    icon: "error"
                });
                }
            } catch (error) {
                console.error('Error updating data:', error);
                swalWithBootstrapButtons.fire({
                title: "Error!",
                text: "There was a problem updating the item.",
                icon: "error"
                });
            }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary item is safe :)",
                icon: "error"
            });
            }
        });
        },
        handleUpdateSelection(value) {
        this.selectedValue = value;
        },
        async filterOrderWaiting() {
        try {
            const response = await api.getOrders();
            const ordersInProgress = response.data.filter(order => order.attributes.status === 'กำลังดำเนินการ');

            for (let index = 0; index < ordersInProgress.length; index++) {
            let element = ordersInProgress[index];   
            const userId = await api.getUsers(element.attributes.userId);
            ordersInProgress[index].attributes.userId = userId.data.username;
            }
            this.order = ordersInProgress;
        } catch (error) {
            console.log(error);
        } finally{
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Fetch data successed!",
                showConfirmButton: false,
                timer: 1000
            });
        }
        },
        async filterOrderSuceessed() {
        try {
            const response = await api.getOrders();
            const ordersInProgress = response.data.filter(order => order.attributes.status === 'เสร็จสิ้น');

            for (let index = 0; index < ordersInProgress.length; index++) {
                const element = ordersInProgress[index];
                const userId = await api.getUsers(element.attributes.userId);
                ordersInProgress[index].attributes.userId = userId.data.username;
            }
            this.order = ordersInProgress;
        } catch (error) {
            console.log(error);
        } finally{
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Fetch data successed!",
                showConfirmButton: false,
                timer: 1000
            });
        }
        },
        async filterOrderSort() {
        try {
            const response = await api.sortOrders();
            const ordersInProgress = response.data;
            for (let index = 0; index < ordersInProgress.length; index++) {
                const element = ordersInProgress[index];
                const userId = await api.getUsers(element.attributes.userId);
                ordersInProgress[index].attributes.userId = userId.data.username;
            }
            this.order = ordersInProgress;
        } catch (error) {
            console.log(error);
        } finally{
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Fetch data successed!",
                showConfirmButton: false,
                timer: 1000
            });
        }
        },
        handleDropDown(data) {
        switch (data) {
            case "สถานะทั้งหมด" :
                this.fetchOrderData();
                break;
            case "กำลังดำเนินการ":
                this.filterOrderWaiting();
                break;
            case "เสร็จสิ้น":
                this.filterOrderSuceessed();
                break;
            case "newest order":
                this.filterOrderSort();
                break;
        }
        },
        async searchUser(data) {
        try {
            let orders = [];
            const response = await api.getOrders();
            orders = response.data;
            for (let index = 0; index < response.data.length; index++) {
            let element = response.data[index];
            const userId = await api.getUsers(element.attributes.userId);
            orders[index].attributes.userId = userId.data.username;
            }
            this.order = orders.filter(user => user.attributes.userId === data);
        } catch (error) {
            console.log(error);
        }
        }
    },
    computed: {
        paginatedOrders() {
        const start = (this.currentPage - 1) * this.itemsInPage;
        const end = start + this.itemsInPage;
        return this.order.slice(start, end);
    },
    }
};
</script>

<template>
    <div id="layoutSidenav">
        <SideNavbar />
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4">Order</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item active">Order</li>
                    </ol>
                    <div class="row align-items-start">
                        <div class="col">
                            <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"
                                @submit.prevent="searchUser(userData)">
                                <div class="input-group">
                                    <input v-model="userData" class="form-control" type="text"
                                        placeholder="Search for user..." aria-label="Search for..."
                                        aria-describedby="btnNavbarSearch" />
                                    <button class="btn btn-primary" id="btnNavbarSearch" type="submit"><i
                                            class="fas fa-search"></i></button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="row align-items-start mt-2 mb-2">
                        <div class="col">
                            <sortDropDown @updateSelection="handleUpdateSelection"
                            :dataText1="'สถานะทั้งหมด'" :dataText2="'กำลังดำเนินการ'"
                                :dataText3="'เสร็จสิ้น'" :dataText4="'newest order'"
                                @change="handleDropDown(selectedValue)" />
                        </div>
                    </div>
                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table me-1"></i>
                            Order data
                        </div>
                        <div v-if="isLoading" class="mt-2 mb-2">
                            <Loading/>
                        </div>
                        <div v-else class="card-body">
                            <table class="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>OrderID</th>
                                        <th>UserName</th>
                                        <th class="text-center">Date</th>
                                        <th class="text-center">Price</th>
                                        <th class="text-center">Sub list</th>
                                        <th class="text-center">Status</th>
                                        <th
                                        class="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in paginatedOrders" :key="index">
                                        <td class="text-center">{{ item?.id|| 'Not found Order ID' }}</td>
                                        <td class="text-center">{{ item.attributes?.userId|| 'Not found user' }}</td>
                                        <td class="text-center">{{ formatDate(item.attributes.createdAt)
                                            }}</td>
                                        <td class="text-center">{{ item.attributes.price }}</td>
                                        <td class="text-center">
                                            <subList :dataText="item.attributes.link" :orderId="item.id" :index="index"
                                                :customerOrder="item.attributes.userId || 'No user'" />
                                        </td>
                                        <td class="text-center">{{ item.attributes.status }}</td>
                                        <td class="text-center">
                                            <button v-if="item.attributes.status !== 'เสร็จสิ้น'" class="btn btn-primary btn-block"
                                                @click="handleUpdateSubmit(item.id)">Update</button>

                                            <p v-else class="">...</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Pagination :total-pages="totalPages" :currentPage="currentPage" @page-change="handlePageChange" />

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