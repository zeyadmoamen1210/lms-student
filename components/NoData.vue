<template>
  <div class="no-data">
      <img :style="{'width': width ? width : '500px'}" class="no-data" src="@/assets/imgs/empty-no-data.svg" alt="">


  </div>
</template>

<script>
export default {
    props:['width']
}
</script>

<style lang="scss">
.no-data{
    text-align: center;
    height:100%;
    min-height: 500px;
}
</style>
