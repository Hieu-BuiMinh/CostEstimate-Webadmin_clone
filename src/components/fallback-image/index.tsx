'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface Props {
	src: string
	alt?: string
	aspectRatio?: string
	defaultImageEmpty?: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any
}

const FallbackImage: React.FC<Props> = ({ src = '/', alt = '', aspectRatio = '1/1', defaultImageEmpty, ...rest }) => {
	const [imgSrc, setImgSrc] = useState(src)

	useEffect(() => {
		setImgSrc(src)
	}, [src])

	return (
		<Image
			// quality={100}
			{...rest}
			src={imgSrc || defaultImageEmpty || '/assets/images/empty/fallback.webp'}
			alt={alt}
			onError={() => {
				if (defaultImageEmpty) {
					setImgSrc(defaultImageEmpty)
					return
				}

				if (aspectRatio === '1/1') {
					setImgSrc('/assets/images/empty/fallback.webp')
				} else {
					setImgSrc('/assets/images/empty/fallback.webp')
				}
			}}
			unoptimized
		/>
	)
}

export default FallbackImage
