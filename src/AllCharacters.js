import React, { useState, useEffect } from 'react';
import { API_URL } from './constants';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AllCharacters() {
    const [serverData, setServerData] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/allCharacters`)
          .then(async res => {
            setServerData(res.data.payload);
          }).catch((e)=>console.log(e))
    }, [])

    return (  
        <ul style={{ listStyle: 'none'}}>
            {serverData.length > 0 ? 
                serverData.map((character) => {
                    return (
                    <li key={character._id}>
                        <Link to={`/mcu/${character.name}`}>
                            {character.name}
                        </Link>
                    </li>
                )
            }) 
            : 
            <h1>loading...</h1>}
        </ul>
    );
}

export default AllCharacters;