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
    }

    // コンセプト
    if (data.concept) {
        const concept = data.concept;
        const conceptLead = document.getElementById('conceptLead');
        if (conceptLead) conceptLead.textContent = concept.lead;
        const conceptText1 = document.getElementById('conceptText1');
        if (conceptText1) conceptText1.textContent = concept.text1;
        const conceptText2 = document.getElementById('conceptText2');
        if (conceptText2) conceptText2.textContent = concept.text2;
        const conceptText3 = document.getElementById('conceptText3');
        if (conceptText3) conceptText3.textContent = concept.text3;
    }

    // 情報
    if (data.info) {
        const info = data.info;
        const infoDate = document.getElementById('infoDate');
        if (infoDate) infoDate.textContent = info.date;
        const infoTime = document.getElementById('infoTime');
        if (infoTime) infoTime.textContent = info.time;
        const infoVenueName = document.getElementById('infoVenueName');
        if (infoVenueName) infoVenueName.textContent = info.venueName;
        const infoVenueAddress = document.getElementById('infoVenueAddress');
        if (infoVenueAddress) infoVenueAddress.textContent = info.venueAddress;
        const infoPriceAdvance = document.getElementById('infoPriceAdvance');
        if (infoPriceAdvance) infoPriceAdvance.textContent = info.priceAdvance;
        const infoPriceDay = document.getElementById('infoPriceDay');
        if (infoPriceDay) infoPriceDay.textContent = info.priceDay;
        const infoPriceDrink = document.getElementById('infoPriceDrink');
        if (infoPriceDrink) infoPriceDrink.textContent = info.priceDrink;
        const infoEmail = document.getElementById('infoEmail');
        if (infoEmail) infoEmail.textContent = info.email;
        const infoTel = document.getElementById('infoTel');
        if (infoTel) infoTel.textContent = info.tel;
    }

    // エントリー
    if (data.entry) {
        const entry = data.entry;
        const entryLead = document.getElementById('entryLead');
        if (entryLead) entryLead.textContent = entry.lead;
        const entryRequirement1 = document.getElementById('entryRequirement1');
        if (entryRequirement1) entryRequirement1.textContent = entry.requirement1;
        const entryRequirement2 = document.getElementById('entryRequirement2');
        if (entryRequirement2) entryRequirement2.textContent = entry.requirement2;
        const entryRequirement3 = document.getElementById('entryRequirement3');
        if (entryRequirement3) entryRequirement3.textContent = entry.requirement3;
        const entryRequirement4 = document.getElementById('entryRequirement4');
        if (entryRequirement4) entryRequirement4.textContent = entry.requirement4;
        const entryRequirement5 = document.getElementById('entryRequirement5');
        if (entryRequirement5) entryRequirement5.textContent = entry.requirement5;
        const entryButton = document.getElementById('entryButton');
        if (entryButton) {
            entryButton.textContent = entry.buttonText;
            entryButton.href = entry.buttonLink;
        }
        const entryNote = document.getElementById('entryNote');
        if (entryNote) entryNote.textContent = entry.note;
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
    const html = data.map(artist => {
        return `
            <article class="artist-card" data-artist-id="${artist.id}">
                <img src="${artist.image}" alt="${artist.name}" class="artist-image" loading="lazy">
                <div class="artist-info">
                    <h3 class="artist-name">${artist.name}</h3>
                    <p class="artist-description">${artist.description}</p>
                    <div class="artist-sns">
                        <a href="${artist.sns}" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
                    </div>
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
