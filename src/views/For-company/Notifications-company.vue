<template>
  <v-container>
    <h1>Mis notificaciones</h1>
    <div class="scroll">
      <div v-for="item in list_my_notifications" :key="item.id">
        <v-card class="card-an" >
          <v-card-title>
            Tu anuncio {{item.titleAnnouncement}} recibió un nuevo postulante
          </v-card-title>
        </v-card>

      </div>
    </div>
  </v-container>
</template>

<script>
import NotificationCompanysApiServices from '@/core/services/notifications-company-api.services'
export default {
  name: "Notifications-company",
  data:()=>({
    list_my_notifications:[],
    id_company:0
  }),
  methods:{
    get_notifications_company(){
      NotificationCompanysApiServices.get_notifications_by_company(this.id_company).then(response=>{
        this.list_my_notifications=response.data
      })
    }
  },
  mounted() {
    this.id_company=this.$route.params.id
    this.get_notifications_company()
  }
}
</script>

<style scoped>
.card-an{
  margin-bottom: 20px;
  border: solid 1px purple;
  border-radius: 10px;
}
</style>