<template>
    <div class="d-flex justify-content-end">
        <select class="form-select form-select-sm w-25 align" id="cars" @change="handleSelectionChange">
            <option v-for="(option, index) in optionsData" :key="index" :value="option">{{ option }}</option>
        </select>
    </div>
</template>


<script>
export default {
    props: {
        optionsData: {
            type: Array,
            required: true
        }
    },
    emits: ['updateSelection'],
    methods: {
        handleSelectionChange(event) {
            if (event == 'ทั้งหมด') { event = '' }

            this.$emit('updateSelection', event.target.value);
        }
    }
};
</script>