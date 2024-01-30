document.querySelector('#search-btn').addEventListener('click', function(){
    fetch('http://localhost:3000/').then((response) => response.json())
    .then((trips) =>{
        for (let i = 0; i < trips.length; i++) {
            document.querySelector('#trips').inneHTML += `
            <div class=${trips[i]._id} class="trip-container">
                <div>${trips[i].departure} > ${trips[i].arrival}</div>
                <div>${trips[i].time}</div>
                <div>${trips[i].price}€</div>
                <input class="book-btn" type="button" value="Book" />
            </div>`
            // Utiliser Moment.js pour récupérer l'heure
           }
    })
})