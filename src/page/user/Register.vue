<template>
  <div>
    <el-form :model="form" status-icon :rules="rule" ref="registerForm" label-width="135px">
      <el-form-item label="Nick Name" prop="name">
        <el-input v-model="form.name" v-loading="loadName"></el-input>
      </el-form-item>
      <el-form-item label="Birth Date" prop="birth">
        <el-date-picker type="date" palceholder="Pick your birth date" v-model="form.birth" style="width: 100%" :picker-options="pickerDate"></el-date-picker>
      </el-form-item>
      <el-form-item label="Gender" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio label="female">Female</el-radio>
          <el-radio label="male">Male</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="Confirm Password" prop="checkPass">
        <el-input v-model="form.checkPass" type="password"></el-input>
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
        loadName: false,
        form: {
          name: '',
          birth: '',
          gender: '',
          password: '',
          checkPass: '',
        },
        pickerDate: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        rule: {
          name: [
            { max: 30, message: 'The max length is 30', trigger: 'blur' },
            { validator: this.validateName, trigger: 'blur' },
          ],
          birth: [
            { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' },
          ],
          gender: [
            { required: true, message: 'Please select your gender', trigger: 'change' },
          ],
          password: [
            { validator: this.validatePass, trigger: 'blur' },
          ],
          checkPass: [
            { validator: this.validatePass2, trigger: 'blur' },
          ],
        },
      };
    },
    methods: {
      validateName(rule, value, callback) {
        if (value === '') {
          callback(new Error('Please input the name'));
        } else {
          if (value.length > 30) {
            callback(new Error('The max length is 30'));
          }
          this.loadName = true;
          this.utils.getResponse('user/verify-name/', 'get', {name: value}).then((res) => {
            console.log(res);
            this.loadName = false;
            if (res.data.code === 200) {
              callback();
            } else {
              callback(new Error(res.data.message));
            }
          });
        }
      },
      validatePass(rule, value, callback) {
        if (value === '') {
          callback(new Error('Please input the password'));
        } else {
          callback();
        }
      },
      validatePass2(rule, value, callback) {
        if (value === '') {
          callback(new Error('Please input the password again'));
        } else if (value !== this.form.password) {
          callback(new Error('Two inputs don\'t match'));
        }
        callback();
      },
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
              birthSecond: this.utils.convertToTimestamp(this.form.birth) / 1000,
              gender: this.form.gender,
            };
            this.utils.getResponse('user/register/', 'post', data).then((res) => {
              console.log(res);
              if (res.data.code === 200) {
                this.setUserId(res.data.user.userId);
                this.setUserName(this.form.name);
                this.setUserSex(this.form.gender);
                this.setUserBirth(this.utils.convertToTimestamp(this.form.birth));
                this.$notify({
                  title: 'Success',
                  message: 'Register Successfully',
                  type: 'success',
                });
                this.$router.push({name: 'Homepage', path: 'home'});
              } else {
                this.$notify({
                  title: 'Error',
                  message: res.data.message,
                });
              }
            }).catch((error) => {
              this.$notify.error({
                title: 'Error',
                message: error,
              });
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
