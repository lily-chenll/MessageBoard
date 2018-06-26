<template>
  <div>
    <el-form :model="form" :rules="rule" ref="registerForm" label-width="135px">
      <el-form-item label="Nick Name" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
    </el-form>
    <div class="form-footer">
      <el-button type="primary" @click="submit">Submit</el-button>
      <el-button @click="cancel">Cancel</el-button>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        form: {
          name: '',
          password: '',
        },
        rule: {
          name: [
            { required: true, message: 'Please input name', trigger: 'blur' },
            { max: 30, message: 'The mx length is 30', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please input the password', trigger: 'blur' },
          ],
        },
      };
    },
    methods: {
      ...mapActions([
        'setUserId',
        'setUserName',
        'setUserSex',
        'setUserBirth',
      ]),
      submit() {
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            const data = {
              name: this.form.name,
              password: this.form.password,
            };
            this.utils.getResponse('user/login/', 'post', data).then((res) => {
              console.log(res);
              if (res.data.code === 200) {
                this.setUserId(res.data.user.userId);
                this.setUserName(res.data.user.userName);
                this.setUserSex(res.data.user.userGender);
                this.setUserBirth(this.utils.convertToTimestamp(res.data.user.userBirth * 1000));
                this.$notify({
                title: 'Success',
                message: 'Login Successfully',
                type: 'success'
              });
              this.$router.push({name: 'Homepage', path: 'home'});
              } else {
                this.$notify.error({
                  title: 'Error',
                  message: res.data.message,
                });
              }
            }).catch((e) => {
              console.log(e);
            });
          }
        });
      },
      cancel() {
        this.$refs.registerForm.resetFields();
      },
    },
  };
</script>

<style scoped>
  .form-footer {
    text-align: center;
  }
</style>
