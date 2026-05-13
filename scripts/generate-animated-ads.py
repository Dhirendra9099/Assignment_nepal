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
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "campaign-assets" / "animated_ads"
WORK = ROOT / "campaign-assets" / "_video_work"
STOCK = ROOT / "campaign-assets" / "stock"
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


def stock_files(folder: str, extensions: tuple[str, ...]) -> list[Path]:
    directory = STOCK / folder
    if not directory.exists():
        return []
    return sorted([p for p in directory.iterdir() if p.suffix.lower() in extensions])


STOCK_VIDEOS = stock_files("videos", (".mp4", ".mov", ".m4v"))
STOCK_PORTRAITS = stock_files("portraits", (".jpg", ".jpeg", ".png", ".webp"))
STOCK_IMAGES = stock_files("images", (".jpg", ".jpeg", ".png", ".webp"))


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


def cover_crop(img: Image.Image, size: tuple[int, int]) -> Image.Image:
    img = ImageOps.exif_transpose(img).convert("RGB")
    sw, sh = size
    scale = max(sw / img.width, sh / img.height)
    resized = img.resize((math.ceil(img.width * scale), math.ceil(img.height * scale)), Image.Resampling.LANCZOS)
    left = max((resized.width - sw) // 2, 0)
    top = max((resized.height - sh) // 2, 0)
    return resized.crop((left, top, left + sw, top + sh))


def rounded_alpha(size: tuple[int, int], radius: int) -> Image.Image:
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, size[0], size[1]), radius=radius, fill=255)
    return mask


def draw_shadow(draw: ImageDraw.ImageDraw, xy, text, fnt, fill):
    x, y = xy
    draw.text((x + 3, y + 4), text, font=fnt, fill=(0, 0, 0, 130))
    draw.text((x, y), text, font=fnt, fill=fill)


def make_background(index: int, path: Path):
    photo_path = STOCK_IMAGES[(index - 1) % len(STOCK_IMAGES)] if STOCK_IMAGES else None
    if photo_path:
        navy, red, _ = COLORS[index % len(COLORS)]
        img = cover_crop(Image.open(photo_path), (W, H)).convert("RGB")
        overlay = Image.new("RGBA", (W, H), (*navy, 92))
        img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
        draw = ImageDraw.Draw(img)
        draw.rounded_rectangle((56, 72, 1024, 352), radius=34, fill=(*navy, 238), outline=red, width=4)
        draw.text((96, 112), "ASSIGNMENT", font=font(68, True), fill=(255, 255, 255))
        draw.text((96, 190), "NEPAL", font=font(78, True), fill=red)
        draw.text((96, 286), "Quality assignments - on time - every time", font=font(28, True), fill=(232, 240, 255))
        img.save(path)
        return

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
    portrait = STOCK_PORTRAITS[(index - 1) % len(STOCK_PORTRAITS)] if STOCK_PORTRAITS else None
    if portrait:
        navy, red, _ = COLORS[index % len(COLORS)]
        img = Image.new("RGBA", (430, 560), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        draw.rounded_rectangle((18, 18, 412, 542), radius=48, fill=(*navy, 238), outline=red, width=5)
        photo = cover_crop(Image.open(portrait), (342, 382)).convert("RGBA")
        photo.putalpha(rounded_alpha((342, 382), 42))
        img.alpha_composite(photo, (44, 52))
        draw.rounded_rectangle((52, 402, 378, 514), radius=28, fill=(255, 255, 255, 238))
        draw.text((82, 426), "Academic", font=font(32, True), fill=navy)
        draw.text((82, 466), "Support", font=font(42, True), fill=red)
        draw.rounded_rectangle((282, 34, 398, 94), radius=24, fill=(126, 231, 255, 245))
        draw.text((310, 49), "A+", font=font(30, True), fill=navy)
        img.save(path)
        return

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
    layouts = [
        (58, 1120, 1022, 1380),
        (70, 1040, 1010, 1315),
        (92, 1180, 988, 1448),
        (58, 960, 820, 1235),
        (250, 1115, 1022, 1395),
    ]
    x1, y, x2, y2 = layouts[index % len(layouts)]
    draw.rounded_rectangle((x1, y, x2, y2), radius=34, fill=(*navy, 235), outline=red, width=4)
    draw.rounded_rectangle((x1 + 34, y + 34, x1 + 162, y + 44), radius=5, fill=red)
    title_font = font(52, True)
    body_font = font(31, False)
    ty = y + 72
    max_w = x2 - x1 - 120
    for line in wrap(draw, title, title_font, max_w)[:2]:
        draw_shadow(draw, (x1 + 42, ty), line, title_font, (255, 255, 255, 255))
        ty += 58
    ty += 8
    for line in wrap(draw, body, body_font, max_w - 20)[:2]:
        draw_shadow(draw, (x1 + 44, ty), line, body_font, (232, 240, 255, 245))
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
    stock_video = STOCK_VIDEOS[(index - 1) % len(STOCK_VIDEOS)] if STOCK_VIDEOS else None
    contrast = 1.04 + (index % 5) * 0.035
    saturation = 1.08 + (index % 6) * 0.045
    avatar_positions = [
        ("690+18*sin(t*2.4)", "600+16*sin(t*2.0)"),
        ("74+16*sin(t*2.0)", "620+14*sin(t*2.6)"),
        ("650+24*sin(t*1.8)", "430+16*sin(t*2.8)"),
        ("112+18*sin(t*2.2)", "430+14*sin(t*2.0)"),
        ("575+16*sin(t*2.5)", "760+15*sin(t*1.9)"),
    ]
    avatar_x, avatar_y = avatar_positions[index % len(avatar_positions)]
    if stock_video:
        bg_filter = (
            f"[0:v]scale=1080:1920:force_original_aspect_ratio=increase,"
            f"crop=1080:1920,fps=30,eq=contrast={contrast:.3f}:saturation={saturation:.3f}:brightness=-0.035,"
            "format=rgba[bg];"
        )
        background_input = [
            "-stream_loop",
            "-1",
            "-ss",
            str((index % 6) * 1.3),
            "-t",
            "20",
            "-i",
            str(stock_video),
        ]
    else:
        bg_filter = "[0:v]scale=1080:1920,zoompan=z='min(zoom+0.0009,1.06)':d=600:s=1080x1920:fps=30[bg];"
        background_input = ["-loop", "1", "-t", "20", "-i", str(bg)]

    filter_complex = (
        bg_filter +
        "[1:v]format=rgba,scale=350:-1[av];"
        "[2:v]format=rgba[panel];"
        f"[bg][av]overlay=x='{avatar_x}':y='{avatar_y}':enable='between(t,1,19)'[v1];"
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
        *background_input,
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
