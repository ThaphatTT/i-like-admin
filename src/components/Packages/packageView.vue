<script>
import api from '@/vendors/api';
import Loading from '@/components/Loading.vue';
export default {
    props: {
        packageId: {
            type: Number,
            required: true,
        }
    },
    components: {
        Loading
    },
    data() {
        return {
            isLoading: false,
            package: []
        };
    },
    async created() {
        try {
            await this.getPackageId()
        } catch (error) {
            console.log(error);
        } finally {
            this.isLoading = true
        }
    },
    methods: {
        async getPackageId() {
            const packageData = await api.getPackageId(this.packageId)
            this.package = packageData.data
        }
    }
};
</script>
<template>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal"
        :data-bs-target="'#viewPackage' + this.packageId">
        อ่าน
    </button>

    <div class="modal fade" :id="'viewPackage' + this.packageId" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">View a Product</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div v-if="!isLoading">'
                    <Loading />
                </div>
                <div v-else class="modal-body">
                    <div class="row mb-4">
                        <div class="d-block text-center mx-auto">
                            <img class="img-fluid" :src="this.package.attributes.coverImg">
                            <div class="form-floating mt-3 mb-md-0">
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="fw-bold mb-1 text-start">Topic</div>
                        <input v-model="package.attributes.topic" class="form-control" id="inputLastName" type="text"
                            readonly />
                    </div>
                    <div>
                        <div class="fw-bold mb-1 text-start">Details</div>
                        <input v-model="package.attributes.details" class="form-control" id="inputLastName" type="text"
                            readonly />
                    </div>
                    <div class="row mb-3 mt-3">
                        <div class="col-md-6">
                            <div class="fw-bold mb-1  text-start">Link</div>
                            <input v-model="package.attributes.link" class="form-control" id="inputLastName" type="text"
                                placeholder="No data" readonly />
                        </div>
                        <div class="col-md-6">
                            <div class="fw-bold mb-1  text-start">Service</div>
                            <input v-model="package.attributes.service" class="form-control" id="inputLastName"
                                type="text" placeholder="No data" readonly>
                            </input>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-3">
                            <div class="fw-bold mb-1  text-start">Customer type</div>
                            <input v-model="package.attributes.type" class="form-control" id="inputLastName" type="text"
                                placeholder="No data" readonly>
                            </input>
                        </div>
                        <div class="col-md-3">
                            <div class="fw-bold mb-1  text-start">Platform</div>
                            <input v-model="package.attributes.platform" class="form-control" id="inputLastName"
                                type="text" placeholder="No data" readonly>
                            </input>
                        </div>
                        <div class="col-md-3">
                            <div class="fw-bold mb-1  text-start">Amount</div>
                            <input v-model="package.attributes.amount" class="form-control" id="inputLastName"
                                type="text" placeholder="No data" readonly />
                        </div>
                        <div class="col-md-3">
                            <div class="fw-bold mb-1  text-start">Price</div>
                            <input v-model="package.attributes.price" class="form-control" id="inputLastName"
                                type="text" placeholder="No data" readonly />
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>