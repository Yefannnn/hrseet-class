<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <TreeTools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <!-- 树形结构 -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <template v-slot="{ data }">
            <TreeTools :tree-node="data" @delDepts="delDepts" @addDepts="addDepts" />
          </template>
        </el-tree>
        <!-- 弹窗 -->
        <Depts :title="Diolog.title" :show-dialog="Diolog.showDiolog" :pid="Diolog.pid" />
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartmentsAPI, delDepartmentsAPI } from '@/api'
import { tranListToTreeData } from '@/utils/index'
import Depts from './components/add-depts.vue'
export default {
  name: 'Departments',
  components: {
    TreeTools,
    Depts
  },
  data() {
    return {
      company: { },
      departs: [],
      defaultProps: {
        label: 'name'
      },
      Diolog: {
        showDiolog: false,
        title: '新增部门',
        pid: null
      }

    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    // 请求部门数据
    async getDepartments() {
      // data中是所有部门的详细信息
      const { data } = await getDepartmentsAPI()
      this.company = { name: data.companyName, manager: '负责人' }
      // data 中的 depts
      // this.departs = data.depts
      this.departs = tranListToTreeData(data.depts, '')
    },
    async delDepts(id) {
      // 执行删除操作
      try {
        await delDepartmentsAPI(id)
        this.$message.success('删除部门信息成功')
        // 重新获取部门信息
        this.getDepartments()
      } catch (error) {
        this.$message.error(error)
      }
    },
    // 添加回调
    addDepts(pid) {
      // this.Diolog.title = '新增部门'
      this.Diolog.pid = pid
      this.Diolog.showDiolog = true
    }
  }
}
</script>

<style>
  h3 {
    font-family: Arial,sans-serif;
  }
</style>
