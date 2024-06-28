import React from 'react'
import toast from 'react-hot-toast'

const useToast = () => ({
	errorToast: (message: string) =>
		toast.error(() => {
			return <div>{message}</div>
		}),
})

export default useToast
