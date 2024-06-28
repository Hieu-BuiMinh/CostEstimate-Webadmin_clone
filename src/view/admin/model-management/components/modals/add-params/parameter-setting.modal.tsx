import { ListBoxComponent } from '@syncfusion/ej2-react-dropdowns'

import { useGetAllModelParams } from '@/view/admin/model-management/hooks'
import { useGetModelParamSettingById } from '@/view/admin/model-management/hooks/useGetModelParamSettingById'

function ParameterSettingModal() {
	const { data: modelParams } = useGetAllModelParams()
	const { mutate: handleGetModelParamSettingById, data: modelParamSetting } = useGetModelParamSettingById()

	return (
		<div className="grid w-[500px] grid-cols-2 gap-4 max-sm:w-[280px] max-sm:grid-cols-1">
			<section className="col-span-1 flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<span>setting</span>
					<div className="flex gap-1">
						<button type="button" className="material-symbols-outlined size-6 rounded border !text-sm">
							add
						</button>
						<button type="button" className="material-symbols-outlined size-6 rounded border !text-sm">
							edit
						</button>
						<button type="button" className="material-symbols-outlined size-6 rounded border !text-sm">
							remove
						</button>
						<button type="button" className="material-symbols-outlined size-6 rounded border !text-sm">
							content_copy
						</button>
					</div>
				</div>

				<div className="h-[50vh] overflow-y-auto rounded-sm">
					<ListBoxComponent
						change={(e) => {
							handleGetModelParamSettingById(e.items[0].id)
						}}
						cssClass="h-full"
						dataSource={
							(modelParams && modelParams.map((param) => ({ text: param.name, id: param.id }))) || []
						}
					/>
				</div>
			</section>
			<section className="col-span-1 flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<span>Parameter Setting:</span>
					<div className="flex gap-1">
						<button type="button" className="material-symbols-outlined size-6 rounded border !text-sm">
							add
						</button>
						<button type="button" className="material-symbols-outlined size-6 rounded border !text-sm">
							edit
						</button>
						<button type="button" className="material-symbols-outlined size-6 rounded border !text-sm">
							remove
						</button>
						<button type="button" className="material-symbols-outlined size-6 rounded border !text-sm">
							content_copy
						</button>
					</div>
				</div>

				<div className="h-[50vh] overflow-y-auto rounded-sm">
					<ListBoxComponent
						cssClass="h-full"
						dataSource={
							modelParamSetting
								? modelParamSetting?.modelParamDtos?.map((param) => ({
										text: param.name,
										id: param.id,
									}))
								: []
						}
					/>
				</div>
			</section>
		</div>
	)
}

export default ParameterSettingModal
