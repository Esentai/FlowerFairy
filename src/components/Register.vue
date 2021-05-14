<template>
  <form class="login">
    <div>
      <label >ФИО</label>
      <b-form-input
          v-model="fullname"
          id="name"
          :state="nameState"
          trim
      ></b-form-input>
    </div>
    <div>
      <label >Email</label>
      <b-form-input
          v-model="email"
          id="name"
          :state="emailState"
          trim
      ></b-form-input>
    </div>
    <div>
      <label >Пароль</label>
      <b-form-input
          v-model="password"
          id="password"
          type="password"
          :state="passwordState"
          trim
      ></b-form-input>
    </div>
    <div>
      <button type="button" :disabled="!emailState || !passwordState  || !nameState" v-on:click="register" class="loginBtn">Регистрация</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  computed: {
    nameState() {
      return this.fullname.length > 2
    },
    emailState(){
      return this.emailValid();
    },
    passwordState(){
      return this.password.length > 8
    },
  },
  data() {
    return {
      fullname: '',
      email: '',
      password:'',
    }
  },
   methods:{
    async register(){
      console.log("dd")
      await axios.post('http://localhost:5000/register', {
        params: {
          fullname: this.fullname,
          email: this.email,
          password: this.password
        }
      }).then((response) => {
        console.log(response);
        if (response.data === 'success'){
          localStorage.setItem('login', 'true');
          localStorage.setItem('email', this.email);
          localStorage.setItem('fullname', this.fullname);
          this.$router.replace('./')
        }else{
          this.$alert(`Error! ${response.data}`);
        }
      }, (error) => {
        console.log(error);
      });
    },
    emailValid(){
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.email.toLowerCase());
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