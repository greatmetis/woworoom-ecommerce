<template>
  <div class="popup-info" :class="this.alertClass ? 'alert': ''">
    <slot></slot>
    <slot name="delete-all-selector"></slot>
    <slot name="delete-selector"></slot>
  </div>
</template>

<script>
export default {
  props:['alert'],
  computed:{
    alertClass(){
      return this.alert ? true : false
    }
  }
}
</script>

<style>
.popup-info {
  position: fixed;
  display: flex;
  justify-content: center;
  background-color: #6a33f8;
  width: 100%;
  color: #ffffff;
  top: 0px;
  left: 0px;
  padding:16px;
}

.popup-info.alert {
  background-color: #c72424;
}
.popup-info p {
  font-size: 1.25rem;
  padding: 10px;
  /* text-align: center; */
}
.popup-info button {
  outline: none;
  border: none;
  color: #b9b9b9;
  cursor: pointer;
  background-color: transparent;
  transition: all 0.1s ease-in;
}

.popup-info button:hover {
  color: #fff;
  -webkit-transform: scale(1.3);
  transform: scale(1.3);
}
</style>