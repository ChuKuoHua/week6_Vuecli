<template>
  <div class="login-box">
    <div class="login-group">
      <div class="container">
        <form class="form-signin d-flex flex-column" @submit.prevent="signin">
          <div class="d-flex justify-content-between mb-3">
            <h1 class="h3 ml-2 font-weight-normal">
              會員登入
            </h1>
            <router-link to="/"
            class="btn login-home-btn">
              <font-awesome-icon :icon="['fa', 'home']" size="lg"/>
            </router-link>
          </div>
          <div class="form-group form-box">
            <label for="inputEmail" class="mb-2">帳號</label>
            <input id="inputEmail" v-model="user.email" type="email" class="form-control" placeholder="Email"
            required autofocus>
          </div>
          <div class="form-group form-box">
            <label for="inputPassword" class="mb-2">密碼</label>
            <input id="inputPassword" v-model="user.password" type="password" class="form-control"
            placeholder="Password" required>
          </div>
          <button class="btn btn-block login-btn" type="submit">
            登入
          </button>           
        </form>
      </div>
    </div>    
  </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return{
      user:{
        email: '',
        password: '',
      },
      token:'',
    };
  },
  methods:{
    signin(){
      const api = `${process.env.VUE_APP_APIPATH}/auth/login`;
      this.$http.post(api, this.user)
        .then((res) => {
          const { token } = res.data;
          const { expired } = res.data;
          // 寫入 cookie token
          // expires 設置有效時間
          document.cookie = `hexToken=${token}; expires=${new Date(expired * 1000)};`;
          this.$router.push('/admin/Products');
        }).catch((err) =>{
          console.log(err);
        });
    },
    signout() {
      document.cookie = 'hexToken=;expires=;';
      console.log('token 已清除');
    },
  },
};
</script>