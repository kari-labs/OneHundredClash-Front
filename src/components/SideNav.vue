<template>
  
    
    
</template>

<script>
import ONavItem from "@/components/NavItem.vue";

export default {
    name: "ONavBar",
    props: {
        drawer: Boolean
    },
    components: {
        ONavItem,
    },
    mounted(){
    },
    data() {
      return {
          //drawer: this.props.drawer,
      }
    },
    
}
</script>

<style>

</style>