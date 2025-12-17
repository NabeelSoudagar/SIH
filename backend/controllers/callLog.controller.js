import { supabase } from "../config/supabase.js";

export const createCallLog = async (req, res) => {
  try {
    const { room_id, caller_id, receiver_id } = req.body;

    const { data: callLog, error } = await supabase
      .from('call_logs')
      .insert({
        room_id,
        caller_id,
        receiver_id,
        start_time: new Date(),
        status: 'ongoing'
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: "Failed to create call log" });
    }

    return res.json(callLog);
  } catch (err) {
    console.error("Error creating call log:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const endCall = async (req, res) => {
  try {
    const { call_id } = req.params;
    const endTime = new Date();

    const { data: callLog, error } = await supabase
      .from('call_logs')
      .update({
        end_time: endTime,
        status: 'completed'
      })
      .eq('id', call_id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: "Failed to end call" });
    }

    return res.json(callLog);
  } catch (err) {
    console.error("Error ending call:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getCallHistory = async (req, res) => {
  try {
    const { user_id } = req.params;

    const { data: callLogs, error } = await supabase
      .from('call_logs')
      .select('*')
      .or(`caller_id.eq.${user_id},receiver_id.eq.${user_id}`)
      .order('start_time', { ascending: false });

    if (error) {
      return res.status(500).json({ error: "Failed to fetch call history" });
    }

    return res.json(callLogs);
  } catch (err) {
    console.error("Error fetching call history:", err);
    return res.status(500).json({ error: "Server error" });
  }
};