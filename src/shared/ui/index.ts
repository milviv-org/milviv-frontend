// UI-kit по дизайн-системе MILVIV (docs/DESIGN.md). Компоненты не знают о домене.
// Интерактивные — обёртки над Reka UI (ADR 0010); сам Reka за пределами shared/ui не импортируется.
// Иконки — напрямую из `~icons/lucide/<name>`; размер задаёт `--mv-icon-size`.
export { default as AppBadge } from './badge/AppBadge.vue'
export { default as AppButton } from './button/AppButton.vue'
export { default as AppIconButton } from './button/AppIconButton.vue'
export { default as AppCheckbox } from './checkbox/AppCheckbox.vue'
export { default as AppConfirm } from './dialog/AppConfirm.vue'
export { default as AppDialog } from './dialog/AppDialog.vue'
export { default as AppDrawer } from './drawer/AppDrawer.vue'
export { default as AppEmptyState } from './empty-state/AppEmptyState.vue'
export { default as AppField } from './field/AppField.vue'
export { default as AppInput } from './field/AppInput.vue'
export { default as AppSelect } from './field/AppSelect.vue'
export { default as AppTextarea } from './field/AppTextarea.vue'
export { default as AppDropdownMenu } from './menu/AppDropdownMenu.vue'
export { default as AppMenuItem } from './menu/AppMenuItem.vue'
export { default as AppMenuLabel } from './menu/AppMenuLabel.vue'
export { default as AppMenuSeparator } from './menu/AppMenuSeparator.vue'
export { default as AppProgress } from './progress/AppProgress.vue'
export { default as AppUiProvider } from './provider/AppUiProvider.vue'
export { default as AppSegmented } from './segmented/AppSegmented.vue'
export { default as AppSkeleton } from './skeleton/AppSkeleton.vue'
export { default as AppSpinner } from './spinner/AppSpinner.vue'
export { default as AppSwitch } from './switch/AppSwitch.vue'
export { default as AppTabs } from './tabs/AppTabs.vue'
export { default as AppTooltip } from './tooltip/AppTooltip.vue'

export type {
  BadgeTone,
  ButtonVariant,
  ChoiceOption,
  ControlSize,
  TabItem,
  TooltipSide,
} from './types'
