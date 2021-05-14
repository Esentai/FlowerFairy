<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <div class="container">
      <b-navbar-brand href="/">Flower Fairy</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-button v-on:click="add()" size="md" class="my-2" variant="light">Подать объявление</b-button>
          <b-button v-if="userCheck()" v-on:click="logout" size="md" class="my-2 logout" variant="light">Выйти</b-button>
          <router-link to="Auth"><b-button v-if="!userCheck()" size="md" class="my-2 logout" variant="light">Войти</b-button></router-link>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
export default {
  name: "Header",
  methods:{
    logout(){
      localStorage.setItem('login', 'false');
      localStorage.setItem('email', '');
      localStorage.setItem('fullname', '');
      location.reload();
    },

    userCheck(){
      return localStorage.getItem('login') === 'true';
    },
    add(){
      if (localStorage.getItem('login') === 'true'){
        this.$router.replace('./add');
      }else{
        this.$confirm("Чтобы подать объявление вам нужно авторизоваться").then(() => {
          this.$router.replace('./auth');
        });
      }
    }
  }
}
</script>

<style scoped>
  nav{
    padding: 10px 0;
  }
  .logout{
    margin-left: 10px;
  }
</style>