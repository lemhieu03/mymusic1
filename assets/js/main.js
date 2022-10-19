const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'PLAYER_SETING';

const player = $('.player');
const playlist = $('.playlist');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY))  || {},
    setConfig: function(key, value) {
        this.config[key] = value;
       localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    songs: [
        {
            name: 'Ánh Sao Và Bầu Trời',
            singer: 'T.R.I x Cá',
            path: './assets/music/song1.mp3',
            image: './assets/img/avt.jpg'
        },
        {
            name: 'HỐI DUYÊN',
            singer: 'MASEW x KHOI VU',
            path: './assets/music/song2.mp3',
            image: './assets/img/avt.jpg'
        },
        {
            name: 'Diễn viên tồi ',
            singer: 'Đen',
            path: './assets/music/song3.mp3',
            image: './assets/img/avt.jpg'
        },
        {
            name: ' Em Là (Album 22 - Track No.03)',
            singer: 'MONO ',
            path: './assets/music/song4.mp3',
            image: './assets/img/avt.jpg'
        },
        {
            name: 'Chuyện Đôi Ta ',
            singer: 'Emcee L (Da LAB) ft Muộii ',
            path: './assets/music/song5.mp3',
            image: './assets/img/avt.jpg'
        },
        
        {
            name: 'vaicaunoicokhiennguoithaydoi',
            singer: 'GREY D x tlinh ',
            path: './assets/music/song6.mp3',
            image: './assets/img/avt.jpg'
        },
        {
            name: 'Replay Trên Con Guây',
            singer: 'PHÚC DU ',
            path: './assets/music/song7.mp3',
            image: './assets/img/avt.jpg'
        },
        {
            name: 'Ai muốn nghe không ',
            singer: 'Đen',
            path: './assets/music/song8.mp3',
            image: './assets/img/avt.jpg'
        },
        {
            name: 'TẠI VÌ SAO',
            singer: 'RPT MCK',
            path: './assets/music/song9.mp3',
            image: './assets/img/avt.jpg'
        },
        {
            name: 'Anh Không Thể',
            singer: 'MONO',
            path: './assets/music/song10.mp3',
            image: './assets/img/avt.jpg'
        },
        
        {
            name: 'Nhất Thân',
            singer: 'Masew x Khoi Vu',
            path: './assets/music/song11.mp3',
            image: './assets/img/avt.jpg'
        },
        {
            name: 'Waiting For You ',
            singer: 'MONO',
            path: './assets/music/song12.mp3',
            image: './assets/img/avt.jpg'
        },
        {
            name: 'Ái Nộ ( Chuyện chưa kể... ) ',
            singer: 'Masew x Khoi Vu ',
            path: './assets/music/song13.mp3',
            image: './assets/img/avt.jpg'
        },
        {
            name: 'Legends Never Die',
            singer: 'Against The Current',
            path: './assets/music/song14.mp3',
            image: './assets/img/avt.jpg'
        },
        {
            name: 'Imagine Dragons & JID ',
            singer: 'Enemy',
            path: './assets/music/song15.mp3',
            image: './assets/img/avt.jpg'
        },
        {
            name: 'Billie Eilish, Khalid',
            singer: 'lovely ',
            path: './assets/music/song16.mp3',
            image: './assets/img/avt.jpg'
        },
        {
            name: 'tiny love ',
            singer: 'Thịnh Suy',
            path: './assets/music/song17.mp3',
            image: './assets/img/avt.jpg'
        },
        {
            name: 'THÓI QUEN ',
            singer: ' HOÀNG DŨNG, GDUCKY, MÀU NƯỚC BAND',
            path: './assets/music/song18.mp3',
            image: './assets/img/avt.jpg'
        },
        {
            name: 'Quên Anh Đi',
            singer: 'MONO',
            path: './assets/music/song19.mp3',
            image: './assets/img/avt.jpg'
        },
        {
            name: 'Khuôn mặt đáng thương',
            singer: ' Sơn Tùng MTP',
            path: './assets/music/song20.mp3',
            image: './assets/img/avt.jpg'
        },
        {
            name: 'đứa nào làm em buồn',
            singer: 'PHÚC DU',
            path: './assets/music/song21.mp3',
            image: './assets/img/avt.jpg'
        },
        {
            name: 'THERES NO ONE AT ALL ',
            singer: 'SƠN TÙNG M-TP ',
            path: './assets/music/song22.mp3',
            image: './assets/img/avt.jpg'
        },
        {
            name: 'Đừng Về Trễ Acoustic',
            singer: 'SƠN TÙNG M-TP ',
            path: './assets/music/song23.mp3',
            image: './assets/img/avt.jpg'
        },
        {
            name: 'Anh Ghét Làm Bạn Em ',
            singer: 'Phan Mạnh Quỳnh ',
            path: './assets/music/song24.mp3',
            image: './assets/img/avt.jpg'
        },
    
      
    ],
    render: function() {
        const htmls = this.songs.map((song, index) =>{
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ' ' }" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
            `
        });
        playlist.innerHTML = htmls.join('');
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },
    handleEvents: function() {
        const cdWidth = cd.offsetWidth;
        const _this = this;

        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 10000,  
            iterations: Infinity 
        });
        cdThumbAnimate.pause();

        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;


            cd.style.width = newCdWidth? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        };
        
        playBtn.onclick = function() {
            if(_this.isPlaying){
                audio.pause();
            }else{
                audio.play();
            }
        };
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        };
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        };
        audio.ontimeupdate = function() {
            if(audio.duration){
                const progressPersent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPersent;
            }
        };
        progress.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
        }

        nextBtn.onclick = function() {
            if(_this.isRandom){
                _this.randomSong();
            }else{
                _this.nextSong();
            }
           
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }
        prevBtn.onclick = function() {
            if(_this.isRandom){
                _this.randomSong();
            }else{
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRadom', _this.isRandom);
            randomBtn.classList.toggle('active', _this.isRandom);
        }
        audio.onended = function() {
            if(_this.isRepeat){
                audio.play();
            }else{
                nextBtn.click();
            }
        }
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)');
            if(songNode || e.target.closest('.option')){
                if(songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }
                if(e.target.closest('.option')){

                };
            }
        }
    },
    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            })
        }, 300)
    },
    loadConfig: function() {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
        audio.src = this.currentSong.path;
    },
    nextSong: function() {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0;
        };

        this.loadCurrentSong()
    },
    prevSong: function() {
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1;
        };

        this.loadCurrentSong()
    },
    randomSong: function() {
        let newIndex 
        do{
            newIndex = Math.floor(Math.random() * this.songs.length);
        }while(newIndex == this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong();
    },
    start: function() {
        this.loadConfig();
        this.defineProperties()
        this.handleEvents();
        this.loadCurrentSong();
        this.render();
        this

        randomBtn.classList.toggle('active', this.isRandom);
        repeatBtn.classList.toggle('active', this.isRepeat);
    }
}
app.start()