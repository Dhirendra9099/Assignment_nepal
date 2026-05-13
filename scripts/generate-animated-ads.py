from __future__ import annotations

import argparse
import asyncio
import math
import random
import subprocess
import wave
from pathlib import Path

import edge_tts
import imageio_ffmpeg
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "campaign-assets" / "animated_ads"
WORK = ROOT / "campaign-assets" / "_video_work"
W, H = 1080, 1920
SR = 44100

VOICES = [
    "en-US-AriaNeural",
    "en-US-GuyNeural",
    "en-GB-SoniaNeural",
    "en-GB-RyanNeural",
    "en-IN-NeerjaNeural",
    "en-IN-PrabhatNeural",
]

TOPICS = [
    "assignment support",
    "dissertation guidance",
    "research paper support",
    "website project help",
    "thesis review",
    "academic editing",
    "presentation support",
    "referencing help",
    "business report guidance",
    "IT coursework support",
]

COLORS = [
    ((7, 26, 74), (220, 16, 32), (235, 245, 255)),
    ((3, 18, 52), (11, 79, 147), (255, 248, 235)),
    ((9, 32, 72), (218, 164, 58), (240, 248, 255)),
    ((18, 22, 57), (236, 77, 90), (232, 244, 255)),
]


def font(size: int, bold: bool = False):
    candidates = [
        Path(r"C:\Windows\Fonts\arialbd.ttf") if bold else Path(r"C:\Windows\Fonts\arial.ttf"),
        Path(r"C:\Windows\Fonts\segoeuib.ttf") if bold else Path(r"C:\Windows\Fonts\segoeui.ttf"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size=size)
    return ImageFont.load_default()


def wrap(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.ImageFont, max_w: int) -> list[str]:
    lines, current = [], []
    for word in text.split():
        candidate = " ".join([*current, word]).strip()
        box = draw.textbbox((0, 0), candidate, font=fnt)
        if box[2] - box[0] <= max_w or not current:
            current.append(word)
        else:
            lines.append(" ".join(current))
            current = [word]
    if current:
        lines.append(" ".join(current))
    return lines


def draw_shadow(draw: ImageDraw.ImageDraw, xy, text, fnt, fill):
    x, y = xy
    draw.text((x + 3, y + 4), text, font=fnt, fill=(0, 0, 0, 130))
    draw.text((x, y), text, font=fnt, fill=fill)


def make_background(index: int, path: Path):
    navy, red, light = COLORS[index % len(COLORS)]
    img = Image.new("RGB", (W, H), light)
    draw = ImageDraw.Draw(img)
    for y in range(H):
        a = y / H
        color = tuple(int(light[i] * (1 - a) + (220, 236, 250)[i] * a) for i in range(3))
        draw.line((0, y, W, y), fill=color)

    # Mountains.
    draw.polygon([(0, 760), (300, 360), (610, 760)], fill=(196, 222, 248))
    draw.polygon([(330, 800), (720, 260), (1110, 800)], fill=(150, 198, 239))
    draw.polygon([(720, 260), (650, 420), (745, 378), (805, 500)], fill=(255, 250, 243))

    # Stupa-like landmark.
    cx, cy = 630, 680
    draw.ellipse((cx - 220, cy + 110, cx + 220, cy + 190), fill=(245, 238, 226), outline=(210, 190, 160), width=4)
    draw.pieslice((cx - 190, cy - 50, cx + 190, cy + 250), 180, 360, fill=(255, 248, 235), outline=(210, 190, 160), width=4)
    draw.rectangle((cx - 70, cy - 170, cx + 70, cy - 55), fill=(218, 164, 58), outline=(145, 100, 22), width=4)
    draw.polygon([(cx - 95, cy - 170), (cx, cy - 260), (cx + 95, cy - 170)], fill=(184, 128, 28))

    # Brand top panel.
    draw.rounded_rectangle((56, 72, 1024, 352), radius=34, fill=(*navy, 255), outline=red, width=4)
    draw.text((96, 112), "ASSIGNMENT", font=font(68, True), fill=(255, 255, 255))
    draw.text((96, 190), "NEPAL", font=font(78, True), fill=red)
    draw.text((96, 286), "Quality assignments • On time • Every time", font=font(28, True), fill=(232, 240, 255))

    # Lower trust panel.
    draw.rounded_rectangle((70, 1450, 1010, 1765), radius=32, fill=(*navy, 245), outline=red, width=3)
    for i, line in enumerate(["100% Original Work", "Plagiarism Free", "On-Time Delivery", "Confidential & Reliable"]):
        draw.text((130, 1505 + i * 58), f"✓ {line}", font=font(34, True), fill=(255, 255, 255))

    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path)


def make_avatar(index: int, path: Path):
    rng = random.Random(index)
    img = Image.new("RGBA", (390, 520), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    skin = [(238, 190, 150), (218, 165, 122), (246, 205, 168), (185, 126, 90)][index % 4]
    shirt = [(220, 16, 32), (11, 79, 147), (218, 164, 58), (30, 120, 95)][index % 4]
    hair = [(31, 24, 24), (54, 38, 24), (20, 28, 42), (68, 44, 36)][index % 4]

    draw.ellipse((45, 20, 345, 320), fill=(5, 18, 48, 235))
    draw.ellipse((112, 74, 278, 240), fill=skin)
    draw.pieslice((105, 52, 285, 190), 185, 355, fill=hair)
    draw.ellipse((154, 150, 166, 162), fill=(10, 10, 10))
    draw.ellipse((224, 150, 236, 162), fill=(10, 10, 10))
    draw.arc((160, 170, 235, 215), 25, 155, fill=(110, 45, 48), width=5)
    draw.rounded_rectangle((78, 252, 312, 505), radius=70, fill=shirt)
    draw.rounded_rectangle((92, 318, 298, 438), radius=20, fill=(248, 250, 255))
    draw.rectangle((132, 350, 258, 366), fill=(18, 22, 57))
    draw.rectangle((132, 386, 238, 402), fill=(18, 22, 57))
    badge = "A+" if rng.random() > 0.4 else "OK"
    draw.rounded_rectangle((260, 78, 374, 136), radius=22, fill=(115, 219, 255))
    draw.text((292, 93), badge, font=font(28, True), fill=(5, 18, 48))
    img.save(path)


def make_text_panel(index: int, path: Path, title: str, body: str):
    navy, red, _ = COLORS[index % len(COLORS)]
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    y = 1120
    draw.rounded_rectangle((58, y, 1022, y + 260), radius=34, fill=(*navy, 235), outline=red, width=4)
    draw.rounded_rectangle((92, y + 34, 220, y + 44), radius=5, fill=red)
    title_font = font(52, True)
    body_font = font(31, False)
    ty = y + 72
    for line in wrap(draw, title, title_font, 860)[:2]:
        draw_shadow(draw, (98, ty), line, title_font, (255, 255, 255, 255))
        ty += 58
    ty += 8
    for line in wrap(draw, body, body_font, 840)[:2]:
        draw_shadow(draw, (100, ty), line, body_font, (232, 240, 255, 245))
        ty += 42
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path)


def write_wav(path: Path, audio: np.ndarray):
    audio = np.clip(audio, -1, 1)
    stereo = np.column_stack([audio, np.roll(audio, int(0.004 * SR)) * 0.92])
    pcm = (stereo * 32767).astype(np.int16)
    with wave.open(str(path), "wb") as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(SR)
        wf.writeframes(pcm.tobytes())


def make_music(index: int, duration: float, path: Path):
    rng = np.random.default_rng(1000 + index)
    t = np.arange(int(duration * SR), dtype=np.float32) / SR
    audio = np.zeros_like(t)
    bpm = 96 + (index % 6) * 6
    beat = 60 / bpm
    root = 110 * (2 ** ((index % 7) / 12))
    chords = [[0, 4, 7], [5, 9, 12], [7, 11, 14], [3, 7, 10]]
    for bar, start in enumerate(np.arange(0, duration, beat * 4)):
        mask = (t >= start) & (t < start + beat * 4)
        local = t[mask] - start
        for semitone in chords[bar % 4]:
            freq = root * (2 ** (semitone / 12))
            audio[mask] += 0.035 * np.sin(2 * np.pi * freq * local)
    for b, start in enumerate(np.arange(0, duration, beat)):
        pos = int(start * SR)
        length = min(int(0.15 * SR), len(audio) - pos)
        if length <= 0:
            continue
        local = np.arange(length, dtype=np.float32) / SR
        if b % 2 == 0:
            audio[pos : pos + length] += 0.24 * np.sin(2 * np.pi * (72 - 24 * local) * local) * np.exp(-local * 18)
        else:
            audio[pos : pos + length] += 0.045 * rng.normal(0, 1, length) * np.exp(-local * 26)
    audio = np.tanh(audio * 1.4) * 0.62
    write_wav(path, audio)


async def make_voice(index: int, script: str, path: Path):
    tts = edge_tts.Communicate(script, voice=VOICES[index % len(VOICES)], rate="+6%", pitch="+2Hz")
    await tts.save(str(path))


async def render_one(index: int, force: bool):
    topic = TOPICS[(index - 1) % len(TOPICS)]
    title = f"Need {topic}?"
    body = "Get genuine, plagiarism-free, high-quality academic support from Assignment Nepal."
    script = f"{title} {body} We help with planning, editing, referencing, presentations, and website projects. Contact us today."

    base = WORK / f"ad_{index:03d}"
    base.mkdir(parents=True, exist_ok=True)
    bg = base / "background.png"
    avatar = base / "avatar.png"
    panel = base / "panel.png"
    voice = base / "voice.mp3"
    music = base / "music.wav"
    out = OUT / f"assignment-nepal-animated-ad-{index:03d}.mp4"
    if out.exists() and not force:
        return out

    make_background(index, bg)
    make_avatar(index, avatar)
    make_text_panel(index, panel, title, body)
    await make_voice(index, script, voice)
    make_music(index, 20, music)

    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    OUT.mkdir(parents=True, exist_ok=True)
    filter_complex = (
        "[0:v]scale=1080:1920,zoompan=z='min(zoom+0.0009,1.06)':d=600:s=1080x1920:fps=30[bg];"
        "[1:v]format=rgba,scale=330:-1[av];"
        "[2:v]format=rgba[panel];"
        "[bg][av]overlay=x='700+22*sin(t*2.4)':y='620+18*sin(t*2.0)':enable='between(t,1,19)'[v1];"
        "[v1][panel]overlay=0:0:enable='between(t,2,18)',format=yuv420p[v];"
        "[3:a]adelay=350|350,volume=1.12[voice];"
        "[4:a]atrim=0:20,afade=t=in:st=0:d=0.8,afade=t=out:st=18.8:d=1.0,volume=0.17[music];"
        "[voice][music]amix=inputs=2:duration=longest,loudnorm=I=-16:LRA=9:TP=-1.5[a]"
    )
    cmd = [
        ffmpeg,
        "-y",
        "-hide_banner",
        "-loglevel",
        "error",
        "-loop",
        "1",
        "-t",
        "20",
        "-i",
        str(bg),
        "-loop",
        "1",
        "-t",
        "20",
        "-i",
        str(avatar),
        "-loop",
        "1",
        "-t",
        "20",
        "-i",
        str(panel),
        "-i",
        str(voice),
        "-i",
        str(music),
        "-t",
        "20",
        "-filter_complex",
        filter_complex,
        "-map",
        "[v]",
        "-map",
        "[a]",
        "-r",
        "30",
        "-c:v",
        "libx264",
        "-preset",
        "veryfast",
        "-crf",
        "23",
        "-c:a",
        "aac",
        "-b:a",
        "192k",
        "-movflags",
        "+faststart",
        str(out),
    ]
    subprocess.run(cmd, check=True)
    return out


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--count", type=int, default=60)
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()
    for i in range(1, args.count + 1):
        print(f"Rendering animated ad {i}/{args.count}", flush=True)
        await render_one(i, args.force)


if __name__ == "__main__":
    asyncio.run(main())
