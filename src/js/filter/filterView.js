// import 'url-search-params-polyfill';

const elements ={
    filterSelect : document.getElementsByClassName('filter__dropdown'),
    filterRooms : document.getElementsByClassName('rooms__checkbox'),
    filterFields : document.getElementsByClassName('range__input'),
    filterSubmit : document.getElementsByClassName('filter__show')
}
export function render(params){
    // console.log("🚀 ~ file: filterView.js:2 ~ render ~ params", params)

    let complexNames = '';  //набиваем все названия жк комплексов из массива в params
    params.complexNames.forEach(name => {
        complexNames+=`<option value="${name}">ЖК ${name}</option>`
    });
    // console.log(complexNames)

    let rooms = ``; //набиваем все комнаты из массива в params
    params.roomValues.forEach(room =>{
        rooms+= `<input
                    name="rooms"
                    type="checkbox"
                    id="rooms_${room}"
                    class="rooms__checkbox"
                    value="${room}"
                    /><label for="rooms_${room}" class="rooms__btn">${room}</label>`
    });
    // console.log(rooms)

    const markup = `<!-- Filter -->
    <form id="filter-form" method="GET" class="container p-0">
        <div class="heading-1">Выбор квартир:</div>
        <div class="filter">
            <div class="filter__col">
                <div class="filter__label">Выбор проекта:</div>
                <select name="complex" id="" class="filter__dropdown">
                    <option value="all">Все проекты</option>
                    '${complexNames}'
                </select>
            </div>
            <div class="filter__col rooms">
                <div class="filter__label">Комнат:</div>
                <div class="rooms__wrapper">
                    ${rooms}
                </div>
            </div>
            <div class="filter__col">
                <div class="filter__label">Площадь:</div>
                <div class="range__wrapper">
                    <label class="range">
                        <div for="" class="range__label">от</div>
                        <input
                            name="sqmin"
                            min="0"
                            type="number"
                            class="range__input"
                            placeholder="${params.squareMin}"
                            value = '${params.squareMin}'
                        />
                        <div class="range__value">м2</div>
                    </label>
                    <label class="range">
                        <div for="" class="range__label">до</div>
                        <input
                            name="sqmax"
                            min="0"
                            type="number"
                            class="range__input"
                            placeholder="${params.squareMax}"
                            value = '${params.squareMax}'
                        />
                        <div class="range__value">м2</div>
                    </label>
                </div>
            </div>
            <div class="filter__col">
                <div class="filter__label">Стоимость:</div>
                <div class="range__wrapper">
                    <div class="range">
                        <label for="" class="range__label">от</label>
                        <input
                            type="number"
                            name="pricemin"
                            min="0"
                            class="range__input range__input--price"
                            placeholder="${params.priceMin}"
                            value = '${params.priceMin}'
                        />
                        <div class="range__value">₽</div>
                    </div>
                    <div class="range">
                        <label for="" class="range__label">до</label>
                        <input
                            type="number"
                            name="pricemax"
                            min="0"
                            class="range__input range__input--price"
                            placeholder="${params.priceMax}"
                            value = '${params.priceMax}'
                        />
                        <div class="range__value">₽</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="filter__buttons">
            <button class="filter__show">Показать объекты</button>
            <button type="reset" class="filter__reset">Сбросить фильтр</button>
        </div>
    </form>
    <!-- // Filter -->`;
    document.querySelector('#app').insertAdjacentHTML('afterbegin', markup)
}
export function changeButtonText(number){
    const btn = elements.filterSubmit[0] //кнопка красная
    let message; // Если число больше 0, то показываем эти объекты, если нет, то они не найдены
    message = number > 0 ? `Показать ${number} объектов` : 'Объекты не найдены. Измените условия поиска'

    btn.innerText = message
    btn.disabled = number === 0 ? true : false  // Если 0 объектов , тогда в аттрибут disabled записываем true и кнопка становится disabled
}
//Записываем в строку данные на общий фильтр
export function getInput(){
    const searchParams = new URLSearchParams()
    console.log(elements.filterSelect[0])

    //1.Значение с select
    if(elements.filterSelect[0].value!=='all'){
        searchParams.append(elements.filterSelect[0].name, elements.filterSelect[0].value)
    }

    //2.Параметры комнат - чекбоксы
    const roomsValues = []
    Array.from(elements.filterRooms).forEach((checkbox)=>{  //если выбран checkbox тогда берем его value и добавляем в массив
        if(checkbox.value!=='' && checkbox.checked){
            roomsValues.push(checkbox.value)
        }
    })
    const roomsValuesString = roomsValues.join(',') //Объединяем все элементы массива в строчку через запятую
    if(roomsValuesString!==''){
        searchParams.append('rooms', roomsValuesString)
    }

    //3.Площадь и цена - input
    Array.from(elements.filterFields).forEach((input)=>{
            if(input.value!==''){
                searchParams.append(input.name, input.value)
            } 
    });


    const queryString = searchParams.toString()
    if(queryString){
        return '?' + queryString;
    } else {
        return ''
    }

}