// import { API_KEY } from "./API_KEY/api.js"

async function getDataMovie() {
    try {

        //get movie now playing
        const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYWRjNWUzNjZiZWEwMjEzNmU1ZDA1MzAxZmVmODYxZCIsIm5iZiI6MTc0MTI2NTQwOS43NTQsInN1YiI6IjY3Yzk5YTAxNGFmOGE2ODlhMjAzNTI3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CN1hwvCjGzxRqj4IREYKqIYvWCA851DPzGk9AJX1ny8";
        const url = 'https://api.themoviedb.org/3/movie/now_playing';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`
            }
        }
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(response.statusText);
        const { results } = await response.json();
        const dataMovie = [];
        results.forEach(el => {
            dataMovie[dataMovie.length] = { id: el.id, synopsis: el.overview, img: el['poster_path'], release: el['release_date'], title: el.title }
        });
        const movieWithGenre = await Promise.all(
            dataMovie.map(async (data) => {
                const { id } = data;
                try {
                    // fetch genre
                    const url = `https://api.themoviedb.org/3/movie/${id}`
                    const options = {
                        method: 'GET',
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${API_KEY}`
                        }
                    }
                    const genresResponse = await fetch(url, options);
                    if (!genresResponse.ok) throw new Error(genresResponse.statusText);
                    const { genres, runtime } = await genresResponse.json();
                    const genre = [];
                    genres.map(e => {
                        genre[genre.length] = e.name;
                    })

                    // fetch credits: cast and director
                    // const urlCredits = `https://api.themoviedb.org/3/movie/${id}/credits`
                    // const creditsResponse = await fetch(urlCredits, options);
                    // if (!creditsResponse.ok) throw new Error(creditsResponse.statusText);
                    // const { cast } = await creditsResponse.json();
                    // const actors = []
                    // let director;
                    // cast.forEach(e => {
                    //     if (e.known_for_department === "Acting") actors[actors.length] = e.name;
                    //     if (e.job === "Director") director = e.name;
                    // })

                    // push data to result
                    return Object.assign(data, { genres: genre }, { duration: runtime });
                } catch (error) {
                    if (error instanceof Error) console.log(error.message);
                }
            }));

        // DOM
        const img = document.querySelectorAll
        console.log(movieWithGenre);
    } catch (error) {
        if (error instanceof Error) console.log(error.message);
    }
}

getDataMovie();