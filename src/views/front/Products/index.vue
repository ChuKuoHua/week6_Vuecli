<template>
  <div>
    <loading :active.sync="isLoading">
      <i class="loading-box"></i>
    </loading>
    <div class="container position-relative my-2 d-flex">
      <div class="col-md-3 mb-2">
        <ul class="list-group sticky-top">
          <li class="list-group-item p-xy-0 active">
            <a href="#" class="list-btn active">全部商品</a>
          </li>
          <li class="list-group-item p-xy-0">
            <a  href="#" class="list-btn">周邊．公仔</a>
          </li>
          <li class="list-group-item p-xy-0">
            <a href="#" class="list-btn">吊飾．鑰匙圈</a>
          </li>
          <li class="list-group-item p-xy-0">
            <a href="#" class="list-btn">漫畫．娃娃</a>
          </li>
          <li class="list-group-item p-xy-0">
            <a href="#" class="list-btn">電玩遊戲</a>
          </li>            
        </ul>
      </div>
      <div class="col-md-9">
        <div class="d-flex flex-wrap">
          <div class="card-flex shadow-sm" v-for="item in products"
          :key="item.id">
            <div class="img-box item-img" :style="{backgroundImage:`url(${item.imageUrl[0]})`}">
            </div>
            <div class="card-body">
              <h5 class="card-title ls-1 font-weight-bold">{{ item.title }}</h5>
              <p class="item-text">{{ item.content }}</p>
            </div>
            <div class="text-right pr-3 origin-price-f price-m-b">
              {{item.origin_price}} 元
            </div>
            <div class="text-right pr-3 price-color">
              {{item.price}} 元
            </div>
            <div class="card-footer border-top-0 bg-white btn-flex">
              <router-link :to="`/product/${item.id}`"
                class="btn btn-details btn-sm"
                :disabled="status.loadingItem === item.id">
                <font-awesome-icon :icon="['fa', 'skull']"
                spin
                v-if="item.id === status.loadingItem"/>
                查看更多
              </router-link>
              <button 
                class="btn btn-shopping btn-sm" 
                :disabled="status.loadingItem === item.id"
                type="button"
                @click="addToCart(item.id)">
                <font-awesome-icon :icon="['fa', 'skull']" spin
                v-if="item.id === status.loadingItem"/>
                加到購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toast from '../../../components/alert/Toast';
export default {
  name: 'Products',
  data(){
    return{
      isLoading: false,
      status:{
        loadingItem:'',
      },
      products: {},
      carts:{},
    };
  },
  created(){
    this.getProducts();
  },
  methods:{
    getProducts(){
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`;
      this.isLoading = true;
      // 預設帶入 token
      this.$http.get(url)
        .then((res) =>{
          this.isLoading = false;
          this.products = res.data.data;
        }).catch((err) =>{
          this.isLoading = false;
          console.log(err);
        });
    },
    addToCart(id, quantity = 1){
      this.status.loadingItem = id;
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product:id,
        quantity,
      }
      this.$http.post(url, cart)
        .then(() => {
        this.status.loadingItem = '';
        Toast.fire({
          title: '已加入購物車',
          icon: 'success',
        });
      }).catch(err =>{
        this.status.loadingItem = '';
        console.log(err.response.data.errors);
        Toast.fire({
          title: `${err.response.data.errors}`,
          icon: 'warning',
        });
      });
    },
  },
};
</script>