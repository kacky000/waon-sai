// ===================================
// 管理画面の初期化
// ===================================

// デフォルトデータ
const defaultData = {
    hero: {
        title: "WA音祭",
        subtitle: "WAON FES",
        catchphrase: "いい大人の、本気のエンタメ・チャレンジ",
        date: "2026年7月12日（日）",
        venue: "東京都新宿 HOLIDAY SHINJUKU"
    },
    concept: {
        lead: "ダンス・歌を中心にそれ以外の出し物も検討中です",
        text1: "7月開催のWA音祭の出演応募方法と詳細についてアナウンスします。",
        text2: "「自分の可能性を試してみたい」「仲間と共創したい」という方、ぜひこの機会に挑戦の旗を立ててください！",
        text3: "コミュニティ大連携！報酬も大事！中長期継続への実験集客として、観客・出演者・スタッフ・運営経験・プロの技術者など様々な参加形態があります。"
    },
    info: {
        date: "2026年7月12日（日）",
        time: "詳細はお決まり次第発表予定",
        venueName: "東京都新宿 HOLIDAY SHINJUKU",
        venueAddress: "アクセス：JR新宿駅東口から徒歩8〜10分",
        priceAdvance: "詳細は決定次第発表予定",
        priceDay: "グッズ販売あり",
        priceDrink: "参加費 5,000円",
        email: "info@waonfes.jp",
        tel: "03-XXXX-XXXX"
    },
    entry: {
        lead: "みんなで作る大人の音楽祭！！\n出演募集ジャンル：歌・ダンス、バンド・大道芸、コメディ・映像・演劇など",
        requirement1: "出演枠：8〜9組",
        requirement2: "持ち時間：10〜20分",
        requirement3: "形態：1〜6名のチーム",
        requirement4: "備考：地方＆海外オンライン出演OK！",
        requirement5: "応募締切：2月28日（土）",
        buttonText: "応募フォーム",
        buttonLink: "https://forms.gle/BRV8vJiQ9vdCodnL9",
        note: "応募方法：専用フォームより\n必要事項：PR動画 2〜3分\nオーディション：3月上旬開催"
    },
    artists: [
        {
            id: "1",
            name: "出演者募集中",
            image: "https://placehold.jp/30/C3002F/ffffff/300x300.png?text=出演者募集",
            description: "WA音祭では様々なジャンルの出演者を募集しています。歌、ダンス、バンド、コメディ、映像、演劇など、あなたの才能を発揮できるチャンスです！",
            sns: "https://forms.gle/BRV8vJiQ9vdCodnL9"
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
