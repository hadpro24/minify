from django.db import models

from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import (
        BaseUserManager, AbstractBaseUser
)
# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_args):
        """ Creates and saves a User with the given username, password """
        user = self.model(email=email, **extra_args)
        user.set_password(password)
        user.save(using=self._db)
        return user


    def create_superuser(self, email, password=None, **extra_args):
        """ Creates and save a superuser with the given matricule and password """
        user = self.model(email=email, **extra_args)
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True
        user.set_password(password)
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)

    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff  = models.BooleanField(default=False)
    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDs = [
    	'email', 'password'
    ]

    def __str__(self):
        return self.email
