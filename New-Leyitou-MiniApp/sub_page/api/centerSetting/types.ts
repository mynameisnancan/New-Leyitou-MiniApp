import { SysUserVo } from "@/api/user/types";

/**
 * 数据对象
 *
 * ProfileVo
 */
export interface ProfileVo {
    /**
     * 用户所属岗位组
     */
    postGroup?: string;
    /**
     * 用户所属角色组
     */
    roleGroup?: string;
    /**
     * 用户信息
     */
    user?: SysUserVo;
    [property: string]: any;
}

/**
 * 新旧密码
 *
 * 
 */
export interface SysUserPasswordQuery {
    /**
     * 新密码
     */
    newPassword: string;
    /**
     * 旧密码
     */
    oldPassword: string;
}

/**
 * 修改用户信息
 */
export interface SysUserProfileQuery {
    /**
     * 创建者
     */
    createBy?: number;
    /**
     * 创建部门
     */
    createDept?: number;
    /**
     * 创建时间
     */
    createTime?: string;
    /**
     * 用户邮箱
     */
    email?: string;
    /**
     * 用户昵称
     */
    nickName?: string;
    /**
     * 手机号码
     */
    phonenumber?: string;
    /**
     * 用户性别（0男 1女 2未知）
     */
    sex?: string;
    /**
     * 更新者
     */
    updateBy?: number;
    /**
     * 更新时间
     */
    updateTime?: string;
}