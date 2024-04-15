from fastapi import FastAPI
from model import models

api = FastAPI()


def j4test():
    from repository.track import TrackRepo
    from repository.artist import ArtistRepo
    from service.track import TrackService
    from repository.general import Repo

    track_repo = TrackRepo()
    # track = models.Track(name="you and I are future", length=2 * 60 + 44)
    # track = track_repo.insert_track(track)

    # tracks = track_repo.find_track_with_name("you are")
    # for track in tracks:
    #     print(track.name)

    from uuid import UUID

    # id = UUID("39de6481-bef2-4083-8495-9a1259492e0c")
    # track = track_repo.get_track_by_id(id)
    # print(track.name)

    artist_repo = ArtistRepo()
    # artist = models.Artist(name="your name", description="kimi no na wa")
    # artist_repo.insert_artist(artist)
    repo = Repo(
        artist_repo=artist_repo,
        track_repo=track_repo,
    )
    track_service = TrackService(repo=repo)
    from service.track import TrackUploadForm

    track_upload_form = TrackUploadForm(
        name="bokunawa",
        length=358,
        artists_id=[UUID("8b4d8cb3-c8ec-45fe-91f1-81fe378972bd")],
        album_id=None,
        categories=None,
    )
    track_response = track_service.upload_track(track_upload_form)
    print(track_response.model_dump())


j4test()
