<template>
   <v-app id="dashboard">
       <v-container fluid>
           <v-card>
                <v-sparkline
                :value="value"
                :labels="labels"
                :gradient="gradient"
                :gradient-direction="bottom"
                :show-labels="true"
                :radius="3"
                :type="bar"/>
           </v-card>
       </v-container>
   </v-app>
</template>

<script>
const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
]
export default {
    data: () => ({
        value: [
      200,
      675,
      410,
      390,
      310,
      460,
      250,
      240,
    ],
        labels: [
      '12am',
      '3am',
      '6am',
      '9am',
      '12pm',
      '3pm',
      '6pm',
      '9pm',
    ],
        gradient: gradients[5],
        lineCap: 'round',
    })
}
</script>

<style>

</style>