// import { API_KEY } from "./API_KEY/api.js"

async function getDataMovie() {
    try {
        //get movie top rated
        const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYWRjNWUzNjZiZWEwMjEzNmU1ZDA1MzAxZmVmODYxZCIsIm5iZiI6MTc0MTI2NTQwOS43NTQsInN1YiI6IjY3Yzk5YTAxNGFmOGE2ODlhMjAzNTI3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CN1hwvCjGzxRqj4IREYKqIYvWCA851DPzGk9AJX1ny8";
        const url = 'https://api.themoviedb.org/3/movie/top_rated';
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
            dataMovie[dataMovie.length] = { id: el.id, img: `https://image.tmdb.org/t/p/original/${el['poster_path']}`, release: el['release_date'], title: el.title }
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
                    const { genres } = await genresResponse.json();
                    const genre = [];
                    genres.map(e => {
                        genre[genre.length] = e.name;
                    })

                    // push data to result
                    return Object.assign(data, { genres: genre });
                } catch (error) {
                    if (error instanceof Error) console.log(error.message);
                }
            }));
        // DOM
        movieWithGenre.slice(0, 4).forEach((element) => {
            // banner
            const imgHero = document.createElement('img');
            imgHero.src = element.img;
            imgHero.alt = element.title;
            document.querySelector('#img-banner-container').append(imgHero);

            // main wrapper
            const wrapper = document.createElement('div');

            //image cover
            const cover = document.createElement('div');
            cover.classList.add('img-cover');
            //button
            const btnWrap = document.createElement('div');
            const linkDetails = document.createElement('a');
            linkDetails.dataset.id = element.id;
            linkDetails.href = `./pages/details.html?id=${element.id}`;
            const btnDetails = document.createElement('button');
            btnDetails.setAttribute("type", "button");
            linkDetails.append(btnDetails);
            btnDetails.textContent = 'Details';
            const linkBuy = document.createElement('a');
            linkBuy.href = './order.html';
            const btnBuy = document.createElement('button');
            linkBuy.append(btnBuy);
            btnBuy.textContent = 'Buy Ticket'
            btnWrap.append(linkBuy, linkDetails);
            btnWrap.classList.add('btn-img')
            // overlay on hover
            const overlay = document.createElement('div');
            overlay.classList.add('overlay')
            // 
            const posterMovie = document.createElement('img');
            posterMovie.src = element.img;
            posterMovie.alt = element.title;
            // append img wrap
            cover.append(btnWrap, overlay, posterMovie);

            //title movie
            const titleWrap = document.createElement('div');
            const title = document.createElement('h3');
            title.textContent = element.title;
            titleWrap.append(title);
            titleWrap.classList.add('movie-title');
            //genre wrap
            const genreWrap = document.createElement('div');
            element.genres.forEach(g => {
                const genres = document.createElement('p');
                genres.textContent = g;
                genres.classList.add('genres');
                genreWrap.append(genres);
            })
            wrapper.append(cover, titleWrap, genreWrap);
            document.getElementById('movie-container-recom').append(wrapper);
        });
    } catch (error) {
        if (error instanceof Error) console.log(error.message);
    }
}

getDataMovie();

async function getDataMovieUpcoming() {
    try {
        //get movie top rated
        const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYWRjNWUzNjZiZWEwMjEzNmU1ZDA1MzAxZmVmODYxZCIsIm5iZiI6MTc0MTI2NTQwOS43NTQsInN1YiI6IjY3Yzk5YTAxNGFmOGE2ODlhMjAzNTI3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CN1hwvCjGzxRqj4IREYKqIYvWCA851DPzGk9AJX1ny8";
        const url = 'https://api.themoviedb.org/3/movie/upcoming';
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
            dataMovie[dataMovie.length] = { id: el.id, img: `https://image.tmdb.org/t/p/original/${el['poster_path']}`, release: el['release_date'], title: el.title }
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
                    const { genres } = await genresResponse.json();
                    const genre = [];
                    genres.map(e => {
                        genre[genre.length] = e.name;
                    })

                    // push data to result
                    return Object.assign(data, { genres: genre });
                } catch (error) {
                    if (error instanceof Error) console.log(error.message);
                }
            }));
        // DOM
        movieWithGenre.forEach((element) => {
            // main wrapper
            const wrapper = document.createElement('div');

            //image cover
            const cover = document.createElement('div');
            cover.classList.add('img-cover');
            //button
            const btnWrap = document.createElement('div');
            const linkDetails = document.createElement('a');
            linkDetails.dataset.id = element.id;
            linkDetails.href = `./pages/details.html?id=${element.id}`;
            const btnDetails = document.createElement('button');
            btnDetails.setAttribute("type", "button");
            linkDetails.append(btnDetails);
            btnDetails.textContent = 'Details';
            const linkBuy = document.createElement('a');
            linkBuy.href = './order.html';
            const btnBuy = document.createElement('button');
            linkBuy.append(btnBuy);
            btnBuy.textContent = 'Buy Ticket'
            btnWrap.append(linkBuy, linkDetails);
            btnWrap.classList.add('btn-img')
            // overlay on hover
            const overlay = document.createElement('div');
            overlay.classList.add('overlay')
            // 
            const posterMovie = document.createElement('img');
            posterMovie.src = element.img;
            posterMovie.alt = element.title;
            // append img wrap
            cover.append(btnWrap, overlay, posterMovie);

            //title movie
            const titleWrap = document.createElement('div');
            const title = document.createElement('h3');
            title.textContent = element.title;
            titleWrap.append(title)
            titleWrap.classList.add('movie-title')
            //date
            const dateRel = document.createElement('h4');
            dateRel.textContent = element.release;
            //genre wrap
            const genreWrap = document.createElement('div');
            element.genres.forEach(g => {
                const genres = document.createElement('p');
                genres.textContent = g;
                genres.classList.add('genres');
                genreWrap.append(genres);
            })
            wrapper.append(cover, titleWrap, dateRel, genreWrap);
            document.getElementById('movie-container-upcom').append(wrapper);
        });
    } catch (error) {
        if (error instanceof Error) console.log(error.message);
    }
}

getDataMovieUpcoming();

const movUpcom = document.getElementById('movie-container-upcom');
const lefttArrow = document.getElementById('arrLeft');
const rightArrow = document.getElementById('arrRight');

lefttArrow.onclick = ()=> {
    movUpcom.scrollLeft -= 1118;
};

rightArrow.onclick = ()=> {
    movUpcom.scrollLeft += 1118;
};