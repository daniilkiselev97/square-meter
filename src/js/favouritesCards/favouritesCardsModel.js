export default class FavouritesCards{
    constructor(favsList){
        this.favsList = favsList

    }
    //Получаем объекты по конкретным id
    async getFavs(){
        const ids = this.favsList.toString() //Преобразуем массив в строку (1,2,3)
        const queryString = `https://jsproject.webcademy.ru/items?ids=${ids}`
        const result = await fetch(queryString)
        const data = await result.json()
        this.cards = await data

    }
}