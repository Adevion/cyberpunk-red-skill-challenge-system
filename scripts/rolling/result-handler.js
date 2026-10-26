export class ResultHandler {
  static evaluate( total, dv ) {
    return { success: total >= dv, margin: total - dv };
  }
}