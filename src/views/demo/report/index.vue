<template>
  <d2-container>
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="data"
      :rowHandle="rowHandle"
      @row-remove="handleRowRemove"
      add-title="我的新增"
      edit-title="我的修改"
      :edit-template="editTemplate"
      :add-template="addTemplate"
      :form-options="formOptions"
      @dialog-open="handleDialogOpen"
      @row-add="handleRowAdd"
      @row-edit="handleRowEdit"
      @dialog-cancel="handleDialogCancel"
    >
      <el-button slot="header" style="margin-bottom: 5px" @click="addRow">新增</el-button>

    </d2-crud>

  </d2-container>
</template>

<script>
  import {experiment,delExperiment,addExperiment,editExperiment} from '@api/experiment'
  import upload from "../page5/upload";

export default {
  name: 'report',
  components: {
    upload,
  },
  created() {
    this.getExperiment()
  },
  methods:{
    getExperiment(){
      experiment(this.form).then(rs => {
        this.data = rs.records
        console.log(rs)
      })
    },
    handleRowRemove({index, row}, done) {
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        delExperiment(row.id).then(console.log(row))

        done()
      }, 300)
    },
    handleDialogOpen({mode}) {
      this.$message({
        message: '打开模态框，模式为：' + mode,
        type: 'success'
      })
    },
    // 普通的新增
    addRow() {
      this.$refs.d2Crud.showDialog({
        mode: 'add'
      })
    },
    handleRowAdd(row, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(row)
        this.$message({
          message: '保存成功',
          type: 'success'
        });
        let experiment = JSON.stringify({'id':row.id,"eno": row.eno, "ename": row.ename, "name": row.name,"note":row.note,"cno":row.cno,"course":row.course})
        addExperiment(experiment)
        done()
        this.formOptions.saveLoading = false
      }, 300)
    },
    handleDialogCancel(done) {
      this.$message({
        message: '取消',
        type: 'warning'
      });
      done()
    },
    handleRowEdit({index, row}, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.$message({
          message: '编辑成功',
          type: 'success'
        })

        let experiment = JSON.stringify({'id':row.id,"eno": row.eno, "ename": row.ename, "name": row.name,"note":row.note,"cno":row.cno,"course":row.course})
        editExperiment(experiment)
        // done可以传入一个对象来修改提交的某个字段
        done({
          //  address: '我是通过done事件传入的数据！'
        })
        this.formOptions.saveLoading = false
      }, 300)
    },
    handleFormReset () {
      this.$refs.form.resetFields()
    },
    handleFormSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.getStudents()
          this.$emit('submit', this.form)

        } else {
          this.$notify.error({
            title: '错误',
            message: '表单校验失败'
          })
          return false
        }
      })
    },
  },
  data () {
    return {
      columns: [
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
      addTemplate: {
        eno: {
          title: '实验编号',
        },
        ename: {
          title: '实验标题',
        },
        name: {
          title: '发布教师',
        },
        course:{
          title:'课程'
        },
        cno:{
          title:'班级'
        },
        note:{
          title:'备注'
        },
      },
      editTemplate: {
        eno: {
          title: '实验编号',
          value: ''
        },
        ename: {
          title: '实验名',
          value: ''
        },
        name: {
          title: '教师姓名',
          value: ''
        },
        course:{
          title:'课程'
        },
        cno:{
          title:'班级'
        },
        note:{
          title:'备注'
        },
      },
      rowHandle: {
        columnHeader: '编辑表格',
        edit: {
          icon: 'el-icon-edit',
          text: '修改',
          size: 'small',
          show () {
            {
              return true
            }

          },
          // disabled (index, row) {
          //   if (row.forbidEdit) {
          //     return true
          //   }
          //   return false
          // }
        },
        remove: {
          icon: 'el-icon-delete',
          size: 'small',
          fixed: 'right',
          confirm: true,
        },

      },
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: false
      },
      mounted () {
        console.log(this.$refs.d2Crud.d2CrudData)
      }
    }


}
}
</script>
