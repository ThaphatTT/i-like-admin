<script>
import api from '@/vendors/api';
import Loading from '@/components/Loading.vue';
export default {
    props: {
        promotionId: {
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
            promotion: []
        };
    },
    async created() {
        try {
            await this.getPromotionId()
        } catch (error) {
            console.log(error);
        } finally {
            this.isLoading = true
        }
    },
    methods: {
        async getPromotionId() {
            const promotionData = await api.getPromotionId(this.promotionId)
            this.promotion = promotionData.data
        }
    }
};
</script>
<template>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal"
        :data-bs-target="'#viewPackage' + this.promotionId">
        อ่าน
    </button>

    <div class="modal fade" :id="'viewPackage' + this.promotionId" data-bs-backdrop="static" data-bs-keyboard="false"
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
                            <img class="img-fluid" :src="this.promotion.attributes.coverImg">
                            <div class="form-floating mt-3 mb-md-0">
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="fw-bold mb-1 text-start">Details</div>
                        <input v-model="promotion.attributes.details" class="form-control" id="inputLastName"
                            type="text" readonly />
                    </div>
                    <div class="row mb-3 mt-3">
                        <div class="col-md-3">
                            <div class="fw-bold mb-1  text-start">Price</div>
                            <input v-model="promotion.attributes.price" class="form-control" id="inputLastName"
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