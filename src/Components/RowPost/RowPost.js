import React, { useState, useEffect } from 'react';
import './RowPost.css';
import axios from '../../constants/axios';
import { IMAGE_URL, API_KEY } from '../../constants/constants'
import YouTube from 'react-youtube';

function RowPost(props) {


    const [movie, setMovie] = useState([])
    const [urlId, setUrlId] = useState('')

    useEffect(() => {
        axios.get(props.url).then((movies) => {
            setMovie(movies.data.results)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        }
    }
    const showtrailer = (id) => {

        if (urlId) {
            setUrlId(false)
        } else {
            axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((result) => {
                if (result.data.results.length !== 0) {
                    setUrlId(result.data.results[0])
                } else {
                    console.log("No video results")
                }
            })
        }

    }

    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className="posters">
                {
                    movie.map(obj =>
                        <img onClick={() => showtrailer(obj.id)} className={props.isLarge ? 'poster' : 'smallPoster'} src={`${IMAGE_URL + obj.backdrop_path}`} alt="poster" />
                    )
                }
            </div>
            {urlId && <YouTube videoId={urlId.key} opts={opts} onEnd={() => setUrlId(false)} />}
        </div>
    )
}

export default RowPost
