fetch('http://localhost:3000/bookings/')
    .then(response => response.json())
    .then(data => {
        if (data.AllBookings) {
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
            updateDeleteCityEventListener();
            calculTotal()
        }
    });

function updateDeleteCityEventListener() {
    for (let i = 0; i < document.querySelectorAll('.delete-btn').length; i++) {
        document.querySelectorAll('.delete-btn')[i].addEventListener('click', function () {
            fetch(`http://localhost:3000/bookings/delete/${this.id}`, { method: 'DELETE' })
                .then(response => response.json())
                .then(data => {
                    if (data.result) {
                        this.parentNode.remove();
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

document.querySelector('#purchase-btn').addEventListener('click', function () {
    fetch(`http://localhost:3000/bookings/update`, { method: 'PUT' })
        .then(response => response.json())
        .then(data => {
            if (data.result) {
                document.location.href = "bookings.html"
            }
        });
})
