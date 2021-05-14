<template>
  <div class="container">
    <div class="addForm">
      <h1 class="addForm_title">Создать объявление</h1>
      <div class="form">
        <div class="info">
          <div class="col-md-8" role="group">
            <h5>Опишите в подробностях</h5>
            <label >Укажите название*</label>
            <b-form-input
                id="name"
                v-model="advert.name"
                :state="nameState"
                aria-describedby="input-live-help input-live-feedback"
                placeholder="Например, Розы"
                trim
            ></b-form-input>
           <b-form-invalid-feedback id="input-live-feedback">
             Введите не менее 3 букв
            </b-form-invalid-feedback>
          </div>
          <br>
          <div class="col-md-8" role="group">
            <label>Описание*</label>
            <b-form-textarea
                id="description"
                v-model="advert.description"
                :state="descriptionState"
                placeholder="Подумайте, какие подробности вы хотели бы узнать из объявления. И добавьте их в описание"
                rows="4"
                max-rows="6"
                class="description"
            ></b-form-textarea>
            <b-form-invalid-feedback id="input-live-feedback">
              Описание должно быть не короче 80 знаков
            </b-form-invalid-feedback>
          </div>
        </div>
        <div class="info">
          <div class="col-md-8" >
            <h5>Фото</h5>
            <b-form-file
                accept=".jpg, .png, .gif"
                id="image"
                type="file"
                name="image"
                v-model="advert.image"
                placeholder="Добавить фото"
                drop-placeholder="Drop file here..."
                v-b-tooltip.hover
                title="Сервис временно не работает! Прошу ввести ссылку на изображение"
                disabled
            ></b-form-file>
            <br> <br>
            <b-form-input
                id="image_link"
                v-model="advert.image_link"
                :state="imgState"
                placeholder="Введите ссылку на изображение"
                trim
            ></b-form-input>
          </div>
        </div>

        <div class="info">
          <div class="col-md-8" >
            <h5>Укажите цену</h5>
            <b-form-input
                id="price"
                type="number"
                v-model="advert.price"
                :value="advert.price"
                :state="priceState"
                placeholder="7500 ₸"
                trim

            ></b-form-input>
          </div>
        </div>

        <div class="info">
          <div class="col-md-8" >
            <h5>Контактная информация</h5>
            <label>ФИО:</label>
            <b-form-input
                id="fullname"
                v-model="advert.fullname"
                readonly
            ></b-form-input>
            <br>
            <label>Email-адрес:</label>
            <b-form-input
                id="email"
                v-model="advert.email"
                readonly
            ></b-form-input>
            <br>
            <label>Номер телефона*</label>
            <b-form-input
                id="number"
                v-model="advert.number"
                :state="numberState"
                trim

            ></b-form-input>
            <br>
            <label>Aдрес*</label>
            <b-form-input
                id="address"
                v-model="advert.address"
                :state="addressState"
                trim
            ></b-form-input>
          </div>
        </div>
        <div class="info" style="text-align: right; padding-right: 35px">
          <b-button v-on:click="addFunc()" variant="primary" size="lg" :disabled="!nameState || !descriptionState || !numberState || !imgState || !priceState">Опубликовать</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "AddForm",
  computed: {
    nameState() {
      return this.advert.name.length > 2
    },
    descriptionState(){
      return this.advert.description.length > 100
    },
    numberState(){
      return this.advert.number.length > 10
    },
    priceState(){
      return this.advert.price.length > 0
    },
    addressState(){
      return this.advert.address.length > 0
    },
    imgState(){
      return this.advert.image_link.length > 0
    }
  },
  data() {
    return {
      advert:{
        name: '',
        description: '',
        image: '',
        image_link:'',
        price:'',
        email: localStorage.getItem('email'),
        fullname: '',
        number: '',
        address: '',
      }
    }
  },

  async created() {
    await axios.post('http://localhost:5000/getName', {
      params: {
        email: localStorage.getItem('email'),
      }
    }).then((response) => {
      console.log(response.data)
      this.advert.fullname = response.data;
      localStorage.setItem("fullname", response.data)
    }, (error) => {
      console.log(error);
    });
  },

  methods:{
    async addFunc(){
      await axios.post('http://localhost:5000/adverts', {
        params: {
          advert: this.advert,
        }
      }).then((response) => {
        console.log(response);
        if (response.data === 'success'){
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
  .addForm_title{
    font-size: 32px;
    line-height: 34px;
    font-weight: 600;
    color: rgb(0, 47, 52);
    margin: 48px 0px 30px;
  }
  .info{
    background-color: #fff !important;
    padding: 30px 10px;
    border-radius: 5px;
    margin-bottom: 15px;
  }
  .info h5{
    margin-bottom: 15px;
  }
  .description{
    overflow-y: hidden !important;
  }
</style>