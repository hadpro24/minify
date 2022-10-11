from django.shortcuts import render
from django.contrib.auth.decorators import login_required

from rest_framework import viewsets

from .models import Film
from .serializers import FilmSerializer

# Create your views here.

class FilmViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = Film.objects.all()
	serializer_class = FilmSerializer
	lookup_field = 'pk'

	def get_queryset(self):
		print(self.request.user)
		return super().get_queryset()
