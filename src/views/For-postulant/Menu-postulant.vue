<template>
  <v-app>
    <sidebar></sidebar>
    <!--<v-main >-->
      <router-view/>
    <!--</v-main>-->
  </v-app>
</template>

<script>
import Sidebar from "@/components/Postulant/Menu-Siderbar/Sidebar";
export default {
  name: "Menu-postulant",
  components: {Sidebar},
}
</script>

<style scoped>

</style>