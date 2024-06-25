'use client'

import React from 'react'

import { SwitchThemesButton } from '@/components/buttons'
import { LocaleSwitcher } from '@/components/dropdowns'

function SettingsPageView() {
	return (
		<div className="flex flex-col gap-4">
			<h2 className="text-xl font-bold">Settings</h2>
			<section className="flex flex-col gap-4 py-2">
				<p className="text-base font-bold">Preference</p>

				<div className="flex flex-col gap-4 border-b py-2">
					<div>
						<div className="grid grid-cols-4 gap-4">
							<div className="col-span-1">Language</div>
							<div className="col-span-3 flex items-center">
								<LocaleSwitcher />
							</div>
						</div>
					</div>
					<div className="grid grid-cols-4 gap-4">
						<div className="col-span-1">Theme</div>
						<div className="col-span-3 flex items-center">
							<SwitchThemesButton />
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default SettingsPageView
