import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const IncreaseActions = createActionGroup({
  source: 'CounterComponent',
  events: {
    'Load Increases': emptyProps(),
    'Load Increases Success': props<{ data: unknown }>(),
    'Load Increases Failure': props<{ error: unknown }>(),
  }
});
