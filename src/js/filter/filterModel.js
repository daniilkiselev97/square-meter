export default class Filter{
    constructor(){
        this.query = ''//когда фильтр отрендарился, то запрос - пустая строчка
    }
    async getParams(){ //асинхронная функция
        try {
            const queryString = 'https://jsproject.webcademy.ru/itemsinfo'; 
            const response  = await fetch(queryString); //делаем запрос на сервер в response - ответ от сервера в виде promise
            const data = await response.json() // promise с нормальными данными
            this.params = await data // вытягиваем данные в виде JS object
            // console.log(this.params)

        } catch(error){
            alert(error)
        }
        
    }

    async getResults(){
        try{
            const queryString = `https://jsproject.webcademy.ru/items${this.query}`;//запрос на все квартиры 
            const response = await fetch(queryString)
            const data = await response.json()
            this.result = await data //создаем поле result  в объекте filter с данными с сервера о квартирах
            // console.log("🚀 ~ file: filterModel.js:24 ~ Filter ~ getResults ~ this.result", this.result)
        }catch(error){
            alert(error)
        }
        
    }
}