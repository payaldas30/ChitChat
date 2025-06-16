import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

// Import the star background - try one of these options:
// Option 1: Named export
import { StarBackground } from "../utils/StarBackground.js";
// Option 2: Default export (alternative)
// import StarBackground from "../utils/StarBackground.js";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const initializingRef = useRef(false);

  // Star background refs
  const canvasRef = useRef(null);
  const starBackgroundRef = useRef(null);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  // Initialize star background with proper cleanup
  useEffect(() => {
    const initStars = () => {
      if (canvasRef.current && !starBackgroundRef.current) {
        try {
          starBackgroundRef.current = new StarBackground(canvasRef.current, {
            starCount: 150, // Reduced for better performance
            starSpeed: 0.2,
            starSize: 1,
            twinkleSpeed: 0.015,
            shootingStarChance: 0.001,
            colors: ['#ffffff', '#e0e7ff', '#c7d2fe']
          });
          starBackgroundRef.current.start();
        } catch (error) {
          console.error("Error initializing star background:", error);
        }
      }
    };

    // Small delay to ensure canvas is rendered
    const timer = setTimeout(initStars, 100);

    return () => {
      clearTimeout(timer);
      if (starBackgroundRef.current) {
        starBackgroundRef.current.destroy();
        starBackgroundRef.current = null;
      }
    };
  }, []); // Empty dependency array

  // useEffect(() => {
  //   console.log("=== Debug Info ===");
  //   console.log("STREAM_API_KEY:", STREAM_API_KEY);
  //   console.log("authUser:", authUser);
  //   console.log("tokenData:", tokenData);
  //   console.log("targetUserId:", targetUserId);
  //   console.log("loading:", loading);
  //   console.log("chatClient:", !!chatClient);
  //   console.log("channel:", !!channel);
  //   console.log("initializingRef.current:", initializingRef.current);
  // }, [authUser, tokenData, targetUserId, loading, chatClient, channel]);

  useEffect(() => {
    let mounted = true;

    const initChat = async () => {
      if (!tokenData?.token || !authUser || !targetUserId) {
        console.log("Missing required data, skipping initialization");
        return;
      }

      if (initializingRef.current) {
        console.log("Already initializing, skipping...");
        return;
      }

      initializingRef.current = true;

      try {
        console.log("Initializing stream chat client...");

        const client = StreamChat.getInstance(STREAM_API_KEY);

        if (client.user && client.user.id !== authUser._id) {
          console.log("Disconnecting previous user...");
          await client.disconnectUser();
        }

        if (!client.user || client.user.id !== authUser._id) {
          console.log("Connecting user:", authUser._id);
          await client.connectUser(
            {
              id: authUser._id,
              name: authUser.fullName,
              image: authUser.profilePic,
            },
            tokenData.token
          );
        } else {
          console.log("User already connected:", client.user.id);
        }

        if (!mounted) return;

        const channelId = [authUser._id, targetUserId].sort().join("-");
        console.log("Creating channel with ID:", channelId);

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        console.log("Watching channel...");
        await currChannel.watch();

        if (!mounted) return;

        console.log("Chat initialized successfully!");
        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Error initializing chat:", error);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        if (mounted) {
          toast.error(`Could not connect to chat: ${error.message}`);
        }
      } finally {
        initializingRef.current = false;
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initChat();

    return () => {
      mounted = false;
    };
  }, [tokenData?.token, authUser?._id, targetUserId]);

  useEffect(() => {
    return () => {
      if (chatClient) {
        console.log("Cleanup: Disconnecting chat client...");
        chatClient.disconnectUser().catch(console.error);
      }
    };
  }, [chatClient]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };

  if (loading || !chatClient || !channel) {
    return (
      <div className="relative h-[93vh]">
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
        <div className="relative z-10 bg-transparent bg-opacity-20">
          <ChatLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[93vh]">
      {/* Star background canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 50}}
      />
      
      {/* Chat interface */}
      <div className="relative z-10 h-full bg-transparent bg-opacity-10">
        <Chat client={chatClient}>
          <Channel channel={channel}>
            <div className="w-full relative">
              <CallButton handleVideoCall={handleVideoCall} />
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput focus />
              </Window>
            </div>
            <Thread />
          </Channel>
        </Chat>
      </div>
    </div>
  );
};

export default ChatPage;