const STATUS_LABELS = {
    'クエスト中': { label: 'クエスト中', cls: 'status-badge--active' },
    '休息中':     { label: '休息中',     cls: 'status-badge--rest' },
    '引退':       { label: '引退',       cls: 'status-badge--retired' },
    '死亡':       { label: '死亡',       cls: 'status-badge--dead' },
};

const ABILITY_KEYS = ['体力', '技量', '知力', '敏捷', '魅力'];

function abilityBars(character) {
    return ABILITY_KEYS.map(key => {
        const val = character[key];
        return `
        <div class="param-bar">
          <span class="param-bar__label">${key}</span>
          <div class="param-bar__track">
            <div class="param-bar__fill" style="width:${val}%"></div>
          </div>
          <span class="param-bar__value">${val}</span>
        </div>`;
    }).join('');
}

function alignmentLabel(val) {
    if (val > 0) return `<span class="social-param__value social-param__value--positive">+${val}</span>`;
    if (val < 0) return `<span class="social-param__value social-param__value--negative">${val}</span>`;
    return `<span class="social-param__value">${val}</span>`;
}

export function renderCharacterCard(character) {
    const status = STATUS_LABELS[character['現在の状態']] ?? { label: character['現在の状態'], cls: '' };

    const card = document.createElement('div');
    card.className = 'character-card';
    card.innerHTML = `
      <div class="character-card__header">
        <span class="character-card__name">${character['名前']}</span>
        <span class="character-card__meta">${character['性別']} / ${character['年齢']}歳 / ${character['職業']}</span>
      </div>
      <span class="status-badge ${status.cls}">${status.label}</span>
      <div class="param-section">
        <div class="param-section__title">能力値</div>
        ${abilityBars(character)}
      </div>
      <div class="param-section">
        <div class="param-section__title">社会</div>
        <div class="social-params">
          <div class="social-param">
            <span class="social-param__label">名声</span>
            <span class="social-param__value">${character['名声']}</span>
          </div>
          <div class="social-param">
            <span class="social-param__label">資産</span>
            <span class="social-param__value">${character['資産']}</span>
          </div>
          <div class="social-param">
            <span class="social-param__label">善悪</span>
            ${alignmentLabel(character['善悪値'])}
          </div>
        </div>
      </div>`;
    return card;
}
