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

    // Q&A Coming Soonフラグを強制的にオフ（既存のlocalStorageデータ修正）
    if (data && data.sectionFlags && data.sectionFlags.qna === true) {
        data.sectionFlags.qna = false;
        localStorage.setItem('waonfes-data', JSON.stringify(data));
    }

    if (!data) return; // LocalStorageにデータがない場合はスキップ

    // TOP（トップ）
    // 動画はHTMLに直接埋め込み済み、管理画面からの差し替え不要

    // コンセプト
    if (data.concept) {
        const concept = data.concept;
        const conceptBgImg = document.getElementById('conceptBgImg');
        if (conceptBgImg && concept.bgImage && concept.bgImage.trim() !== '') {
            conceptBgImg.src = concept.bgImage;
        }
        const conceptCopyImg = document.getElementById('conceptCopyImg');
        if (conceptCopyImg && concept.copyImage && concept.copyImage.trim() !== '') {
            conceptCopyImg.src = concept.copyImage;
        }
        const conceptTextList = document.getElementById('conceptTextList');
        if (conceptTextList) {
            const texts = Array.isArray(concept.texts)
                ? concept.texts
                : [concept.text1, concept.text2, concept.text3].filter(Boolean);
            conceptTextList.innerHTML = texts.map(text => `<p>${text}</p>`).join('');
        }
    }

    // メッセージ
    if (data.message) {
        const messageText = document.getElementById('messageText');
        if (messageText && data.message.text) {
            messageText.innerHTML = data.message.text.replace(/\n/g, '<br>');
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
        const entryLead = document.getElementById('entryLead');
        if (entryLead) entryLead.textContent = entry.lead;
        const requirementsList = document.getElementById('entryRequirementsList');
        if (requirementsList) {
            const requirements = Array.isArray(entry.requirements)
                ? entry.requirements
                : [entry.requirement1, entry.requirement2, entry.requirement3, entry.requirement4, entry.requirement5].filter(Boolean);
            requirementsList.innerHTML = requirements.map(item => {
                if (item.includes('｜')) {
                    const [label, ...rest] = item.split('｜');
                    return `<li><strong>${label}</strong><span class="req-sep">｜</span>${rest.join('｜')}</li>`;
                }
                return `<li>${item}</li>`;
            }).join('');
        }
        const entryButton = document.getElementById('entryButton');
        if (entryButton) {
            entryButton.textContent = entry.buttonText;
            entryButton.href = entry.buttonLink;
            entryButton.target = '_blank';
            entryButton.rel = 'noopener noreferrer';
        }
        const entryNote = document.getElementById('entryNote');
        if (entryNote) entryNote.textContent = entry.note;
        // 背景画像
        const entryBgImg = document.getElementById('entryBgImg');
        if (entryBgImg && entry.bgImage) entryBgImg.src = entry.bgImage;
    }

    // タイムテーブル
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
    }

    // フッター
    if (data.footer) {
        const footer = data.footer;
        const footerLogo = document.getElementById('footerLogo');
        if (footerLogo) footerLogo.textContent = footer.logo;
        const footerSubtitle = document.getElementById('footerSubtitle');
        if (footerSubtitle) footerSubtitle.textContent = footer.subtitle;

        const footerCopyright = document.getElementById('footerCopyright');
        if (footerCopyright) {
            footerCopyright.innerHTML = footer.copyright;
        }
    }

    // Q&A
    const qnaData = (data.qna && Array.isArray(data.qna) && data.qna.length > 0) ? data.qna : [
        { question: "出演の応募条件はありますか？年齢や実績などの動画が必要ですか？", answer: "特別な応募条件はありません。5歳から応募可能です。PR動画2〜3分をご提出いただきます。" },
        { question: "SNSチャンネルやチャンネルをもっていないと参加できませんか？", answer: "SNSチャンネルは必須ではありません。ただし、集客につながるためあると望ましいです。" },
        { question: "バンドやチームでの参加の場合、メンバー人数に制限はありますか？", answer: "1〜6名までのチームでの参加が可能です。" },
        { question: "1人でチームを組みたいのですが、他のメンバーを探すサポートはありますか？", answer: "はい、コミュニティ内でメンバー募集のお手伝いをしています。" },
        { question: "1人でゲーム実況や実況、講談○○ゲーム実況なども出演できますか？", answer: "はい、ジャンル不問ですので、説得力のあるPR動画をお送りください。面白いと思ったら何でも歓迎です！" }
    ];
    const qnaList = document.getElementById('qnaList');
    if (qnaList) {
        qnaList.innerHTML = qnaData.map(item => `
            <div class="qna-item">
                <button class="qna-question" onclick="this.parentElement.classList.toggle('open')">
                    <span>${item.question || ''}</span>
                    <span class="qna-icon"></span>
                </button>
                <div class="qna-answer">
                    <div class="qna-answer-inner">${item.answer || ''}</div>
                </div>
            </div>
        `).join('');
    }

    // Goods
    if (data.goods) {
        const goodsList = document.getElementById('goodsList');
        if (goodsList && data.goods.items) {
            goodsList.innerHTML = data.goods.items.map(item => `
                <div class="goods-card">
                    <img src="${item.image || ''}" alt="${item.name || ''}" class="goods-card-image" loading="lazy">
                    <div class="goods-card-info">
                        <p class="goods-card-name">${item.name || ''}</p>
                        <p class="goods-card-price">${item.price || ''}</p>
                    </div>
                </div>
            `).join('');
        }
        const goodsNote = document.getElementById('goodsNote');
        if (goodsNote && data.goods.note) goodsNote.textContent = data.goods.note;
    }

    // Coming Soon
    if (data.sectionFlags) {
        setSectionComingSoon(document.getElementById('home'), data.sectionFlags.hero);
        setSectionComingSoon(document.getElementById('concept'), data.sectionFlags.concept);
        setSectionComingSoon(document.getElementById('entry'), data.sectionFlags.entry);
        setSectionComingSoon(document.getElementById('qna'), data.sectionFlags.qna);
        setSectionComingSoon(document.getElementById('timetable'), data.sectionFlags.timetable);
        setSectionComingSoon(document.getElementById('artist'), data.sectionFlags.artists);
        setSectionComingSoon(document.getElementById('goods'), data.sectionFlags.goods);
        setSectionComingSoon(document.getElementById('tickets'), data.sectionFlags.tickets);
        setSectionComingSoon(document.getElementById('information'), data.sectionFlags.info);
        setSectionComingSoon(document.querySelector('.footer'), data.sectionFlags.footer);
    }

    // セクション非表示
    if (data.sectionHidden) {
        const hideMap = {
            hero: '#home',
            concept: '#concept',
            entry: '#entry',
            qna: '#qna',
            timetable: '#timetable',
            artists: '#artist',
            goods: '#goods',
            tickets: '#tickets',
            info: '#information',
            footer: '.footer'
        };
        Object.entries(hideMap).forEach(([key, selector]) => {
            const el = document.querySelector(selector);
            if (el) {
                el.style.display = data.sectionHidden[key] ? 'none' : '';
            }
        });
    }

    // セクションタイトル
    if (data.sectionTitles) {
        updateSectionTitles(data.sectionTitles);
    }

    // Coming Soonテキスト更新
    if (data.comingSoonText) {
        document.querySelectorAll('.section-coming-soon').forEach(el => {
            el.textContent = data.comingSoonText;
        });
    }

    // チケットアクセス見出し
    if (data.tickets && data.tickets.accessTitle) {
        const accessHeading = document.querySelector('.access h4');
        if (accessHeading) accessHeading.textContent = data.tickets.accessTitle;
    }

    if (data.sectionOrder) {
        applySectionOrder(data.sectionOrder);
    }
}

const SECTION_LABELS = {
    home: 'TOP',
    concept: 'CONCEPT',
    entry: 'ENTRY',
    qna: 'Q&A',
    timetable: 'TIMETABLE',
    artist: 'ARTIST',
    goods: 'GOODS',
    tickets: 'TICKET',
    information: 'INFO'
};

function applySectionOrder(order) {
    if (!Array.isArray(order) || order.length === 0) return;

    const data = getSiteData();

    // Coming Soon または非表示のセクションをメニューから除外するためのマッピング
    const flagKeyMap = {
        home: 'hero', concept: 'concept', entry: 'entry', qna: 'qna',
        timetable: 'timetable', artist: 'artists', goods: 'goods',
        tickets: 'tickets', information: 'info'
    };
    const hiddenKeyMap = {
        home: 'hero', concept: 'concept', entry: 'entry', qna: 'qna',
        timetable: 'timetable', artist: 'artists', goods: 'goods',
        tickets: 'tickets', information: 'info'
    };

    function isVisible(key) {
        const flagKey = flagKeyMap[key];
        const hiddenKey = hiddenKeyMap[key];
        if (data && data.sectionFlags && flagKey && data.sectionFlags[flagKey]) return false;
        if (data && data.sectionHidden && hiddenKey && data.sectionHidden[hiddenKey]) return false;
        return true;
    }

    const main = document.querySelector('main');
    if (main) {
        const sections = new Map();
        main.querySelectorAll('[data-section-key]').forEach(section => {
            sections.set(section.dataset.sectionKey, section);
        });

        order.forEach(key => {
            if (key === 'home') return;
            const section = sections.get(key);
            if (section) {
                main.appendChild(section);
            }
        });
    }

    const visibleOrder = order.filter(key => isVisible(key));

    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.innerHTML = visibleOrder.map(key => {
            const label = SECTION_LABELS[key] || key;
            const href = key === 'home' ? '#home' : `#${key}`;
            return `<li><a href="${href}">${label}</a></li>`;
        }).join('');
    }

    const footerLinks = document.getElementById('footerLinks');
    if (footerLinks) {
        footerLinks.innerHTML = visibleOrder.map(key => {
            const label = SECTION_LABELS[key] || key;
            const href = key === 'home' ? '#home' : `#${key}`;
            return `<a href="${href}">${label}</a>`;
        }).join('');
    }
}

function updateSectionTitles(titles) {
    const sectionIdMap = {
        concept: '#concept',
        entry: '#entry',
        qna: '#qna',
        timetable: '#timetable',
        artist: '#artist',
        goods: '#goods',
        tickets: '#tickets',
        information: '#information'
    };

    Object.entries(titles).forEach(([key, title]) => {
        const sectionId = sectionIdMap[key];
        if (sectionId) {
            const section = document.querySelector(sectionId);
            if (section) {
                const titleEn = section.querySelector('.title-en');
                const titleJa = section.querySelector('.title-ja');
                if (titleEn && title.en) titleEn.textContent = title.en;
                if (titleJa && title.ja) titleJa.textContent = title.ja;
            }
        }
    });
}

function setSectionComingSoon(sectionElement, isComingSoon) {
    if (!sectionElement) return;
    if (isComingSoon) {
        sectionElement.classList.add('is-coming-soon');
    } else {
        sectionElement.classList.remove('is-coming-soon');
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
                <div class="artist-overlay">
                    <h3 class="artist-name">${artist.name}</h3>
                    ${(artist.member || artist.area) ? `<p class="artist-area">${artist.member || artist.area}</p>` : ''}
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
    try {
        loadContentFromStorage();
    } catch(e) {
        console.error('loadContentFromStorage error:', e);
    }

    // Q&Aを確実に描画（loadContentFromStorageとは独立）
    try {
        const storedData = getSiteData();
        const qnaData = (storedData && storedData.qna && Array.isArray(storedData.qna) && storedData.qna.length > 0) ? storedData.qna : [
            { question: "出演の応募条件はありますか？年齢や実績などの動画が必要ですか？", answer: "特別な応募条件はありません。5歳から応募可能です。PR動画2〜3分をご提出いただきます。" },
            { question: "SNSチャンネルやチャンネルをもっていないと参加できませんか？", answer: "SNSチャンネルは必須ではありません。ただし、集客につながるためあると望ましいです。" },
            { question: "バンドやチームでの参加の場合、メンバー人数に制限はありますか？", answer: "1〜6名までのチームでの参加が可能です。" },
            { question: "1人でチームを組みたいのですが、他のメンバーを探すサポートはありますか？", answer: "はい、コミュニティ内でメンバー募集のお手伝いをしています。" },
            { question: "1人でゲーム実況や実況、講談○○ゲーム実況なども出演できますか？", answer: "はい、ジャンル不問ですので、説得力のあるPR動画をお送りください。面白いと思ったら何でも歓迎です！" }
        ];
        const qnaList = document.getElementById('qnaList');
        if (qnaList) {
            qnaList.innerHTML = qnaData.map(item => `
                <div class="qna-item">
                    <button class="qna-question" onclick="this.parentElement.classList.toggle('open')">
                        <span>${item.question || ''}</span>
                        <span class="qna-icon"></span>
                    </button>
                    <div class="qna-answer">
                        <div class="qna-answer-inner">${item.answer || ''}</div>
                    </div>
                </div>
            `).join('');
        }
        // Q&A Coming Soonを強制解除
        const qnaSection = document.getElementById('qna');
        if (qnaSection) {
            qnaSection.classList.remove('is-coming-soon');
        }
    } catch(e) {
        console.error('Q&A render error:', e);
    }

    // アーティスト情報を描画（LocalStorageまたはダミーデータ）
    const storedData2 = getSiteData();
    const artists = storedData2 && storedData2.artists ? storedData2.artists : artistsData;
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
