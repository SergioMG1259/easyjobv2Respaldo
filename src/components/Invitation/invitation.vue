<template>
  <v-dialog width="600px" v-model="dialog" persistent>
    <v-card >
      <div class="scroll">
        <div v-for="item in announcements" :key="item.id" class="card-an">
            <v-card-title >
              {{item.title}}
            </v-card-title>
            <v-card-subtitle>{{ item.requiredSpecialty+" | "+item.requiredExperience }}</v-card-subtitle>
            <v-card-subtitle>{{ item.date }}</v-card-subtitle>
          <v-btn>Invitar</v-btn>
        </div>
      </div>
      <v-card-actions>
        <v-btn @click="close_dialog_invitation">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import AnnouncementApiServices from '@/core/services/announcement-api.services'
export default {
  name: "invitation",
  props:["dialog"],
  data:()=>({
    announcements:[],
    postulantId:0
  }),
  methods:{

    get_announcements(value,valuePostulant){
      this.postulantId=valuePostulant
      console.log("post"+this.postulantId)
      AnnouncementApiServices.get_announcement_by_company(value).then(response=>{
        this.announcements=response.data
        console.log(this.announcements.length)
      })
    },
    close_dialog_invitation(){
      this.$emit('close_dialog_invitation',false)
    },
  },
  created() {
    //this.id_evidence=this.$route.params.idp
    //this.get_evidence_to_edit()
    this.$parent.$on('get_invitation',this.get_announcements)
  }
}
</script>

<style scoped>
.scroll{
  max-height: 350px;
  overflow-y: auto;
  overflow-y: scroll;
}
.card-an{
  margin-bottom: 20px;
  border: solid 1px purple;
  border-radius: 10px;
}
</style>