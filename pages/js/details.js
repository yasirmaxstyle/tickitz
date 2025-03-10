
async function getDetailsMovie() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYWRjNWUzNjZiZWEwMjEzNmU1ZDA1MzAxZmVmODYxZCIsIm5iZiI6MTc0MTI2NTQwOS43NTQsInN1YiI6IjY3Yzk5YTAxNGFmOGE2ODlhMjAzNTI3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CN1hwvCjGzxRqj4IREYKqIYvWCA851DPzGk9AJX1ny8";
        const url = `https://api.themoviedb.org/3/movie/${id}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`
            }
        }
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(response.statusText);
        const { title, genres, release_date, runtime, overview, poster_path, backdrop_path } = await response.json();
        const genre = [];
        genres.map(e => {
            genre[genre.length] = e.name;
        })

        //fetch cast
        const castResponse = await fetch(`${url}/credits`, options);
        if (!response.ok) throw new Error(response.statusText);
        const { cast, crew } = await castResponse.json();
        const actors = [];
        let director;
        cast.forEach(e => {
            if (e.known_for_department === "Acting") actors[actors.length] = e.name;
        })
        crew.forEach(e => {
            if (e.job === "Director") director = e.name;
        })

        console.log(actors)
        console.log(director);
        // DOM
        //img

        const imgWrap = document.querySelector('#img-container');
        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/original/${poster_path}`;
        img.alt = title;
        img.width = 264;
        imgWrap.append(img);
        //title
        const titWrap = document.querySelector('#movie-title');
        const movTitle = document.createElement('p');
        movTitle.textContent = title;
        titWrap.append(movTitle);
        //genre
        const genWrap = document.querySelector('#genre');
        genre.forEach(g => {
            const movGen = document.createElement('p');
            movGen.textContent = g;
            genWrap.append(movGen);
        });
        //date release
        const relWrap = document.querySelector('#release');
        const movRel = document.createElement('p');
        movRel.textContent = release_date;
        relWrap.append(movRel)
        //duration
        const durWrap = document.querySelector('#duration');
        const movDur = document.createElement('p');
        const hour = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        movDur.textContent = `${hour} hours ${minutes} minutes`;
        durWrap.append(movDur);
        //director
        const dirWrap = document.querySelector('#direction');
        const movDir = document.createElement('p');
        movDir.textContent = director;
        dirWrap.append(movDir);
        //cast
        const castWrap = document.querySelector('#cast');
        const movCast = document.createElement('p');
        movCast.textContent = actors.slice(0, 3).join(', ');
        castWrap.append(movCast)
        
        //synopsis
        const synWrap = document.querySelector('#overview');
        const movSyn = document.createElement('p');
        movSyn.textContent = overview;
        synWrap.append(movSyn);

        //banner
        document.querySelector('#banner').style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backdrop_path})`

    } catch (error) {
        if (error instanceof Error) console.log(error.message);
    }
}

getDetailsMovie();