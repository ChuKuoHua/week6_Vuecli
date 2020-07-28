<template>
  <div>
    <loading :active.sync="isLoading">
      <i class="loading-box"></i>
    </loading>
    <div class="col-md-9 ml-sm-auto col-lg-10 px-4">
      <div class="text-left mr-2 mt-2 pt-2e">
        <button class="btn btn-add" @click="openModal('new')">
          建立新產品
        </button>
      </div>
      <table class="table table-striped mt-2">
        <thead class="thead-col font-weight-bold">
          <tr class="text-left">
            <th width="130">
            分類
            </th>
            <th>產品名稱</th>
            <th width="130">
            原價
            </th>
            <th width="130">
            售價
            </th>
            <th width="100">
            是否啟用
            </th>
            <th width="130" class="text-center">
            編輯
            </th>
          </tr>
        </thead>
        <tbody class="flex text-left">
          <tr v-for="(item) in products" :key="item.index">
            <td>{{item.category}}</td>
            <td>{{item.title}}</td>
            <td>{{item.origin_price}}</td>
            <td>{{item.price}}</td>
            <td>
              <span v-if="item.enabled" class="text-success">啟用</span>
              <span v-else class="text-secondary">未啟用</span>
            </td>
            <td class="text-center">
              <button class="btn btn-outline-primary btn-sm mr-2" @click="openModal('edit',item)">
                <font-awesome-icon :icon="['fa', 'edit']" />
              </button>
              <button class="btn btn-outline-danger btn-sm" @click="openModal('delete',item)">
                <font-awesome-icon :icon="['fa', 'trash']" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BackProducts',
  props: ['token'],
  data() {
    return {
      products: [],
      pagination: {},
      status:{
        fileUploading: false,
      },
      tempProduct: {
        imageUrl: [],
      },
      isNew: false,
      isLoading: false,
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      // API
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/products`;
      this.$http.get(api).then((response) => {
        console.log(response);
        this.products = response.data.data;
      });
    },
    // 開啟 Modal 視窗
    openModal() {},
    getPorduct() {},
    updateProduct() {},
    uploadFile() {},
    delProduct() {},
  },
  
};
</script>