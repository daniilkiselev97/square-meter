function renderContainer(){
    const markup = `<div class="container p-0 mb-5">
                        <div class="heading-1">Заявки</div>
                    </div>

                    <!-- panels-wrapper -->
                    <div class="panels-wrapper">
                        <div id="bidsHolder" class="container p-0">
                            <!--Bids will be here-->
                        </div>
                    </div>
                    <!-- // panels-wrapper -->`;
    document.querySelector('#app').insertAdjacentHTML('beforeend',markup)
}

function renderBit(bit){
    const markup = `<!-- panel -->
                    <div class="panel panel--no-hover">
                        <div class="panel__bidid">${bit.id}</div>
                        <div class="panel__bidname">${bit.name}</div>
                        <div class="panel__bidphone">${bit.phone}</div>
                    </div>
                    <!-- // panel -->`
    document.querySelector('#bidsHolder').insertAdjacentHTML('beforeend', markup)

}

export function renderBids(bids){
    renderContainer()
    bids.forEach(item => {
        renderBit(item)
    });
}