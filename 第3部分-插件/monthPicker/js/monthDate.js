/**
 * Created by Mtime on 2017/8/21.
 */
var monthDate = {
    /*通过年获取月*/
    getMonthByYear: function (year) {
        if (!year) {
            return null;
        }

        var monthArr = [];
        // 遍历循环月
        for(var i = 1; i <=12; i++){
            monthArr.push({
                "monthNo": i,
                "startDay": year + "-" + monthDate.fillZero(i) + "-01",
                "endDay": year + "-" + monthDate.fillZero(i) + "-" + monthDate.getMonthDays(year,i-1),
            })
        }
        return monthArr;
    },
    /*根据年月获取月数组的对象*/
    getMonthNumByDay: function (date) {
        if (date) {
            return null;
        }
        date = new Date(date);
        var year = date.getFullYear();
        var month = parseInt(monthdate.getMonth());
        var monthObj = {
            "monthNo": month,
            "startDay": year + "-" + monthDate.fillZero(month) + "-01",
            "endDay": year + "-" + monthDate.fillZero(month) + "-" + monthDate.getMonthDays(year,month-1),
        };
        return monthObj;
    },
    /*获取前几个月的第一天*/
    getPrevMonth: function (date,monthNum) {
        if (!date || !monthNum) {
            return null;
        }

        date = new Date(date);
        var year = parseInt(date.getFullYear());
        var month = parseInt(date.getMonth()+1);

        month = month - monthNum;
        if (month <= 0) {
            month = 12;
            year = year - 1;
        }

        return year + "-" + monthDate.fillZero(month) + "-" + "01";
    },
    isLeapYear: function (year) {
        return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
    },
    getMonthDays: function (year, month) {
        return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (monthDate.isLeapYear(year) ? 29 : 28);
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
    /*获取上年*/
    getPrevYear: function (year) {
        if (!year) {
            return null;
        }
        year = parseInt(year);
        year = year - 1;
        return year;
    },
    /*获取下年*/
    getNextYear: function (year) {
        if (!year) {
            return null;
        }
        year = parseInt(year);
        year = year + 1;
        return year;
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