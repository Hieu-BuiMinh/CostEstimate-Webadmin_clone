'use client'

import React, { useEffect, useRef } from 'react'

interface ForgeViewerProps {
	urn: string
	token: string
}

declare global {
	interface Window {
		Autodesk: any
	}
}

function TestPageView({ urn, token }: ForgeViewerProps) {
	const viewerDiv = useRef<HTMLDivElement>(null)

	const loadAutodeskScript = (): Promise<void> => {
		return new Promise((resolve, reject) => {
			if (window.Autodesk) {
				resolve()
				return
			}

			const script = document.createElement('script')
			script.src = 'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.0/viewer3D.min.js'
			script.async = true
			script.onload = () => resolve()
			script.onerror = () => reject(new Error('Failed to load Autodesk script'))
			document.head.appendChild(script)
		})
	}

	useEffect(() => {
		let viewer: any = null // Declare viewer variable

		const initializeViewer = async () => {
			try {
				await loadAutodeskScript()

				const options = {
					env: 'AutodeskProduction',
					getAccessToken: (onSuccess: (accessToken: string, expire: number) => void) => {
						onSuccess(token, 3600) // Adjust the token expiry time as needed
					},
				}

				window.Autodesk.Viewing.Initializer(options, () => {
					if (viewerDiv.current) {
						viewer = new window.Autodesk.Viewing.GuiViewer3D(viewerDiv.current)
						viewer.start()
						window.Autodesk.Viewing.Document.load(
							`urn:${urn}`,
							(doc: any) => {
								const defaultModel = doc.getRoot().getDefaultGeometry()
								viewer.loadDocumentNode(doc, defaultModel)
							},
							(errorCode: any, errorMsg: any) => {
								console.error('Failed to load document:', errorCode, errorMsg)
							}
						)
					}
				})
			} catch (error) {
				console.error('Failed to load Autodesk Viewer', error)
			}

			return () => {
				if (viewer) {
					viewer.finish()
					window.Autodesk.Viewing.shutdown()
				}
			}
		}

		initializeViewer()
	}, [urn, token])

	return <div ref={viewerDiv} style={{ width: '100%', height: '100%' }} />
}

export default TestPageView
