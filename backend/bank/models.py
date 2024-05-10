from django.db import models
from account.models import UserAccount
from django.core.validators import RegexValidator
from django.core.validators import MinValueValidator, MaxValueValidator
import ccard
import datetime as dt
import random

# User card/account
class Card(models.Model):
    # Foreign key to user
    UserAccount = models.ForeignKey(UserAccount, related_name='cards',  on_delete=models.CASCADE, null=True)
    # Card information below
    # Card name
    cardName = models.TextField(max_length=50, default="Some new card")
    # Card number just to make it looks cool
    number = models.TextField(validators=[RegexValidator(regex='^.{16}$', message='Length has to be 16', code='nomatch')], unique=True)
    # CVV code
    cvv = models.TextField(validators=[RegexValidator(regex='^.{3}$', message='Length has to be 13', code='nomatch')], default="000")
    # Balance: up to 19 digits + 4 decimal places
    bal = models.DecimalField(max_digits=19, decimal_places=4, default=50)
    # Creation/Expiration date
    Ccreation = models.DateTimeField(default=dt.datetime.today(), blank=True)
    Cexpiration = models.DateTimeField(default=dt.datetime.today()+dt.timedelta(days=90), blank=True)
    # Decorations
    grad1 = models.TextField(validators=[RegexValidator(regex='^.{7}$', message='Length has to be 7', code='nomatch')], default="#FFFFFF")
    grad2 = models.TextField(validators=[RegexValidator(regex='^.{7}$', message='Length has to be 7', code='nomatch')], default="#FFFFFF")
    gradDeg = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(360)], default=45)
    
    # Card functions
    def createNewCard(cardName, user):
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
        # Randomize gradient
        gradRandom= lambda: random.randint(0,255)
        grad1 = '#%02X%02X%02X' % (gradRandom(),gradRandom(),gradRandom())
        grad2 = '#%02X%02X%02X' % (gradRandom(),gradRandom(),gradRandom())
        gradDeg = random.randint(1, 360)
        
        card = Card(UserAccount=user, cardName=cardName, number=str(number), cvv=str(cvv), grad1=grad1, grad2=grad2, gradDeg=gradDeg)
        card.save()
        # Return card object to link user (needed?)
        return card
    
    # Django admin test
    def __str__(self):
        return str(self.cardName)
    
class Transaction(models.Model):
    # Foreign key to the card that facilitated the transaction
    Card = models.ForeignKey(Card, related_name='transactions', on_delete=models.CASCADE, null=True)
    # Transaction information
    transactionName = models.TextField(max_length=50, default="Some new transaction")
    Tcreation = models.DateTimeField(default=dt.datetime.today(), blank=True)
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
        transaction = Transaction(Card=card, transactionName=name, amount=amount)
        transaction.save()
        # Return reference to transaction (transaction succeed sign, can be done differently)
        return "success" 
    
    # Django admin test
    def __str__(self):
        return str(self.transactionName)
    