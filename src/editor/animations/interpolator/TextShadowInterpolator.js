import { TextShadow } from "../../css-property/TextShadow";
import { makeNumberInterpolator, makeColorInterpolator } from "./Interpolator";

export function makeTextShadowInterpolator (fromValue, toValue, f) {
    const fromValues = fromValue.split(',').map(it => it.trim());
    const toValues = toValue.split(',').map(it => it.trim());

    const len = Math.max(fromValues.length, toValues.length);
    const groups = [] 
    for(var i = 0; i < len; i++) {
        if (!fromValues[i]) {
            fromValues[i] = toValues[i];
        } else if (!toValues[i]) {
            toValues[i] = fromValues[i];
        }

        groups[i] = makeShadowInterpolator(fromValues[i], toValues[i], f);
    }

    return (time) => {
        return groups.map(g => g(time)).join(', ');
    }
}

function makeShadowInterpolator (fromValue, toValue, f) {

    const fromValue = TextShadow.parseStyle(fromValue);
    const toValue = TextShadow.parseStyle(toValue);
    let cloneValue = TextShadow.parseStyle(fromValue);

    const offsetX = makeNumberInterpolator(fromValue.offsetX.value, toValue.offsetX.value, f)
    const offsetY = makeNumberInterpolator(fromValue.offsetY.value, toValue.offsetY.value, f)
    const blurRadius = makeNumberInterpolator(fromValue.blurRadius.value, toValue.blurRadius.value, f)
    const color = makeColorInterpolator(fromValue.color, toValue.color, f)

    return (time) => {
        cloneValue.offsetX.set(offsetX(time));
        cloneValue.offsetY.set(offsetY(time));
        cloneValue.blurRadius.set(blurRadius(time));
        cloneValue.color = color(time);

        return cloneValue.toString();
    }
}