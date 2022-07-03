<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <!-- 行 -->
        <el-row type="flex" justify="space-bewteen" align="middle" style="height: 40px">
          <!-- 列 -->
          <el-col>
            <h3>江苏省南京市黑马程序员</h3>
          </el-col>
          <el-col :span="4" align>
            <el-row type="flex" justify="end">
              <el-col>负责人</el-col>
              <el-col>
                <el-dropdown>
                  <span>
                    操作<i class="el-icon-arrow-down" />
                  </span>
                  <!-- 下拉菜单 -->
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>

            </el-row>

          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Departments'
}
</script>

<style>
  h3 {
    font-family: Arial,sans-serif;
  }
</style>
