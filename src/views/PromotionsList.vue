<script setup>
import List from './components/List.vue';
import {ref, onMounted} from 'vue'
import axios from 'axios';
import SideNavbar from '@/components/SideNavbar.vue'

const promotions = ref([]);
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
    fetchPromotiongData()
})

const fetchPromotiongData = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:1337/api/promotions',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }); 
        promotions.value = response.data.data;
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};



const deleteItem = async (id) => {
    try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:1337/api/promotions/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        fetchPromotiongData(); 
    } catch (error) {
        console.error('Error deleting item:', error);
    }
}
</script>
<template>
  <div id="layoutSidenav">
    <SideNavbar/>
    <div id="layoutSidenav_content">
      <List title="Promotions Lists"
      :objectQuery="promotions"
      :deleteItem="deleteItem"
      createLink="/Promotions-Dashboard/create"
      :columns="[
        { label: 'Topic', field: 'topic' },
        { label: 'Description', field: 'description' },
      ]"/>
    </div>
  </div>
</template>