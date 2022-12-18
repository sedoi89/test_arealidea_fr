<template>
  <input :value="modelValue" @input="updateInput" class="input">
</template>

<script>
export default {
  name: 'my-input',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(evt) {
      this.$emit('update:modelValue', evt.target.value)
    }
  }
}

</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid green;
  padding: 10px 15px;
  margin-top: 10px;
  box-sizing: border-box;

}
</style>
