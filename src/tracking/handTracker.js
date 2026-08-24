export class HandTracker {
  constructor(video, onPoint, onStatus) {
    this.video = video;
    this.onPoint = onPoint;
    this.onStatus = onStatus;
    this.hands = null;
    this.stream = null;
    this.frameRequest = 0;
    this.processing = false;
    this.active = false;
    this.lastPointAt = 0;
  }

  async start() {
    this.stop();
    if (!window.Hands || !navigator.mediaDevices?.getUserMedia) throw new Error("MediaPipe atau kamera belum tersedia");
    this.hands = new window.Hands({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}` });
    this.hands.setOptions({ maxNumHands: 1, modelComplexity: 0, minDetectionConfidence: .62, minTrackingConfidence: .58 });
    this.hands.onResults((results) => this.handleResults(results));
    this.stream = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" }, audio: false });
    this.video.srcObject = this.stream;
    await this.video.play();
    this.active = true;
    this.scheduleFrame();
    this.onStatus("Kamera aktif");
  }

  stop() {
    this.active = false;
    cancelAnimationFrame(this.frameRequest);
    this.processing = false;
    this.hands?.close?.();
    this.stream?.getTracks().forEach((track) => track.stop());
    this.video.pause();
    this.video.srcObject = null;
    this.stream = null;
    this.hands = null;
  }

  scheduleFrame() {
    if (!this.active) return;
    this.frameRequest = requestAnimationFrame(async () => {
      if (this.active && !this.processing && this.video.readyState >= 2) {
        this.processing = true;
        try { await this.hands.send({ image: this.video }); } catch { this.onStatus("Tracking sedang dipulihkan"); }
        this.processing = false;
      }
      this.scheduleFrame();
    });
  }

  handleResults(results) {
    const landmarks = results.multiHandLandmarks?.[0];
    if (!landmarks) { this.onStatus("Tangan tidak terdeteksi"); return; }
    const palm = [landmarks[0], landmarks[5], landmarks[9], landmarks[13], landmarks[17]];
    const point = palm.reduce((sum, item) => ({ x: sum.x + item.x / palm.length, y: sum.y + item.y / palm.length }), { x: 0, y: 0 });
    this.lastPointAt = performance.now();
    this.onPoint(point);
    this.onStatus("Tangan terdeteksi");
  }
}
