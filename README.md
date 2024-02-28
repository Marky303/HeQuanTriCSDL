# User authentication template for Django and Reactjs applications

## 1.Introduction
This template has *basic* features/functionalities for a **user authentication** oriented application plus a **user note example**. This template was created following this [reference1](https://www.youtube.com/watch?v=xjMP0hspNLE&t=3375s&ab_channel=DennisIvy) and this [reference2](https://www.youtube.com/watch?v=QFDyXWRYQjY&list=PLJRGQoqpRwdfoa9591BcUS6NmMpZcvFsM&ab_channel=BryanBrkic)

## 2.Installed packages
### 2a.Backend
> [!WARNING]
> Remember to enter virtualenv using **env\Scripts\activate** before installing these packages
```
    pip install djangorestframework
    pip install djangorestframework-simplejwt
    pip install django-cors-headers
    pip install djoser
```
### 2b.Frontend
> [!WARNING]
> Remember to enter frontend folder using **cd frontend** before installing these packages
```
    npm install react-router-dom
    npm install jwt-decode (havent been used)
    npm install axios
```
## 3.Notes/Attention
- Customized emails can be modified in backend/account/templates/emails and backend/account/email.py (and settings.py)

## 4.Features to be added
Additional features to be added to this template:
- ~~Fix private routes /singup and /resetpassword keep redirecting back to login~~
- ~~Create a new user~~ User activation and login is a bit buggy (Wait until function is executed) maybe find out about Django debug server being a lil buggy idk 
- Reset password
- Add basic graphics: ~~Navbar~~, ~~Login page~~
    + ~~Navbar: Logo (Link to home) + Search area (blank) + Userauth interactions~~
    + ~~Login page: Login prompt + Form (with good border-radius) + Login button + Link to forgot password, register~~
- ~~Add redirect back to /home from /login after logged in~~ 
- Add advanced page layout graphics
- Change /dash to be the private route path
- Add reset password
- Add loading to page
- Account activation successful alert (what the ~~fuck~~ is wrong with the activation site)