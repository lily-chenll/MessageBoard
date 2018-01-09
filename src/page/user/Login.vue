<template>
  <div class="content">
    <h3>Log in</h3>
    <el-form :model="form" status-icon :rules="rule" ref="registerForm" label-width="135px">
      <el-form-item label="Nick Name" prop="name">
        <el-input v-model="form.name"></el-input>
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
  export default {
    data() {
      return {
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
            { required: true, message: 'Please input name', trigger: 'blur' },
            { max: 30, message: 'The mx length is 30', trigger: 'blur' }
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
      validatePass(rule, value, callback) {
        if (value === '') {
          callback(new Error('Please input the password'));
        } else {
          if (this.form.checkPass !== '') {
            this.$refs.registerForm.validateField('checkPass');
          }
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
      submit() {
        this.$refs.registerForm.validate((valid) => {
          console.log(this.utils.convertToTimestamp(this.form.birth),);
          if (valid) {
            const data = {
              name: this.form.name,
              password: this.form.password,
              birthSecond: this.utils.convertToTimestamp(this.form.birth) / 1000,
              gender: this.form.gender,
            };
            this.utils.getResponse('user/register/', 'post', data).then((res) => {
              console.log(res);
              this.$notify({
                title: 'Success',
                message: 'Register Successfully',
                type: 'success'
              });
              this.$router.push({name: 'Homepage', path: 'home'});
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

<style lang="scss" scoped>
  .content {
    margin: 150px auto 0 auto;
    padding: 10px;
    width: 800px;
    border: 1px solid #d3d3d3;
    z-index: 100;

    h3 {
      width: 140px;
      text-align: right;
    }

    .form-footer {
      text-align: center;
    }
  }
</style>
