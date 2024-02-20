export default class SingleItem{
    constructor(id){
        this.id = id
    }
    async getItem(){
        try{
            const queryString = `https://jsproject.webcademy.ru/items/${this.id}`;     //Получаем данные по каждому объекту для дальнейшего рендера
            const response = await fetch(queryString);
            const data = await response.json()
            this.result = await data
        }catch(error){
            alert(error)
        }
       

    }
    //Отправляем данные на сервер, другой fetch!
    async submitForm(formData){
        const queryString = `https://jsproject.webcademy.ru/bidnew`;
        const response = await fetch(queryString, {    //Возвращаем promise с ответом с сервера
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body:  JSON.stringify(formData)
        })
        const data = await response.json()
        this.response = await data  //Создаем в объекте поле response с ответом от сервера(сохранились ли заявки или нет)
        // console.log("🚀 ~ file: singleItemModel.js:29 ~ SingleItem ~ submitForm ~ this.response", this.response)
        // console.log(this.response.message)
        

    }


}