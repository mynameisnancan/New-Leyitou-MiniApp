import request from '@/utils/request.ts';
import config from '@/config.ts';
import { LoginData, VerifyCodeResult, LoginResult } from './types';
import { UserInfo } from '@/api/user/types';
// 登录
export const login = (data: LoginData): Promise<ResultType<LoginResult>> => {
  const params = {
    ...data,
    clientId: data.clientId || config.clientId,
    grantType: data.grantType || 'password'
    // appKey: appKey
  };
  console.log(params)
  return request({
    url: '/auth/login',
    header: {
      isToken: 'false',
      isEncrypt: 'true',
      repeatSubmit: 'false'
    },
    method: 'post',
    data: params
  });
};

// 获取验证码
export const getCode = (): Promise<ResultType<VerifyCodeResult>> => {
  return request({
    url: '/auth/code',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  });
};

// 获取用户详细信息
export function getInfo(): Promise<ResultType<UserInfo>> {
  return request({
    url: '/core/sys/user/get_info',
    method: 'get'
  });
}

/**
 * 注销
 */
export function logout() {
  if (config.sse === true) {
    request({
      url: '/resource/sse/close',
      method: 'get'
    });
  }
  return request({
    url: '/auth/logout',
    method: 'post'
  });
}
