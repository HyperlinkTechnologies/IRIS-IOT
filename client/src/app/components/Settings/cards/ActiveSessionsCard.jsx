import { useEffect, useState } from "react";

import { Monitor, Clock, Trash2 } from "lucide-react";

import { useUser } from "../../../../context/UserContext";

import { getUserSessions, deleteSession } from "../../../services/session.service";

function formatLastActivity(date) {
  const diff = Date.now() - new Date(date).getTime();

  const seconds = Math.floor(diff / 1000);

  if (seconds < 60) {
    return "Last active just now";
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `Last active ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `Last active ${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);

  return `Last active ${days} day${days > 1 ? "s" : ""} ago`;
}

export default function ActiveSessionsCard() {
  const { user } = useUser();

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    if (!user) return;

    loadSessions();
  }, [user]);

  async function loadSessions() {
    try {
      const data = await getUserSessions(user.userId);

      setSessions(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteSession(sessionId) {
  try {
    await deleteSession(sessionId);

    setSessions((prev) =>
      prev.filter((session) => session.sessionId !== sessionId)
    );
  } catch (error) {
    console.error("Failed to delete session:", error);
  }
}


const [, forceUpdate] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    forceUpdate((value) => value + 1);
  }, 60000);

  return () => clearInterval(interval);
}, []);

  return (
    <div className="border rounded-xl p-5">
      
      <div className="flex items-center gap-3 mb-4">
        <Monitor className="text-[#ff5700]" />

        <div>
          <h3 className="font-semibold text-lg">
            Active Sessions
          </h3>

          <p className="text-sm text-gray-500">
            View and manage your active sessions.
          </p>
        </div>
      </div>

      
      <div className="space-y-3">
        {sessions.map((session) =>{
          const currentSessionId =
  sessionStorage.getItem("iris_session_id");

const isCurrent =
  session.sessionId === currentSessionId;
   return(    
          <div
            key={session.sessionId}
            className="border rounded-lg p-4"
          >
            <div className="flex items-start justify-between mb-1">
  <div className="font-semibold text-lg text-[#010c29]">
    {session.device} ({session.browser})
  </div>

  <div className="flex items-center gap-2">
    {isCurrent && (
      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
        Current Session
      </span>
    )}

    {!isCurrent && (
      <button
        type="button"
        onClick={() => handleDeleteSession(session.sessionId)}
        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-100 transition cursor-pointer"
        title="Delete session"
      >
        <Trash2 size={15} />
      </button>
    )}
  </div>
</div>

            <div className="text-sm text-gray-500">
  
</div>

<div className="text-sm text-gray-500">
  {session.os}
</div>

            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
              <Clock size={14} />

              {formatLastActivity(session.lastActivity)}
            </div>

          </div>
        )})}
      </div>
    </div>
  );
}