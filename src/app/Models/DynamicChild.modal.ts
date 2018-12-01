import { Type } from "@angular/core";

export interface DynamicChild {
    instance: Type<any>,
    inputs: Object,
    outputs: Object,
}
  