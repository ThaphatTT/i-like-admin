<template>
    <div id="layoutSidenav">
        <SideNavbar />
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <div class="row mt-4 justify-content-between">
                        <div class="col-4">
                            <h1 class="mt-4">ฟาร์ม</h1>
                            <ol class="breadcrumb mb-4">
                                <li class="breadcrumb-item active">Farm</li>
                            </ol>
                        </div>
                        <div class="col-4 text-center align-content-center">
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button class="btn btn-primary" type="button" data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop">
                                    เพิ่มตัวฟาร์มใหม่
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="card mb-4">
                        <div class="card-header">
                            <div class="col-md-12">
                                <Filtering :optionsData="['all', 'alive', 'dead']"
                                    @updateSelection="handleUpdateSelection" @change="handleSelectionChange(status)" />
                            </div>
                        </div>
                        <div class="row p-4">
                            <div class="btn-group overflow-auto flex-nowrap" role="group" aria-label="Menu"
                                style="white-space: nowrap;">
                                <button class="btn btn-outline-danger" :class="{ active: type === 'all' }"
                                    @click="changeType('all')">
                                    ทั้งหมด
                                </button>
                                <button class="btn btn-outline-danger" :class="{ active: type === 'facebook' }"
                                    @click="changeType('facebook')">
                                    Facebook
                                </button>
                                <button class="btn btn-outline-danger" :class="{ active: type === 'ig' }"
                                    @click="changeType('ig')">
                                    Instagram
                                </button>
                                <button class="btn btn-outline-danger" :class="{ active: type === 'tiktok' }"
                                    @click="changeType('tiktok')">
                                    Tiktok
                                </button>
                                <button class="btn btn-outline-danger" :class="{ active: type === 'youtube' }"
                                    @click="changeType('youtube')">
                                    Youtube
                                </button>
                            </div>
                        </div>
                        <div v-if="isLoading" class="mt-2 mb-2">
                            <Loading />
                        </div>
                        <div v-else>
                            <div class="card-body">

                                <div class="row mb-3">
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <h5 class="card-title">โทเคนที่ออนลน์อยู่</h5>
                                                        <p class="card-text text-primary">({{ type }})</p>
                                                    </div>
                                                    <div class="col-md-6 text-center align-content-center ">
                                                        <h1 class="card-body text-success">
                                                            {{ alive }}%</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <h5 class="card-title">โทเคนที่ตายแล้ว</h5>
                                                        <p class="card-text text-primary">({{ type }})</p>
                                                    </div>
                                                    <div class="col-md-6 text-center align-content-center ">
                                                        <h1 class="card-body text-danger">
                                                            {{ dead }}%</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <table class="table table-striped table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th>ไอดี</th>
                                            <th>UID</th>
                                            <th>ประเภท</th>
                                            <th>สถานะ</th>
                                            <th>แพลตฟอร์ม</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in farms" :key="index">
                                            <td class="text-center">{{ item.id }}</td>
                                            <td class="text-center">{{ item.attributes.uid }}</td>
                                            <td class="text-center">{{ item.attributes.type }}</td>
                                            <td class="text-center">{{ item.attributes.status }}</td>
                                            <td class="text-center">{{ item.attributes.platform }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <Pagination :total-pages="totalPages" :currentPage="currentPage"
                            @page-change="handlePageChange" />
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

    <FarmInsert />
</template>

<script>
import SideNavbar from "@/components/SideNavbar.vue";
import api from "@/vendors/api";
import Pagination from "@/components/Pagination.vue";

import Loading from "@/components/Loading.vue";
import Filtering from "@/components/Filtering.vue";
import Swal from "sweetalert2";

import FarmInsert from "@/components/Farm/create.vue";
import { resolveTypeElements } from "vue/compiler-sfc";

export default {
    components: {
        Loading,
        SideNavbar,
        Filtering,
        Pagination,
        FarmInsert,
    },
    data() {
        return {
            itemsInPage: 10,
            currentPage: 1,
            totalPages: 0,
            type: 'all',
            status: 'all',
            farms: {},
            isLoading: false,
            alive: 0,
            dead: 0,

        };
    },
    methods: {
        async fetchFarmsData() {
            try {
                let type = this.type;
                let status = this.status;
                this.isLoading = true;
                if (type == 'all') { type = '' }
                if (status == 'all') { status = '' }
                await api.Farm.get(this.currentPage, this.itemsInPage, type, status)
                    .then(async (response) => {
                        this.farms = response.data;
                        this.totalPages = response.meta.pagination.pageCount;
                        this.percentage()
                        setTimeout(() => {
                            this.isLoading = false;
                        }, 500)
                    })

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        async percentage() {
            try {
                let type = this.type;
                let alive = 0;
                let dead = 0;
                let total = 0;
                if (type == 'all') {
                    type = ''
                }
                total = await api.Farm.get(this.currentPage, this.itemsInPage)
                    .then(response => {
                        return response.meta.pagination.total;
                    });

                alive = await api.Farm.get(this.currentPage, this.itemsInPage, type, 'alive')
                    .then(response => {
                        return response.meta.pagination.total;
                    })
                dead = await api.Farm.get(this.currentPage, this.itemsInPage, type, 'dead')
                    .then(response => {
                        return response.meta.pagination.total;
                    })
                this.alive = total > 0 ? (alive / total) * 100 : 0;
                this.dead = total > 0 ? (dead / total) * 100 : 0;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        async changeType(selectedType) {
            this.type = selectedType;
            await this.fetchFarmsData();
        },
        async handlePageChange(page) {
            this.currentPage = page;
            await this.fetchFarmsData();
        },
        handleUpdateSelection(value) {
            this.status = value;
        },
        async handleSelectionChange(value) {
            this.status = value;
            await this.fetchFarmsData();
        },
    },
    async mounted() {
        this.fetchFarmsData()
    },
};
</script>