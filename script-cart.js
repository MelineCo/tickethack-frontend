fetch('https://tickethack-backend-umber.vercel.app/bookings/')
    .then(response => response.json())
    .then(data => {
        if (data.AllBookings) {

            document.querySelector("#cart-container").innerHTML =
            `
            <h2>My cart</h2>
            <div id="my-cart"></div>
            <div id="purchase"></div>`

            for (let i = 0; i < data.AllBookings.length; i++) {
                document.querySelector('#my-cart').innerHTML += `
                <div class="trip-container" id="${data.AllBookings[i]._id}">
                    <div class="trip-element">${data.AllBookings[i].departure} > ${data.AllBookings[i].arrival}</div>
                    <div class="trip-element">${data.AllBookings[i].date.split('T')[1].substring(0, 5)}</div>
                    <div class="trip-element price">${data.AllBookings[i].price}€</div>
                    <input class="delete-btn trip-element"id="${data.AllBookings[i]._id}" type="button" value="X" />
                </div>
			`;
            }
            updateDeleteTripEventListener();
            

            document.querySelector('#purchase').innerHTML = `
                <div class="purchase">Total : <span id="total"></span>€</div>
                <input class="purchase" id="purchase-btn" type="button" value="Purchase" />
            `
            calculTotal();
            purchaseEventListener();
            cartIsEmpty();
        }
    });

function updateDeleteTripEventListener() {
    for (let i = 0; i < document.querySelectorAll('.delete-btn').length; i++) {
        document.querySelectorAll('.delete-btn')[i].addEventListener('click', function () {
            fetch(`https://tickethack-backend-umber.vercel.app/bookings/delete/${this.id}`, { method: 'DELETE' })
                .then(response => response.json())
                .then(data => {
                    if (data.result) {
                        this.parentNode.remove();
                        calculTotal();
                        cartIsEmpty();
                    }
                });
        });
    }
}

function calculTotal() {
    let total = 0;
    for (let i = 0; i < document.querySelectorAll('.price').length; i++) {
        total += Number(document.querySelectorAll('.price')[i].textContent.split('€')[0])
    }
    document.querySelector('#total').textContent = total;
}

function purchaseEventListener(){
    document.querySelector('#purchase-btn').addEventListener('click', function () {
        console.log('click purchase')
        fetch(`https://tickethack-backend-umber.vercel.app/bookings/update`, { method: 'PUT' })
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    document.location.href = "bookings.html"
                }
            });
    })
}



function cartIsEmpty(){
    let nbTrips = document.querySelectorAll('.trip-container').length
    console.log(nbTrips)
    if(nbTrips === 0){
        document.querySelector("#cart-container").innerHTML = `
        <div id="empty-cart">
                <p>No tickets in your cart.</p>
                <p>Why not plan a trip?</p>
            </div>`
    }
}
