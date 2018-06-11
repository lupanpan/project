/**
 * 
 */
var datePickerOption={
		options:{
			locale:{
	            applyLabel: '确认',
	            cancelLabel: '取消',
	            fromLabel: '从',
	            toLabel: '到',
	            weekLabel: 'W',
	            // customRangeLabel: '自定义时间',
	            daysOfWeek:["日","一","二","三","四","五","六"],
	            monthNames: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
	        },
			ranges:{
				/*'今天': [moment(), moment()],
				'昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
				'近7天': [moment().subtract(7, 'days'), moment().subtract(1, 'days')],
				'近30天': [moment().subtract(30, 'days'), moment().subtract(1, 'days')],
				'本月': [moment().startOf('month'), moment().endOf('month')],
				'上个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
				'近1年': [moment().subtract(11, 'month').startOf('month'), moment().subtract(0, 'month').endOf('month')],
				'近3年': [moment().subtract(35, 'month').startOf('month'), moment().subtract(0, 'month').endOf('month')]*/
			},
			alwaysShowCalendars:true,
			startDate: moment().subtract(7, 'days'),
			endDate: moment().subtract(1, 'days')
		}
};