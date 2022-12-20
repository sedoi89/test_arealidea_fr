<template>
  <div>
      <table>
        <thead>
        <tr>
          <th>
            ID
          </th>
          <th>
            Название
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="project in projects">
          <td @click="$router.push(`/${project.id}`)">
            {{project.id}}
          </td>
          <td @click="$router.push(`/${project.id}`)">
            {{project.title}}
          </td>
        </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
export default {
  computed: {
    projects() {
      return this.$store.state.projects;
    }
  },
}
</script>

<style scoped>
table {
  border: 1px solid green;
  border-collapse: collapse;
}
th {
  border: 1px solid black;
  padding: 10px;
}
td {
  border: 1px solid black;
  padding: 10px;
}
th:hover, td:hover {
  cursor: pointer;
}
</style>
