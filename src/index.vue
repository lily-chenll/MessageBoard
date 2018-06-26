<template>
  <div class="full-page">
    <router-view></router-view>
  </div>
</template>

<script>
  import * as utils from './utils';
  import { mapActions } from 'vuex';

  export default {
    data () {
      return {
      };
    },
    created() {
      this.loadPage();
    },
    methods: {
      ...mapActions([
        'setUserId',
        'setUserName',
        'setUserSex',
        'setUserBirth',
      ]),
      loadPage() {
        utils.getResponse('user/').then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            this.setUserId(res.data.user.id);
            this.setUserName(res.data.user.name);
            this.setUserSex(res.data.user.gender);
            this.setUserBirth(this.utils.convertToTimestamp(res.data.user.birth * 1000));
            this.$notify({
              title: 'Success',
              message: 'Login Successfully',
              type: 'success'
            });
            this.$router.push({name: 'Homepage', path: 'home'});
          } else {
            this.$router.push({name: 'Index', path: 'index'});
          }
        }).catch((e) => {
          console.log(e);
        });
      }
    },

}
</script>

<style lang="scss">
  @import './scss/basic-style';
</style>
