import Filter from './filterModel';
import * as view from './filterView';
export default async function(state){ // делаем функцию async так как нужно ждать
    //Создание объекта фильтр
    if(!state.filter ) state.filter = new Filter() //создаем его если он не создан
    //Получение параметров для фильтра
    await state.filter.getParams()  //так как getParams() - async, то можем работать дальше как с async

    //Отрисовка фильтра
    view.render(state.filter.params)

    //Делаем запрос на сервер
    await state.filter.getResults()
    state.results = state.filter.result //записываем данные с сервера о квартирах в состояние с results


    //Обновляем счетчик на кнопке
    view.changeButtonText(state.filter.result.length)

    //Прослушка событий формы  (изменение формы)
    const form = document.querySelector('#filter-form');
    form.addEventListener('change', async function(e){
        e.preventDefault()
        state.filter.query = view.getInput()  //сохраняем строчку с запросом на фильтр 
        // console.log("🚀 ~ file: filterController.js:23 ~ form.addEventListener ~ state.filter.query", state.filter.query)
        await state.filter.getResults()  //ждем пока выполнится запрос
        state.results = state.filter.result //записываем данные с сервера о квартирах в состояние с results
        view.changeButtonText(state.filter.result.length)

    })
    //Сброс формы
    form.addEventListener('reset', async function(){
        state.filter.query = ''
        await state.filter.getResults()
        view.changeButtonText(state.filter.result.length)

    })
    //Отправка формы
    form.addEventListener('submit',  function(e){
        e.preventDefault()
        // console.log('submit!!!')
        state.emitter.emit('event:render-listing', {})

    })



}