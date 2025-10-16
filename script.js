class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.autoPlayDelay = 5000; // 5 секунд
        
        this.init();
    }
    
    init() {
        // Обработчики для кнопок
        this.prevBtn.addEventListener('click', () => {
            this.pauseAutoPlay();
            this.prevSlide();
            this.startAutoPlay();
        });
        
        this.nextBtn.addEventListener('click', () => {
            this.pauseAutoPlay();
            this.nextSlide();
            this.startAutoPlay();
        });
        
        // Обработчики для индикаторов
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.pauseAutoPlay();
                this.goToSlide(index);
                this.startAutoPlay();
            });
        });
        
        // Запуск автоматической смены слайдов
        this.startAutoPlay();
        
        // Пауза при наведении мыши
        const slider = document.querySelector('.hero-slider');
        slider.addEventListener('mouseenter', () => this.pauseAutoPlay());
        slider.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    showSlide(index) {
        // Скрываем все слайды
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Показываем текущий слайд
        this.slides[index].classList.add('active');
        this.indicators[index].classList.add('active');
        
        this.currentSlide = index;
    }
    
    nextSlide() {
        let nextIndex = this.currentSlide + 1;
        if (nextIndex >= this.slides.length) {
            nextIndex = 0;
        }
        this.showSlide(nextIndex);
    }
    
    prevSlide() {
        let prevIndex = this.currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = this.slides.length - 1;
        }
        this.showSlide(prevIndex);
    }
    
    goToSlide(index) {
        this.showSlide(index);
    }
    
    startAutoPlay() {
        this.pauseAutoPlay();
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    pauseAutoPlay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
}

// Инициализация слайдера когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    new HeroSlider();
});