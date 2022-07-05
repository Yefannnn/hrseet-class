// 项目 api 请求集合

// 登录集合
import { userlogin, getUserInfo, getUserDetailById } from '@/api/user'

// 部门集合
import { getDepartments, delDepartments, addDepartments, getDepartDetail, updateDepartments } from '@/api/departments'

// 员工集合
import { getEmployeeSimple } from '@/api/employees'

// 登录集合
export const userloginAPI = userlogin
export const getUserInfoAPI = getUserInfo
export const getUserDetailByIdAPI = getUserDetailById

// 部门集合
export const getDepartmentsAPI = getDepartments
export const delDepartmentsAPI = delDepartments
export const addDepartmentsAPI = addDepartments
export const getDepartDetailAPI = getDepartDetail
export const updateDepartmentsAPI = updateDepartments

// 员工集合
export const getEmployeeSimpleAPI = getEmployeeSimple
