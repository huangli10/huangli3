// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 1. 移动端菜单切换
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    menuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // 2. 导航栏高亮（根据滚动位置）
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. 轮播图逻辑
    const bannerList = document.getElementById('bannerList');
    const bannerDots = document.querySelectorAll('.banner-dot');
    const leftBtn = document.getElementById('leftBtn');
    const rightBtn = document.getElementById('rightBtn');
    let bannerIndex = 0;
    const bannerCount = bannerList.children.length;
    
    // 自动轮播
    let bannerTimer = setInterval(nextBanner, 5000);
    
    // 切换轮播图
    function goToBanner(index) {
        bannerIndex = index;
        bannerList.style.transform = `translateX(-${bannerIndex * 100}%)`;
        bannerDots.forEach((dot, i) => {
            dot.style.opacity = i === bannerIndex ? '1' : '0.5';
        });
    }
    
    // 下一张
    function nextBanner() {
        bannerIndex = (bannerIndex + 1) % bannerCount;
        goToBanner(bannerIndex);
    }
    
    // 上一张
    function prevBanner() {
        bannerIndex = (bannerIndex - 1 + bannerCount) % bannerCount;
        goToBanner(bannerIndex);
    }
    
    // 点击圆点切换
    bannerDots.forEach((dot, i) => {
        dot.addEventListener('click', function() {
            goToBanner(i);
        });
    });
    
    // 点击左右按钮切换
    leftBtn.addEventListener('click', function() {
        clearInterval(bannerTimer);
        prevBanner();
        bannerTimer = setInterval(nextBanner, 5000);
    });
    
    rightBtn.addEventListener('click', function() {
        clearInterval(bannerTimer);
        nextBanner();
        bannerTimer = setInterval(nextBanner, 5000);
    });

    // 4. 图片画廊筛选与预览
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryModal = document.getElementById('galleryModal');
    const modalImg = document.querySelector('.modal-img');
    const modalDesc = document.getElementById('modalDesc');
    const modalClose = document.getElementById('modalClose');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    
    // 收集画廊图片数据
    const galleryData = [];
    galleryItems.forEach(item => {
        const src = item.querySelector('.gallery-img').src;
        const desc = item.querySelector('.gallery-desc').textContent;
        const category = item.getAttribute('data-category');
        galleryData.push({ src, desc, category });
    });
    let currentGalleryIndex = 0;
    
    // 筛选图片
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 切换按钮状态
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-red-600', 'text-white');
                b.classList.add('bg-gray-200', 'text-gray-800');
            });
            this.classList.add('active', 'bg-red-600', 'text-white');
            this.classList.remove('bg-gray-200', 'text-gray-800');
            
            const filter = this.getAttribute('data-filter');
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // 打开预览弹窗
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentGalleryIndex = index;
            modalImg.src = galleryData[currentGalleryIndex].src;
            modalDesc.textContent = galleryData[currentGalleryIndex].desc;
            galleryModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // 关闭弹窗
    modalClose.addEventListener('click', function() {
        galleryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // 点击弹窗外部关闭
    galleryModal.addEventListener('click', function(e) {
        if (e.target === galleryModal) {
            galleryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // 上一张预览图
    modalPrev.addEventListener('click', function() {
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
        modalImg.src = galleryData[currentGalleryIndex].src;
        modalDesc.textContent = galleryData[currentGalleryIndex].desc;
    });
    
    // 下一张预览图
    modalNext.addEventListener('click', function() {
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryData.length;
        modalImg.src = galleryData[currentGalleryIndex].src;
        modalDesc.textContent = galleryData[currentGalleryIndex].desc;
    });
    
    // 键盘控制预览图
    document.addEventListener('keydown', function(e) {
        if (galleryModal.style.display === 'flex') {
            if (e.key === 'Escape') modalClose.click();
            if (e.key === 'ArrowLeft') modalPrev.click();
            if (e.key === 'ArrowRight') modalNext.click();
        }
    });

    // 5. 回到顶部按钮
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.remove('hidden');
            backToTop.classList.add('show');
        } else {
            backToTop.classList.add('hidden');
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});