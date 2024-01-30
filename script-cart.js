fetch('http://localhost:3000/bookings/')
	.then(response => response.json())
	.then(data => {
		if (data.AllBookings) {
			for (let i = 0; i < data.AllBookings.length; i++) {
                console.log(data.AllBookings[i].date.split('T')[1].substring(0,5))
				document.querySelector('#my-cart').innerHTML += `
                <div class="trip-container">
                    <div class="trip-element">${data.AllBookings[i].departure} > ${data.AllBookings[i].arrival}</div>
                    <div class="trip-element">${data.AllBookings[i].date.split('T')[1].substring(0,5)}</div>
                    <div class="trip-element">${data.AllBookings[i].price}€</div>
                    <input class="delete-btn trip-element"id="${data.AllBookings[i].id}" type="button" value="X" />
                </div>
			`;
			}
			// updateDeleteCityEventListener();
		}
	});

function deleteDOMTripEventListener() {
    for (let i = 0; i < document.querySelectorAll('.delete-btn').length; i++) {
        document.querySelectorAll('.delete-btn')[i].addEventListener('click', function () {
            fetch(`http://localhost:3000/bookings/${this.id}`, { method: 'DELETE' })
                .then(response => response.json())
                .then(data => {
                    if (data.result) {
                        this.parentNode.remove();
                    }
                });
        });
    }
}

deleteDOMTripEventListener()

function deleteTripMongoDBEventListener() {
    document.querySelector('.purchase-btn').addEventListener('click', function () {
        fetch(`http://localhost:3000/bookings/delete`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                console.log("Trips deleted")
                console.log(data)
            });
    });
}
