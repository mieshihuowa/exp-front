<template>
 <d2-container>

  <div>
    <template>
      <el-form
        :inline="true"
        :model="form"
        ref="form"
        size="mini"
        style="margin-bottom: -18px;">

<!--        <el-form-item label="状态" prop="type">-->
<!--          <el-select-->
<!--            v-model="form.type"-->
<!--            placeholder="状态选择"-->
<!--            style="width: 100px;">-->
<!--            <el-option label="状态 1" value="1"/>-->
<!--            <el-option label="状态 2" value="2"/>-->
<!--            <el-option label="状态 3" value="3"/>-->
<!--            <el-option label="状态 4" value="4"/>-->
<!--            <el-option label="状态 5" value="5"/>-->
<!--          </el-select>-->
<!--        </el-form-item>-->

        <el-form-item label="学生姓名" prop="sname">
          <el-input
            v-model="form.sname"
            placeholder="学生姓名"
            style="width: 100px;"/>
        </el-form-item>

        <el-form-item label="班级" prop="cno">
          <el-input
            v-model="form.cno"
            placeholder="班级"
            style="width: 120px;"/>
        </el-form-item>

<!--        <el-form-item label="备注" prop="note">-->
<!--          <el-input-->
<!--            v-model="form.note"-->
<!--            placeholder="备注"-->
<!--            style="width: 120px;"/>-->
<!--        </el-form-item>-->

        <el-form-item>
          <el-button
            type="primary"
            @click="handleFormSubmit">
            <d2-icon name="search"/>
            查询
          </el-button>
        </el-form-item>

        <el-form-item>
          <el-button
            @click="handleFormReset">
            <d2-icon name="refresh"/>
            重置
          </el-button>
        </el-form-item>

      </el-form>
    </template>




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

  </div>
 </d2-container>
</template>

<script>
  import { students } from '@/api/sys.login'
  import {delStudents, addStudents, editStudents} from "../../../api/students";
  import upload from "./upload";

  export default {
    name: "page5",
    components: {
      upload,
    },
    created() {
      this.getStudents()
    },
    methods: {
      getStudents() {
        students(this.form).then(rs => {
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
          delStudents(row.id).then(console.log(row))

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
          let student = JSON.stringify({"sno": row.sno, "sname": row.sname, "cno": row.cno})
          addStudents(student)
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

          let student = JSON.stringify({"id":row.id,"sno":row.sno,"sname":row.sname,"cno":row.cno})
          editStudents(student)
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
      }

    },
    data () {
      return {
        columns: [
          {
            title: 'id',
            key: 'id',
            width: '180'
          },
          {
            title: 'sno',
            key: 'sno',
            width: '180',
          },
          {
            title: 'sname',
            key: 'sname'
          },
          {
            title: 'cno',
            key: 'cno'
          },{
            title: '上传',
            component:{
              name:upload,
            }

          }
        ],
        form: {
          //type: '1',
          //sname:'',
          //cno:'',
         // note: ''
        },
        data:[
        ],
        fileList: [],
        addTemplate: {
          sno: {
            title: 'sno',
          },
          sname: {
            title: 'sname',
          },
          cno: {
            title: 'cno',
          }
        },
        editTemplate: {
          sno: {
            title: '学号',
            value: ''
          },
          sname: {
            title: '姓名',
            value: ''
          },
          cno: {
            title: '班级',
            value: ''
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
        }
      }
    },

    mounted () {
      console.log(this.$refs.d2Crud.d2CrudData)
    }
  }
</script>
