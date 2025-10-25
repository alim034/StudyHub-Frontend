import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getInvitationDetails, acceptInvitation } from "../api/invitationsApi";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/common/Toast";

const AcceptInvitation = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const toast = useToast();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    getInvitationDetails(token)
      .then(res => {
        setDetails(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Invitation not found or expired.");
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    if (!user && !loading) {
      navigate(`/login?redirect=/invite/${token}`);
    }
  }, [user, loading, token, navigate]);

  const handleAccept = async () => {
    setAccepting(true);
    try {
      await acceptInvitation(token);
      toast.show("Invitation accepted! Redirecting...", "success");
      setTimeout(() => {
        navigate(`/rooms/${details.roomId}`);
      }, 1500);
    } catch (e) {
      setError(e.response?.data?.error || "Failed to accept invitation.");
    }
    setAccepting(false);
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-danger">{error}</div>;

  return (
    <main className="app-container py-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-md p-6">
        <h2 className="font-bold text-xl mb-2">Room Invitation</h2>
        <div className="mb-4">
          <div><b>Room:</b> {details.roomName}</div>
          <div><b>Invited by:</b> {details.inviterName}</div>
          <div><b>Your Email:</b> {details.email}</div>
          <div><b>Role:</b> {details.role}</div>
          <div><b>Expires:</b> {new Date(details.expiresAt).toLocaleString()}</div>
        </div>
        <button
          className="btn btn-success w-full"
          onClick={handleAccept}
          disabled={accepting}
        >
          Accept Invitation
        </button>
        {error && <div className="mt-2 text-danger">{error}</div>}
      </div>
    </main>
  );
};

export default AcceptInvitation;
