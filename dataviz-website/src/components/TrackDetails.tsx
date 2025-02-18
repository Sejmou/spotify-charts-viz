// import Image from "next/image"; // TODO: figure out how to use this instead of <img> tags for better performance
import { Avatar, Chip } from "@mui/material";
import { color as d3color } from "d3";
import moment from "moment";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames";

type Props = {
  trackId: string;
  trackTitle: string;
  artists: string[];
  albumTitle: string;
  releaseDate: Date;
  releaseType: string;
  genres: string[];
  label: string;
  albumCoverUrl: string | null;
  color?: string;
  previewUrl: string | null;
  className?: string;
};

const TrackInfo = (props: Props) => {
  const {
    trackTitle,
    artists,
    albumTitle,
    releaseDate,
    releaseType,
    genres,
    albumCoverUrl,
    label,
    color,
    previewUrl,
    className,
  } = props;

  const audio = useMemo(() => {
    if (previewUrl) {
      const audio = new Audio(previewUrl);
      return audio;
    }
  }, [previewUrl]);

  useEffect(() => {
    // audio should not be playing when component is unmounted
    if (audio) {
      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [audio]);

  const playPauseAudio = useCallback(() => {
    if (audio) {
      if (audio.paused) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        audio.play().then(() => setIsPlaying(true));
      } else {
        audio.pause();
        setIsPlaying(false);
        audio.currentTime = 0;
      }
    }
  }, [audio]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className={classNames(
        "relative flex  flex-col bg-[#1d1d1d] p-4 hover:bg-[#222]",
        className
      )}
    >
      <div
        className="flex"
        style={{
          backgroundColor: color
            ? d3color(color)!.darker(4).toString()
            : undefined,
        }}
      >
        <div className="relative h-[64px] w-[64px]" onClick={playPauseAudio}>
          <>
            {albumCoverUrl ? (
              <img
                src={albumCoverUrl}
                alt="Album Cover"
                width={64}
                height={64}
                className="max-w-none"
              />
            ) : (
              <div className="h-[64px] w-[64px] fill-slate-400"></div>
            )}
            {audio && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100">
                <Avatar sx={{ bgcolor: "#1ED760" }}>
                  {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </Avatar>
              </div>
            )}
          </>
        </div>
        <div className="overflow-hidden px-2 pt-1">
          <h2 className="overflow-hidden text-ellipsis whitespace-nowrap text-xl">
            {trackTitle}
          </h2>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-base text-gray-300">
            {artists.join(", ")}
          </p>
        </div>
      </div>
      <p className="text-md py-2 text-gray-200">
        <span className="capitalize">{releaseType}</span>: {albumTitle}
      </p>
      <div className="flex flex-wrap gap-1 overflow-auto pb-2">
        {genres.map((g, i) => (
          <Chip className="capitalize" key={i} label={g} />
        ))}
      </div>
      <p className="text-sm text-gray-400">
        {moment(releaseDate).format("ll")} · {label}
      </p>
    </div>
  );
};

export default TrackInfo;
