<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Database ex'
  },
  objectQuery:{
    type: Array,
    required: true
  },
  deleteItem:{
    type: Function,
    required: true
  },
  createLink:{
    type: String,
    default: '/Blog-Dashboard/'
  },
  createLinkEdit:{
    type: String,
    default: '/Blog-Dashboard/'
  },
  columns: {
    type: Array,
    required: true
  }
})
</script>
<template>
  <div class="card mb-4">
      <div class="card-header">
          <i class="fas fa-table me-1"></i>
          {{props.title}}
      </div>
      <div class="card-body">
          <table id="datatablesSimple">
              <thead>
                  <td><RouterLink :to="createLink" class="btn btn-primary btn-block">Create</RouterLink></td>
              <tr>
                <th v-for="column in columns" :key="column.field">
                  {{ column.label }}
                </th>
                  <th>Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in props.objectQuery" :key="index">
                <td v-for="column in columns" :key="column.field">
                  {{ item.attributes[column.field] }}
                </td>
                  <td><RouterLink  :to="createLinkEdit + item.id" class="btn btn-primary btn-block">Edit</RouterLink></td>
                  <td><button class="btn btn-primary btn-block" @click="deleteItem(item.id)">Delete</button></td>
              </tr>
              </tbody>
          </table>
      </div>
  </div>
</template>