# Generated by Django 5.0.1 on 2024-04-14 05:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Api', '0007_review_createdat'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='galary',
            field=models.ImageField(blank=True, default='/placeholder.jpg', null=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='product',
            name='originalPrice',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True),
        ),
        migrations.AddField(
            model_name='product',
            name='shortDescription',
            field=models.TextField(blank=True, null=True),
        ),
    ]