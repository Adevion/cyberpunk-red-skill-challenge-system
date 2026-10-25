export class VisibilityHandler {

  static async publicResult(content) {
    await ChatMessage.create({
      content
    });
  }

  static async secretResult(
    content,
    playerId
  ) {
    await ChatMessage.create({
      content,
      whisper: [
        game.user.id,
        playerId
      ]
    });
  }
}