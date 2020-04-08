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
  import {experiment} from '@api/experiment'
  import download from "./download";
  import upload from "../page5/upload";
  import util from '@/libs/util.js'
export default {
  name: 'explist',
  created() {
    this.getExperiment()
  },
  methods:{
    getExperiment(){
      let cno = util.cookies.get("cno")
      let  str = ({"cno":cno})
      console.log(str)
      experiment(str).then(rs => {
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
          title: 'id',
          key: 'id',
          width: '40'
        },
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
        title: '发布老师',
        key:'name',
        width: '180'
      },{
        title:'课程',
        key:'course'
      },
        {
          title:'班级',
          key:'cno'
        },
        {
          title: '备注',
          key:'note',
          width: '180'
        },
        {
          title: '下载',
          width: '180',
          component:{
            name:download,
            upload,
          }
        },{
        title: '上传',
        width: '180',
        component:{
          name:upload,
        }
      }
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
