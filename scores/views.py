import json
from django.shortcuts import render
from django.http import JsonResponse

from .models import Sendscore

# Create your views here.

def home(request):
    return render(request , "text.html")

def add_scroe(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data.get("username").strip().lower()
        score = float(data.get("score"))

        obj, created = Sendscore.objects.get_or_create(
            username=username,
            defaults={"score": score}
        )

        # Only update if new score is higher
        if not created and score  > obj.score:
            obj.score = score
            obj.save()

        return JsonResponse({"status": "saved"})


def get_score(request):
    messages = Sendscore.objects.all().order_by("-score")
    data =[
        {"username": m.username, "score":m.score}
        for m in messages
    ]
    return JsonResponse(data, safe=False)