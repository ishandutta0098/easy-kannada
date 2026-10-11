"""Offline asset generation only; never called by the website or deployment workflow."""
import asyncio, json, pathlib, hashlib
import edge_tts
ROOT = pathlib.Path(__file__).resolve().parents[1]
VOICE = 'kn-IN-SapnaNeural'
async def main():
    phrases=json.loads((ROOT/'data/phrases.json').read_text())
    digits=json.loads((ROOT/'data/digits.json').read_text())
    entries=[(p['id'],p['kannada']) for p in phrases]+[(f"digit-{d['digit']}",d['kannada']) for d in digits]
    sem=asyncio.Semaphore(3)
    async def make(id,text,slow):
        path=ROOT/'assets/audio'/f"{id}{'-slow' if slow else ''}.mp3"
        rate='-25%' if slow else '+0%'
        async with sem:
            if path.exists() and path.stat().st_size>1000: return
            for attempt in range(4):
                try:
                    await edge_tts.Communicate(text, VOICE, rate=rate).save(str(path))
                    if path.stat().st_size<1000: raise ValueError('Empty audio')
                    print(path.name,flush=True)
                    return
                except Exception:
                    if attempt==3: raise
                    await asyncio.sleep(2**attempt)
    await asyncio.gather(*(make(id,text,slow) for id,text in entries for slow in (False,True)))
    manifest=[{'id':id,'text':text,'voice':VOICE,'textSha256':hashlib.sha256(text.encode()).hexdigest(),'files':[f"assets/audio/{id}.mp3",f"assets/audio/{id}-slow.mp3"]} for id,text in entries]
    (ROOT/'data/audio-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
    print('Generated and indexed',len(entries)*2,'files',flush=True)
asyncio.run(main())
