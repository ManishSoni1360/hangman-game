from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Game
from .serializers import GameSerializer, GameStateSerializer
import random


@api_view(["POST"])
def game_history(request):
    try:
        email = request.data.get("email")
        games = Game.objects.filter(email=email)
    except Game.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = GameStateSerializer(games, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def new_game(request):
    word = random.choice(Game.WORDS)
    email = request.data.get("email")
    name = request.data.get("gameName")
    game = Game.objects.create(word=word, email=email, name=name)
    return Response({"id": game.id}, status=status.HTTP_201_CREATED)


@api_view(["POST"])
def game_state(request, game_id):
    try:
        email = request.data.get("email")
        game = Game.objects.get(id=game_id, email=email)
    except Game.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = GameStateSerializer(game)
    return Response(serializer.data)


@api_view(["POST"])
def guess(request, game_id):
    try:
        email = request.data.get("email")
        game = Game.objects.get(id=game_id, email=email)
    except Game.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    guess = request.data.get("guess").lower()
    if guess in game.guessed_letters.lower():
        return Response(
            {"error": "Letter already guessed"}, status=status.HTTP_400_BAD_REQUEST
        )

    game.guessed_letters += guess
    if guess not in game.word.lower():
        game.incorrect_guesses += 1

    if set(game.word.lower()) <= set(game.guessed_letters.lower()):
        game.state = "Won"
    elif game.incorrect_guesses > game.max_incorrect_guesses():
        game.state = "Lost"

    game.save()
    serializer = GameStateSerializer(game)
    return Response(
        {"guess_correct": guess in game.word.lower(), "game_state": serializer.data}
    )
