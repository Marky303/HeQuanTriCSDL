from django.contrib import admin

from .models import Note, UserAccount, Contact, Skill

# Register your models here.
# Registering models in order to be edited in admin site

# User model
admin.site.register(UserAccount)

# Additional user information
admin.site.register(Contact)
admin.site.register(Skill)




# Example
admin.site.register(Note)