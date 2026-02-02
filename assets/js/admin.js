// ===================================
// 管理画面の初期化
// ===================================

// デフォルトデータ
const defaultData = {
    hero: {
        title: "WA音祭",
        subtitle: "WAON FES",
        catchphrase: "和と洋が交錯する、音の祭典。",
        date: "202X年7月14日（土）",
        venue: "新宿HOLIDAY"
    },
    concept: {
        lead: "和（WA）とA（Alpha）が出会う場所。",
        text1: "WA音祭は、日本の「和」の美意識と、西洋音楽の「A」（アルファベット）が融合する、ジャンルレスな音楽フェスティバルです。",
        text2: "伝統と革新、静と動、東洋と西洋——相反する要素が調和し、新たな「音」の可能性を生み出す場所。それがWA音祭です。",
        text3: "ロック、ジャズ、和楽器、エレクトロニカ。あらゆるジャンルのアーティストが集い、境界を超えた音楽体験をお届けします。"
    },
    info: {
        date: "202X年7月14日（土）",
        time: "OPEN 18:00 / START 18:30",
        venueName: "新宿HOLIDAY",
        venueAddress: "〒160-0021\n東京都新宿区歌舞伎町1-2-3\n新宿ビル B1F",
        priceAdvance: "¥2,500",
        priceDay: "¥3,000",
        priceDrink: "¥600",
        email: "info@waonfes.jp",
        tel: "03-XXXX-XXXX"
    },
    entry: {
        lead: "WA音祭では、ジャンルを問わず幅広いアーティストを募集しています。\n和楽器、ロック、ポップス、ジャズ、エレクトロニカ…あなたの音楽を響かせてください。",
        requirement1: "応募資格：プロ・アマチュア問わず",
        requirement2: "演奏時間：1組 20分〜30分",
        requirement3: "チケットノルマ：10枚（前売¥2,500×10枚 = ¥25,000）",
        requirement4: "機材：アンプ、ドラムセット、PA完備",
        requirement5: "応募締切：202X年6月30日（金）",
        buttonText: "応募フォームはこちら",
        buttonLink: "#",
        note: "※応募多数の場合は選考とさせていただきます。\n※詳細は応募後、メールにてご連絡いたします。"
    },
    artists: [
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
    ],
    footer: {
        logo: "WA音祭",
        subtitle: "WAON FES",
        email: "info@waonfes.jp",
        tel: "03-XXXX-XXXX",
        copyright: "&copy; 2026 WA音祭（WAON FES）All Rights Reserved."
    }
};

// ===================================
// LocalStorage管理
// ===================================
function getStorageData() {
    const stored = localStorage.getItem('waonfes-data');
    return stored ? JSON.parse(stored) : JSON.parse(JSON.stringify(defaultData));
}

function saveToStorage(data) {
    localStorage.setItem('waonfes-data', JSON.stringify(data));
}

function resetToDefault() {
    if (confirm('本当にデータをリセットしますか？この操作は取り消せません。')) {
        localStorage.removeItem('waonfes-data');
        location.reload();
    }
}

// ===================================
// ページ初期化
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // ナビゲーションのクリックイベント
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // アクティブ状態を更新
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // パネルを切り替え
            const section = link.dataset.section;
            document.querySelectorAll('.edit-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            document.getElementById(section).classList.add('active');
            
            // フォームをロード
            loadSection(section);
        });
    });

    // リセットボタン
    document.getElementById('resetBtn').addEventListener('click', resetToDefault);

    // 最初のセクションをロード
    loadSection('hero');
});

// ===================================
// セクション読み込み
// ===================================
function loadSection(section) {
    const data = getStorageData();
    
    if (section === 'hero') {
        document.getElementById('heroTitle').value = data.hero.title;
        document.getElementById('heroSubtitle').value = data.hero.subtitle;
        document.getElementById('heroCatchphrase').value = data.hero.catchphrase;
        document.getElementById('heroDate').value = data.hero.date;
        document.getElementById('heroVenue').value = data.hero.venue;
    } else if (section === 'concept') {
        document.getElementById('conceptLead').value = data.concept.lead;
        document.getElementById('conceptText1').value = data.concept.text1;
        document.getElementById('conceptText2').value = data.concept.text2;
        document.getElementById('conceptText3').value = data.concept.text3;
    } else if (section === 'info') {
        document.getElementById('infoDate').value = data.info.date;
        document.getElementById('infoTime').value = data.info.time;
        document.getElementById('infoVenueName').value = data.info.venueName;
        document.getElementById('infoVenueAddress').value = data.info.venueAddress;
        document.getElementById('infoPriceAdvance').value = data.info.priceAdvance;
        document.getElementById('infoPriceDay').value = data.info.priceDay;
        document.getElementById('infoPriceDrink').value = data.info.priceDrink;
        document.getElementById('infoEmail').value = data.info.email;
        document.getElementById('infoTel').value = data.info.tel;
    } else if (section === 'entry') {
        document.getElementById('entryLead').value = data.entry.lead;
        document.getElementById('entryRequirement1').value = data.entry.requirement1;
        document.getElementById('entryRequirement2').value = data.entry.requirement2;
        document.getElementById('entryRequirement3').value = data.entry.requirement3;
        document.getElementById('entryRequirement4').value = data.entry.requirement4;
        document.getElementById('entryRequirement5').value = data.entry.requirement5;
        document.getElementById('entryButtonText').value = data.entry.buttonText;
        document.getElementById('entryButtonLink').value = data.entry.buttonLink;
        document.getElementById('entryNote').value = data.entry.note;
    } else if (section === 'artists') {
        renderArtistCards(data.artists);
    } else if (section === 'footer') {
        document.getElementById('footerLogo').value = data.footer.logo;
        document.getElementById('footerSubtitle').value = data.footer.subtitle;
        document.getElementById('footerEmail').value = data.footer.email;
        document.getElementById('footerTel').value = data.footer.tel;
        document.getElementById('footerCopyright').value = data.footer.copyright;
    }
}

// ===================================
// セクション保存
// ===================================
function saveSection(section) {
    const data = getStorageData();
    
    try {
        if (section === 'hero') {
            data.hero = {
                title: document.getElementById('heroTitle').value,
                subtitle: document.getElementById('heroSubtitle').value,
                catchphrase: document.getElementById('heroCatchphrase').value,
                date: document.getElementById('heroDate').value,
                venue: document.getElementById('heroVenue').value
            };
        } else if (section === 'concept') {
            data.concept = {
                lead: document.getElementById('conceptLead').value,
                text1: document.getElementById('conceptText1').value,
                text2: document.getElementById('conceptText2').value,
                text3: document.getElementById('conceptText3').value
            };
        } else if (section === 'info') {
            data.info = {
                date: document.getElementById('infoDate').value,
                time: document.getElementById('infoTime').value,
                venueName: document.getElementById('infoVenueName').value,
                venueAddress: document.getElementById('infoVenueAddress').value,
                priceAdvance: document.getElementById('infoPriceAdvance').value,
                priceDay: document.getElementById('infoPriceDay').value,
                priceDrink: document.getElementById('infoPriceDrink').value,
                email: document.getElementById('infoEmail').value,
                tel: document.getElementById('infoTel').value
            };
        } else if (section === 'entry') {
            data.entry = {
                lead: document.getElementById('entryLead').value,
                requirement1: document.getElementById('entryRequirement1').value,
                requirement2: document.getElementById('entryRequirement2').value,
                requirement3: document.getElementById('entryRequirement3').value,
                requirement4: document.getElementById('entryRequirement4').value,
                requirement5: document.getElementById('entryRequirement5').value,
                buttonText: document.getElementById('entryButtonText').value,
                buttonLink: document.getElementById('entryButtonLink').value,
                note: document.getElementById('entryNote').value
            };
        } else if (section === 'artists') {
            data.artists = collectArtists();
        } else if (section === 'footer') {
            data.footer = {
                logo: document.getElementById('footerLogo').value,
                subtitle: document.getElementById('footerSubtitle').value,
                email: document.getElementById('footerEmail').value,
                tel: document.getElementById('footerTel').value,
                copyright: document.getElementById('footerCopyright').value
            };
        }
        
        saveToStorage(data);
        showNotification('保存しました！', 'success');
    } catch (error) {
        console.error('Error saving data:', error);
        showNotification('保存に失敗しました。', 'error');
    }
}

// ===================================
// アーティスト管理
// ===================================
function renderArtistCards(artists) {
    const container = document.getElementById('artistsContainer');
    container.innerHTML = '';
    
    artists.forEach((artist, index) => {
        const card = document.createElement('div');
        card.className = 'artist-card';
        card.innerHTML = `
            <div class="artist-card-header">
                <h4 class="artist-card-title">アーティスト ${index + 1}</h4>
                <button type="button" class="artist-card-remove" onclick="removeArtist(${index})">削除</button>
            </div>
            <div class="form-group">
                <label>アーティスト名</label>
                <input type="text" class="form-input artist-name" value="${artist.name}" placeholder="例：和音楽団">
            </div>
            <div class="form-group">
                <label>画像URL</label>
                <input type="text" class="form-input artist-image" value="${artist.image}" placeholder="https://...">
            </div>
            <div class="form-group">
                <label>紹介文</label>
                <textarea class="form-textarea artist-description" rows="3" placeholder="アーティストの紹介文">${artist.description}</textarea>
            </div>
            <div class="form-group">
                <label>SNSリンク（Twitter）</label>
                <input type="text" class="form-input artist-sns" value="${artist.sns}" placeholder="https://twitter.com/...">
            </div>
        `;
        container.appendChild(card);
    });
}

function collectArtists() {
    const artists = [];
    document.querySelectorAll('.artist-card').forEach((card, index) => {
        const data = getStorageData();
        const id = data.artists[index] ? data.artists[index].id : `${Date.now()}-${index}`;
        
        artists.push({
            id: id,
            name: card.querySelector('.artist-name').value,
            image: card.querySelector('.artist-image').value,
            description: card.querySelector('.artist-description').value,
            sns: card.querySelector('.artist-sns').value
        });
    });
    return artists;
}

function addArtist() {
    const data = getStorageData();
    const newArtist = {
        id: `${Date.now()}`,
        name: "",
        image: "https://placehold.jp/30/999999/ffffff/300x300.png?text=New",
        description: "",
        sns: ""
    };
    data.artists.push(newArtist);
    saveToStorage(data);
    renderArtistCards(data.artists);
}

function removeArtist(index) {
    if (confirm('このアーティストを削除しますか？')) {
        const data = getStorageData();
        data.artists.splice(index, 1);
        saveToStorage(data);
        renderArtistCards(data.artists);
        showNotification('削除しました。', 'success');
    }
}

// ===================================
// 通知表示
// ===================================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // パネルの上に表示
    const panel = document.querySelector('.edit-panel.active');
    if (panel) {
        panel.insertBefore(notification, panel.firstChild);
    }
    
    // 3秒後に削除
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
