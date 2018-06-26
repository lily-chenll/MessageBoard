<template>
  <div>
    <header class="header">
      <div class="content">
        <div class="header-content">
          <img src="../../assets/logo.png" class="logo">
          <div class="header-user">
            <img src="../../assets/avatar.png" class="user-profile">
            <el-button type="text" class="create-button" @click="jumpToLogin">Log Out</el-button>
            <div class="seperator"></div>
            <el-button type="text" class="create-button" @click="showCreateModal = true"><i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></el-button>
          </div>
        </div>
      </div>
    </header>
    <create-message :dialogVisible.sync="showCreateModal" @addItem="addMessageList"></create-message>
    <div class="content">
      <el-row>
        <el-col :span="5">
          <el-card class="box-card">
            <div class="head">
              <img :src="userProfile" class="avatar">
            </div>
            <div class="info">
              <el-row class="edit-button">
                <el-button type="text" @click="showUpdateModal = true">Edit</el-button>
              </el-row>
              <ul>
                <li>
                  <label>Name:</label>
                  <span>{{ getName }}</span>
                </li>
                <li>
                  <label>Birth:</label>
                  <span>{{ getBirth | date }}</span>
                </li>
              </ul>
            </div>
            <div class="info">
              <ul>
                <li class="operation">
                  <i class="fa fa-home" aria-hidden="true"></i>
                  <el-button type="text" @click="jumpToHome">Home Page</el-button>
                </li>
                <li class="operation">
                  <i class="fa fa-sticky-note" aria-hidden="true"></i>
                  <el-button type="text" @click="jumpToMessage">Message</el-button>
                </li>
              </ul>
            </div>
          </el-card>
        </el-col>
        <update-user :dialogVisible.sync="showUpdateModal"></update-user>
        <el-col :span="18" class="message-board">
          <router-view :newItem="newMessage"></router-view>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import createMessage from  './modal/CreateMessageModal';
  import updateUser from './modal/UpdateUserModal.vue';

  export default {
    data() {
      return {
        showCreateModal: false,
        showUpdateModal: false,
        newMessage: undefined,
      };
    },
    components: {
      createMessage,
      updateUser,
    },
    computed: {
      ...mapGetters([
        'getName',
        'getSex',
        'getBirth'
      ]),
      userProfile() {
        if (this.getSex === 'female') {
          return require('../../assets/female.png');
        }
        return require('../../assets/male.png');
      },
    },
    methods: {
      jumpToLogin() {
        this.$router.push({ name: 'Index', path: 'index' });
      },
      jumpToHome() {
        this.$router.push({ name: 'Home Index', path: '/home/index' });
      },
      jumpToMessage() {
        this.$router.push({ name: 'My Message', path: '/home/my-message' });
      },
      addMessageList(message) {
        this.newMessage = message;
      },
    },
    mounted() {
      console.log(this.getName);
    },
  };
</script>

<style lang="scss" scoped>
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;

    .logo {
      width: 70px;
      height: 40px;
    }

    .header-user {
      display: inline-flex;
      align-items: center;

      .user-profile {
        width: 22px;
        height: 22px;
        margin-right: 15px;
      }

      .seperator {
        width: 2px;
        height: 30px;
        background-color: #d8bfd8;
        margin: 0 15px ;
      }

      .create-button {
        color: #DC143C;
      }
    }
  }

  .content {
    .box-card {
      margin-top: 20px;
      position: fixed;

      .head {
        width: 100%;
        height: 80px;
        line-height: 80px;
        text-align: center;

        .avatar {
          border-radius: 50%;
          border: 5px solid #ffffff;
          width: 60px;
          height: 60px;
        }
      }

      .info {
        padding-bottom: 15px;
        border-bottom: 1px solid #d3d3d3;

        .edit-button {
          text-align: center;
        }

        ul {
          list-style-type: none;
          padding: 0;
          margin: 0;
          font-size: 15px;
          letter-spacing: 1px;

          li {
            padding-left: 8px;

            label {
              padding-right: 2px;
            }

            .fa {
              color: #409eff
            }
          }

          .operation {
            padding-left: 20px;
          }
        }
      }

      .info:last-child {
        border: none;
        padding-bottom: 0;
      }
    }

    .message-board {
      margin-top: 20px;
      margin-left: 21%;
      height: 100%;
    }
  }

</style>
