from django.db import models


class Workstation(models.Model):
    title = models.CharField(unique=True)
    description = models.CharField(blank=True, null=True)
    ip_address = models.CharField(blank=True, null=True)

    has_pc = models.GeneratedField(
        expression=models.Case(
            models.When(ip_address__isnull=False, then=True),
            default=False,
        ),
        output_field=models.BooleanField(),
        db_persist=False
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
