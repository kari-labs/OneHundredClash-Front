
<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
    
      <v-list dense>
        <v-list-item>
          <v-list-item-action>
            <v-icon>dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon>settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{nameOfTheGame}}</v-toolbar-title>
    </v-app-bar>
  
    <v-content>
      <v-snackbar
        v-model="alert"
        :bottom="y === 'bottom'"
        :color="color"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :right="x === 'right'"
        :timeout="timeout"
        :top="'top'"
      >
      Invalid Username or Password
      </v-snackbar>
      <v-container
        class="fill-height"
        fluid
      >
      
        <v-row
          align="center"
          justify="center"
        >
          <v-col>
            
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Welcome</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    v-model="username"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login(username,password)">Login</v-btn>
              </v-card-actions>
            </v-card>

          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      2019 Game Jam
    </v-footer>
  </v-app>
</template>

<script>
import gql from 'graphql-tag'
var jwt = require('jsonwebtoken');
  export default {
    props: {
      source: String,
    },
    data: () => ({
      color: 'error',
      mode: 'vertical',
      snackbar: false,
      timeout: 6000,
      x: null,
      y: 'top',
      username: "",
      password: "",
      drawer: null,
      alert: false,
    }),
    created () {
      this.$vuetify.theme.dark = true
    },
    methods: { 
      async login(username, password){
        try {
          const token = await this.$apollo.mutate({
          mutation: gql`mutation{
            login(
              username: "${username}",
              password: "${password}"
            )
          }`
        })
        this.$store.state.userData = jwt.verify(token.data.login, "nicoleIsACutie");
        console.log(this.$store.state.userData)
        } catch (error) {
          this.alert = true;
        }
        
      },
    },
    apollo: {
      nameOfTheGame: gql`query{
        nameOfTheGame
      }`,
    }
  }
</script>