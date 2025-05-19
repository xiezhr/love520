/**
 * 浪漫启动页脚本
 */

let dateCounterInterval;

/**
 * 初始化启动页
 */
function initStartPage() {
    // 初始化日期计数器
    resetDateCounter();
    
    // 初始化音乐播放器
    initMusicPlayer();
    
    // 绑定开始按钮事件
    $('#start-btn').on('click', function() {
        // 播放音乐
        $('#bgm')[0].play();
        
        // 跳转到情书页面
        navigateToPage('love-letter');
    });
}

/**
 * 重置日期计数器
 */
function resetDateCounter() {
    // 清除之前的计时器
    if (dateCounterInterval) {
        clearInterval(dateCounterInterval);
    }
    
    // 更新计数器
    updateDateCounter();
    
    // 设置定时更新
    dateCounterInterval = setInterval(updateDateCounter, 1000);
}

/**
 * 更新日期计数器
 */
function updateDateCounter() {
    // 获取初次相识日期
    const firstMeetDate = new Date(CONFIG.firstMeetDate);
    
    // 获取当前日期
    const now = new Date();
    
    // 计算相差的毫秒数
    const diff = now - firstMeetDate;
    
    // 计算天数和小时数
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    // 更新显示
    $('#days-counter').text(days);
    $('#hours-counter').text(hours);
}

/**
 * 初始化音乐播放器
 */
function initMusicPlayer() {
    // 加载音乐列表
    loadMusicList();
    
    // 绑定音乐控制按钮事件
    $('#music-toggle').on('click', function() {
        toggleMusic();
    });
}

/**
 * 加载音乐列表
 */
function loadMusicList() {
    // 获取音乐列表
    const musicList = CONFIG.musicList;
    
    // 如果没有音乐，则返回
    if (!musicList || musicList.length === 0) {
        return;
    }
    
    // 设置第一首歌为默认音乐
    $('#bgm').attr('src', musicList[0].src);
    
    // 如果有多首歌，设置音乐结束后自动播放下一首
    if (musicList.length > 1) {
        $('#bgm')[0].addEventListener('ended', function() {
            playNextMusic();
        });
    }
}

/**
 * 播放下一首音乐
 */
function playNextMusic() {
    // 获取当前音乐源
    const currentSrc = $('#bgm').attr('src');
    
    // 获取音乐列表
    const musicList = CONFIG.musicList;
    
    // 查找当前音乐索引
    let currentIndex = -1;
    for (let i = 0; i < musicList.length; i++) {
        if (musicList[i].src === currentSrc) {
            currentIndex = i;
            break;
        }
    }
    
    // 计算下一首音乐索引
    const nextIndex = (currentIndex + 1) % musicList.length;
    
    // 设置下一首音乐
    $('#bgm').attr('src', musicList[nextIndex].src);
    
    // 播放音乐
    $('#bgm')[0].play();
}

/**
 * 切换音乐播放状态
 */
function toggleMusic() {
    const audio = $('#bgm')[0];
    
    if (audio.paused) {
        audio.play();
        $('#music-toggle').text('🎵');
    } else {
        audio.pause();
        $('#music-toggle').text('🔇');
    }
}