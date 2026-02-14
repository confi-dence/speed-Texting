import os
import django


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'data.settings')
django.setup()

from django.contrib.auth.models import User

user = User.objects.get(username='confidence')
user.set_password('confi2026')
user.save()

print("Password reset complete!")
