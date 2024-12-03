from sqlalchemy.orm import Session, aliased
from sqlalchemy import func, select, column, table, case
from fastapi import Request
from inspect import currentframe as frame
from fastapi.encoders import jsonable_encoder
import math

from app.core import exceptions as ex
from app.core import util
from app.core.database import format_sql
from app.models.inbound import *
from app.schemas.inbound import *
from app.deps.auth import get_password_hash
from app.service.log_service import *

def create_inbound_log(request: Request, inbound: Inbound):
    request.state.inspect = frame()
    db_item = T_INBOUND_LOG (
         route_path = inbound.route_path
        ,route_name = inbound.route_name
        ,request = inbound.request
        ,response = inbound.response
        ,reg_user = inbound.reg_user
    )
    return db_item

def create_inbound_log_commit(request: Request, db_item: T_INBOUND_LOG):
    request.state.inspect = frame()
    db = request.state.db
    db.add(db_item)
    db.flush()
