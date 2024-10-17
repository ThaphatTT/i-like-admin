<script>
export default {
  props: {
    dataText1: String,
    dataText2: String,
    dataText3: String,
    dataText4: String,
    dataText5: String
  },
  emits: ['updateSelection'],
  methods: {
    handleSelectionChange(event) {
      this.$emit('updateSelection', event.target.value);
    },
    getOptions() {
      const options = [];
      if (this.dataText1) options.push(this.dataText1);
      if (this.dataText2) options.push(this.dataText2);
      if (this.dataText3) options.push(this.dataText3);
      if (this.dataText4) options.push(this.dataText4);
      if (this.dataText5) options.push(this.dataText5);
      return options;
    }
  }
};
</script>

<template>
  <div class="d-flex justify-content-end">
    <select class="form-select form-select-sm w-25 align" id="cars" @change="handleSelectionChange">
      <option v-for="(option, index) in getOptions()" :key="index" :value="option">{{ option }}</option>
    </select>
  </div>
</template>
