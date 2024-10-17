<script>
import api from '@/vendors/api';
import Loading from '@/components/Loading.vue';
export default {
    props: {
        productId: {
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
        };
    },
    async mounted() {
        try {
            await this.getProductId()
        } catch (error) {
            console.log(error);
        } finally {
            this.isLoading = true
        }
    },
    methods: {
        async getProductId() {
            const getProductId = await api.getProductId(this.productId)
            this.product = getProductId.data

        }
    }
};
</script>

<template>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal"
        :data-bs-target="'#viewProduct' + this.productId">
        View
    </button>

    <div class="modal fade" :id="'viewProduct' + this.productId" data-bs-backdrop="static" data-bs-keyboard="false"
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
                    <div>
                        <div class="fw-bold mb-1 text-start">Details</div>
                        <input v-model="product.attributes.details" class="form-control" id="inputLastName" type="text"
                            readonly />
                    </div>
                    <div class="row mb-3 mt-3">
                        <div class="col-md-6">
                            <div class="fw-bold mb-1  text-start">Link</div>
                            <input v-model="product.attributes.link" class="form-control" id="inputLastName" type="text"
                                placeholder="No data" readonly />
                        </div>
                        <div class="col-md-6">
                            <div class="fw-bold mb-1  text-start">Service</div>
                            <input v-model="product.attributes.service" class="form-control" id="inputLastName"
                                type="text" placeholder="No data" readonly>
                            </input>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-3">
                            <div class="fw-bold mb-1  text-start">Customer type</div>
                            <input v-model="product.attributes.type" class="form-control" id="inputLastName" type="text"
                                placeholder="No data" readonly>
                            </input>
                        </div>
                        <div class="col-md-3">
                            <div class="fw-bold mb-1  text-start">Platform</div>
                            <input v-model="product.attributes.platform" class="form-control" id="inputLastName"
                                type="text" placeholder="No data" readonly>
                            </input>
                        </div>
                        <div class="col-md-3">
                            <div class="fw-bold mb-1  text-start">Amount</div>
                            <input v-model="product.attributes.amount" class="form-control" id="inputLastName"
                                type="text" placeholder="No data" readonly />
                        </div>
                        <div class="col-md-3">
                            <div class="fw-bold mb-1  text-start">Price</div>
                            <input v-model="product.attributes.price" class="form-control" id="inputLastName"
                                type="text" placeholder="No data" readonly />
                        </div>
                        <div class="col-md-12 mb-3">
                            <div class="fw-bold mb-1  text-start">Comments</div>
                            <textarea v-model="product.attributes.comments" class="form-control"
                                id="exampleFormControlTextarea1" rows="3" placeholder="No data" readonly></textarea>
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