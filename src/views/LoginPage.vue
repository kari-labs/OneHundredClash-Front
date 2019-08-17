<template>
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
    >{{text}}</v-snackbar>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col>
          <v-card class="elevation-12 fill-height" style="{margin: auto}">
            <v-toolbar color="primary" dark flat>
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
              <v-btn text color="primary" class="ma-2" @click="overlay = true">Create</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="login(username,password)">Login</v-btn>
            </v-card-actions>
          </v-card>
          <v-overlay :absolute="absolute" :opacity="opacity" :value="overlay">
            <v-card class="elevation-12" min-width="70vw">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Create User</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field label="First Name" name="first" type="text" v-model="first"></v-text-field>

                  <v-text-field label="Last Name" name="last" type="text" v-model="last"></v-text-field>
                  <v-text-field label="Username" name="last" type="text" v-model="username"></v-text-field>
                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                  <v-text-field label="Email" name="email" type="text" v-model="email"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn text @click="overlay=false">Close</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="create(first,last,username,password,email)" color="primary">Create</v-btn>
              </v-card-actions>
            </v-card>
          </v-overlay>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>
<script>
import gql from "graphql-tag";
var jwt = require("jsonwebtoken");
export default {
  props: {
    source: String
  },
  data: () => ({
    absolute: true,
    opacity: 1,
    overlay: false,
    email: "",
    first: "",
    last: "",
    text: "",
    color: "error",
    mode: "vertical",
    snackbar: false,
    timeout: 6000,
    x: null,
    y: "top",
    username: "",
    password: "",
    drawer: null,
    alert: false
  }),
  created() {
    this.$vuetify.theme.dark = true;
  },
  methods: {
    async create(first, last, username, password, email) {
      try {
        const token = await this.$apollo.mutate({
          mutation: gql`mutation{
              register(
                first: "${first}",
                last: "${last}",
                username: "${username}",
                password: "${password}",
                email: "${email}"
              )
            }`
        });
        localStorage.setItem("JWT", token.data.register);
        this.$store.state.userData = jwt.verify(
          token.data.register,
          "nicoleIsACutie"
        );
        this.overlay = false;
        this.text = "Success";
        this.color = "success";
        this.alert = true;
      } catch (error) {
        this.text = "An account with that Username or Email is already in use";
        this.alert = true;
      }
    },
    async login(username, password) {
      const handleInvalidLogin = () => {
        this.color = "error";
        this.text = "Invalid Username or Password";
        this.alert = true;
      };

      const handleJWTAuth = token => {
        localStorage.setItem("JWT", token.data.login);
        this.$store.state.userData = jwt.verify(
          token.data.login,
          "nicoleIsACutie"
        );
        this.overlay = false;
        this.text = "Success";
        this.color = "success";
        this.alert = true;
      };

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async position => {
          let serializedPosition = `${position.coords.latitude}|${position.coords.longitude}|${position.timestamp}`;
          try {
            const token = await this.$apollo.mutate({
              mutation: gql`
                mutation{
                  login(
                    username: "${username}",
                    password: "${password}",
                    geo: "${serializedPosition}"
                  )
                }
              `
            });
            handleJWTAuth(token);
          } catch (err) {
            handleInvalidLogin();
          }
        });
      } else {
        try {
          const token = await this.$apollo.mutate({
            mutation: gql`
                mutation{
                  login(
                    username: "${username}",
                    password: "${password}"
                  )
                }
              `
          });
          handleJWTAuth(token);
        } catch (err) {
          handleInvalidLogin();
        }
      }
    }
  },
  apollo: {
    nameOfTheGame: gql`
      query {
        nameOfTheGame
      }
    `
  }
};
</script>