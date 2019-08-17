
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
      <v-toolbar-title>{{hello}}</v-toolbar-title>
    </v-app-bar>

    <v-content>
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
                <v-toolbar-title>{{hello}}</v-toolbar-title>
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
      username: "",
      password: "",
      drawer: null,
    }),
    created () {
      this.$vuetify.theme.dark = true
    },
    methods: { 
      async login(username, password){
        
        const token = await this.$apollo.mutate({
          mutation: gql`mutation{
            login(
              username: "${username}",
              password: "${password}"
            )
          }`
        })
        const decode = jwt.verify(token.data.login, "nicoleIsACutie")
        console.log(decode)
        if(decode != null){
          this.$store.state.userData = decode;
          console.log(this.$store.state.userData)
        }else{
          console.log("Invalid Username or Password")
        }
        
      },
    },
    apollo: {
      hello: gql`query{
        hello
      }`,
    }
  }
</script>