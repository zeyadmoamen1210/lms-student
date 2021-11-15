<template>
  <div class="sidebar">
    <vs-sidebar
      class="web-sidebar"
      :right="$i18n.locale == 'ar'"
      open
      style="line-height: 1.9"
      v-model="active"
      :reduce="false"
    >
      <template #logo>
        <span class="iconBook"> <i class="fas fa-book-reader"></i></span>
      </template>


      <vs-sidebar-item
        v-if="$auth.loggedIn"
        id="allSubjects"
        :to="`/`"
      >
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            style="enable-background: new 0 0 512 512"
            xml:space="preserve"
          >
            <g>
              <g>
                <path
                  d="M439.481,183.132V75.29h-89.184v39.234l-94.298-72.542L0,238.919l53.634,69.718l26.261-20.202v181.583h151.519V336.973    h55.151v133.045h145.543V288.435l26.261,20.202L512,238.92L439.481,183.132z M402.072,439.983h-85.473V306.938H201.378v133.045    h-91.449V265.329L256,152.965l146.071,112.364V439.983z M452.875,266.518L256,115.064L59.125,266.518l-17.006-22.106L256,79.876    l124.333,95.648v-70.199h29.114v92.596l60.433,46.491L452.875,266.518z"
                />
              </g>
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
          </svg>
        </template>
        {{ $i18n.locale == "ar" ? "المواد" : "Subjects" }}
      </vs-sidebar-item>



      <vs-sidebar-item
        v-if="$auth.loggedIn"
        id="profile"
        :to="`/profile`"
      >
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            style="enable-background: new 0 0 512 512"
            xml:space="preserve"
          >
            <g>
              <g>
                <path
                  d="M439.481,183.132V75.29h-89.184v39.234l-94.298-72.542L0,238.919l53.634,69.718l26.261-20.202v181.583h151.519V336.973    h55.151v133.045h145.543V288.435l26.261,20.202L512,238.92L439.481,183.132z M402.072,439.983h-85.473V306.938H201.378v133.045    h-91.449V265.329L256,152.965l146.071,112.364V439.983z M452.875,266.518L256,115.064L59.125,266.518l-17.006-22.106L256,79.876    l124.333,95.648v-70.199h29.114v92.596l60.433,46.491L452.875,266.518z"
                />
              </g>
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
          </svg>
        </template>
        {{ $i18n.locale == "ar" ? "تعديل الحساب" : "Profile" }}
      </vs-sidebar-item>



      <template #footer>
        <vs-row justify="space-between">
          <vs-avatar
            @click.native="changeLocale('ar')"
            v-if="$i18n.locale !== 'ar'"
          >
            <img
              style="width: 20px; margin: 0 5px"
              src="@/assets/imgs/united-arab-emirates.svg"
              alt=""
            />
            AR
          </vs-avatar>

          <vs-avatar
            @click.native="changeLocale('en')"
            v-else-if="$i18n.locale !== 'en'"
          >
            EN
            <img
              style="width: 20px; margin: 0 5px"
              src="@/assets/imgs/united-kingdom.svg"
              alt=""
            />
          </vs-avatar>

          <vs-avatar
            badge-color="danger"
            @click.native="logout()"
            badge-position="top-right"
          >
            <span class="iconBook"><i class="fas fa-sign-out-alt"></i></span>
          </vs-avatar>
        </vs-row>
      </template>
    </vs-sidebar>

    <button
      class="toggleMobileSidebar mx-3 mt-5"
      @click="activeMobile = !activeMobile"
    >
      <i class="fas fa-bars"></i>
    </button>

    <vs-sidebar
      class="mobile-sidebar"
      :right="$i18n.locale == 'ar'"
      :open.sync="activeMobile"
      v-model="active"
    >
      <button
        class="toggleMobileSidebar mx-5 mt-5 mb-5"
        @click="activeMobile = !activeMobile"
      >
        <span class="icon"> <i class="fas fa-bars"></i></span>
      </button>

      <vs-sidebar-item
        v-if="$auth.loggedIn"
        id="allSubjects"
        :to="`/`"
      >
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            style="enable-background: new 0 0 512 512"
            xml:space="preserve"
          >
            <g>
              <g>
                <path
                  d="M439.481,183.132V75.29h-89.184v39.234l-94.298-72.542L0,238.919l53.634,69.718l26.261-20.202v181.583h151.519V336.973    h55.151v133.045h145.543V288.435l26.261,20.202L512,238.92L439.481,183.132z M402.072,439.983h-85.473V306.938H201.378v133.045    h-91.449V265.329L256,152.965l146.071,112.364V439.983z M452.875,266.518L256,115.064L59.125,266.518l-17.006-22.106L256,79.876    l124.333,95.648v-70.199h29.114v92.596l60.433,46.491L452.875,266.518z"
                />
              </g>
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
          </svg>
        </template>
        {{ $i18n.locale == "ar" ? "المواد" : "Subjects" }}
      </vs-sidebar-item>



      <vs-sidebar-item
        v-if="$auth.loggedIn"
        id="profile"
        :to="`/profile`"
      >
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            style="enable-background: new 0 0 512 512"
            xml:space="preserve"
          >
            <g>
              <g>
                <path
                  d="M439.481,183.132V75.29h-89.184v39.234l-94.298-72.542L0,238.919l53.634,69.718l26.261-20.202v181.583h151.519V336.973    h55.151v133.045h145.543V288.435l26.261,20.202L512,238.92L439.481,183.132z M402.072,439.983h-85.473V306.938H201.378v133.045    h-91.449V265.329L256,152.965l146.071,112.364V439.983z M452.875,266.518L256,115.064L59.125,266.518l-17.006-22.106L256,79.876    l124.333,95.648v-70.199h29.114v92.596l60.433,46.491L452.875,266.518z"
                />
              </g>
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
          </svg>
        </template>
        {{ $i18n.locale == "ar" ? "تعديل الحساب" : "Profile" }}
      </vs-sidebar-item>



      <template #footer>
        <vs-row justify="space-between">
          <!-- <vs-avatar @click.native="toggleCollapse">
            <img
              style="width:20px;cursor:pointer"
              src="@/assets/imgs/menu.svg"
              alt=""
            />
          </vs-avatar> -->

          <vs-avatar
            @click.native="changeLocale('ar')"
            v-if="$i18n.locale !== 'ar'"
          >
            <img
              style="width: 20px; margin: 0 5px"
              src="@/assets/imgs/united-arab-emirates.svg"
              alt=""
            />
            AR
          </vs-avatar>

          <vs-avatar
            @click.native="changeLocale('en')"
            v-else-if="$i18n.locale !== 'en'"
          >
            EN
            <img
              style="width: 20px; margin: 0 5px"
              src="@/assets/imgs/united-kingdom.svg"
              alt=""
            />
          </vs-avatar>

          <vs-avatar
            badge-color="danger"
            @click.native="logout()"
            badge-position="top-right"
          >
            <img
              style="width: 26px; cursor: pointer"
              src="@/assets/imgs/logout.svg"
              alt=""
            />
          </vs-avatar>
        </vs-row>
      </template>
    </vs-sidebar>

    <!-- <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
    >




      <el-menu-item index="3" @click.native="toggleCollapse">
        <img style="width:20px" @click="toggleCollapse" src="@/assets/imgs/menu.svg" alt="">
      </el-menu-item>

      <el-menu-item index="4" @click.native="$router.push(`/systems/list`)">
      <img style="width: 20px" src="@/assets/imgs/data-complexity.svg" alt="">
        <span>Systems</span>
      </el-menu-item>


      <el-menu-item index="2" @click.native="$router.push(`/levels/list`)">
      <img style="width: 20px" src="@/assets/imgs/level.svg" alt="">
        <span>Levels</span>
      </el-menu-item>









      <el-menu-item index="6" @click.native="$router.push(`/students`)">
      <img style="width: 20px" src="@/assets/imgs/students-black.svg" alt="">
        <span>Students</span>
      </el-menu-item>

      <el-menu-item index="6" @click.native="$router.push(`/doctors`)">
        <img style="width: 20px" src="@/assets/imgs/presentation-black.svg" alt="">
        <span>Teachers</span>
      </el-menu-item>


    </el-menu> -->
  </div>
</template>

<script>
export default {
  mounted() {},
  data() {
    return {
      isCollapse: true,
      active: "tohome",
      activeMobile: false,
    };
  },

  methods: {
    changeLocale(locale) {
      this.$vs.loading();
      this.$i18n.setLocale(locale);
      console.log("hi");

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

      location.reload();
    },
    logout() {
      this.$auth.logout();
      this.$router.push(`/login`);
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      this.$emit("collapse", false);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss">
.toggleMobileSidebar {
  border: none;
  color: #ffa400;
  background: transparent;
}

.vs-sidebar {
  svg {
    width: 30px;
    height: 30px;
    path {
      fill: var(--blue);
    }
  }
  .vs-sidebar__item.active {
    svg {
      path {
        fill: var(--yellow);
      }
    }
  }
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 1200px) {
  .vs-sidebar-content.reduce {
    right: -50px !important;
  }
  .main-content {
    margin-right: 0 !important;
  }

  .vs-sidebar-content.web-sidebar.open {
    left: -100% !important;
    right: auto !important;
  }

  .vs-sidebar-content.web-sidebar.open.right {
    right: -100% !important;
    left: auto !important;
  }

  .vs-sidebar-content.open {
    left: 0 !important;
  }

  .vs-sidebar-content.open.right {
    right: 0 !important;
    left: auto !important;
  }

  .main-content.collapsed-english {
    margin-left: 0 !important;
  }

  .main-content.collapsed-arabic {
    margin-right: 0 !important;
  }
}
.icon {
  color: #534dba;
}
/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 1200px) {
  .toggleMobileSidebar {
    display: none;
  }
}
.vs-avatar {
  cursor: pointer;
  width: 70px !important;
  background: transparent !important;
  height: 40px !important;
}
/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 1200px) {
  .toggleMobileSidebar {
    display: none;
  }
}
.icon {
  color: #ffa400 !important;
}
.vs-sidebar__item__text {
  font-family: "Cairo";
  font-size: 16px !important;
}
.iconBook {
  color: #ffa400 !important;
}
</style>
