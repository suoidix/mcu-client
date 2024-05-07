import { useParams, useNavigate } from 'react-router-dom'
import { API_URL } from './constants'
import React, { useState, useEffect } from 'react';

function OneCharacter() {
    const { name } = useParams()

    const navigate = useNavigate()


    const [character, setCharacter] = useState({
        debutFilm: "",
        debutYear: ""
    })
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        fetch(`${API_URL}/getCharacterByName/${name}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(async res => {
                let result = await res.json()
                setCharacter(result.payload)
            })
    }, [name, isEditing])

    function toggleEditing() {
        isEditing ? setIsEditing(false) : setIsEditing(true)
    }

    function updateCharacter({ target }) {
        setCharacter((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    function handleOnSubmit(e) {
        e.preventDefault()

        fetch(`${API_URL}/updateCharacter/${character._id}`, {
            method: "put",
            body: JSON.stringify(character),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(() => {
            setIsEditing(false)
        })
    }

    function handleDelete() {
        fetch(`${API_URL}/deleteCharacter/${character._id}`, {
            method: 'delete',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(() => navigate('/mcu'));
    }

    return (
        <>
            <h1>The character {character.name} first debuted in the film...</h1>
            <br /><br />
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <p>
                    Debuted in:&nbsp;
                    {
                        isEditing ?
                            <input type="text" name="debutFilm" value={character.debutFilm} onChange={updateCharacter}/>
                            :
                            <span>{character.debutFilm}</span>
                    }
                </p>
                <p>
                    Released in the year:&nbsp;
                    {
                        isEditing ?
                            <input type="text" name="debutYear" value={character.debutYear} onChange={updateCharacter}/>
                            :
                            <span>{character.debutYear}</span>
                    }
                </p>
                {isEditing ? <button type="submit">Submit Edit</button> : <br />}
            </form>
            <button onClick={toggleEditing}>
                {
                    isEditing ?
                        "Stop editing"
                        :
                        "Edit character details"
                }
            </button>
            <br /><br />
            <button onClick={handleDelete}>
                Delete this Character
            </button>
        </>
    );
}

export default OneCharacter;