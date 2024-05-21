import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiFillClockCircle } from "react-icons/ai";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import { changeTrack } from "./CurrentTrack";
import { FaPlay } from "react-icons/fa";

export default function ArtistSelected({ headerBackground }) {
    const [{ token, selectedArtistTracks, selectedArtistId, readyToListen }, dispatch] = useStateProvider();
    const [hoveredTrackId, setHoveredTrackId] = useState(null);

    useEffect(() => {
        const getArtistTracks = async () => {
            const response = await axios.get(
                `http://localhost:8000/artists/${selectedArtistId}/tracks`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            );
            const selectedArtistTracks = response?.data?.map((track) => ({
                id: track.id,
                name: track.name,
                length: track.length,
                track_image_path: track.track_image_path,
                artists: track.artists.map((artist) => ({
                    id: artist.id,
                    name: artist.name,
                })),
                artist_name: track.artists[0].name,
                artist_image_path: `http://localhost:8000/static/${track.artists[0].artist_image_path}`,
                album: track.album,
                song: `http://localhost:8000/${track.audio_url}`,
            }))
            console.log(response?.data);
            dispatch({ type: reducerCases.SET_ARTIST_TRACKS, selectedArtistTracks: selectedArtistTracks })
        };
        getArtistTracks();
    }, [token, dispatch, selectedArtistId]);

    const calculateTime = (sec) => {
        const minutes = Math.floor(sec / 60);
        const returnMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(sec % 60);
        const returnSec = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnMin}:${returnSec}`;
    };

    return <Container headerBackground={headerBackground}>
        {selectedArtistTracks && (
            <>
                <div className="playlist">
                    <div className="image">
                        <img src={selectedArtistTracks[0]?.artist_image_path} alt={selectedArtistTracks[0].artist_name}></img>
                    </div>
                    <div className="details">
                        <span className="type">Artist</span>
                        <h1 className="title">{selectedArtistTracks[0].artist_name}</h1>
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
                                changeTrack(selectedArtistTracks[0]?.id, token, readyToListen, dispatch, selectedArtistTracks[0]);
                            }}></FaPlay>
                        </button>
                    </div>
                </div>
                <div className="list">
                    {selectedArtistTracks.length !== 0 ? (
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
                                {selectedArtistTracks.map(
                                    ({
                                        id,
                                        name,
                                        length,
                                        track_image_path,
                                        artist_name,
                                        album
                                    }, index) => {
                                        return (
                                            <div
                                                className="row"
                                                key={id}
                                                onClick={() => changeTrack(id, token, readyToListen, dispatch, selectedArtistTracks[index])}
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
                                                        <span>{artist_name}</span>
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