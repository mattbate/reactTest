export const CHANGE_FILTERS = 'CHANGE_FILTERS';

export function changeFilter(keyValuePairs){
    return {
        type: CHANGE_FILTERS,
        payload: keyValuePairs
    }
}