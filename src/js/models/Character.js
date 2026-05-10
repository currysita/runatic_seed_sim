export async function loadCharacters(path) {
    const res = await fetch(path);
    return res.json();
}
