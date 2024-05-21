export default function ArtistItem({ data }) {
    return (
        <div
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
                    className="object-cover w-full h-full"
                    src={"http://localhost:8000/static/" + data?.artist_image_path}
                    alt={data?.name}>
                </img>
            </div>
            <div className="flex flex-col items-start w-full pt-4 gap-y-1">
                <p className="text-neutral-100 text-lg font-semibold truncate w-full">{data?.name}</p>
            </div>
        </div>
    )
}