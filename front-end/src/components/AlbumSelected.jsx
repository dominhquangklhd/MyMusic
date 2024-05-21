import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiFillClockCircle } from "react-icons/ai";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import { changeTrack } from "./CurrentTrack";
import { FaPlay } from "react-icons/fa";

export default function AlbumSelected({ headerBackground }) {
    const [{ token, selectedAlbum, selectedAlbumId, readyToListen }, dispatch] = useStateProvider();
    const [hoveredTrackId, setHoveredTrackId] = useState(null);

    useEffect(() => {
        const getAlbum = async () => {
            const response = await axios.get(
                `http://localhost:8000/albums/${selectedAlbumId}`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            );
            const selectedAlbum = {
                id: response.data.id,
                name: response.data.name,
                artists: response.data.artists.map((artist) => ({
                    name: artist.name,
                })),
                tracks: response.data.tracks.map((track) => ({
                    id: track.id,
                    name: track.name,
                    length: track.length,
                    track_image_path: track.track_image_path,
                    artists: track.artists.map((artist) => ({name: artist.name,})),
                    album: track.album,
                    song: `http://localhost:8000/${track.audio_url}`,
                }))
            }            
            
            dispatch({ type: reducerCases.SET_ALBUM, selectedAlbum: selectedAlbum })
        };
        getAlbum();
    }, [token, dispatch, selectedAlbumId]);

    const calculateTime = (sec) => {
        const minutes = Math.floor(sec / 60);
        const returnMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(sec % 60);
        const returnSec = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnMin}:${returnSec}`;
    };

    return <Container headerBackground={headerBackground}>
        {selectedAlbum && (
            <>
                <div className="playlist">
                    <div className="image">
                        <img src={`https://www.gravatar.com/avatar/${selectedAlbum?.id.replace(/-/g, "")}?s=64&d=identicon&r=PG`} alt={selectedAlbum.name}></img>
                    </div>
                    <div className="details">
                        <span className="type">Album</span>
                        <h1 className="title">{selectedAlbum.name}</h1>
                        <p>{selectedAlbum?.artists?.join(", ")}</p>
                    </div>
                </div>
                <div>
                    <div className="
                    flex
                    flex-row
                    justify-between
                    ml-8
                    mt-4">
                        <button
                            className="
                                transition
                                rounded-full
                                flex
                                items-center
                                bg-green-500
                                p-4
                                drop-shadow-md
                                translate
                                translate-y-1/4
                                group-hover:opacity-100
                                group-hover:translate-y-0
                                hover:scale-110">
                            <FaPlay className="text-black" onClick={() => {
                                changeTrack(selectedAlbum.tracks[0].id, token, readyToListen, dispatch, selectedAlbum.tracks[0]);
                            }}></FaPlay>
                        </button>
                    </div>
                </div>
                <div className="list">
                    {selectedAlbum.tracks.length !== 0 ? (
                        <>
                            <div className="header__row">
                                <div className="col">
                                    <span>#</span>
                                </div>
                                <div className="col">
                                    <span>TITLE</span>
                                </div>
                                <div className="col">
                                    <span>ALBUM</span>
                                </div>
                                <div className="col">
                                    <AiFillClockCircle />
                                </div>
                            </div>
                            <div className="tracks">
                                {selectedAlbum.tracks.map(
                                    ({
                                        id,
                                        name,
                                        length,
                                        track_image_path,
                                        artists,
                                        album
                                    }, index) => {
                                        return (
                                            <div
                                                className="row"
                                                key={id}
                                                onClick={() => changeTrack(id, token, readyToListen, dispatch, selectedAlbum.tracks[index])}
                                                onMouseEnter={() => setHoveredTrackId(id)} // Khi trỏ vào bài hát, set hoveredTrackId
                                                onMouseLeave={() => setHoveredTrackId(null)} // Khi rời khỏi bài hát, reset hoveredTrackId
                                            >
                                                <div className="col">
                                                    <span>{index + 1}</span>
                                                </div>
                                                <div className="col detail">
                                                    <div className="image">
                                                        <img src={`http://localhost:8000/static/${track_image_path}`} alt="track" />
                                                    </div>
                                                    <div className="info">
                                                        <span className="name">{name}</span>
                                                        <span>{artists?.join(", ")}</span>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <span>{album}</span>
                                                </div>
                                                <div className="col">
                                                    <span>{calculateTime(length)}</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>) : ""}
                </div>
            </>
        )
        }
    </Container>
}

const Container = styled.div`
    .playlist {
        margin: 0 2rem;
        display: flex;
        align-items: center;
        gap: 2rem;
        .image {
            img {
                height: 15rem;
                box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
            }
        }
        .details {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            color: #e0dede;
            .title {
                color: white;
                font-size: 4rem;
            }
        }
    }
    .list {
        margin: 0 0 3rem 0;
        .header__row {
            display: grid;
            grid-template-columns: 0.3fr 2.5fr 1.5fr 0.3fr 0.3fr;
            color: #dddcdc;
            margin: 1rem 0 0 0;
            position: sticky;
            top: 15vh;
            padding: 1rem 3rem;
            transition: 0.3s ease-in-out;
            background-color: ${({ headerBackground }) =>
        headerBackground ? "#000000dc" : "none"};
        }
        .tracks {
            margin: 0 2rem;
            display: flex;
            flex-direction: column;
            margin-bottom: 5rem;
            cursor: pointer;
            .row {
                padding: 0.5rem 1rem;
                display: grid;
                grid-template-columns: 0.3fr 2.5fr 1.5fr 0.3fr 0.3fr;
                &:hover {
                    background-color: rgba(0, 0, 0, 0.7);
                }
                .col {
                    display: flex;
                    align-items: center;
                    color: #dddcdc;
                    img {
                        height: 40px;
                    }
                }
                .detail {
                    display: flex;
                    gap: 1rem;
                    .info {
                        display: flex;
                        flex-direction: column;
                    }
                }
            }
        }
    }
`