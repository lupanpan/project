/**
 * 2016/11/24
 */
function getFormatDate(date, pattern) {  
    if (date == undefined) {  
        date = new Date();  
    }  
    if (pattern == undefined) {  
        pattern = "yyyy-MM-ddhh:mm:ss";  
    }  
    return date.format(pattern);  
}
var dataUtil = {
	getFormatDateByLong:function(l, pattern){
		return dataUtil.getFormatDate(new Date(l), pattern);  
	},
	getFormatDate:function(date, pattern) {  
	    if (date == undefined) {  
	        date = new Date();  
	    }  
	    if (pattern == undefined) {  
	        pattern = "yyyy-MM-ddhh:mm:ss";  
	    }  
	    return date.format(pattern);  
	},
	/*通过年月获取周*/
	getWeekByYearMonth:function(year,month){
		if(!year||!month){
			return null;
		}
		var str = year+"-"+month+"-01 00:00:00";
		var monthStartDate = new Date(Date.parse(str.replace(/-/g,"/")));
		var monthLastDate = dataUtil.getMonthLastDateNum(year,month);
		var weekArr = [];
		var objWeek = dataUtil.getWeekNumByDay(monthStartDate);
		weekArr.push(objWeek);
		var endDayTime = new Date(Date.parse((objWeek.endDay+" -00:00:00").replace(/-/g,"/")));
		while(endDayTime.getTime()<monthLastDate.getTime()){
			endDayTime = new Date(Date.parse((objWeek.endDay+" -00:00:00").replace(/-/g,"/")));
			endDayTime.setDate(endDayTime.getDate()+1);
			var endDayTimeStr = endDayTime.getFullYear() + "-" + dataUtil.fillZero((endDayTime.getMonth()+1)) + "-" + dataUtil.fillZero(endDayTime.getDate())+" -00:00:00";
			endDayTime = new Date(Date.parse(endDayTimeStr.replace(/-/g,"/")));
			objWeek = dataUtil.getWeekNumByDay(endDayTime);
			weekArr.push(objWeek);
		}
		return weekArr;
	},
	/*获取月的最后一天*/
	getMonthLastDateNum:function(year,month){
		var   firstdate = year + '-' + month + '-01';  
        var  day = new Date(year,month,0);   
        var lastdate = year + '-' + month + '-' + day.getDate();
        return new Date(Date.parse((lastdate+" -00:00:00").replace(/-/g,"/")));;  
	},
	/*获取某一天的周NO。*/
	getWeekNumByDay:function(date){
		var year = date.getFullYear();
		var month = date.getMonth();
		var days = date.getDate();
		//那一天是那一年中的第多少天
		for (var i = 0; i < month; i++) {
		    days += dataUtil.getMonthDays(year, i);
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
		rtnObj.startDay = dataUtil.getMonDay(date);
		rtnObj.endDay = dataUtil.getSunDay(date);
		console.log(week);
		return rtnObj;
	},
	isLeapYear:function(year) {
		return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
	},
	getMonthDays:function(year, month) {
		return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (dataUtil.isLeapYear(year) ? 29 : 28);
	},
	getMonDay:function(date){
		var day =  date.getDay();
		var n =0;
		if(day==0){
			n=6;
		}else{
			n=day-1;
		}
		var uom = date;
		uom.setDate(uom.getDate()-n); 
		uom = uom.getFullYear() + "-" + dataUtil.fillZero((uom.getMonth()+1)) + "-" + dataUtil.fillZero(uom.getDate()); 
		return uom;
	},
	getSunDay:function(date){
		var day =  date.getDay();
		var n =0;
		if(day==0){
			n=0;
		}else{
			n=7-day;
		}
		var uom = date;
		uom.setDate(uom.getDate()+n); 
		uom = uom.getFullYear() + "-" + dataUtil.fillZero((uom.getMonth()+1)) + "-" + dataUtil.fillZero(uom.getDate()); 
		return uom;
	},
	//小于10的补0
	fillZero:function(num){
		if(num<10){
			return "0"+num;
		}
		return num;
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