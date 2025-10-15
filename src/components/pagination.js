import {getPages} from "../lib/utils.js";

export const initPagination = ({pages, fromRow, toRow, totalRows}, createPage) => {
    // @todo: #2.3 — подготовить шаблон кнопки для страницы и очистить контейнер
    const pageTemplate = pages.firstElementChild.cloneNode(true);
    pages.firstElementChild.remove();

    return (data, state, action) => {
    // @todo: #2.1 — посчитать количество страниц, объявить переменные и константы
      const rowsPerPage = state.rowsPerPage;
      const pageCount = Math.ceil(data.length / rowsPerPage);
      let page = state.page;

    // @todo: #2.6 — обработать действия
    if (action) switch(action.name) {
        case "prev": page = Math.max(1, page - 1); break;
        case "next": page = Math.min(pageCount, page + 1); break;
        case "first": page = 1; break;
        case "last": page = pageCount; break;
      }

    // @todo: #2.4 — получить список видимых страниц и вывести их
    const visiblePages = getPages(page, pageCount, 5);                 // Получим массив страниц, которые нужно показать, выводим только 5 страниц
    pages.replaceChildren(...visiblePages.map(pageNumber => {          // перебираем их и создаём для них кнопку
      const el = pageTemplate.cloneNode(true);                       // клонируем шаблон, который запомнили ранее
      return createPage(el, pageNumber, pageNumber === page);        // вызываем колбэк из настроек, чтобы заполнить кнопку данными
        }));

    // @todo: #2.5 — обновить статус пагинации
    fromRow.textContent = (page - 1) * rowsPerPage + 1;                 // С какой строки выводим
    toRow.textContent = Math.min((page * rowsPerPage), data.length);    // До какой строки выводим, если это последняя страница, то отображаем оставшееся количество
    totalRows.textContent = data.length;

    // @todo: #2.2 — посчитать сколько строк нужно пропустить и получить срез данных
    const skip = (page - 1) * rowsPerPage;            // сколько строк нужно пропустить
    return data.slice(skip, skip + rowsPerPage);      // получаем нужную часть строк (заменяем имеющийся return)
    }
}