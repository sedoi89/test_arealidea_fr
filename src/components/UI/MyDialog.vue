<template>
  <div class="dialog" v-if="show" @click="checkTheMethod">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: `my-dialog`,
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    checkTheMethod() {
      if (!this.$route.params.id) {
        this.$store.commit('toggleAddUnexpectedTask', false)
        this.$store.commit('toggleDialog', false)
      }
      this.$store.commit('toggleAddTask', false)
    },

  }
}
</script>

<style scoped>
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}
.dialog__content {
  margin: auto;
  background: white;
  border-radius: 15px;
  min-height: 100px;
  min-width: 500px;
  padding: 15px;
}
</style>
