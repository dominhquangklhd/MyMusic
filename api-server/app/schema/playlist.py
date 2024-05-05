from pydantic import BaseModel
from app.schema.user import UserSimpleResponse
import uuid


class PlaylistUploadForm(BaseModel):
    name: str
    user_id: uuid.UUID


class PlaylistUpdateForm(BaseModel):
    name: str


class PlaylistSimpleResponse(BaseModel):
    id: uuid.UUID
    name: str


from app.schema.track import TrackSimpleResponse


class PlaylistDetailResponse(PlaylistSimpleResponse):
    user: UserSimpleResponse
    tracks: list[TrackSimpleResponse]