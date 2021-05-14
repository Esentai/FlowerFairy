<template>
  <div class="container list">
      <div class="buttons">
        <button v-on:click="dataFilter('all')" class="button" v-bind:class="{ active: selected === 'all' }">Все обявления</button>
        <button  v-on:click="dataFilter('mine')" class="button" v-bind:class="{ active: selected === 'mine' && !loginCheck() }"   >Мои обявления</button>
      </div>
      <div v-if="empty">
        <h2>У вас нет объявления</h2>
      </div>
      <div v-if="!empty">
        <router-link  class="link" v-for="advert in adverts" :key="advert.id" :to="{ name: 'Advert', params: { id: advert.id }}" >
          <div class="item" >
              <div class="item_left">
                <div class="item_image">
                  <img :src="advert.image_link" alt="">
                </div>
                <div class="item_text">
                  <h4>{{ advert.name}}</h4>
                  <p>{{ advert.address }}</p>
                </div>
              </div>
              <div class="item_right">
                <h3>{{ advert.price }}₸</h3>
              </div>
          </div>
        </router-link>
      </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Adverts",
  data() {
    return {
      adverts: [],
      selected: 'all',
      empty:false
    }
  },
  mounted() {
    this.getAllData();
  },
  created() {
    this.getAllData();
  },
  methods:{
    dataFilter(type){
      this.selected = type;
      if (type === 'all'){
        this.getAllData();
      }else{
        if (localStorage.getItem("login") === 'true') {
          this.getMineData();
        }else{
          this.selected = 'all'
          this.$confirm("Чтобы посмотреть ваши объявления вам нужно авторизоваться").then(() => {
            this.$router.replace('./auth');
          });
        }
      }
    },
    async getAllData(){
      await axios.get('http://localhost:5000/adverts').then((response) => {
        console.log(response.data);
        this.adverts = response.data
        this.empty = false
      }, (error) => {
        console.log(error);
      });
    },

    async getMineData(){
      await axios.post('http://localhost:5000/getAdverts', {
        params: {
          email: localStorage.getItem("email"),
        }
      }).then((response) => {
        console.log(response.data);
        if (response.data === 'empty'){
          this.empty = true
          return;
        }
        this.adverts =  response.data;
        this.empty = false
      });
    },

    loginCheck(){
      console.log(localStorage.getItem('login') === 'false');
      return localStorage.getItem('login') === 'false'
    }


  }
}
</script>

<style scoped>
  .buttons{
    margin: 30px 0;
  }
  .button{
    margin-right: 15px;
    background-color: #343a40;
    border: 1px solid #343a40;
    color: #fff;
    width: 200px;
    height: 35px;
    border-radius: 5px;
  }
  .active{
    background-color: #fff !important;
    color: #343a40 !important;
    cursor: default;
  }
  .item{
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 15px;
  }
  .item_left{
    display: flex;
  }
  .item_image{
    display: flex;
    align-items: center;
    min-width: 300px;
    min-height: 200px;
    max-width: 300px;
    max-height: 200px;


  }
  .item_image img{
    max-width: 100%;
    max-height: 100%;
    margin: auto;
  }
  .item_text{
    margin: 0 15px;
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .item_right{
    display: flex;
    align-self: center;
    padding-right: 20px;
  }
  .link{
    color: #343a40;
    text-decoration: none;
  }
  .link:hover{
    opacity: 0.9;
  }
  .list{
    margin-bottom: 100px;
  }
</style>