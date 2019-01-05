import environ
from celery.schedules import crontab

"""
Base settings to build other settings files upon.
"""


ROOT_DIR = environ.Path(__file__) - 3  # (mrelife/config/settings/base.py - 3 = mrelife/)
APPS_DIR = ROOT_DIR.path('mrelife')

env = environ.Env()

READ_DOT_ENV_FILE = env.bool('DJANGO_READ_DOT_ENV_FILE', default=False)
if READ_DOT_ENV_FILE:
    # OS environment variables take precedence over variables from .env
    env.read_env(str(ROOT_DIR.path('.env')))

# GENERAL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#debug
DEBUG = env.bool('DJANGO_DEBUG', True)
# Local time zone. Choices are
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# though not all of them may be available with every OS.
# In Windows, this must be set to your system time zone.
TIME_ZONE = 'Asia/Tokyo'
# https://docs.djangoproject.com/en/dev/ref/settings/#language-code
LANGUAGE_CODE = 'en-us'
# https://docs.djangoproject.com/en/dev/ref/settings/#site-id
SITE_ID = 1
# https://docs.djangoproject.com/en/dev/ref/settings/#use-i18n
USE_I18N = True
# https://docs.djangoproject.com/en/dev/ref/settings/#use-l10n
USE_L10N = True
# https://docs.djangoproject.com/en/dev/ref/settings/#use-tz
USE_TZ = True

# DATABASES
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#databases
DATABASES = {
    'default': env.db('DATABASE_URL'),
}
DATABASES['default']['ATOMIC_REQUESTS'] = True

# URLS
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#root-urlconf
ROOT_URLCONF = 'config.urls'
# https://docs.djangoproject.com/en/dev/ref/settings/#wsgi-application
WSGI_APPLICATION = 'config.wsgi.application'

# APPS
# ------------------------------------------------------------------------------
DJANGO_APPS = [
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # 'django.contrib.humanize', # Handy template tags
    'django.contrib.admin',
]
THIRD_PARTY_APPS = [
    'rest_framework',
    'rest_framework_jwt',
    'rest_framework.authtoken',
    'rest_framework_swagger',
    'django_inlinecss',
    # Filter on URL
    'url_filter',
    'corsheaders',
    # Export CSV
    'import_export'
]
LOCAL_APPS = [
    'mrelife.users.apps.UsersAppConfig',
    'mrelife.tags.apps.TagsConfig',
    'mrelife.categories.apps.CategoriesConfig',
    'mrelife.locations.apps.LocationsConfig',
    'mrelife.exhibitions.apps.ExhibitionsConfig',
    'mrelife.outletstores.apps.OutletstoresConfig',
    'mrelife.modelhouses.apps.ModelhousesConfig',
    'mrelife.file_managements.apps.FileManagementsAppConfig',
    'mrelife.authenticates.apps.AuthenticatesAppConfig',
    'mrelife.events.apps.EventsConfig',
    'mrelife.attributes.apps.AttributesConfig',
    'mrelife.examplehouses.apps.ExamplehousesConfig',
    'mrelife.fees.apps.FeesConfig',
    'mrelife.invoices.apps.InvoicesConfig',
]
# https://docs.djangoproject.com/en/dev/ref/settings/#installed-apps
INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

# MIGRATIONS
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#migration-modules
MIGRATION_MODULES = {
    'sites': 'mrelife.contrib.sites.migrations'
}

# AUTHENTICATION
# ------------------------------------------------------------------------------
ADMIN_URL = 'admincp/'
# https://docs.djangoproject.com/en/dev/ref/settings/#auth-user-model
AUTH_USER_MODEL = 'users.User'
# https://docs.djangoproject.com/en/dev/ref/settings/#login-url
LOGIN_URL = 'rest_framework:login'
LOGOUT_URL = 'rest_framework:logout'

# PASSWORDS
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#password-hashers
PASSWORD_HASHERS = [
    # https://docs.djangoproject.com/en/dev/topics/auth/passwords/#using-argon2-with-django
    'django.contrib.auth.hashers.Argon2PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher',
    'django.contrib.auth.hashers.BCryptSHA256PasswordHasher',
    'django.contrib.auth.hashers.BCryptPasswordHasher',
]
# https://docs.djangoproject.com/en/dev/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# MIDDLEWARE
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#middleware
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'mrelife.utils.response_middleware.ModifyResponseMiddleWare'
]

# STATIC
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#static-root
STATIC_ROOT = str(ROOT_DIR('static'))
# https://docs.djangoproject.com/en/dev/ref/settings/#static-url
STATIC_URL = '/static/'
# https://docs.djangoproject.com/en/dev/ref/contrib/staticfiles/#std:setting-STATICFILES_DIRS
STATICFILES_DIRS = [
    str(APPS_DIR.path('static')),
]
# https://docs.djangoproject.com/en/dev/ref/contrib/staticfiles/#staticfiles-finders
STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
]

# MEDIA
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#media-root
MEDIA_ROOT = str(APPS_DIR('media'))
# https://docs.djangoproject.com/en/dev/ref/settings/#media-url
MEDIA_URL = '/media/'
URL_IMAGE='http://18.179.32.241:8000'
# TEMPLATES
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#templates
TEMPLATES = [
    {
        # https://docs.djangoproject.com/en/dev/ref/settings/#std:setting-TEMPLATES-BACKEND
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # https://docs.djangoproject.com/en/dev/ref/settings/#template-dirs
        'DIRS': [
            str(APPS_DIR.path('templates')),
        ],
        'OPTIONS': {
            # https://docs.djangoproject.com/en/dev/ref/settings/#template-debug
            'debug': DEBUG,
            # https://docs.djangoproject.com/en/dev/ref/settings/#template-loaders
            # https://docs.djangoproject.com/en/dev/ref/templates/api/#loader-types
            'loaders': [
                'django.template.loaders.filesystem.Loader',
                'django.template.loaders.app_directories.Loader',
            ],
            # https://docs.djangoproject.com/en/dev/ref/settings/#template-context-processors
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.template.context_processors.i18n',
                'django.template.context_processors.media',
                'django.template.context_processors.static',
                'django.template.context_processors.tz',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
# FIXTURES
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#fixture-dirs
FIXTURE_DIRS = (
    str(APPS_DIR.path('fixtures')),
)

# EMAIL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#email-backend
EMAIL_BACKEND = env('DJANGO_EMAIL_BACKEND', default='django.core.mail.backends.smtp.EmailBackend')

# ADMIN
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#admins
ADMINS = [
    ("""Bin""", 'bin@example.com'),
]
# https://docs.djangoproject.com/en/dev/ref/settings/#managers
MANAGERS = ADMINS

# Celery
# ------------------------------------------------------------------------------
INSTALLED_APPS += ['mrelife.taskapp.celery.CeleryAppConfig']
if USE_TZ:
    # http://docs.celeryproject.org/en/latest/userguide/configuration.html#std:setting-timezone
    CELERY_TIMEZONE = TIME_ZONE
# http://docs.celeryproject.org/en/latest/userguide/configuration.html#std:setting-broker_url
CELERY_BROKER_URL = env('CELERY_BROKER_URL')
# http://docs.celeryproject.org/en/latest/userguide/configuration.html#std:setting-result_backend
CELERY_RESULT_BACKEND = CELERY_BROKER_URL
# http://docs.celeryproject.org/en/latest/userguide/configuration.html#std:setting-accept_content
CELERY_ACCEPT_CONTENT = ['json']
# http://docs.celeryproject.org/en/latest/userguide/configuration.html#std:setting-task_serializer
CELERY_TASK_SERIALIZER = 'json'
# http://docs.celeryproject.org/en/latest/userguide/configuration.html#std:setting-result_serializer
CELERY_RESULT_SERIALIZER = 'json'
# http://docs.celeryproject.org/en/latest/userguide/configuration.html#task-time-limit
# TODO: set to whatever value is adequate in your circumstances
CELERYD_TASK_TIME_LIMIT = 5 * 60
# http://docs.celeryproject.org/en/latest/userguide/configuration.html#task-soft-time-limit
# TODO: set to whatever value is adequate in your circumstances
CELERYD_TASK_SOFT_TIME_LIMIT = 60
# CELERYBEAT_SCHEDULE = {
#     'add-every-firt-day-of-month': {
#         'task': 'mrelife.fees.tasks.add_fee',
#         'schedule': crontab(0, 0, day_of_month='1'),
#     },
# }


# django-compressor
# ------------------------------------------------------------------------------
# https://django-compressor.readthedocs.io/en/latest/quickstart/#installation
INSTALLED_APPS += ['compressor']
STATICFILES_FINDERS += ['compressor.finders.CompressorFinder']

# Start DRF depenment
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
    # 'EXCEPTION_HANDLER': 'mrelife.utils.exceptionhanders.custom_exception_handler',
    # 'DEFAULT_FILTER_BACKENDS': ('rest_framework_filters.backends.DjangoFilterBackend',),
    # 'DEFAULT_FILTER_BACKENDS': ('rest_framework.filters.DjangoFilterBackend',),
    # 'DEFAULT_FILTER_BACKENDS': ('url_filter.integrations.drf.DjangoFilterBackend',),
    # Date input format
    'DATE_FORMAT': '%d-%m-%Y',
    'DATETIME_FORMAT': '%H:%M %d-%m-%Y',
    'DATETIME_INPUT_FORMATS': (
        '%H:%M %d-%m-%Y',
        '%d-%m-%Y %H:%M',
        '%d-%m-%Y',
    ),
    'DATE_INPUT_FORMATS': (
        '%d-%m-%Y',
    ),
    'TIME_INPUT_FORMATS': (
        '%H:%M',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    # 'PAGE_SIZE': 15,
    # 'DEFAULT_PARSER_CLASSES': (
    # 'rest_framework.parsers.JSONParser',
    # )
    'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.NamespaceVersioning'
}
ANONYMOUS_USER_ID = -1
# End DRF depenment

# Your stuff...
# ------------------------------------------------------------------------------

IS_ACTIVE = 1
IS_INACTIVE = 0
SUB_CATEGORY = 2
ROOT_CATEGORY = 1
DISTRICT = 2
CITY = 1
CORS_ORIGIN_ALLOW_ALL = True

HOUSEHOLDSIZE = (
    (1, "1名〜2名"),
    (2, "3名〜4名"),
    (3, "5名〜6名"),
    (4, "7名以上"),
)
ACREAGE = (
    (1, "20坪以下"),
    (2, "20坪台"),
    (3, "30坪台"),
    (4, "40坪台"),
    (5, "50坪台"),
    (6, "60坪台"),
    (7, "70坪台"),
    (8, "80坪台"),
    (9, "90坪以上"),
)
CONSTRUCTIONPOSITIONTYPE = (
    (1, "現住所と同じ"),
    (2, "未定"),
    (3, "予定地を入力"),
)
CONSTRUCTIONDURATION = (
    (1, "3ヵ月以内"),
    (2, "6ヵ月以内"),
    (3, "1年以内"),
    (4, "1～2年以内"),
    (5, "2～3年以内"),
    (6, "未定"),
)
BUDGET = (
    (1, "1500万未満"),
    (2, "1500万〜3000万"),
    (3, "3000万〜6000万"),
    (4, "6000万以上"),
)
HOUSEHOLDINCOME = (
    (1, "350万未満以下"),
    (2, "350万〜500万未満"),
    (3, "500万〜800万未満"),
    (4, "800万〜1000万未満"),
    (5, "1000万〜1500万未満"),
    (6, "1500万〜2000万未満"),
    (7, "2000万以上"),
)
CONSTRUCTION_TYPE = (
    (1, "新規"),
    (2, "建て替え"),
    (3, "リフォーム"),
    (4, "リノベーション"),
)
CURRENTSITUATION = (
    (1, "住宅・リフォーム・リノベの検討を始めた"),
    (2, "住宅・リフォーム・リノベ情報収集をしている（個別の会社とはまだ接触していない）"),
    (3, "工務店・ハウスメーカーと契約した"),
    (4, "工事に着手している"),
    (5, "すでに完成している"),
    (6, "その他"),
)
JWT_AUTH = {
    'JWT_VERIFY_EXPIRATION': False
}
IMPORT_EXPORT_USE_TRANSACTIONS = False


# lanway
# ------------------------------------------------------------------------------
LANWAY_BASE_URL = 'http://remediaau-external-14jfg1prd5i12-1061836401.ap-northeast-1.elb.amazonaws.com:18000/'
