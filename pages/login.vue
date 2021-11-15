<template>
  <div class="login-page" :class="[$i18n.locale === 'en' ? 'BgEng' : '']">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-8 col-md-7 col-sm-12 image">
          <img
            v-if="$i18n.locale === 'ar'"
            src="@/assets/imgs/login.png"
            class="img-fluid"
            alt=""
            style="margin-top:102px"
          />
          <img
            v-else-if="$i18n.locale === 'en'"
            src="@/assets/imgs/EngLogin.png"
            class="img-fluid"
            alt=""
            style="margin-top:102px"
          />
        </div>
        <div class="col-lg-3 col-md-5 col-sm-12 loginForm">
          <div class="login-form-container">
            <el-form :model="loginData" ref="loginData" class="loginForm" style="margin-top: 100px">
              <div class="row">
                <div class="col-md-12">
                  <h4 style="font-family: 'Cairo'">{{ $t("auth.Login") }}</h4>
                </div>
                <div class="col-md-12">
                  <h6>{{ $t("auth.Email") }}</h6>
                </div>

                <el-form-item
                  prop="email"
                  :rules="[
                    {
                      required: true,
                      message: $t('auth.ValidateEmail'),
                      trigger: 'blur',
                    },
                    {
                      type: 'email',
                      message: $t('auth.ValidateEmail'),
                      trigger: ['blur', 'change'],
                    },
                  ]"
                >
                  <el-input
                    :placeholder="$t('auth.EmailPlaceholder')"
                    v-model="loginData.email"
                  >
                    <i
                      slot="suffix"
                      v-if="$i18n.locale === 'ar'"
                      class="fas fa-envelope"
                    ></i>
                    <i
                      slot="prefix"
                      v-else-if="$i18n.locale === 'en'"
                      class="fas fa-envelope"
                    ></i>
                  </el-input>
                </el-form-item>
                <div class="col-md-12 ">
                  <h6>{{ $t("auth.Password") }}</h6>
                </div>
                <el-form-item
                  class="mb-0"
                  prop="password"
                  :rules="[
                    {
                      required: true,
                      message: $t('auth.ValidatePassword'),
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    :placeholder="$t('auth.PasswordPlaceholder')"
                    :type="type"
                    v-model="loginData.password"
                  >
                    <i
                      slot="suffix"
                      v-if="$i18n.locale === 'ar'"
                      :class="[
                        showPassword ? 'fas fa-eye-slash' : 'fas fa-eye',
                      ]"
                      @click="togglePassword"
                    ></i>
                    <i
                      slot="prefix"
                      v-else-if="$i18n.locale === 'en'"
                      :class="[
                        showPassword ? 'fas fa-eye-slash' : 'fas fa-eye',
                      ]"
                      @click="togglePassword"
                    ></i>
                  </el-input>
                </el-form-item>
                <div class="col-md-12 p-0">
                  <p
                    :class="[
                      $i18n.locale === 'ar' ? 'float-left' : 'float-right',
                    ]"
                  >
                    <NuxtLink to="/reset-password">
                      {{ $t("auth.Forget") }}
                    </NuxtLink>
                  </p>
                </div>

                <el-form-item>
                  <el-button
                    class="first-btn"
                    type="primary"
                    @click="submitForm('loginData')"
                  >
                    {{ $t("auth.Login") }}
                  </el-button>
                </el-form-item>
              </div>
            </el-form>

            <!-- Validated Login Form -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["loggedIn"],
  data() {
    return {
      loginData: {
        email: "",
        password: "",
      },
      checked: false,
      type: "password",
      showPassword: false,
    };
  },
  methods: {
    async login() {
      const loading = this.$vs.loading();

      try {
        let response = await this.$auth.loginWith("local", {
          data: this.loginData,
        });



        loading.close();



        if(response.data.user && response.data.user.role != 'student'){
          this.$vs.notification({
            progress: "auto",
            color: "#FFF3EA",
            position: "top-center",
            text: this.$i18n.locale == 'ar' ? 'غير مسموح لك بالدخول' : 'You Not Allow To Be Here',
          });
          this.$auth.logout();
          return;
        }



        this.$auth.setUser(response.data.user);
        localStorage.setItem(
          "LMSStudent",
          JSON.stringify(response.data.user)
        );
        // localStorage.setItem("token", res.data.token);
        if (this.$i18n.locale === "en") {
          this.$vs.notification({
            progress: "auto",
            color: "#F28227",
            position: "top-center",
            text: `Welcome Back ${response.data.user.username}`,
          });
        } else {
          this.$vs.notification({
            progress: "auto",
            color: "#F28227",
            position: "top-center",
            text: ` ${response.data.user.username} اهلا وسهلا `,
          });
        }

        if (response.data.user.role === "student") {
          this.$router.push(`/`);
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        loading.close();

        console.log("====error=", err);
        if (this.$i18n.locale === "en") {
          this.$vs.notification({
            progress: "auto",
            color: "#FFF3EA",
            position: "top-center",
            text: `Invalid Email Or Password`,
          });
        } else {
          this.$vs.notification({
            progress: "auto",
            color: "#FA5B5A",
            position: "top-center",
            text: ` البريد الإلكتروني أو كلمة السر خاطئة `,
          });
        }
        // this.$message.error(`Invalid Email Or Password `);
        window.scrollTo({ top: 0, behavior: "smooth" });

      }
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
      if (this.showPassword == true) {
        this.type = "text";
      } else if (this.showPassword == false) {
        this.type = "password";
      }
    },
  },
};
</script>

<style lang="scss">


@import "@/assets/styles/auth.scss";

.login-page .container-fluid .login-form-container .el-input__suffix{

    left: auto !important;
}
</style>
