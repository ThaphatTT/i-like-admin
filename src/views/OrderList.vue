<script setup>
import List from './components/List.vue';
import {ref, onMounted} from 'vue'
import axios from 'axios';
import SideNavbar from '@/components/SideNavbar.vue'
import Swal from 'sweetalert2';
import api from '@/vender/api'

const order = ref([]);
const isSidebarToggled = ref(false)
const toggleSidebar = () => {
    isSidebarToggled.value = !isSidebarToggled.value;
    document.body.classList.toggle('sb-sidenav-toggled', isSidebarToggled.value);
    localStorage.setItem('sb|sidebar-toggle', isSidebarToggled.value);
}
onMounted (()=>{
  isSidebarToggled.value = localStorage.getItem('sb|sidebar-toggle') === 'true';
    if (isSidebarToggled.value) {
    document.body.classList.add('sb-sidenav-toggled');
    }
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
            await api.deleteOrders(id);
            swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your order has been deleted.",
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
      <List title="Order Lists"
      :objectQuery="order"
      :deleteItem="deleteItem"
      createLink="/Promotions-Dashboard/create"
      :columns="[
        { label: 'Topic', field: 'topic' },
        { label: 'Description', field: 'description' },
      ]"/>
    </div>
  </div>
</template>