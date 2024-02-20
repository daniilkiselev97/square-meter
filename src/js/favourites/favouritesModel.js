export default class Favourites{
    constructor(){
        this.favs = []
        //Работа с LocalStorage - Получение элементов из Local Storage
        this.readStorage()
    }
    addFav(id){
        this.favs.push(id)  //Добавляем переданный id в массив favs
        //Сохранение в Local Storage
        this.saveData()
    }
    removeFav(id){
        const index = this.favs.indexOf(id)   //[1,3,7,5]   //Если индекс есть , то он его вернет, если нет, то индекс = -1
        this.favs.splice(index,1) //удаляем наш индекс в кол-ве 1
        //Сохранение в Local Storage
        this.saveData()


    }
    //Проверка, находится ли этот элемент в избранном или нет
    isFav(id){
        return this.favs.indexOf(id)!== -1 ? true : false   //Если индекс есть в массиве, то вернем true, если нет-false
    }
    toggleFav(id){
            this.isFav(id) ? this.removeFav(id) : this.addFav(id)   //Если isFav-true- удаляем этот элемент, если false-то добавляем

    }
    saveData(){
        localStorage.setItem('favs', JSON.stringify(this.favs) ) //Записываем в LS массив favs из объекта

    }

    readStorage(){
        const storage = JSON.parse(localStorage.getItem('favs'))   //Достаем массив favs из LS
        if(storage) this.favs = storage //Если в LS есть данные , то записываем их в массив favs

        
    }

}