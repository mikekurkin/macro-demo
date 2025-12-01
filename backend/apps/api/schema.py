import graphene
from graphene_django import DjangoObjectType
from .models import Workstation

class WorkstationType(DjangoObjectType):
    class Meta:
        model = Workstation
        fields = '__all__'


class WorkstationConnection(graphene.ObjectType):
    results = graphene.List(graphene.NonNull(WorkstationType), required=True)
    total = graphene.Int(required=True)
    page = graphene.Int(required=True)
    page_size = graphene.Int(required=True)
    has_next = graphene.Boolean(required=True)
    has_previous = graphene.Boolean(required=True)


class Query(graphene.ObjectType):
    workstations = graphene.Field(
        graphene.NonNull(WorkstationConnection),
        page=graphene.Int(default_value=1),
        page_size=graphene.Int(default_value=10),
    )
    workstation = graphene.Field(WorkstationType, id=graphene.Int())

    def resolve_workstations(self, info, page=1, page_size=10):
        page = max(page, 1)
        page_size = max(min(page_size, 50), 1)
        queryset = Workstation.objects.all()
        total = queryset.count()
        start = (page - 1) * page_size
        end = start + page_size
        items = list(queryset[start:end])

        return WorkstationConnection(
            results=items,
            total=total,
            page=page,
            page_size=page_size,
            has_next=end < total,
            has_previous=start > 0,
        )

    def resolve_workstation(self, info, id):
        try:
            return Workstation.objects.get(pk=id)
        except Workstation.DoesNotExist:
            return None


class CreateWorkstation(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        description = graphene.String()
        ip_address = graphene.String()

    workstation = graphene.Field(WorkstationType)

    def mutate(self, info, title, description, ip_address=None):
        workstation = Workstation.objects.create(
            title=title,
            description=description,
            ip_address=ip_address
        )
        return CreateWorkstation(workstation=workstation)


class UpdateWorkstation(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        title = graphene.String()
        description = graphene.String()
        ip_address = graphene.String()

    workstation = graphene.Field(WorkstationType)

    def mutate(self, info, id, title=None, description=None, ip_address=None):
        try:
            workstation = Workstation.objects.get(pk=id)

            if title is not None:
                workstation.title = title
            if description is not None:
                workstation.description = description
            if ip_address is not None:
                workstation.ip_address = ip_address

            workstation.save()
            return UpdateWorkstationk(workstation=workstation)
        except Workstation.DoesNotExist:
            raise Exception('Workstation not found')


class DeleteWorkstation(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    success = graphene.Boolean()

    def mutate(self, info, id):
        try:
            workstation = Workstation.objects.get(pk=id)
            workstation.delete()
            return DeleteWorkstation(success=True)
        except Workstation.DoesNotExist:
            raise Exception('Workstation not found')


class Mutation(graphene.ObjectType):
    create_workstation = CreateWorkstation.Field()
    update_workstation = UpdateWorkstation.Field()
    delete_workstation = DeleteWorkstation.Field()
