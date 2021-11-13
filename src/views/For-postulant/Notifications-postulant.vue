<template>
  <v-container>
    <div class="scroll">
      <div v-for="item in list_notifications" :key="item.id">
        <v-card class="card-an" v-if="item.type=='declined'">
          <v-card-title >
            Lo sentimos, tu postulación no fue aceptada. Sigue intentando
          </v-card-title>
          <v-card-text>
            La empresa {{item.nameCompany}} no acepto su solicitud, porfavor revise el feedback para mejorar sus habilidades
          </v-card-text>
          <v-card-actions>
            <v-btn @click="Open_dialog_view_feedback(item.message)">Ver feedback</v-btn>
          </v-card-actions>

        </v-card>
        <v-card v-else-if="item.type=='accepted'" class="card-an">
          <v-card-title >
            Felicitaciones, fuista aceptado para el empleo
          </v-card-title>
          <v-card-text>
            La empresa {{item.nameCompany}} aceptó que trabajes con ellos
          </v-card-text>
        </v-card>
      </div>
    </div>
    <ViewFeedback :dialog="dialog_feedback" @close_feedback="Close_dialog_view_feedback"></ViewFeedback>
  </v-container>
</template>

<script>
import NotificationsApiServices from '@/core/services/notifications-api.services'
import ViewFeedback from '@/components/Notifications/View-feedback'
export default {
  name: "Notifications-postulant",
  components: {ViewFeedback},
  data:()=>({
    list_notifications:[],
    id_postulant_notification:0,
    name_company:"",
    dialog_feedback:false
  }),
  methods:{
    get_notifications(){
      NotificationsApiServices.get_by_postulant(this.id_postulant_notification).then(response=>{
        this.list_notifications=response.data
      })
    },
    Open_dialog_view_feedback(value){
      this.$emit('get_feedback_view',value)
      this.dialog_feedback=true
    },
    Close_dialog_view_feedback(value){
      this.dialog_feedback=value
    },
  },

  mounted() {
    this.id_postulant_notification=this.$route.params.id
    this.get_notifications()
  }
}
</script>

<style scoped>
.scroll{
  max-height: 450px;
  overflow-y: auto;
  overflow-y: scroll;
}
.card-an{
  margin-bottom: 20px;
  border: solid 1px purple;
  border-radius: 10px;
}
</style>