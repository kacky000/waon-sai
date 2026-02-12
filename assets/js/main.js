// ===================================
// ダミーデータ（将来的にMicroCMSのAPIから取得予定）
// ===================================
const artistsData = [
    {
        id: "1",
        name: "和音楽団",
        image: "https://placehold.jp/30/C3002F/ffffff/300x300.png?text=和音楽団",
        description: "伝統的な和楽器とロックサウンドを融合させた革新的なバンド。三味線とエレキギターが奏でる新しい音楽を体験してください。",
        sns: "https://twitter.com/waon_gakudan"
    },
    {
        id: "2",
        name: "ALPHA WAVES",
        image: "https://placehold.jp/30/D4AF37/000000/300x300.png?text=ALPHA+WAVES",
        description: "エレクトロニカとジャズの要素を取り入れた実験的なサウンドが特徴。独自の世界観で聴衆を魅了します。",
        sns: "https://twitter.com/alpha_waves_jp"
    },
    {
        id: "3",
        name: "紅蓮",
        image: "https://placehold.jp/30/C3002F/ffffff/300x300.png?text=紅蓮",
        description: "激しくも美しい、和風メタルバンド。尺八とデスボイスが織りなす唯一無二のステージをお届けします。",
        sns: "https://twitter.com/guren_official"
    },
    {
        id: "4",
        name: "Moonlight Session",
        image: "https://placehold.jp/30/333333/ffffff/300x300.png?text=Moonlight",
        description: "アコースティックギターとピアノを中心とした叙情的なサウンド。心に染み入るメロディーをお楽しみください。",
        sns: "https://twitter.com/moonlight_sess"
    },
    {
        id: "5",
        name: "雅-MIYABI-",
        image: "https://placehold.jp/30/D4AF37/000000/300x300.png?text=雅-MIYABI-",
        description: "琴と箏を現代的にアレンジした演奏スタイルで注目を集める女性デュオ。和の美しさを再発見できるパフォーマンス。",
        sns: "https://twitter.com/miyabi_koto"
    },
    {
        id: "6",
        name: "The Harmonic Blend",
        image: "https://placehold.jp/30/666666/ffffff/300x300.png?text=Harmonic",
        description: "ジャズ、ブルース、R&Bを融合させたクロスオーバーバンド。即興演奏の妙技をぜひ生で体感してください。",
        sns: "https://twitter.com/harmonic_blend"
    }
];

// ===================================
// LocalStorage管理
// ===================================
function getSiteData() {
    const stored = localStorage.getItem('waonfes-data');
    return stored ? JSON.parse(stored) : null;
}

// ===================================
// データの動的反映
// ===================================
function loadContentFromStorage() {
    const data = getSiteData();
    if (!data) return; // LocalStorageにデータがない場合はスキップ

    // ヘロー
    if (data.hero) {
        const hero = data.hero;
        const heroElement = document.querySelector('.hero');
        const heroTitle = document.getElementById('heroTitle');
        if (heroTitle) heroTitle.textContent = hero.title;
        const heroSubtitle = document.getElementById('heroSubtitle');
        if (heroSubtitle) heroSubtitle.textContent = hero.subtitle;
        const heroCatchphrase = document.getElementById('heroCatchphrase');
        if (heroCatchphrase) heroCatchphrase.textContent = hero.catchphrase;
        const heroDate = document.getElementById('heroDate');
        if (heroDate) heroDate.textContent = hero.date;
        const heroVenue = document.getElementById('heroVenue');
        if (heroVenue) heroVenue.textContent = hero.venue;
        if (heroElement) {
            if (hero.image && hero.image.trim() !== '') {
                heroElement.style.backgroundImage = `linear-gradient(135deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.85) 100%), url("${hero.image}")`;
                heroElement.style.backgroundPosition = 'center';
                heroElement.style.backgroundSize = 'cover';
                heroElement.style.backgroundRepeat = 'no-repeat';
            } else {
                heroElement.style.backgroundImage = '';
                heroElement.style.backgroundPosition = '';
                heroElement.style.backgroundSize = '';
                heroElement.style.backgroundRepeat = '';
            }
        }
    }

    // コンセプト
    if (data.concept) {
        const concept = data.concept;
        const conceptLead = document.getElementById('conceptLead');
        if (conceptLead) conceptLead.textContent = concept.lead;
        const conceptTextList = document.getElementById('conceptTextList');
        if (conceptTextList) {
            const texts = Array.isArray(concept.texts)
                ? concept.texts
                : [concept.text1, concept.text2, concept.text3].filter(Boolean);
            conceptTextList.innerHTML = texts.map(text => `<p>${text}</p>`).join('');
        }
    }

    // 情報
    if (data.info) {
        const info = data.info;
        const infoGrid = document.getElementById('infoGrid');
        if (infoGrid && Array.isArray(info.cards)) {
            const toHtml = (text) => (text || '').replace(/\n/g, '<br>');
            infoGrid.innerHTML = info.cards.map(card => `
                <div class="info-card">
                    <h3 class="info-title">${card.title || ''}</h3>
                    <p class="info-detail">${toHtml(card.detail)}</p>
                </div>
            `).join('');
        }
    }

    // エントリー
    if (data.entry) {
        const entry = data.entry;
        const ticketsList = document.getElementById('ticketsList');
        if (ticketsList) {
            ticketsList.innerHTML = (tickets.items || []).map(item => `
                <div class="ticket">
                    <h3>${item.title || ''}</h3>
                    <p>${item.desc || ''}</p>
                    <p class="price">${item.price || ''}</p>
                </div>
            `).join('');
        }
        const accessCopy = document.getElementById('accessCopy');
        if (accessCopy) accessCopy.textContent = tickets.accessCopy || '';


    // Coming Soon
    if (data.sectionFlags) {
        setSectionComingSoon(document.getElementById('home'), data.sectionFlags.hero);
        setSectionComingSoon(document.getElementById('concept'), data.sectionFlags.concept);
        setSectionComingSoon(document.getElementById('entry'), data.sectionFlags.entry);
        setSectionComingSoon(document.getElementById('timetable'), data.sectionFlags.timetable);
        setSectionComingSoon(document.getElementById('artist'), data.sectionFlags.artists);
        setSectionComingSoon(document.getElementById('tickets'), data.sectionFlags.tickets);
        setSectionComingSoon(document.getElementById('information'), data.sectionFlags.info);
        setSectionComingSoon(document.querySelector('.footer'), data.sectionFlags.footer);
    }
    // タイムテーブル

function setSectionComingSoon(sectionElement, isComingSoon) {
    if (!sectionElement) return;
    if (isComingSoon) {
        sectionElement.classList.add('is-coming-soon');
    } else {
        sectionElement.classList.remove('is-coming-soon');
    }
}
    if (data.timetable) {
        const timetableList = document.getElementById('timetableList');
        if (timetableList) {
            const items = data.timetable.items || [];
            timetableList.innerHTML = items.map(item => `
                <div class="timetable-item">
                    <div class="timetable-time">${item.time || ''}</div>
                    <div class="timetable-act">
                        <div class="timetable-act-name">${item.title || ''}</div>
                        <div class="timetable-act-detail">${item.detail || ''}</div>
                    </div>
                </div>
            `).join('');
        }
    }

    // チケット
    if (data.tickets) {
        const tickets = data.tickets;
        const setText = (id, value) => {
            const el = document.getElementById(id);
            if (el && value !== undefined && value !== null) {
                el.textContent = value;
            }
        };
        const items = tickets.items || [];
        setText('ticketTitle1', items[0]?.title);
        setText('ticketDesc1', items[0]?.desc);
        setText('ticketPrice1', items[0]?.price);
        setText('ticketTitle2', items[1]?.title);
        setText('ticketDesc2', items[1]?.desc);
        setText('ticketPrice2', items[1]?.price);
        setText('ticketTitle3', items[2]?.title);
        setText('ticketDesc3', items[2]?.desc);
        setText('ticketPrice3', items[2]?.price);
        setText('accessCopy', tickets.accessCopy);
    }

    // フッター
    if (data.footer) {
        const footer = data.footer;
        const footerLogo = document.getElementById('footerLogo');
        if (footerLogo) footerLogo.textContent = footer.logo;
        const footerSubtitle = document.getElementById('footerSubtitle');
        if (footerSubtitle) footerSubtitle.textContent = footer.subtitle;
        const footerEmail = document.getElementById('footerEmail');
        if (footerEmail) footerEmail.textContent = footer.email;
        const footerTel = document.getElementById('footerTel');
        if (footerTel) footerTel.textContent = footer.tel;
        const footerCopyright = document.getElementById('footerCopyright');
        if (footerCopyright) {
            // HTMLをそのまま使う（著作権記号など）
            footerCopyright.innerHTML = footer.copyright;
        }
    }
}

// ===================================
// アーティスト描画関数
// ===================================
/**
 * アーティストデータをHTMLに描画する関数
 * @param {Array} data - アーティスト情報の配列
 */
function renderArtists(data) {
    const artistListElement = document.getElementById('artist-list');
    
    // エラーハンドリング
    if (!artistListElement) {
        console.error('Error: #artist-list element not found');
        return;
    }

    // データが空の場合
    if (!data || data.length === 0) {
        artistListElement.innerHTML = '<p style="text-align: center; color: #cccccc;">現在、出演者情報はありません。</p>';
        return;
    }

    // HTMLを生成
    const html = data
        .filter(artist => !artist.hidden)
        .map(artist => {
        return `
            <article class="artist-card" data-artist-id="${artist.id}">
                <img src="${artist.image}" alt="${artist.name}" class="artist-image" loading="lazy">
                <div class="artist-info">
                    <h3 class="artist-name">${artist.name}</h3>
                    ${(artist.member || artist.area) ? `<p class="artist-area">メンバー：${artist.member || artist.area}</p>` : ''}
                    <p class="artist-description">${artist.description}</p>
                </div>
            </article>
        `;
    }).join('');

    // DOMに挿入
    artistListElement.innerHTML = html;
}

// ===================================
// スムーススクロール
// ===================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            // ホームリンクの場合はトップへ
            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 60; // ナビゲーション分オフセット
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// スクロールアニメーション（フェードイン）
// ===================================
function initScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // セクションタイトルとアーティストカードにアニメーション適用
    const animateElements = document.querySelectorAll('.section-title, .artist-card, .info-card, .concept-text');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===================================
// ハンバーガーメニュー
// ===================================
function initHamburgerMenu() {
    const nav = document.querySelector('.nav');
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    const backdrop = document.getElementById('navBackdrop');

    if (!nav || !toggle || !menu) return;

    const closeMenu = () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        if (backdrop) backdrop.classList.remove('active');
    };

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        if (backdrop) backdrop.classList.toggle('active', isOpen);
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    if (backdrop) {
        backdrop.addEventListener('click', closeMenu);
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

// ===================================
// 初期化処理
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // LocalStorageからデータを読み込む
    loadContentFromStorage();

    // アーティスト情報を描画（LocalStorageまたはダミーデータ）
    const storedData = getSiteData();
    const artists = storedData && storedData.artists ? storedData.artists : artistsData;
    renderArtists(artists);
    
    // スムーススクロールを初期化
    initSmoothScroll();
    
    // スクロールアニメーションを初期化
    initScrollAnimation();

    // ハンバーガーメニューを初期化
    initHamburgerMenu();

    console.log('WA音祭サイト初期化完了');
});

// ===================================
// API連携用の関数（将来の拡張用）
// ===================================
/**
 * MicroCMS等のAPIからアーティストデータを取得する関数（サンプル）
 * 実装時にはこの関数を使用してください
 */
async function fetchArtistsFromAPI() {
    try {
        // 実際のAPIエンドポイントに置き換えてください
        // const response = await fetch('https://your-microcms-endpoint.com/api/v1/artists', {
        //     headers: {
        //         'X-MICROCMS-API-KEY': 'YOUR_API_KEY'
        //     }
        // });
        // const data = await response.json();
        // renderArtists(data.contents);
        
        console.log('API連携はまだ実装されていません。ダミーデータを使用しています。');
    } catch (error) {
        console.error('API取得エラー:', error);
        // エラー時はダミーデータを表示
        renderArtists(artistsData);
    }
}
