import json
from django.shortcuts import render
from django.http import HttpRequest, JsonResponse

from .models import Sendscore
from django.db.models import Max

# Create your views here.

def home(request):
    return render(request , "text.html")




def add_scroe(request):
      if request.method == "POST":
        data = json.loads(request.body)

        Sendscore.objects.create(
            username=data.get("username"),
            score=data.get("score")
        )

        return JsonResponse({"status": "saved"})

 
def get_score(request):
    scores = (
        Sendscore.objects.values("username").annotate(score=Max("score")).order_by("-score")[:1000]
    )          

    return JsonResponse(list(scores), safe=False)



  