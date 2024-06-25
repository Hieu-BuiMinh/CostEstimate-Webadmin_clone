'use client'

import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'
import { useLocale } from 'next-intl'

import { usePathname, useRouter } from '@/libs/i18nNavigation'
import { AppConfig } from '@/utils/AppConfig'

export function LocaleSwitcher() {
	const router = useRouter()
	const pathname = usePathname()
	const locale = useLocale()

	const handleChange = (event: any) => {
		// router.push(pathname, { locale: event.target.value })
		router.push(pathname, { locale: event.value })
		setTimeout(() => {
			window.location.reload()
		}, 500)
	}

	return (
		<DropDownListComponent
			onChange={handleChange}
			value={locale}
			width={80}
			id="ddlelement"
			dataSource={AppConfig.locales.map((elt) => elt)}
		/>
	)
}
