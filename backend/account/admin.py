from django.contrib import admin

from .models import Note

# Register your models here.
# Registering models in order to be edited in admin site
admin.site.register(Note)