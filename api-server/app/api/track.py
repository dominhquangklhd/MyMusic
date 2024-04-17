from fastapi import APIRouter
from app.schema.track import TrackResponse, TrackUploadForm
from app.service.track import TrackService
from app.api import repo

track_router = APIRouter(prefix="/tracks")
track_service = TrackService(repo)


@track_router.post("/", response_model=TrackResponse)
def upload_track(track_form: TrackUploadForm):
    response = track_service.upload_track(track_form)
    return response
