import type { EffectCode } from "../remote/EffectCodes";

export interface EffectCodeForUi {
    code: string;
    name: string;
    isClicked: boolean;
}

export function convToUiData(effectCode: EffectCode): EffectCodeForUi {
    return {
        code: effectCode.code,
        name: effectCode.name,
        isClicked: false
    };
}