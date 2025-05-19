/**
 * 520表白神器配置文件
 */

const CONFIG = {
    // 初始相识日期（格式：年-月-日）
    firstMeetDate: '2023-05-20',
    
    // 收件人姓名
    recipientName: '未来的您',
    
    // 情书内容
    loveLetters: [
        '从遇见你的那一刻起，我的世界就开始变得不一样。',
        '你的笑容如阳光般温暖，照亮了我生命中的每一个角落。',
        '无论是晴天还是雨天，只要有你在身边，我就感到无比幸福。',
        '我想牵着你的手，一起走过四季，看遍世间美景。',
        '你是我最美的意外，最甜的惊喜，最想珍藏的宝贝。',
        '我爱你，不只是说说而已，而是铭刻在心底的承诺。',
        '520，我爱你，今天，明天，永远。'
    ],
    
    // 情话彩蛋
    loveEggs: [
        '你知道吗？我最喜欢的数字是520，因为我爱你。',
        '如果可以，我想和你一起数星星，数到地老天荒。',
        '世界上最幸福的事，就是我喜欢的人也喜欢我。',
        '你是我写不完的情诗，说不完的情话。',
        '我的眼里只有你，我的心里也只有你。'
    ],
    
    // 爱心捕捉游戏配置
    heartCatcherGame: {
        duration: 10, // 游戏时长（秒）
        heartCount: 15, // 出现的爱心数量
        encouragements: [
            '别灰心，再来一次吧！',
            '你已经很棒了，再试一次？',
            '爱你的心永远不会减少！',
            '下一次一定能抓住更多！'
        ]
    },
    
    // 音乐列表
    musicList: [
        {
            title: '告白气球',
            artist: '周杰伦',
            src: 'assets/music/告白气球.mp3'
        },
        {
            title: '慢慢喜欢你',
            artist: '莫文蔚',
            src: 'assets/music/慢慢喜欢你.mp3'
        },
        {
            title: '小幸运',
            artist: '田馥甄',
            src: 'assets/music/小幸运.mp3'
        }
    ],
    
    // 礼物二维码链接
    giftQRCodeUrl: 'https://images.cnblogs.com/cnblogs_com/blogs/685650/galleries/2328783/o_230722031726_%E5%85%B3%E6%B3%A8%E5%BE%AE%E4%BF%A1%E5%85%AC%E4%BC%97%E5%8F%B7.png',
    
    // 爱情证书信息
    certificate: {
        lover1: '晓凡',
        lover2: '未来的您'
    },
    
    // 服务器端口
    serverPort: 3008
};