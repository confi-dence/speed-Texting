from django.contrib import admin

from .models import Sendscore

# Register your models here.
class AdminScore(admin.ModelAdmin):
    list_display = ('score', 'username')

admin.site.register(Sendscore, AdminScore)
