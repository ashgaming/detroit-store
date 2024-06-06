from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated , IsAdminUser
from rest_framework_simplejwt.tokens import Token
from Api.serializer import ProductSerializer , UserSerializer , UserSerializersWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from  datetime import datetime

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self,attrs):
        data = super().validate(attrs)

        serializer = UserSerializersWithToken(self.user).data

        for k,v in serializer.items():
            data[k] = v

        self.user.is_active = True
        self.user.last_login = datetime.now()
        self.user.save()
        return data
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name = data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password']),
            date_joined=datetime.now()
        )
        serializer = UserSerializersWithToken(user,many=False)
        return Response(serializer.data)
    except:
        message = {'details':'User with this email already exists'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializersWithToken(user,many=False)

    data = request.data
    user.first_name = data['name']
    user.username = data['username']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users,many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsersById(request,pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request,pk):
   # print(request.data)
    user = User.objects.get(id=pk)

    data = request.data
    user.first_name = data['name']
    user.username = data['username']
    user.email = data['email']
    user.is_staff = data['isAdmin']

    user.save()
    serializer = UserSerializer(user,many=False)
    return Response(data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request,pk):
    userForDelete = User.objects.get(id=pk)
    userForDelete.delete()
    return Response('User was Deleted')