<template>
  <div class="home">
    <Header/>
    <Adverts/>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Adverts from "@/components/Adverts";

export default {
  name: 'Home',
  components:{
    Header,
    Adverts,

  }
}

</script>

<style>
  body{
    background-color: rgb(242, 244, 245) !important;
  }

</style>