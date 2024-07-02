import { zodResolver } from '@hookform/resolvers/zod'
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs'
import { useTranslations } from 'next-intl'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface IUpsertModal {
	type: string
	close: () => void
	mutateUpserCallback: ({
		name,
		modelParamName,
		modelParamSettingId,
	}: {
		name?: string
		modelParamName?: string
		modelParamSettingId?: string
	}) => void
	originDataSource?: any
}

const UpsertFormValidation = z.object({
	name: z.string({ message: 'Validation.Auth.SignIn.username_or_email.required_message' }),
})

type LoginFormFields = z.infer<typeof UpsertFormValidation>

function UpserModal({ type, close, mutateUpserCallback, originDataSource }: IUpsertModal) {
	const { handleSubmit, register, formState } = useForm<LoginFormFields>({
		resolver: zodResolver(UpsertFormValidation),
	})
	const translateValidation = useTranslations()

	const onSubmit: SubmitHandler<LoginFormFields> = (data) => {
		switch (type) {
			case 'ADD':
				if (originDataSource?.id) {
					mutateUpserCallback({ modelParamName: data.name, modelParamSettingId: originDataSource.id })
					close()
					return
				}
				close()
				mutateUpserCallback(data)
				break

			default:
				break
		}
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
			<span>Name setting</span>
			<TextBoxComponent {...register('name')} placeholder="Name" type="text" />
			{formState?.errors.name?.message && (
				<span className="text-xs text-red-400">
					{translateValidation(formState?.errors.name?.message as any)}
				</span>
			)}
			<button type="submit">Submit</button>
		</form>
	)
}

export { UpserModal }
