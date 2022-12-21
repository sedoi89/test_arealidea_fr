<template>
  <v-app>
    <v-main>
      <RouterView></RouterView>
    </v-main>
  </v-app>
</template>

<script>


import Main from "@/components/pages/Main.vue";

export default {
  name: 'App',

  components: {
    Main,
  },

  data: () => ({
    //
  }),
}
</script>
