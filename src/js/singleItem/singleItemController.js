import SingleItem from "./singleItemModel";
import * as view from './singleItemView';

export default async function(state){
    // console.log('single item contr started')
    state.singleItem = new SingleItem(state.routeParams)
    await state.singleItem.getItem()
    //Отрисовываем разметку для отдельного объекта
    view.render(state.singleItem.result, state.favourites.isFav(state.singleItem.id))

    //Запустить прослушку событий

    //Открытие модального окна
    document.querySelector('.button-order').addEventListener('click', ()=>{
        view.showModal()
    })

    //Закрытие модального окна - клик по кнопке
    document.querySelector('.modal__close').addEventListener('click', ()=>{
        view.hideModal()
    })

    //Закрытие модального окна - клик по оверлею
    document.querySelector('.modal-wrapper').addEventListener('click', (e)=>{
        if(e.target.closest('.modal')){
            return null      // тогда ничего не делаем
        } else {
        view.hideModal()

        }
        
    })

    //Отправка формы
    document.querySelector('.modal__form').addEventListener('submit', async function(e){
        e.preventDefault()
        //Вызываем функцию для получения данных из формы
        const formData = view.getInput()
        await state.singleItem.submitForm(formData)
        const response = state.singleItem.response

        if(response.message === 'Bid Created'){
            alert('Ваша заявка успешно получена!')
            view.hideModal()
            view.clearInput()

        } else if(response.message === 'Bid Not Created'){
            // console.log(response.errors)
            response.errors.forEach(item => {  //Обходим каждую ошибку и alert ее
                alert(item)
                
            });
            
        }

    })
    //Клик по кнопке добавить в избранное
    document.querySelector('.button-favourite').addEventListener('click', ()=>{
        state.favourites.toggleFav(state.singleItem.id)  //Передаем id конкретного объекта в метод добавления
        view.toggleFavouriteButton(state.favourites.isFav(state.singleItem.id))  //Передаем проверку в избранном или нет кнопка чтобы сделать ее активной или нет
    })
}