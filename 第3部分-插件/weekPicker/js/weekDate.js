/**
 * Created by Mtime on 2017/8/21.
 */
var weekDate = {
    getFormatDateByLong: function (l, pattern) {
        return weekDate.getFormatDate(new Date(l), pattern);
    },
    getFormatDate: function (date, pattern) {
        if (date == undefined) {
            date = new Date();
        }
        if (pattern == undefined) {
            pattern = "yyyy-MM-ddhh:mm:ss";
        }
        return date.format(pattern);
    },
    /*通过年月获取周*/
    getWeekByYearMonth: function (year, month) {
        if (!year || !month) {
            return null;
        }
        var $nowDate = $("#nowDate").val();
        nowDate = new Date(Date.parse($nowDate.replace(/-/g, "/")));

        var str = year + "-" + month + "-01 00:00:00";
        var monthStartDate = new Date(Date.parse(str.replace(/-/g, "/")));
        var monthLastDate = weekDate.getMonthLastDateNum(year, month);
        var weekArr = [];
        var objWeek = weekDate.getWeekNumByDay(monthStartDate);
        weekArr.push(objWeek);
        var endDayTime = new Date(Date.parse((objWeek.endDay + " -00:00:00").replace(/-/g, "/")));
        while (endDayTime.getTime() < monthLastDate.getTime() && endDayTime.getTime() < nowDate.getTime()) {
            endDayTime = new Date(Date.parse((objWeek.endDay + " -00:00:00").replace(/-/g, "/")));
            endDayTime.setDate(endDayTime.getDate() + 1);
            var endDayTimeStr = endDayTime.getFullYear() + "-" + weekDate.fillZero((endDayTime.getMonth() + 1)) + "-" + weekDate.fillZero(endDayTime.getDate()) + " -00:00:00";
            endDayTime = new Date(Date.parse(endDayTimeStr.replace(/-/g, "/")));
            objWeek = weekDate.getWeekNumByDay(endDayTime);
            weekArr.push(objWeek);
        }
        return weekArr;
    },
    /*获取月的最后一天*/
    getMonthLastDateNum: function (year, month) {
        var firstdate = year + '-' + month + '-01';
        var day = new Date(year, month, 0);
        var lastdate = year + '-' + month + '-' + day.getDate();
        return new Date(Date.parse((lastdate + " -00:00:00").replace(/-/g, "/")));
        ;
    },
    /*获取某一天的周NO。*/
    getWeekNumByDay: function (date) {
        var year = date.getFullYear();
        var month = date.getMonth();
        var days = date.getDate();
        //那一天是那一年中的第多少天
        for (var i = 0; i < month; i++) {
            days += weekDate.getMonthDays(year, i);
        }

        //那一年第一天是星期几
        var yearFirstDay = new Date(year, 0, 1).getDay() || 7;

        var week = null;
        if (yearFirstDay == 1) {
            week = Math.ceil(days / yearFirstDay);
        } else {
            days -= (7 - yearFirstDay + 1);
            week = Math.ceil(days / 7) + 1;
        }

        var rtnObj = {};
        rtnObj.weekNo = week;
        rtnObj.startDay = weekDate.getMonDay(date);
        rtnObj.endDay = weekDate.getSunDay(date);
        if (rtnObj.startDay.substring(0, 4) != rtnObj.endDay.substring(0, 4)) {
            if (rtnObj.startDay.substring(0, 4) != year) {
                rtnObj.startDay = year + "-01-01";
            }
            if (rtnObj.endDay.substring(0, 4) != year) {
                rtnObj.endDay = year + "-12-31";
            }
        }
        console.log(week);
        return rtnObj;
    },
    isLeapYear: function (year) {
        return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
    },
    getMonthDays: function (year, month) {
        return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (weekDate.isLeapYear(year) ? 29 : 28);
    },
    getMonDay: function (date) {
//		var sunday = weekDate.getSunDay(date);

        //判断时间是否当年的第一天
        var day = date.getDay();
        var n = 0;
        if (day == 0) {
            n = 6;
        } else {
            n = day - 1;
        }
        var uom = date;
        uom.setDate(uom.getDate() - n);
        console.log(uom.getFullYear() + "==========" + date.getFullYear());
//		if(uom.getFullYear()!=date.getFullYear()){
//			uom = date.getFullYear() + "-01-01";
//		}else{
        uom = uom.getFullYear() + "-" + weekDate.fillZero((uom.getMonth() + 1)) + "-" + weekDate.fillZero(uom.getDate());
//		}
        return uom;
    },
    getSunDay: function (date) {
//		var monday = weekDate.getMonDay(date);

        //判断时间是否当年的最后一天
        var day = date.getDay();
        var n = 0;
        if (day == 0) {
            n = 0;
        } else {
            n = 7 - day;
        }
        var uom = date;
        uom.setDate(uom.getDate() + n);
        console.log(uom.getFullYear() + "==========" + date.getFullYear());
//		if(uom.getFullYear()!=date.getFullYear()){
//			uom = date.getFullYear() + "-12-31";
//		}else{
        uom = uom.getFullYear() + "-" + weekDate.fillZero((uom.getMonth() + 1)) + "-" + weekDate.fillZero(uom.getDate());
//		}
        return uom;
    },
    /*小于10的补0*/
    fillZero: function (num) {
        if (num < 10) {
            return "0" + num;
        }
        return num;
    },
    /*比较两个时间的大小*/
    compareDate: function (date1, date2) {
        return ((new Date(date1.replace(/-/g, "\/"))) > (new Date(date2.replace(/-/g, "\/"))));
    },
    /*获取上个月的年月*/
    getPrevMonth: function (year, month) {
        if (!year || !month) {
            return null;
        }

        year = parseInt(year);
        month = parseInt(month);

        month = month - 1;
        if (month == 0) {
            month = 12;
            year = year - 1;
        }

        return {
            year: weekDate.fillZero(year),
            month: weekDate.fillZero(month)
        }
    },
    /*获取下个月的年月*/
    getNextMonth: function (year, month) {
        if (!year || !month) {
            return null;
        }

        year = parseInt(year);
        month = parseInt(month);

        month = month + 1;
        if (month == 13) {
            month = 1;
            year = year + 1;
        }

        return {
            year: weekDate.fillZero(year),
            month: weekDate.fillZero(month)
        }
    },
    // 获取指定日期的前几天
    getBeforeDate: function (date, n) {
        var n = n;
        var d = new Date(date);
        var year = d.getFullYear();
        var mon = d.getMonth() + 1;
        var day = d.getDate();
        if (day <= n) {
            if (mon > 1) {
                mon = mon - 1;
            }
            else {
                year = year - 1;
                mon = 12;
            }
        }
        d.setDate(d.getDate() - n);
        year = d.getFullYear();
        mon = d.getMonth() + 1;
        day = d.getDate();
        return year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
    },
    // 获取时间间隔天数
    GetDateDiff: function (startDate, endDate) {
        var startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
        var endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
        var dates = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24);
        return dates;
    }
};
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}