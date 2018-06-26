<template>
  <el-dialog title="Create Message" :visible.sync="formVisible" width="70%">
    <el-form :model="form" :rules="rules" ref="createForm">
      <el-form-item label="" prop="content">
        <el-input v-model="form.content" type="textarea" :rows="5" placeholder="message content"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">Send</el-button>
      <el-button @click="close">Cancel</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: ['dialogVisible'],
    data() {
      return {
        formVisible: this.dialogVisible,
        form: {
          content: '',
        },
        rules: {
          content: [
            { required: true, message: 'the content cannot be empty', trigger: 'blur' },
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
      submit() {
        this.$refs.createForm.validate((valid) => {
          if (valid) {
            const data = {
              message: this.form.content,
            };
            this.utils.getResponse('message/add/', 'post', data).then((res) => {
              console.log(res);
              if (res.data.code === 300) {
                this.$router.push({name: 'Index', path: 'index'});
              } else if (res.data.code === 200) {
                this.$notify({
                  title: 'Success',
                  message: 'Create Message Successfully',
                  type: 'success',
                });
                this.$emit('addItem', res.data.item)
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
        });
      },
      close() {
        this.formVisible = false;
      },
      resetForm() {
        this.$refs.createForm.resetFields();
        this.form = {
          content: '',
        };
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>
