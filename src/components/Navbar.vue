<template>
  <nav class="topBar">
        <div class="wrap">
            <h1><router-link to="/" class="logo">WOWOROOM</router-link></h1>
            <router-link :to="toRoute">
              <li class="page-switcher menuToggle">Switch Page</li>
            </router-link>
            <slot></slot>
        </div>
    </nav>
</template>

<script>
export default {
  name:'Navbar',
  data(){
    return{
      isRoute:null,
    }
  },
  computed:{
    toRoute(){
      return this.isRoute === '/' ? '/admin' : '/'
    }
  },
  created(){
    this.isRoute = this.$route.path
  }
}
</script>

<style>
.topBar {
  border-bottom: 40px solid #000000;
  margin-bottom: 30px;
}

.topBar .wrap {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: relative;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.topBar-menu {
  display: flex;
  align-items: center;
}
.topBar-menu .page-switcher {
  display: inline-block;
  padding: 5px 15px;
  background-color: transparent;
  color: #000;
  border: 4px solid #000;
  border-radius: 5px;
  font-size: 1.25rem;
  cursor: pointer;
}
.page-switcher:hover {
  background-color: #000;
  color: white;
}


@media (max-width: 1110px) {
  .topBar .wrap {
    padding: 0 15px;
  }
}

.topBar a {
  display: block;
  text-decoration: none;
  color: #000000;
  font-size: 1.25rem;
}

.topBar a:hover {
  color: #6a33f8;
  -webkit-transform: scale(1.05);
  transform: scale(1.05);
}

.topBar-menu {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  background-color: #ffffff;
}

.topBar-menu.openMenu {
  max-height: 300px;
}

.topBar-menu a {
  padding: 36px 24px;
  background-color: #ffffff;
}

.topBar-menu a:hover {
  -webkit-transform: scale(1);
  transform: scale(1);
}

.topBar-menu li:last-child a {
  padding-right: 0;
}

@media (max-width: 767px) {
  .topBar-menu {
    position: absolute;
    top: 61px;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 10;
    max-height: 0;
    overflow: hidden;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }
  .topBar-menu li {
    width: 100%;
  }
  .topBar-menu a {
    text-align: center;
    padding: 15px;
    font-size: 1rem;
  }
  .topBar-menu a:hover {
    background-color: #6a33f8;
    color: #ffffff;
  }
  .topBar-menu li:last-child a {
    padding: 15px;
  }
}

.menuToggle {
  display: none;
  cursor: pointer;
}

.menuToggle:hover {
  color: #6a33ff;
}

@media (max-width: 767px) {
  .menuToggle {
    display: block;
    color:#b39af9;
  }
  .menuToggle:hover{
    color: #6a33ff;
    background-color: transparent;
  }
}

.logo {
  padding: 36px 0;
  font-size: 1.5rem;
}

@media (max-width: 767px) {
  .logo {
    padding: 15px;
  }
}

</style>