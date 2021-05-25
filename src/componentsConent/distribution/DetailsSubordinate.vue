<template>
  <!-- 分销管理-成员管理-下级详情 -->
  <div class="DetailsSubordinate">
    <div class="header">
      <div class="info">
        <span>成员姓名:孙阳</span>
        <span>上级信息：吴昊</span>
        <span>下级代理合计：323</span>
        <span>下级佣金合计：118,252</span>
      </div>
      <div class="form">
        <el-form inline>
          <el-form-item label="加入时间:">
            <el-date-picker
              v-model="FormData.joinTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
          <el-form-item label="成员信息:">
            <el-select
              v-model="FormData.correspondingMenberInfo"
              placeholder="请选择"
              style="width: 90px"
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
          <el-form-item>
            <el-button type="primary">查询</el-button>
            <el-button @click="resetFormData">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-table v-loading="listLoading" :data="tableData" style="width: 100%;margin-top:10px" border>
      <el-table-column
        v-for="(item, index) in headerData"
        :key="index"
        :width="item.width"
        :type="item.type"
        align="center"
        :prop="item.prop"
        :label="item.label"
      />
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
import Pagination from '@/components/Pagination'
import { fetchList } from '@/api/memberAudit'
export default {
  components: {
    Pagination
  },
    props: {
        ispage: {
         type: Boolean,
         default: false
        }
    },
  data() {
    return {
        tableData: [],
         listLoading: true,
            headerData: [
        { label: '序号', align: 'center', type: 'index', width: '60' },
        { prop: 'id', label: 'ID' },
        { prop: 'name', label: '成员姓名' },
        { prop: 'ctiy', label: '成员等级' },
        { prop: 'phone', label: '所在城市' },
        { prop: 'apply', label: '成员数' },
        { prop: 'superior', label: '总佣金(元)' },
        { prop: 'superior', label: '加入时间' }
      ],
      listQuery: {
        page: 1,
        limit: 5,
        total: 1000
      },
      FormData: this.resetFormData(),
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
      ]
    }
  },
    watch: {
        'ispage': {
            handler(newVal, oldVal) {
            if (newVal === true) {
                 this.resetFormData()
            } else {
            this.listQuery = {
                page: 1,
                limit: 5,
                total: 1000
            }
             this.getAndShowList()
            }
         }
    }
        },
  methods: {
      getAndShowList() {
           this.listLoading = true
      fetchList(this.listQuery).then((res) => {
        this.tableData = res.data.items
        this.listQuery.total = res.data.total
        this.listLoading = false
      })
      },
    resetFormData() {
      return (this.FormData = {
        joinTime: [], // 加入时间
        correspondingMenberInfo: '', // 对应选择成员||ID||手机号
        menberInfo: null, // 成员信息
        menberInfoStatus: null // 成员的状态
      })
    }
  }
}
</script>

<style lang='scss' scoped >
.DetailsSubordinate {
  padding-left: 10px;
  .header {
    display: flex;
    .info {
      display: flex;
      flex-direction: column;
      width: 200px;
      span {
        margin-top: 10px;
        color: #000;
        font-weight: 700;
      }
    }
    .form {
      flex: 1;
    }
  }
}
</style>
