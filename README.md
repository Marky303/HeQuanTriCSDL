# User authentication template for Django and Reactjs applications

## 1.Introduction
This template has *basic* features/functionalities for a **user authentication** oriented application plus a **user note example**. This template was created following this [JWT token reference](https://www.youtube.com/watch?v=xjMP0hspNLE&t=3375s&ab_channel=DennisIvy) and this [Djoser endpoints reference](https://www.youtube.com/watch?v=QFDyXWRYQjY&list=PLJRGQoqpRwdfoa9591BcUS6NmMpZcvFsM&ab_channel=BryanBrkic)

## 2.Installed packages
### 2a.Backend
> [!WARNING]
> Remember to create virtualenv using **virtualenv env** before installing these packages

> [!WARNING]
> Remember to enter virtualenv using **env\Scripts\activate** before installing these packages
```
    pip install djangorestframework djangorestframework-simplejwt django-cors-headers djoser
```
### 2b.Frontend
> [!WARNING]
> Remember to enter frontend folder using **cd frontend** before installing these packages
```
    npm install react-router-dom
```
## 3.Notes/Attention
- Customized emails can be modified in backend/account/templates/emails and backend/account/email.py (and settings.py)
- Django data can be deleted using "python manage.py flush"
- Create superuser using "python manage.py createsupauser" (after cd into backend) to create superuser (credentials: nhien/1234)
- Global hosting can be achived by using "ngrok http http://localhost:5173" and CORS_ALLOW_ALL_ORIGINS set to True

## 4.All features
All the features that have been added to this template
- User authentication actions
    + Login/Logout
    + Sign up
    + Reset password
    + Email notifications
    + A user note example 

## 5.Features to be added
Additional features to be added to this template:
- ~~Fix private routes /singup and /resetpassword keep redirecting back to login~~
- ~~Create a new user~~
- ~~Add basic graphics:~~ ~~Navbar~~, ~~Login page~~
    + ~~Navbar: Logo (Link to home) + Search area (blank) + Userauth interactions~~
    + ~~Login page: Login prompt + Form (with good border-radius) + Login button + Link to forgot password, register~~
- ~~Add redirect back to /home from /login after logged in~~ 
- ~~Add advanced page layout graphics (what even is that)~~
- ~~Change /dash to be the private route path~~
- ~~Add reset password~~
- ~~Add loading to page~~
- ~~Account activation successful alert (what the ~~fuck~~ is wrong with the activation site)~~
- ~~Simple note example~~ 
- Reset username
