class TimeRange {
  constructor(public readonly start: number, public readonly end: number) {}

  intersects(other: TimeRange): boolean {
    return Math.max(this.start, other.start) < Math.min(this.end, other.end);
  }
}

class Timeline {
  public readonly ranges: TimeRange[] = [];

  add(range: TimeRange) {
    this.ranges.push(range);
    return this;
  }

  overlaps(range: TimeRange): boolean {
    return this.ranges.some((r) => r.intersects(range));
  }
}

export default class ParallelTimeline {
  public readonly tracks: Timeline[] = [];

  allocate(start: number, end: number): number {
    if (!(start > 0 && end > start)) {
      return 0;
    }

    const range = new TimeRange(start, end);
    const freeTrackIndex = this.tracks.findIndex((track) => {
      return !track.overlaps(range);
    });

    if (freeTrackIndex === -1) {
      return this.tracks.push(new Timeline().add(range)) - 1;
    } else {
      this.tracks[freeTrackIndex].add(range);
      return freeTrackIndex;
    }
  }
}
