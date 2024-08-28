<script setup>
import {defineProps, defineEmits} from 'vue';

const props = defineProps({
  totalPages: Number,
  currentPage: Number,
});

const emit = defineEmits(['page-change'])

const changePage = (data) =>{
  if(data >= 1 && data<= props.totalPages){
    emit('page-change', data);
  }
}
</script>

<template>
  <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" :class="{disabled: props.currentPage === 1}">
      <a class="page-link" href="#" @click.prevent="changePage(props.currentPage - 1)" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>
    <li class="page-item" v-for="page in props.totalPages" :key="page" :class="{active: props.currentPage === page}"><a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a></li>
    <li class="page-item" :class="{ disabled: props.currentPage === props.totalPages }">
      <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage( props.currentPage + 1 )">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>
  </ul>
</nav>
</template>