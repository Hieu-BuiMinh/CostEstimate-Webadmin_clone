'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import type { z } from 'zod'

import { APP_ROUTER } from '@/common/config'
import { RHFDynamicInput } from '@/components/inputs'
import { useAddRole, useGetRoleById, useUpdateRole } from '@/view/admin/roles/hooks'
import type { IAddRoleInforRequestDto, IUpdateRoleInforRequestDto } from '@/view/admin/roles/types'
import { UpsertRoleFormValidation } from '@/view/admin/roles/validations'

interface IRoleUpsertPage {
	type: 'edit' | 'create'
}

type UpsertFormFields = z.infer<typeof UpsertRoleFormValidation>

export function RoleUpsertPage({ type }: IRoleUpsertPage) {
	const methods = useForm<UpsertFormFields>({ resolver: zodResolver(UpsertRoleFormValidation) })
	const router = useRouter()
	const params = useSearchParams()

	const handleBack = () => {
		router.push(APP_ROUTER.paths.admin.roles.path)
	}

	const { data: roleData, isLoading: roleDataIsLoading } = useGetRoleById(params.get('id') || '')
	const { mutate: handleUpdate } = useUpdateRole()
	const { mutate: handleAdd } = useAddRole()

	const formFields = [
		{
			type: 'text',
			name: 'roleName',
			label: 'Role Name',
			required: true,
			placeholder: 'Enter role name',
			defaultValue: roleData?.name || '',
		},
	]

	const onSubmit: SubmitHandler<UpsertFormFields> = (_formData) => {
		if (type === 'edit') {
			const data = {
				roleName: _formData.roleName,
				roleId: params.get('id') || '',
			}
			handleUpdate(data as IUpdateRoleInforRequestDto)
		}
		if (type === 'create') {
			const data = {
				roleName: _formData.roleName,
			}
			handleAdd(data as IAddRoleInforRequestDto)
		}
	}

	if (roleDataIsLoading) {
		return <>Loading...</>
	}

	return (
		<div className="flex flex-col gap-5 text-[var(--color-surface-999)]">
			<div className="flex items-center gap-5">
				<button type="button" className="material-symbols-outlined" onClick={handleBack}>
					arrow_back_ios
				</button>
				<span className="text-xl font-semibold">Update role information</span>
			</div>

			<div className="mt-5 flex flex-col gap-8">
				<div className="min-w-0">
					<p className="text-2xl font-bold">{roleData?.name}</p>
					<div className="flex gap-1">
						<span className="material-symbols-outlined">tag</span>
						<p className="line-clamp-1 min-w-0 max-w-[500px]">{params.get('id')}</p>
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
