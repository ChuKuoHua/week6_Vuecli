<template>
  <div>
    <div class="conatiner m-5">
      <h2 class="h2 mb-3">確認訂單</h2>
      <router-link
        to="/success"
        class="btn checkout-btn btn-block btn-Order">
      付款
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkout',
  data() {
    return {
    };
  },
};
</script>

<style lang="scss">
.btn-Order{
  margin: 0 auto;
  width: 100px;
}
</style>
