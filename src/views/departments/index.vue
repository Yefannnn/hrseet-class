<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <TreeTools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <!-- 树形结构 -->
        <el-tree v-loading="loading" :data="departs" :props="defaultProps">
          <template v-slot="{ data }">
            <TreeTools :tree-node="data" @delDepts="delDepts" @addDepts="addDepts" @editDepts="editDepts" />
          </template>
        </el-tree>
        <!-- 弹窗 -->
        <Depts :show-dialog.sync="Diolog.showDiolog" :pid="Diolog.pid" />
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
        pid: null
      },
      loading: false

    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    // 请求部门数据
    async getDepartments() {
      this.loading = true
      // data中是所有部门的详细信息
      const { data } = await getDepartmentsAPI()
      this.company = { name: data.companyName, manager: '负责人', id: '' }
      // data 中的 depts
      // this.departs = data.depts
      this.departs = tranListToTreeData(data.depts, '')
      this.loading = false
    },
    async delDepts(id) {
      // 执行删除操作
      try {
        await delDepartmentsAPI(id)
        this.$message.success('删除部门信息成功')
        // 重新获取部门信息
        this.getDepartments()
      } catch (error) {
        this.$message.error(error.message)
      }
    },
    // 添加回调
    addDepts(pid) {
      // this.Diolog.title = '新增部门'
      this.Diolog.pid = pid
      this.Diolog.showDiolog = true
    },
    async editDepts(pid) {
      this.Diolog.pid = pid
      // 调用子组件中的方法来回显
      await this.$children[0].$children[2].getDepartDetail(pid)
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
