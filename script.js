// const { response } = require("express");

document.querySelector('#btn-search').addEventListener('click', function(){
    console.log('clik src btn detected')
    
    const departure = document.querySelector('#search-departure').value;
    const arrival = document.querySelector('#search-arrival').value;
    const date = document.querySelector('#search-date').value;

    // console.log(date)
    // console.log(newTrip = {departure, arrival, date})  

if (departure === '' || arrival === '' ) { 
        document.querySelector('#bookings-container').innerHTML = `
            <img class="logo" src="images/notfound.png">
            <div class="divider-green"></div>
            <h4 class="logo-text">No trips found.</h4>
        `
} else {

    // console.log(`http://localhost:3000/trips/${departure}/${arrival}/${date}`)
    
    fetch(`https://tickethack-backend-umber.vercel.app/trips/${departure}/${arrival}/${date}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.trip)
        // Vérifier si trajet existe sinon renvoyer logo Trip not found.
        if (data.Alltrips.length === 0) {
        document.querySelector('#bookings-container').innerHTML = `
            <img class="logo" src="images/notfound.png">
            <div class="divider-green"></div>
            <h4 class="logo-text">No trips found.</h4>
        `
       } else { // Si trajet trouvé creer liste des trajets dans bookings containers
        console.log(data.Alltrips.length)
        document.querySelector('#bookings-container').innerHTML = ''; 
    
        for (let i = 0; i < data.Alltrips.length; i++) {
            // console.log(data.Alltrips[i]._id)
              document.querySelector('#bookings-container').innerHTML += `
                 <div class="${data.Alltrips[i]._id} trip-container">
                    <div>${data.Alltrips[i].departure} > ${data.Alltrips[i].arrival}</div>
                    <div>${data.Alltrips[i].date.split('T')[1].substring(0, 5)}</div>
                    <div>${data.Alltrips[i].price}€</div>
                    <button type="button" class="btn-book" id='${data.Alltrips[i]._id}'>Book</button>
                </div>`;
            // pour chaque trajet trouvé ajouter ecouteur d'évement sur bouton
          
        }
        buttonAddListener()
        }
});
}})

// fonction écouteur d'évenement bouton 
function buttonAddListener() {
    for (let i = 0; i < document.querySelectorAll('.btn-book').length; i++) {
        document.querySelectorAll('.btn-book')[i].addEventListener('click',
        
       // créer fonction du bouton pour créer nouveau document dans collection Booking avec status is-Paid : False
        function () {
            console.log(this.id) 
            fetch(`https://tickethack-backend-umber.vercel.app/trips/${this.id}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.trip)
                    let newBooking =  {
                        departure: data.trip.departure,
                        arrival: data.trip.arrival,
                        date: data.trip.date,
                        price: data.trip.price,
                     };
                    fetch('https://tickethack-backend-umber.vercel.app/bookings/new', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newBooking)
                    })
                        .then(response => response.json())
                        .then(data => {
                        console.log('New trip added to Booking', data);
                            document.location.href = "cart.html"
                          });    
                })
       }       
       )
    };
}
