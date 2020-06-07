<template>
  <div class="navbar">
    <el-row>
      <el-col :span="5">
        <div class="logoInfo">
          <span class="logo"></span>
          <span class="name">营养食谱管理系统</span>
        </div>
      </el-col>
      <el-col :span="19">
        <el-menu mode="horizontal" :default-active="activeIndex" @select="routerChange">
          <el-menu-item
            v-for="(item, index) in menuList"
            :key="index"
            :index="item.index"
            :class="[activeIndex == index ? 'actived' : '']"
          >{{item.title}}</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "navbar",
  methods: {
    routerChange(key, path) {//路由选择，跳转相应界面
      switch (key) {
        case "0":
          this.$router.push({ path: "/dishManagement" }).catch(err => {});
          break;
        case "1":
          this.$router
            .push({ path: "/ingredientsManagement" })
            .catch(err => {});
          break;
        case "2":
          this.$router.push({ path: "/nutritionDemand" }).catch(err => {});
          break;
        case "3":
          this.$router.push({ path: "/nutritionReference" }).catch(err => {});
          break;
        case "4":
          this.$router.push({ path: "/nutritionKnowledge" }).catch(err => {});
          break;
        case "5":
          this.$router.push({ path: "/foodConflict" }).catch(err => {});
          break;
        case "6":
          this.$router.push({ path: "/login" }).catch(err => {});
          break;
      }
    }
  },
  data() {
    return {
      menuList: [
        {
          index: "0",
          title: "菜品管理"
        },
        {
          index: "1",
          title: "食材管理"
        },
        {
          index: "2",
          title: "营养需求表"
        },
        {
          index: "3",
          title: "营养参考"
        },
        {
          index: "4",
          title: "营养小知识"
        },
        {
          index: "5",
          title: "食物冲突"
        },
        {
          index: "6",
          title: "退出登录"
        }
      ],
      activeIndex: "0"
    };
  },
  mounted() {
    this.activeIndex = this.menuList.filter(ele => {
      return ele.title == this.$route.meta.title;
    })[0].index;
  }
};
</script>

<style lang="scss">
.navbar {
  &::after {
    clear: both;
    content: "";
    display: block;
  }
  .logoInfo {
    background-color: #1891ff;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .logo {
      width: 50px;
      height: 50px;
      background-image: url("../assets/logo.png");
      background-size: cover;
      display: inline-block;
      margin: 0 10px;
    }
    .name {
      color: #ffffff;
      font-size: 24px;
    }
  }
  .el-menu {
    background-color: #1891ff;
    .el-menu-item {
      color: #ffffff !important;
      font-size: 18px;
      &:hover {
        background-color: #1891ff;
      }
      &:focus {
        background-color: #1891ff;
        border-bottom: 2px solid #ff9900;
      }
    }
    .actived {
      border-bottom: 2px solid #ff9900;
    }
  }
}
</style>