import * as view from './listingView'
export default function(state){
    // console.log('component listing started!')
    //рендер контейнера для карточек
    view.render()
    //рендер карточек
    state.results.forEach(item => {
        view.renderCard(item , state.favourites.isFav(item.id))   //2-Передача на правду или нет, есть ли карточка в избраном для отображения красного сердца
    });
    //Запускаем прослушку клика на иконки добавить в избранное
    addToFavsListener()
    
    state.emitter.subscribe('event:render-listing', ()=>{
        
        //Очистить контейнер с карточками
        view.clearListingContainer()
        //Отрендарить карточки

        state.results.forEach(item => {
            view.renderCard(item, state.favourites.isFav(item.id))
        });
        // console.log(state.results)
        //Запускаем прослушку клика на иконки добавить в избранное
        addToFavsListener()
    })
    //Добавляем иконки в избранное
    function addToFavsListener(){
        Array.from(document.getElementsByClassName('card__like')).forEach((item)=>{
            item.addEventListener('click', (e)=>{
                e.preventDefault()
                // console.log('click fav!!!')
                const currentId = e.target.closest('.card').dataset.id  //Текущее id по иконке по которой произошел клик
                // console.log("🚀 ~ file: listingController.js:27 ~ item.addEventListener ~ currentId", currentId)
                state.favourites.toggleFav(currentId) //Передаем айди на проверку избранного по клику на сердце
                view.toggleFavouriteIcon(e.target.closest('.card__like'), state.favourites.isFav(currentId))  //Передаем сердце на добавление акт класса или снятие
            })
        })
    }
    
    
}