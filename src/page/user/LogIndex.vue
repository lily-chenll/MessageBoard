<template>
  <div class="index-c">
    <el-tabs type="border-card" @tab-click="jump" :value="currentTab">
      <el-tab-pane label="Log In" key="Log In" name="Log In">
        <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane label="Register" key="Register" name="Register">
        <router-view></router-view>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentTab: 'Log In'
      };
    },
    created() {
      this.$router.push('/index/login');
    },
    methods: {

      jump(tab) {
        console.log(tab);
        if (tab.label === 'Log In') {
          this.$router.push('/index/login');
        } else if (tab.label === 'Register') {
          this.$router.push('/index/register');
        }
      },
    },
  };
</script>

<style scoped lang="scss">
  .index-c {
    margin: 150px auto 0 auto;
    padding: 10px;
    width: 800px;

    .tab-label {
      font-size: 0px;
    }
  }
</style>
