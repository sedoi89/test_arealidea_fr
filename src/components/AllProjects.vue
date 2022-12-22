<template>
  <v-container class="container">
  <v-table>
    <thead>
    <tr>
      <th class="text-left">
        ID
      </th>
      <th class="text-left">
        Название
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="item in projects"
        :key="item.name"
    >
      <td @click="this.$router.push(`/${item.id}`)">{{ item.id }}</td>
      <td @click="this.$router.push(`/${item.id}`)">{{item.title}}</td>
    </tr>
    </tbody>
  </v-table>
  </v-container>
</template>

<script>
export default {
  computed: {
    projects() {
      return this.$store.state.projects;
    }
  }
}
</script>

<style scoped>
td:hover {
  cursor: pointer;
}
thead tr {
  background-color: rgba(0,0,0,0.05);
}
</style>
