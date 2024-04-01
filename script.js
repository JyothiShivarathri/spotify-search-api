async function search(event) {
    event.preventDefault();

    let cat = document.getElementById("catergory").value;
    let query = document.getElementById("query").value;

    const url = `https://spotify23.p.rapidapi.com/search/?q=${query}&type=multi&offset=0&limit=50&numberOfTopResults=5`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '775a4f6b11mshb6174685d1531a7p14210fjsn9bac0956d70a',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = ''; 
        
        if (cat=='Artist')
        {
            if (result.artists) {
                
                const artistName = result.artists.items[0].data.profile.name; 
                const imageUrl = result.artists.items[0].data.visuals.avatarImage.sources[0].url; 

            
                const trackBox = document.createElement('div');
                trackBox.classList.add('track-box');
                trackBox.innerHTML = `
                    <img src="${imageUrl}" alt="${artistName} Cover">
                    <div>
                        <h2>${artistName}</h2>
                    </div>
                `;
                resultsContainer.appendChild(trackBox);
            } else {
                
                resultsContainer.textContent = 'No Artists found.';
            }
        }
        else
        {
        
        if (result.tracks && result.tracks.items.length > 0) {
            
            result.tracks.items.forEach(track => {
                
                const trackName = track.data.name;
                const artistName = track.data.artists.items[0].profile.name; 
                const albumName = track.data.albumOfTrack.name;
                const songUrl=track.data.albumOfTrack.uri;
                const imageUrl = track.data.albumOfTrack.coverArt.sources[0].url; 
                
           
                const trackBox = document.createElement('div');
                trackBox.classList.add('track-box'); 
                trackBox.innerHTML = `
                    <img src="${imageUrl}" alt="${trackName} Cover">
                    <div>
                        <h2>${trackName}</h2>
                        <p>Artist: ${artistName}</p>
                        <p>Album: ${albumName}</p>
                        <a target="_blank" href="${songUrl}">Listen to the song</a>
                    </div>
                `;

                
                resultsContainer.appendChild(trackBox);
            });
        } else {
            
            resultsContainer.textContent = 'No tracks found.';
        }
    }
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('searchForm').addEventListener('submit', search);
