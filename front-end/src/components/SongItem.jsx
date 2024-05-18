import { FaPlay } from "react-icons/fa"

export default function SongItem(song) {
    return (
        <div
            onClick={() => { }}
            className="
        relative
        group
        flex
        flex-col
        items-center
        justify-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-neutral-400/5
        cursor-pointer
        hover:bg-neutral-400/10
        transition
        p-3">
            <div className="
                relative
                aspect-square
                w-full
                h-full
                rounded-md
                overflow-hidden">
                <img
                    className="object-cover"
                    src={song.image}
                    alt={song.name}>
                </img>
            </div>
            <div className="flex flex-col items-start w-full pt-4 gap-y-1">
                <p className="text-neutral-100 text-lg font-semibold truncate w-full">{song.name}</p>
                <p className="text-neutral-400 text-smpb-4 w-full truncate">{song.artist}</p>
                <div className="
                absolute
                bottom-24
                right-5">
                    <button
                        className="
                            transition
                            opacity-0
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
                        <FaPlay className="text-black"></FaPlay>
                    </button>
                </div>
            </div>
        </div>
    )
}