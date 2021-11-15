<template>
  <div class="main-navbar">
      

      <div class="logout-img">
          <img @click="logout()" src="@/assets/imgs/logout.svg" alt="">
      </div>
  </div>
</template>

<script>
export default {
   
    
    methods:{
        
        logout(){
            this.$auth.logout();
            this.$router.push(`/login`)
        }
    }
}
</script>

<style lang="scss">
.main-navbar{
    position: fixed;
    top:0;
    left: 0;
    width:100%;
    padding: 15px;
    border-bottom: 1px solid #CCC;
    background: #fff;
    z-index: 999;
    // box-shadow: -1px 1px 20px 0px #e4e4e4;

    .collapse-img{
        width: 20px;
        cursor: pointer;
        display: inline-block;
        img{
            width:100%;
        }
    }

    .logout-img{
        width: 20px;
        cursor: pointer;
        display: inline-flex;
        float: left;
        img{
            width:100%;
        }
    }
}
</style>