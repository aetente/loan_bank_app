from django.shortcuts import render
from btb.models import User, BankDetails, LoanDetails
from btb.serializers import UserSerializer, BankDetailsSerializer, LoanDetailsSerializer
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password
from django.db import OperationalError
import datetime


class UserLogin(ObtainAuthToken):

    def post(self, request, format=None):
        username = request.data['login']
        password = request.data['password']
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'error': "user not found"},
                            status.HTTP_404_NOT_FOUND)
        except OperationalError:
            return Response({'error': "database is not responding"},
                            status.HTTP_500_INTERNAL_SERVER_ERROR)
        if check_password(password, user.password) is not True:
            return Response({'error': "wrong password"},
                            status.HTTP_404_NOT_FOUND)
        user.last_login_date = datetime.datetime.now().time()
        serializer_user = UserSerializer(user)
        token, created = Token.objects.get_or_create(user=user)
        user_data = {**serializer_user.data}
        banks = BankDetails.objects.filter(user=user.id).all()
        loans = LoanDetails.objects.filter(user=user.id).all()

        banks_data = BankDetailsSerializer(banks, many=True).data
        loans_data = LoanDetailsSerializer(loans, many=True).data
        return Response({'accsess_token': token.key,
                         'user': user_data,
                         'banks': banks_data,
                         'loans': loans_data
                         })


class GetUsers(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GetBanks(generics.ListCreateAPIView):
    queryset = BankDetails.objects.all()
    serializer_class = BankDetailsSerializer


class ListLoans(generics.ListCreateAPIView):
    queryset = LoanDetails.objects.all()
    serializer_class = LoanDetailsSerializer


class UserDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UpdateBanks(APIView):

    def post(self, request, format=None):
        data = request.data
        to_add = data['toAdd']
        to_update = data['toUpdate']
        to_delete = data['toDelete']

        for b in to_add:
            bank_serializer = BankDetailsSerializer(data=b)
            if (bank_serializer.is_valid()):
                bank_serializer.save()

        for b in to_update:
            the_bank = BankDetails.objects.get(pk=b["id"])
            bank_serializer = BankDetailsSerializer(the_bank, data=b)
            if (bank_serializer.is_valid()):
                bank_serializer.save()

        for b_id in to_delete:
            the_bank = BankDetails.objects.get(pk=b_id)
            the_bank.delete()
        return Response(status=status.HTTP_200_OK)
