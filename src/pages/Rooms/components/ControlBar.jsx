import React from 'react';
import { Camera, CameraOff, Mic, MicOff, MonitorUp, MessageSquare, LogOut, Hand, Focus } from 'lucide-react';

export default function ControlBar({
  micOn,
  camOn,
  onToggleMic,
  onToggleCam,
  onShare,
  onChat,
  onLeave,
  onRaise,
  raising,
  onFocus,
  focus
}) {
  const btn = 'inline-flex items-center justify-center w-11 h-11 rounded-full shadow-md transition-all active:scale-95';
  return (
    <div className="px-4 py-3 flex items-center justify-center gap-3 bg-white/10 backdrop-blur border-t border-white/20">
      <button onClick={onToggleMic} className={`${btn} ${micOn ? 'bg-white text-[#0ABAB5]' : 'bg-red-500 text-white'}`} title="Toggle mic">
        {micOn ? <Mic /> : <MicOff />}
      </button>
      <button onClick={onToggleCam} className={`${btn} ${camOn ? 'bg-white text-[#0ABAB5]' : 'bg-red-500 text-white'}`} title="Toggle camera">
        {camOn ? <Camera /> : <CameraOff />}
      </button>
      <button onClick={onShare} className={`${btn} bg-white text-[#0ABAB5] hover:bg-[#56DFCF] hover:text-white`} title="Share screen">
        <MonitorUp />
      </button>
      <button onClick={onChat} className={`${btn} bg-white text-[#0ABAB5] hover:bg-[#56DFCF] hover:text-white`} title="Open chat">
        <MessageSquare />
      </button>
      <button onClick={onRaise} className={`${btn} ${raising ? 'bg-yellow-400 text-black' : 'bg-white text-[#0ABAB5] hover:bg-[#56DFCF] hover:text-white'}`} title="Raise hand">
        <Hand />
      </button>
      <button onClick={onFocus} className={`${btn} ${focus ? 'bg-[#0ABAB5] text-white' : 'bg-white text-[#0ABAB5] hover:bg-[#56DFCF] hover:text-white'}`} title="Focus mode">
        <Focus />
      </button>
      <button onClick={onLeave} className={`${btn} bg-red-600 text-white ml-2`} title="Leave">
        <LogOut />
      </button>
    </div>
  );
}