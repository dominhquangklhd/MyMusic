from typing import Iterator
from app.model import models
import app.repository.artist as artist_repo
import app.repository.track as track_repo
import app.repository.category as category_repo
from app.repository.repo import get_session
from app.schema.track import (
    TrackResponse,
    TrackUploadForm,
    TrackSimpleResponse,
    TrackDeleteResponse,
)
import app.schema.utils as schema_utils
import uuid
from os.path import join
from app.service.error import StreamError
from app.repository.error import NotFoundError


def upload_track(track_form: TrackUploadForm) -> TrackResponse:
    session = get_session()
    artists = [
        artist_repo.get_artist_by_id(session=session, id=artist_id)
        for artist_id in track_form.artists_id
    ]

    categories = [
        category_repo.get_category_by_name(name=category_name, session=session)
        for category_name in track_form.categories
    ]

    track = models.Track(
        name=track_form.name,
        length=track_form.length,
        artists=artists,
        album_id=track_form.album_id,
        categories=categories,
    )
    track = track_repo.insert_track(track, session)

    track_response = TrackResponse(
        id=track.id,
        name=track_form.name,
        length=track_form.length,
        artists=[
            schema_utils.artist_model_to_simple_response(artist) for artist in artists
        ],
        categories=[
            schema_utils.category_model_to_response(category)
            for category in track.categories
        ],
        album=schema_utils.album_model_to_simple_response(track.album),
    )
    session.close()

    return track_response


def get_all_tracks() -> list[TrackSimpleResponse]:
    session = get_session()
    tracks = track_repo.get_all_tracks(session)
    responses = [schema_utils.track_model_to_simple_response(track) for track in tracks]

    session.close()

    return responses


def get_track_by_id(id: uuid.UUID) -> TrackResponse:
    session = get_session()
    track = track_repo.get_track_by_id(id, session)
    response = schema_utils.track_model_to_detail_response(track)
    session.close()
    return response


def delete_track_by_id(id: uuid.UUID) -> TrackDeleteResponse | None:
    session = get_session()
    success = track_repo.delete_track(id, session)
    session.close()
    if success:
        return None
    else:
        return TrackDeleteResponse(message=f"fail to delete track with {id}")


def find_track_with_name(name: str) -> list[TrackSimpleResponse]:
    session = get_session()
    query_result = track_repo.find_track_with_name(name, session)
    response = []
    for track in query_result:
        response.append(schema_utils.track_model_to_simple_response(track))
    session.close()
    return response


BASE_TRACK_PATH = "app/static"


# I consider using track_name for convenient way for develop, when deploy consider using id => better way IMO
def stream_track(track_name: str) -> Iterator[bytes]:
    # track_name has already been converted to slug
    # if track_repo.get_track_by_name() is None:
    #     raise NotFoundError(type="Track")
    file_name = f"{track_name}.mp3"
    path = join(BASE_TRACK_PATH, file_name)
    try:
        with open(path, "rb") as file:
            yield from file
    except Exception as e:
        raise StreamError(str(e))
