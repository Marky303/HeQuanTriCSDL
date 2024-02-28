from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# Manager for user account (create user)
class UserAccountManager(BaseUserManager):
    # Function to create new user
    # By default django will not allow no password
    def create_user(self, email, name, password=None):
        # Raise error if there is no email
        if not email:
            raise ValueError('User must have an email address')
        
        # Normalizer normalizing email (lowercasing,...) 
        email = self.normalize_email(email)
        user = self.model(email=email, name=name)
        
        # Hashing password for security reasons
        user.set_password(password)
        
        # Finally save the user
        user.save()
        return user
    
    # Incase you need that
    def create_superuser(self):
        pass

# Custom user model goes here.
class UserAccount(AbstractBaseUser, PermissionsMixin):
    # Add user profile imformation/ fields here
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    # Email will be used as username field for now
    USERNAME_FIELD = 'email'
    
    # Required fields, taken from profile info/ fields (can be added from above)
    REQUIRED_FIELDS = ['name']
    
    objects = UserAccountManager()
    
    # Functions to get user information
    def get_full_name(self):
        return self.name
    
    def get_short_name(self):
        return self.name
    
    def __str__(self):
        return self.email
    
# Note model for post testing
class Note(models.Model):
    body = models.TextField()
    
    def __str__(self):
        return self.body