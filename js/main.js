/**
 * 主脚本文件
 */

$(document).ready(function() {
    // 页面导航
    $('.nav-btn, .restart-btn').on('click', function() {
        const targetPage = $(this).data('target');
        navigateToPage(targetPage);
    });

    // 初始化各个模块
    initStartPage();
    initLoveLetter();
    initGames();
    initPhotoWall();
    initConfession();
    
    // 检查URL参数，如果有指定页面则直接跳转
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    if (page) {
        navigateToPage(page);
    }
});

/**
 * 页面导航函数
 * @param {string} targetId - 目标页面ID
 */
function navigateToPage(targetId) {
    // 隐藏当前页面
    $('.page.active').removeClass('active');
    
    // 显示目标页面
    $(`#${targetId}`).addClass('active');
    
    // 特殊页面处理
    switch(targetId) {
        case 'start-page':
            // 重置计时器
            resetDateCounter();
            break;
        case 'love-letter':
            // 重新开始打字机效果
            startTypewriter();
            break;
        case 'games':
            // 重置游戏
            resetGames();
            break;
        case 'photo-wall':
            // 刷新照片墙
            refreshPhotoWall();
            break;
        case 'confession':
            // 触发玫瑰和烟花效果
            startRoseAnimation();
            setTimeout(startFireworks, 1000);
            updateCertificateDate();
            break;
    }
}

/**
 * 生成随机数
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number} - 随机数
 */
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 格式化日期
 * @param {Date} date - 日期对象
 * @returns {string} - 格式化后的日期字符串 (YYYY-MM-DD)
 */
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * 更新证书日期
 */
function updateCertificateDate() {
    const today = new Date();
    $('#cert-date').text(formatDate(today));
}