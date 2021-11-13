<template>
  <v-app>
    <side-bar-company></side-bar-company>
    <!--<v-main >-->
    <router-view/>
    <!--</v-main>-->
  </v-app>
</template>

<script>
import SideBarCompany from '@/components/Company/Menu-Siderbar/SideBar-company'
export default {
  name: "Menu-company",
  components:{SideBarCompany}
}
</script>

<style scoped>

</style>