"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandler = void 0;
// src/Utilities/EventHandler.ts
class EventHandler {
    static addClickListener(elementId, handler) {
        const element = document.getElementById(elementId);
        if (element) {
            element.addEventListener('click', handler);
        }
    }
    static addChangeListener(elementId, handler) {
        const element = document.getElementById(elementId);
        if (element) {
            element.addEventListener('change', handler);
        }
    }
}
exports.EventHandler = EventHandler;
//# sourceMappingURL=EventHandler.js.map