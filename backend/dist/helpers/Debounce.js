"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = void 0;
const timeouts = [];
const findAndClearTimeout = (ticketId) => {
    if (timeouts.length > 0) {
        const timeoutIndex = timeouts.findIndex(timeout => timeout.id === ticketId);
        if (timeoutIndex !== -1) {
            clearTimeout(timeouts[timeoutIndex].timeout);
            timeouts.splice(timeoutIndex, 1);
        }
    }
};
const debounce = (func, wait, ticketId) => {
    return function executedFunction(...args) {
        const later = () => {
            findAndClearTimeout(ticketId);
            func(...args);
        };
        findAndClearTimeout(ticketId);
        const newTimeout = {
            id: ticketId,
            timeout: setTimeout(later, wait)
        };
        timeouts.push(newTimeout);
    };
};
exports.debounce = debounce;
