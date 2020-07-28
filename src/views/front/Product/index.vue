<template>
  <div>
    <loading :active.sync="isLoading">
      <i class="loading-box"></i>
    </loading>
    <div class="container d-flex mt-3">
      <div class="col-md-4">
        <div class="product-img"
          :style="{ backgroundImage: `url(${product.imageUrl})` }"
        ></div>
      </div>
      <div class="pro-content-box col-md-8">
        <div>
          <h4 class="product-tit text-left" id="exampleModalLabel">
            {{ product.title }}
          </h4>
          <div class="mt-3">
            <h5 class="description-sty">描述</h5>
            <p class="mb-2">{{ product.content }}</p>
            <h5 class="description-sty mt-4">其他說明</h5>
            <p>{{ product.description }}</p>
          </div>
        </div>
        <div>
          <div class="product-origin-price text-right pr-2 mb-1">
            NT {{ product.origin_price}} 元
          </div>
          <div class="text-right pr-2 modal-price">
            NT {{ product.price }} 元
          </div>
          <select name class="form-control mt-3" v-model="product.num">
            <option value="0" disabled selected>
              請選擇數量
            </option>
            <option :value="num" v-for="num in 5" :key="num">
              {{ num }} {{ product.unit }}
            </option>
          </select>
        </div>
        <div class="product-footer">
          <div v-if="product.num" class="subtotal-col text-nowrap mr-3">
            小計 <strong>{{ product.num * product.price }}</strong> 元
          </div>
          <div>
            <button
              type="button"
              class="btn addcart-btn"
              :disabled="product.id === status.loadingItem"
              @click="addToCart(product, product.num)"
              >
              <font-awesome-icon :icon="['fa', 'skull']" spin 
              v-if="product.id === status.loadingItem"/>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  data(){
    return{
      product: {},
      isLoading: false,
      status: {
        loadingItem: '',
      },
    };
  },
  created(){
    this.getProduct();
  },
  methods:{
    getProduct(){
      this.isLoading = true;
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/product/${id}`;
      this.$http.get(url)
        .then((res) => {
          this.isLoading = false;
          this.product = res.data.data;
        }).catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    addToCart(){},
  }
};
</script>