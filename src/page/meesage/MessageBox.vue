<template>
  <el-card class="box-card" v-if="item">
    <div class="message-header">
      <div class="user-info">
        <img :src="avatar" class="user-avatar">
        <span> {{ item.sender.name }} </span>
      </div>
      <div class="time">
        {{ createTime | datetime }}
      </div>
    </div>
    <div class="message-content">{{ item.content }}</div>
    <div class="message-footer">
      <el-button v-if="getId === item.sender.userId" type="text" @click="deleteItem">Delete</el-button>
      <el-button type="text" @click="showComment = !showComment">Comment</el-button>
    </div>
    <transition name="comment" v-if="showComment">
      <div>
        <el-form :model="form" :rules="rules" ref="commentForm">
          <el-form-item label="" prop="content">
            <el-input v-model="form.content" type="textarea" :rows="2" placeholder="your comment"></el-input>
          </el-form-item>
        </el-form>
        <div class="comment-button">
          <el-button type="primary" @click="submit" size="small">Submit</el-button>
        </div>
        <ul class="comment-list">
          <li v-for="(item, index) in commentList" :key="index">
            <el-row>
              <el-col :span="22">
                <span class="sender-name">{{ item.sender.name }}:</span> {{ item.content }}
              </el-col>
              <el-col :span="2" v-if="item.sender.userId === getId">
                <el-button type="text" @click="deleteComment(item.commentId, index)" size="small">delete</el-button>
              </el-col>
            </el-row>
          </li>
        </ul>
      </div>
    </transition>
  </el-card>
</template>

<script>
  import {mapGetters} from 'vuex';
  import * as utils from '../../utils';


  export default {
    props: ['item', 'index'],
    data() {
      return {
        showComment: false,
        myComment: '',
        form: {
          content: '',
        },
        rules: {
          content: [
            { required: true, message: 'the content cannot be empty', trigger: 'blur' },
          ],
        },
        commentList: [],
      };
    },
    mounted() {
      this.loadComment();
    },
    computed: {
      avatar() {
        if (this.item) {
          return this.item.sender.gender === 'male' ? require('../../assets/male.png') : require('../../assets/female.png');
        }
        return '';
      },
      createTime() {
        if (this.item) {
          return this.item.createTime * 1000;
        }
      },
      ...mapGetters([
        'getId',
      ]),
    },
    methods: {
      deleteItem() {
        const data = {
          messageId: this.item.messageId,
        };
        utils.getResponse('message/delete/', 'get', data).then((res) => {
          if (res.data.code === 200) {
            this.$emit('delete', this.index);
            this.$notify({
              title: 'Success',
              message: 'Delete message Successfully',
              type: 'success',
            });
          } else if (res.data.code === 300) {
            this.$router.push({name: 'Index', path: 'index'});
          } else {
            this.$notify({
              title: 'Error',
              message: res.data.message,
            });
          }
        });
      },
      deleteComment(id, index) {
        const data = {
          commentId: id,
        };
        utils.getResponse('comment/delete/', 'get', data).then((res) => {
          if (res.data.code === 200) {
            this.commentList.splice(index, 1);
            this.$notify({
              title: 'Success',
              message: 'Delete message Successfully',
              type: 'success',
            });
          } else if (res.data.code === 300) {
            this.$router.push({name: 'Index', path: 'index'});
          } else {
            this.$notify({
              title: 'Error',
              message: res.data.message,
            });
          }
        });
      },
      submit() {
        this.$refs.commentForm.validate((valid) => {
          console.log(valid);
          if (valid) {
            const data = {
              comment: this.form.content,
              messageId: this.item.messageId,
              receiverId: this.item.sender.userId,
            };
            utils.getResponse('comment/add/', 'post', data).then((res) => {
              console.log(res);
              if (res.data.code === 200) {
                this.$notify({
                  title: 'Success',
                  message: 'add comment successfully',
                  type: 'success',
                });
                this.form.content = '';
                this.commentList.unshift(res.data.item);
              } else if (res.data.code === 300) {
                this.$router.push({name: 'Index', path: 'index'});
              } else {
                this.$notify({
                  title: 'Error',
                  message: res.data.message,
                });
              }
            });
          }
        });
      },
      loadComment() {
        const data = {
          messageId: this.item.messageId,
        };
        console.log(this.item.messageId);
        utils.getResponse('comment/', 'get', data).then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            this.commentList = res.data.commentList;
          } else if (res.data.code === 300) {
            this.$router.push({name: 'Index', path: 'index'});
          } else {
            this.$notify({
              title: 'Error',
              message: res.data.message,
            });
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .box-card {
    width: 780px;
    margin-bottom: 20px;

    .message-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;

      .user-info {
        display: inline-flex;
        align-items: center;
      }

      .user-avatar {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        margin-right: 20px;
      }

      .time {
        text-align: right;
      }
    }

    .message-footer {
      text-align: right;
    }

    .comment-enter-active, .comment-leave-active {
      transition: opacity .5s;
    }

    .comment-enter, .comment-leave {
      opacity: 0;
    }

    .comment-button {
      text-align: right;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .comment-list {
      list-style-type: none;
      padding: 0;
      margin: 0;

      li {
        margin: 0;
        padding-top: 10px;
        padding-bottom: 10px;
        border-top: 1px solid #d3d3d3;

        .sender-name {
          color: #DC143C;
        }
      }
    }
  }
</style>
