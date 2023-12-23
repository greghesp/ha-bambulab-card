export default function searchObjectsByIdentifier(array, arrayItem, searchValue) {
    return array.filter(obj => obj[arrayItem].includes(searchValue));
}
