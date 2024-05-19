# BANKING APPLICATION $$$

## 1.Introduction
This template has *basic* features/functionalities for a **user authentication** oriented application plus a **user note example**. This template was created following this [JWT token reference](https://www.youtube.com/watch?v=xjMP0hspNLE&t=3375s&ab_channel=DennisIvy) and this [Djoser endpoints reference](https://www.youtube.com/watch?v=QFDyXWRYQjY&list=PLJRGQoqpRwdfoa9591BcUS6NmMpZcvFsM&ab_channel=BryanBrkic)

## 2.How to use
### 2a.Backend packages
> [!WARNING]
> Remember to create virtualenv using **virtualenv env** before installing these packages

> [!WARNING]
> Remember to enter virtualenv using **env\Scripts\activate** before installing these packages
```
    pip install Django djangorestframework djangorestframework-simplejwt django-cors-headers djoser ccard
```
### 2b.Frontend packages
> [!WARNING]
> Remember to enter frontend folder using **cd frontend** before installing these packages
```
    npm install chart.js react-router-dom react-toastify
```
### 2c.Running development server
> [!WARNING]
> Remember to enter virtualenv using **env\Scripts\activate** before running backend development server
```
    cd backend
    python manage.py runserver
```
```
    cd frontend
    npm run dev
```
## 3.Notes/Attention
- Customized emails can be modified in backend/account/templates/emails and backend/account/email.py (and settings.py)
- Django data can be deleted using "python manage.py flush"
- Create superuser using "python manage.py createsupauser" (after cd into backend) to create superuser (credentials: nhien/1234)
- Global hosting can be achived by using "ngrok http http://localhost:5173" and CORS_ALLOW_ALL_ORIGINS set to True
- Notification (Toastify) config can be found and changed in NotifyContext.jsx

## 5.Features to be added
Additional features to be added to this template:
- Cash money view $$$

