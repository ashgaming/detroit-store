from django.urls import path
from Api.views import product_views as views

urlpatterns = [
    path('',views.getProducts, name="products"),
    path('create/',views.createProduct, name="product-create"),
    path('upload/',views.uploadImage, name="upload-image"),
    path('upload/previous/',views.setPreviewImage, name="set-previous-image"),
    path('upload/galary/',views.uploadGalary, name="upload-galary"),
    path('<str:pk>',views.getProduct, name="product"),
    path('<str:pk>/reviews/',views.createProductReview, name="create-review"),
    path('top/',views.getTopProducts,name='top=products'),
    path('delete/<str:pk>/',views.deleteProduct, name="product-delete"),
    path('update/<str:pk>/',views.updateProduct, name="product-update"),
]


