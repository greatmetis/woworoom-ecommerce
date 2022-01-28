<template>
  <div class="login">
    <form class="login-card">
      <div>
        <label for="login-email">Email</label>
        <input type="email" id="login-email" v-model="email">
      </div>
      <div>
        <label for="login-password">password</label>
        <input type="password" id="login-password" v-model="password">
      </div>
      <button type="submit" @click.prevent="checkLoginDetails">Login</button>
    </form>
  </div>
</template>

<script>

export default {
  name:'LoginCard',
  emits:['loggedIn'],
  data(){
    return{
      email:'',
      password:''
    }
  },
  methods:{
    checkLoginDetails(){
      if(this.email === 'wowoRoom@gmail.com' && this.password === 'wowoRoomAdmin'){
        this.$emit('loggedIn')
        return
      }
      return
    },
  }
}
</script>

<style>
.login{
  margin-left:auto; 
  margin-right:auto;
  padding:16px 24px 24px;
  width:90%;
  max-width:500px;
  border: 6px solid #000;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}
.login-card{
  display: flex;
  flex-direction:column;
  align-items: start;
  
}
.login-card div{
  display: flex;
  margin-top: 16px;
  width:100%;
  align-items: center;
}
.login-card div label{
  flex:1;
  margin-right:16px;
}
.login-card div input{
  width: 100%;
  min-height: 38px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  text-indent: 1rem;
  margin-right: 10px;
  flex:3;
}
.login-card button{
  display: inline-block;
  padding: 5px 15px;
  background-color: transparent;
  color: #000000;
  border: 1.3px solid #000000;
  border-radius: 5px;
  font-size: 1.25rem;
  cursor: pointer;
  margin-top: 24px;
  margin-left:auto;
  margin-right:auto;
}

.login-card button:hover{
  background-color: #000000;
  color: #ffffff;
}


</style>