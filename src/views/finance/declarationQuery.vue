<template>
  <!-- 报单查询 -->
  <div class="declarationQuery">
    <div v-show="isAlllist">
      <el-form inline>
        <el-form-item label="报单时间:">
          <el-date-picker
            v-model="FormData.joinTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item label="单位名称:">
          <el-input
            v-model.trim="FormData.companyName"
            placeholder="请输入单位名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="成员姓名:">
          <el-input
            v-model.trim="FormData.memberName"
            placeholder="请输入成员姓名"
            clearable
          />
        </el-form-item>
        <el-form-item label="报单编号:">
          <el-input
            v-model.trim="FormData.code"
            placeholder="请输入报单编号"
            clearable
          />
        </el-form-item>
        <el-form-item label="客户姓名:">
          <el-input
            v-model.trim="FormData.customerName"
            placeholder="请输入客户姓名"
            clearable
          />
        </el-form-item>
        <el-form-item label="搜索备注:">
          <el-input
            v-model.trim="FormData.queryRemarks"
            placeholder="请输入搜索备注"
            clearable
          />
        </el-form-item>
        <el-form-item label="银行流水号:">
          <el-input
            v-model.trim="FormData.bankNumber"
            placeholder="请输入银行流水号"
            clearable
          />
        </el-form-item>
        <el-form-item label="客户电话:">
          <el-input
            v-model.trim="FormData.customerPhoto"
            placeholder="请输入客户电话"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button @click="resetFormData">重置</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column
          v-for="(item, index) in headerData"
          :key="index"
          :width="item.width"
          :type="item.type"
          align="center"
          :prop="item.prop"
          :label="item.label"
        />
        <el-table-column width="100" label="状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#eeeee"
              :active-value="1"
              :inactive-value="0"
            />
          </template>
        </el-table-column>
        <el-table-column min-width="120" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="rowEdit"
            >编辑</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="rowDetail(scope.row)"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="listQuery.total > 0"
        :total="listQuery.total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getAndShowList"
      />
      <declaration-row-edit :dialog-visible="dialogVisible" @closeDialog="closeDialog" />
    </div>
    <div v-show="!isAlllist" class="declarationQueryDetails">
      <div class="title"> <span @click="goBack()">报单查询</span>  -  <span>报单查询详情</span></div>
      <declaration-row-details />
    </div>
  </div>

</template>

<script>
import Pagination from '@/components/Pagination'
import DeclarationRowEdit from '@/componentsConent/finance/declarationRowEdit' // 编辑弹窗
import DeclarationRowDetails from '@/componentsConent/finance/declarationRowDetails' // 详情
export default {
  components: {
    Pagination,
    DeclarationRowEdit,
    DeclarationRowDetails

  },
  data() {
    return {
      isAlllist: true,
      dialogVisible: false,
      tableData: [{
        name: '张三'
      }],
        headerData: [
        { label: '序号', align: 'center', type: 'index', width: '60' },
        { prop: 'id', label: '报单编号' },
        { prop: 'name', label: '产品信息' },
        { prop: 'ctiy', label: '所在城市' },
        { prop: 'phone', label: '单位名称' },
        { prop: 'apply', label: '项目金额' },
        { prop: 'superior', label: '实收金额(元)' },
        { prop: 'superior', label: '报单时间' },
        { prop: 'superior', label: '状态' },
        { prop: 'superior', label: '备注信息' }
      ],
      listQuery: {
        page: 1,
        limit: 5,
        total: 1000
      },
      FormData: this.resetFormData()
    }
  },
  methods: {
      goBack() {
        this.isAlllist = true
    },
    rowDetail() {
       this.isAlllist = false
    },
    closeDialog() {
        this.dialogVisible = false
    },
    rowEdit() {
      this.dialogVisible = true
    },
    getAndShowList() {

    },
    // 重置表单
    resetFormData() {
      // eslint-disable-next-line no-return-assign
      return (this.FormData = {
        joinTime: [], // 报单时间
        companyName: null, // 单位名称
        memberName: '', // 成员名称
        code: null, // 编号
        customerName: null, // 客户姓名
        queryRemarks: '', // 搜索备注
        bankNumber: null, // 银行流水号
        customerPhoto: null // 客户电话
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.declarationQuery {
  padding: 10px;
}
.declarationQueryDetails{
 .title{
  cursor:pointer;
  margin-bottom: 15px;
 }
}

</style>
