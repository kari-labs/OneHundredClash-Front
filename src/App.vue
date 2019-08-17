
<template>
  <v-app id="inspire">
    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{nameOfTheGame}}</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
  <v-container>
    <v-container>
      <span>
        Navigation
      </span>
    </v-container>
  </v-container>
      <v-list dense>
        <o-nav-item
        to="/"
        title="Login"
        >
        <v-icon></v-icon>
        </o-nav-item>
        <o-nav-item
        to="/dashboard"
        title="Dashboard">
        <v-icon>Dashboard</v-icon>
        </o-nav-item>
      </v-list>
       
    </v-navigation-drawer>
    <v-container>
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
import ONavItem from "@/components/NavItem.vue"
import gql from 'graphql-tag'
  export default {
    name: "App",
    components: {
      ONavItem
    },
    props: {
      source: String,
    },
    created () {
      this.$vuetify.theme.dark = true
    },
    methods: { 
      
    },
    data: () => ({
      drawer: null
    }),
    apollo: {
      nameOfTheGame: gql`query{
        nameOfTheGame
      }`,
    }
  }
</script>