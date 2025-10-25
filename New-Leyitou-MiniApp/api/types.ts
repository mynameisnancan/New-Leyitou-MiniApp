/**
 * 登录请求
 */
export interface LoginData {
  tenantId?: string;
  username?: string;
  password?: string;
  rememberMe?: boolean;
  socialCode?: string;
  socialState?: string;
  source?: string;
  code?: string;
  uuid?: string;
  clientId?: string;
  grantType?: string;
}

/**
 * 返回值
 */
export interface returnType<T> {
    msg: string;
    data: T;
    rows: T[];
    code: number;
    err: string;
    total: number;
}

/**
 * 登录响应
 */
export interface LoginResult {
  access_token: string;
}

/**
 * 验证码返回
 */
export interface VerifyCodeResult {
  captchaEnabled: boolean;
  uuid?: string;
  img?: string;
}
