from django.shortcuts import _get_queryset


def get_or_none(model, *args, **kwargs):
    try:
        return model.objects.get(*args, **kwargs)
    except model.DoesNotExist:
        return None


def get_list_or_none(model, *args, **kwargs):
    queryset = _get_queryset(model)
    obj_list = list(queryset.filter(*args, **kwargs))
    if not obj_list:
        return None
    return obj_list
