'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ButtonComponent, CheckBoxComponent } from '@syncfusion/ej2-react-buttons'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import type { z } from 'zod'

import { APP_ROUTER } from '@/common/config'
import { RHFDynamicInput } from '@/components/inputs'
import { useGetAllRolesDashBoard } from '@/view/admin/roles/hooks'
import { useGetUserById } from '@/view/admin/users/hooks/useGetUserById'
import { useInsertUserRole } from '@/view/admin/users/hooks/useInsertUserRole'
import { useUpdateUserInfor } from '@/view/admin/users/hooks/useUpdateUserInfor'
import type { IUpdateUserInforRequestDto } from '@/view/admin/users/types'
import { UpdateUserFormValidation } from '@/view/admin/users/validations'

type UpdateFormFields = z.infer<typeof UpdateUserFormValidation>

export function UserUpdatePage() {
	const translate = useTranslations('UpdateInsertUser')
	const router = useRouter()
	const params = useSearchParams()

	const handleBack = () => {
		router.push(APP_ROUTER.paths.admin.users.path)
	}

	const roleIdsRef = useRef<string[]>([])

	const { data: userData, isLoading: userDataIsLoading } = useGetUserById(params.get('id') || '')
	const { data: roleData } = useGetAllRolesDashBoard({ PageNumber: 1, PageSize: 999 })

	const { mutate: handleUpdate } = useUpdateUserInfor()
	const { mutate: handleInsertUserRole } = useInsertUserRole()

	const methods = useForm<UpdateFormFields>({ resolver: zodResolver(UpdateUserFormValidation) })

	const formFields = [
		{
			type: 'text',
			name: 'lastName',
			label: translate('label_lastname'),
			required: true,
			placeholder: translate('placeholder_lastname'),
			defaultValue: userData?.lastName || '',
		},
		{
			type: 'text',
			name: 'firstName',
			label: translate('label_firstname'),
			required: true,
			placeholder: translate('placeholder_firstname'),
			defaultValue: userData?.firstName || '',
		},
		{
			type: 'radio',
			name: 'isReverse',
			label: 'Chọn họ tên sau khi cập nhật',
			required: true,
			radioOptions: [
				{ value: false, label: 'Họ và tên', id: 'isReverse_02' },
				{ value: true, label: 'Tên và Họ', id: 'isReverse_01' },
			],
		},
	]

	const onSubmit: SubmitHandler<UpdateFormFields> = (_formData) => {
		const isReverse = _formData.isReverse === 'true'
		const data = {
			..._formData,
			isReverse,
			id: params.get('id') || '',
		}
		handleUpdate(data as IUpdateUserInforRequestDto)
	}

	if (userDataIsLoading) {
		return <>{translate('load_data')}</>
	}

	// eslint-disable-next-line react-hooks/rules-of-hooks
	// useEffect(() => {
	// 	handleInsertUserRole({ userId: params.get('id') || '', roleIds })
	// }, [roleIds])

	return (
		<div className="flex flex-col gap-5 text-[var(--color-surface-999)]">
			<div className="flex items-center gap-5">
				<button type="button" className="material-symbols-outlined" onClick={handleBack}>
					arrow_back_ios
				</button>
				<span className="text-xl font-semibold">{translate('meta_title_update')}</span>
			</div>

			<div className="mt-5 flex flex-col gap-8">
				<FormProvider {...methods}>
					<form
						onSubmit={methods.handleSubmit(onSubmit)}
						className="flex w-full flex-col gap-6 rounded border bg-[var(--color-login-form-bg)] p-3"
					>
						<section className="flex flex-col gap-10">
							<div className="flex w-full items-center gap-3">
								<span className="e-avatar e-avatar-circle shrink-0">
									{userData?.username.substring(0, 2).toUpperCase()}
								</span>

								<div className="min-w-0">
									<p className="text-2xl font-bold">{userData?.fullName}</p>
								</div>
							</div>
							<div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
								{formFields.map((field) => {
									return (
										<div
											key={field.name}
											className={`flex w-full flex-col gap-1 ${field.type === 'radio' && 'col-start-1 col-end-3'}`}
										>
											<RHFDynamicInput
												name={field.name}
												type={field.type as 'text' | 'checkbox' | 'radio'}
												label={field?.label}
												placeholder={field?.placeholder}
												required={field?.required}
												defaultValue={field?.defaultValue}
												radioOptions={field?.radioOptions}
											/>
										</div>
									)
								})}
							</div>

							<section className="flex flex-col gap-3">
								<p>Assign Roles</p>
								<div className="flex w-full flex-wrap gap-3">
									{roleData?.items.map((role) => {
										return (
											<CheckBoxComponent
												key={role?.id}
												name={role?.name}
												type="checkbox"
												label={role?.name}
												change={(e: any) => {
													if (e?.checked) {
														roleIdsRef.current = [...roleIdsRef.current, role.id]
														handleInsertUserRole({
															userId: params.get('id') || '',
															roleIds: roleIdsRef.current,
														})
													} else {
														roleIdsRef.current = roleIdsRef.current.filter(
															(item) => item !== role.id
														)
														handleInsertUserRole({
															userId: params.get('id') || '',
															roleIds: roleIdsRef.current,
														})
													}
												}}
											/>
										)
									})}
								</div>
							</section>

							<div className="flex w-full flex-col gap-1">
								<ButtonComponent type="submit" className="e-primary w-full">
									{translate('button_update')}
								</ButtonComponent>
							</div>
						</section>
					</form>
				</FormProvider>
			</div>
		</div>
	)
}
