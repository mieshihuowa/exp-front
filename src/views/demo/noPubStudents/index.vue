<template>
  <d2-container>

    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="data"
    >
    </d2-crud>

  </d2-container>
</template>

<script>
    import {noPubStudens} from "../../../api/experiment";
    import download from "../explist/download";
    import upload from "../page5/upload";

    export default {
        name: "noPubStudents",
      created() {
        this.getStudents()
      },
      methods:{
        getStudents(){
          noPubStudens().then(rs => {
            this.data = rs.records
            console.log(rs)
          })
        },
      },

      data(){
        return {
          columns:
            [
              {
                title: '实验编号',
                key: 'eno',
                width: '180'
              },
              {
                title: '实验标题',
                key: 'ename',
                width: '180'
              },{
              title: '学号',
              key:'sno',
              width: '180'
            },{
              title:'姓名',
              key:'sname'
            },
            ],
          data: [
          ],
          mounted () {
            console.log(this.$refs.d2Crud.d2CrudData)
          }
        }
      }
    }
</script>

<style scoped>

</style>
