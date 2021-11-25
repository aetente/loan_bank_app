from django.urls import path
from btb.views import UserLogin, GetUsers, UserDetails, UpdateBanks, GetBanks, ListLoans

appname = "urlshortener"

urlpatterns = [
    path("login", UserLogin.as_view(), name="login"),
    path("user/<int:pk>/update", UserDetails.as_view(), name="user_update"),
    path("banks/update", UpdateBanks.as_view(), name="banks_update"),
    path("loans/list", ListLoans.as_view(), name="loans_list"),
    path("get/users", GetUsers.as_view(), name="get_users"),
    path("get/banks", GetBanks.as_view(), name="get_banks")
]
