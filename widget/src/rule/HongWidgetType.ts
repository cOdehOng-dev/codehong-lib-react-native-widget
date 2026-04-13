export const HongWidgetType = {
  TEXT: { value: 'Text', allowPlayground: true },
  TEXT_CHECK: { value: 'TextCheck', allowPlayground: true },
  TEXT_UP_DOWN: { value: 'TextUpDown', allowPlayground: true },
  TEXT_UNIT: { value: 'TextUnit', allowPlayground: true },
  TEXT_BADGE: { value: 'TextBadge', allowPlayground: true },
  TEXT_COUNT: { value: 'TextCount', allowPlayground: true },
  IMAGE: { value: 'Image', allowPlayground: true },
  IMAGE_BLUR: { value: 'ImageBlur', allowPlayground: false },
  HEADER_CLOSE: { value: 'HeaderClose', allowPlayground: true },
  HEADER_ICON: { value: 'HeaderIcon', allowPlayground: true },
  TEXT_FIELD: { value: 'TextField', allowPlayground: true },
  TEXT_FIELD_UNDERLINE: { value: 'TextFieldUnderline', allowPlayground: true },
  TEXT_FIELD_TIMER: { value: 'TextFieldTimer', allowPlayground: true },
  TEXT_FIELD_NUMBER: { value: 'TextFieldNumber', allowPlayground: true },
  TEXT_FIELD_BORDER: { value: 'TextFieldBorder', allowPlayground: true },
  TEXT_FIELD_BORDER_SELECT: {
    value: 'TextFieldBorderSelect',
    allowPlayground: true,
  },
  BUTTON_TEXT: { value: 'ButtonText', allowPlayground: true },
  BUTTON_SELECT: { value: 'ButtonSelect', allowPlayground: true },
  BUTTON_ICON: { value: 'ButtonIcon', allowPlayground: true },
  CALENDAR: { value: 'Calendar', allowPlayground: true },
  HORIZONTAL_PAGER: { value: 'HorizontalViewPager', allowPlayground: true },
  TAB_SCROLL: { value: 'TabScroll', allowPlayground: true },
  TAB_SEGMENT: { value: 'TabSegment', allowPlayground: true },
  TAB_FLOW: { value: 'TabFlow', allowPlayground: true },
  CAPTURE_SHARE: { value: 'CaptureShare', allowPlayground: false },
  DYNAMIC_ISLAND: { value: 'DynamicIsland', allowPlayground: false },
  VIDEO_POPUP: { value: 'VideoPopup', allowPlayground: false },
  VIDEO_PLAYER: { value: 'VideoPlayer', allowPlayground: false },
  CHECKBOX: { value: 'Checkbox', allowPlayground: true },
  SWITCH: { value: 'Switch', allowPlayground: true },
  LABEL: { value: 'Label', allowPlayground: true },
  LABEL_INPUT: { value: 'LabelInput', allowPlayground: true },
  LABEL_SELECT_INPUT: { value: 'LabelSelectInput', allowPlayground: false },
  LABEL_SWITCH: { value: 'LabelSwitch', allowPlayground: true },
  LABEL_CHECKBOX: { value: 'LabelCheckbox', allowPlayground: true },
  PICKER: { value: 'Picker', allowPlayground: false },
  BOTTOM_SHEET_SELECT: { value: 'BottomSheetSelect', allowPlayground: false },
  BOTTOM_SHEET_SWIPE: { value: 'BottomSheetSwipe', allowPlayground: false },
  BOTTOM_SHEET_BANK: { value: 'BottomSheetBank', allowPlayground: false },
  BOTTOM_SHEET_MODAL: { value: 'BottomSheetModal', allowPlayground: false },
  GRAPH_LINE: { value: 'GraphLine', allowPlayground: true },
  GRAPH_BAR: { value: 'GraphBar', allowPlayground: true },
  ICON: { value: 'Icon', allowPlayground: true },
  GRID_DRAG_AND_DROP: { value: 'GridDragAndDrop', allowPlayground: false },
  SCROLL_FADE_ANIM_LAYOUT: {
    value: 'ScrollFadeAnimLayout',
    allowPlayground: false,
  },
  PROGRESS: { value: 'Progress', allowPlayground: false },
  LIQUID_GLASS_HEADER: { value: 'LiquidGlassHeader', allowPlayground: false },
  LIQUID_GLASS_TAB_BAR: { value: 'LiquidGlassTabBar', allowPlayground: false },
  SWIPE_CONTAINER: { value: 'SwipeContainer', allowPlayground: false },
  NO_VALUE: { value: 'no_value', allowPlayground: false },
} as const;

export type HongWidgetTypeKey = keyof typeof HongWidgetType;
export type HongWidgetTypeEntry = (typeof HongWidgetType)[HongWidgetTypeKey];

export function stringToHongWidgetType(
  value: string | null | undefined,
): HongWidgetTypeEntry {
  return (
    Object.values(HongWidgetType).find(
      t => t.value.toLowerCase() === (value ?? '').toLowerCase(),
    ) ?? HongWidgetType.NO_VALUE
  );
}
