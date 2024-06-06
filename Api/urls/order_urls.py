from django.urls import path
from Api.views import order_views as views

urlpatterns = [
    path('',views.getOrders,name='order'),
    path('add/',views.addOrderItems,name='order-Add'),
    path('myorders/',views.getMyOrders,name='my-order'),
    path('<str:pk>/deliver/',views.updateOrderToDelivered,name='order-delivered'),
    path('<str:pk>/',views.getOrderById,name='get-order'),
    path('<str:pk>/pay/',views.updateOrderToPaid,name='pay'),
]
