// ===================================
// 管理画面の初期化
// ===================================

// デフォルトデータ
const defaultData = {
    sectionFlags: {
        hero: false,
        concept: false,
        entry: false,
        qna: false,
        timetable: false,
        artists: false,
        goods: false,
        tickets: false,
        info: false,
        footer: false
    },
    sectionHidden: {
        hero: false,
        concept: false,
        entry: false,
        qna: false,
        timetable: false,
        artists: false,
        goods: false,
        tickets: false,
        info: false,
        footer: false
    },
    sectionOrder: [
        "home",
        "concept",
        "entry",
        "qna",
        "timetable",
        "artist",
        "goods",
        "tickets",
        "information"
    ],
    sectionTitles: {
        concept: { en: "CONCEPT", ja: "開催趣旨" },
        entry: { en: "ENTRY", ja: "出演募集" },
        qna: { en: "Q&A", ja: "よくある質問" },
        timetable: { en: "TIMETABLE", ja: "タイムテーブル" },
        artist: { en: "ARTIST", ja: "出演者" },
        goods: { en: "GOODS", ja: "グッズ" },
        tickets: { en: "TICKETS", ja: "チケット" },
        information: { en: "INFORMATION", ja: "開催概要" }
    },
    comingSoonText: "Coming Soon",
    hero: {},
    concept: {
        bgImage: "",
        copyImage: "",
        texts: [
            "オトナの皆さんへ。",
            "あの時抱えていた衝動は、まだ燃えていますか。",
            "祭りの輪をくぐれば、そこはもう",
            "あなたの魂を解き放つ舞台です。",
            "ここは、ダンス・歌を中心に、",
            "コメディや映像作品など、幅広いエンタメに挑む場所。"
        ]
    },
    message: {
        text: "あなたの本気で、\nこの夜を動かそう。"
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
        bgImage: "",
        lead: "WA音祭（わおんさい）は、皆で作る「大人の文化祭」です。\n現在、出演者を募集しています。\nジャンルは、歌・ダンスを中心に、\nバンド・大道芸・コメディ・映像・演劇など.......\n幅広い「エンタメ」のエントリーをお待ちしています。",
        requirements: [
            "出演枠｜8〜9組",
            "持ち時間｜10〜20分",
            "形態｜1〜6名のチーム",
            "備考｜地方＆海外オンライン出演OK！",
            "応募締切｜2月28日（土）"
        ],
        buttonText: "応募フォーム",
        buttonLink: "https://forms.gle/BRV8vJiQ9vdCodnL9",
        note: "必要事項｜PR動画 2〜3分　オーディション｜3月上旬開催　参加費｜5,000円"
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
        accessTitle: "ACCESS",
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
    },
    qna: [
        {
            question: "出演の応募条件はありますか？年齢や実績などの動画が必要ですか？",
            answer: "特別な応募条件はありません。5歳から応募可能です。PR動画2〜3分をご提出いただきます。"
        },
        {
            question: "SNSチャンネルやチャンネルをもっていないと参加できませんか？",
            answer: "SNSチャンネルは必須ではありません。ただし、集客につながるためあると望ましいです。"
        },
        {
            question: "バンドやチームでの参加の場合、メンバー人数に制限はありますか？",
            answer: "1〜6名までのチームでの参加が可能です。"
        },
        {
            question: "1人でチームを組みたいのですが、他のメンバーを探すサポートはありますか？",
            answer: "はい、コミュニティ内でメンバー募集のお手伝いをしています。"
        },
        {
            question: "1人でゲーム実況や実況、講談○○ゲーム実況なども出演できますか？",
            answer: "はい、ジャンル不問ですので、説得力のあるPR動画をお送りください。面白いと思ったら何でも歓迎です！"
        }
    ],
    goods: {
        items: [
            { name: "デモ未定", image: "assets/media/black.png", price: "¥5,000" },
            { name: "デモ未定", image: "assets/media/black.png", price: "¥5,000" },
            { name: "デモ未定", image: "assets/media/black.png", price: "¥5,000" }
        ],
        note: "ここで決済が行われる想定の場所（※ ECサイトリンクでもOK）です",
        shopLink: ""
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

    if (!data.sectionTitles) {
        data.sectionTitles = JSON.parse(JSON.stringify(defaultData.sectionTitles));
    }

    if (!data.comingSoonText) {
        data.comingSoonText = defaultData.comingSoonText;
    }

    if (data.tickets && !data.tickets.accessTitle) {
        data.tickets.accessTitle = 'ACCESS';
    }

    if (!Array.isArray(data.qna)) {
        data.qna = JSON.parse(JSON.stringify(defaultData.qna));
    }

    if (!data.goods) {
        data.goods = JSON.parse(JSON.stringify(defaultData.goods));
    }

    return data;
}

function saveToStorage(data) {
    // 保存時にタイムスタンプを付与（マージ時の判定に使用）
    data._lastModified = Date.now();
    localStorage.setItem('waonfes-data', JSON.stringify(data));
}

// ===================================
// リモートデータ取得 & マージ
// ===================================

/**
 * data.json を fetch して最新データを取得する。
 * GitHub Pages / 任意サーバー上のファイルを読み込む。
 */
async function fetchRemoteData() {
    try {
        const res = await fetch('data.json?t=' + Date.now());
        if (res.ok) {
            return await res.json();
        }
    } catch (e) {
        console.warn('data.json fetch failed:', e);
    }
    return null;
}

/**
 * リモート（data.json）のデータをローカル（localStorage）にディープマージする。
 * ローカルに値がなければリモートの値を採用。
 * ローカルに値があればローカルを優先（ユーザーが編集した可能性があるため）。
 */
function deepMerge(local, remote) {
    if (remote === null || remote === undefined) return local;
    if (local === null || local === undefined) return JSON.parse(JSON.stringify(remote));
    
    // 配列はローカル優先（管理画面でアイテムの追加/削除/並び替えがあるため）
    if (Array.isArray(local) || Array.isArray(remote)) {
        return local !== undefined && local !== null ? local : remote;
    }
    
    // オブジェクトの場合は各キーを再帰マージ
    if (typeof local === 'object' && typeof remote === 'object') {
        const merged = { ...remote };
        for (const key of Object.keys(local)) {
            if (key in remote) {
                merged[key] = deepMerge(local[key], remote[key]);
            } else {
                merged[key] = local[key];
            }
        }
        return merged;
    }
    
    // プリミティブはローカル優先
    return local;
}

/**
 * 管理画面起動時に data.json を fetch し、ローカルの localStorage とマージする。
 * - localStorage が空 → data.json の内容をそのまま採用
 * - localStorage に既存データあり → ローカルのデータにリモートの不足分を補完
 * - data.json が取得できない → localStorage のまま続行
 */
async function fetchLatestAndMerge() {
    const remote = await fetchRemoteData();
    if (!remote) {
        console.log('リモートデータ取得スキップ（data.json なし or オフライン）');
        return;
    }

    const stored = localStorage.getItem('waonfes-data');
    if (!stored) {
        // ローカルにデータなし → リモートをそのまま採用
        localStorage.setItem('waonfes-data', JSON.stringify(remote));
        console.log('リモートデータをローカルに初期展開しました');
        return;
    }

    const local = JSON.parse(stored);
    const localMod = local._lastModified || 0;
    const remoteMod = remote._lastModified || 0;

    if (localMod === 0 || localMod <= remoteMod) {
        // ローカルが古い or タイムスタンプなし → リモートを優先採用
        remote._lastModified = remoteMod;
        localStorage.setItem('waonfes-data', JSON.stringify(remote));
        console.log('リモートデータがローカルより新しいため、リモートを採用しました');
    } else {
        // ローカルが新しい → リモートの新キーだけ補完
        const merged = deepMerge(local, remote);
        merged._lastModified = localMod;
        localStorage.setItem('waonfes-data', JSON.stringify(merged));
        console.log('ローカルデータにリモートの不足分をマージしました');
    }
}

/**
 * 公開前にリモートの最新データを取得し、ローカルの変更とマージしたうえで公開する。
 * これにより他の人が先に公開した変更を上書きしない。
 */
async function mergeBeforePublish() {
    const config = getGitHubConfig();
    if (!config.token || !config.owner || !config.repo) return;

    const headers = {
        'Authorization': `token ${config.token}`,
        'Accept': 'application/vnd.github.v3+json'
    };

    try {
        const apiBase = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/data.json`;
        const getRes = await fetch(`${apiBase}?ref=${config.branch}`, { headers });
        if (!getRes.ok) return; // ファイルがまだない場合はスキップ

        const fileInfo = await getRes.json();
        // Base64デコード
        const remoteJson = JSON.parse(decodeURIComponent(escape(atob(fileInfo.content.replace(/\n/g, '')))));
        const local = getStorageData();

        const localMod = local._lastModified || 0;
        const remoteMod = remoteJson._lastModified || 0;

        if (remoteMod > localMod) {
            // リモートの方が新しい → リモートベースにローカルの変更を上書き
            // ※ローカルで最後に保存したセクションのデータがリモートに反映される
            const merged = deepMerge(local, remoteJson);
            merged._lastModified = Date.now();
            saveToStorage(merged);
            console.log('公開前マージ: リモートベースにローカル変更を統合しました');
        }
    } catch (e) {
        console.warn('公開前マージスキップ:', e);
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

    // GitHub設定を読み込み
    loadGitHubSettings();

    // リモート（data.json）から最新データを取得してローカルとマージ
    fetchLatestAndMerge().then(() => {
        // マージ完了後にセクションをロード
        loadSection('hero');
        console.log('管理画面: 最新データの同期完了');
    }).catch(e => {
        console.warn('リモートデータ同期エラー:', e);
        loadSection('hero');
    });
});

// ===================================
// セクション読み込み
// ===================================
function loadSection(section) {
    const data = getStorageData();
    
    if (section === 'hero') {
        const flag = document.getElementById('comingSoon-hero');
        if (flag) flag.checked = !!data.sectionFlags.hero;
    } else if (section === 'concept') {
        const conceptBgImageInput = document.getElementById('conceptBgImage');
        if (conceptBgImageInput) conceptBgImageInput.value = '';
        const conceptBgImageCurrent = document.getElementById('conceptBgImageCurrent');
        if (conceptBgImageCurrent) conceptBgImageCurrent.textContent = data.concept.bgImage ? '設定済み' : 'デフォルト';
        const conceptCopyImageInput = document.getElementById('conceptCopyImage');
        if (conceptCopyImageInput) conceptCopyImageInput.value = '';
        const conceptCopyImageCurrent = document.getElementById('conceptCopyImageCurrent');
        if (conceptCopyImageCurrent) conceptCopyImageCurrent.textContent = data.concept.copyImage ? '設定済み' : 'デフォルト';
        renderConceptTexts(data.concept.texts || []);
        // メッセージも読み込み
        document.getElementById('messageText').value = data.message?.text || '';
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
        // 背景画像プレビュー
        const entryBgPreview = document.getElementById('entryBgImagePreview');
        if (entryBgPreview && data.entry.bgImage) {
            entryBgPreview.src = data.entry.bgImage;
            entryBgPreview.style.display = 'block';
        }
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
    } else if (section === 'titles') {
        renderSectionTitles(data.sectionTitles || {});
    } else if (section === 'settings') {
        document.getElementById('comingSoonText').value = data.comingSoonText || 'Coming Soon';
        const ticketsAccessTitle = document.getElementById('ticketsAccessTitle');
        if (ticketsAccessTitle) ticketsAccessTitle.value = data.tickets?.accessTitle || 'ACCESS';
    } else if (section === 'qna') {
        renderQnaCards(data.qna || []);
        const flag = document.getElementById('comingSoon-qna');
        if (flag) flag.checked = !!data.sectionFlags.qna;
    } else if (section === 'goods') {
        renderGoodsCards(data.goods?.items || []);
        const goodsNote = document.getElementById('goodsNoteInput');
        if (goodsNote) goodsNote.value = data.goods?.note || '';
        const goodsShopLink = document.getElementById('goodsShopLink');
        if (goodsShopLink) goodsShopLink.value = data.goods?.shopLink || '';
        const flag = document.getElementById('comingSoon-goods');
        if (flag) flag.checked = !!data.sectionFlags.goods;
    } else if (section === 'github') {
        loadGitHubSettings();
    }

    // 非表示フラグの読み込み（全セクション共通）
    const hiddenFlag = document.getElementById('hidden-' + section);
    if (hiddenFlag) {
        if (!data.sectionHidden) data.sectionHidden = {};
        hiddenFlag.checked = !!data.sectionHidden[section];
    }
}

// ===================================
// セクション保存
// ===================================
function saveSection(section) {
    const data = getStorageData();
    
    try {
        if (section === 'hero') {
            data.sectionFlags.hero = document.getElementById('comingSoon-hero')?.checked || false;
        } else if (section === 'concept') {
            const conceptBgImageInput = document.getElementById('conceptBgImage');
            const conceptCopyImageInput = document.getElementById('conceptCopyImage');
            const conceptPayload = {
                bgImage: data.concept.bgImage || '',
                copyImage: data.concept.copyImage || '',
                texts: collectConceptTexts()
            };

            // 画像読み込みをPromiseで処理
            const readFile = (input) => new Promise((resolve, reject) => {
                if (input && input.files && input.files[0]) {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = () => reject(new Error('画像の読み込みに失敗'));
                    reader.readAsDataURL(input.files[0]);
                } else {
                    resolve(null);
                }
            });

            Promise.all([readFile(conceptBgImageInput), readFile(conceptCopyImageInput)])
                .then(([bgResult, copyResult]) => {
                    if (bgResult) conceptPayload.bgImage = bgResult;
                    if (copyResult) conceptPayload.copyImage = copyResult;
                    data.concept = conceptPayload;
                    data.sectionFlags.concept = document.getElementById('comingSoon-concept')?.checked || false;
                    // メッセージも保存
                    if (!data.message) data.message = {};
                    data.message.text = document.getElementById('messageText').value;
                    // 非表示フラグ
                    if (!data.sectionHidden) data.sectionHidden = {};
                    const hiddenFlag = document.getElementById('hidden-concept');
                    if (hiddenFlag) data.sectionHidden.concept = hiddenFlag.checked;
                    saveToStorage(data);
                    showNotification('保存しました！', 'success');
                    loadSection('concept');
                })
                .catch(() => {
                    showNotification('画像の読み込みに失敗しました。', 'error');
                });
            return;
        } else if (section === 'info') {
            data.info = {
                cards: collectInfoCards()
            };
            data.sectionFlags.info = document.getElementById('comingSoon-info')?.checked || false;
        } else if (section === 'entry') {
            const entryBgFile = document.getElementById('entryBgImage').files[0];
            const prevBgImage = data.entry?.bgImage || '';

            const entryData = {
                bgImage: prevBgImage,
                lead: document.getElementById('entryLead').value,
                requirements: collectEntryRequirements(),
                buttonText: document.getElementById('entryButtonText').value,
                buttonLink: document.getElementById('entryButtonLink').value,
                note: document.getElementById('entryNote').value
            };
            data.sectionFlags.entry = document.getElementById('comingSoon-entry')?.checked || false;

            if (entryBgFile) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    entryData.bgImage = e.target.result;
                    data.entry = entryData;
                    // hidden flag
                    const hiddenKey = 'entry';
                    const hiddenEl = document.getElementById('hidden-' + hiddenKey);
                    if (hiddenEl && data.sectionHidden) data.sectionHidden[hiddenKey] = hiddenEl.checked;
                    localStorage.setItem('waonfes-data', JSON.stringify(data));
                    showNotification('出演者募集セクションを保存しました');
                };
                reader.readAsDataURL(entryBgFile);
                return;
            } else {
                data.entry = entryData;
            }
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
        } else if (section === 'titles') {
            data.sectionTitles = collectSectionTitles();
        } else if (section === 'settings') {
            data.comingSoonText = document.getElementById('comingSoonText').value;
            if (data.tickets) {
                data.tickets.accessTitle = document.getElementById('ticketsAccessTitle').value;
            }
        } else if (section === 'qna') {
            data.qna = collectQnaItems();
            data.sectionFlags.qna = document.getElementById('comingSoon-qna')?.checked || false;
        } else if (section === 'goods') {
            data.goods = {
                items: collectGoodsItems(),
                note: document.getElementById('goodsNoteInput')?.value || '',
                shopLink: document.getElementById('goodsShopLink')?.value || ''
            };
            data.sectionFlags.goods = document.getElementById('comingSoon-goods')?.checked || false;
        }

        // 非表示フラグの保存（全セクション共通）
        if (!data.sectionHidden) data.sectionHidden = {};
        const hiddenFlag = document.getElementById('hidden-' + section);
        if (hiddenFlag) data.sectionHidden[section] = hiddenFlag.checked;
        
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
// セクションタイトル管理
// ===================================
function renderSectionTitles(titles) {
    const container = document.getElementById('sectionTitlesContainer');
    if (!container) return;
    container.innerHTML = '';

    const sections = ['concept', 'entry', 'qna', 'timetable', 'artist', 'goods', 'tickets', 'information'];
    sections.forEach(key => {
        const title = titles[key] || { en: '', ja: '' };
        const row = document.createElement('div');
        row.className = 'form-group section-title-row';
        row.innerHTML = `
            <h4 class="subsection-title">${key.toUpperCase()}</h4>
            <div class="form-group">
                <label>英語タイトル</label>
                <input type="text" class="form-input section-title-en" data-section="${key}" value="${title.en || ''}" placeholder="例：CONCEPT">
            </div>
            <div class="form-group">
                <label>日本語タイトル</label>
                <input type="text" class="form-input section-title-ja" data-section="${key}" value="${title.ja || ''}" placeholder="例：開催趣旨">
            </div>
        `;
        container.appendChild(row);
    });
}

function collectSectionTitles() {
    const titles = {};
    const sections = ['concept', 'entry', 'qna', 'timetable', 'artist', 'goods', 'tickets', 'information'];
    
    sections.forEach(key => {
        const enInput = document.querySelector(`.section-title-en[data-section="${key}"]`);
        const jaInput = document.querySelector(`.section-title-ja[data-section="${key}"]`);
        titles[key] = {
            en: enInput ? enInput.value : '',
            ja: jaInput ? jaInput.value : ''
        };
    });
    
    return titles;
}

// ===================================
// Goods管理
// ===================================
function renderGoodsCards(items) {
    const container = document.getElementById('goodsContainer');
    if (!container) return;
    container.innerHTML = '';

    items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'goods-edit-card';
        card.innerHTML = `
            <div class="artist-card-header">
                <h4 class="artist-card-title">商品 ${index + 1}</h4>
                <button type="button" class="artist-card-remove" onclick="removeGoodsItem(${index})">削除</button>
            </div>
            <div class="form-group">
                <label>商品名</label>
                <input type="text" class="form-input goods-item-name" value="${(item.name || '').replace(/"/g, '&quot;')}" placeholder="例：WA音祭 Tシャツ">
            </div>
            <div class="form-group">
                <label>画像（アップロード）</label>
                <input type="file" class="form-input goods-image-file" accept="image/*">
                <input type="hidden" class="goods-image-data" value="${item.image || ''}">
                <img class="artist-preview" src="${item.image || 'https://placehold.jp/30/999999/ffffff/300x300.png?text=Image'}" alt="">
            </div>
            <div class="form-group">
                <label>価格</label>
                <input type="text" class="form-input goods-item-price" value="${item.price || ''}" placeholder="例：¥5,000">
            </div>
            <div class="form-group">
                <label>画像フィット</label>
                <select class="form-input goods-item-fit">
                    <option value="cover"${(item.imageFit || 'cover') === 'cover' ? ' selected' : ''}>cover（トリミングして埋める）</option>
                    <option value="contain"${item.imageFit === 'contain' ? ' selected' : ''}>contain（全体を表示）</option>
                </select>
            </div>
        `;
        container.appendChild(card);

        const fileInput = card.querySelector('.goods-image-file');
        const imageData = card.querySelector('.goods-image-data');
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

function collectGoodsItems() {
    const cards = document.querySelectorAll('.goods-edit-card');
    return Array.from(cards).map(card => ({
        name: card.querySelector('.goods-item-name').value,
        image: card.querySelector('.goods-image-data').value,
        price: card.querySelector('.goods-item-price').value,
        imageFit: card.querySelector('.goods-item-fit').value
    })).filter(item => item.name || item.price);
}

function addGoodsItem() {
    const data = getStorageData();
    data.goods.items = data.goods.items || [];
    data.goods.items.push({ name: '', image: 'assets/media/black.png', price: '' });
    saveToStorage(data);
    renderGoodsCards(data.goods.items);
}

function removeGoodsItem(index) {
    const data = getStorageData();
    data.goods.items.splice(index, 1);
    saveToStorage(data);
    renderGoodsCards(data.goods.items);
}

// ===================================
// Q&A管理
// ===================================
function renderQnaCards(items) {
    const container = document.getElementById('qnaContainer');
    if (!container) return;
    container.innerHTML = '';

    items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'qna-edit-card';
        card.innerHTML = `
            <div class="artist-card-header">
                <h4 class="artist-card-title">Q&A ${index + 1}</h4>
                <button type="button" class="artist-card-remove" onclick="removeQnaItem(${index})">削除</button>
            </div>
            <div class="form-group">
                <label>質問</label>
                <input type="text" class="form-input qna-question-input" value="${(item.question || '').replace(/"/g, '&quot;')}" placeholder="質問を入力">
            </div>
            <div class="form-group">
                <label>回答</label>
                <textarea class="form-textarea qna-answer-input" rows="3" placeholder="回答を入力">${item.answer || ''}</textarea>
            </div>
        `;
        container.appendChild(card);
    });
}

function collectQnaItems() {
    const cards = document.querySelectorAll('.qna-edit-card');
    return Array.from(cards).map(card => ({
        question: card.querySelector('.qna-question-input').value,
        answer: card.querySelector('.qna-answer-input').value
    })).filter(item => item.question || item.answer);
}

function addQnaItem() {
    const data = getStorageData();
    data.qna = data.qna || [];
    data.qna.push({ question: '', answer: '' });
    saveToStorage(data);
    renderQnaCards(data.qna);
}

function removeQnaItem(index) {
    const data = getStorageData();
    data.qna.splice(index, 1);
    saveToStorage(data);
    renderQnaCards(data.qna);
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

// ===================================
// GitHub API でサイトデータを公開
// ===================================

// GitHub設定を localStorage に保持
const GH_CONFIG_KEY = 'waonfes-github-config';

function getGitHubConfig() {
    const stored = localStorage.getItem(GH_CONFIG_KEY);
    return stored ? JSON.parse(stored) : { token: '', owner: '', repo: '', branch: 'main' };
}

function saveGitHubConfig(config) {
    localStorage.setItem(GH_CONFIG_KEY, JSON.stringify(config));
}

/**
 * 管理画面で編集中のデータを GitHub リポジトリの data.json にコミットする。
 * GitHub Pages 等で配信している場合、数十秒～数分で全員に反映される。
 */
async function publishToGitHub() {
    const config = getGitHubConfig();
    if (!config.token || !config.owner || !config.repo) {
        showNotification('GitHub設定が未入力です。「GitHub連携」パネルで設定してください。', 'error');
        return;
    }

    const publishBtn = document.getElementById('publishBtn');
    if (publishBtn) {
        publishBtn.disabled = true;
        publishBtn.textContent = '同期中...';
    }

    try {
        // 公開前にリモートの最新データとマージ（他の人の変更を保護）
        await mergeBeforePublish();

        const data = getStorageData();
        data._lastModified = Date.now(); // 公開時刻を記録
        saveToStorage(data); // ローカルにも反映
        const jsonContent = JSON.stringify(data, null, 4);
        const base64Content = btoa(unescape(encodeURIComponent(jsonContent)));

        const apiBase = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/data.json`;
        const headers = {
            'Authorization': `token ${config.token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
        };

        // 既存ファイルの SHA を取得（更新時に必要）
        let sha = null;
        try {
            const getRes = await fetch(`${apiBase}?ref=${config.branch}`, { headers });
            if (getRes.ok) {
                const fileInfo = await getRes.json();
                sha = fileInfo.sha;
            }
        } catch (e) {
            // ファイルが存在しない場合は新規作成になるので無視
        }

        // data.json をコミット
        const body = {
            message: '管理画面からサイトデータを更新',
            content: base64Content,
            branch: config.branch
        };
        if (sha) body.sha = sha;

        const putRes = await fetch(apiBase, {
            method: 'PUT',
            headers,
            body: JSON.stringify(body)
        });

        if (!putRes.ok) {
            const errBody = await putRes.json().catch(() => ({}));
            throw new Error(errBody.message || `HTTP ${putRes.status}`);
        }

        showNotification('サイトに公開しました！（反映まで数十秒かかる場合があります）', 'success');
    } catch (error) {
        console.error('GitHub publish error:', error);
        showNotification(`公開に失敗しました: ${error.message}`, 'error');
    } finally {
        if (publishBtn) {
            publishBtn.disabled = false;
            publishBtn.textContent = 'サイトに公開する';
        }
    }
}

/**
 * GitHub連携設定を保存
 */
function saveGitHubSettings() {
    const config = {
        token: document.getElementById('ghToken')?.value || '',
        owner: document.getElementById('ghOwner')?.value || '',
        repo: document.getElementById('ghRepo')?.value || '',
        branch: document.getElementById('ghBranch')?.value || 'main'
    };
    saveGitHubConfig(config);
    showNotification('GitHub設定を保存しました。', 'success');
}

/**
 * GitHub連携設定をフォームに読み込み
 */
function loadGitHubSettings() {
    const config = getGitHubConfig();
    const ghToken = document.getElementById('ghToken');
    const ghOwner = document.getElementById('ghOwner');
    const ghRepo = document.getElementById('ghRepo');
    const ghBranch = document.getElementById('ghBranch');
    if (ghToken) ghToken.value = config.token || '';
    if (ghOwner) ghOwner.value = config.owner || '';
    if (ghRepo) ghRepo.value = config.repo || '';
    if (ghBranch) ghBranch.value = config.branch || 'main';
}
