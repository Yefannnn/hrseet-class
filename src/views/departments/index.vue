<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <TreeTools :tree-node="company" :is-root="true" />
        <!-- 树形结构 -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <template v-slot="{ data }">
            <TreeTools :tree-node="data" />
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
export default {
  name: 'Departments',
  components: {
    TreeTools
  },
  data() {
    return {
      company: { name: '南京黑马程序员', manager: '负责人' },
      departs: [{ name: 'yefan', manager: 'yefan',
        deps: [{
          name: '1111', manager: '1111'
        }]
      }],
      defaultProps: {
        label: 'name',
        children: 'deps'
      }
    }
  }
}
</script>

<style>
  h3 {
    font-family: Arial,sans-serif;
  }
</style>
