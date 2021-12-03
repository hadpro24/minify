from rest_framework import serializers

from .models import Film

class FilmSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Film
		fields = [
			'id', 'title', 'image', 'country', 'released', 
			'rated', 'runtime', 'image', 'url', 'description'
		]
