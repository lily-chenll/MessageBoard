<template>
  <el-dialog title="Update User" :visible.sync="formVisible" width="70%">
    <el-form :model="form" :rules="rules" ref="updateForm" label-width="135px">
      <el-form-item label="Nickname" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="Confirm Password" prop="checkPass">
        <el-input v-model="form.checkPass" type="password"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">Send</el-button>
      <el-button @click="close">Cancel</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    props: ['dialogVisible'],
    data() {
      return {
        formVisible: this.dialogVisible,
        form: {
          name: '',
          password: '',
          checkPass: '',
        },
        rules: {
          checkPass: [
            { validator: this.validatePass2, trigger: 'blur' },
          ],
        },
      };
    },
    watch: {
      dialogVisible(val) {
        this.formVisible = val;
      },
      formVisible(val) {
        this.$emit('update:dialogVisible', val);
      },
    },
    methods: {
      validatePass2(rule, value, callback) {
        if (this.form.password) {
          if (value === '') {
            callback(new Error('Please input the password again'));
          } else if (value !== this.form.password) {
            callback(new Error('Two inputs don\'t match'));
          }
          callback();
        }
        callback();
      },
      ...mapActions([
        'setUserName',
      ]),
      submit() {
        this.$refs.updateForm.validate((valid) => {
          if (valid) {
            if (this.form.name || this.form.password) {
              const data = {
                name: this.form.name,
                password: this.form.password
              };
              this.utils.getResponse('user/update/', 'post', data).then((res) => {
                console.log(res);
                if (res.data.code === 200) {
                  if (data.name !== '') {
                    this.setUserName(data.name);
                  }
                  this.$notify({
                    title: 'Success',
                    message: 'Update Successfully',
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
                this.close();
                this.resetForm();
              });
            }
          }
        });
      },
      close() {
        this.formVisible = false;
      },
      resetForm() {
        this.$refs.updateForm.resetFields();
        this.form = {
          name: '',
          password: '',
          checkPass: '',
        };
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>
