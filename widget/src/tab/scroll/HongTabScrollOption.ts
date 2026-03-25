import type { HongWidgetCommonOption } from '../../HongWidgetCommonOption';
import {
  HongWidgetType,
  type HongWidgetTypeEntry,
  HongLayoutParam,
  defaultHongSpacingInfo,
  type HongSpacingInfo,
  type HongRadiusInfo,
  type HongBorderInfo,
  type HongShadowInfo,
  defaultHongRadiusInfo,
  defaultHongBorderInfo,
  defaultHongShadowInfo,
  HongColor,
} from '../../rule';
import { HongTypo, type HongTypoProps } from '../../rule/typo/HongTypo';

export class HongTabScrollOption<D = any> implements HongWidgetCommonOption {
  type: HongWidgetTypeEntry = HongWidgetType.TAB_SCROLL;
  isValidComponent: boolean = true;

  width: number = HongLayoutParam.MATCH_PARENT.value;
  height: number = HongLayoutParam.WRAP_CONTENT.value;
  margin: HongSpacingInfo = defaultHongSpacingInfo();
  padding: HongSpacingInfo = defaultHongSpacingInfo();
  backgroundColorHex: string = HongColor.TRANSPARENT.hex;
  radius: HongRadiusInfo = defaultHongRadiusInfo();
  border: HongBorderInfo = defaultHongBorderInfo();
  shadow: HongShadowInfo = defaultHongShadowInfo();
  useShapeCircle: boolean = false;
  click: ((option: HongWidgetCommonOption) => void) | null = null;

  /** 탭 데이터 목록 */
  tabList: D[] = [];
  /** 탭 표시 텍스트 목록 (tabList와 1:1 대응) */
  tabTextList: string[] = [];

  // ─── 선택된 탭 스타일 ─────────────────────────────────────────────
  selectTabTextTypo: HongTypoProps = HongTypo.BODY_14_B;
  selectTabTextColorHex: string = HongColor.WHITE_100.hex;
  selectBackgroundColorHex: string = HongColor.MAIN_ORANGE_100.hex;
  selectBorderColorHex: string = HongColor.MAIN_ORANGE_100.hex;
  selectBorderWidth: number = 0;

  // ─── 미선택 탭 스타일 ─────────────────────────────────────────────
  unselectTabTextTypo: HongTypoProps = HongTypo.BODY_14_B;
  unselectTabTextColorHex: string = HongColor.BLACK_100.hex;
  unselectBackgroundColorHex: string = HongColor.WHITE_100.hex;
  unselectBorderColorHex: string = HongColor.LINE.hex;
  unselectBorderWidth: number = 1;

  // ─── 간격 설정 ────────────────────────────────────────────────────
  /** 탭 사이 간격 */
  tabBetweenPadding: number = 0;
  /** 탭 텍스트 좌우 패딩 */
  tabTextHorizontalPadding: number = 16;
  /** 탭 텍스트 상하 패딩 */
  tabTextVerticalPadding: number = 8;

  // ─── 초기값 / 콜백 ───────────────────────────────────────────────
  /** 최초 선택 탭 인덱스 */
  initialSelectIndex: number = 0;
  /** 탭 클릭 콜백 */
  tabClick: ((index: number, item: D) => void) | null = null;
}
