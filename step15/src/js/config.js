const global = {
  inputEl: '.autoComplete_input',
  resultEl: '.autoComplete_result',
  resultItem: 'autoComplete_result_item',
  resultItemHighlighted: 'autoComplete_result_item-highlighted',
  noResultItem: 'no-result'
};

export const model = {
  srcUrl: './src/data.json'
};

export const controller = {
  inputEl: global.inputEl,
  resultEl: global.resultEl,
  resultItem: global.resultItem,
  resultItemHighlighted: global.resultItemHighlighted,
  noResultItem: global.noResultItem,
  debounceDelay: 300
};

export const inputView = {
  inputEl: global.inputEl,
  resultItem: global.resultItem,
  noResultItem: global.noResultItem,
  onSelect: 'onSelect',
  throttleDelay: 60
};

export const resultView = {
  resultEl: global.resultEl,
  resultItem: global.resultItem,
  resultItemHighlighted: global.resultItemHighlighted,

  noResultSuggestionTemplate() {
    return `<li class="${global.resultItem} ${global.noResultItem}">일치하는 검색결과가 없습니다</li>`;
  },

  noResultRecentQueryTemplate() {
    return `<li class="${global.resultItem} ${global.noResultItem}">최근 검색결과가 없습니다</li>`;
  },

  recentQueryTemplate(recentQueryList) {
    return recentQueryList.reduce((prev, curr) => {
      return `${prev}<a href="#" class="${global.resultItem}" data-value="${curr}"><li >${curr}</li></a>`;
    }, '');
  },

  suggestionTemplate(query, suggesions) {
    const pattern = new RegExp(`${query}`, 'i');
    return suggesions.reduce((prev, curr) => {
      const match = pattern.exec(curr);
      const hilghtedSuggestion = curr.replace(
        match,
        `<span class=${global.resultItemHighlighted}>${match}</span>`
      );
      return `${prev}<a href="#" class="${global.resultItem}" data-value="${curr}"><li>${hilghtedSuggestion}</li></a>`;
    }, '');
  },

  getAutoSuggesionList({ dataSrc, query, config }) {
    const queryLowerCase = query.toLowerCase();
    const { sort, maxResult } = config;
    const resList = dataSrc
      .filter(d => {
        const dataLowerCase = d.toLowerCase();
        return dataLowerCase.startsWith(queryLowerCase);
      })
      .sort(sort)
      .slice(0, maxResult);
    return resList;
  },

  sort(a, b) {
    if (a.match < b.match) {
      return -1;
    }
    if (a.match > b.match) {
      return 1;
    }
    return 0;
  },
  maxResult: 10
};
