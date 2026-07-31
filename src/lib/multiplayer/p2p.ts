/** optional multiplayer stub for production landing */
export class P2PRoom {
  constructor(..._args: unknown[]) {}
  async join() {
    return;
  }
  leave() {}
  onPeersChanged?: (peers: string[]) => void;
}
