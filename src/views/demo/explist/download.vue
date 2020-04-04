<template>
  <a :href="'http://localhost:8098/file/download?path='+this.scope.row.dir">下载</a>
</template>

<script>
    export default {
        name: "download",
      props: {
        // 本行的所有数据，此字段不需要额外配置
        scope: {
          default: null
        },
      },
    }
</script>

<style scoped>

</style>
