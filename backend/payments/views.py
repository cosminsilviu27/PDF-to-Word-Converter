
from django.http import JsonResponse
from django.conf import settings
from rest_framework.views import APIView
from django.shortcuts import redirect

import stripe

import logging

logger = logging.getLogger(__name__)

stripe.api_key = settings.STRIPE_SECRET_KEY


class StripeCheckoutView(APIView):
    def post(self, request):
        try:
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        'price': 'price_1OTjjJCdejgX7MZfHu1gdkuc',
                        'quantity': 1,
                    },
                ],
                payment_method_types=['card', ],
                mode='subscription',
                success_url=settings.SITE_URL +
                '/?success=true&session_id={CHECKOUT_SESSION_ID}',
                cancel_url=settings.SITE_URL + '/?canceled=true',
            )
            return JsonResponse({"url": checkout_session.url})
            # return redirect(checkout_session.url)
        except Exception as e:
            logger.error("Error creating Stripe checkout session", exc_info=True)
            return JsonResponse({'error': str(e)}, status=500)
