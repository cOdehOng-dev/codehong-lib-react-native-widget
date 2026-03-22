import { HongWidgetCommonBuilder } from 'widget/src/HongWidgetCommonBuilder';
import { HongButtonTextOption } from './HongButtonTextOption';

export class HongButtonTextBuilder extends HongWidgetCommonBuilder<
  HongButtonTextOption,
  HongButtonTextBuilder
> {
  readonly option: HongButtonTextOption = new HongButtonTextOption();

  protected builder(): HongButtonTextBuilder {
    return this;
  }
}
