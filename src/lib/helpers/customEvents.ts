import type { customEvent } from "../types/types";

export const dispatchCustomEvent = (eventName: string, detail: customEvent) => {
    const config = new CustomEvent(eventName, {
        bubbles: true,
        cancelable: true,
        detail: detail,
    })

    return dispatchEvent(config)
}