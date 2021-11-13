import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProfilePostulant from '../views/For-postulant/Profile-postulant'
import ViewProject from '../views/Projects/View-Project'
import MenuCompany from '@/views/For-company/Menu-company'
import ProfileCompany from '@/views/For-company/Profile-company'
import MyAnnouncements from '@/views/For-company/My-Announcements'
import ViewAnnouncement from '@/views/Announcement/View-Announcement'
import InitiationPostulant from '@/views/For-postulant/Initiation-postulant'
import Postulation_Announcement from "@/views/Postulation-process/Postulation_Announcement";
import PracticantsPostulant from '@/views/For-postulant/Practicants-postulant'
import ViewPostulantProfile from '@/views/Postulation-process/View-postulant-profile'
import ViewProjectPostulant from '@/views/Postulation-process/View-project-postulant'
import SearchPostulant from '@/views/For-company/Search-postulant'
import NotificationsPostulant from '@/views/For-postulant/Notifications-postulant'
import NotificationsCompany from '@/views/For-company/Notifications-company'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/menu-postulant',
    name:'Menu-postulant',
    component: () => import('../views/For-postulant/Menu-postulant.vue'),children:[{
      path: '/profile-postulant/:id',component:ProfilePostulant
    },
      {
        path: '/postulant/:id/project/:idp', component: ViewProject
      },{
      path: '/postulant/:id/list-announcements',component: InitiationPostulant
      },{
      path: '/postulant/:id/announcement-postulation/:ida', component: Postulation_Announcement
      },{
        path: '/postulant/:id/list-announcements-practicing',component: PracticantsPostulant
      },{
        path: '/postulant/:id/my-notifications',component: NotificationsPostulant
      }
    ]
  },
  {
    path: '/menu-company',
    name:'Menu-company',
    component: MenuCompany,children:[{
      path: '/profile-company/:id',component:ProfileCompany
    },
      {
        path: '/my-announcements/:iduser',component: MyAnnouncements
      },
      {
        path: '/company/:id/announcement/:ida', component: ViewAnnouncement
      },{
        path: '/company/:id/view-profile-postulant/:idp', component: ViewPostulantProfile
      },{
        path: '/view-profile-postulant/project/:ida',component: ViewProjectPostulant
      },{
        path: '/company/:id/search-profile-postulant',component: SearchPostulant
      },{
        path: '/company/:id/my-notifications',component: NotificationsCompany
      }
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
