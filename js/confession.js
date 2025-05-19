/**
 * 终极表白仪式脚本
 */

let fireworks;

/**
 * 初始化表白仪式
 */
function initConfession() {
    // 设置爱情证书信息
    $('#lover1').text(CONFIG.certificate.lover1);
    $('#lover2').text(CONFIG.certificate.lover2);
    
    // 绑定下载证书按钮
    $('#download-cert').on('click', function() {
        downloadCertificate();
    });
    
    // 初始化礼物二维码
    initGiftQRCode();
    
    // 绑定点击事件触发烟花
    $('#confession').on('click', function(e) {
        // 排除按钮点击
        if (!$(e.target).closest('button').length) {
            triggerFirework(e.pageX, e.pageY);
        }
    });
}

/**
 * 开始玫瑰动画
 */
function startRoseAnimation() {
    // 获取玫瑰容器
    const $roseContainer = $('.rose-container');
    
    // 清空容器
    $roseContainer.empty();
    
    // 创建多个玫瑰
    for (let i = 0; i < 30; i++) {
        // 随机位置
        const left = getRandomNumber(0, 100);
        const top = getRandomNumber(0, 100);
        const size = getRandomNumber(30, 80);
        const delay = getRandomNumber(0, 2000);
        
        // 创建玫瑰元素
        const $rose = $('<div class="rose"></div>');
        
        // 设置样式
        $rose.css({
            left: left + '%',
            top: top + '%',
            width: size + 'px',
            height: size + 'px',
            animationDelay: delay + 'ms'
        });
        
        // 添加到容器
        $roseContainer.append($rose);
    }
}

/**
 * 开始烟花动画
 */
function startFireworks() {
    // 获取烟花容器
    const $fireworksContainer = $('.fireworks-container')[0];
    
    // 创建烟花实例
    fireworks = new Fireworks($fireworksContainer, {
        autoresize: true,
        opacity: 0.5,
        acceleration: 1.05,
        friction: 0.97,
        gravity: 1.5,
        particles: 50,
        traceLength: 3,
        traceSpeed: 10,
        explosion: 5,
        intensity: 30,
        flickering: 50,
        lineStyle: 'round',
        hue: {
            min: 0,
            max: 360
        },
        delay: {
            min: 30,
            max: 60
        },
        rocketsPoint: {
            min: 50,
            max: 50
        },
        lineWidth: {
            explosion: {
                min: 1,
                max: 3
            },
            trace: {
                min: 1,
                max: 2
            }
        },
        brightness: {
            min: 50,
            max: 80
        },
        decay: {
            min: 0.015,
            max: 0.03
        },
        mouse: {
            click: false,
            move: false,
            max: 1
        }
    });
    
    // 开始烟花
    fireworks.start();
}

/**
 * 触发烟花
 * @param {number} x - X坐标
 * @param {number} y - Y坐标
 */
function triggerFirework(x, y) {
    // 如果烟花实例存在，则触发烟花
    if (fireworks) {
        // 计算相对位置
        const containerRect = $('.fireworks-container')[0].getBoundingClientRect();
        const relX = x - containerRect.left;
        const relY = y - containerRect.top;
        
        // 触发烟花
        fireworks.launch(1, {
            x: relX,
            y: relY,
            hue: getRandomNumber(0, 360)
        });
    }
}

/**
 * 初始化礼物二维码
 */
function initGiftQRCode() {
    // 获取二维码URL
    const qrcodeUrl = CONFIG.giftQRCodeUrl;
    
    // 如果没有URL，则返回
    if (!qrcodeUrl) {
        return;
    }
    
    // 清空二维码容器
    $('#qrcode').empty();
    
    // 直接创建图片元素显示二维码
    const $img = $('<img>');
    $img.attr('src', qrcodeUrl);
    $img.css({
        'width': '150px',
        'height': '150px',
        'border-radius': '5px'
    });
    
    // 添加到容器
    $('#qrcode').append($img);
    
    // 添加错误处理
    $img.on('error', function() {
        console.error('二维码图片加载失败');
        $('#qrcode').html('<p style="color:red">二维码加载失败</p>');
    });
}

/**
 * 下载爱情证书
 */
function downloadCertificate() {
    // 创建一个新的窗口
    const printWindow = window.open('', '_blank');
    
    // 获取证书内容（不包括下载按钮）
    const certificateContent = `
        <h2>爱情证书</h2>
        <p>兹证明</p>
        <div class="names">
            <span>${CONFIG.certificate.lover1}</span> ❤️ <span>${CONFIG.certificate.lover2}</span>
        </div>
        <p>永远相爱</p>
        <p class="date">日期: ${formatDate(new Date())}</p>
    `;
    
    // 设置打印窗口内容
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>爱情证书</title>
            <style>
                body {
                    font-family: 'Microsoft YaHei', Arial, sans-serif;
                    background-color: #fff8f8;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                .certificate {
                    background-color: #ffebee;
                    padding: 40px;
                    border-radius: 10px;
                    text-align: center;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    width: 600px;
                    border: 2px solid #d81b60;
                }
                h2 {
                    font-size: 32px;
                    margin-bottom: 20px;
                    color: #d81b60;
                }
                .names {
                    font-size: 28px;
                    margin: 20px 0;
                    font-weight: bold;
                }
                .date {
                    margin-top: 20px;
                    font-style: italic;
                }
                @media print {
                    body {
                        background-color: white;
                    }
                    .certificate {
                        box-shadow: none;
                    }
                }
            </style>
        </head>
        <body>
            <div class="certificate">
                ${certificateContent}
            </div>
            <script>
                // 自动打印
                window.onload = function() {
                    window.print();
                };
            </script>
        </body>
        </html>
    `);
    
    // 关闭文档
    printWindow.document.close();
}