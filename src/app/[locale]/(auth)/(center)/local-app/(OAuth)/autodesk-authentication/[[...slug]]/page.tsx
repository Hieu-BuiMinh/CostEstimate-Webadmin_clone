'use client'

import Image from 'next/image'
import { redirect, useSearchParams } from 'next/navigation'
import { encode } from 'urlencode'

function Page() {
	const params = useSearchParams()

	const autodeskUrlConfig = {
		baseUrl: process.env.NEXT_PUBLIC_AUTODESK_CLIENT_BASE_API || '',
		responseType: 'code',
		clientId: process.env.NEXT_PUBLIC_AUTODESK_CLIENT_ID || '',
		redirectUri: process.env.NEXT_PUBLIC_AUTODESK_LOCAL_APP_CLIENT_CALLBACK_URL || '',
		scope: 'data:read%20account:read%20account:write%20viewables:read',
	}

	const href = `${autodeskUrlConfig.baseUrl}?response_type=${autodeskUrlConfig.responseType}&client_id=${autodeskUrlConfig.clientId}&redirect_uri=${encode(autodeskUrlConfig.redirectUri)}&scope=${autodeskUrlConfig.scope}`

	if (params.get('error')) {
		// access_denied
		return (
			<div className="flex flex-col items-center justify-center gap-5">
				<div className="flex flex-col items-center gap-4">
					<Image
						width={10}
						height={10}
						alt="gg_logo"
						src="/assets/images/logo/autodesk_full_logo.svg"
						style={{ width: 100 }}
						className="shrink-0"
					/>

					<div className="flex items-center justify-between gap-2">
						<span>Authenticating error, try again</span>
					</div>
				</div>
			</div>
		)
	}

	if (!params.get('code')) {
		redirect(href)
	}

	if (params.get('code')) {
		return (
			<div className="flex flex-col items-center justify-center gap-5">
				<div className="flex flex-col items-center gap-4">
					<Image
						width={10}
						height={10}
						alt="gg_logo"
						src="/assets/images/logo/autodesk_full_logo.svg"
						style={{ width: 100 }}
						className="shrink-0"
					/>

					<div className="flex items-center justify-between gap-2">
						<span>Authentication user, please wait a moment</span>
						<span className="size-7 shrink-0 animate-spin rounded-full border-4 border-r-green-500" />
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col items-center justify-center gap-5">
			<div className="flex flex-col items-center gap-4">
				<Image
					width={10}
					height={10}
					alt="gg_logo"
					src="/assets/images/logo/autodesk_full_logo.svg"
					style={{ width: 100 }}
					className="shrink-0"
				/>

				<div className="flex items-center justify-between gap-2">
					<span>Authentication user, please wait a moment</span>
					<span className="size-5 shrink-0 animate-spin rounded-full border-4 border-r-green-300" />
				</div>
			</div>
		</div>
	)
}

export default Page
