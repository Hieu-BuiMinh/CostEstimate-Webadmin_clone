import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import type { z } from 'zod'

import { APP_ROUTER } from '@/common/config'
import { RHFDynamicInput } from '@/components/inputs'
import { useGetUserById } from '@/view/admin/users/hooks/useGetUserById'
import { useUpdateUserInfor } from '@/view/admin/users/hooks/useUpdateUserInfor'
import type { IUpdateUserInforRequestDto } from '@/view/admin/users/types'
import { UpdateUserFormValidation } from '@/view/admin/users/validations'

interface IUserUpsertPage {
	type: 'edit' | 'create'
}

type UpsertFormFields = z.infer<typeof UpdateUserFormValidation>

export function UserUpsertPage({ type }: IUserUpsertPage) {
	const methods = useForm<UpsertFormFields>({ resolver: zodResolver(UpdateUserFormValidation) })
	const router = useRouter()
	const params = useSearchParams()

	const handleBack = () => {
		router.push(APP_ROUTER.paths.admin.users.path)
	}

	const { data: userData, isLoading: userDataIsLoading } = useGetUserById(params.get('id') || '')
	const { mutate: handleUpdate } = useUpdateUserInfor()

	const formFields = [
		{
			type: 'text',
			name: 'username',
			label: 'Username',
			required: true,
			placeholder: 'Enter username',
			defaultValue: userData?.username || '',
		},
		{
			type: 'text',
			name: 'fullName',
			label: 'FullName',
			required: true,
			placeholder: 'Enter fullName',
			defaultValue: userData?.fullName || '',
		},
		// {
		// 	type: 'text',
		// 	name: 'email',
		// 	label: 'Email',
		// 	required: true,
		// 	placeholder: 'Enter email',
		// 	defaultValue: userData?.email || '',
		// },
		// {
		// 	type: 'text',
		// 	name: 'phoneNumber',
		// 	label: 'PhoneNumber',
		// 	required: true,
		// 	placeholder: 'Enter phoneNumber',
		// 	defaultValue: userData?.phoneNumber || '',
		// },
	]

	const onSubmit: SubmitHandler<UpsertFormFields> = (_formData) => {
		if (type === 'edit') {
			const data = {
				..._formData,
				id: params.get('id') || '',
			}
			handleUpdate(data as IUpdateUserInforRequestDto)
		}
	}

	if (userDataIsLoading) {
		return <>Loading...</>
	}

	return (
		<div className="flex flex-col gap-5 text-[var(--color-surface-999)]">
			<div className="flex items-center gap-5">
				<button type="button" className="material-symbols-outlined" onClick={handleBack}>
					arrow_back_ios
				</button>
				<span className="text-xl font-semibold">Update user information</span>
			</div>

			<div className="mt-5 flex flex-col gap-8">
				<div className="flex w-full items-center gap-3">
					<span className="e-avatar e-avatar-circle shrink-0">
						{userData?.username.substring(0, 2).toUpperCase()}
					</span>

					<div className="min-w-0">
						<p className="text-2xl font-bold">{userData?.fullName}</p>
						<div className="flex gap-1">
							<span className="material-symbols-outlined">tag</span>
							<p className="line-clamp-1 min-w-0 max-w-[500px]">{params.get('id')}</p>
						</div>
					</div>
				</div>

				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)}>
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
							{formFields.map((field) => {
								return (
									<div key={field.name} className="flex w-full flex-col gap-1">
										<RHFDynamicInput
											name={field.name}
											type={field.type as 'text' | 'checkbox' | 'radio'}
											label={field?.label}
											placeholder={field?.placeholder}
											required={field?.required}
											defaultValue={field?.defaultValue}
										/>
									</div>
								)
							})}
						</div>

						<button type="submit">SUBMIT</button>
					</form>
				</FormProvider>
			</div>
		</div>
	)
}
