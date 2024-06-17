from django.db import models


class Game(models.Model):
    WORDS = ["Hangman", "Python", "Audacix", "Bottle", "Pen"]
    email = models.EmailField()
    name = models.CharField(max_length=100, default="")
    word = models.CharField(max_length=100)
    state = models.CharField(max_length=10, default="InProgress")
    guessed_letters = models.CharField(max_length=100, default="")
    incorrect_guesses = models.IntegerField(default=0)

    def max_incorrect_guesses(self):
        return int(len(self.word) / 2)

    def current_word_state(self):
        return "".join(
            [
                letter if letter.lower() in self.guessed_letters.lower() else "_"
                for letter in self.word
            ]
        )
