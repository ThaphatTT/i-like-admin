<script setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps ({
  dataText1: {
    type: String,
  },
  dataText2:{
    type: String,
  },
  dataText3:{
    type: String,
  },
  dataText4:{
    type: String,
  },
  dataText5:{
    type: String,
  },
})
const emit = defineEmits(['updateSelection']);

const handleSelectionChange = (event) => {
  emit('updateSelection', event.target.value);
};

const getOptions = () => {
  const options = [];
  if (props.dataText1) options.push(props.dataText1);
  if (props.dataText2) options.push(props.dataText2);
  if (props.dataText3) options.push(props.dataText3);
  if (props.dataText4) options.push(props.dataText4);
  if (props.dataText5) option.push(props.dataText5);
  return options;
};
</script>

<template>
    <div class="d-flex justify-content-end">
      <select class="form-select form-select-sm w-25 algin" id="cars" @change="handleSelectionChange">
        <option v-for="(option, index) in getOptions()" :key="index" :value="option">{{ option }}</option>
      </select>
    </div>
</template>


