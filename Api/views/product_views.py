from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated , IsAdminUser
from rest_framework_simplejwt.tokens import Token
from django.core.paginator import Paginator,EmptyPage,PageNotAnInteger
from django.db.models import F, functions
from django.db.models import Q


from Api.models import Product , Review
from Api.serializer import ProductSerializer,ProductImageSerializer
from rest_framework import status

@api_view(['GET'])
def getProduct(request,pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if query==None:
        query=''
    products = Product.objects.filter(Q(name__icontains=query) | Q(category__icontains=query) | Q(brand__icontains=query))

    products = products.annotate(random_order=functions.Random()).order_by('random_order')
    page = request.query_params.get('page')
    paginator = Paginator(products,12)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except PageNotAnInteger:
        products = paginator.page(paginator.num_pages)
    
    if(page ==None):
        page=1
    page=int(page)
    serializer = ProductSerializer(products,many=True)
    return Response({'products':serializer.data,'page':page,'pages':paginator.num_pages})

@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=1).order_by('-rating')[0:5]
    serializer = ProductSerializer(products,many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    data=request.data
    product = Product.objects.create(
        user=user,
        name='name',
        price=100,
        originalPrice=120,
        brand='brand',
        countInStock=0,
        category='category',
        description='description',
        shortDescription='shortDescription',
        rating='0'
    )

    serializer = ProductSerializer(product,many=False)
    print(serializer.data)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request,pk):
    data = request.data
    product = Product.objects.get(_id=pk)
    product.lastImage = product.image
    product.name = data['name']
    product.price = data['price']
    product.originalPrice = data['orignalPrice']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']
    product.shortDescription = data['shortDescription']
    product.image = data['image']
    product.galary = data['galary']

    product.save()
    serializer = ProductSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['PUT','POST'])
def setPreviewImage(request):
    data = request.data
    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)
    if product.lastImage:
        image = product.image
        product.image = product.lastImage
        product.lastImage = image
        serializer = ProductImageSerializer(product,many=False)
        return Response(serializer.data)
    else:
        return Response({'image':product.image,'details':'last image not available'})

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request,pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product deleted')

@api_view(['POST'])
def uploadImage(request):
    data=request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)
    product.lastImage = product.image
    product.image = request.FILES.get('image')
    product.save()
    serializer = ProductImageSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['POST'])
def uploadGalary(request):
    data=request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.galary = request.FILES.get('galary')
    product.save()
    serializer = ProductImageSerializer(product,many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request,pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content = {'detail':'Product Review already exists'}
        return Response(content,status=status.HTTP_400_BAD_REQUEST)
    
    elif data['rating'] == 0:
        content = {'detail':'Please select your rating'}
        return Response(content,status=status.HTTP_400_BAD_REQUEST)
    
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment']
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating 
        
        product.rating = total / len(reviews)
        product.save()

        return Response('review added')

