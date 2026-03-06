export interface Subtitle {
  start: number;
  end: number;
  text: string;
}

export function parseVTT(raw: string): Subtitle[] {
  return raw
    .split("\n\n")
    .filter((block) => block.includes("-->"))
    .map((block) => {
      const lines = block.trim().split("\n");
      const [timeLine, ...textLines] = lines.filter((l) => !l.match(/^\d+$/));
      const [startStr, endStr] = timeLine.split(" --> ");
      return {
        start: parseTime(startStr),
        end: parseTime(endStr),
        text: textLines.join(" "),
      };
    });
}

function parseTime(str: string): number {
  const [h, m, s] = str.split(":");
  return Number(h) * 3600 + Number(m) * 60 + parseFloat(s);
}
