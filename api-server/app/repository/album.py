from app.model import models
from app.repository.repo import get_session
import uuid
from sqlalchemy import func
from sqlalchemy.orm import Session


def insert_album(album: models.Album, session: Session) -> models.Album:
    session.add(album)
    session.commit()
    session.refresh(album)
    return album


def get_album_by_id(id: uuid.UUID, session: Session) -> models.Album:
    album = session.get(models.Album, ident=id)
    return album


def get_album_by_name(name: str, session: Session) -> models.Album:
    return session.query(models.Album).filter(models.Album.name == name).first()


def get_all_albums(session: Session) -> list[models.Album]:
    return session.query(models.Album).all()


def delete_album(id: uuid.UUID, session: Session) -> bool:
    session = get_session()
    album = session.get(models.Album, ident=id)
    if album == None:
        return False
    else:
        session.delete(album)
        session.commit()
        return True


def find_album_with_name(name: str, session: Session) -> list[models.Album]:
    session = get_session()
    ts_query = func.plainto_tsquery("simple", name)
    albums = (
        session.query(models.album)
        .filter(func.to_tsvector("simple", models.Album.name).op("@@")(ts_query))
        .all()
    )
    return albums