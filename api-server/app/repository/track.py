from app.model import models
import uuid
from sqlalchemy import func, text, update
from sqlalchemy.orm import Session


def insert_track(track: models.Track, session: Session) -> models.Track:
    session.add(track)
    session.commit()
    session.refresh(track)
    return track


def get_all_tracks(session: Session) -> list[models.Track]:
    tracks = session.query(models.Track).all()
    return tracks


def get_track_by_id(id: uuid.UUID, session: Session) -> models.Track:
    track = session.get(models.Track, ident=id)
    return track


def delete_track(id: uuid.UUID, session: Session) -> bool:
    track = get_track_by_id(id, session)
    if track == None:
        return False
    else:
        session.delete(track)
        session.commit()
        return True


def find_track_with_name(name: str, session: Session) -> list[models.Track]:
    ts_query = func.plainto_tsquery("simple", name)
    tracks = (
        session.query(models.Track)
        .filter(func.to_tsvector("simple", models.Track.name).op("@@")(ts_query))
        .all()
    )
    return tracks


def update_track(track: models.Track, session: Session) -> models.Track:
    session.get(models.Track, ident=track.id)
    stmt = (
        update(models.Track)
        .where(models.Track.id == track.id)
        .values(
            name=track.name,
            length=track.length,
        )
    )
