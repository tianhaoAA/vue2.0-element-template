<template>
  <!-- 财务管理-报单查询-编辑弹窗 -->
  <div class="declarationRowEdit">
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="550px"
      :before-close="handleClose"
    >
      <div class="titleInfo">
        <div class="top">
          <div class="first">项目金额：9800</div>
          <div class="code">报单编号：20210506213500</div>
        </div>
        <div class="bottom">
          <div class="first">产品信息：双控系统</div>
          <div>单位名称：唐山魔豆科技有限公司</div>
        </div>
      </div>

      <el-form label-width="100px">
        <el-form-item label="实收金额" required>
          <el-input
            v-model.trim="FormData.actualAmount"
            placeholder="请输入金额"
            type="number"
            clearable
          /></el-form-item>
        <el-form-item label="订单状态" required>
          <el-select v-model="FormData.orderStatus" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="银行流水号" :required="isCheckedReceived">
          <el-input
            v-model.trim="FormData.bankNumber"
            placeholder="请输入银行流水号"
            clearable
          />
        </el-form-item>
        <el-form-item label="备注信息" :required="false">
          <el-input
            v-model="FormData.content"
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取  消</el-button>
        <el-button type="primary" @click="submit">保 存</el-button>
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
      default: true
    }
  },
  data() {
    return {
      FormData: this.resetFormData(),
      options: [
        {
          value: '0',
          label: '待收款'
        },
        {
          value: '1',
          label: '已收款'
        },
        {
          value: '2',
          label: '已退款'
        },
        {
          value: '3',
          label: '收款失败'
        }
      ],
      rules: {
        actualAmount: [
          {
            required: true,
            message: '请输入金额'
          }
        ],
        orderStatus: [
          {
            required: true,
            message: '请选择订单状态'
          }
        ]
      }
    }
  },
  computed: {
     isCheckedReceived() {
        return !!(this.FormData.orderStatus && this.FormData.orderStatus === '1')
    }
  },
  methods: {

    // 重置表单
    resetFormData() {
      // eslint-disable-next-line no-return-assign
      return (this.FormData = {
        actualAmount: null, // 实际金额
        orderStatus: null, //  订单状态
        bankNumber: null, // 银行流水号
        content: null // 备注信息
      })
    },
    submit() {
      const validator = new Schema(this.rules)
      console.log(this.rules)
      validator.validate(this.FormData, (errors) => {
        if (errors) {
          for (var key in errors) {
            this.$message.error(errors[key].message)
            return
          }
        }
        console.log(this.FormData.orderStatus)
        if (this.FormData.orderStatus === '1') {
         this.$message.error('请输入银行流水号')
        return
        }
        console.log('验证通过')
      })
    },
    handleClose() {
      this.$emit('closeDialog')
      this.resetFormData()
    }
  }
}
</script>

<style lang='scss' scoped>
.declarationRowEdit {
  .titleInfo {
    margin-left: 30px;

    .top {
      display: flex;
      margin-bottom: 15px;
      .first {
        width: 200px;
      }
    }
    .bottom {
      margin-bottom: 15px;
      display: flex;
      .first {
        width: 200px;
      }
    }
  }
/deep/ input::-webkit-outer-spin-button,
/deep/ input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
/deep/ input[type="number"] {
  -moz-appearance: textfield !important;
}
}
</style>
