from rest_framework import serializers
from .models import Game


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ["id", "name", "word", "state", "guessed_letters", "incorrect_guesses"]


class GameStateSerializer(serializers.ModelSerializer):
    current_word_state = serializers.SerializerMethodField()
    remaining_incorrect_guesses = serializers.SerializerMethodField()

    class Meta:
        model = Game
        fields = [
            "id",
            "name",
            "state",
            "current_word_state",
            "incorrect_guesses",
            "remaining_incorrect_guesses",
        ]

    def get_current_word_state(self, obj):
        return obj.current_word_state()

    def get_remaining_incorrect_guesses(self, obj):
        return obj.max_incorrect_guesses() - obj.incorrect_guesses
