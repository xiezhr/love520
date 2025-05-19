/**
 * 客户端服务器信息脚本
 * 
 * 注意：此文件仅用于在浏览器中显示服务器信息
 * 实际的服务器代码位于项目根目录的server.js文件中
 */

// 在浏览器环境中，显示端口信息
$(document).ready(function() {
    // 创建提示元素
    const $portInfo = $('<div class="port-info"></div>').text('运行在端口: 3006');
    
    // 设置样式
    $portInfo.css({
        position: 'fixed',
        bottom: '5px',
        right: '5px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '5px',
        fontSize: '12px',
        zIndex: 9999
    });
    
    // 添加到页面
    $('body').append($portInfo);
    
    console.log('520表白神器已启动，服务器运行在端口: 3006');
});