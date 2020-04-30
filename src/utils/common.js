export function reNull(arr) {
    for (let key in arr) {
        if (!arr[key]) {
            delete arr[key]
        }
    }
    return arr;
}