<template>
  <!-- 行 -->
  <el-row type="flex" justify="space-bewteen" align="middle" style=" width:100%">
    <!-- 列 -->
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4" align>
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown trigger="click" @command="dropdownFn">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除子部门</el-dropdown-item>
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
  },
  methods: {
    // 触发下拉事件
    async dropdownFn(command) {
      // 判断下拉选中的command值
      switch (command) {
        // 添加
        case 'add':
          this.$emit('addDepts', this.treeNode.id)
          break
          // 编辑
        case 'edit':
          this.$emit('editDepts', this.treeNode.id)
          break
          // 删除
        case 'del':
          // 确认是否需要删除
          try {
            await this.$confirm('确定要删除么？', '提醒', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            // 将id 传递给父组件，让父组件去发起请求并刷新页面
            this.$emit('delDepts', this.treeNode.id)
          } catch (error) {
            // 如果用户取消就会被捕捉到
            this.$message.warning('已取消')
          }

          break
        default:
          break
      }
    }
  }
}
</script>

<style scoped>
  .el-dropdown-link{
    color: rgb(17, 172, 250);
    font-size: 14px;
  }
</style>
