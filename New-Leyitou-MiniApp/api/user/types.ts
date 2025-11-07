// 查询用户筛选参数
export interface UserQuery extends PageQuery{
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
     * 部门ID
     */
    deptId?: number;
    /**
     * 用户邮箱
     */
    email?: string;
    /**
     * 排除不查询的用户(工作流用)
     */
    excludeUserIds?: string;
    /**
     * 排序的方向desc或者asc
     */
    isAsc?: string;
    /**
     * 用户昵称
     */
    nickName: string;
    /**
     * 排序列
     */
    orderByColumn?: string;
    /**
     * 密码
     */
    password?: string;
    /**
     * 手机号码
     */
    phonenumber?: string;
    /**
     * 岗位组
     */
    postIds?: number[];
    /**
     * 备注
     */
    remark?: string;
    /**
     * 数据权限 当前角色ID
     */
    roleId?: number;
    /**
     * 角色组
     */
    roleIds?: number[];
    /**
     * 用户性别（0男 1女 2未知）
     */
    sex?: string;
    /**
     * 帐号状态（0正常 1停用）
     */
    status?: string;
    /**
     * 更新者
     */
    updateBy?: number;
    /**
     * 更新时间
     */
    updateTime?: string;
    /**
     * 用户ID
     */
    userId?: number;
    /**
     * 用户账号
     */
    userName?: string;
    /**
     * 用户类型（sys_user系统用户）
     */
    userType?: string;
}


/**
 * 用户信息视图对象 sys_user
 *
 * SysUserVo
 */
export interface SysUserVo {
    /**
     * 头像地址
     */
    avatar?: string;
    /**
     * 创建时间
     */
    createTime?: string;
    /**
     * 部门ID
     */
    deptId?: number;
    /**
     * 部门名
     */
    deptName?: string;
    /**
     * 用户邮箱
     */
    email?: string;
    /**
     * 最后登录时间
     */
    loginDate?: string;
    /**
     * 最后登录IP
     */
    loginIp?: string;
    /**
     * 用户昵称
     */
    nickName?: string;
    /**
     * 手机号码
     */
    phonenumber?: string;
    /**
     * 岗位组
     */
    postIds?: number[];
    /**
     * 备注
     */
    remark?: string;
    /**
     * 数据权限 当前角色ID
     */
    roleId?: number;
    /**
     * 角色组
     */
    roleIds?: number[];
    /**
     * 角色对象
     */
    roles?: SysRoleVo[];
    /**
     * 用户性别（0男 1女 2未知）
     */
    sex?: string;
    /**
     * 帐号状态（0正常 1停用）
     */
    status?: string;
    /**
     * 三方登录关系绑定信息
     */
    sysUserThirdBind?: SysUserThirdBindVo;
    /**
     * 租户ID
     */
    tenantId?: string;
    /**
     * 用户ID
     */
    userId?: number;
    /**
     * 用户账号
     */
    userName?: string;
    /**
     * 用户类型（sys_user系统用户）
     */
    userType?: string;
}

/**
 * 角色信息视图对象 sys_role
 *
 * SysRoleVo
 */
export interface SysRoleVo {
    /**
     * 创建时间
     */
    createTime?: string;
    /**
     * 数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）
     */
    dataScope?: string;
    /**
     * 部门树选择项是否关联显示
     */
    deptCheckStrictly?: boolean;
    /**
     * 用户是否存在此角色标识 默认不存在
     */
    flag?: boolean;
    /**
     * 菜单树选择项是否关联显示
     */
    menuCheckStrictly?: boolean;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 角色ID
     */
    roleId?: number;
    /**
     * 角色权限字符串
     */
    roleKey?: string;
    /**
     * 角色名称
     */
    roleName?: string;
    /**
     * 显示顺序
     */
    roleSort?: number;
    /**
     * 角色状态（0正常 1停用）
     */
    status?: string;
}

/**
 * 三方登录关系绑定信息
 *
 * SysUserThirdBindVo
 */
export interface SysUserThirdBindVo {
    /**
     * 钉钉绑定时间
     */
    dingtalkBindTime?: string;
    /**
     * 钉钉绑定的openid
     */
    dingtalkOpenid?: string;
    /**
     * 钉钉解绑时间
     */
    dingtalkUnbindTime?: string;
    /**
     * 飞书绑定时间
     */
    feishuBindTime?: string;
    /**
     * 飞书绑定的openid
     */
    feishuOpenid?: string;
    /**
     * 飞书解绑时间
     */
    feishuUnbindTime?: string;
    /**
     * 公众号绑定时间
     */
    gzhBindTime?: string;
    /**
     * 公众号绑定的openid
     */
    gzhOpenid?: string;
    /**
     * 公众号解绑时间
     */
    gzhUnbindTime?: string;
    /**
     * 用户绑定的手机号
     */
    phone?: string;
    /**
     * 手机号绑定时间
     */
    phoneBindTime?: string;
    /**
     * 手机号解绑时间
     */
    phoneUnbindTime?: string;
    /**
     * 用户ID
     */
    userId?: number;
    /**
     * 微信扫码绑定时间
     */
    wxBindTime?: string;
    /**
     * 微信扫码解绑时间
     */
    wxUnbindTime?: string;
    /**
     * 微信绑定的unionid
     */
    wxUnionid?: string;
}

/**
 * 数据对象
 *
 * UserInfoVo
 */
export interface UserInfoVo {
    /**
     * 应用标识信息
     */
    appKeys?: string[];
    /**
     * 菜单权限
     */
    permissions?: string[];
    /**
     * 角色权限
     */
    roles?: string[];
    /**
     * 用户基本信息
     */
    user?: SysUserVo;
}

/**
 * 用户返回对象
 */
export interface UserVO extends BaseEntity {
  userId: string | number;
  tenantId: string;
  deptId: number;
  userName: string;
  nickName: string;
  userType: string;
  email: string;
  phonenumber: string;
  sex: string;
  avatar: string;
  status: string;
  delFlag: string;
  loginIp: string;
  loginDate: string;
  remark: string;
  deptName: string;
  roles: RoleVO[];
  roleIds: any;
  postIds: any;
  roleId: any;
  admin: boolean;
}


export interface RoleVO  {
  roleId: string | number;
  roleName: string;
  roleKey: string;
  roleSort: number;
  dataScope: string;
  menuCheckStrictly: boolean;
  deptCheckStrictly: boolean;
  status: string;
  delFlag: string;
  remark?: any;
  flag: boolean;
  menuIds?: Array<string | number>;
  deptIds?: Array<string | number>;
  admin: boolean;
}