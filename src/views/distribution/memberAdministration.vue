<template>
  <div>
    <!-- 成员管理页面 -->
    <div v-show="isAlllist" class="memberAdministration">
      <el-form inline class="from">
        <el-form-item label="加入时间:">
          <el-date-picker
            v-model="FormData.joinTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="成员信息:">
          <el-select
            v-model="FormData.correspondingMenberInfo"
            style="width: 90px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in optionsA"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input
            v-model.trim="FormData.menberInfo"
            style="width: 150px"
            placeholder="姓名/手机号/ID"
            clearable
          />
        </el-form-item>
        <el-form-item label="申请渠道:">
          <el-select v-model="FormData.applicationChannel" placeholder="请选择">
            <el-option
              v-for="item in optionsB"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="成员状态:">
          <el-select v-model="FormData.menberInfoStatus" placeholder="请选择">
            <el-option
              v-for="item in optionsC"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="上级信息:">
          <el-select
            v-model="FormData.correspondingSuperiorInfo"
            style="width: 90px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in optionsA"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input
            v-model.trim="FormData.superiorInfo"
            style="width: 150px"
            placeholder="姓名/手机号/ID"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button @click="resetFormData">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button style="margin-bottom: 10px" type="primary" @click="addData()">
        <i class="el-icon-edit" /> 新增</el-button>
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
        <el-table-column prop="billNumber" label="下级数/开单数" align="center" />
        <el-table-column prop="totalAmount" label="总佣金(元)" align="center" />
        <el-table-column prop="createTiem" label="加入时间" align="center" />
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

        <el-table-column width="100" label="操作" align="center">
          <template slot-scope="scope">
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
      <!-- 弹窗 -->
      <addmember-administration
        :dialog-visible="dialogVisible"
        @closeDialog="closeDialog"
      />
    </div>
    <!--单个成员详情 -->
    <div v-show="!isAlllist" class="memberAdministrationRowDetails">
      <div class="title"> <span @click="goBack()">成员管理</span>  -  <span>成员管理详情</span></div>
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="下级" name="first"><details-subordinate :ispage="isAlllist" /></el-tab-pane>
        <el-tab-pane label="订单" name="second"><details-order :ispage="isAlllist" /></el-tab-pane>
      </el-tabs>
      <el-button type="primary" style="margin-top:10px" @click="goBack()">返回</el-button>
    </div>
  </div>

</template>

<script>
import AddmemberAdministration from '@/componentsConent/distribution/AddMemberAdministration' // 新增弹窗
import DetailsSubordinate from '@/componentsConent/distribution/DetailsSubordinate' // 详情下级弹窗
import DetailsOrder from '@/componentsConent/distribution/DetailsOrder' // 详情订单弹窗
import Pagination from '@/components/Pagination'
export default {
  components: {
    AddmemberAdministration,
    Pagination,
    DetailsSubordinate,
    DetailsOrder

  },
  data() {
    return {
       activeName: 'first',
      isAlllist: true,
      listQuery: {
        page: 1,
        limit: 5,
        total: 1000
      },
      dialogVisible: false,
      FormData: this.resetFormData(),
      headerData: [
        { label: '序号', align: 'center', type: 'index', width: '60' },
        { prop: 'id', label: 'ID' },
        { prop: 'name', label: '成员姓名' },
        { prop: 'ctiy', label: '所在地区' },
        { prop: 'phone', label: '联系电话' },
        { prop: 'apply', label: '申请渠道' },
        { prop: 'superior', label: '上级' }
      ],
      tableData: [
        {
          billNumber: '下级数：235,开单数：228',
          status: 1
        },
        {
          billNumber: '下级数：235,开单数：228',
          status: 0
        }
      ],
      optionsB: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '后台添加'
        },
        {
          value: '2',
          label: '加盟二维码'
        }
      ],
      optionsA: [
        {
          value: '',
          label: '姓名'
        },
        {
          value: '1',
          label: '手机号'
        },
        {
          value: '2',
          label: 'ID'
        }
      ],
      optionsC: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '正常'
        },
        {
          value: '2',
          label: '禁用'
        }
      ]
    }
  },
  methods: {
    getAndShowList() {},
    addData() {
      this.dialogVisible = true
    },
    closeDialog() {
      this.dialogVisible = false
      console.log('弹窗关闭了')
    },
    goBack() {
        this.isAlllist = true
    },
    // 行详情
    rowDetail() {
      this.isAlllist = false
      this.activeName = 'first'
    },
    // 重置表单
    resetFormData() {
      // eslint-disable-next-line no-return-assign
      return (this.FormData = {
        joinTime: [], // 加入时间
        applicationChannel: null, // 申请渠道
        correspondingMenberInfo: '', // 对应选择成员||ID||手机号
        menberInfo: null, // 成员信息
        menberInfoStatus: null, // 成员的状态
        correspondingSuperiorInfo: '',
        superiorInfo: null // 推荐人手机号
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.memberAdministration {
  padding: 10px;
  .from {
  }
}
.memberAdministrationRowDetails{
 padding: 10px;
 .title{
  cursor:pointer;
  margin-bottom: 15px;
 }
}
</style>
