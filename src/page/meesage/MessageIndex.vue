<template>
  <div>
    <header class="header">
      <div class="content">

      </div>
    </header>
    {{ getName }}
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    computed: {
      ...mapGetters([
        'getName',
        'getSex'
      ]),
    },
    created() {
      console.log(this.getName);
    },
  };
</script>

<style lang="scss" scoped>
  .header {
    background-color: rgba(255,255,255,0.8);
  }

</style>
