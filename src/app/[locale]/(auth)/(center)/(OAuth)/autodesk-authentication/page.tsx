'use client'

import { redirect, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { encode } from 'urlencode'

import { APP_ROUTER } from '@/common/config'
import { useLoginWithAutodesk } from '@/view/auth/hooks/useLoginWithAutodesk'

function Page() {
	const params = useSearchParams()
	// React strict mode run useffect twice in dev mode
	// so we need to use ref because autodesk code only be called once
	const hasRunRef = useRef(false)

	const autodeskUrlConfig = {
		baseUrl: process.env.NEXT_PUBLIC_AUTODESK_CLIENT_BASE_API || '',
		responseType: 'code',
		clientId: process.env.NEXT_PUBLIC_AUTODESK_CLIENT_ID || '',
		redirectUri: process.env.NEXT_PUBLIC_AUTODESK_CLIENT_CALLBACK_URL || '',
		scope: 'data:read%20account:read%20account:write%20viewables:read',
	}

	const { mutate: handleLoginWithAutodesk } = useLoginWithAutodesk()

	const href = `${autodeskUrlConfig.baseUrl}?response_type=${autodeskUrlConfig.responseType}&client_id=${autodeskUrlConfig.clientId}&redirect_uri=${encode(autodeskUrlConfig.redirectUri)}&scope=${autodeskUrlConfig.scope}`

	if (params.get('error')) {
		// access_denied
		redirect(APP_ROUTER.paths.center.signIn.path)
	}
	if (!params.get('code')) {
		redirect(href)
	}

	useEffect(() => {
		if (hasRunRef.current) return
		hasRunRef.current = true

		if (params.get('code') !== '') {
			handleLoginWithAutodesk(params.get('code') || '')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="flex flex-col items-center justify-center gap-5">
			<span>Authenticating...</span>
			<p>{params.get('code')}</p>
		</div>
	)
}

export default Page
