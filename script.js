document.querySelector('#btn-search').addEventListener('click', function(){
    console.log('clik src btn detected')
    
    const departure = document.querySelector('#search-departure').value;
    const arrival = document.querySelector('#search-arrival').value;
    const date = document.querySelector('#search-date').value;

    console.log(newTrip = {departure, arrival, date})  
    
    fetch(`http://localhost:3000/trips/${departure}/${arrival}/${date}`).then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
});



   // for (let i = 0; i < trips.length; i++) {
        //     document.querySelector('#trips').inneHTML += `
        //     <div class="${trips[i]._id} trip-container">
        //         <div>${trips[i].departure} > ${trips[i].arrival}</div>
        //         <div>${trips[i].time}</div>
        //         <div>${trips[i].price}€</div>
        //         <input class="delete-btn" type="button" value="Book" />
        //     </div>`
        //     // Utiliser Moment.js pour récupérer l'heure
        //    }