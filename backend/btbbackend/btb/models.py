from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.fields.related import ForeignKey

# Create your models here.


class User(AbstractUser):
    TZ = models.CharField(unique=True, blank=False, max_length=150)
    email = models.EmailField(blank=False, unique=True, max_length=150)
    first_name = models.CharField(blank=False, max_length=150)
    last_name = models.CharField(blank=False, max_length=150)
    phone = models.CharField(max_length=16)
    birth_date = models.DateField(blank=True, null=True)
    company_name = models.CharField(
        unique=True, blank=True, null=True, max_length=150)
    company_number = models.CharField(
        unique=True, blank=True, null=True, max_length=150)
    last_login_date = models.DateField(blank=True, null=True)


class BankDetails(models.Model):
    bank_name = models.CharField(blank=False, max_length=150)
    bank_branch = models.CharField(blank=False, max_length=150)
    bank_number = models.CharField(blank=False, max_length=150)
    user = ForeignKey(User, on_delete=models.CASCADE)


class LoanDetails(models.Model):
    loan_amount = models.PositiveIntegerField(blank=False)
    loan_period = models.PositiveIntegerField(blank=False)
    user = ForeignKey(User, on_delete=models.CASCADE)
