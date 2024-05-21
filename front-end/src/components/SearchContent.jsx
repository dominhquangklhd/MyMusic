import { useStateProvider } from "../utils/StateProvider";
import SongItem from "./SongItem";
import { reducerCases } from "../utils/Constants";
import { Link } from "react-router-dom";
import ArtistItem from "./ArtistItem";
import AlbumItem from "./AlbumItem";

export default function SearchContent() {
    const [{ filterItems }, dispatch] = useStateProvider();

    const isEmptyFilterItems = filterItems.every(arr => Array.isArray(arr) && arr.length === 0);
    const selectSong = (selectedSongId) => {
        dispatch({ type: reducerCases.SET_SONG_ID, selectedSongId: selectedSongId })
    }

    const selectArtist = (selectedArtistId) => {
        dispatch({ type: reducerCases.SET_ARTIST_ID, selectedArtistId: selectedArtistId })
    }

    const selectAlbum = (selectedAlbumId) => {
        dispatch({ type: reducerCases.SET_ALBUM_ID, selectedAlbumId: selectedAlbumId })
    }

    return (
        <div>
            {!isEmptyFilterItems ? (
                <div>
                    <div className="mt-4">
                        {filterItems[0].length !== 0 && (
                            <h2 className="text-xl font-bold mb-2 text-green-500">Songs</h2>
                        )}
                        <div className="grid
                            grid-cols-2
                            sm:grid-cols-3
                            md:grid-cols-3
                            lg:grid-cols-4
                            xl:grid-cols-6
                            2xl:grid-cols-8
                            gap-4">
                            {filterItems[0].map((song) => (
                                <div
                                    key={song?.id}
                                >
                                    <Link to="/songview" onClick={() => selectSong(song?.id)}>
                                        <SongItem
                                            key={song.id}
                                            data={{
                                                id: song.id,
                                                name: song.name,
                                                track_image_path: song.track_image_path,
                                                artists: song.artists.map((artist) => ({
                                                    id: artist.id,
                                                    name: artist.name,
                                                    artist_image_path: artist.artist_image_path,
                                                })),
                                                song: "http://localhost:8000/" + song.audio_url,
                                            }} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4">
                        {filterItems[1].length !== 0 && (
                            <h2 className="text-xl font-bold mb-2 text-orange-500">Artists</h2>
                        )}
                        <div className="grid
                            grid-cols-2
                            sm:grid-cols-3
                            md:grid-cols-3
                            lg:grid-cols-4
                            xl:grid-cols-6
                            2xl:grid-cols-8
                            gap-4">
                            {filterItems[1].map((artist) => (
                                <div key={artist?.id}>
                                    <Link to="/artistview" onClick={() => selectArtist(artist?.id)}>
                                        <div className="flex-1 text-white">
                                            <ArtistItem
                                                data={{
                                                    id: artist?.id,
                                                    name: artist?.name,
                                                    artist_image_path: artist?.artist_image_path,
                                                    description: artist?.description,
                                                }} />
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4">
                        {filterItems[2].length !== 0 && (
                            <h2 className="text-xl font-bold mb-2 text-blue-300">Albums</h2>
                        )}
                        <div className="grid
                            grid-cols-2
                            sm:grid-cols-3
                            md:grid-cols-3
                            lg:grid-cols-4
                            xl:grid-cols-6
                            2xl:grid-cols-8
                            gap-4">
                            {filterItems[2].map((album) => (
                                <div
                                    key={album?.id}>
                                    <Link to="/albumview" onClick={() => selectAlbum(album?.id)}>
                                        <div className="flex-1 text-white">
                                                <AlbumItem
                                                data={{
                                                    id: album?.id,
                                                    name: album?.name,
                                                }} />
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <h2 className="text-white">Not found</h2>
            )}
        </div>
    );
}
