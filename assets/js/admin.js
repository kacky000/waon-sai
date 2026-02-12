// ===================================
// 管理画面の初期化
// ===================================

// デフォルトデータ
const defaultData = {
    sectionFlags: {
        hero: false,
        concept: false,
        entry: false,
        timetable: false,
        artists: false,
        tickets: false,
        info: false,
        footer: false
    },
    sectionOrder: [
        "home",
        "concept",
        "entry",
        "timetable",
        "artist",
        "tickets",
        "information"
    ],
    hero: {
        title: "WA音祭",
        subtitle: "WAON FES",
        catchphrase: "いい大人の、本気のエンタメ・チャレンジ",
        date: "2026年7月12日（日）",
        venue: "東京都新宿 HOLIDAY SHINJUKU",
        image: "assets/media/thumb-02.png"
    },
    concept: {
        lead: "ダンス・歌を中心にそれ以外の出し物も検討中です",
        decoration: "いい大人の、本気のエンタメ・チャレンジ",
        texts: [
            "7月開催のWA音祭の出演応募方法と詳細についてアナウンスします。",
            "「自分の可能性を試してみたい」「仲間と共創したい」という方、ぜひこの機会に挑戦の旗を立ててください！",
            "コミュニティ大連携！報酬も大事！中長期継続への実験集客として、観客・出演者・スタッフ・運営経験・プロの技術者など様々な参加形態があります。"
        ]
    },
    info: {
        cards: [
            {
                title: "日時",
                detail: "2026年7月12日（日）\n詳細はお問い合わせください"
            },
            {
                title: "会場",
                detail: "東京都新宿 HOLIDAY SHINJUKU\nアクセス：JR新宿駅東口から徒歩8〜10分"
            },
            {
                title: "観客チケット",
                detail: "詳細は決定次第発表予定\nグッズ販売あり"
            },
            {
                title: "お問い合わせ",
                detail: "Email: info@waonfes.jp\nTel: 03-XXXX-XXXX"
            }
        ]
    },
    entry: {
        lead: "みんなで作る大人の音楽祭！！\n出演募集ジャンル：歌・ダンス、バンド・大道芸、コメディ・映像・演劇など",
        requirements: [
            "出演枠：8〜9組",
            "持ち時間：10〜20分",
            "形態：1〜6名のチーム",
            "備考：地方＆海外オンライン出演OK！",
            "応募締切：2月28日（土）"
        ],
        buttonText: "応募フォーム",
        buttonLink: "https://forms.gle/BRV8vJiQ9vdCodnL9",
        note: "応募方法：専用フォームより\n必要事項：PR動画 2〜3分\nオーディション：3月上旬開催"
    },
    tickets: {
        items: [
            {
                title: "一般",
                desc: "スタンディング / 再入場1回",
                price: "¥8,000"
            },
            {
                title: "学生",
                desc: "要学生証 / ドリンク1杯付き",
                price: "¥6,000"
            },
            {
                title: "VIP（限定特典）",
                desc: "前方リザーブ / バックステージ見学 / 記念ノベルティ",
                price: "¥15,000"
            }
        ],
        accessCopy: "SHINJUKU SPECIAL STAGE（新宿駅から徒歩5分）"
    },
    timetable: {
        items: [
            { time: "18:00", title: "Opening Ceremonies", detail: "開場・オープニングセレモニー" },
            { time: "18:30", title: "Artist A", detail: "和太鼓 × Drumstep" },
            { time: "19:30", title: "Artist B", detail: "尺八 × Future Bass" },
            { time: "20:30", title: "Artist C", detail: "琴 × Techno" },
            { time: "21:30", title: "All-Star Session", detail: "出演者全員によるコラボレーション" },
            { time: "22:30", title: "Closing", detail: "クロージング" }
        ]
    },
    artists: [
        {
            id: "1",
            name: "出演者募集中",
            image: "https://placehold.jp/30/C3002F/ffffff/300x300.png?text=出演者募集",
            description: "WA音祭では様々なジャンルの出演者を募集しています。歌、ダンス、バンド、コメディ、映像、演劇など、あなたの才能を発揮できるチャンスです！",
            member: "",
            hidden: false
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
    const data = stored ? JSON.parse(stored) : JSON.parse(JSON.stringify(defaultData));

    if (!data.sectionFlags) {
        data.sectionFlags = JSON.parse(JSON.stringify(defaultData.sectionFlags));
    }

    if (!Array.isArray(data.sectionOrder)) {
        data.sectionOrder = JSON.parse(JSON.stringify(defaultData.sectionOrder));
    }

    if (data.concept && !Array.isArray(data.concept.texts)) {
        const legacyTexts = [data.concept.text1, data.concept.text2, data.concept.text3].filter(Boolean);
        data.concept.texts = legacyTexts.length ? legacyTexts : JSON.parse(JSON.stringify(defaultData.concept.texts));
    }

    if (data.info && !Array.isArray(data.info.cards)) {
        const legacyCards = [
            {
                title: "日時",
                detail: [data.info.date, data.info.time].filter(Boolean).join("\n")
            },
            {
                title: "会場",
                detail: [data.info.venueName, data.info.venueAddress].filter(Boolean).join("\n")
            },
            {
                title: "観客チケット",
                detail: [data.info.priceAdvance, data.info.priceDay, data.info.priceDrink].filter(Boolean).join("\n")
            },
            {
                title: "お問い合わせ",
                detail: [data.info.email ? `Email: ${data.info.email}` : '', data.info.tel ? `Tel: ${data.info.tel}` : '']
                    .filter(Boolean)
                    .join("\n")
            }
        ];
        data.info.cards = legacyCards;
    }

    if (data.entry && !Array.isArray(data.entry.requirements)) {
        const legacy = [
            data.entry.requirement1,
            data.entry.requirement2,
            data.entry.requirement3,
            data.entry.requirement4,
            data.entry.requirement5
        ].filter(Boolean);
        data.entry.requirements = legacy.length ? legacy : JSON.parse(JSON.stringify(defaultData.entry.requirements));
    }

    if (!data.tickets) {
        data.tickets = JSON.parse(JSON.stringify(defaultData.tickets));
    }

    if (!data.timetable) {
        data.timetable = JSON.parse(JSON.stringify(defaultData.timetable));
    }

    if (data.artists && Array.isArray(data.artists)) {
        data.artists = data.artists.map(artist => {
            if (artist.member === undefined && artist.area !== undefined) {
                return { ...artist, member: artist.area };
            }
            return artist;
        });
    }

    return data;
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
        const heroImageInput = document.getElementById('heroImage');
        if (heroImageInput) heroImageInput.value = '';
        const heroImageCurrent = document.getElementById('heroImageCurrent');
        if (heroImageCurrent) heroImageCurrent.textContent = data.hero.image || '未設定';
        const flag = document.getElementById('comingSoon-hero');
        if (flag) flag.checked = !!data.sectionFlags.hero;
    } else if (section === 'concept') {
        document.getElementById('conceptLead').value = data.concept.lead;
        document.getElementById('conceptDecoration').value = data.concept.decoration || '';
        renderConceptTexts(data.concept.texts || []);
        const flag = document.getElementById('comingSoon-concept');
        if (flag) flag.checked = !!data.sectionFlags.concept;
    } else if (section === 'info') {
        renderInfoCards(data.info.cards || []);
        const flag = document.getElementById('comingSoon-info');
        if (flag) flag.checked = !!data.sectionFlags.info;
    } else if (section === 'entry') {
        document.getElementById('entryLead').value = data.entry.lead;
        document.getElementById('entryButtonText').value = data.entry.buttonText;
        document.getElementById('entryButtonLink').value = data.entry.buttonLink;
        document.getElementById('entryNote').value = data.entry.note;
        renderEntryRequirements(data.entry.requirements || []);
        const flag = document.getElementById('comingSoon-entry');
        if (flag) flag.checked = !!data.sectionFlags.entry;
    } else if (section === 'timetable') {
        renderTimetableCards(data.timetable?.items || []);
        const flag = document.getElementById('comingSoon-timetable');
        if (flag) flag.checked = !!data.sectionFlags.timetable;
    } else if (section === 'tickets') {
        const items = data.tickets?.items || [];
        renderTickets(items);
        document.getElementById('accessCopy').value = data.tickets?.accessCopy || '';
        const flag = document.getElementById('comingSoon-tickets');
        if (flag) flag.checked = !!data.sectionFlags.tickets;
    } else if (section === 'order') {
        renderSectionOrder(data.sectionOrder || []);
    } else if (section === 'artists') {
        renderArtistCards(data.artists);
        const flag = document.getElementById('comingSoon-artists');
        if (flag) flag.checked = !!data.sectionFlags.artists;
    } else if (section === 'footer') {
        document.getElementById('footerLogo').value = data.footer.logo;
        document.getElementById('footerSubtitle').value = data.footer.subtitle;
        document.getElementById('footerEmail').value = data.footer.email;
        document.getElementById('footerTel').value = data.footer.tel;
        document.getElementById('footerCopyright').value = data.footer.copyright;
        const flag = document.getElementById('comingSoon-footer');
        if (flag) flag.checked = !!data.sectionFlags.footer;
    }
}

// ===================================
// セクション保存
// ===================================
function saveSection(section) {
    const data = getStorageData();
    
    try {
        if (section === 'hero') {
            const heroImageInput = document.getElementById('heroImage');
            const heroPayload = {
                title: document.getElementById('heroTitle').value,
                subtitle: document.getElementById('heroSubtitle').value,
                catchphrase: document.getElementById('heroCatchphrase').value,
                date: document.getElementById('heroDate').value,
                venue: document.getElementById('heroVenue').value,
                image: data.hero.image || ''
            };

            if (heroImageInput && heroImageInput.files && heroImageInput.files[0]) {
                const file = heroImageInput.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                    heroPayload.image = reader.result;
                    data.hero = heroPayload;
                    data.sectionFlags.hero = document.getElementById('comingSoon-hero')?.checked || false;
                    saveToStorage(data);
                    showNotification('保存しました！', 'success');
                    loadSection('hero');
                };
                reader.onerror = () => {
                    console.error('Error reading hero image file');
                    showNotification('画像の読み込みに失敗しました。', 'error');
                };
                reader.readAsDataURL(file);
                return;
            }

            data.hero = heroPayload;
            data.sectionFlags.hero = document.getElementById('comingSoon-hero')?.checked || false;
        } else if (section === 'concept') {
            data.concept = {
                lead: document.getElementById('conceptLead').value,
                decoration: document.getElementById('conceptDecoration').value,
                texts: collectConceptTexts()
            };
            data.sectionFlags.concept = document.getElementById('comingSoon-concept')?.checked || false;
        } else if (section === 'info') {
            data.info = {
                cards: collectInfoCards()
            };
            data.sectionFlags.info = document.getElementById('comingSoon-info')?.checked || false;
        } else if (section === 'entry') {
            data.entry = {
                lead: document.getElementById('entryLead').value,
                requirements: collectEntryRequirements(),
                buttonText: document.getElementById('entryButtonText').value,
                buttonLink: document.getElementById('entryButtonLink').value,
                note: document.getElementById('entryNote').value
            };
            data.sectionFlags.entry = document.getElementById('comingSoon-entry')?.checked || false;
        } else if (section === 'timetable') {
            data.timetable = {
                items: collectTimetableItems()
            };
            data.sectionFlags.timetable = document.getElementById('comingSoon-timetable')?.checked || false;
        } else if (section === 'tickets') {
            data.tickets = {
                items: collectTickets(),
                accessCopy: document.getElementById('accessCopy').value
            };
            data.sectionFlags.tickets = document.getElementById('comingSoon-tickets')?.checked || false;
        } else if (section === 'order') {
            data.sectionOrder = collectSectionOrder();
        } else if (section === 'artists') {
            data.artists = collectArtists();
            data.sectionFlags.artists = document.getElementById('comingSoon-artists')?.checked || false;
        } else if (section === 'footer') {
            data.footer = {
                logo: document.getElementById('footerLogo').value,
                subtitle: document.getElementById('footerSubtitle').value,
                email: document.getElementById('footerEmail').value,
                tel: document.getElementById('footerTel').value,
                copyright: document.getElementById('footerCopyright').value
            };
            data.sectionFlags.footer = document.getElementById('comingSoon-footer')?.checked || false;
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
                <label>画像（アップロード）</label>
                <div class="input-row">
                    <input type="file" class="form-input artist-image-file" accept="image/*">
                    <input type="hidden" class="artist-image-data" value="${artist.image || ''}">
                </div>
                <img class="artist-preview" src="${artist.image || 'https://placehold.jp/30/999999/ffffff/300x300.png?text=Image'}" alt="${artist.name}">
            </div>
            <div class="form-group">
                <label>紹介文</label>
                <textarea class="form-textarea artist-description" rows="3" placeholder="アーティストの紹介文">${artist.description}</textarea>
            </div>
            <div class="form-group">
                <label>メンバー</label>
                <input type="text" class="form-input artist-member" value="${artist.member || artist.area || ''}" placeholder="例：1〜6名">
            </div>
            <div class="form-group">
                <label class="checkbox-label">
                    <input type="checkbox" class="artist-hidden" ${artist.hidden ? 'checked' : ''}>
                    非表示にする
                </label>
            </div>
        `;
        container.appendChild(card);

        const fileInput = card.querySelector('.artist-image-file');
        const imageData = card.querySelector('.artist-image-data');
        const preview = card.querySelector('.artist-preview');
        if (fileInput && imageData && preview) {
            fileInput.addEventListener('change', () => {
                const file = fileInput.files && fileInput.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                    imageData.value = reader.result;
                    preview.src = reader.result;
                };
                reader.readAsDataURL(file);
            });
        }
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
            image: card.querySelector('.artist-image-data').value,
            description: card.querySelector('.artist-description').value,
            member: card.querySelector('.artist-member').value,
            hidden: card.querySelector('.artist-hidden').checked
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
        member: "",
        hidden: false
    };
    data.artists.push(newArtist);
    saveToStorage(data);
    renderArtistCards(data.artists);
}

// ===================================
// コンセプトテキスト管理
// ===================================
function renderConceptTexts(texts) {
    const container = document.getElementById('conceptTextContainer');
    if (!container) return;
    container.innerHTML = '';

    texts.forEach((text, index) => {
        const row = document.createElement('div');
        row.className = 'form-group concept-text-row';
        row.innerHTML = `
            <label>説明 ${index + 1}</label>
            <div class="input-row">
                <textarea class="form-textarea concept-text" rows="2" placeholder="コンセプトの説明文">${text}</textarea>
                <button type="button" class="btn btn-danger btn-small" onclick="removeConceptText(${index})">削除</button>
            </div>
        `;
        container.appendChild(row);
    });
}

function collectConceptTexts() {
    return Array.from(document.querySelectorAll('.concept-text'))
        .map(input => input.value)
        .filter(value => value && value.trim() !== '');
}

function addConceptText() {
    const data = getStorageData();
    data.concept.texts = data.concept.texts || [];
    data.concept.texts.push('');
    saveToStorage(data);
    renderConceptTexts(data.concept.texts);
}

function removeConceptText(index) {
    const data = getStorageData();
    data.concept.texts.splice(index, 1);
    saveToStorage(data);
    renderConceptTexts(data.concept.texts);
}

// ===================================
// 開催情報カード管理
// ===================================
function renderInfoCards(cards) {
    const container = document.getElementById('infoCardsContainer');
    if (!container) return;
    container.innerHTML = '';

    cards.forEach((card, index) => {
        const row = document.createElement('div');
        row.className = 'info-card-edit';
        row.innerHTML = `
            <div class="artist-card-header">
                <h4 class="artist-card-title">カード ${index + 1}</h4>
                <button type="button" class="artist-card-remove" onclick="removeInfoCard(${index})">削除</button>
            </div>
            <div class="form-group">
                <label>タイトル</label>
                <input type="text" class="form-input info-card-title" value="${card.title || ''}" placeholder="例：日時">
            </div>
            <div class="form-group">
                <label>内容</label>
                <textarea class="form-textarea info-card-detail" rows="3" placeholder="例：2026年7月12日（日）\n詳細はお問い合わせください">${card.detail || ''}</textarea>
            </div>
        `;
        container.appendChild(row);
    });
}

function collectInfoCards() {
    const cards = document.querySelectorAll('.info-card-edit');
    return Array.from(cards).map(card => ({
        title: card.querySelector('.info-card-title').value,
        detail: card.querySelector('.info-card-detail').value
    })).filter(card => card.title || card.detail);
}

function addInfoCard() {
    const data = getStorageData();
    data.info.cards = data.info.cards || [];
    data.info.cards.push({ title: '', detail: '' });
    saveToStorage(data);
    renderInfoCards(data.info.cards);
}

function removeInfoCard(index) {
    const data = getStorageData();
    data.info.cards.splice(index, 1);
    saveToStorage(data);
    renderInfoCards(data.info.cards);
}

// ===================================
// チケット管理
// ===================================
function renderTickets(items) {
    const container = document.getElementById('ticketsContainer');
    if (!container) return;
    container.innerHTML = '';

    items.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'ticket-edit-card';
        row.innerHTML = `
            <div class="artist-card-header">
                <h4 class="artist-card-title">チケット ${index + 1}</h4>
                <button type="button" class="artist-card-remove" onclick="removeTicket(${index})">削除</button>
            </div>
            <div class="form-group">
                <label>タイトル</label>
                <input type="text" class="form-input ticket-title" value="${item.title || ''}" placeholder="例：一般">
            </div>
            <div class="form-group">
                <label>説明</label>
                <input type="text" class="form-input ticket-desc" value="${item.desc || ''}" placeholder="例：スタンディング / 再入場1回">
            </div>
            <div class="form-group">
                <label>価格</label>
                <input type="text" class="form-input ticket-price" value="${item.price || ''}" placeholder="例：¥8,000">
            </div>
        `;
        container.appendChild(row);
    });
}

function collectTickets() {
    const cards = document.querySelectorAll('.ticket-edit-card');
    return Array.from(cards).map(card => ({
        title: card.querySelector('.ticket-title').value,
        desc: card.querySelector('.ticket-desc').value,
        price: card.querySelector('.ticket-price').value
    })).filter(item => item.title || item.desc || item.price);
}

function addTicket() {
    const data = getStorageData();
    data.tickets.items.push({ title: '', desc: '', price: '' });
    saveToStorage(data);
    renderTickets(data.tickets.items);
}

function removeTicket(index) {
    const data = getStorageData();
    data.tickets.items.splice(index, 1);
    saveToStorage(data);
    renderTickets(data.tickets.items);
}

// ===================================
// セクション順管理
// ===================================
const SECTION_LABELS = {
    home: 'HOME',
    concept: 'CONCEPT',
    entry: 'ENTRY',
    timetable: 'TIMETABLE',
    artist: 'ARTIST',
    tickets: 'TICKETS',
    information: 'INFO'
};

function renderSectionOrder(order) {
    const container = document.getElementById('sectionOrderContainer');
    if (!container) return;
    container.innerHTML = '';

    order.forEach((key, index) => {
        const row = document.createElement('div');
        row.className = 'section-order-row';
        row.dataset.sectionKey = key;
        row.innerHTML = `
            <div class="section-order-label">${SECTION_LABELS[key] || key}</div>
            <div class="section-order-actions">
                <button type="button" class="btn btn-secondary btn-small" onclick="moveSectionOrder(${index}, -1)">↑</button>
                <button type="button" class="btn btn-secondary btn-small" onclick="moveSectionOrder(${index}, 1)">↓</button>
            </div>
        `;
        container.appendChild(row);
    });
}

function moveSectionOrder(index, delta) {
    const data = getStorageData();
    const order = data.sectionOrder || [];
    const newIndex = index + delta;
    if (newIndex < 0 || newIndex >= order.length) return;
    const [item] = order.splice(index, 1);
    order.splice(newIndex, 0, item);
    data.sectionOrder = order;
    saveToStorage(data);
    renderSectionOrder(order);
}

function collectSectionOrder() {
    return Array.from(document.querySelectorAll('.section-order-row'))
        .map(row => row.dataset.sectionKey)
        .filter(Boolean);
}

// ===================================
// 募集要項管理
// ===================================
function renderEntryRequirements(requirements) {
    const container = document.getElementById('entryRequirementsContainer');
    if (!container) return;
    container.innerHTML = '';

    requirements.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'form-group entry-requirement-row';
        row.innerHTML = `
            <label>要項 ${index + 1}</label>
            <div class="input-row">
                <input type="text" class="form-input entry-requirement" value="${item}" placeholder="募集要項を入力">
                <button type="button" class="btn btn-danger btn-small" onclick="removeEntryRequirement(${index})">削除</button>
            </div>
        `;
        container.appendChild(row);
    });
}

function collectEntryRequirements() {
    return Array.from(document.querySelectorAll('.entry-requirement'))
        .map(input => input.value)
        .filter(value => value && value.trim() !== '');
}

function addEntryRequirement() {
    const data = getStorageData();
    data.entry.requirements = data.entry.requirements || [];
    data.entry.requirements.push('');
    saveToStorage(data);
    renderEntryRequirements(data.entry.requirements);
}

function removeEntryRequirement(index) {
    const data = getStorageData();
    data.entry.requirements.splice(index, 1);
    saveToStorage(data);
    renderEntryRequirements(data.entry.requirements);
}

// ===================================
// タイムテーブル管理
// ===================================
function renderTimetableCards(items) {
    const container = document.getElementById('timetableContainer');
    if (!container) return;
    container.innerHTML = '';

    items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'timetable-card';
        card.innerHTML = `
            <div class="artist-card-header">
                <h4 class="artist-card-title">タイムテーブル ${index + 1}</h4>
                <button type="button" class="artist-card-remove" onclick="removeTimetableItem(${index})">削除</button>
            </div>
            <div class="form-group">
                <label>時間</label>
                <input type="text" class="form-input timetable-time" value="${item.time || ''}" placeholder="例：18:00">
            </div>
            <div class="form-group">
                <label>タイトル</label>
                <input type="text" class="form-input timetable-title" value="${item.title || ''}" placeholder="例：Opening Ceremonies">
            </div>
            <div class="form-group">
                <label>詳細</label>
                <input type="text" class="form-input timetable-detail" value="${item.detail || ''}" placeholder="例：開場・オープニングセレモニー">
            </div>
        `;
        container.appendChild(card);
    });
}

function collectTimetableItems() {
    const cards = document.querySelectorAll('.timetable-card');
    return Array.from(cards).map(card => ({
        time: card.querySelector('.timetable-time').value,
        title: card.querySelector('.timetable-title').value,
        detail: card.querySelector('.timetable-detail').value
    })).filter(item => item.time || item.title || item.detail);
}

function addTimetableItem() {
    const data = getStorageData();
    data.timetable.items.push({ time: '', title: '', detail: '' });
    saveToStorage(data);
    renderTimetableCards(data.timetable.items);
}

function removeTimetableItem(index) {
    const data = getStorageData();
    data.timetable.items.splice(index, 1);
    saveToStorage(data);
    renderTimetableCards(data.timetable.items);
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
