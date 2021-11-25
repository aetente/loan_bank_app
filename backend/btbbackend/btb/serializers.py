from rest_framework import serializers
from btb.models import User, BankDetails, LoanDetails
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        print("CREATE")
        validated_data['password'] = make_password(validated_data['password'])
        return User.objects.create(**validated_data)


class BankDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = BankDetails
        fields = '__all__'


class LoanDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = LoanDetails
        fields = '__all__'
