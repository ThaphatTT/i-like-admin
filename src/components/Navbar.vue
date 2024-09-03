<script setup>
import {ref, onMounted, computed} from 'vue'
import { useRouter} from 'vue-router';
import { hasToken } from '@/auth/auth'

const router = useRouter();

const isSidebarToggled = ref(false)

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
})

const logout = ()=>{
  localStorage.removeItem('token');
  window.location.reload();
  router.push({ name: 'sign-in' });
}
const isAuthenticated = computed(() => hasToken());
</script>

<template>
          <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <!-- Sidebar Toggle-->
            <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" @click="toggleSidebar" href="#!"><i class="fas fa-bars"></i></button>
            <!-- Navbar-->
            <ul v-if="isAuthenticated" class="navbar-nav ms-auto me-0 me-md-3 my-2 my-md-0">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><hr class="dropdown-divider" /></li>
                        <li><a class="dropdown-item" @click="logout">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
</template>