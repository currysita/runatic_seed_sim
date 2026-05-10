import { loadCharacters } from './models/Character.js';
import { renderCharacterCard } from './views/CharacterCard.js';

async function main() {
    const characters = await loadCharacters('/data/test/character_test.json');
    const list = document.getElementById('character-list');
    characters.forEach(c => list.appendChild(renderCharacterCard(c)));
}

main();
