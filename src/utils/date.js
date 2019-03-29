function justifyTime(time) {
    if (time < 10) {
        return "0" + time;
    }
    return time;
}
export default {
    getUTC:function(date){
        var time = new Date(date);
        return time.getFullYear() + "-" + justifyTime(time.getMonth() + 1) + "-" + justifyTime(time.getDate()) + " " + justifyTime(time.getHours()) + ":" + justifyTime(time.getMinutes()) + ":" + justifyTime(time.getSeconds())
    }
}