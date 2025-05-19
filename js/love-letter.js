/**
 * 动态情书系统脚本
 */

let typewriterTimeout;
let particleInterval;

/**
 * 初始化情书系统
 */
function initLoveLetter() {
    // 设置收件人姓名
    $('#recipient').text(CONFIG.recipientName);
    
    // 绑定屏幕点击事件
    $('#love-letter').on('click', function(e) {
        // 排除按钮点击
        if (!$(e.target).closest('.nav-btn').length) {
            showLoveEgg(e.pageX, e.pageY);
        }
    });
    
    // 创建粒子效果
    createParticles();
}

/**
 * 开始打字机效果
 */
function startTypewriter() {
    // 清除之前的超时
    if (typewriterTimeout) {
        clearTimeout(typewriterTimeout);
    }
    
    // 获取情书内容
    const loveLetters = CONFIG.loveLetters;
    
    // 如果没有内容，则返回
    if (!loveLetters || loveLetters.length === 0) {
        return;
    }
    
    // 清空内容
    $('#typewriter').empty();
    
    // 添加光标
    $('#typewriter').append('<span class="typewriter-cursor"></span>');
    
    // 逐行显示情书内容
    let letterIndex = 0;
    let charIndex = 0;
    
    function typeNextChar() {
        // 如果已经显示完所有内容，则返回
        if (letterIndex >= loveLetters.length) {
            return;
        }
        
        // 获取当前行
        const currentLine = loveLetters[letterIndex];
        
        // 如果已经显示完当前行
        if (charIndex >= currentLine.length) {
            // 添加换行
            $('#typewriter').prepend('<p></p>');
            
            // 移动到下一行
            letterIndex++;
            charIndex = 0;
            
            // 继续显示下一行
            typewriterTimeout = setTimeout(typeNextChar, 500);
            return;
        }
        
        // 获取当前字符
        const currentChar = currentLine.charAt(charIndex);
        
        // 在光标前插入字符
        $('.typewriter-cursor').before(currentChar);
        
        // 移动到下一个字符
        charIndex++;
        
        // 继续显示下一个字符
        typewriterTimeout = setTimeout(typeNextChar, getRandomNumber(50, 150));
    }
    
    // 开始显示
    typeNextChar();
}

/**
 * 显示情话彩蛋
 * @param {number} x - 点击位置X坐标
 * @param {number} y - 点击位置Y坐标
 */
function showLoveEgg(x, y) {
    // 获取情话彩蛋
    const loveEggs = CONFIG.loveEggs;
    
    // 如果没有彩蛋，则返回
    if (!loveEggs || loveEggs.length === 0) {
        return;
    }
    
    // 随机选择一个彩蛋
    const randomIndex = getRandomNumber(0, loveEggs.length - 1);
    const eggText = loveEggs[randomIndex];
    
    // 创建彩蛋元素
    const $egg = $('<div class="love-egg"></div>').text(eggText);
    
    // 设置样式
    $egg.css({
        position: 'absolute',
        left: x + 'px',
        top: y + 'px',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '10px 15px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 100,
        opacity: 0,
        transition: 'all 0.3s ease'
    });
    
    // 添加到页面
    $('#love-letter').append($egg);
    
    // 显示彩蛋
    setTimeout(function() {
        $egg.css('opacity', 1);
    }, 10);
    
    // 3秒后隐藏彩蛋
    setTimeout(function() {
        $egg.css('opacity', 0);
        
        // 完全隐藏后移除元素
        setTimeout(function() {
            $egg.remove();
        }, 300);
    }, 3000);
}

/**
 * 创建粒子效果
 */
function createParticles() {
    // 清除之前的间隔
    if (particleInterval) {
        clearInterval(particleInterval);
    }
    
    // 设置粒子类型（樱花/爱心交替）
    let particleType = 'cherry';
    
    // 每隔一段时间创建一个粒子
    particleInterval = setInterval(function() {
        // 创建粒子元素
        const $particle = $('<div></div>').addClass('particle').addClass(particleType);
        
        // 随机位置和大小
        const left = getRandomNumber(0, 100);
        const size = getRandomNumber(10, 20);
        const duration = getRandomNumber(5, 10);
        
        // 设置样式
        $particle.css({
            left: left + '%',
            width: size + 'px',
            height: size + 'px',
            animationDuration: duration + 's'
        });
        
        // 添加到页面
        $('.particles-container').append($particle);
        
        // 动画结束后移除元素
        setTimeout(function() {
            $particle.remove();
        }, duration * 1000);
        
        // 切换粒子类型
        particleType = particleType === 'cherry' ? 'heart-particle' : 'cherry';
    }, 300);
}