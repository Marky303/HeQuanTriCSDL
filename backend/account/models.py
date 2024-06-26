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

# Custom user model goes here.
class UserAccount(AbstractBaseUser, PermissionsMixin):
    # Necessary user fields
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    # Other user fields (other information)
    currentJob = models.CharField(max_length=50, default="Unemployed")
    currentLocation = models.CharField(max_length=120, default="Nowhere")
    shortDesc = models.CharField(max_length=100, default="Relatively hard-working and normal human being")
    
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
        return self.name

# User skills
class Skill(models.Model):
    # Foreign key to user
    UserAccount = models.ForeignKey(UserAccount, related_name='skills', on_delete=models.CASCADE, null=True)
    
    # Skill content
    skillContent = models.TextField(max_length=20)
    
    # Django admin test
    def __str__(self):
        return str(self.id) + ":" + self.skillContent

# User contacts
class Contact(models.Model):
    # Foreign key to user
    UserAccount = models.ForeignKey(UserAccount, related_name='contacts',  on_delete=models.CASCADE, null=True)
    
    # Contact info
    contactType = models.TextField(max_length=20)
    contactContent = models.TextField(max_length=120)
    
    # Django admin test
    def __str__(self):
        return str(self.id) + ":" + self.contactType + ":" + self.contactContent












# Note model for post testing
class Note(models.Model):
    # Foreign key
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, null=True)
    body = models.TextField()
    
    def __str__(self):
        return self.body