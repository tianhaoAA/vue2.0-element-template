<template>
  <!-- 成员审核页面 -->
  <div class="memberAudit">
    <el-form inline>
      <el-form-item label="申请时间:">
        <el-date-picker
          v-model="FormData.applyTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="联系电话:">
        <el-input
          v-model.trim="FormData.phone"
          placeholder="请输入联系电话"
          clearable
        />
      </el-form-item>
      <el-form-item label="成员姓名:">
        <el-input
          v-model.trim="FormData.name"
          placeholder="请输入联系电话"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button @click="resetFormData">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%"
      border
    >
      <el-table-column
        v-for="(item, index) in headerData"
        :key="index"
        :width="item.width"
        :type="item.type"
        align="center"
        :prop="item.prop"
        :label="item.label"
      />
      <el-table-column width="200" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="refuseExamine(scope.$index, scope.row)"
          >拒绝</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="adopt(scope.$index, scope.row)"
          >通过</el-button>
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
  </div>
</template>

<script>
import { fetchList } from '@/api/memberAudit'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  components: { Pagination },
  data() {
    return {
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 5,
        total: 0
      },
      headerData: [
        { label: '序号', align: 'center', type: 'index', width: '60' },
        { prop: 'name', label: '成员姓名' },
        { prop: 'city', label: '所在城市' },
        { prop: 'phone', label: '手机号' },
        { prop: 'name', label: '推荐人' },
        { prop: 'phone', label: '推荐人手机号' },
        { prop: 'date', label: '申请时间' }
      ],
      FormData: this.resetFormData(),
      tableData: []
    }
  },
  created() {
    this.getAndShowList()
  },
  methods: {
    // 拒绝
    refuseExamine() {
      this.$confirm('是否确认拒绝, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '拒绝成功!'
          })
        })
        .catch(() => {})
    },
    // 通过
    adopt() {
      this.$confirm('是否确认通过, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '通过成功!'
          })
        })
        .catch(() => {})
    },
    //  获取表格的数据
    getAndShowList() {
      this.listLoading = true
      fetchList(this.listQuery).then((res) => {
        this.tableData = res.data.items
        this.listQuery.total = res.data.total
        this.listLoading = false
      })
    },
    //  重置查询表单
    resetFormData() {
      // eslint-disable-next-line no-return-assign
      return (this.FormData = {
        applyTime: [], // 申请时间
        phone: null, // 手机号
        name: null // 姓名
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.memberAudit {
  padding: 10px;
}
</style>
