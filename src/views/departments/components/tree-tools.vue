<template>
  <!-- 行 -->
  <el-row type="flex" justify="space-bewteen" align="middle" style="height: 40px ; width:100%">
    <!-- 列 -->
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4" align>
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown trigger="click">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">编辑子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">删除子部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'TreeTools',
  props: {
    treeNode: {
      required: true,
      type: Object
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>

</style>
