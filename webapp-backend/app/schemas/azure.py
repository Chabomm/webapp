from typing import List, Dict, Any, Union, Optional
from datetime import date, datetime, time, timedelta

from app.schemas.schema import *

class Sub(AppModel):
    sub: str = Field("", title="암호화값")
    class Config:
        orm_mode = True