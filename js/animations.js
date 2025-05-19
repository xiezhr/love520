/**
 * 动画效果脚本
 */

/**
 * 创建樱花/爱心粒子
 * @param {string} container - 容器选择器
 * @param {string} type - 粒子类型 ('cherry' 或 'heart')
 * @param {number} count - 粒子数量
 */
function createParticles(container, type, count) {
    // 获取容器
    const $container = $(container);
    
    // 清空容器
    $container.empty();
    
    // 创建粒子
    for (let i = 0; i < count; i++) {
        // 随机位置和大小
        const left = getRandomNumber(0, 100);
        const size = getRandomNumber(10, 20);
        const delay = getRandomNumber(0, 5);
        const duration = getRandomNumber(5, 10);
        
        // 创建粒子元素
        const $particle = $('<div></div>')
            .addClass('particle')
            .addClass(type === 'cherry' ? 'cherry' : 'heart-particle');
        
        // 设置样式
        $particle.css({
            left: left + '%',
            width: size + 'px',
            height: size + 'px',
            animationDelay: delay + 's',
            animationDuration: duration + 's'
        });
        
        // 添加到容器
        $container.append($particle);
        
        // 动画结束后移除元素
        setTimeout(function() {
            $particle.remove();
        }, (delay + duration) * 1000);
    }
}

/**
 * 创建打字机效果
 * @param {string} selector - 元素选择器
 * @param {string} text - 要显示的文本
 * @param {number} speed - 打字速度（毫秒）
 * @param {Function} callback - 完成后的回调函数
 */
function typewriterEffect(selector, text, speed, callback) {
    // 获取元素
    const $element = $(selector);
    
    // 清空内容
    $element.empty();
    
    // 添加光标
    $element.append('<span class="typewriter-cursor"></span>');
    
    // 逐字显示文本
    let index = 0;
    
    function type() {
        // 如果已经显示完所有文本，则调用回调函数
        if (index >= text.length) {
            if (callback) {
                callback();
            }
            return;
        }
        
        // 获取当前字符
        const char = text.charAt(index);
        
        // 在光标前插入字符
        $('.typewriter-cursor').before(char);
        
        // 移动到下一个字符
        index++;
        
        // 继续显示下一个字符
        setTimeout(type, speed);
    }
    
    // 开始显示
    type();
}

/**
 * 创建彩虹文字效果
 * @param {string} selector - 元素选择器
 */
function rainbowText(selector) {
    // 获取元素
    const $element = $(selector);
    
    // 获取文本
    const text = $element.text();
    
    // 清空内容
    $element.empty();
    
    // 逐字添加带颜色的文本
    for (let i = 0; i < text.length; i++) {
        // 获取当前字符
        const char = text.charAt(i);
        
        // 创建带颜色的字符
        const $char = $('<span></span>').text(char);
        
        // 设置动画延迟
        $char.css('animation-delay', (i * 0.1) + 's');
        
        // 添加彩虹效果类
        $char.addClass('rainbow-text');
        
        // 添加到元素
        $element.append($char);
    }
}

/**
 * 创建心跳动画
 * @param {string} selector - 元素选择器
 */
function heartbeatAnimation(selector) {
    // 获取元素
    const $element = $(selector);
    
    // 添加心跳动画类
    $element.addClass('heart-beat');
}

/**
 * 创建脉冲按钮效果
 * @param {string} selector - 元素选择器
 */
function pulseButtonEffect(selector) {
    // 获取元素
    const $element = $(selector);
    
    // 添加脉冲动画类
    $element.addClass('pulse-btn');
}

/**
 * 创建页面切换动画
 * @param {string} currentSelector - 当前页面选择器
 * @param {string} nextSelector - 下一页面选择器
 * @param {string} direction - 方向 ('left' 或 'right')
 */
function pageTransition(currentSelector, nextSelector, direction) {
    // 获取元素
    const $current = $(currentSelector);
    const $next = $(nextSelector);
    
    // 设置初始状态
    $next.css('display', 'flex');
    
    // 添加动画类
    if (direction === 'right') {
        $current.addClass('slide-out-left');
        $next.addClass('slide-in-right');
    } else {
        $current.addClass('slide-out-right');
        $next.addClass('slide-in-left');
    }
    
    // 动画结束后清理
    setTimeout(function() {
        $current.removeClass('active slide-out-left slide-out-right');
        $next.removeClass('slide-in-right slide-in-left').addClass('active');
    }, 500);
}

/**
 * 创建烟花效果
 * @param {number} x - X坐标
 * @param {number} y - Y坐标
 * @param {string} container - 容器选择器
 */
function createFirework(x, y, container) {
    // 获取容器
    const $container = $(container);
    
    // 创建烟花中心
    const $firework = $('<div class="firework"></div>');
    
    // 设置位置
    $firework.css({
        left: x + 'px',
        top: y + 'px'
    });
    
    // 添加到容器
    $container.append($firework);
    
    // 创建烟花粒子
    const particleCount = 30;
    const colors = ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff'];
    
    for (let i = 0; i < particleCount; i++) {
        // 创建粒子
        const $particle = $('<div class="firework-particle"></div>');
        
        // 随机角度和距离
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 30;
        
        // 计算位置
        const particleX = Math.cos(angle) * distance;
        const particleY = Math.sin(angle) * distance;
        
        // 随机颜色
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // 设置样式
        $particle.css({
            left: 0,
            top: 0,
            backgroundColor: color,
            transform: `translate(${particleX}px, ${particleY}px)`,
            width: Math.random() * 5 + 2 + 'px',
            height: Math.random() * 5 + 2 + 'px',
            borderRadius: '50%',
            position: 'absolute',
            animation: 'explode 1s ease-out forwards'
        });
        
        // 添加到烟花
        $firework.append($particle);
    }
    
    // 动画结束后移除元素
    setTimeout(function() {
        $firework.remove();
    }, 1000);
}