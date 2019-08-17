<template>
        <v-list-item
            @click="clicked"
        >
        <v-list-item-action>
            <v-icon>dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
</template>
<script>
export default {
    name: 'ONavItem',
    props:{
        to:{
            type: String,
            default: "/"
        },
        title: {
            type: String,
            default: "Title"
        }
    },
    methods: {
        clicked(){
            this.$emit('clicked');
            this.$router.push(this.to)
        }
    }
}
</script>