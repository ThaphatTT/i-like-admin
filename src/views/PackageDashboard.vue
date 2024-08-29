<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router';
import SideNavbar from '@/components/SideNavbar.vue'
import ButtonLink from './components/ButtonLink.vue';
import api from '@/vender/api'
import moment from 'moment';
import subList from '@/views/components/subList.vue'
import Swal from 'sweetalert2';
import sortDropDown from '@/views/components/sortDropDown.vue'
import Pagination from './components/Pagination.vue';

const order = ref([]);
const itemsInPage = 25;
const currentPage = ref(1);

onMounted(() => {
    fetchOrderData()
})

const fetchOrderData = async () => {
    try {
        const response = await api.getOrders();
        order.value = response.data;
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

const handleUpdateSubmit = async (id) => {
    const updatedOrder = {
        data: {
            status : "เสร็จสิ้น"
        }
    }
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
                const checkStatus = response.data.attributes.status
                if (checkStatus == "กำลังดำเนินการ") {
                    await api.updateOrders(id, updatedOrder);
                    swalWithBootstrapButtons.fire({
                        title: "Updated!",
                        text: "Your order has been updated.",
                        icon: "success"
                    });
                    fetchOrderData()
                }else{
                    swalWithBootstrapButtons.fire({
                        title: "Error!",
                        text: "This's item cancled or updated",
                        icon: "error"
                    });
                }

            } catch (error) {
                console.error('Error updated data:', error);
                swalWithBootstrapButtons.fire({
                    title: "Error!",
                    text: "There was a problem updating the item.",
                    icon: "error"
                });
            }
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary item is safe :)",
                icon: "error"
            });
        }
    });
};

const selectedValue = ref('');

const handleUpdateSelection = (value) => {
    selectedValue.value = value;
};

const filterOrderWaiting = async()=>{
    try {
        const response = await api.getOrders();
        order.value = response.data.filter(order => order.attributes.status == 'กำลังดำเนินการ')
    } catch (error) {
        console.log(error);
    }
} 

const filterOrderSuceessed = async()=>{
    try {
        const response = await api.getOrders();
        order.value = response.data.filter(order => order.attributes.status == 'เสร็จสิ้น')
    } catch (error) {
        console.log(error);
    }
} 

const filterOrderSort = async()=>{
    try {
        const response = await api.sortOrders();
        order.value = response.data
        console.log(order.value);
        
    } catch (error) {
        console.log(error);
    }
} 


const handleDropDown = (data) =>{
    switch (data){
        case "กำลังดำเนินการ" : filterOrderWaiting();
        break;
        case "เสร็จสิ้น" : filterOrderSuceessed();
        break;
        case "newest order" : filterOrderSort();
        break;
    }
}

const paginatedOrders = computed(() =>{
    const start =(currentPage.value - 1) * itemsInPage;
    return order.value.slice(start, start + itemsInPage);
})

const totalPages = computed(() =>{
    return Math.ceil(order.value.length/itemsInPage);
})

const handlePageChange = (data) =>{
    currentPage.value = data;
}

const userData = ref('');
const searchUser = async (data)=>{
    try {
        const response = await api.getOrders();
        order.value = response.data.filter(order => order.attributes.user.data.attributes.username === data)
        console.log(order.value);
    } catch (error) {
        console.log(error);
        
    }
}
</script>

<template>
    <div id="layoutSidenav">
        <SideNavbar />
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4">Package</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item active">Package</li>
                    </ol>
                    <div class="row align-items-start">
                        <div class="col-9">
                            <ButtonLink buttonText="Go to Dashboard" buttonClass="btn btn-success" to="/dashboard" />
                        </div>
                        <div class="col">
                            <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0" @submit.prevent="searchUser(userData)">
                                <div class="input-group">
                                    <input v-model="userData" class="form-control" type="text" placeholder="Search for ?..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                                    <button class="btn btn-primary" id="btnNavbarSearch" type="submit"><i class="fas fa-search"></i></button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="row align-items-start mt-2 mb-2">
                        <div class="col-3">
                            <div class="row">
                                <div class="col-auto">
                                    <RouterLink to="/Orders-Dashboard/list" class="btn btn-primary btn-block">List
                                    </RouterLink>
                                </div>
                                <div class="col-auto">
                                    <RouterLink to="/Orders-Dashboard/create" class="btn btn-primary btn-block">
                                        Create</RouterLink>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <sortDropDown @updateSelection="handleUpdateSelection"
                    :dataText1="'กำลังดำเนินการ'" :dataText2="'เสร็จสิ้น'"
                    :dataText3="'newest order'" @click="handleDropDown(selectedValue)"
                    />
                        </div>
                    </div>
                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table me-1"></i>
                            Package data
                        </div>
                        
                        <div class="card-body">
                            <table class="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>UserName</th>
                                        <th class="text-center">Date</th>
                                        <th class="text-center">Price</th>
                                        <th class="text-center">Sub list</th>
                                        <th class="text-center">Status</th>
                                        <th class="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in paginatedOrders" :key="index">
                                        <td>{{ item.attributes.user?.data?.attributes.username || 'No user' }}</td>
                                        <td>{{ moment(item.attributes.createdAt).local().format('YYYY-MM-DD HH:mm:ss') }}</td>
                                        <td>{{ item.attributes.price }}</td>
                                        <td> <subList :dataText="item.attributes.link" :orderId="item.id" :index="index" :customerOrder="item.attributes.user?.data?.attributes?.username || 'No user'"/></td>
                                        <td>{{ item.attributes.status }}</td>
                                        <td>
                                            <button
                                                class="btn btn-primary btn-block"
                                                @click="handleUpdateSubmit(item.id)"
                                                >Update</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Pagination :total-pages="totalPages" :currentPage="currentPage" @page-change="handlePageChange"/>
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