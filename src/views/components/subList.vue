<script setup>
  import { defineProps, ref} from 'vue';
  import api from '@/vender/api';
  import moment from 'moment';
  const props = defineProps ({
  dataText: {
    type: String,
    default: 'some data'
  },
  orderId:{
    type: String,
    default: 'orderId'
  },
  index: {
    type: Number,
    required: true
  },
  customerOrder:{
    type : String,
    default: `customer`
  }
})
const carts = ref([]);

const queryCarts = async () => {
    try {
        const response = await api.queryCarts();
        carts.value = response.data.filter(cart => cart.attributes.order.data && cart.attributes.order.data.id === props.orderId)
        
    } catch (error) {
        console.error('Error fetching carts:', error);
    }
};
</script>

<template>
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#exampleModal-' + index" @click="queryCarts">
  Sub List
</button>

<div class="modal fade" :id="'exampleModal-'+ index" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">This's {{ props.customerOrder }} order</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
            <div class="accordion" :id="'accordionExample-' + index">
              <div v-for="(subItem, subIndex) in carts" :key="subIndex" class="accordion-item">
                <h2 class="accordion-header" :id="'heading-' + index + '-' + subIndex">
                  <button class="accordion-button" type="button" :data-bs-toggle="'collapse'" :data-bs-target="'#collapse-' + index + '-' + subIndex" aria-expanded="true" :aria-controls="'collapse-' + index + '-' + subIndex">
                    <p>{{subItem.attributes.itemName}}</p>
                  </button>
                </h2>
                <div :id="'collapse-' + index + '-' + subIndex" class="accordion-collapse collapse" :aria-labelledby="'heading-' + index + '-' + subIndex" :data-bs-parent="'#accordionExample-' + index">
                  <div class="accordion-body">
                    <div class="row">
                      <div class="col-3 text-end">
                        <strong>
                          Platform: 
                        </strong>
                      </div>
                      <div class="col-2">
                        <p>{{ subItem.attributes.platform }}</p>
                      </div>
                      <div class="col-3 text-end">
                        <strong>
                          Type: 
                        </strong>
                      </div>
                      <div class="col-3">
                        <p>{{ subItem.attributes.type }}</p>
                      </div>
                      <div class="col-3 text-end">
                        <strong>
                          Service: 
                        </strong>
                      </div>
                      <div class="col-7">
                        <p>{{ subItem.attributes.service }}</p>
                      </div>
                      <div class="col-3 text-end">
                        <strong>
                          Created: 
                        </strong>
                      </div>
                      <div class="col-7">
                        <p>{{ moment(subItem.attributes.createdAt).local().format('YYYY-MM-DD HH:mm:ss') }}</p>
                      </div>
                      <div class="col-3 text-end">
                        <strong>
                          Link: 
                        </strong>
                      </div>
                      <div class="col-8">
                        <a href>{{ subItem.attributes.link }}</a>
                      </div>
                      <div class="col-4">
                        <strong>
                          Comment: 
                        </strong>
                      </div>
                      <div class="col-8">
                        <a>{{ subItem.attributes.comments }}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      <div class="modal-footer">
      </div>
    </div>
  </div>
</div>
</template>