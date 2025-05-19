/**
 * 趣味互动游戏脚本
 */

let heartGameTimer;
let heartGameScore = 0;
let heartGameTime = 0;
let puzzlePieces = [];

/**
 * 初始化游戏
 */
function initGames() {
    // 绑定游戏选择按钮
    $('.game-btn').on('click', function() {
        const gameId = $(this).data('game');
        switchGame(gameId);
    });
    
    // 初始化爱心捕捉游戏
    initHeartCatcherGame();
    
    // 初始化记忆拼图游戏
    initPuzzleGame();
}

/**
 * 切换游戏
 * @param {string} gameId - 游戏ID
 */
function switchGame(gameId) {
    // 隐藏所有游戏
    $('.game-area').removeClass('active');
    
    // 显示选中的游戏
    if (gameId === 'heart-catcher') {
        $('#heart-catcher').addClass('active');
    } else if (gameId === 'puzzle') {
        $('#puzzle-game').addClass('active');
    }
}

/**
 * 重置游戏
 */
function resetGames() {
    // 重置爱心捕捉游戏
    resetHeartCatcherGame();
    
    // 重置记忆拼图游戏
    resetPuzzleGame();
    
    // 默认显示爱心捕捉游戏
    switchGame('heart-catcher');
}

/**
 * 初始化爱心捕捉游戏
 */
function initHeartCatcherGame() {
    // 绑定开始游戏按钮
    $('#heart-catcher .start-game-btn').on('click', function() {
        startHeartCatcherGame();
    });
}

/**
 * 开始爱心捕捉游戏
 */
function startHeartCatcherGame() {
    // 重置游戏
    resetHeartCatcherGame();
    
    // 隐藏开始按钮
    $('#heart-catcher .start-game-btn').hide();
    
    // 隐藏结果
    $('#heart-catcher .game-result').hide();
    
    // 设置游戏时间
    heartGameTime = CONFIG.heartCatcherGame.duration;
    $('#heart-timer').text(heartGameTime);
    
    // 确保游戏区域是可见的
    $('#heart-catcher .game-field').show();
    
    // 生成爱心
    generateHearts();
    
    // 开始计时
    heartGameTimer = setInterval(function() {
        heartGameTime--;
        $('#heart-timer').text(heartGameTime);
        
        // 时间到，结束游戏
        if (heartGameTime <= 0) {
            endHeartCatcherGame();
        }
    }, 1000);
}

/**
 * 重置爱心捕捉游戏
 */
function resetHeartCatcherGame() {
    // 清除计时器
    if (heartGameTimer) {
        clearInterval(heartGameTimer);
        heartGameTimer = null; // 确保计时器变量被正确清除
    }
    
    // 重置分数
    heartGameScore = 0;
    $('#heart-score').text(heartGameScore);
    
    // 重置时间
    heartGameTime = CONFIG.heartCatcherGame.duration;
    $('#heart-timer').text(heartGameTime);
    
    // 清空游戏区域
    $('#heart-catcher .game-field').empty();
    
    // 显示开始按钮
    $('#heart-catcher .start-game-btn').show();
    
    // 隐藏游戏结果
    $('#heart-catcher .game-result').hide();
}

/**
 * 生成爱心
 */
function generateHearts() {
    // 获取游戏区域
    const $gameField = $('#heart-catcher .game-field');
    
    // 清空游戏区域
    $gameField.empty();
    
    // 获取爱心数量
    const heartCount = CONFIG.heartCatcherGame.heartCount;
    
    // 生成爱心
    for (let i = 0; i < heartCount; i++) {
        // 创建爱心元素 - 使用img标签直接显示图片
        const $heart = $('<img src="assets/images/heart.png" class="heart-item" />');
        
        // 随机位置 - 调整范围确保爱心完全在可视区域内
        const left = getRandomNumber(5, 85);
        const top = getRandomNumber(5, 85);
        
        // 设置位置和样式
        $heart.css({
            position: 'absolute',
            left: left + '%',
            top: top + '%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            zIndex: 10
        });
        
        // 绑定点击事件
        $heart.on('click', function() {
            // 增加分数
            heartGameScore++;
            $('#heart-score').text(heartGameScore);
            
            // 移除爱心
            $(this).remove();
            
            // 如果所有爱心都被点击，提前结束游戏
            if ($('#heart-catcher .game-field .heart-item').length === 0) {
                endHeartCatcherGame();
            }
        });
        
        // 添加到游戏区域
        $gameField.append($heart);
    }
}

/**
 * 结束爱心捕捉游戏
 */
function endHeartCatcherGame() {
    // 清除计时器
    if (heartGameTimer) {
        clearInterval(heartGameTimer);
        heartGameTimer = null; // 确保计时器变量被正确清除
    }
    
    // 清空游戏区域中的所有爱心
    $('#heart-catcher .game-field').empty();
    
    // 显示结果
    const $gameResult = $('#heart-catcher .game-result');
    $gameResult.empty();
    
    // 添加结果内容
    $gameResult.append(`<h3>游戏结束</h3>`);
    $gameResult.append(`<p>你的得分: ${heartGameScore}</p>`);
    
    // 添加鼓励语
    const encouragements = CONFIG.heartCatcherGame.encouragements;
    if (encouragements && encouragements.length > 0) {
        const randomIndex = getRandomNumber(0, encouragements.length - 1);
        $gameResult.append(`<p>${encouragements[randomIndex]}</p>`);
    }
    
    // 添加重新开始按钮
    const $restartBtn = $('<button class="restart-game-btn">再来一次</button>');
    $restartBtn.on('click', function() {
        startHeartCatcherGame();
    });
    $gameResult.append($restartBtn);
    
    // 显示结果
    $gameResult.show();
    
    // 确保结果显示在游戏区域上方
    $gameResult.css('z-index', '20');
}

/**
 * 初始化记忆拼图游戏
 */
function initPuzzleGame() {
    // 绑定照片上传事件
    $('#puzzle-upload').on('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // 创建拼图
                createPuzzle(e.target.result);
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    // 绑定开始游戏按钮
    $('#puzzle-game .start-game-btn').on('click', function() {
        // 如果已经创建了拼图，则开始游戏
        if (puzzlePieces.length > 0) {
            shufflePuzzle();
        } else {
            alert('请先上传照片');
        }
    });
}

/**
 * 重置记忆拼图游戏
 */
function resetPuzzleGame() {
    // 清空拼图
    puzzlePieces = [];
    $('.puzzle-board').empty();
    $('.puzzle-info').empty();
}

/**
 * 创建拼图
 * @param {string} imageUrl - 图片URL
 */
function createPuzzle(imageUrl) {
    // 重置拼图
    resetPuzzleGame();
    
    // 获取拼图容器
    const $puzzleBoard = $('.puzzle-board');
    
    // 创建图片对象
    const img = new Image();
    img.onload = function() {
        // 创建3x3拼图
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                // 创建拼图块
                const $piece = $('<div class="puzzle-piece"></div>');
                
                // 设置背景图片
                $piece.css({
                    'background-image': `url(${imageUrl})`,
                    'background-position': `-${col * 100}px -${row * 100}px`
                });
                
                // 存储拼图块信息
                const piece = {
                    element: $piece,
                    row: row,
                    col: col,
                    currentRow: row,
                    currentCol: col
                };
                
                // 添加到拼图数组
                puzzlePieces.push(piece);
                
                // 绑定点击事件
                $piece.on('click', function() {
                    movePuzzlePiece(piece);
                });
                
                // 添加到拼图容器
                $puzzleBoard.append($piece);
            }
        }
        
        // 显示拍摄信息
        $('.puzzle-info').text('点击"开始游戏"打乱拼图');
    };
    
    // 加载图片
    img.src = imageUrl;
}

/**
 * 打乱拼图
 */
function shufflePuzzle() {
    // 随机交换拼图块
    for (let i = 0; i < 20; i++) {
        // 随机选择两个拼图块
        const index1 = getRandomNumber(0, puzzlePieces.length - 1);
        const index2 = getRandomNumber(0, puzzlePieces.length - 1);
        
        // 交换位置
        swapPuzzlePieces(puzzlePieces[index1], puzzlePieces[index2]);
    }
    
    // 更新拼图显示
    updatePuzzleDisplay();
    
    // 显示提示
    $('.puzzle-info').text('点击拼图块移动，还原照片');
}

/**
 * 交换两个拼图块
 * @param {Object} piece1 - 拼图块1
 * @param {Object} piece2 - 拼图块2
 */
function swapPuzzlePieces(piece1, piece2) {
    // 交换当前行列
    const tempRow = piece1.currentRow;
    const tempCol = piece1.currentCol;
    
    piece1.currentRow = piece2.currentRow;
    piece1.currentCol = piece2.currentCol;
    
    piece2.currentRow = tempRow;
    piece2.currentCol = tempCol;
}

/**
 * 移动拼图块
 * @param {Object} piece - 拼图块
 */
function movePuzzlePiece(piece) {
    // 检查是否可以移动
    // 简化版：任意两块可以交换
    // 实际游戏中应该只允许与空白块交换
    
    // 随机选择另一个拼图块
    const randomIndex = getRandomNumber(0, puzzlePieces.length - 1);
    const otherPiece = puzzlePieces[randomIndex];
    
    // 交换位置
    swapPuzzlePieces(piece, otherPiece);
    
    // 更新拼图显示
    updatePuzzleDisplay();
    
    // 检查是否完成
    checkPuzzleComplete();
}

/**
 * 更新拼图显示
 */
function updatePuzzleDisplay() {
    // 更新每个拼图块的位置
    puzzlePieces.forEach(function(piece) {
        piece.element.css({
            'grid-row': piece.currentRow + 1,
            'grid-column': piece.currentCol + 1
        });
    });
}

/**
 * 检查拼图是否完成
 */
function checkPuzzleComplete() {
    // 检查每个拼图块是否在正确位置
    let isComplete = true;
    
    puzzlePieces.forEach(function(piece) {
        if (piece.row !== piece.currentRow || piece.col !== piece.currentCol) {
            isComplete = false;
        }
    });
    
    // 如果完成，显示祝贺信息
    if (isComplete) {
        $('.puzzle-info').html('<strong>恭喜你完成拼图！</strong><br>这是我们在一起的美好回忆');
    }
}