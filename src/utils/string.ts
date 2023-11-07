export const replaceAll = (string: string, search: string, replace: string): string => {
    let occurenceCount = 0;

    for (let i = 0; i < string.length; i++) {
        if (string[i] == search) {
            occurenceCount++;
        }
    }

    let returnString = string

    for (let i = 0; i < occurenceCount; i++) {
        returnString = returnString.replace(search, replace);
    }

    return returnString;
}