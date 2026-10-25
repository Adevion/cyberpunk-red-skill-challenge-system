export class ResultHandler {
  static evaluate(total, dv) {
    return {
      success: total >= dv,
      total,
      dv
    };
  }
}