# project/celery.py

import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings")
app = Celery("project")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()

app.conf.beat_schedule = {
    "realtime_task_schedule": {
        "task": "realtime_task",
        "schedule": crontab(minute='*/2'),
    }
}
