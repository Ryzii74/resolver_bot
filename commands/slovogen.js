const dictionary = require("../libs/dictionary");

module.exports = async (msg) => {
  const {text} = msg;
  const wordsObj = dictionary.getObject(text);

  const answers = findAllWordsFromLetters(text, wordsObj, { minLen: 3 });
  msg.addAnswersResponse([...answers].sort((a, b) => a.length - b.length));
};

function normalizeWord(s) {
  // нижний регистр + удаляем всё, что не буквы (Юникодные категории L)
  return (s || "")
      .toLowerCase()
      .normalize("NFC")
      .replace(/[^\p{L}]/gu, "");
}

function toWordIterable(dict) {
  if (!dict) return [];
  if (Array.isArray(dict)) return dict;
  if (dict instanceof Set) return dict.values();
  if (typeof dict === "object") return Object.keys(dict);
  return [];
}

function buildTrie(words) {
  // Узел: { end: boolean, next: Map<char, node> }
  const root = { end: false, next: new Map() };
  for (const raw of words) {
    const w = normalizeWord(raw);
    if (!w) continue;
    let node = root;
    for (const ch of w) {
      if (!node.next.has(ch)) node.next.set(ch, { end: false, next: new Map() });
      node = node.next.get(ch);
    }
    node.end = true;
  }
  return root;
}

function countLetters(str) {
  const cnt = new Map();
  for (const ch of normalizeWord(str)) {
    cnt.set(ch, (cnt.get(ch) ?? 0) + 1);
  }
  return cnt;
}

/**
 * Основная функция
 * @param {string} letters
 * @param {Array<string>|Set<string>|Object} dictionary
 * @param {Object} [opts]
 * @param {number} [opts.minLen=1] минимальная длина слова
 * @param {number} [opts.maxLen=Infinity] максимальная длина слова (по умолчанию не ограничено)
 * @returns {Set<string>}
 */
function findAllWordsFromLetters(letters, dictionary, opts = {}) {
  const { minLen = 1, maxLen = Infinity } = opts;

  const letterCounts = countLetters(letters);
  if (letterCounts.size === 0) return new Set();

  // Строим trie
  const trie = buildTrie(toWordIterable(dictionary));

  // Опционально можно «отрезать» буквы, которых нет в letters, заранее:
  // (но это не обязательно — DFS и так их не выберет)

  const results = new Set();

  // Быстрый фильтр: стартовые буквы — пересечение букв letters и детей корня
  const startChoices = new Set();
  for (const ch of trie.next.keys()) {
    if (letterCounts.has(ch)) startChoices.add(ch);
  }
  if (startChoices.size === 0) return results;

  // DFS по trie с учётом остатков
  const path = [];
  function dfs(node) {
    // если текущий узел помечен как слово — добавляем
    if (node.end && path.length >= minLen && path.length <= maxLen) {
      results.add(path.join(""));
    }
    if (path.length >= maxLen) return;

    for (const [ch, child] of node.next) {
      const left = letterCounts.get(ch) || 0;
      if (left <= 0) continue;
      // взять букву
      letterCounts.set(ch, left - 1);
      path.push(ch);
      dfs(child);
      path.pop();
      letterCounts.set(ch, left);
    }
  }

  // Можно начать прямо с корня, dfs сам проверит children,
  // но микро-оптимизация: быстро отфильтровать стартовые варианты.
  dfs(trie);

  return results;
}
