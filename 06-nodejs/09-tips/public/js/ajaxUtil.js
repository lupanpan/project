/**
 * 2016/11/11
 * 修改时间：2017/05/18
 */
var ajax = {
	load:function(url, data, onsuccess, dataType){
		if(!dataType){
			dataType = "json";
		}

		$.ajax({
	        url: url,
	        type: "post",
	        dataType: dataType,
	        data:data,
	        async: true,
	        beforeSend: function () {
	        	
	        },
	        success: function (data, textStatus) {
	            if (data != null) {
	                if (onsuccess) {
	                    onsuccess(data);
	                }
	            }
	        },
	        error: function (x, e, c) {
	            alert("查询失败！  : " + e);
	        },
	        complete: function (XMLHttpRequest, textStatus) {
				
	        }
	    });
	}
};