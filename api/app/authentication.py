import requests

from users.models import User
from rest_framework import authentication
from rest_framework import exceptions

class GoogleAuthenticationToken(authentication.BaseAuthentication):
	def authenticate(self, request):
		token = request.META.get('HTTP_AUTHORIZATION')
		if not token:
			return None

		URL = 'https://oauth2.googleapis.com/tokeninfo?id_token={}'.format(token.split()[-1])
		response = requests.get(URL)
		data = response.json()
		if data and data.get('email_verified', False):
			try:
				user = User.objects.get(email=data['email'])
				return (user, None)
			except User.DoesNotExist:
				raise exceptions.AuthenticationFailed('No find user')
		return None
