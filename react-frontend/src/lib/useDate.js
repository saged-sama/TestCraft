export function dateExtractFromMySQLDateTime(MySQLDateTime){
        
    const date = new Date(Date.parse(MySQLDateTime));

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayOfWeek = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}, ${year} at ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    return formattedDate;
}