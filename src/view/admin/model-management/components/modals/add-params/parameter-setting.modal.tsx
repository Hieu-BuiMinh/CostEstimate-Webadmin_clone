import { useState } from 'react'

import ParamsSettingModalSection from '@/view/admin/model-management/components/modals/add-params/sections/params-setting-modal-section'
import {
	useGetAllModelParams,
	useInsertModelParamsSetting,
	useInsertParamWithSettingId,
} from '@/view/admin/model-management/hooks'
import { useGetModelParamSettingById } from '@/view/admin/model-management/hooks/useGetModelParamSettingById'

function ParameterSettingModal() {
	// 1st
	const { data: modelParams } = useGetAllModelParams()
	// 2nd
	const [currentModelParam, setCurrentModelParam] = useState(modelParams !== undefined ? modelParams[0]?.id : '')
	// 3rd
	const { data: modelParamSetting } = useGetModelParamSettingById(currentModelParam)

	const { mutate: handleInsertModelParam } = useInsertModelParamsSetting()
	const { mutate: handleInsertParams } = useInsertParamWithSettingId()

	const updateCurrentParam = (_id: string) => {
		setCurrentModelParam(_id)
	}

	return (
		<div className="grid w-[500px] grid-cols-2 gap-4 max-sm:w-[280px] max-sm:grid-cols-1">
			<section>
				<ParamsSettingModalSection
					title="ModelParamSetting"
					dataSource={(modelParams && modelParams.map((param) => ({ text: param.name, id: param.id }))) || []}
					mutateUpsertCallback={handleInsertModelParam as () => void}
					updateCurrentParam={updateCurrentParam}
				/>
			</section>
			<section>
				<ParamsSettingModalSection
					title="ModelParam"
					dataSource={
						modelParamSetting
							? modelParamSetting?.modelParamDtos?.map((param) => ({
									text: param.name,
									id: param.id,
								}))
							: []
					}
					mutateUpsertCallback={handleInsertParams as () => void}
					originDataSource={modelParamSetting}
				/>
			</section>
		</div>
	)
}

export default ParameterSettingModal
