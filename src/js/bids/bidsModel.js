export default class Bids{
    constructor(){

    }
    //Запрос на сервер для получения заявок
    async getBids(){
        try{
            const queryString = `https://jsproject.webcademy.ru/bids`
            const result = await fetch(queryString)
            const data = await result.json()
            this.bids = await data
        }catch(error){
            alert('Error with getting Bids')
            console.log(error)
        }
        
    }
}