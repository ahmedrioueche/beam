"use server";

import {
  IngressInput,
  IngressClient,
  IngressVideoEncodingPreset,
  CreateIngressOptions,
  IngressVideoOptions,
  TrackSource,
  IngressAudioOptions,
  IngressAudioEncodingPreset,
  
} from "livekit-server-sdk";

import { db } from "@/lib/db";
import { User } from "@/lib/types";

const apiKey = process.env.LIVEKIT_API_KEY!;
const apiSecret = process.env.LIVEKIT_API_SECRET!;
const wsUrl = process.env.LIVEKIT_API_URL!;

const user: User = {
  id: 5,
  name: "ahmed",
  avatarUrl: "",
};

const roomName = user?.id?.toString();

export const createIngress = async (ingressType: IngressInput) => {
  const options: CreateIngressOptions = {
    name: user.name,
    roomName: roomName,
    participantName: user.name,
    participantIdentity: user?.id?.toString()!,
  };

  if (ingressType !== IngressInput.WHIP_INPUT) {
    const videoOptions = new IngressVideoOptions({
      source: TrackSource.CAMERA,
      encodingOptions: {
        case: "preset",
        value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
      },
    });
    const audioOptions = new IngressAudioOptions({
        source: TrackSource.MICROPHONE,
        encodingOptions: {
          case: "preset",
          value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
        },
    });
  
    options.video = videoOptions;
    options.audio = audioOptions;

  }

  const ingressClient = new IngressClient(wsUrl, apiKey, apiSecret);
  
  try {
    const ingress = await ingressClient.createIngress(ingressType, options);
    //update db 
    return ingress;
  } catch (error) {
    console.error("Failed to create ingress:", error);
    throw error;
  }
};