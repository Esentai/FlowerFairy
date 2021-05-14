<template>
  <div>
    <Header />
    <AddForm />
    <Footer />
  </div>
</template>

<script>

import Header from "@/components/Header";
import AddForm from "@/components/AddForm";
import Footer from "@/components/Footer";
export default {
  name: "Add",
  components:{
    Header,
    AddForm,
    Footer
  }
}
</script>

<style scoped>

</style>