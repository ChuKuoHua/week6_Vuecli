<template>
  <div class="navbar navbar-fixed-top d-flex justify-content-between">
    <div class="back-logo">
      <router-link to="/">logo</router-link>
    </div>
    <div class="back-menu">
      <router-link to="/">首頁</router-link>
      <a class="ml-3" href="#" @click.prevent="signout">登出</a>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    signout() {
      document.cookie = 'hexToken=; expires=; path=/';
      console.log('token 已清除');
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="scss">
.back-logo{
  a{
    color: #fff;
    &:hover{
      text-decoration: none;
    }
  }
}
.back-menu{
  a{
    color: #fff;
    &:hover{
      text-decoration: none;
    }
  }
}
</style>
