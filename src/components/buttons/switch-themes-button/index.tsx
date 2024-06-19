import { SwitchComponent } from '@syncfusion/ej2-react-buttons'

import { useThemeContextProvider } from '@/components/providers/theme-provider/theme-context'

export function SwitchThemesButton() {
	const { handleToggleTheme } = useThemeContextProvider()
	return <SwitchComponent cssClass="mt-28 mx-3" checked onChange={handleToggleTheme} />
}
