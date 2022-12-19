import FavouritesCards from "./favouritesCardsModel"
import * as view from './favouritesCardsView'
export default async function (state){
    //Получить список объектов, которые находятся в избранном
    const favsList = state.favourites.favs
    // console.log("🚀 ~ file: favouritesCardsController.js:4 ~ favsList", favsList)
    const favouritesCards = new FavouritesCards(favsList)
    await favouritesCards.getFavs()
    //Отображаем контейнер и карточки
    view.renderPage(favouritesCards.cards)
    addToFavsListener()

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