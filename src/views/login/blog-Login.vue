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
        class="blog-ruleForm"
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
        <div class="other">
          <div class="savePwd">
            <el-checkbox v-model="savePwd" label="记住密码" size="large" />
          </div>
          <el-link :underline="false" type="primary">Forget Password</el-link>
        </div>
        <el-form-item>
          <el-button
            class="login-submit"
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
import { reactive, ref, onMounted } from "vue";
import { setUserCookie, getUserCookie, clearUserCookie } from "@/utils/auth.js";
import { ElMessage } from "element-plus";
import { useAuthStore } from "@/stores/user.js";
import router from "@/routes";
import userApi from "@/apis/users.js";
import { useProfileStore } from "../../stores/profile";
onMounted(() => {
  getCookieForm();
});
const getCookieForm = () => {
  const { username, password } = getUserCookie();
  if (username && password) {
    ruleForm.usnm = username;
    ruleForm.pass = password;
    savePwd.value = true;
  }
};
//* 规则表单
const ruleFormRef = ref();
const savePwd = ref(false);
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
//* 登录逻辑
const submitHandler = async () => {
  const userStore = useAuthStore();
  const profileStore = useProfileStore();

  // 保存密码操作
  if (savePwd.value) {
    setUserCookie(ruleForm.usnm, ruleForm.pass, 7); // 记住密码
  } else {
    clearUserCookie();
  }
  // 发送请求拿到用户信息
  // 构建用户信息
  const userInfo = {
    username: ruleForm.usnm,
    password: ruleForm.pass,
  };
  // 发送请求拿到结果
  try {
    const result = await userApi.login(userInfo);
    const { token } = result.data;
    userStore.setToken(token);
    const profile = await userApi.getUserInfo();
    profileStore.setProfile(profile.data.rows);
    console.log("状态已保存", profileStore.profile);
    ElMessage({
      message: "登录成功!正在跳转页面...",
      type: "success",
    });
  } catch (error) {
    if (error.response) {
      // 提取服务器返回的错误信息
      ElMessage({
        message: error.response.data.message || "登录失败，服务器无返回信息",
        type: "error",
      });
    } else {
      // 处理非响应错误
      ElMessage({
        message: error.message || "网络异常，请稍后再试",
        type: "error",
      });
    }
  }
  router.push("/home");
};
//* 提交操作
const submitForm = formEl => {
  console.log(formEl);

  if (!formEl) return;
  formEl.validate(valid => {
    if (valid) {
      //? 登录逻辑
      submitHandler();
    } else {
      ElMessage({
        message: "登录失败,请检查表单信息",
        type: "error",
      });
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
  width: 100%;
  max-width: 20rem;
}

.blog_login .login .blog-ruleForm {
  margin: 0 auto;
}

h2 {
  margin: 0 0 40px;
  text-align: center;
}

.blog_login .login .other {
  line-height: 40px;
  display: flex;
  justify-content: space-between;
}

.login-submit {
  width: 100%;
}
</style>
