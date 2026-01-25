from django.urls import path
from .views import home, add_scroe,get_score

urlpatterns = [
    path("", home, name="text.html" ),
    path("add/", add_scroe),
    path("get/", get_score)
]