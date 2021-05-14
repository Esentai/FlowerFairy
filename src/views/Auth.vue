<template>
  <div id="auth">
    <Header />
    <div class="form">
      <div class="buttons">
        <button v-on:click="selected = 'login'"  class="select" v-bind:class="{ active: selected === 'login' }">Войти</button>
        <button v-on:click="selected = 'register'" class="select" v-bind:class="{ active: selected === 'register' }">Регистрация</button>
      </div>
      <hr>

      <Login v-if="selected === 'login'"/>
      <Register v-if="selected === 'register'"/>
    </div>
    <Footer />
  </div>
</template>


<script>
  import Header from "@/components/Header";
  import Footer from "@/components/Footer";
  import Login from "@/components/Login";
  import Register from "@/components/Register";
  export default {
    name: 'Home',
    components:{
      Header,
      Footer,
      Login,
      Register
    },
    data() {
      return {
        selected: 'login'
      }
    },
    methods:{

    }
  }
</script>

<style scoped>
  #auth{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
  }
  .form{
    background-color: white;
    width: 400px;
    padding: 10px;
    margin: 0 auto ;
  }
  .buttons{
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .select{
    width: 185px;
    height: 40px;
    border: 1px solid #343a40;
    background-color: #343a40;
    color: white;
    border-radius: 5px;
  }
  .active{
    background-color: #fff;
    color: #343a40;
    cursor: default;
  }
</style>