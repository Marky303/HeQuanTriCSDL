"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 5.0.2.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-scsxw6$cwah_s)gzn4w!$^mkdezc5v8kzr47t@=q))lgr6mmfo'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    
    # Installed libraries
    'rest_framework',
    'rest_framework_simplejwt.token_blacklist',              # blacklisting used tokens
    'djoser',
    'corsheaders',
    
    # Apps
    'account',
]

MIDDLEWARE = [
    # Adding corsheaders middleware
    'corsheaders.middleware.CorsMiddleware',
    
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Corsheaders config
# CORS_ALLOW_ALL_ORIGINS = True

# Allow react hosted port
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]

# Email for verification                                                               ***
# nhienhuu303@gmail.com / imyx pegp moiv ambk
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'nhienhuu303@gmail.com'
EMAIL_HOST_PASSWORD = 'imyxpegpmoivambk'
EMAIL_USE_TLS = True

# Djoser configs
DJOSER = {
    # We are using email as login field
    'LOGIN_FIELD': 'email',
    
    # Require an additional field when signing up an account
    'USER_CREATE_PASSWORD_RETYPE': True,
    
    # Get a confirmation email when username is changed
    'USERNAME_CHANGED_EMAIL_CONFIRMATION': True,
    
    # Get a confirmation email when username is changed
    'PASSWORD_CHANGED_EMAIL_CONFIRMATION': True,
    
    # Confirmation email when account is created
    'SEND_CONFIRMATION_EMAIL': True,
    
    # Retype password twice to ensure equality
    'SET_PASSWORD_RETYPE': True,
    
    # Enable url to frontend password reset page
    'PASSWORD_RESET_CONFIRM_URL': 'password/reset/confirm/{uid}/{token}',
    
    # Enable url to frontend username reset page
    'USERNAME_RESET_CONFIRM_URL': 'email/reset/confirm/{uid}/{token}',
    
    # Url to frontend activation page
    'ACTIVATION_URL': 'activate/{uid}/{token}',
    
    # Send activation email when account is activated
    'SEND_ACTIVATION_EMAIL': True,
    
    # Object to pass serializers to
    'SERIALIZERS': {
        'user_create'   : 'account.api.serializers.UserCreateSerializer',
        'user'          : 'account.api.serializers.UserCreateSerializer',
        'user_delete'   : 'djoser.serializers.UserDeleteSerializer',
    }
}

# Djoser needed configs
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

SIMPLE_JWT = {
   'AUTH_HEADER_TYPES': ('JWT',),
}

# JWT settings/configurations
SIMPLE_JWT = {
    # Access token's lifespan
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=10),
    
    # Refresh token lifespan (login after 10 days)
    "REFRESH_TOKEN_LIFETIME": timedelta(days=15),
    
    # If the user is active, they do not have to relogin to get refresh token after time span
    # Inshort, you get a new access token AND a new refresh token everytime you "refresh"
    "ROTATE_REFRESH_TOKENS": True,
    
    # Once refresh token is used, it gets blacklisted (nobody can use the token again)
    "BLACKLIST_AFTER_ROTATION": True,
    
    "UPDATE_LAST_LOGIN": False,

    "ALGORITHM": "HS256",
    "VERIFYING_KEY": "",
    "AUDIENCE": None,
    "ISSUER": None,
    "JSON_ENCODER": None,
    "JWK_URL": None,
    "LEEWAY": 0,

    # Determine how the header field name should be
    "AUTH_HEADER_TYPES": ("Bearer",),
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",

    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
    "TOKEN_USER_CLASS": "rest_framework_simplejwt.models.TokenUser",

    "JTI_CLAIM": "jti",

    "SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
    "SLIDING_TOKEN_LIFETIME": timedelta(minutes=5),
    "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=1),

    "TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainPairSerializer",
    "TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSerializer",
    "TOKEN_VERIFY_SERIALIZER": "rest_framework_simplejwt.serializers.TokenVerifySerializer",
    "TOKEN_BLACKLIST_SERIALIZER": "rest_framework_simplejwt.serializers.TokenBlacklistSerializer",
    "SLIDING_TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainSlidingSerializer",
    "SLIDING_TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSlidingSerializer",
}

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


AUTH_USER_MODEL = 'account.userAccount'