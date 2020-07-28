<template>
  <div class="container">
    <loading :active.sync="isLoading">
      <i class="loading-box"></i>
    </loading>
    <div v-if="carts.length > 0">
      <div class="mb-2 cart-flex">
        <h4>購物車</h4>
      </div>
      <table class="cart-table">
        <thead>
          <th>刪除</th>
          <th>商品</th>
          <th width="150px" class="text-center">
            數量
          </th>
          <th class="text-right">單位</th>
          <th class="text-right">單價</th>
        </thead>
        <tbody class="border-y">
          <tr v-for="item in carts" :key="item.product.id +1">
            <td>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="removeCartItem(item.product.id)"
              >
                <font-awesome-icon :icon="['fa', 'trash']"/>
              </button>
            </td>
            <td >
              {{ item.product.title }}
            </td>
            <td class="produce-num-td">
              <div class="produce-num-group d-flex">
                <div class="num-btnbox">
                  <font-awesome-icon :icon="['fa', 'skull']"
                  spin
                  v-if="item.id === status.loadingItem"/>
                  <button
                    class="less-btn"
                    @click="quantityUpdata(item.product.id, item.quantity - 1)"
                    :disabled="item.quantity === 1 || status.loadingUpdateCart === item.product.id"
                  >
                    <font-awesome-icon :icon="['fa', 'skull']"
                    spin
                    v-if="status.loadingUpdateCart === item.product.id"/>
                    <span v-else>-</span>
                  </button>
                </div>
                <input
                  id="inlineFormInputGroupUsername"
                  type="number"
                  class="form-control text-center numbox"
                  :value="item.quantity"
                  @keyup.enter="quantityUpdata(item.product.id, $event.target.value)"
                />
                <div class="num-btnbox">
                  <button
                    class="add-btn"
                    @click="quantityUpdata(item.product.id, item.quantity + 1)"
                    :disabled="item.quantity === 5 || status.loadingUpdateCart === item.product.id"
                  >
                    <font-awesome-icon :icon="['fa', 'skull']"
                    spin
                    v-if="status.loadingUpdateCart === item.product.id"/>
                    <span v-else>+</span>
                  </button>
                </div>
              </div>
            </td>
            <td class="text-right">
              {{ item.product.unit }}
            </td>
            <td class="text-right">
              {{ item.product.price }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" class="text-right">
                <button
                type="button"
                class="btn btn-outline-danger btn-sm float-left"
                @click="removeAllCartItem()"
              >
                <font-awesome-icon :icon="['fa', 'trash']" class="mr-2"/>刪除所有品項
              </button>
              <span>總計</span>
            </td>
            <td class="text-right">
              {{ cartTotal }}
            </td>
          </tr>
        </tfoot>
      </table>
      <div class="payment-box">
        <router-link 
          to="/checkout"
          class="btn checkout-btn btn-block"
        >
          結帳去
        </router-link>
      </div>
    </div>
    <div class="no-shop" v-else>
      <h4>尚未選擇商品</h4>
    </div>
  </div>
</template>

<script>
import Toast from '../../../components/alert/Toast';
export default {
  name:'Cart',
  data(){
    return{
      isLoading: false,
      carts:{},
      cartTotal: 0,
      status:{
        loadingItem: '',
        loadingUpdateCart: '',
      },
    };
  },
  created(){
    this.getCart();
  },
  methods:{
    getCart(){
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;
      this.$http.get(url)
        .then((res) =>{
          this.isLoading = false;
          this.carts = res.data.data;          
          this.updateTotal();
        }).catch((err) => {
          this.isLoading = false; 
          console.log(err); 
        });
    },
    updateTotal(){
      let total = 0;
      this.carts.forEach((item) =>{
        total += item.product.price * item.quantity;        
      });
      this.cartTotal = total;
    },
    quantityUpdata(id, num){
      this.status.loadingUpdateCart = id;
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;
      const data = {
        product: id,
        quantity: num,
      };
      this.$http.patch(url, data)
        .then(() =>{
          this.status.loadingUpdateCart = '';
          this.getCart();
        }).catch((err) => {
          console.log(err);
        });
    },
    removeCartItem(id){
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping/${id}`;
      this.$http.delete(url)
        .then(() => {
          this.isLoading = false;
          this.getCart();
          Toast.fire({
            title: '商品已刪除',
            icon: 'success',
          });
        })
        .catch(err => {
          console.log(err);
          Toast.fire({
            title: '商品刪除失敗',
            icon: 'error',
          });
        });
    },
    removeAllCartItem(){
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping/all/product`;
      this.$http.delete(url)
        .then(() => {
          this.isLoading = false;
          this.getCart();
          this.cartTotal = 0;
          Toast.fire({
            title: '商品已全部刪除',
            icon: 'success',
          });
        }).catch(err => {
          console.log(err);
          Toast.fire({
            title: '商品刪除失敗',
            icon: 'error',
          });
        });
    },
  }
};
</script>