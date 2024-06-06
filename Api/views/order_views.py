from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from Api.models import Product,Order,OrderItem,ShippingAddress
from Api.serializer import ProductSerializer,OrderSerializer
from rest_framework import status
from datetime import datetime

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail':'No Order Items'},status=status.HTTP_400_BAD_REQUEST)
    else:
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],
        )

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['addr'],
            city=data['shippingAddress']['city'],
            state=data['shippingAddress']['_state'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country']
        )
        #Create order items and set order to orderItems relation
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])
            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )

            #update stock
            if(product.countInStock)!=0:
                product.countInStock -= item.qty
                product.save()
            else:
                return Response({'detail':'Items out of stocks'},status=status.HTTP_400_BAD_REQUEST)
    

        serializer = OrderSerializer(order,many=False)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders=user.order_set.all()
    orders = orders.order_by('-createdAt')
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders=Order.objects.all()
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request,pk):
    user = request.user
    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user==user:
            serializer = OrderSerializer(order,many=False)
            return Response(serializer.data)
        else:
            return Response({'details':'Not Authorized to view this order'},
                            status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'details':'Order does not exist'},status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET','PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request,pk):
    order = Order.objects.get(_id=pk)
    order.isPaid = True
    order.paidAT = datetime.now()
    order.save()
    return Response ('order was paid')

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request,pk):
    order = Order.objects.get(_id=pk)
    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()
    return Response ('order was Deliverd')

