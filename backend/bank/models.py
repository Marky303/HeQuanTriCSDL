from django.db import models
from account.models import UserAccount

# Verify length
from django.core.validators import RegexValidator

# Create your models here.
import ccard
import datetime as dt
import random

# User card/account
class Card(models.Model):
    # Foreign key to user
    UserAccount = models.ForeignKey(UserAccount, related_name='cards',  on_delete=models.CASCADE, null=True)
    
    # Card information below
    # Card name
    name = models.TextField(max_length=50, default="Some new card")
    
    # Card number just to make it looks cool
    number = models.TextField(validators=[RegexValidator(regex='^.{16}$', message='Length has to be 16', code='nomatch')], unique=True)
    
    # CVV code
    cvv = models.TextField(validators=[RegexValidator(regex='^.{3}$', message='Length has to be 13', code='nomatch')], default="000")
    
    # Balance: up to 19 digits + 4 decimal places
    bal = models.DecimalField(max_digits=19, decimal_places=4, default=50)
    
    # Creation/Expiration date
    creation = models.DateTimeField(default=dt.datetime.today(), blank=True)
    expiration = models.DateTimeField(default=dt.datetime.today()+dt.timedelta(days=90), blank=True)
    
    # Card functions
    def createNewCard(name, user):
        # Generate a unique cardNumber
        number = ccard.visa()
        isUnique = False
        
        while (not isUnique):
            isUniqueThisIteration = True
            for c in Card.objects.all():
                if number==int(c.number):
                    isUniqueThisIteration = False
                    break
            if not isUniqueThisIteration:
                number = ccard.visa()
            else:
                isUnique = True
        
        # Generate a CVV
        cvv = random.randint(100, 999)
        
        card = Card(UserAccount=user, name=name, number=str(number), cvv=str(cvv))
        card.save()
        
        # Return card object to link user (needed?)
        return card
    
    # Django admin test
    def __str__(self):
        return str(self.number)
    
class Transaction(models.Model):
    # Foreign key to user who made the transaction
    UserAccount = models.ForeignKey(UserAccount, related_name='transactions', on_delete=models.CASCADE, null=True)
    
    # Foreign key to the card that facilitated the transaction
    Card = models.ForeignKey(Card, related_name='transactions', on_delete=models.CASCADE, null=True)
    
    # Transaction information
    name = models.TextField(max_length=50, default="Some new transaction")
    creation = models.DateTimeField(default=dt.datetime.today(), blank=True)
    amount = models.DecimalField(max_digits=19, decimal_places=4, default=0)
    
    # Make a transaction
    def createNewTransaction(name,amount,user,card):
        # Check if card belongs to user (str is causing the funny)
        if not card in user.cards.all():
            return "nocard"

        # Check if the transaction is eligible (card.bal must be positive)
        if ((card.bal+amount) < 0):
            return "insufficientbal"
        
        # Take out the amount (either plus/minus)
        card.bal += amount
        card.save()
        
        # Actually create transaction instance of the model
        transaction = Transaction(UserAccount=user, Card=card, name=name, amount=amount)
        transaction.save()
        
        # Return reference to transaction (transaction succeed sign, can be done differently)
        return "success" 
    
    # Django admin test
    def __str__(self):
        return str(self.name)
    