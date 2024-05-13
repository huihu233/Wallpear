const SYSTEM_INFO = uni.getSystemInfoSync()
// 获取导航栏上面的空白高度
export const getStatusBarHeight = () => SYSTEM_INFO.statusBarHeight || 15

// 获取小程序菜单按钮的高度
export const getTitleBarHeight = () => {
	if (uni.getMenuButtonBoundingClientRect) {
		const {
			top,
			height
		} = uni.getMenuButtonBoundingClientRect()
		return height + (top - getStatusBarHeight()) * 2
	} else {
		return 60
	}
}

// 获取导航栏整体的高度
export const getNavBarHeight = () => getStatusBarHeight() + getTitleBarHeight()