<template>
  <div>
    <Header/>
    <div class="container details">
      <router-link class="backBtn" to="/">Назад</router-link>
      <div class="row">
        <div class="col-md-8">
          <div class="block">
            <div class="block_img">
              <img :src="advert.image_link" alt="">
            </div>
          </div>
          <div class="block">
            <div class="block_info">
              <h3>{{ advert.name }}</h3>
              <h4>Описание</h4>
              <p>{{ advert.description }}</p>
            </div>
          </div>
          <div class="block">
            <div class="block_price">
              <h4>Стоимость услуги: {{ advert.price }}₸</h4>
            </div>
          </div>
          <div v-if="advert.email === this.user" class="block">
            <button v-on:click="deleteAdvert" class="btn btn-danger">Удалить объявление</button>
          </div>
        </div>
        <div class="col-md-4">
          <div class="block">
            <h6>Пользователь</h6>
            <h3>{{advert.fullname}}</h3>
            <p>{{  advert.number }}</p>
            <div class="socialIcons">
              <a target="_blank" :href="whatsapp"><img src="../assets/whatsapp.png" width="35" alt=""></a>
              <a target="_blank" :href="phoneNumber"><img src="../assets/phone.png" width="35" alt=""></a>
              <a target="_blank" :href="email"><img src="../assets/gmail.png" width="35" alt=""></a>
            </div>
          </div>
          <div class="block">
            <h6>Местоположение</h6>
            <p><BIconGeoAltFill/> {{advert.address}}</p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import { BIconGeoAltFill } from 'bootstrap-vue'
export default {
  name: "Details",
  components:{
    Header,
    BIconGeoAltFill,
    Footer
  },
  data() {
    return {
      advert:{},
      phoneNumber: '',
      whatsapp: '',
      email: '',
      user: localStorage.getItem('email'),
    }
  },
  created() {
    let id = this.$route.params.id;
    this.getAdvert(id);
  },
  methods:{
    async getAdvert(id){
      await axios.post('http://localhost:5000/getAdvert', {
        params: {
          id: id
        }
      }).then((response) => {
        console.log(response.data[0]);
        this.advert =  response.data[0];
        this.phoneNumber = `tel: ${this.advert.number}`;
        this.whatsapp = `https://wa.me/${this.advert.number}`;
        this.email = `mailto: ${this.advert.email}`;
      });
    },

    async deleteAdvert(){
      console.log(this.advert.id);
      await axios.post('http://localhost:5000/deleteAdvert', {
        params: {
          id: this.advert.id
        }
      }).then((response) => {
        if (response.data === 'success'){
          this.$router.replace('/');
        }
      });
    }

  }

}
</script>

<style scoped>
  .details{
    margin-top: 30px;
    margin-bottom: 100px;
  }
  .block{
    background-color: #fff;
    border-radius: 10px;
    padding: 25px;
    margin-top: 20px;
  }
  .block_img{
    height: 400px;
    text-align: center;
  }
  .block_img img{
    max-width: 100%;
    max-height: 100%;
    margin: auto;
  }
  .socialIcons a{
    margin-right: 25px;
  }
  .socialIcons a:hover{
    opacity: 0.85;
  }
  .block_info p{
    font-size: 18px;
    overflow: hidden;
  }
  .block_info h4{
    margin-top: 30px;
  }
  .backBtn{
    text-align: center;
    font-size: 19px;
    background-color: #343a40;
    border: 1px solid #343a40;
    color: #fff;
    padding: 4px 40px 7px 40px;
    border-radius: 5px;
  }
  .backBtn:hover{
    text-decoration: none;
    opacity: 0.85;
  }
</style>