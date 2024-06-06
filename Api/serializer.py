from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product,Order,OrderItem,ShippingAddress,Review

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    last_login = serializers.SerializerMethodField(read_only=True)
    isActive = serializers.SerializerMethodField(read_only=True)
    date_joined = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id','_id','username','email','name','isAdmin','last_login','isActive','date_joined']

    def get_name(self,obj):
        name=obj.first_name
        if name == '':
            name=obj.email
        return name
    
    def get__id(self,obj):
        return obj.id
    
    def get_isAdmin(self,obj):
        return obj.is_staff
    
    def get_last_login(self,obj):
        return obj.last_login
    
    def get_date_joined(self,obj):
        return obj.date_joined
    
    def get_isActive(self,obj):
        return obj.is_active

class UserSerializersWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id','_id','username','email','name','isAdmin','token']

    def get_token(self,obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = '__all__'

    def get_reviews(self,obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews,many=True)
        return serializer.data
    
    def get_image_url(self,obj):
        if obj.image:
            url = obj.image.url.split('?')[0]
            url_parts = url.split('/https%3A/detroit-watch.s3.eu-north-1.amazonaws.com')
            if len(url_parts) > 1:
                url = url_parts[0] + url_parts[1]
            else:
                url = url_parts[0]
            return url
        return 'https://detroit-watch.s3.eu-north-1.amazonaws.com/placeholder.jpg'

class ProductImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ['_id','image','image_url']

    def get_image_url(self,obj):
        if obj.image:
            url = obj.image.url.split('?')[0]
            url_parts = url.split('/https%3A/detroit-watch.s3.eu-north-1.amazonaws.com')
            if len(url_parts) > 1:
                url = url_parts[0] + url_parts[1]
            else:
                url = url_parts[0]
            return url
        return 'https://detroit-watch.s3.eu-north-1.amazonaws.com/placeholder.jpg'

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    OrderItem = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Order
        fields = '__all__'

    def get_OrderItem(self,obj):
        items = obj.orderitem_set.all()
        serializers = OrderItemSerializer(items,many=True)
        return serializers.data
    
    def get_shippingAddress(self,obj):
        try:
            address = ShippingAddressSerializer(obj.shippingAddress,many=False).data
        except:
            address = False
        return address
    
    def get_user(self,obj):
        user = obj.user
        serializers = UserSerializer(user,many=False)
        return serializers.data



