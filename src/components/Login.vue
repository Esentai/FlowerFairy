<template>
  <div class="login">
      <div>
        <label >Email</label>
        <b-form-input
            type="email"
            id="name"
            v-model="email"
            trim
        ></b-form-input>
      </div>
      <div>
        <label >Пароль</label>
        <b-form-input
            id="password"
            type="password"
            v-model="password"
            trim
        ></b-form-input>
      </div>
      <div>
        <button v-on:click="login" class="loginBtn">Войти</button>
      </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: '',
      password:'',
    }
  },
  methods:{
    async login(){
      await axios.post('http://localhost:5000/login', {
        params: {
          email: this.email,
          password: this.password
        }
      }).then((response) => {
        console.log(response);
        if (response.data === 'success'){
          localStorage.setItem('login', 'true');
          localStorage.setItem('email', this.email);
          this.$router.replace('./')
        }else{
          this.$alert(`Error! ${response.data}`);
        }
      }, (error) => {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>
  .login{
    padding: 15px;
  }
  .login div{
    margin-bottom: 15px;
  }
  .loginBtn{
    width: 100%;
    height: 35px;
    background-color: #343a40;
    color: white;
    border-radius: 10px;
    margin-top: 20px;
  }
</style>