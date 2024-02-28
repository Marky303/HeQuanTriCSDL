from django.core.management.base import BaseCommand, CommandError
from account.models import UserAccount, UserAccountManager
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class Command(BaseCommand):
    help = 'Create super user (nhien/1234) to edit in admin site'
    
    def handle(self, *args, **options):
        user = UserAccountManager().create_user("nhien","nhien","1234")
        user.is_superuser  = True
        user.save()
        return