import type { LocalePrefix } from 'node_modules/next-intl/dist/types/src/shared/types'

const localePrefix: LocalePrefix = 'as-needed'

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
	name: 'Nextjs Starter',
	locales: ['en', 'vi'],
	mode: ['dark', 'light'],
	defaultLocale: 'vi',
	localePrefix,
}
