// 部落冲突网站功能
document.addEventListener('DOMContentLoaded', function() {
    // 宣言数据
    const declarations = [
        {
            name: "狰狞圣者yzt",
            date: "2025-9-28",
            text: "嘤嘤嘤嘤嘤嘤嘤嘤"
        },
        {
            name: "三里雾",
            date: "2025-9-28",
            text: "核心价值观：部落人人平等，不存在上下级关系，首领只是工具人，为部落服务，部落权力属于全体成员，玩的开心就好，这里是永远的家"
        },
    ];

    // 刷新按钮事件
    document.getElementById('refreshBtn').addEventListener('click', function() {
        loadDeclarations();
        
        // 添加动画效果
        const btn = this;
        btn.style.transform = 'rotate(360deg)';
        btn.style.transition = 'transform 0.7s ease-in-out';
        
        setTimeout(() => {
            btn.style.transform = 'rotate(0deg)';
        }, 700);
    });

    // 加载宣言列表
    function loadDeclarations() {
        const declarationsList = document.getElementById('declarationsList');
        
        if (declarations.length === 0) {
            declarationsList.innerHTML = `
                <div class="empty-state">
                    <h3>暂无宣言</h3>
                    <p>等待部落勇士们发表他们的心声</p>
                </div>
            `;
            return;
        }
        
        // 清空现有内容
        declarationsList.innerHTML = '';
        
        // 添加宣言卡片
        declarations.forEach(declaration => {
            const declarationElement = document.createElement('div');
            declarationElement.className = 'declaration-card fade-in';
            declarationElement.innerHTML = `
                <div class="declaration-header">
                    <div class="member-name">${declaration.name}</div>
                    <div class="declaration-date">${declaration.date}</div>
                </div>
                <div class="declaration-text">${declaration.text}</div>
            `;
            declarationsList.appendChild(declarationElement);
        });
    }

    // 页面加载时获取宣言列表
    loadDeclarations();

    // 添加滚动动画
    const announcementCards = document.querySelectorAll('.announcement-card');
    const illustrationCards = document.querySelectorAll('.illustration-card');
    const declarationCards = document.querySelectorAll('.declaration-card');
    
    function checkScroll() {
        [...announcementCards, ...illustrationCards, ...declarationCards].forEach(card => {
            const position = card.getBoundingClientRect();
            
            if(position.top < window.innerHeight - 100) {
                card.style.opacity = 1;
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // 动画的初始状态
    announcementCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    illustrationCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // 在加载和滚动时检查
    window.addEventListener('scroll', checkScroll);
    checkScroll();
    
    // 处理视频加载失败的情况
    const video = document.querySelector('video');
    if (video) {
        video.addEventListener('error', function() {
            console.log('视频加载失败，使用备用背景');
            document.querySelector('.video-background').style.display = 'none';
        });
    }
    
    // 处理图片加载失败的情况
    document.querySelectorAll('.illustration-image img, .member-avatar img').forEach(img => {
        img.addEventListener('error', function() {
            const parent = this.parentElement;
            const altText = this.alt || '图片';
            
            if (parent.classList.contains('member-avatar')) {
                parent.innerHTML = `<div style="color: var(--clan-gold); font-size: 1.5rem; display: flex; align-items: center; justify-content: center; height: 100%;">👤</div>`;
            } else {
                parent.innerHTML = `<div style="color: var(--clan-gold); font-size: 1.2rem; text-align: center; padding: 20px;">${altText}</div>`;
            }
        });
    });

    // 插画分类筛选功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const illustrationItems = document.querySelectorAll('.illustration-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 为当前点击的按钮添加active类
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            illustrationItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 成员卡片动画
    setTimeout(function() {
        const memberItems = document.querySelectorAll('.member-item');
        memberItems.forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        });
    }, 500);
    
    // 加入部落按钮动画
    const joinBtn = document.querySelector('.btn-join');
    if (joinBtn) {
        joinBtn.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
        });
        joinBtn.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    }
});