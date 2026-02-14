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
// データ管理（data.json → localStorage フォールバック）
// ===================================

// サイトデータをキャッシュ（fetch 後に格納）
let _siteDataCache = null;

/**
 * data.json を fetch し、取得できなければ localStorage にフォールバック。
 * 取得したデータは _siteDataCache に保持し、同一セッション内で再利用する。
 */
async function fetchSiteData() {
    // 1. data.json をfetch（GitHub Pages / 任意サーバーで全員共有）
    try {
        const res = await fetch('data.json?t=' + Date.now());
        if (res.ok) {
            const json = await res.json();
            _siteDataCache = json;
            return json;
        }
    } catch (e) {
        console.warn('data.json fetch failed, falling back to localStorage:', e);
    }
    // 2. フォールバック: localStorage
    const stored = localStorage.getItem('waonfes-data');
    if (stored) {
        _siteDataCache = JSON.parse(stored);
        return _siteDataCache;
    }
    return null;
}

/**
 * 同期版（キャッシュ or localStorage）。
 * fetchSiteData() が完了した後であれば _siteDataCache を返す。
 */
function getSiteData() {
    if (_siteDataCache) return _siteDataCache;
    const stored = localStorage.getItem('waonfes-data');
    return stored ? JSON.parse(stored) : null;
}

// ===================================
// データの動的反映
// ===================================
function applyDataToPage(data) {
    if (!data) return;

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
        { question: "映像作品の場合、出演者全員に参加費がかかりますか？", answer: "何人参加の上映作品でも結構ですが、出演チームとしての人数制限が6人までなので、代表6人での作品として申請していただき、6名分の参加費となります。" },
        { question: "50人でフラッシュモブしようとしたら25万円かかりますか？", answer: "先の質問同様、6名分の参加費となります。この場合、ステージ登壇上限が6名なので、上映作品となります。" },
        { question: "1人が2チームに申請した場合その2チーム共に通過することもありますか？その場合は参加費は倍ですか？", answer: "2チーム共オーディション通過する可能性はあります。その場合の参加費は倍の¥10,000になります。" },
        { question: "開催は昼間想定ですか？", answer: "会場使用時間が決まっているため、会場準備、リハーサルの都合上、WA音祭開会は16:00前後を想定しています。正確なオープン、スタートの時間は出演者が決まり、出演時間、リハーサルタイムテーブルが決定したのち発表致します。また、閉会時間も20:00前後を想定しております。" },
        { question: "子供も出演、参加できますか？", answer: "出演、参加に年齢制限はございません。どちらも年齢による参加費、並びにチケット代の設定は設ける予定です。(大人料金、子供料金)" },
        { question: "子供は会場に連れていけますか？", answer: "先の質問の条件で可能です。託児所のご用意がございませんので、常に保護者の方同伴でお願いいたします。通常のライブハウスと同等の音楽環境になりますので(大音量になる可能性が大)あらかじめご了承ください。" },
        { question: "会場はスタンディングですか？", answer: "オールスタンディングのライブハウスとなります。特別な理由により椅子が必要なお客様には、フロア後方に椅子のご用意が可能です。数に限りがございますので、WA音祭HPに問合せフォームを設置するので、そちらから予め申請願います。" },
        { question: "楽器演奏者需要が多くなると予想されますが、かけもち制限数を他の出演者よりは多くするのはいかがでしょうか？", answer: "既存演奏者負担軽減と、この機会に楽器演奏を初めるきっかけになればという趣旨により、2チームまでとさせていただきます。ですが録音した演奏での収録参加はその限りではございません。収録の場合は参加費はかかりません。" },
        { question: "演目に利用するのはオリジナル曲じゃないとダメでしょうか？既存曲を利用する事は可能ですか？", answer: "チャレンジやスキルアップのためにもオリジナル曲推奨ですが、配信にあたり著作権について全てクリアした状態の配信プラットフォームを利用するので、既存曲の使用は可です。ただし、既存曲には原盤権もあるので、チームで楽器演奏をするのではなく、カラオケ、BGMとして既存曲を使用する場合は、カバー演奏収録をした音源か、「歌っちゃ王」のようなカバー音源サイトより購入した物であれば可です。" },
        { question: "出演はリアルで舞台に立つ人も映像作品出品する人も海外出演する人も他サロンから出演する人も全員1人5000円ですか？", answer: "他コミュニティからはゲスト枠を一枠ずつ用意(所属人数の多いたむ小からは2枠ゲストの可能性有り)しているので参加費はかかりません。逆にそれ以外の7割程はWAからの出演となり、現地以外の方も映像作品の方も一律5,000円の参加費となります。今回の他コミュニティ大連携は、あくまで主催がWAで、感覚的にはゲストで出演してもらい、交流のきっかけになればという形です。" },
        { question: "「ソロボーカルコンテスト」を行うというのはいかがでしょうか？", answer: "ソロ出演に関してのご意見も少なくなく、是非採用させていただきます。時間の都合上、最大4～5名限定、1人持ち時間4～5分以内で20分枠の中でのショートコンテストとさせていただきます。ソロであれば弾き語りのような楽器演奏・一人漫才・何かしらのパフォーマンスも可です。また、選抜方法は応募人数が多い場合、全体オーディションとは別にソロパフォーマーオーディションを検討しています。" },
        { question: "出演人数・出演形態について、1団体に対して1枠15分を付与し、その15分枠を複数チームで分割して出演することは可能ですか？", answer: "ゲスト出演の場合は、演出の都合上登壇及び参加が6人を超える瞬間があるのは特例として認められる場合があります。WAからの出演の場合は、6人の中で3人・4人・6人と登壇人数を変え3種目作り、出たり入ったりでの出演は有りです。実質7名を超える大人数のグループの場合、分割し複数グループエントリーにより、オーディション通過を目指す形でお願いいたします。" }
    ];
    const qnaList = document.getElementById('qnaList');
    if (qnaList) {
        const QNA_INITIAL_COUNT = 5;
        qnaList.innerHTML = qnaData.map((item, i) => `
            <div class="qna-item${i >= QNA_INITIAL_COUNT ? ' qna-hidden' : ''}">
                <button class="qna-question" onclick="this.parentElement.classList.toggle('open')">
                    <span>${item.question || ''}</span>
                    <span class="qna-icon"></span>
                </button>
                <div class="qna-answer">
                    <div class="qna-answer-inner">${item.answer || ''}</div>
                </div>
            </div>
        `).join('');
        // 「もっと見る / 閉じる」ボタン
        if (qnaData.length > QNA_INITIAL_COUNT) {
            let qnaExpanded = false;
            const moreBtn = document.createElement('button');
            moreBtn.className = 'qna-more-btn';
            moreBtn.textContent = 'もっと見る';
            moreBtn.addEventListener('click', function() {
                qnaExpanded = !qnaExpanded;
                if (qnaExpanded) {
                    qnaList.querySelectorAll('.qna-hidden').forEach(el => el.classList.remove('qna-hidden'));
                    moreBtn.textContent = '閉じる';
                } else {
                    qnaList.querySelectorAll('.qna-item').forEach((el, i) => {
                        if (i >= QNA_INITIAL_COUNT) {
                            el.classList.add('qna-hidden');
                            el.classList.remove('open');
                        }
                    });
                    moreBtn.textContent = 'もっと見る';
                }
            });
            qnaList.appendChild(moreBtn);
        }
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
        applySectionOrder(data.sectionOrder, data);
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

function applySectionOrder(order, data) {
    if (!Array.isArray(order) || order.length === 0) return;

    if (!data) data = getSiteData();

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
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // data.json → localStorage の優先順位でデータ取得
        const data = await fetchSiteData();

        // ページにデータを反映
        if (data) {
            applyDataToPage(data);
        }

        // アーティスト情報を描画
        const artists = data && data.artists ? data.artists : artistsData;
        renderArtists(artists);
    } catch (e) {
        console.error('データ読み込みエラー:', e);
        // フォールバック: ダミーアーティストだけ描画
        renderArtists(artistsData);
    }

    // スムーススクロールを初期化
    initSmoothScroll();
    
    // スクロールアニメーションを初期化
    initScrollAnimation();

    // ハンバーガーメニューを初期化
    initHamburgerMenu();

    console.log('WA音祭サイト初期化完了');
});


