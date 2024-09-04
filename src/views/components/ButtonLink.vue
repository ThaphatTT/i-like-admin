<script>
import { RouterLink } from 'vue-router';
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
  buttonText: {
    type: String,
    default: 'Button'
  },
  buttonClass: {
    type: String,
    default: 'btn btn-primary btn-block'
  },
  to: {
    type: [String, Object],
    required: true
  }
});
</script>

<template>
        <RouterLink :to="props.to">
          <div :class="props.buttonClass">
            <div class="card-body">{{ props.buttonText }}</div>
          </div>
        </RouterLink>
</template>