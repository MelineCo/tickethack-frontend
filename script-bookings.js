fetch('https://tickethack-backend-umber.vercel.app/bookings/booked')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data.AllBookings) {
            document.querySelector("#cart-container").innerHTML =
            `
            <h2>My bookings</h2>
            <div id="my-bookings"></div>
            <div id="enjoy">
                 <div class="divider"></div>
                 <div class="enjoy-msg">Enjoy your travel with Tickethack!</div>
            </div>`

            for (let i = 0; i < data.AllBookings.length; i++) {
                const now = new Date()
                const dateDepart = new Date(data.AllBookings[i].date)
                const waiting = dateDepart.getTime() - now.getTime()
                let text = ""
                if (Math.floor(waiting / 1000 / 3600) < 24) {
                    if (Math.floor(waiting / 1000 / 3600) < 1) {
                        text = `Imminent departure`
                    } else if (Math.floor(waiting / 1000 / 3600) == 1) {
                        text = `Departure in ${Math.floor(waiting / 1000 / 3600)} hour`
                    } else {
                        text = `Departure in ${Math.floor(waiting / 1000 / 3600)} hours`
                    }
                } else {
                    text = `Departure in ${Math.floor(waiting / 1000 / 3600 / 24)} days`
                }
                document.querySelector('#my-bookings').innerHTML += `
                <div class="booking-container" id="${data.AllBookings[i]._id}">
                    <div class="trip-element">${data.AllBookings[i].departure} > ${data.AllBookings[i].arrival}</div>
                    <div class="trip-element-small">${data.AllBookings[i].date.split('T')[1].substring(0, 5)}</div>
                    <div class="trip-element-small">${data.AllBookings[i].price}€</div>
                    <div class="trip-element">${text}</div>
                </div>
			`;
            }

            bookingIsEmpty()
        }
    });

function bookingIsEmpty(){
        let nbTrips = document.querySelectorAll('.booking-container').length
        console.log(nbTrips)
        if(nbTrips === 0){
            document.querySelector("#cart-container").innerHTML = `
            <div id="empty-bookings">
                    <p>No booking yet.</p>
                    <p>Why not plan a trip?</p>
                </div>`
        }
}