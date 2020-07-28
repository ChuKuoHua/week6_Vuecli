<template>
  <div class="home">
    <div class="navbar navbar-fixed-top nav-box d-flex justify-content-between">
      <div class="font-menu">
        <ul class="navbar-nav flex-row">
          <li class="nav-item mr-2">
            <router-link to="/">首頁</router-link>
          </li>
          <li class="nav-item mr-2">
            <router-link to="/about">關於我們</router-link>
          </li>
          <li class="nav-item mr-2">
            <router-link to="/products">產品列表</router-link>
          </li>
        </ul>
      </div>
      <div class="logo">
        <router-link to="/">logo</router-link>
      </div>
      <div class="font-login">
        <router-link to="/cart" class="mr-3">
          <font-awesome-icon :icon="['fa', 'shopping-cart']" size="lg"/>
          購物車
        </router-link>
        <router-link to="/admin/products" class>
          <font-awesome-icon :icon="['fa', 'user']" size="lg"/>
          登入
        </router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
    };
  },
};
</script>

<style lang="scss">
.flex-row{
  flex-direction: row;
}
.nav-box{
  background: #35bdb7;
  padding: 10px 15px;
}
.navbar a{
  color: #f5f0ee;
  &:hover{
    color: #1c4d65;
    text-decoration: none;
  }
}
</style>
