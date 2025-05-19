/**
 * 时光相册墙脚本
 */

// 存储照片数据
let photoData = [];

// 本地存储键名
const PHOTO_STORAGE_KEY = 'love520_photos';

/**
 * 初始化相册墙
 */
function initPhotoWall() {
    // 从本地存储加载照片数据
    loadPhotosFromStorage();
    
    // 绑定照片上传事件
    $('#photo-upload').on('change', function(e) {
        handlePhotoUpload(e);
    });
    
    // 绑定关闭查看器事件
    $('.close-viewer').on('click', function() {
        closePhotoViewer();
    });
}

/**
 * 从本地存储加载照片数据
 */
function loadPhotosFromStorage() {
    try {
        // 从localStorage获取照片数据
        const storedPhotos = localStorage.getItem(PHOTO_STORAGE_KEY);
        
        // 如果有数据，则解析并加载
        if (storedPhotos) {
            photoData = JSON.parse(storedPhotos);
            
            // 渲染相册
            if (photoData.length > 0) {
                renderPhotoGallery();
            }
        }
    } catch (error) {
        console.error('加载照片数据失败:', error);
    }
}

/**
 * 保存照片数据到本地存储
 */
function savePhotosToStorage() {
    try {
        // 将照片数据转换为JSON字符串并保存到localStorage
        localStorage.setItem(PHOTO_STORAGE_KEY, JSON.stringify(photoData));
    } catch (error) {
        console.error('保存照片数据失败:', error);
    }
}

/**
 * 刷新相册墙
 */
function refreshPhotoWall() {
    // 从本地存储重新加载照片数据
    loadPhotosFromStorage();
    
    // 如果有照片数据，则显示
    if (photoData.length > 0) {
        renderPhotoGallery();
    } else {
        // 显示空状态提示
        const $gallery = $('.photo-gallery');
        $gallery.html('<div class="empty-gallery">上传照片，记录美好瞬间</div>');
    }
}

/**
 * 处理照片上传
 * @param {Event} e - 上传事件
 */
function handlePhotoUpload(e) {
    // 检查是否有文件
    if (!e.target.files || e.target.files.length === 0) {
        return;
    }
    
    // 创建一个计数器来跟踪已处理的文件数量
    let processedCount = 0;
    const totalFiles = e.target.files.length;
    
    // 处理每个文件
    for (let i = 0; i < totalFiles; i++) {
        const file = e.target.files[i];
        
        // 检查是否是图片
        if (!file.type.match('image.*')) {
            processedCount++;
            continue;
        }
        
        // 读取文件
        const reader = new FileReader();
        
        reader.onload = function(event) {
            // 创建照片数据
            const photo = {
                id: 'photo_' + Date.now() + '_' + i,
                src: event.target.result,
                date: new Date().toISOString().split('T')[0],
                location: '美好的地方'
            };
            
            // 添加到照片数据
            photoData.push(photo);
            
            // 增加已处理计数
            processedCount++;
            
            // 如果所有文件都已处理，则渲染相册并保存到本地存储
            if (processedCount >= totalFiles) {
                renderPhotoGallery();
                savePhotosToStorage(); // 保存到本地存储
            }
        };
        
        // 添加错误处理
        reader.onerror = function() {
            console.error('读取文件失败');
            processedCount++;
            
            // 如果所有文件都已处理，则渲染相册
            if (processedCount >= totalFiles) {
                renderPhotoGallery();
                savePhotosToStorage(); // 保存到本地存储
            }
        };
        
        // 读取文件内容
        reader.readAsDataURL(file);
    }
}

/**
 * 渲染相册
 */
function renderPhotoGallery() {
    // 获取相册容器
    const $gallery = $('.photo-gallery');
    
    // 清空容器
    $gallery.empty();
    
    // 添加每张照片
    photoData.forEach(function(photo, index) {
        // 创建照片元素
        const $photoItem = $(`
            <div class="photo-item" data-id="${photo.id}">
                <img src="${photo.src}" alt="照片">
                <div class="photo-info-overlay">
                    <div class="photo-date">${photo.date}</div>
                    <div class="photo-location">${photo.location}</div>
                </div>
                <div class="photo-delete" data-index="${index}">×</div>
            </div>
        `);
        
        // 绑定点击事件
        $photoItem.on('click', function(e) {
            // 如果点击的是删除按钮，则删除照片
            if ($(e.target).hasClass('photo-delete')) {
                deletePhoto(index);
                e.stopPropagation(); // 阻止事件冒泡
            } else {
                openPhotoViewer(photo);
            }
        });
        
        // 添加到相册
        $gallery.append($photoItem);
    });
}

/**
 * 删除照片
 * @param {number} index - 照片索引
 */
function deletePhoto(index) {
    // 从数组中删除照片
    photoData.splice(index, 1);
    
    // 重新渲染相册
    renderPhotoGallery();
    
    // 保存到本地存储
    savePhotosToStorage();
}

/**
 * 打开照片查看器
 * @param {Object} photo - 照片数据
 */
function openPhotoViewer(photo) {
    // 设置照片
    $('.photo-view-container img').attr('src', photo.src);
    
    // 设置信息
    $('.photo-info').html(`
        <div class="photo-date">${photo.date}</div>
        <div class="photo-location">${photo.location}</div>
    `);
    
    // 显示查看器
    $('.photo-viewer').css('display', 'flex');
    
    // 确保图片加载完成
    $('.photo-view-container img').on('load', function() {
        // 调整查看器位置和大小
        const $container = $('.photo-view-container');
        $container.css({
            'display': 'block',
            'margin': 'auto'
        });
    });
    
    // 播放背景音乐
    playBackgroundMusic();
    
    // 添加粒子特效
    addPhotoViewerParticles();
}

/**
 * 关闭照片查看器
 */
function closePhotoViewer() {
    // 隐藏查看器
    $('.photo-viewer').css('display', 'none');
    
    // 清除图片源，防止内存泄漏
    $('.photo-view-container img').attr('src', '');
    
    // 停止背景音乐
    stopBackgroundMusic();
    
    // 清除粒子特效
    clearPhotoViewerParticles();
}

/**
 * 播放背景音乐
 */
function playBackgroundMusic() {
    // 获取音乐列表
    const musicList = CONFIG.musicList;
    
    // 如果没有音乐，则返回
    if (!musicList || musicList.length === 0) {
        return;
    }
    
    // 随机选择一首歌
    const randomIndex = getRandomNumber(0, musicList.length - 1);
    
    // 设置音乐
    $('#bgm').attr('src', musicList[randomIndex].src);
    
    // 播放音乐
    $('#bgm')[0].play();
}

/**
 * 停止背景音乐
 */
function stopBackgroundMusic() {
    // 暂停音乐
    $('#bgm')[0].pause();
}

/**
 * 添加照片查看器粒子特效
 */
function addPhotoViewerParticles() {
    // 创建粒子容器
    const $particlesContainer = $('<div class="viewer-particles"></div>');
    
    // 设置样式
    $particlesContainer.css({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1
    });
    
    // 添加到查看器
    $('.photo-viewer').append($particlesContainer);
    
    // 创建粒子
    for (let i = 0; i < 50; i++) {
        // 创建粒子
        const $particle = $('<div class="particle"></div>');
        
        // 随机位置、大小和颜色
        const left = getRandomNumber(0, 100);
        const size = getRandomNumber(3, 8);
        const hue = getRandomNumber(0, 360);
        const duration = getRandomNumber(3, 8);
        
        // 设置样式
        $particle.css({
            position: 'absolute',
            left: left + '%',
            top: '-10px',
            width: size + 'px',
            height: size + 'px',
            backgroundColor: `hsla(${hue}, 100%, 70%, 0.8)`,
            borderRadius: '50%',
            animation: `fall ${duration}s linear infinite`
        });
        
        // 添加到容器
        $particlesContainer.append($particle);
    }
}

/**
 * 清除照片查看器粒子特效
 */
function clearPhotoViewerParticles() {
    // 移除粒子容器
    $('.viewer-particles').remove();
}