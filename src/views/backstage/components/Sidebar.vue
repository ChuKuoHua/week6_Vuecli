<template>
  <div>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar pt-5e">
      <div class="mt-3">
        <h6 class="sidebar-tit">管理員</h6>
        <ul class="sidebar-menu">
          <li 
          v-for="item in sidebarList"
          :key="item.id"
          :to="item.router"
          @click="addActive(item.id)">
            <router-link :to="item.router"
            :class="{ active: active === item.id }"
            >
              <font-awesome-icon :icon="['fa', `${item.icon}`]"/>
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
    data(){
      return{
        active: '',
        sidebarList :[
          {
            id: 1,
            name: '產品列表', 
            router: '/admin/products',
            icon: 'boxes',
          },
          {
            id: 2,
            name: '購物車列表', 
            router: '/admin/orders',
            icon: 'stream',
          },
          {
            id: 3,
            name: '優惠券', 
            router: '/admin/coupons',
            icon: 'percent',
          },
          {
            id: 4,
            name: '圖片儲存列表', 
            router: '/admin/pictures',
            icon: 'images',
          }
        ]
      };
    },
  methods: {
    addActive(key) {
      this.active = key
    },
  },
}
</script>
