from django.urls import path
from .views import new_game, game_state, guess, game_history

urlpatterns = [
    path("game/gameHistory", game_history, name="game_history"),
    path("game/new", new_game, name="new_game"),
    path("game/<int:game_id>", game_state, name="game_state"),
    path("game/<int:game_id>/guess", guess, name="guess"),
]
