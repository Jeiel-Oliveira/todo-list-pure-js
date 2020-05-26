export const toBrDate = (date) => {
    let FormatDate = date.toLocaleString().split(',')[0].split('/');
    return FormatDate[1]+"/"+FormatDate[0]+"/"+FormatDate[2];
}