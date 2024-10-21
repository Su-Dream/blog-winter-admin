<template>
  <div class="blog_login">
    <div class="login">
      <h2>管理员登录</h2>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item prop="usnm">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="用户名为6-12位字母或数字的组合"
            placement="right"
          >
            <el-input
              v-model="ruleForm.usnm"
              placeholder="请输入账号"
              type="text"
              autocomplete="off"
            />
          </el-tooltip>
        </el-form-item>
        <el-form-item prop="pass">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="密码为6到12位字母或数字的组合"
            placement="right"
          >
            <el-input
              v-model="ruleForm.pass"
              placeholder="请输入密码"
              type="password"
              autocomplete="off"
            />
          </el-tooltip>
        </el-form-item>
        <div class="outher">
          <div class="savePwd">
            <el-radio v-model="savePwd" size="large" :value="true"
              >记住密码</el-radio
            >
          </div>
          <el-link :underline="false" type="primary">Forget Password</el-link>
        </div>
        <el-form-item>
          <el-button
            class="login__btn"
            type="primary"
            @click="submitForm(ruleFormRef)"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
const ruleFormRef = ref();
const savePwd = ref(false);

//* 规则表单
const ruleForm = reactive({
  usnm: "",
  pass: "",
});
//* 详细规则逻辑
const validatePass2 = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("密码不能为空!"));
  }
  callback();
};
const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("账号不能为空!"));
  }
  callback();
};

//* 规则逻辑表单
const rules = reactive({
  usnm: [{ validator: validatePass, trigger: "blur" }],
  pass: [{ validator: validatePass2, trigger: "blur" }],
});
//* 提交操作
const submitForm = formEl => {
  if (!formEl) return;
  formEl.validate(valid => {
    if (valid) {
      // todo:这里继续登录操作,例如发送请求
      console.log("submit!");
    } else {
      console.log("error submit!");
    }
  });
};
</script>

<style scoped>
.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}
.blog_login {
  position: relative;
  margin: 0 auto;
  width: 80%;
  height: 37.5rem;
}
.blog_login .login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  width: 15rem;
}
h2 {
  margin: 20px 0;
  text-align: center;
}
.blog_login .login .outher {
  line-height: 40px;
  display: flex;
  justify-content: space-between;
}
.login__btn {
  width: 100%;
}
</style>
