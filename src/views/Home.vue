<template>
  <Navbar>
      <ul class="topBar-menu">
        <li><a href="#bedAdvantage">床墊優勢</a></li>
        <li><a href="#recommendation">好評推薦</a></li>
        <li><a href="#transport">運送方式</a></li>
        <li><a href="#orderInfo">立即預訂</a></li>
        <router-link to="/admin">
          <li class="page-switcher">Admin Page</li>
        </router-link>
      </ul>
  </Navbar>
  <Hero />
  <Comparison/>
  <Recommendation/>
  <Transport/>
  <Product-display 
  @popInfo="togglePopInfo" @componentOffset="componentOffset"/>
  <Shopping-cart 
  @headTo="headTo" 
  @popInfo="togglePopInfo" 
  @alertInfo="showAlertInfo"
  />
  <Order-form @togglePopInfo="togglePopInfo"/>

  <transition name="slide-down">
    <PopupInfo v-show="popupInfo" :alert="alertInfo">
      <h4>{{popupContent}}</h4>
        <!-- shopping cart delete  choices -->
      <template v-if="alertInfo" v-slot:delete-all-selector>
        <button @click="delCartAll">Yes</button>
        <button @click="hideAlertInfo">No</button>
      </template>
    </PopupInfo>
  </transition>
</template>

<script>
import {mapActions} from 'vuex'
import Navbar from '../components/Navbar.vue'
import Hero from '../components/home/Hero.vue'
import Comparison from '../components/home/Comparison.vue'
import Recommendation from '../components/home/Recommendation.vue'
import Transport from '../components/home/Transport.vue'
import ProductDisplay from '../components/home/ProductDisplay.vue'
import ShoppingCart from '../components/home/ShoppingCart.vue'
import OrderForm from '../components/home/OrderForm.vue'
import PopupInfo from '../components/PopupInfo.vue'
export default {
  components: {
    Navbar,
    Hero,
    Comparison,
    Recommendation,
    Transport,
    ProductDisplay,
    ShoppingCart,
    OrderForm,
    PopupInfo
  },
  data(){
    return{
      offsetVal: null, // productDisplay offsetTop
      popupInfo:false,
      popupContent:'',
      alertInfo:false
    }
  },
  methods:{
    ...mapActions(['deleteAll_cart']),
    componentOffset(val){
      this.offsetVal = val
    },
    headTo(){
      window.scrollTo({top:this.offsetVal, behavior:'smooth'})
    },
    togglePopInfo(content){
      this.popupInfo = true
      this.popupContent = content
      setTimeout(()=>{
        this.popupInfo = false
        this.popupContent = ''
      },2500)
    },
    showAlertInfo(content){
      this.popupContent = content
      this.popupInfo = true
      this.alertInfo = true
    },
    hideAlertInfo(){
      this.popupInfo = false
      setTimeout(()=>this.alertInfo = false,500)
      
    },
    async delCartAll(){
      await this. deleteAll_cart()
      this.hideAlertInfo()
      this.togglePopInfo('Your cart is now Empty!')
    },
  }
}
</script>


<style>
.slide-down-enter-active,.slide-down-leave-active{
  transition: all 0.5s ease
}
.slide-down-enter-from,.slide-down-leave-to{
  top:-200px;
}

</style>