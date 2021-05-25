<template>
  <!-- 分销管理-成员管理-新增弹窗 -->
  <div>
    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form label-width="100px">
        <el-form-item label="成员姓名" required>
          <el-input
            v-model.trim="FormData.name"
            placeholder="请输入姓名"
            clearable
          /></el-form-item>
        <el-form-item label="所在城市" required>
          <el-input
            v-model.trim="FormData.ctiy"
            placeholder="请输入城市"
            clearable
          /></el-form-item>
        <el-form-item label="手机号" required>
          <el-input
            v-model.trim="FormData.phone"
            placeholder="请输入手机号"
            clearable
          /></el-form-item>
        <el-form-item label="推荐人手机号">
          <el-input
            v-model.trim="FormData.referencesPhone"
            placeholder="请输入推荐人手机号"
            clearable
          /></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Schema from 'async-validator'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      FormData: this.resetFormData(),
      rules: {
        name: [
          {
            required: true,
            message: '请输入成员姓名'
          }
        ],
            ctiy: [
          {
            required: true,
            message: '请输入城市'
          }
        ],
           phone: [
          {
            required: true,
            message: '请输入手机号'
          }
           ]

      }
    }
  },
  methods: {
    // 重置表单
    resetFormData() {
      // eslint-disable-next-line no-return-assign
      return (this.FormData = {
        name: null, // 成员姓名
        phone: null, //  手机号
        ctiy: null, // 所在城市
        referencesPhone: null // 推荐人手机号
      })
    },
    submit() {
         const validator = new Schema(this.rules)
        validator.validate(this.FormData, (errors) => {
            if (errors) {
            for (var key in errors) {
              this.$message.error(errors[key].message)
              return
            }
          }
        })
    },
    handleClose() {
      this.$emit('closeDialog')
      this.resetFormData()
    }
  }
}
</script>

<style>
</style>
