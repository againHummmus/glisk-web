import { ChevronLeft, ChevronRight, Clapperboard, LayoutGrid, Play, Video } from "lucide-react";
import type { Dictionary } from "@/i18n/types";
import { MockupVideo } from "./MockupVideo";

interface MockDay {
  day: number;
  /** Clip name in /public/mockup (`<name>.mp4` plus a `<name>.webp` poster). */
  video?: string;
  duration?: string;
  count?: number;
}

const TODAY = 17;

const DAYS: MockDay[] = Array.from({ length: 21 }, (_, index) => ({ day: index + 1 }));
const FILLED_DAYS: Record<number, Omit<MockDay, "day">> = {
  2: { video: "1-landscape", duration: "0:24" },
  3: { video: "2-waves", duration: "0:30" },
  4: { video: "3-duck", duration: "0:52", count: 2 },
  7: { video: "4-rave", duration: "0:18" },
  8: { video: "5-fireworks", duration: "0:30" },
  9: { video: "6-bug", duration: "0:27" },
  10: { video: "7-train", duration: "1:12", count: 3 },
};

function DayTile({ day, video, duration, count }: MockDay) {
  const isToday = day === TODAY;
  const isFuture = day > TODAY;
  return (
    <div className={`relative aspect-[0.88] p-[3px] ${video ? "hover:z-10" : ""} ${isFuture ? "opacity-35" : ""}`}>
      <div
        className={`relative flex h-full flex-col overflow-hidden rounded-xl border bg-neutral-950 ${
          video ? "transition-transform duration-300 ease-out hover:scale-110 motion-reduce:transition-none" : ""
        } ${
          isToday ? "border-white" : "border-white/20"
        }`}
      >
        {video && (
          <>
            <MockupVideo name={video} />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
          </>
        )}
        <div className="flex-1" />
        <div className="relative flex items-end justify-between px-1.5 pb-1">
          <span className={`text-[9px] font-medium ${video ? "text-white" : "text-neutral-500"}`}>{day}</span>
          {duration && <span className="text-[7px] tabular-nums text-white/90">{duration}</span>}
        </div>
        {count && (
          <span className="absolute left-1 top-1 rounded-full bg-black/60 px-1 text-[7px] font-semibold">
            {count}
          </span>
        )}
      </div>
    </div>
  );
}

interface PhoneMockupProps {
  labels: Dictionary["mockup"];
}

export function PhoneMockup({ labels }: PhoneMockupProps) {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[300px]">
      <div className="absolute -inset-5 rounded-full bg-brand/30 blur-3xl" />
      <div className="relative rounded-[2.75rem] border border-white/15 bg-neutral-900 p-2.5 shadow-2xl shadow-black">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[2.25rem] bg-black">
          <div className="px-3 pt-8">
            <div className="flex items-center">
              <div className="flex flex-1 items-center gap-0.5">
                <ChevronLeft size={14} className="text-neutral-400" />
                <span className="text-[15px] font-semibold tracking-tight">{labels.month}</span>
                <ChevronRight size={14} className="text-neutral-400" />
              </div>
              <div className="flex gap-1.5">
                <span className="flex size-7 items-center justify-center rounded-full border border-white/15 bg-neutral-950">
                  <Play size={10} fill="white" className="text-white" />
                </span>
                <span className="flex size-7 items-center justify-center rounded-full border border-white/15 bg-neutral-950">
                  <LayoutGrid size={12} />
                </span>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="h-px flex-1 bg-white/15" />
              <span className="text-[8px] text-neutral-500">{labels.moments}</span>
              <span className="h-px flex-1 bg-white/15" />
            </div>
          </div>

          <div className="mt-2 grid grid-cols-3 px-2">
            {DAYS.map((day) => (
              <DayTile key={day.day} {...day} {...FILLED_DAYS[day.day]} />
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-3">
            <span className="flex h-9 items-center gap-1.5 rounded-xl border border-white/10 bg-neutral-800/95 px-3 text-[11px] font-medium text-neutral-100">
              <Clapperboard size={12} />
              {labels.createFilm}
            </span>
            <span className="flex size-11 items-center justify-center rounded-full bg-white">
              <Video size={16} className="text-black" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
