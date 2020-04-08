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
  import {uploadExperiment} from '@api/uploadExperiment'
  import download from "../explist/download";

export default {
  name: 'uploadList',
  components: {
    download,
  },
  created() {
    this.getUploadExperiment()
  },
  methods:{
    getUploadExperiment(){
      uploadExperiment().then(rs => {
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
          title:"学生姓名",
          key:'sname'
        },
          {
            title:"学号",
            key:'sno'
          },
          {
            title: '下载',
            width: '180',
            component:{
              name:download,
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
