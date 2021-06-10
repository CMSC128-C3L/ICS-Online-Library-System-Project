function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}

// For sorting a certain field
// order === 'asc' | 'desc'
// orderBy === <field>
export function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// General sort function
// array === array to be sorted
// comparator === getComparator | <comparison function>
export function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// Accepts date object, outputs date formatted in '<month> <date>, <year> <time>'
export function formatDateObject(date) {
  return date
    ? new Intl.DateTimeFormat('en-us', {dateStyle: 'medium', timeStyle: 'short'}).format(date)
    : ''
}