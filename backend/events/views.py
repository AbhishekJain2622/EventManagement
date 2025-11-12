from rest_framework import generics, permissions

from .models import Event
from .serializers import EventSerializer


class EventListCreateView(generics.ListCreateAPIView):
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if self.request.method in permissions.SAFE_METHODS:
            return Event.objects.all()
        if getattr(user, 'is_admin', False) or user.is_staff or user.is_superuser:
            return Event.objects.all()
        return Event.objects.filter(created_by=user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class EventDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if self.request.method in permissions.SAFE_METHODS:
            return Event.objects.all()
        if getattr(user, 'is_admin', False) or user.is_staff or user.is_superuser:
            return Event.objects.all()
        return Event.objects.filter(created_by=user)

    def perform_update(self, serializer):
        serializer.save(created_by=self.request.user)
