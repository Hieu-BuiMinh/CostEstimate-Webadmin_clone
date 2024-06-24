import { useMediaQuery } from 'usehooks-ts'

export const useResponsiveDevice = () => {
	const isMobile = useMediaQuery('(max-width: 425px)')
	const isTablet = useMediaQuery('(max-width: 768px)')
	if (isMobile) {
		return 'mobile'
	}
	if (isTablet) {
		return 'tablet'
	}

	return 'desktop'
}
