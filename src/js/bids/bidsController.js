import * as view from './bidsView'
import Bids from './bidsModel'
export default async function(state){
    // view.renderContainer()
    if(!state.bids) state.bids = new Bids() //Если оюъект с заявками уже есть, то не надо его создавать
    await state.bids.getBids() //Получаем заявки с сервера с модели
    view.renderBids(state.bids.bids) //Передаем на render массив с заявками
}