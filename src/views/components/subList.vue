<script>
import api from '@/vender/api';
import moment from 'moment';
import { ref } from 'vue';

export default {
  props: {
    dataText: {
      type: String,
      default: 'some data'
    },
    orderId: {
      type: Number,
      default: 'orderId'
    },
    index: {
      type: Number,
      required: true
    },
    customerOrder: {
      type: String,
      default: 'customer'
    }
  },
  data() {
    return {
      carts: ref([])
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
    async queryCarts() {
      try {
        const response = await api.queryCarts(this.orderId);
        this.carts = response.data;
      } catch (error) {
        console.error('Error fetching carts:', error);
      }
    }
  },
  computed: {
    modalId() {
      return 'exampleModal-' + this.index;
    },
    accordionId() {
      return 'accordionExample-' + this.index;
    }
  }
};
</script>


<template>
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#exampleModal-' + index"
    @click="queryCarts">
    Sub List
  </button>

  <div class="modal fade" :id="'exampleModal-' + index" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg"> <!-- Centered and larger modal -->
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">This is {{ customerOrder }}'s order</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="accordion" :id="'accordionExample-' + index">
            <div v-for="(subItem, subIndex) in carts" :key="subIndex" class="accordion-item">
              <h2 class="accordion-header" :id="'heading-' + index + '-' + subIndex">
                <button class="accordion-button collapsed" type="button" :data-bs-toggle="'collapse'"
                  :data-bs-target="'#collapse-' + index + '-' + subIndex" aria-expanded="false"
                  :aria-controls="'collapse-' + index + '-' + subIndex">
                  <p class="mb-0 text-primary">{{ subIndex + 1 }}. {{ subItem.attributes.itemName }}</p>
                </button>
              </h2>
              <div :id="'collapse-' + index + '-' + subIndex" class="accordion-collapse collapse"
                :aria-labelledby="'heading-' + index + '-' + subIndex" :data-bs-parent="'#accordionExample-' + index">
                <div class="accordion-body">
                  <div class="row g-3"> <!-- Added g-3 for better spacing -->

                    <div class="col-12 col-md-6 border-bottom pb-2">
                      <div class="d-flex justify-content-between">
                        <strong>Platform:</strong>
                        <p class="ms-2">{{ subItem.attributes.platform }}</p>
                      </div>
                    </div>
                    <div class="col-12 col-md-6 border-bottom pb-2">
                      <div class="d-flex justify-content-between">
                        <strong>Type:</strong>
                        <p class="ms-2">{{ subItem.attributes.type }}</p>
                      </div>
                    </div>
                    <div class="col-12 col-md-6 border-bottom pb-2">
                      <div class="d-flex justify-content-between">
                        <strong>Amount:</strong>
                        <p class="ms-2">{{ subItem.attributes.amount * subItem.attributes.quantity }}</p>
                      </div>
                    </div>


                    <div class="col-12 col-md-6 border-bottom pb-2">
                      <div class="d-flex justify-content-between">
                        <strong>Service:</strong>
                        <p class="ms-2">{{ subItem.attributes.service }}</p>
                      </div>
                    </div>
                    <div class="col-12 border-bottom pb-2">
                      <div class="d-flex justify-content-between">
                        <strong>Created:</strong>
                        <p class="ms-2">{{ formatDate(subItem.attributes.createdAt) }}</p>
                      </div>
                    </div>
                    <div class="col-12 border-bottom pb-2">
                      <div class="d-flex justify-content-between">
                        <strong>Link:</strong>
                        <a :href="subItem.attributes.link" class="text-break ms-2">{{ subItem.attributes.link }}</a>
                      </div>
                    </div>
                    <div class="col-12 border-bottom pb-2">
                      <div class="d-flex justify-content-between">
                        <strong>Comment:</strong>
                        <p class="text-break ms-2">{{ subItem.attributes.comments }}</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
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