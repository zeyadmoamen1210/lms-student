
<template>
  <div>
    <template v-if="$auth && $auth.loggedIn">
      <Sidebar @collapse="updateCollapse" />
      <!-- <Navbar @isCollapse="collapseVal" /> -->
    </template>

    <Loading v-if="isLoading" />
    <div
      :class="{
        'main-content': true,
        'collapsed-arabic':
          !isCollapsed && $auth.loggedIn && $i18n.locale == 'ar',
        'collapsed-english':
          !isCollapsed && $auth.loggedIn && $i18n.locale == 'en',
      }"
      v-else
    >
      <Nuxt
        :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
        :class="[$store.state.lang == 'ar' ? 'arabicFont' : 'engFont']"
      />
    </div>
  </div>
</template>


<script>
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Loading from "@/components/loading";
export default {
  components: {
    Sidebar,
    Navbar,
    Loading,
  },
  data() {
    return {
      isLoading: true,
      isCollapsed: "",
    };
  },

  mounted() {
    if (this.$auth.loggedIn && localStorage.getItem("eduPulseDashboardUser")) {
      this.$auth.setUser(
        JSON.parse(localStorage.getItem("eduPulseDashboardUser"))
      );
    }else{
      this.getMe()
    }

    if (document.children) {
      if (this.$i18n.locale == "ar") {
        this.$moment.locale("ar");
        console.log("arabic ");
        var all = document.getElementsByTagName("*");
        var i;
        for (i = 0; i < all.length; i++) {
          console.log("child ", all[i]);
          all[i].style.direction = "rtl";
          all[i].style.textAlign = "right";
        }
      } else {
        this.$moment.locale("en");
        console.log("english ");
        var all = document.getElementsByTagName("*");
        var i;
        for (i = 0; i < all.length; i++) {
          console.log("child ", all[i]);
          all[i].style.direction = "ltr";
          all[i].style.textAlign = "left";
        }
      }
    }

    setTimeout(() => {
      this.isLoading = false;
    }, 5000);
  },
  methods: {
    updateCollapse(e) {
      this.isCollapsed = e;
      console.log("its exist");
    },
    getMe() {
      this.$axios.get("/profile").then((res) => {
        this.user = res.data;
        this.$auth.setUser(res.data);
        console.log("user===hello", Object.keys(this.$auth.user));
      });
    },
  },
};
</script>

<style lang="scss">

@font-face {
  font-family: 'Cairo';
  src: url('@/assets/fonts/fonts/Cairo/Cairo-Regular.ttf');
}
@font-face {
  font-family: 'CairoSemiBold';
  src: url('@/assets/fonts/fonts/Cairo/Cairo-SemiBold.ttf');
}
@font-face {
  font-family: 'CairoBold';
  src: url('@/assets/fonts/fonts/Cairo/Cairo-Bold.ttf');
}

@import "../assets/styles/override.scss";

.main-content.isInLogin {
  margin-right: 0 !important;
}

.main-content.collapsed-english {
  margin-left: 267px;
}

.main-content.collapsed-arabic {
  margin-right: 267px;
}

.main-content.not-collapsed {
  margin-right: 267px;
}

* {
  padding: 0;
  margin: 0;
  // direction: rtl;
  // text-align: right;
}

.el-row {
  width: 100%;
}
.form-button {
  display: block;
  width: 100%;
  margin-top: 15px;
}

.star-container {
  padding: 7px 5px 10px;
  background: #fff;
  border: 1px solid #ece8e8;
}

.table-container {
  margin: 10px 2px;
  border: 1px solid #ece8e8;
}
.el-dialog__body {
  padding-bottom: 1px !important;
}
.main-content {
  transition: all 0.25s ease;
  background: #f9f9f959;
  min-height: 96vh;
  padding-top: 30px;
  .main-frame {
    margin: 15px;
    min-height: 96vh;
    background: #fff;
    box-shadow: 0 -1px 10px 0 #0000001a;
    border-radius: 11px;
  }
}

.el-notification {
  direction: ltr;
  text-align: left;
  font-family: 'Cairo';
  padding: 0 !important;
  .el-icon-close {
    left: auto !important;
    right: 10px !important;
  }
  .el-notification__icon {
    margin-top: 25px !important;
    margin-left: 20px;
  }
  .el-notification__content {
    padding-bottom: 15px;
  }
  .el-notification__title {
    padding-top: 15px;
  }
}

.el-button + .el-button {
  margin: 0 !important;
}

@media (max-width: 768px) {
  .el-menu--collapse {
    display: none !important;
  }
  .main-content {
    padding-left: 0 !important;
  }

  .read-question .question-structure{
    flex-wrap: wrap !important;
  }

}



</style>
