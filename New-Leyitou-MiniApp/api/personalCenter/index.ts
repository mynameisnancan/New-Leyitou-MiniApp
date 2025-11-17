import request from '@/utils/request'
import upload from '@/utils/upload'

// 上传头像
export function uploadAvatar(data : any) {
	return upload({
		url: '/core/user/profile/avatar',
		filePath: data.filePath,
		name: data.name,
	})
}