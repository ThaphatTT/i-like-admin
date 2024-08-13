<script setup>
import { defineProps } from 'vue';

const props = defineProps ({
  buttonText: {
    type: String,
    default: 'Button'
  },
  buttonClass:{
    type: String,
    default: 'btn btn-primary btn-block'
  }
})
</script>

<template>
  <div :class="props.buttonClass">{{ props.buttonText }}</div>
</template>