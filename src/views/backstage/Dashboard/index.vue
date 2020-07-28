<template>
  <div>
    <loading :active.sync="isLoading">
      <i class="loading-box"></i>
    </loading>
    <Navbar />
    <div class="container">
      <Sidebar />
      <router-view :token="token" v-if="checkSuccess"></router-view>
    </div>
  </div>
</template>
<script>
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';
export default {
  name: 'BackDashboard',
  components:{
    Navbar,
    Sidebar,
  },
  data(){
    return {
      tokrn: '',
      isLoading: false,
      checkSuccess: false,
    };
  },
  created(){
    this.checkLogin();
  },
  methods:{
    checkLogin(){
      this.isLoading = true;
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');

      // Axios 預設值
      this.$http.defaults.headers['Authorization'] = `Bearer ${this.token}`;
      const api = `${process.env.VUE_APP_APIPATH}/auth/check`;

      this.$http.post(api, {'api_token':this.token})
      .then((res) => {
        // 登入成功
        console.log(res);
        if(res.data.success){
          this.isLoading = false;
          this.checkSuccess = true;
        }
      }).catch((err) => {
        // 驗證失敗，轉回登入頁
        this.isLoading = false;
        console.log(err);
        this.$router.push('/login');
      });
    },
  },
};
</script>
