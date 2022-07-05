<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="title" :visible="showDialog" @close="closeBtn">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="formData" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
      <el-row type="flex" justify="center">
        <!-- 列被分为24 -->
        <el-col :span="6">
          <el-button type="primary" size="small" @click="btnOk">确定</el-button>
          <el-button size="small" @click="closeBtn">取消</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getDepartmentsAPI, getEmployeeSimpleAPI, addDepartmentsAPI, getDepartDetailAPI, updateDepartmentsAPI } from '@/api'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    pid: {
      type: String,
      default: ''
    }
  },
  data() {
    // 自定义检查name是否重名
    const nameRepeater = async(rule, value, cb) => {
      // rule 规则  value 输入的部门名称

      try {
        let isRepeat
        // 发请求拿到父节点中的所有数据进行对比
        const { data: { depts }} = await getDepartmentsAPI()
        // 分 情况进行验证
        if (this.formData.id) {
          // 编辑
          isRepeat = depts.filter(item => item.pid === this.formData.pid && item.id !== this.formData.id).some(item => item.name === value)
        } else {
          //   筛选出父节点中的所有子节点 => 所有的子节点中的name 和 value 进行对比
          isRepeat = depts.filter(item => item.pid === this.pid).some(item => item.name === value)
        }

        //   判断isrepeat是否为true
        isRepeat ? cb(new Error('部门名称重复了')) : cb()
      } catch (error) {
        console.log(error)
      }
    }
    // 自定义检查code是否重名
    const codeRepeat = async(rule, value, cb) => {
      // 拿到所有部门信息的code值，然后验证不能重复
      try {
        let isRepeat
        const { data: { depts }} = await getDepartmentsAPI()
        if (this.formData.id) {
          isRepeat = depts.some(item => item.code !== this.formData.code && item.code === value)
        } else {
          isRepeat = depts.some(item => item.code === value && value)
        }
        isRepeat ? cb(new Error('已经有相同编码了')) : cb()
      } catch (error) {
        console.log(error)
      }
    }
    return {
      // 定义表单数据
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍
        pid: this.pid
      },
      // 定义校验规则
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' }, {
            validator: nameRepeater, trigger: 'blur'
          }],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' }, {
            validator: codeRepeat, trigger: 'blur'
          }],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-50个字符' }]
      },
      peoples: []
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  methods: {
    closeBtn() {
      this.$emit('update:show-dialog', false)
      this.formData = {}
      this.$refs.formData.resetFields()
    },
    // 点击下拉，触发方法
    async getEmployeeSimple() {
      const { data } = await getEmployeeSimpleAPI()
      this.peoples = data
    },
    async btnOk() {
      try {
        // 先验证表单
        await this.$refs.formData.validate()
        if (this.formData.id) {
          // 编辑
          await updateDepartmentsAPI(this.formData)
        } else {
          // 添加
          // 通过之后发请求
          await addDepartmentsAPI(this.formData)
        }
        this.$message.success('操作成功')
        this.closeBtn()
      } catch (error) {
        this.$message.error(error.message)
      }
    },
    // 编辑回显功能
    async getDepartDetail(id) {
      const { data } = await getDepartDetailAPI(id)
      this.formData = data
      console.log('this.formData', this.formData)
    }
  }
}
</script>

