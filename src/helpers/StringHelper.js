export const joinStringProps = (obj, propsToJoin = []) => {
    if (obj == null) return {};
    const joinedObj = {};
    for (const [key, value] of Object.entries(obj)) {
        if (Array.isArray(value) && propsToJoin.includes(key)) {
            joinedObj[key] = value.join('\n') ?? '';
        } else {
            joinedObj[key] = value;
        }
    }

    return joinedObj;
};

export const splitStringProps = (obj, propsToSplit = []) => {
    if (obj == null) return {};
    const splitObj = {};
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string' && propsToSplit.includes(key)) {
            if (!value) {
                splitObj[key] = [];
                continue;
            }
            splitObj[key] = value.split('\n');
        } else {
            splitObj[key] = value;
        }
    }

    return splitObj;
};

export const upperCaseFirstLetter = (string) => {
    if (typeof string !== 'string') return;
    return string[0].toUpperCase() + string.substr(1);
}