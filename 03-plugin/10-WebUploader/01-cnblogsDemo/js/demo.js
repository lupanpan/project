/**
 * Created by Mtime on 2018/10/8.
 */

jQuery(function () {

    // 定义参数
    var $ = jQuery,
        $wrap = $('#uploader'),
        $queue = $('<ul class="filelist"></ul>')
            .appendTo($wrap.find('.queueList')),
        fileCount = 0,
        fileSize = 0,
        ratio = window.devicePixelRatio || 1,
        // 缩略图大小
        thumbnailWidth = 110 * ratio,
        thumbnailHeight = 100 * ratio,
        percentages = {},
        // 是否支持旋转，没看太明白，意思是检测浏览器是否有旋转样式属性吗？
        supportTransition = (function () {
            var s = document.createElement('p').style,
                r = 'transition' in s ||
                    'WebkitTransition' in s ||
                    'MozTransition' in s ||
                    'msTransition' in s ||
                    'OTransition' in s;
            s = null;
            return r;
        })(),
        state = 'pedding',
        // 上传按钮
        $upload = $wrap.find('.uploadBtn'),
        errMsg = '上传失败，请重试',
        uploader;


    // 实例化
    uploader = WebUploader.create({
        pick: {
            id: '#filePicker',
            label: '点击选择文件'
        },
        accept: {
            title: 'myself',
            extensions: 'gif,jpg,jpeg,bmp,png,pdf,doc,docx',
            mimeTypes: 'image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        },
        // swf 文件路径
        swf: '../../plugins-webuploader/Uploader.swf',
        // 这里为.NET的接口
        server: '/TestDemo/ajax/baiduUpload.ashx',
        // 去重， 根据文件名字、文件大小和最后修改时间来生成hash Key
        duplicate: true,
        // 开起分片上传。
        chunked: true
    });

    function setState(val) {
        var file, stats;

        // 判断如果类型相同，则不操作
        if (val === state) {
            return;
        }

        // 移除旧状态，添加新状态
        $upload.removeClass('state-' + state);
        $upload.addClass('state-' + val);

        // 设置全局state为最新状态
        state = val;

        // 判断当前状态
        switch (state) {
            // 待定
            case 'pedding':
                // 移除"queueList"节点的"filled"样式
                $queue.parent().removeClass('filled');
                // 隐藏"filelist"节点
                $queue.hide();

                // 刷新，没明白
                uploader.refresh();
                break;

            case 'ready':
                // 移除"选择文件"按钮的父元素的"element-invisible"样式，
                $('#filePicker').removeClass('element-invisible');
                // 为"queueList"节点添加"filled"样式
                $queue.parent().addClass('filled');
                // 显示"filelist"节点
                $queue.show();

                // 刷新
                uploader.refresh();
                break;

            // 上传中
            case 'uploading':
                // 为"选择文件"按钮
                $('#filePicker').addClass('element-invisible');

                // 设置上传按钮
                $upload.text('暂停上传');
                break;
        }
    }

})