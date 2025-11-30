from django.db import models
from graphene_django.converter import convert_django_field

@convert_django_field.register(models.GeneratedField)
def convert_generated_field(field, registry=None):
    # Convert the output_field of the GeneratedField and return it
    return convert_django_field(field.output_field, registry)
