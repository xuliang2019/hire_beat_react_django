from django.urls import path,include
from .api.api import ResgisterAPI, LoginAPI, UserAPI
from knox import views as knox_views
from .views import sign_s3_upload

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', ResgisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(),name="knox_logout"), # invalidate the token
    #path('sign_s3', sign_s3),
    path('sign_auth',sign_s3_upload)
]

