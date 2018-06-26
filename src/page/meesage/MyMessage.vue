<template>
  <div>
    <message-box v-for="(message, index) in messageList" :item="message" :key="index"></message-box>
  </div>
</template>

<script>
  import messageBox from './MessageBox.vue';
  import * as utils from '../../utils';

  export default {
    props: ['newItem'],
    data() {
      return {
        messageList: [],
        filter: {
          pageNum: 1,
          pageSize: 30,
        },
        totalPage: undefined,
      };
    },
    components: {
      messageBox,
    },
    created() {
      this.loadPage();
    },
    methods: {
      loadPage() {
        utils.getResponse('message/user/', 'get', this.filter).then((res) => {
          this.messageList = res.data.messageList;
          this.totalPage = res.data.totalNum;
        });
      },
    },
    watch: {
      newItem(val) {
        if (val) {
          this.messageList.unshift(val);
        }
      },
    },
  };
</script>
