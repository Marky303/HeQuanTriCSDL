from django.urls import path

# Importing related views
from . import views

# Setting up urls patterns
urlpatterns = [
    # Note example url
    path('getnotes/', views.getNotes),
    path('getuserinfo/', views.getUserinfo),
    path('updateuserinfo/', views.updateUserinfo),
    path('adduserskill/', views.addUserskill),
    path('addusercontact/',views.addUsercontact),
    path('deleteuserskill/', views.deleteUserskill),
    path('deleteusercontact/', views.deleteUsercontact),
    path('viewuserinfo/', views.viewUserinfo)
]