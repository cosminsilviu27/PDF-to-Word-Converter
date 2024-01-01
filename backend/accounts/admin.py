from django.contrib import admin
from pdf_to_word.models import ConversionRecord, UsageLog
from subscription.models import Subscription, Subscription_Types

class ConversionRecordAdmin(admin.ModelAdmin):
    list_display = ['user', 'pdf_file_name', 'word_file_name', 'timestamp', 'status']
    search_fields = ['user__username', 'word_file_name', 'status']

class UsageLogAdmin(admin.ModelAdmin):
    list_display = ['user', 'conversion', 'timestamp', 'usage_type']
    search_fields = ['user__username', 'conversion__pdf_file_name', 'usage_type']

class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ['user', 'subscription_type', 'max_conversions', 'price_per_month', 'price_per_year', 'start_date', 'end_date']
    search_fields = ['user__username', 'subscription_type']

class Subscription_TypesAdmin(admin.ModelAdmin):
    list_display = ['subscription_type', 'price', 'features', 'available', 'cancel']
    search_fields = ['subscription_type']

admin.site.register(ConversionRecord, ConversionRecordAdmin)
admin.site.register(UsageLog, UsageLogAdmin)
admin.site.register(Subscription, SubscriptionAdmin)
admin.site.register(Subscription_Types, Subscription_TypesAdmin)

