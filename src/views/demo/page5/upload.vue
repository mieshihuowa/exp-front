<template>
  <el-upload
    class="upload-demo"
    :action="getUrl()"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    multiple
    :limit="1"

    :on-exceed="handleExceed"
    :file-list="fileList">
    <el-button size="small" type="primary">点击上传</el-button>
  </el-upload>
</template>

<script>
  import util from '@/libs/util.js'
    export default {
        name: "upload",
      props: {
        // 本行的所有数据，此字段不需要额外配置
        scope: {
          default: null
        },
      },

      data() {
        return {
          fileList: []
        };

      },
      methods: {
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        handleExceed(files, fileList) {
          this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
        },
        getUrl(){
         let sno =  util.cookies.get("no")
          let role = util.cookies.get("role")
          let name = util.cookies.get("name")
          console.log(name)
          let eno = this.scope.row.eno
         return  "http://localhost:8098/file/upload"+"?eno="+eno+"&"+"role="+role+"&"+"sno="+sno+"&"+"name="+name
        }
      }
    }
</script>

<style scoped>

</style>
