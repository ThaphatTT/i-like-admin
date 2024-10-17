<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/vendors/api'
import Swal from 'sweetalert2';
// import moment from 'moment';

const route = useRoute();
const router = useRouter();
const orderID = route.params.id;
const order = reactive({
    id: '',
    createdAt: '',
    status: '',
    link: '',
})

onMounted(() => {
    fetchingOrderData();
})

const fetchingOrderData = async () => {
    try {
        const response = await api.getOrder(orderID);
        order.value = response.data;
        order.id = order.value.id;
        order.createdAt = moment(order.value.attributes.createdAt).local().format('YYYY-MM-DD HH:mm:ss');
        order.status = order.value.attributes.status;
        order.link = order.value.attributes.link;

    } catch (error) {
        console.log(error);

    }
}

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
});

const handleSubmit = async () => {
    const updatedOrder = {
        data: {
            createdAt: order.createdAt,
            link: order.link,
            status: "เสร็จสิ้น"
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
                const response = await api.getOrder(orderID);
                const checkStatus = response.data.attributes.status
                if (checkStatus == "กำลังดำเนินการ") {
                    await api.updateOrders(orderID, updatedOrder);
                    swalWithBootstrapButtons.fire({
                        title: "Updated!",
                        text: "Your order has been updated.",
                        icon: "success"
                    });
                    router.push(`/Orders-Dashboard`)
                } else {
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
</script>

<template>
    <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
            <main>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-7">
                            <div class="card shadow-lg border-0 rounded-lg mt-5">
                                <div class="card-header">
                                    <h3 class="text-center font-weight-light my-4">Update Order {{ order.id }}</h3>
                                </div>
                                <div class="card-body">
                                    <form @submit.prevent="handleSubmit">
                                        <div class="row mb-3">
                                            <div class="col-md-6">
                                                <div class="form-floating mb-3 mb-md-0">
                                                    <input class="form-control" id="inputFirstName" type="text"
                                                        v-model="order.createdAt" readonly />
                                                    <label for="inputFirstName">Created At:</label>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-floating">
                                                    <input class="form-control" v-model="order.status"
                                                        id="inputLastName" type="text" readonly />
                                                    <label for="inputLastName">Status:</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-floating mb-3 mb-md-0">
                                                <input class="form-control" id="inputFirstName" v-model="order.link"
                                                    type="text" readonly />
                                                <label for="inputFirstName">Link:</label>
                                            </div>
                                        </div>
                                        <div class="mt-4 mb-0">
                                            <div class="d-grid"><button class="btn btn-primary btn-block">Update
                                                    Order</button></div>
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